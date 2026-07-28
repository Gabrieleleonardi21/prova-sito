/**
 * Monitoraggio degli errori in produzione, senza dipendenze esterne.
 *
 * Se in `.env` è impostato VITE_ERROR_ENDPOINT (es. un terzo form Formspree),
 * ogni errore JavaScript non gestito arriva via email alla boutique: si scopre
 * un checkout rotto dal primo errore, non dal calo degli ordini.
 * In futuro basta sostituire il corpo di reportError per passare a Sentry.
 *
 * Protezioni anti-rumore: ogni messaggio è inviato una sola volta e al
 * massimo partono 5 segnalazioni per sessione.
 */

const ENDPOINT = import.meta.env.VITE_ERROR_ENDPOINT;
const MAX_PER_SESSIONE = 5;
const inviati = new Set<string>();

export function reportError(messaggio: string, dettaglio?: string): void {
  if (!ENDPOINT) {
    return;
  }
  if (inviati.size >= MAX_PER_SESSIONE || inviati.has(messaggio)) {
    return;
  }
  inviati.add(messaggio);

  fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: `[errore sito] ${messaggio.slice(0, 120)}`,
      messaggio,
      dettaglio: (dettaglio ?? "").slice(0, 2000),
      pagina: window.location.href,
      browser: navigator.userAgent,
    }),
    // Un errore nell'invio dell'errore non deve generare altro rumore.
  }).catch(() => {});
}

// Aggancia gli errori globali non gestiti (eccezioni e promise rifiutate).
export function initErrorReporting(): void {
  if (!ENDPOINT) {
    return;
  }
  window.addEventListener("error", (event) => {
    reportError(String(event.message), event.error?.stack);
  });
  window.addEventListener("unhandledrejection", (event) => {
    reportError(`Promise rifiutata: ${String(event.reason)}`);
  });
}
