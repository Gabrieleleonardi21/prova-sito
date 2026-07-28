import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check, Gift, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { CATEGORIES, PRODUCTS, isAvailable } from "@/lib/shop-content";
import { useCart } from "@/lib/cart";
import { formatEuro } from "@/lib/format";
import { prefetch } from "@/lib/prefetch";
import { usePageTitle } from "@/lib/use-page-title";

const PERKS = [
  { icon: Truck, label: "Spedizione gratuita in 24/72h" },
  { icon: ShieldCheck, label: "Garanzia di 2 anni" },
  { icon: RotateCcw, label: "Possibilità di reso" },
  { icon: Gift, label: "Confezione regalo inclusa" },
];

// Scheda prodotto: immagine, dettagli e aggiunta al carrello.
export function ProductPage() {
  const { slug } = useParams();
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const product = PRODUCTS.find((p) => p.slug === slug);

  let title = "Prodotto non trovato — Gioielleria Saltini";
  if (product) {
    title = `${product.name} — Gioielleria Saltini`;
  }
  usePageTitle(title);

  if (!product) {
    return (
      <section className="subpage">
        <div className="container text-center" style={{ maxWidth: "28rem" }}>
          <h1 className="fs-3">Prodotto non trovato</h1>
          <p className="small text-soft mt-2">
            Il pezzo che cercate non esiste o non è più disponibile online.
          </p>
          <Link to="/shop" className="btn btn-gold mt-4">
            Torna allo shop
          </Link>
        </div>
      </section>
    );
  }

  // Briciole di pane e occhiello coerenti con la categoria e il marchio.
  const categoryInfo = CATEGORIES.find((c) => c.id === product.category);
  let categoryLabel = "Catalogo";
  if (categoryInfo) {
    categoryLabel = categoryInfo.label;
  }

  let eyebrow = product.brand;
  if (product.brand === "Saltini") {
    eyebrow = "Saltini — fatto a mano";
  }

  function handleAdd() {
    if (product) {
      add(product.slug);
      setAdded(true);
    }
  }

  return (
    <section className="subpage">
      <div className="container">
        <nav aria-label="Percorso" className="small text-soft mb-4">
          <Link to="/shop">Shop</Link>
          {" / "}
          <Link to={`/shop?categoria=${product.category}`}>{categoryLabel}</Link>
        </nav>

        <div className="row g-5">
          <div className="col-12 col-lg-6">
            <div className="zoom-frame" style={{ aspectRatio: "1 / 1" }}>
              <img src={product.image} alt={product.alt} />
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-3 display-6">{product.name}</h1>
            <p className="price fs-3 mt-3 mb-0">{formatEuro(product.price)}</p>
            <p className="small text-soft">IVA inclusa</p>
            <span className="gold-rule" />
            <p className="mt-4 text-soft">{product.description}</p>

            <ul className="list-unstyled d-grid gap-2 mt-4 small">
              {PERKS.map((perk) => (
                <li key={perk.label} className="d-flex align-items-center gap-2">
                  <perk.icon size={16} className="text-gold flex-shrink-0" aria-hidden="true" />
                  <span className="text-soft">{perk.label}</span>
                </li>
              ))}
            </ul>

            {/* I pezzi non acquistabili online si prenotano in boutique */}
            {isAvailable(product) && (
              <div className="mt-4">
                <button type="button" onClick={handleAdd} className="btn btn-gold w-100 w-sm-auto">
                  Aggiungi al carrello
                </button>
              </div>
            )}

            {!isAvailable(product) && (
              <div className="mt-4">
                <p className="small text-soft mb-2">
                  Pezzo unico disponibile solo in boutique: scriveteci per verificarne la
                  disponibilità o fissare un appuntamento.
                </p>
                <a href="/#contatti" className="btn btn-gold w-100 w-sm-auto">
                  Verifica disponibilità
                </a>
              </div>
            )}

            {added && (
              <div className="panel d-flex flex-wrap align-items-center gap-3 p-3 mt-3" role="status">
                <span className="d-inline-flex align-items-center gap-2 small">
                  <Check size={16} className="text-gold" aria-hidden="true" />
                  Aggiunto al carrello.
                </span>
                <span className="d-flex gap-3 small">
                  <Link
                    to="/carrello"
                    onMouseEnter={() => prefetch("carrello")}
                    onFocus={() => prefetch("carrello")}
                  >
                    Vai al carrello
                  </Link>
                  <Link
                    to="/checkout"
                    onMouseEnter={() => prefetch("checkout")}
                    onFocus={() => prefetch("checkout")}
                  >
                    Vai alla cassa
                  </Link>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
