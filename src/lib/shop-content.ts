/**
 * Contenuti dello shop online — Gioielleria Saltini.
 *
 * Categorie, prodotti, prezzi e condizioni di vendita ripresi dal sito
 * ufficiale gioielleriasaltini.com:
 *  - categorie: Gioielli (linea artigianale Saltini), Orologi (Tissot),
 *    Accessori (Montblanc), Fidanzamento e Matrimonio;
 *  - spedizione gratuita in Italia, corriere espresso 24/72h;
 *  - pagamenti: carta (via link sicuro), PayPal, Klarna in 3 rate,
 *    bonifico entro 48 ore, contrassegno con supplemento di 8 €.
 *
 * TODO: le immagini sono placeholder Unsplash (una per categoria/tipologia) —
 * sostituire con le fotografie reali dei pezzi, formato quadrato, min. 1200px.
 */

export const CATEGORIES = [
  { id: "gioielli", label: "Gioielli" },
  { id: "orologi", label: "Orologi" },
  { id: "accessori", label: "Accessori" },
  { id: "fidanzamento", label: "Fidanzamento e Matrimonio" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

// Sotto-tipologie usate come secondo livello di filtro dentro "Gioielli".
export const JEWELRY_TYPES = [
  { id: "anelli", label: "Anelli" },
  { id: "bracciali", label: "Bracciali" },
  { id: "collane", label: "Collane" },
  { id: "orecchini", label: "Orecchini" },
] as const;

export type JewelryTypeId = (typeof JEWELRY_TYPES)[number]["id"];

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  /** Solo per i gioielli: tipologia usata dal sotto-filtro. */
  type?: JewelryTypeId;
  /** Marchio mostrato sulla card e nella scheda (Saltini, Tissot…). */
  brand: string;
  /** Prezzo in euro, IVA inclusa. */
  price: number;
  description: string;
  image: string;
  alt: string;
  /** Assente o true = acquistabile online; false = da verificare in boutique
      (pezzi unici o esposti in vetrina: aggiornare dallo stato reale del magazzino). */
  available?: boolean;
};

// Vero se il prodotto è acquistabile online (default: sì).
export function isAvailable(product: Product): boolean {
  return product.available !== false;
}

// Placeholder per categoria/tipologia, già verificati nel progetto.
const IMG = {
  anelli:
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
  bracciali:
    "https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=1200&q=80",
  collane:
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80",
  orecchini:
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
  orologi:
    "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80",
  accessori:
    "https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=1200&q=80",
  fidanzamento:
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
} as const;

export const PRODUCTS: Product[] = [
  // ── Gioielli — linea artigianale Saltini ─────────────────────────
  {
    slug: "anello-solitario-shine-oro-bianco-diamante",
    name: 'Anello Solitario "Shine" in Oro Bianco 18 Kt e Diamante',
    category: "gioielli",
    type: "anelli",
    brand: "Saltini",
    price: 980,
    description:
      "Solitario essenziale in oro bianco 18 Kt, con diamante taglio brillante montato a griffe. Realizzato a mano nel nostro laboratorio.",
    image: IMG.anelli,
    alt: "Anello solitario in oro bianco con diamante su fondale chiaro",
  },
  {
    slug: "anello-solitario-oro-bianco-diamante",
    name: "Anello Solitario in Oro Bianco 18 Kt e Diamante",
    category: "gioielli",
    type: "anelli",
    brand: "Saltini",
    price: 820,
    description:
      "Il solitario classico della tradizione orafa: oro bianco 18 Kt e diamante certificato, per una promessa che dura.",
    image: IMG.anelli,
    alt: "Anello solitario in oro bianco con diamante in primo piano",
  },
  {
    slug: "anello-oro-bianco-diamanti",
    name: "Anello in Oro Bianco 18 Kt e Diamanti",
    category: "gioielli",
    type: "anelli",
    brand: "Saltini",
    price: 3310,
    description:
      "Anello in oro bianco 18 Kt con pavé di diamanti selezionati una a una dal nostro gemmologo.",
    image: IMG.anelli,
    alt: "Anello in oro bianco con pavé di diamanti",
  },
  {
    slug: "anello-trilogy-oro-giallo-diamanti",
    name: "Anello Trilogy in Oro Giallo 18 Kt e Diamanti",
    category: "gioielli",
    type: "anelli",
    brand: "Saltini",
    price: 7110,
    description:
      "Tre diamanti per passato, presente e futuro: il trilogy in oro giallo 18 Kt, lavorato interamente a mano.",
    image: IMG.anelli,
    alt: "Anello trilogy in oro giallo con tre diamanti",
    // Esempio di pezzo unico esposto in boutique: acquisto solo su richiesta
    available: false,
  },
  {
    slug: "anello-veretta-magic-oro-bianco-diamanti",
    name: "Anello Veretta Magic in Oro Bianco 18 Kt e Diamanti",
    category: "gioielli",
    type: "anelli",
    brand: "Saltini",
    price: 1120,
    description:
      "Veretta in oro bianco 18 Kt con diamanti in linea: da sola o accostata alla fede, illumina la mano.",
    image: IMG.anelli,
    alt: "Anello veretta in oro bianco con diamanti in linea",
  },
  {
    slug: "bracciale-oro-giallo-diamante",
    name: "Bracciale in Oro Giallo 18 Kt e Diamante",
    category: "gioielli",
    type: "bracciali",
    brand: "Saltini",
    price: 1008,
    description:
      "Bracciale sottile in oro giallo 18 Kt impreziosito da un diamante da 0,20 ct: elegante ogni giorno.",
    image: IMG.bracciali,
    alt: "Bracciale sottile in oro giallo con diamante",
  },
  {
    slug: "bracciale-rigido-oro-giallo-smeraldo",
    name: "Bracciale Rigido in Oro Giallo 18 Kt e Smeraldo",
    category: "gioielli",
    type: "bracciali",
    brand: "Saltini",
    price: 1660,
    description:
      "Bracciale rigido in oro giallo 18 Kt con smeraldo naturale: un tocco di colore dal carattere deciso.",
    image: IMG.bracciali,
    alt: "Bracciale rigido in oro giallo con smeraldo",
  },
  {
    slug: "bracciale-semirigido-bollicine-oro-rosa-diamanti",
    name: "Bracciale Semi Rigido Bollicine in Oro Rosa 18 Kt e Diamanti",
    category: "gioielli",
    type: "bracciali",
    brand: "Saltini",
    price: 2380,
    description:
      "La linea Bollicine in oro rosa 18 Kt: sfere lucide e diamanti per un polso luminoso e contemporaneo.",
    image: IMG.bracciali,
    alt: "Bracciale semirigido in oro rosa con diamanti",
  },
  {
    slug: "collana-perla-oro-giallo-diamanti",
    name: "Collana con Perla in Oro Giallo 18 Kt e Diamanti",
    category: "gioielli",
    type: "collane",
    brand: "Saltini",
    price: 860,
    description:
      "Collana in oro giallo 18 Kt con perla naturale e diamanti: la delicatezza di un classico senza tempo.",
    image: IMG.collane,
    alt: "Collana in oro giallo con perla e diamanti",
  },
  {
    slug: "collana-trilogy-magic-oro-bianco-diamanti",
    name: "Collana Trilogy Magic in Oro Bianco 18 kt e Diamanti",
    category: "gioielli",
    type: "collane",
    brand: "Saltini",
    price: 1700,
    description:
      "Pendente trilogy in oro bianco 18 Kt: tre diamanti in scala che catturano la luce a ogni movimento.",
    image: IMG.collane,
    alt: "Collana in oro bianco con pendente trilogy di diamanti",
  },
  {
    slug: "collana-pendino-oro-giallo-diamante-ovale",
    name: "Collana Pendino in Oro Giallo 18 Kt e Diamante Ovale",
    category: "gioielli",
    type: "collane",
    brand: "Saltini",
    price: 3080,
    description:
      "Pendino in oro giallo 18 Kt con diamante taglio ovale certificato: un punto luce importante, da tramandare.",
    image: IMG.collane,
    alt: "Collana in oro giallo con diamante taglio ovale",
  },
  {
    slug: "orecchini-punto-luce-oro-bianco-smeraldo",
    name: "Orecchini Punto Luce in Oro Bianco 18 Kt e Smeraldo",
    category: "gioielli",
    type: "orecchini",
    brand: "Saltini",
    price: 760,
    description:
      "Punti luce in oro bianco 18 Kt con smeraldi naturali: il verde intenso che incornicia il viso.",
    image: IMG.orecchini,
    alt: "Orecchini punto luce in oro bianco con smeraldi",
  },

  // ── Orologi — rivenditore autorizzato Tissot ─────────────────────
  {
    slug: "orologio-tissot-gentleman-38mm",
    name: "Orologio Tissot Gentleman 38 mm",
    category: "orologi",
    brand: "Tissot",
    price: 795,
    description:
      "L'automatico versatile per eccellenza: cassa da 38 mm, elegante in ufficio e disinvolto nel tempo libero. Garanzia ufficiale Tissot.",
    image: IMG.orologi,
    alt: "Orologio Tissot Gentleman con quadrante in primo piano",
  },
  {
    slug: "orologio-tissot-classic-dream-40mm",
    name: "Orologio Tissot Classic Dream 40 mm",
    category: "orologi",
    brand: "Tissot",
    price: 495,
    description:
      "Linee pulite e quadrante essenziale: il classico Tissot al quarzo da 40 mm, con garanzia ufficiale.",
    image: IMG.orologi,
    alt: "Orologio Tissot Classic Dream con cinturino in pelle",
  },
  {
    slug: "orologio-tissot-desir-28mm",
    name: "Orologio Tissot Désir 28 mm",
    category: "orologi",
    brand: "Tissot",
    price: 945,
    description:
      "Cassa da 28 mm dal profilo raffinato, pensata per il polso femminile. Garanzia ufficiale Tissot.",
    image: IMG.orologi,
    alt: "Orologio Tissot Désir da donna in primo piano",
  },
  {
    slug: "orologio-tissot-seastar-2000-44mm",
    name: "Orologio Tissot Seastar 2000 44 mm",
    category: "orologi",
    brand: "Tissot",
    price: 975,
    description:
      "Il diver professionale Tissot: automatico, impermeabile fino a 60 atm, cassa da 44 mm. Garanzia ufficiale.",
    image: IMG.orologi,
    alt: "Orologio subacqueo Tissot Seastar con ghiera girevole",
  },

  // ── Accessori — boutique Montblanc ───────────────────────────────
  {
    slug: "penna-montblanc-starwalker-extreme-doue-sfera",
    name: "Penna Montblanc StarWalker Extreme Doué a Sfera",
    category: "accessori",
    brand: "Montblanc",
    price: 650,
    description:
      "La sfera StarWalker Extreme Doué: l'emblema Montblanc fluttuante nella cupola, per una scrittura che si fa notare.",
    image: IMG.accessori,
    alt: "Penna a sfera Montblanc appoggiata su un piano scuro",
  },
  {
    slug: "gemelli-montblanc-starwalker-extreme",
    name: "Gemelli Montblanc StarWalker Extreme",
    category: "accessori",
    brand: "Montblanc",
    price: 330,
    description:
      "Gemelli StarWalker Extreme in metallo pregiato: il dettaglio che completa la camicia nelle occasioni importanti.",
    image: IMG.accessori,
    alt: "Gemelli Montblanc in metallo su fondale scuro",
  },
  {
    slug: "cintura-montblanc-meisterstuck-reversibile-35mm",
    name: "Cintura Montblanc Meisterstück Reversibile 35 mm in Pelle",
    category: "accessori",
    brand: "Montblanc",
    price: 350,
    description:
      "Pelle Meisterstück double-face nero/marrone con fibbia ad ardiglione: due cinture in una.",
    image: IMG.accessori,
    alt: "Cintura in pelle Montblanc con fibbia in metallo",
  },

  // ── Fidanzamento e Matrimonio ────────────────────────────────────
  {
    slug: "anello-salvini-battito-solitario-oro-bianco-rosa-diamante",
    name: "Anello Salvini Battito Solitario in Oro Bianco e Oro Rosa con Diamante",
    category: "fidanzamento",
    brand: "Salvini",
    price: 1395,
    description:
      "Il solitario Battito di Salvini: oro bianco e un cuore di oro rosa a sorreggere il diamante. Certificato ufficiale.",
    image: IMG.fidanzamento,
    alt: "Anello solitario Salvini in oro bianco e rosa con diamante",
  },
  {
    slug: "anello-solitario-cuore-oro-bianco-diamanti",
    name: "Anello Solitario Cuore in Oro Bianco 18 Kt e Diamanti",
    category: "fidanzamento",
    brand: "Saltini",
    price: 3890,
    description:
      "Solitario con montatura a cuore in oro bianco 18 Kt e pavé di diamanti: la proposta che non si dimentica.",
    image: IMG.fidanzamento,
    alt: "Anello solitario con montatura a cuore e diamanti",
  },
  {
    slug: "anello-solitario-oro-bianco-diamante-037ct",
    name: "Anello Solitario in Oro Bianco con Diamante 0,37 ct",
    category: "fidanzamento",
    brand: "Saltini",
    price: 2570,
    description:
      "Solitario in oro bianco con diamante certificato da 0,37 ct: proporzioni studiate per la massima brillantezza.",
    image: IMG.fidanzamento,
    alt: "Anello solitario in oro bianco con diamante da 0,37 carati",
  },
];

export type PaymentMethodId = "carta" | "paypal" | "klarna" | "bonifico" | "contrassegno";

export type PaymentMethod = {
  id: PaymentMethodId;
  label: string;
  description: string;
  /** Supplemento in euro aggiunto al totale (solo contrassegno). */
  fee: number;
  /** Cosa succede dopo l'ordine: mostrato nella pagina di conferma. */
  next: string;
};

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "carta",
    label: "Carta di credito",
    description: "Visa, Mastercard e American Express, tramite link di pagamento sicuro.",
    fee: 0,
    next: "Riceverete via email un link sicuro per completare il pagamento con carta.",
  },
  {
    id: "paypal",
    label: "PayPal",
    description: "Pagamento protetto: la spedizione avviene all'indirizzo indicato su PayPal.",
    fee: 0,
    next: "Riceverete via email la richiesta di pagamento PayPal per completare l'ordine.",
  },
  {
    id: "klarna",
    label: "Klarna — 3 rate",
    description: "Tre rate senza interessi, oppure pagamento entro 30 giorni.",
    fee: 0,
    next: "Riceverete via email il link Klarna per completare il pagamento in 3 rate.",
  },
  {
    id: "bonifico",
    label: "Bonifico bancario",
    description: "Vi inviamo i dati per il bonifico, da completare entro 48 ore.",
    fee: 0,
    next: "Riceverete via email i dati per il bonifico: l'ordine parte alla ricezione del pagamento, da completare entro 48 ore.",
  },
  {
    id: "contrassegno",
    label: "Contrassegno (+ 8,00 €)",
    description: "Pagamento in contanti alla consegna del pacco.",
    fee: 8,
    next: "Pagherete in contanti alla consegna del pacco (supplemento di 8,00 € già incluso nel totale).",
  },
];

export const SHIPPING = {
  note: "Spedizione gratuita in tutta Italia con corriere espresso, consegna in 24/72 ore.",
  detail:
    "Gli ordini ricevuti dal lunedì al giovedì vengono spediti entro 2 giorni lavorativi. Ogni pezzo viaggia assicurato, con confezione regalo inclusa.",
} as const;
