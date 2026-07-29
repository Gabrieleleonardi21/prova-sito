/**
 * Function serverless (Vercel) che crea una sessione Stripe Checkout.
 *
 * Configurazione necessaria:
 *  - variabile d'ambiente STRIPE_SECRET_KEY sul hosting (MAI con prefisso
 *    VITE_: non deve finire nel bundle del browser);
 *  - nel client, VITE_STRIPE_CHECKOUT_ENDPOINT=/api/create-checkout-session.
 *
 * Sicurezza: il client manda solo slug e quantità; prezzi e disponibilità
 * vengono riletti dal catalogo lato server, così non sono manomettibili.
 * Su Netlify basta adattare la firma a un handler Netlify Functions.
 */

import Stripe from "stripe";
// Estensione .js esplicita (convenzione TypeScript per l'ESM): a runtime la
// function è un modulo ESM e gli import relativi senza estensione falliscono
// con ERR_MODULE_NOT_FOUND; il builder di Vercel compila shop-content.ts in
// shop-content.js dentro il bundle, e questo specificatore vi corrisponde.
import { PRODUCTS, isAvailable } from "../src/lib/shop-content.js";

// Firme minime di request/response in stile Vercel Node, per non
// dipendere dai tipi @vercel/node.
type ApiRequest = {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
};
type ApiResponse = {
  status: (code: number) => { json: (body: unknown) => void };
};

type Payload = {
  items?: { slug?: unknown; qty?: unknown }[];
  email?: unknown;
  cliente?: Record<string, unknown>;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Metodo non consentito" });
    return;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    res.status(501).json({ error: "STRIPE_SECRET_KEY non configurata" });
    return;
  }

  const payload = (req.body ?? {}) as Payload;
  const email = payload.email;
  if (typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({ error: "Email non valida" });
    return;
  }

  // Rilettura di prezzi e disponibilità dal catalogo lato server.
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const item of payload.items ?? []) {
    const product = PRODUCTS.find((p) => p.slug === item.slug);
    const qty = Number(item.qty);
    if (!product || !isAvailable(product) || !Number.isInteger(qty) || qty < 1 || qty > 20) {
      res.status(400).json({ error: "Articolo non valido nel carrello" });
      return;
    }
    lineItems.push({
      quantity: qty,
      price_data: {
        currency: "eur",
        unit_amount: product.price * 100,
        product_data: { name: product.name },
      },
    });
  }
  if (lineItems.length === 0) {
    res.status(400).json({ error: "Carrello vuoto" });
    return;
  }

  // I dati di spedizione raccolti dal form finiscono nei metadata
  // dell'ordine, visibili nel pannello Stripe della boutique.
  const metadata: Record<string, string> = {};
  for (const [key, value] of Object.entries(payload.cliente ?? {})) {
    if (typeof value === "string") {
      metadata[key] = value.slice(0, 450);
    }
  }

  let origin = "http://localhost:5173";
  if (typeof req.headers.origin === "string") {
    origin = req.headers.origin;
  }

  const stripe = new Stripe(secretKey);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "it",
    customer_email: email,
    line_items: lineItems,
    metadata,
    success_url: `${origin}/ordine-confermato?pagamento=stripe`,
    cancel_url: `${origin}/checkout`,
  });

  res.status(200).json({ url: session.url });
}
