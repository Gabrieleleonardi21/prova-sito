import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { z } from "zod";
import {
  PAYMENT_METHODS,
  PRODUCTS,
  SHIPPING,
  type PaymentMethodId,
  type Product,
} from "@/lib/shop-content";
import { useCart } from "@/lib/cart";
import { startStripeCheckout, stripeCheckoutActive } from "@/lib/checkout-stripe";
import { formatEuro } from "@/lib/format";
import { sendOrder } from "@/lib/send-order";
import { usePageTitle } from "@/lib/use-page-title";
import {
  FieldError,
  HoneypotField,
  describedBy,
  fieldClass,
  focusFirstError,
  isSpam,
} from "@/components/form-utils";

// Dati di spedizione e fatturazione richiesti per l'ordine.
const schema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Inserisci nome e cognome.")
    .max(80, "Il nome è troppo lungo."),
  email: z
    .string()
    .trim()
    .min(1, "L'indirizzo email è obbligatorio.")
    .email("Inserisci un indirizzo email valido.")
    .max(160, "L'indirizzo email è troppo lungo."),
  telefono: z
    .string()
    .trim()
    .min(6, "Inserisci un numero di telefono valido.")
    .max(24, "Il numero di telefono è troppo lungo.")
    .regex(/^[0-9+\s().-]+$/, "Il telefono può contenere solo numeri e i simboli + ( ) - ."),
  indirizzo: z
    .string()
    .trim()
    .min(5, "Inserisci via e numero civico.")
    .max(160, "L'indirizzo è troppo lungo."),
  citta: z
    .string()
    .trim()
    .min(2, "Inserisci la città.")
    .max(80, "Il nome della città è troppo lungo."),
  cap: z.string().trim().regex(/^\d{5}$/, "Il CAP è di 5 cifre."),
  provincia: z
    .string()
    .trim()
    .regex(/^[A-Za-z]{2}$/, "Sigla della provincia di 2 lettere (es. RM)."),
  note: z.string().trim().max(500, "Le note non possono superare i 500 caratteri."),
  privacy: z.literal(true, {
    errorMap: () => ({ message: "È necessario accettare l'informativa sulla privacy." }),
  }),
});

type Errors = Partial<Record<string, string>>;
type Status = "idle" | "submitting" | "error";

