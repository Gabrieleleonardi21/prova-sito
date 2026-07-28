import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { z } from "zod";
import { sendContact } from "@/lib/send-contact";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import {
  FieldError,
  HoneypotField,
  describedBy,
  fieldClass,
  focusFirstError,
  isSpam,
} from "./form-utils";

// Schema di validazione: messaggi in italiano, mostrati campo per campo.
const schema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Inserisci il tuo nome (almeno 2 caratteri).")
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
  motivo: z.enum(["informazioni", "su-misura", "riparazione", "appuntamento"], {
    errorMap: () => ({ message: "Seleziona il motivo del contatto." }),
  }),
  messaggio: z
    .string()
    .trim()
    .min(10, "Scrivi almeno 10 caratteri, così possiamo aiutarti meglio.")
    .max(1000, "Il messaggio non può superare i 1000 caratteri."),
  privacy: z.literal(true, {
    errorMap: () => ({ message: "È necessario accettare l'informativa sulla privacy." }),
  }),
});

type Errors = Partial<Record<string, string>>;
type Status = "idle" | "submitting" | "error";

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot: se il campo nascosto è compilato è un bot → fingiamo il successo.
    if (isSpam(data)) {
      setSent(true);
      form.reset();
      return;
    }

    const result = schema.safeParse({ ...data, privacy: data.privacy === "on" });

    if (!result.success) {
      // Per ogni campo teniamo solo il primo errore, in ordine di schema.
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

    try {
      // La privacy resta fuori dal payload: serve solo alla validazione.
      const valid = result.data;
      await sendContact({
        nome: valid.nome,
        email: valid.email,
        telefono: valid.telefono,
        motivo: valid.motivo,
        messaggio: valid.messaggio,
      });
      setStatus("idle");
      setSent(true);
      form.reset();
    } catch (error) {
      console.error("[contatti] invio fallito", error);
      setStatus("error");
    }
  }

  let submitLabel = "Invia richiesta";
  if (status === "submitting") {
    submitLabel = "Invio in corso…";
  }

  return (
    <section id="contatti" className="section bg-sand">
      <div className="container" style={{ maxWidth: "48rem" }}>
        <SectionHeading
          eyebrow="Contatti e prenotazioni"
          title="Scriveteci, vi rispondiamo noi"
          intro="Compilate il modulo: vi ricontattiamo entro un giorno lavorativo per fissare un incontro in boutique."
        />

        {sent && (
          <Reveal className="panel p-5 text-center mt-5">
            <span
              className="d-inline-flex align-items-center justify-content-center rounded-circle"
              style={{ width: "3rem", height: "3rem", background: "rgba(198, 161, 91, 0.15)" }}
            >
              <Check size={24} className="text-gold" aria-hidden="true" />
            </span>
            <h3 className="fs-2 mt-4">Richiesta inviata</h3>
            <p className="small text-soft mt-2">
              Grazie, abbiamo ricevuto il vostro messaggio. Vi ricontatteremo al più presto.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="btn btn-outline-line mt-3"
              style={{ padding: "0.8rem 1.75rem", fontSize: "0.72rem" }}
            >
              Invia un'altra richiesta
            </button>
          </Reveal>
        )}

        {!sent && (
          <Reveal>
            <form onSubmit={handleSubmit} noValidate className="row g-4 mt-5">
              <div className="col-12 col-sm-6">
                <label className="field-label" htmlFor="nome">
                  Nome e cognome
                </label>
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
                <label className="field-label" htmlFor="email">
                  Email
                </label>
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
                <label className="field-label" htmlFor="telefono">
                  Telefono
                </label>
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
                <label className="field-label" htmlFor="motivo">
                  Motivo del contatto
                </label>
                <select
                  id="motivo"
                  name="motivo"
                  defaultValue=""
                  className={fieldClass("form-select", errors.motivo)}
                  aria-invalid={Boolean(errors.motivo)}
                  aria-describedby={describedBy("motivo", errors.motivo)}
                >
                  <option value="" disabled>
                    Seleziona…
                  </option>
                  <option value="informazioni">Informazioni</option>
                  <option value="su-misura">Creazione su misura</option>
                  <option value="riparazione">Riparazione</option>
                  <option value="appuntamento">Appuntamento</option>
                </select>
                <FieldError id="motivo" message={errors.motivo} />
              </div>

              <div className="col-12">
                <label className="field-label" htmlFor="messaggio">
                  Messaggio
                </label>
                <textarea
                  id="messaggio"
                  name="messaggio"
                  rows={5}
                  maxLength={1000}
                  placeholder="Raccontateci cosa avete in mente…"
                  className={fieldClass("form-control", errors.messaggio)}
                  aria-invalid={Boolean(errors.messaggio)}
                  aria-describedby={describedBy("messaggio", errors.messaggio)}
                />
                <FieldError id="messaggio" message={errors.messaggio} />
              </div>

              <HoneypotField />

              <div className="col-12">
                <div className="form-check">
                  <input
                    className={fieldClass("form-check-input", errors.privacy)}
                    type="checkbox"
                    name="privacy"
                    id="privacy"
                    aria-invalid={Boolean(errors.privacy)}
                    aria-describedby={describedBy("privacy", errors.privacy)}
                  />
                  <label className="form-check-label small text-soft" htmlFor="privacy">
                    Ho letto l'informativa e acconsento al trattamento dei miei dati personali per
                    rispondere alla richiesta.
                  </label>
                  <FieldError id="privacy" message={errors.privacy} />
                </div>
              </div>

              {status === "error" && (
                <div className="col-12">
                  <div className="alert alert-danger rounded-0 mb-0 small" role="alert">
                    Non è stato possibile inviare la richiesta. Riprovate tra poco oppure chiamateci
                    allo 06 9880711.
                  </div>
                </div>
              )}

              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-gold w-100 w-sm-auto"
                  disabled={status === "submitting"}
                  aria-busy={status === "submitting"}
                >
                  {submitLabel}
                </button>
              </div>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}
