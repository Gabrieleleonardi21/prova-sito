# Gioielleria Saltini

Sito della Gioielleria Saltini di Nettuno: landing di presentazione + shop
online con carrello e checkout. Stack volutamente semplice: **Vite (build
classica) + React 19 + TypeScript**, **react-router** per le pagine,
**Bootstrap 5 precompilato** personalizzato con **solo CSS** (niente Tailwind,
niente Sass, niente SSR), `lucide-react` per le icone, `zod` per la validazione
dei form.

## Comandi

```bash
npm install       # installa le dipendenze
npm run dev       # sviluppo con hot reload (http://localhost:5173)
npm run build     # tipi (tsc) + build + generazione HTML SEO in dist/
npm run preview   # serve la build di produzione in locale
npm run lint      # ESLint su tutto il progetto
npm run test:e2e  # test end-to-end Playwright (avvia da solo il dev server)
```

## Struttura

```
index.html                 head della pagina: meta SEO/social, font, JSON-LD, favicon
public/favicon.svg         monogramma "S" nei colori del brand
src/
  main.tsx                 entry: importa Bootstrap, poi styles.css, monta <App/>
  App.tsx                  router: header e footer comuni + rotte delle pagine
  styles.css               design system: override Bootstrap via variabili --bs-* + layer Saltini
  vite-env.d.ts            tipizzazione delle variabili d'ambiente (.env)
  pages/                   una rotta per file (caricate lazy: un chunk a pagina):
    HomePage.tsx             /                  landing (sezioni di racconto)
    ShopPage.tsx             /shop              catalogo: filtro per categoria
                                                (gioielli/orologi/accessori/fidanzamento)
                                                + tipologia dentro i gioielli
    ProductPage.tsx          /shop/:slug        scheda prodotto + aggiungi al carrello
    CartPage.tsx             /carrello          carrello con quantità e totale
    CheckoutPage.tsx         /checkout          dati spedizione + metodo di pagamento
    OrderConfirmationPage    /ordine-confermato conferma (flusso email o ritorno Stripe)
    LegalPage.tsx            /privacy /cookie-policy /condizioni-di-vendita /resi
    NotFoundPage.tsx         *                  404
  components/              sezioni della home + utility condivise dei form
                           (MapEmbed: mappe Google caricate solo al click, per il GDPR;
                            ErrorBoundary: pannello di errore al posto dello schermo bianco)
  lib/
    site-content.ts        testi/contenuti della landing in un unico punto
    shop-content.ts        prodotti (nomi e prezzi reali dal sito ufficiale),
                           metodi di pagamento e condizioni di spedizione
    cart.tsx               carrello: context React + persistenza in localStorage
    format.ts              formattazione prezzi in euro
    send-contact.ts        invio del form contatti (endpoint configurabile)
    send-order.ts          invio degli ordini (endpoint configurabile)
    checkout-stripe.ts     pagamento diretto con carta via Stripe (opzionale)
    legal-content.ts       testi delle pagine legali
api/
  create-checkout-session.ts   function serverless (Vercel) per Stripe Checkout
scripts/
  generate-seo.mjs         post-build: HTML statico per rotta, sitemap, robots
e2e/                       test end-to-end Playwright (acquisto, categorie, form)
.github/workflows/ci.yml   CI GitHub Actions: lint + build + e2e a ogni push
```

## Come funziona il CSS (senza Sass)

`main.tsx` importa `bootstrap/dist/css/bootstrap.min.css` e subito dopo
`src/styles.css`. Il file custom personalizza Bootstrap sovrascrivendo le sue
CSS custom properties (`--bs-body-bg`, `--bs-border-radius`, `--bs-btn-*`…):
a parità di specificità vince perché è caricato per ultimo. Dove il CSS
compilato di Bootstrap non usa variabili (titoli, campi del form) ci sono
regole dirette equivalenti. Il resto del file è il layer di classi semantiche
del sito (`.section`, `.panel`, `.btn-gold`, `.hero`, `.collection-card`…).

Il JavaScript di Bootstrap **non** è importato: il menu mobile usa lo state di
React. Se in futuro servissero dropdown/modal/tooltip di Bootstrap, importare
`bootstrap/dist/js/bootstrap.bundle` in un `useEffect`.

## Form contatti

Il form valida con `zod` (messaggi in italiano, errori accessibili via
`aria-describedby`/`aria-invalid`) e invia una POST JSON all'endpoint definito
in `.env`:

