import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { PRODUCTS, SHIPPING } from "@/lib/shop-content";
import { useCart } from "@/lib/cart";
import { formatEuro } from "@/lib/format";
import { prefetch } from "@/lib/prefetch";
import { usePageTitle } from "@/lib/use-page-title";

// Carrello: righe articolo con quantità modificabile e riepilogo totale.
export function CartPage() {
  usePageTitle("Carrello — Gioielleria Saltini");
  const { items, setQty, remove, subtotal } = useCart();

  // Righe risolte contro il catalogo (slug → prodotto completo).
  const rows = [];
  for (const item of items) {
    const product = PRODUCTS.find((p) => p.slug === item.slug);
    if (product) {
      rows.push({ product, qty: item.qty });
    }
  }

  if (rows.length === 0) {
    return (
      <section className="subpage">
        <div className="container text-center" style={{ maxWidth: "28rem" }}>
          <h1 className="fs-3">Il carrello è vuoto</h1>
          <p className="small text-soft mt-2">
            Scoprite le creazioni artigianali della nostra boutique.
          </p>
          <Link to="/shop" className="btn btn-gold mt-4">
            Vai allo shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="subpage">
      <div className="container">
        <p className="eyebrow">Il vostro ordine</p>
        <h1 className="mt-3 display-6">Carrello</h1>
        <span className="gold-rule mt-4" />

        <div className="row g-5 mt-1">
          <div className="col-12 col-lg-8">
            <ul className="list-unstyled d-grid gap-3 mb-0">
              {rows.map((row) => (
                <li key={row.product.slug} className="panel d-flex align-items-center gap-3 p-3">
                  <img src={row.product.image} alt={row.product.alt} className="cart-thumb" />
                  <div className="flex-grow-1">
                    <Link to={`/shop/${row.product.slug}`} className="display-serif fs-5 d-block">
                      {row.product.name}
                    </Link>
                    <span className="small text-soft">{formatEuro(row.product.price)} cad.</span>
                  </div>
                  <div className="qty-stepper" aria-label={`Quantità di ${row.product.name}`}>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => setQty(row.product.slug, row.qty - 1)}
                      aria-label="Diminuisci quantità"
                    >
                      −
                    </button>
                    <span className="qty-value" aria-live="polite">{row.qty}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => setQty(row.product.slug, row.qty + 1)}
                      aria-label="Aumenta quantità"
                    >
                      +
                    </button>
                  </div>
                  <span className="price d-none d-sm-block" style={{ minWidth: "6.5rem", textAlign: "right" }}>
                    {formatEuro(row.product.price * row.qty)}
                  </span>
                  <button
                    type="button"
                    className="header-toggle text-soft"
                    onClick={() => remove(row.product.slug)}
                    aria-label={`Rimuovi ${row.product.name} dal carrello`}
                  >
                    <X size={18} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-lg-4">
            <div className="panel p-4">
              <h2 className="fs-4">Riepilogo</h2>
              <dl className="d-flex justify-content-between small mt-4 mb-0">
                <dt className="fw-normal text-soft">Subtotale</dt>
                <dd className="mb-0">{formatEuro(subtotal)}</dd>
              </dl>
              <dl className="d-flex justify-content-between small mt-2 mb-0">
                <dt className="fw-normal text-soft">Spedizione</dt>
                <dd className="mb-0">Gratuita</dd>
              </dl>
              <hr />
              <dl className="d-flex justify-content-between align-items-center mb-0">
                <dt className="fw-normal">Totale</dt>
                <dd className="price mb-0">{formatEuro(subtotal)}</dd>
              </dl>
              <p className="small text-soft mt-3">{SHIPPING.note}</p>
              <Link
                to="/checkout"
                className="btn btn-gold w-100 mt-2"
                onMouseEnter={() => prefetch("checkout")}
                onFocus={() => prefetch("checkout")}
              >
                Procedi al pagamento
              </Link>
              <Link
                to="/shop"
                className="btn btn-outline-line w-100 mt-3"
                style={{ padding: "0.8rem 1.5rem", fontSize: "0.72rem" }}
                onMouseEnter={() => prefetch("shop")}
                onFocus={() => prefetch("shop")}
              >
                Continua gli acquisti
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
