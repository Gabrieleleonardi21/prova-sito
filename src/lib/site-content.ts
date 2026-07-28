/**
 * Token di contenuto del sito — Gioielleria Saltini.
 * Testi originali, scritti ex novo. Nessun logo di marchi terzi.
 */

export const BUSINESS = {
  name: "Gioielleria Saltini",
  // Ragione sociale come da condizioni di vendita del sito ufficiale
  legalName: "Oreficeria Saltini snc",
  wordmark: "Saltini",
  claim: "Alta gioielleria e orologeria a Nettuno dal 1946.",
  since: 1946,
  email: "info@gioielleriasaltini.com",
  rating: 4.9,
  reviewCount: 227,
  facebook: "https://facebook.com/gioielleria.saltini",
  instagram: "https://instagram.com/gioielleriasaltini",
  // TODO: sostituire con la Partita IVA reale della gioielleria
  vat: "P.IVA 00000000000",
  hours: "Lun – Sab 9:00 – 13:00 · 16:30 – 20:00 · Domenica chiuso",
} as const;

// Anchor con "/" davanti: funzionano anche dalle pagine interne (shop, carrello…).
// Marchi e Recensioni restano raggiungibili scorrendo la home e dal footer:
// tolti dal menu per fare spazio alle voci dello shop.
export const NAV_LINKS = [
  { label: "Collezioni", href: "/#collezioni" },
  { label: "La nostra storia", href: "/#storia" },
  { label: "Su misura", href: "/#su-misura" },
  { label: "Servizi", href: "/#servizi" },
  { label: "Visitaci", href: "/#visitaci" },
] as const;

/**
 * TODO: placeholder Unsplash — sostituire con le fotografie reali della boutique.
 * Formati attesi: `hero` orizzontale largo (min. 2000px), `boutique` verticale 3:4.
 */
export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=80",
  boutique:
    "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1200&q=80",
} as const;

/**
 * TODO: i campi `image` sono placeholder Unsplash.
 * Sostituire con foto reali dei pezzi in vetrina, orizzontali 3:2, min. 1200px.
 * `categoryId` collega ogni card alla categoria dello shop (vedi shop-content.ts).
 */
export const COLLECTIONS = [
  {
    title: "Gioielli",
    categoryId: "gioielli",
    description: "Oro, diamanti e pietre naturali selezionate una a una.",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80",
    alt: "Collana in oro con pendente appoggiata su un fondale chiaro",
  },
  {
    title: "Orologi",
    categoryId: "orologi",
    description: "Segnatempo meccanici e al quarzo, con garanzia ufficiale.",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80",
    alt: "Dettaglio del quadrante di un orologio da polso di pregio",
  },
  {
    title: "Accessori",
    categoryId: "accessori",
    description: "Penne, gemelli e piccola oggettistica da regalo.",
    image:
      "https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=1200&q=80",
    alt: "Accessori eleganti in metallo prezioso disposti su un piano scuro",
  },
  {
    title: "Fidanzamento e Matrimonio",
    categoryId: "fidanzamento",
    description: "Solitari e fedi, anche interamente disegnati con voi.",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
    alt: "Anello di fidanzamento con diamante custodito in un cofanetto",
  },
] as const;

export const TIMELINE = [
  {
    year: "1946",
    title: "La fondazione",
    text: "La famiglia Saltini apre il primo piccolo laboratorio orafo nel centro di Nettuno.",
  },
  {
    year: "Anni '70",
    title: "Gli anni della crescita",
    text: "Arrivano l'orologeria e le prime grandi maison: la bottega diventa punto di riferimento.",
  },
  {
    year: "1994",
    title: "La boutique in Piazza Mazzini",
    text: "Uno spazio più ampio e luminoso, pensato per accogliere e consigliare con calma.",
  },
  {
    year: "Oggi",
    title: "Anche online",
    text: "Tre generazioni, due punti vendita e una consulenza che continua anche a distanza.",
  },
] as const;

export const STEPS = [
  {
    number: "01",
    title: "Incontro e idea",
    text: "Ci raccontate l'occasione, lo stile e il budget. Ascoltiamo, proponiamo, immaginiamo insieme.",
  },
  {
    number: "02",
    title: "Disegno e scelta delle pietre",
    text: "Realizziamo il bozzetto e selezioniamo con voi metalli e gemme, con certificazione all'origine.",
  },
  {
    number: "03",
    title: "Realizzazione in laboratorio",
    text: "Il nostro orafo lavora il pezzo a mano, con controlli e prove fino alla consegna.",
  },
] as const;

export const BRANDS = [
  "Bulgari",
  "Omega",
  "TAG Heuer",
  "Longines",
  "Tissot",
  "Hamilton",
  "Montblanc",
  "Gucci",
  "Garmin",
  "Seiko",
  "Citizen",
  "Swatch",
  "Casio",
  "G-Shock",
  "U-Boat",
  "Locman",
  "Festina",
  "Bulova",
  "Daniel Wellington",
  "Crivelli",
  "Salvini",
  "Recarlo",
  "Giorgio Visconti",
  "Chantecler Capri",
  "DoDo",
  "Pandora",
  "Pesavento",
  "Giovanni Raspini",
  "leBebé",
  "PDPaola",
  "Rebecca",
  "Bronzallure",
  "Morellato",
  "Montegrappa",
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Cercavo una fede particolare e mi hanno seguito passo passo, senza fretta. Il risultato è esattamente quello che avevo in mente.",
    initials: "M. R.",
    source: "Google",
  },
  {
    quote:
      "Ho portato l'orologio di mio padre per un restauro: tornato come nuovo, con tempi e preventivo rispettati alla lettera.",
    initials: "A. C.",
    source: "Trustpilot",
  },
  {
    quote:
      "Competenza vera e accoglienza di famiglia. Da anni scelgo qui i regali importanti e non sono mai rimasta delusa.",
    initials: "S. D. L.",
    source: "Google",
  },
] as const;

// `mapQuery` è la query dell'embed di Google Maps nella home: include il nome
// dell'attività così la mappa mostra la scheda Business (recensioni e orari)
// invece del semplice segnaposto. Entrambe le sedi hanno la scheda Google.
export const STORES = [
  {
    name: "Boutique Piazza Mazzini",
    address: "Piazza Mazzini 5/6, 00048 Nettuno (RM)",
    phone: "06 9880711",
    mobile: "389 5370141",
    mapQuery: "Gioielleria Saltini, Piazza Mazzini 5, 00048 Nettuno RM",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Piazza+Mazzini+5,+00048+Nettuno+RM",
  },
  {
    name: "Punto vendita Via Santa Maria",
    address: "Via Santa Maria 14, 00048 Nettuno (RM)",
    phone: "06 88920096",
    mobile: "329 2015728",
    // Su Google la sede di Via Santa Maria è registrata con questo nome
    mapQuery: "Gioielleria Saltini Pandora Nettuno, Via Santa Maria 14, 00048 Nettuno RM",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Via+Santa+Maria+14,+00048+Nettuno+RM",
  },
] as const;
