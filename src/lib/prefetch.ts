/**
 * Prefetch dei chunk delle pagine (code-splitting in App.tsx).
 *
 * Chiamato su mouseenter/focus dei link di navigazione: il chunk viene
 * scaricato nei millisecondi tra quando l'utente punta il link e quando
 * clicca, così la pagina si apre senza attesa né spinner.
 *
 * Gli import() usano gli stessi percorsi dei lazy() di App.tsx: Vite li
 * risolve nello stesso chunk e il browser lo scarica una volta sola
 * (le chiamate successive sono no-op sul modulo già in cache).
 */

type PrefetchablePage = "home" | "shop" | "prodotto" | "carrello" | "checkout";

const LOADERS: Record<PrefetchablePage, () => Promise<unknown>> = {
  home: () => import("@/pages/HomePage"),
  shop: () => import("@/pages/ShopPage"),
  prodotto: () => import("@/pages/ProductPage"),
  carrello: () => import("@/pages/CartPage"),
  checkout: () => import("@/pages/CheckoutPage"),
};

export function prefetch(page: PrefetchablePage): void {
  // Eventuali errori di rete sono ignorati: il lazy() di App.tsx riproverà al click.
  LOADERS[page]().catch(() => {});
}
