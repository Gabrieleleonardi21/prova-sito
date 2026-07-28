import { useEffect } from "react";
import { Check } from "lucide-react";
import { Link, Navigate, useLocation, useSearchParams } from "react-router-dom";
import { PAYMENT_METHODS, type PaymentMethodId } from "@/lib/shop-content";
import { useCart } from "@/lib/cart";
import { usePageTitle } from "@/lib/use-page-title";

// Stato passato dalla cassa dopo l'invio dell'ordine via email.
type ConfirmationState = {
  metodo: PaymentMethodId;
  totale: string;
  nome: string;
  email: string;
};

// Conferma d'ordine. Due strade possibili:
//  - flusso base: arriva lo state dalla cassa (ordine inviato via email);
//  - ritorno da Stripe (?pagamento=stripe): il pagamento è già avvenuto,
//    qui va solo svuotato il carrello e confermato l'esito.
export function OrderConfirmationPage() {
  usePageTitle("Ordine ricevuto — Gioielleria Saltini");
  const location = useLocation();
  const [params] = useSearchParams();
  const { items, clear } = useCart();

  const state = location.state as ConfirmationState | null;
  const stripeSuccess = params.get("pagamento") === "stripe";

  // Al ritorno da Stripe il carrello va svuotato (il redirect esterno
  // non passa dalla cassa, che normalmente se ne occupa).
  useEffect(() => {
    if (stripeSuccess && items.length > 0) {
      clear();
    }
  }, [stripeSuccess, items.length, clear]);

  // Arrivare qui senza un ordine appena concluso non ha senso.
  if (!state && !stripeSuccess) {
    return <Navigate to="/shop" replace />;
  }

  // Testi della conferma, diversi per i due flussi.
  let heading = "Pagamento riuscito: ordine confermato";
  let subtitle =
    "Grazie! Stripe vi ha inviato la ricevuta via email; prepariamo la spedizione entro 2 giorni lavorativi.";
  if (state) {
    heading = `Grazie, ${state.nome}: ordine ricevuto`;
    subtitle = `Abbiamo ricevuto il vostro ordine: vi contatteremo entro un giorno lavorativo all'indirizzo ${state.email} per confermarlo e completare il pagamento.`;
  }

  const method = PAYMENT_METHODS.find((m) => m.id === state?.metodo);

  return (
    <section className="subpage">
      <div className="container" style={{ maxWidth: "40rem" }}>
        <div className="panel p-5 text-center">
          <span
            className="d-inline-flex align-items-center justify-content-center rounded-circle"
            style={{ width: "3rem", height: "3rem", background: "rgba(198, 161, 91, 0.15)" }}
          >
            <Check size={24} className="text-gold" aria-hidden="true" />
          </span>
          <h1 className="fs-2 mt-4">{heading}</h1>
          <p className="small text-soft mt-2">{subtitle}</p>

          {state && method && (
            <div className="text-start mt-4 pt-4 border-top">
              <dl className="d-flex justify-content-between mb-0">
                <dt className="fw-normal text-soft small">Totale dell'ordine</dt>
                <dd className="price mb-0">{state.totale}</dd>
              </dl>
              <dl className="d-flex justify-content-between mt-2 mb-0">
                <dt className="fw-normal text-soft small">Metodo di pagamento</dt>
                <dd className="small mb-0">{method.label}</dd>
              </dl>
              <p className="small text-soft mt-4 mb-0">{method.next}</p>
            </div>
          )}

          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-5">
            <Link to="/shop" className="btn btn-gold">
              Torna allo shop
            </Link>
            <Link
              to="/"
              className="btn btn-outline-line"
              style={{ padding: "0.85rem 1.5rem", fontSize: "0.72rem" }}
            >
              Torna alla home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
