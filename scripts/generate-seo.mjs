/**
 * Post-build SEO (lanciato da `npm run build` dopo vite build).
 *
 * Una SPA serve gli stessi meta tag per tutte le rotte: crawler e anteprime
 * social (WhatsApp, Facebook…) vedrebbero ovunque titolo e descrizione della
 * home. Questo script genera dist/<rotta>/index.html per ogni rotta nota,
 * con title, description, Open Graph, canonical e — per i prodotti — i dati
 * strutturati schema.org/Product. Genera inoltre sitemap.xml e robots.txt.
 *
 * I dati arrivano dagli stessi file TS del sito (Node li importa
 * direttamente grazie al type stripping, attivo di default da Node 23.6).
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CATEGORIES, PRODUCTS, isAvailable } from "../src/lib/shop-content.ts";
import { LEGAL_DOCS } from "../src/lib/legal-content.ts";

// Dominio pubblico del sito: da aggiornare se cambia.
const SITE_URL = "https://gioielleriasaltini.com";

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist");

// Escape per i valori dentro attributi HTML.
function esc(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// Riscrive i meta del template per una singola rotta.
function renderPage(template, page) {
  let html = template;
  html = html.replace(/<title>.*?<\/title>/, `<title>${esc(page.title)}</title>`);
  html = html.replace(
    /(<meta name="description" content=")[^"]*(")/,
    `$1${esc(page.description)}$2`,
  );
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(page.title)}$2`);
  html = html.replace(
    /(<meta property="og:description" content=")[^"]*(")/,
    `$1${esc(page.description)}$2`,
  );
  if (page.image) {
    html = html.replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${esc(page.image)}$2`);
  }
  if (page.noindex) {
    html = html.replace(/(<meta name="robots" content=")[^"]*(")/, "$1noindex, nofollow$2");
  }

  // Canonical e og:url, inseriti prima del favicon.
  const url = SITE_URL + page.path;
  html = html.replace(
    '<link rel="icon"',
    `<link rel="canonical" href="${esc(url)}" />\n    <meta property="og:url" content="${esc(url)}" />\n    <link rel="icon"`,
  );

  // Per i prodotti, lo schema JewelryStore lascia il posto a Product.
  if (page.jsonLd) {
    html = html.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n${JSON.stringify(page.jsonLd, null, 2)}\n    </script>`,
    );
  }
  return html;
}

// Disponibilità schema.org coerente col campo `available` del catalogo.
function schemaAvailability(product) {
  if (isAvailable(product)) {
    return "https://schema.org/InStock";
  }
  return "https://schema.org/LimitedAvailability";
}

// Briciole di pane strutturate (Home → Shop → Categoria → Prodotto):
// Google le mostra nei risultati al posto dell'URL grezzo.
function breadcrumbLd(product) {
  const category = CATEGORIES.find((c) => c.id === product.category);
  let categoryLabel = "Catalogo";
  if (category) {
    categoryLabel = category.label;
  }
  const items = [
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Shop", url: `${SITE_URL}/shop` },
    { name: categoryLabel, url: `${SITE_URL}/shop?categoria=${product.category}` },
    { name: product.name, url: `${SITE_URL}/shop/${product.slug}` },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

const template = await readFile(path.join(DIST, "index.html"), "utf8");

const pages = [
  {
    path: "/",
    title: "Gioielleria Saltini | Alta gioielleria e orologeria a Nettuno dal 1946",
    description:
      "Dal 1946 a Nettuno: gioielli, orologi, fedi e creazioni su misura. Tre generazioni di artigianato, riparazioni, valutazioni oro e consulenza in boutique.",
  },
  {
    path: "/shop",
    title: "Shop online — Gioielleria Saltini",
    description:
      "Il catalogo online della Gioielleria Saltini: creazioni artigianali, orologi Tissot e accessori Montblanc. Spedizione gratuita in Italia in 24/72 ore.",
  },
  { path: "/carrello", title: "Carrello — Gioielleria Saltini", description: "Il vostro carrello.", noindex: true },
  { path: "/checkout", title: "Cassa — Gioielleria Saltini", description: "Completate il vostro ordine.", noindex: true },
  { path: "/ordine-confermato", title: "Ordine ricevuto — Gioielleria Saltini", description: "Conferma dell'ordine.", noindex: true },
  ...LEGAL_DOCS.map((doc) => ({
    path: `/${doc.slug}`,
    title: `${doc.title} — Gioielleria Saltini`,
    description: doc.description,
  })),
  ...PRODUCTS.map((product) => ({
    path: `/shop/${product.slug}`,
    title: `${product.name} — Gioielleria Saltini`,
    description: product.description,
    image: product.image,
    // Un array di oggetti JSON-LD è valido: Product + briciole di pane
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.image,
        brand: { "@type": "Brand", name: product.brand },
        offers: {
          "@type": "Offer",
          url: `${SITE_URL}/shop/${product.slug}`,
          priceCurrency: "EUR",
          price: String(product.price),
          availability: schemaAvailability(product),
          itemCondition: "https://schema.org/NewCondition",
        },
      },
      breadcrumbLd(product),
    ],
  })),
];

for (const page of pages) {
  const html = renderPage(template, page);
  let outDir = DIST;
  if (page.path !== "/") {
    outDir = path.join(DIST, page.path.slice(1));
    await mkdir(outDir, { recursive: true });
  }
  await writeFile(path.join(outDir, "index.html"), html);
}

// Fallback per host statici senza rewrite (es. GitHub Pages): i percorsi
// sconosciuti servono 404.html, che carica la SPA e mostra la pagina 404.
await writeFile(
  path.join(DIST, "404.html"),
  renderPage(template, {
    path: "/404",
    title: "Pagina non trovata — Gioielleria Saltini",
    description: "La pagina che cercate non esiste o è stata spostata.",
    noindex: true,
  }),
);

// Sitemap: solo le pagine indicizzabili.
const sitemapUrls = pages
  .filter((page) => !page.noindex)
  .map((page) => `  <url><loc>${esc(SITE_URL + page.path)}</loc></url>`)
  .join("\n");
await writeFile(
  path.join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`,
);

await writeFile(
  path.join(DIST, "robots.txt"),
  `User-agent: *\nDisallow: /carrello\nDisallow: /checkout\nDisallow: /ordine-confermato\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
);

console.log(`[seo] generate ${pages.length} pagine statiche, sitemap.xml e robots.txt`);
