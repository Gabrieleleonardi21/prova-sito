/**
 * Invio dell'ordine via HTTP POST, stesso meccanismo del form contatti.
 *
 * L'endpoint si configura in `.env` con VITE_ORDER_ENDPOINT (es. Formspree):
 * l'ordine arriva via email alla boutique, che ricontatta il cliente con il
 * link di pagamento o i dati per il bonifico, secondo il metodo scelto.
 *
 * Senza endpoint configurato:
 *  - in sviluppo l'invio viene simulato (log in console) per provare il flusso;
 *  - in produzione lancia un errore: meglio un avviso visibile che perdere
 *    silenziosamente gli ordini dei clienti.
 */

import type { PaymentMethodId } from "./shop-content";

export type OrderPayload = {
  /** Riferimento leggibile dell'ordine (es. "SLT-260728-K4TQ"). */
  riferimento: string;
  nome: string;
  email: string;
  telefono: string;
  indirizzo: string;
  citta: string;
  cap: string;
  provincia: string;
  note: string;
  metodo: PaymentMethodId;
  /** Righe d'ordine già formattate, per un'email leggibile. */
  riepilogo: string;
  /** Totale già formattato (es. "1.008,00 €"). */
  totale: string;
};

const ENDPOINT = import.meta.env.VITE_ORDER_ENDPOINT;

export async function sendOrder(payload: OrderPayload): Promise<void> {
  if (!ENDPOINT) {
    if (import.meta.env.DEV) {
      console.info("[ordini] VITE_ORDER_ENDPOINT assente: invio simulato.", payload);
      await new Promise((resolve) => setTimeout(resolve, 400));
      return;
    }
    throw new Error("VITE_ORDER_ENDPOINT non configurato: impossibile inviare l'ordine.");
  }

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Con l'header Accept, Formspree risponde in JSON invece di redirigere
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...payload,
      // "_subject" è il campo standard Formspree per l'oggetto dell'email
      _subject: `Ordine ${payload.riferimento} — ${payload.totale} (${payload.metodo})`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Invio ordine non riuscito (HTTP ${response.status})`);
  }
}
