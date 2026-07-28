import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/**
 * Scansione WCAG 2.x A/AA con axe-core sulle pagine principali.
 *
 * La regola "color-contrast" è disattivata consapevolmente: l'oro del brand
 * (#c6a15b) su avorio non raggiunge il contrasto AA e la palette è una
 * decisione del titolare/designer, tracciata nel TODO — tutte le altre
 * verifiche (ARIA, label, struttura, landmark…) bloccano la CI se falliscono.
 */
async function scan(page: Page) {
  return new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .disableRules(["color-contrast"])
    .analyze();
}

// Un articolo nel carrello, per poter analizzare anche carrello e cassa.
const CARRELLO = JSON.stringify([{ slug: "bracciale-rigido-oro-giallo-smeraldo", qty: 1 }]);

const PAGINE = [
  { percorso: "/", attesa: "text=Tre generazioni di alta gioielleria", nome: "home" },
  { percorso: "/shop", attesa: "text=Il nostro catalogo", nome: "shop" },
  {
    percorso: "/shop/orologio-tissot-gentleman-38mm",
    attesa: "h1:has-text('Orologio Tissot Gentleman 38 mm')",
    nome: "scheda prodotto",
  },
  { percorso: "/carrello", attesa: "h1:has-text('Carrello')", nome: "carrello" },
  { percorso: "/checkout", attesa: "h1:has-text('Cassa')", nome: "cassa" },
  { percorso: "/privacy", attesa: "h1:has-text('Informativa sulla privacy')", nome: "privacy" },
];

for (const pagina of PAGINE) {
  test(`accessibilità: ${pagina.nome}`, async ({ page }) => {
    await page.addInitScript((valore) => {
      localStorage.setItem("saltini-carrello", valore);
    }, CARRELLO);
    await page.goto(pagina.percorso);
    await page.waitForSelector(pagina.attesa);
    const risultati = await scan(page);
    expect(risultati.violations).toEqual([]);
  });
}