1. creare un form su [Formspree](https://formspree.io) (gratuito) collegato a
   `info@gioielleriasaltini.com`;
2. copiare `.env.example` in `.env` e incollare l'URL del form in
   `VITE_CONTACT_ENDPOINT`;
3. fine: successo ed errore sono già gestiti dal componente.

Senza endpoint configurato: in sviluppo l'invio è simulato (log in console),
in produzione il form mostra lo stato di errore con il numero di telefono come
alternativa — così nessuna richiesta va persa in silenzio.

Entrambi i form hanno un campo honeypot anti-spam (invisibile agli utenti,
se un bot lo compila l'invio viene scartato in silenzio) e, dopo un submit
con errori, portano il focus al primo campo da correggere.

Consiglio: attivare in Formspree la "auto-response" su entrambi i form, così
richieste e ordini generano subito un'email di conferma anche al cliente.

## Shop online e pagamenti

Catalogo, condizioni e metodi di pagamento ricalcano il sito ufficiale
gioielleriasaltini.com. Le categorie sono le stesse del sito reale — Gioielli
(linea artigianale Saltini), Orologi (Tissot), Accessori (Montblanc),
Fidanzamento e Matrimonio — con nomi e prezzi dei prodotti reali. Condizioni:
spedizione gratuita in Italia in 24/72h, garanzia 2 anni, reso possibile;
pagamento con **carta** (Visa/Mastercard/Amex), **PayPal**, **Klarna in 3
rate**, **bonifico** (entro 48 ore) o **contrassegno** (+ 8,00 €, unico
supplemento calcolato nel totale).

Flusso base (senza backend): l'ordine arriva via email alla boutique
(endpoint `VITE_ORDER_ENDPOINT`), che ricontatta il cliente con il link di
pagamento, la richiesta PayPal/Klarna o i dati per il bonifico, secondo il
metodo scelto. La pagina di conferma spiega al cliente cosa succederà.

**Addebito immediato con carta (opzionale, via Stripe Checkout):** deployando
il sito su Vercel con la function `api/create-checkout-session.ts` e le
variabili `STRIPE_SECRET_KEY` (sul hosting) e
`VITE_STRIPE_CHECKOUT_ENDPOINT=/api/create-checkout-session` (in `.env`),
il metodo "carta" reindirizza alla pagina di pagamento sicura di Stripe:
prezzi e disponibilità vengono ricontrollati lato server dal catalogo, e al
ritorno il carrello si svuota da solo. Un prodotto può essere marcato
`available: false` nel catalogo: resta visibile ma si acquista solo in
boutique ("Verifica disponibilità").

Nota per il deploy: essendo una SPA con router, il server deve servire
`index.html` anche per i percorsi interni (`/shop`, `/checkout`…). Su Netlify
serve un redirect `/* → /index.html 200`, su Vercel una rewrite equivalente;
`npm run preview` lo fa già da solo.

## SEO, privacy e legale

- **SEO**: `npm run build` genera un HTML statico per ogni rotta (meta e
  Open Graph corretti per crawler e anteprime social), dati strutturati
  schema.org/Product per i prodotti, `sitemap.xml` e `robots.txt`
  (carrello/cassa esclusi dall'indicizzazione). Il dominio è la costante
  `SITE_URL` in `scripts/generate-seo.mjs`.
- **Privacy (GDPR)**: font self-hosted (nessuna connessione a Google Fonts),
  mappe Google caricate solo dopo un click esplicito, nessun cookie di
  profilazione — per questo non serve un cookie banner. Il tutto è descritto
  nella cookie policy del sito.
- **Pagine legali**: condizioni di vendita, resi/recesso, privacy e cookie
  policy sono in `src/lib/legal-content.ts`, basate sulle condizioni del sito
  ufficiale (ragione sociale: Oreficeria Saltini snc). ⚠️ Da far rileggere a
  un professionista prima della messa online.

## Da completare

- `VITE_CONTACT_ENDPOINT` e `VITE_ORDER_ENDPOINT` in `.env` per l'invio reale
  di richieste e ordini (vedi sopra); eventuale `STRIPE_SECRET_KEY` per la carta
- Foto reali al posto dei placeholder Unsplash in `src/lib/site-content.ts` e
  `src/lib/shop-content.ts` (e l'immagine `og:image` in `index.html`)
- Partita IVA reale (`BUSINESS.vat` in `src/lib/site-content.ts` e nelle
  condizioni di vendita): non è pubblicata nemmeno sul sito ufficiale
- Revisione legale dei testi in `src/lib/legal-content.ts`
- Stato reale del magazzino nel campo `available` dei prodotti
- `zod` è alla v3 (il form usa `errorMap`); su zod 4 l'opzione diventa `error`
