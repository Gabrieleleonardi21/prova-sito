/**
 * Invio della richiesta di contatto via HTTP POST.
 *
 * L'endpoint si configura nel file `.env` con VITE_CONTACT_ENDPOINT
 * (es. Formspree: https://formspree.io/f/XXXXXXXX — vedi .env.example e README).
 * Il payload parte in JSON; qualunque risposta non-2xx fa lanciare un errore
 * e il componente ContactForm mostra automaticamente lo stato di errore.
 *
 * Senza endpoint configurato:
 *  - in sviluppo l'invio viene simulato (log in console) per poter provare il form;
 *  - in produzione lancia un errore: meglio un avviso visibile all'utente
 *    che perdere silenziosamente i messaggi dei clienti.
 */

export type ContactPayload = {
  nome: string;
  email: string;
  telefono: string;
  motivo: "informazioni" | "su-misura" | "riparazione" | "appuntamento";
  messaggio: string;
};

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

export async function sendContact(payload: ContactPayload): Promise<void> {
  if (!ENDPOINT) {
    if (import.meta.env.DEV) {
      console.info("[contatti] VITE_CONTACT_ENDPOINT assente: invio simulato.", payload);
      await new Promise((resolve) => setTimeout(resolve, 400));
      return;
    }
    throw new Error("VITE_CONTACT_ENDPOINT non configurato: impossibile inviare la richiesta.");
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
      _subject: `Nuova richiesta dal sito — ${payload.motivo}`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Invio non riuscito (HTTP ${response.status})`);
  }
}