// Pagina di pagamento: dati di spedizione, scelta del metodo, invio ordine.
export function CheckoutPage() {
  usePageTitle("Cassa — Gioielleria Saltini");
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [metodo, setMetodo] = useState<PaymentMethodId>("carta");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  // Vero dopo l'invio riuscito: lo svuotamento del carrello non deve
  // far scattare il redirect della guardia qui sotto mentre si naviga
  // verso la pagina di conferma.
  const [completed, setCompleted] = useState(false);

  // Senza articoli nel carrello la cassa non ha senso.
  if (items.length === 0 && !completed) {
    return <Navigate to="/carrello" replace />;
  }

  const rows: { product: Product; qty: number }[] = [];
  for (const item of items) {
    const product = PRODUCTS.find((p) => p.slug === item.slug);
    if (product) {
      rows.push({ product, qty: item.qty });
    }
  }

  // Il contrassegno aggiunge il suo supplemento al totale.
  const method = PAYMENT_METHODS.find((m) => m.id === metodo) ?? PAYMENT_METHODS[0];
  const total = subtotal + method.fee;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot: se il campo nascosto è compilato è un bot → usciamo in silenzio.
    if (isSpam(data)) {
      navigate("/shop");
      return;
    }

    const result = schema.safeParse({ ...data, privacy: data.privacy === "on" });

    if (!result.success) {
      const next: Errors = {};
      result.error.issues.forEach((issue) => {
        const key = String(issue.path[0]);
        if (!next[key]) {
          next[key] = issue.message;
        }
      });
      setErrors(next);
      setStatus("idle");
      focusFirstError(form, next);
      return;
    }

    setErrors({});
    setStatus("submitting");

    // Righe d'ordine leggibili, per l'email che arriva in boutique.
    const riepilogo = rows
      .map((row) => `${row.qty} × ${row.product.name} — ${formatEuro(row.product.price * row.qty)}`)
      .join("\n");

    try {
      const valid = result.data;

      // Con Stripe attivo, il metodo "carta" paga subito sulla pagina
      // sicura di Stripe: niente ordine via email, il carrello si svuota
      // al ritorno sulla pagina di conferma.
      if (metodo === "carta" && stripeCheckoutActive()) {
        await startStripeCheckout({
          items,
          email: valid.email,
          cliente: {
            nome: valid.nome,
            telefono: valid.telefono,
            indirizzo: `${valid.indirizzo}, ${valid.cap} ${valid.citta} (${valid.provincia.toUpperCase()})`,
            note: valid.note,
          },
        });
        return;
      }

      await sendOrder({
        nome: valid.nome,
        email: valid.email,
        telefono: valid.telefono,
        indirizzo: valid.indirizzo,
        citta: valid.citta,
        cap: valid.cap,
        provincia: valid.provincia.toUpperCase(),
        note: valid.note,
        metodo,
        riepilogo,
        totale: formatEuro(total),
      });
      setCompleted(true);
      clear();
      navigate("/ordine-confermato", {
        state: { metodo, totale: formatEuro(total), nome: valid.nome, email: valid.email },
      });
    } catch (error) {
      console.error("[ordini] invio fallito", error);
      setStatus("error");
    }
  }

  let submitLabel = "Conferma l'ordine";
  if (status === "submitting") {
    submitLabel = "Invio in corso…";
  }

  // La nota sotto il bottone dipende da come verrà gestito il pagamento.
  let paymentNote = "Nessun addebito immediato: confermiamo l'ordine e il pagamento via email.";
  if (metodo === "carta" && stripeCheckoutActive()) {
    paymentNote = "Verrete reindirizzati alla pagina di pagamento sicura di Stripe.";
  }

  return (
    <section className="subpage">
      <div className="container">
        <p className="eyebrow">Pagamento sicuro</p>
        <h1 className="mt-3 display-6">Cassa</h1>
        <span className="gold-rule mt-4" />

        <form onSubmit={handleSubmit} noValidate className="row g-5 mt-1">
          <div className="col-12 col-lg-7">
            <h2 className="fs-4">Dati di spedizione</h2>
            <div className="row g-4 mt-1">
              <div className="col-12 col-sm-6">
                <label className="field-label" htmlFor="nome">Nome e cognome</label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  autoComplete="name"
                  placeholder="Maria Rossi"
                  className={fieldClass("form-control", errors.nome)}
                  aria-invalid={Boolean(errors.nome)}
                  aria-describedby={describedBy("nome", errors.nome)}
                />
                <FieldError id="nome" message={errors.nome} />
              </div>

              <div className="col-12 col-sm-6">
                <label className="field-label" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="maria@esempio.it"
                  className={fieldClass("form-control", errors.email)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={describedBy("email", errors.email)}
                />
                <FieldError id="email" message={errors.email} />
              </div>

              <div className="col-12 col-sm-6">
                <label className="field-label" htmlFor="telefono">Telefono</label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+39 333 1234567"
                  className={fieldClass("form-control", errors.telefono)}
                  aria-invalid={Boolean(errors.telefono)}
                  aria-describedby={describedBy("telefono", errors.telefono)}
                />
                <FieldError id="telefono" message={errors.telefono} />
              </div>

              <div className="col-12 col-sm-6">
                <label className="field-label" htmlFor="indirizzo">Indirizzo (via e civico)</label>
                <input
                  id="indirizzo"
                  name="indirizzo"
                  type="text"
                  autoComplete="street-address"
                  placeholder="Via Roma 10"
                  className={fieldClass("form-control", errors.indirizzo)}
                  aria-invalid={Boolean(errors.indirizzo)}
                  aria-describedby={describedBy("indirizzo", errors.indirizzo)}
                />
                <FieldError id="indirizzo" message={errors.indirizzo} />
              </div>

              <div className="col-12 col-sm-6">
                <label className="field-label" htmlFor="citta">Città</label>
                <input
                  id="citta"
                  name="citta"
                  type="text"
                  autoComplete="address-level2"
                  placeholder="Nettuno"
                  className={fieldClass("form-control", errors.citta)}
                  aria-invalid={Boolean(errors.citta)}
                  aria-describedby={describedBy("citta", errors.citta)}
                />
                <FieldError id="citta" message={errors.citta} />
              </div>

              <div className="col-6 col-sm-3">
                <label className="field-label" htmlFor="cap">CAP</label>
                <input
                  id="cap"
                  name="cap"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="00048"
                  className={fieldClass("form-control", errors.cap)}
                  aria-invalid={Boolean(errors.cap)}
                  aria-describedby={describedBy("cap", errors.cap)}
                />
                <FieldError id="cap" message={errors.cap} />
              </div>

              <div className="col-6 col-sm-3">
                <label className="field-label" htmlFor="provincia">Provincia</label>
                <input
                  id="provincia"
                  name="provincia"
                  type="text"
                  maxLength={2}
                  placeholder="RM"
                  className={fieldClass("form-control", errors.provincia)}
                  aria-invalid={Boolean(errors.provincia)}
                  aria-describedby={describedBy("provincia", errors.provincia)}
                />
                <FieldError id="provincia" message={errors.provincia} />
              </div>

              <div className="col-12">
                <label className="field-label" htmlFor="note">Note per la consegna (facoltative)</label>
                <textarea
                  id="note"
                  name="note"
                  rows={3}
                  maxLength={500}
                  placeholder="Es. citofono, orari preferiti…"
                  className={fieldClass("form-control", errors.note)}
                  aria-invalid={Boolean(errors.note)}
                  aria-describedby={describedBy("note", errors.note)}
                />
                <FieldError id="note" message={errors.note} />
              </div>
            </div>

            <h2 className="fs-4 mt-5">Metodo di pagamento</h2>
            <div className="d-grid gap-3 mt-3" role="radiogroup" aria-label="Metodo di pagamento">
              {PAYMENT_METHODS.map((m) => (
                <label key={m.id} className="panel payment-option d-flex align-items-start gap-3 p-3">
                  <input
                    type="radio"
                    name="metodo"
                    value={m.id}
                    checked={metodo === m.id}
                    onChange={() => setMetodo(m.id)}
                    className="form-check-input mt-1 flex-shrink-0"
                  />
                  <span>
                    <span className="d-block small fw-medium text-uppercase" style={{ letterSpacing: "0.12em" }}>
                      {m.label}
                    </span>
                    <span className="d-block small text-soft mt-1">{m.description}</span>
                  </span>
                </label>
              ))}
            </div>

            <HoneypotField />

            <div className="form-check mt-4">
              <input
                className={fieldClass("form-check-input", errors.privacy)}
                type="checkbox"
                name="privacy"
                id="privacy"
                aria-invalid={Boolean(errors.privacy)}
                aria-describedby={describedBy("privacy", errors.privacy)}
              />
              <label className="form-check-label small text-soft" htmlFor="privacy">
                Ho letto l'informativa e accetto le condizioni di vendita e il trattamento dei miei
                dati personali per la gestione dell'ordine.
              </label>
              <FieldError id="privacy" message={errors.privacy} />
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="panel p-4">
              <h2 className="fs-4">Riepilogo dell'ordine</h2>
              <ul className="list-unstyled d-grid gap-2 small mt-4 mb-0">
                {rows.map((row) => (
                  <li key={row.product.slug} className="d-flex justify-content-between gap-3">
                    <span className="text-soft">
                      {row.qty} × {row.product.name}
                    </span>
                    <span className="flex-shrink-0">{formatEuro(row.product.price * row.qty)}</span>
                  </li>
                ))}
              </ul>
              <hr />
              <dl className="d-flex justify-content-between small mb-0">
                <dt className="fw-normal text-soft">Subtotale</dt>
                <dd className="mb-0">{formatEuro(subtotal)}</dd>
              </dl>
              <dl className="d-flex justify-content-between small mt-2 mb-0">
                <dt className="fw-normal text-soft">Spedizione</dt>
                <dd className="mb-0">Gratuita</dd>
              </dl>
              {method.fee > 0 && (
                <dl className="d-flex justify-content-between small mt-2 mb-0">
                  <dt className="fw-normal text-soft">Supplemento contrassegno</dt>
                  <dd className="mb-0">{formatEuro(method.fee)}</dd>
                </dl>
              )}
              <hr />
              <dl className="d-flex justify-content-between align-items-center mb-0">
                <dt className="fw-normal">Totale</dt>
                <dd className="price mb-0">{formatEuro(total)}</dd>
              </dl>
              <p className="small text-soft mt-3">{SHIPPING.detail}</p>

              {status === "error" && (
                <div className="alert alert-danger rounded-0 small" role="alert">
                  Non è stato possibile inviare l'ordine. Riprovate tra poco oppure chiamateci allo
                  06 9880711.
                </div>
              )}

              <button
                type="submit"
                className="btn btn-gold w-100 mt-2"
                disabled={status === "submitting"}
                aria-busy={status === "submitting"}
              >
                {submitLabel}
              </button>
              <p className="d-flex align-items-center justify-content-center gap-2 small text-soft mt-3 mb-0">
                <Lock size={14} className="text-gold" aria-hidden="true" />
                {paymentNote}
              </p>
              <p className="small text-center mt-2 mb-0">
                <Link to="/carrello">Torna al carrello</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
