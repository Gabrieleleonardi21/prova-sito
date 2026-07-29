# TODO — Migrazione a Firebase (in attesa di OK dalla gioielleria)

> Stato: **piano approvato tecnicamente, lavori NON iniziati**.
> Si parte quando la gioielleria dà l'ok e fornisce i prerequisiti qui sotto.
> Contesto: lo shop reale vende con continuità; il catalogo nel file
> `src/lib/shop-content.ts` diventa il collo di bottiglia — serve un database
> e un pannello che il titolare possa usare da solo.

## 1. Cosa serve dalla gioielleria (prerequisiti, bloccanti)

- [ ] Creare il progetto su https://console.firebase.google.com con l'account
      del titolare e attivare il piano **Blaze** (necessario per le Cloud
      Functions; con i volumi attuali il costo è di pochi euro al mese)
- [ ] Autenticazione per lo sviluppo: eseguire `npx firebase login` nel
      terminale del progetto
- [ ] Chiavi **Stripe** dell'attività (secret key da mettere solo sul hosting,
      mai nel codice o con prefisso VITE_)
- [ ] **Export del catalogo reale** dal gestionale o dalla piattaforma attuale
      (CSV o altro formato): il sito demo ha 22 prodotti, quello vero centinaia
      su ~50 marchi — l'import determina metà del lavoro
- [ ] Conferma del dominio definitivo (oggi il deploy è su GitHub Pages di
      prova; con Firebase si passa a Firebase Hosting, vedi §3)

## 2. Fasi tecniche (in ordine, il sito pubblico resta online durante tutto)

- [ ] **Fondazione**: struttura Firestore (`products`, `orders`), regole di
      sicurezza, Firebase Storage per le foto, Firebase Auth per l'admin
- [ ] **Import catalogo**: script che carica l'export reale in Firestore
      (prezzi, disponibilità, marchi, categorie, foto su Storage)
- [ ] **Build SEO da Firestore**: `scripts/generate-seo.mjs` legge da Firestore
      (Admin SDK) invece che da `shop-content.ts`; una Cloud Function chiama un
      `repository_dispatch` su GitHub quando i prodotti cambiano → il sito si
      rigenera da solo con prezzi aggiornati e SEO statica intatta
      ⚠️ Vincolo: MAI caricare il catalogo solo a runtime nel browser —
      i crawler vedrebbero schede vuote e la SEO costruita andrebbe persa
- [ ] **Ordini e pagamenti**: ordini in Firestore con stato
      (nuovo → pagato → spedito), Stripe Checkout via Cloud Function, webhook
      Stripe che aggiorna lo stato. Nota: Stripe Checkout in Italia supporta
      anche Klarna e PayPal → quasi tutti i metodi su un solo fornitore
- [ ] **Pannello admin** su `/admin` protetto da Firebase Auth: CRUD prodotti,
      upload foto, interruttore disponibilità, lista ordini con stato
- [ ] **Privacy**: aggiornare `src/lib/legal-content.ts` — Google diventa
      responsabile del trattamento per ordini e dati clienti; ricontrollare la
      cookie policy se si aggiungono servizi Firebase lato client
      (NO Firebase Analytics, salterebbe la scelta "niente cookie banner")

## 3. Decisioni da prendere insieme

- [x] **Hosting**: deciso — **Vercel** con repo privato (GitHub Pages non
      supporta i repo privati sul piano gratuito; Vercel in più esegue le
      function `api/`, quindi Stripe funzionerà senza altri cambi)
- [ ] **Collegare il repo a Vercel** (serve l'account del titolare/sviluppatore):
      su https://vercel.com/new importare `Gabrieleleonardi21/prova-sito`,
      framework Vite rilevato da solo, nessuna configurazione da cambiare
      (c'è già `vercel.json`). Da lì ogni push su main va online da solo.
- [ ] Quando arriva la chiave Stripe: impostare `STRIPE_SECRET_KEY` nelle
      Environment Variables del progetto Vercel e
      `VITE_STRIPE_CHECKOUT_ENDPOINT=/api/create-checkout-session`
- [ ] Verificare se conviene migrare tutto il catalogo o partire da un
      sottoinsieme (es. sola linea artigianale Saltini)

## 4. Attivazioni rapide già predisposte (basta una variabile in `.env`)

- [ ] **Statistiche senza cookie**: account su https://plausible.io e
      `VITE_PLAUSIBLE_DOMAIN=<dominio>` — dati aggregati, niente banner
- [ ] **Monitoraggio errori**: terzo form Formspree dedicato e
      `VITE_ERROR_ENDPOINT=<url>` — email alla boutique al primo errore JS
      (in futuro sostituibile con Sentry cambiando solo `report-error.ts`)
- [ ] **Palette e contrasto**: l'oro (#c6a15b) su avorio non raggiunge il
      contrasto WCAG AA; la regola è disattivata nei test di accessibilità —
      decidere col titolare se scurire l'oro dei testi (es. #a8874a)

## 5. TODO preesistenti, indipendenti da Firebase

- [ ] Foto reali al posto dei placeholder Unsplash (risolvibile col pannello
      admin di §2, oppure subito a mano in `shop-content.ts`/`site-content.ts`)
- [ ] Partita IVA reale (`BUSINESS.vat` + condizioni di vendita) — non è
      pubblicata nemmeno sul sito ufficiale
- [ ] Revisione legale dei testi in `src/lib/legal-content.ts`
- [ ] Endpoint Formspree (`VITE_CONTACT_ENDPOINT`, `VITE_ORDER_ENDPOINT`) con
      auto-risposta attiva — restano utili finché non c'è il flusso Firebase
