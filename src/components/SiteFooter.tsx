import { Link } from "react-router-dom";
import { FacebookIcon, InstagramIcon } from "@/components/social-icons";
import { BUSINESS, STORES } from "@/lib/site-content";
import { withBase } from "@/lib/base";

// Pagine legali del sito, linkate nella riga finale del footer.
const LEGAL_LINKS = [
  { label: "Privacy", to: "/privacy" },
  { label: "Cookie", to: "/cookie-policy" },
  { label: "Condizioni di vendita", to: "/condizioni-di-vendita" },
  { label: "Resi e recesso", to: "/resi" },
];

// Anchor con "/" davanti: funzionano anche dalle pagine interne (shop, carrello…).
const COLUMNS = [
  {
    title: "Collezioni",
    links: [
      { label: "Gioielli", href: "/shop?categoria=gioielli" },
      { label: "Orologi", href: "/shop?categoria=orologi" },
      { label: "Accessori", href: "/shop?categoria=accessori" },
      { label: "Fidanzamento e Matrimonio", href: "/shop?categoria=fidanzamento" },
    ],
  },
  {
    title: "La Gioielleria",
    links: [
      { label: "La nostra storia", href: "/#storia" },
      { label: "Creazioni su misura", href: "/#su-misura" },
      { label: "I nostri brand", href: "/#marchi" },
      { label: "Recensioni", href: "/#recensioni" },
    ],
  },
  {
    title: "Info e Acquisti",
    links: [
      { label: "Shop online", href: "/shop" },
      { label: "Carrello", href: "/carrello" },
      { label: "Servizi in boutique", href: "/#servizi" },
      { label: "Contatti", href: "/#contatti" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-5">
          <div className="col-12 col-lg-5">
            <p className="wordmark fs-2 mb-0">{BUSINESS.wordmark}</p>
            <p className="mt-4 small text-on-ink" style={{ maxWidth: "20rem" }}>
              {BUSINESS.claim} Una bottega di famiglia, tre generazioni di mani e di storie.
            </p>
            <div className="d-flex gap-2 mt-4">
              <a
                href={BUSINESS.facebook}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Facebook di Gioielleria Saltini"
                className="social-btn"
              >
                <FacebookIcon />
              </a>
              <a
                href={BUSINESS.instagram}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram di Gioielleria Saltini"
                className="social-btn"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title} className="col-12 col-sm-4 col-lg">
              <h2 className="eyebrow">{column.title}</h2>
              <ul className="list-unstyled d-grid gap-2 mt-4 mb-0 small">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={withBase(link.href)}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="row g-4 mt-5 pt-4 border-top border-secondary border-opacity-25">
          {STORES.map((store) => (
            <div key={store.name} className="col-12 col-sm-4">
              <p className="small mb-2">{store.address}</p>
              <p className="small text-on-ink mb-0">
                <a href={`tel:+39${store.phone.replace(/\s/g, "")}`}>{store.phone}</a> ·{" "}
                <a href={`tel:+39${store.mobile.replace(/\s/g, "")}`}>{store.mobile}</a>
              </p>
            </div>
          ))}
          <div className="col-12 col-sm-4">
            <a href={`mailto:${BUSINESS.email}`} className="small">
              {BUSINESS.email}
            </a>
            <p className="small text-on-ink mt-2 mb-0">{BUSINESS.hours}</p>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between gap-2 mt-5 pt-4 border-top border-secondary border-opacity-25">
          <p className="mb-0" style={{ fontSize: "0.75rem", opacity: 0.5 }}>
            © {new Date().getFullYear()} {BUSINESS.name} — {BUSINESS.legalName} — {BUSINESS.vat}
          </p>
          <p className="mb-0" style={{ fontSize: "0.75rem" }}>
            {LEGAL_LINKS.map((link, i) => (
              <span key={link.to}>
                {i > 0 && " · "}
                <Link to={link.to}>{link.label}</Link>
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
