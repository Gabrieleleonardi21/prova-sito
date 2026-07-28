import { expect, test } from "@playwright/test";

// Flusso di acquisto completo: catalogo → prodotto → carrello → cassa → conferma.
// In sviluppo l'invio dell'ordine è simulato (nessun endpoint configurato).
test("acquisto completo fino alla conferma d'ordine", async ({ page }) => {
  await page.goto("/shop");
  await page.click('button:has-text("Gioielli")');
  await page.click('button:has-text("Bracciali")');
  await page.click("text=Bracciale Rigido in Oro Giallo 18 Kt e Smeraldo");
  await expect(page.locator("text=IVA inclusa")).toBeVisible();

  // Due aggiunte dello stesso articolo → quantità 2
  await page.click('button:has-text("Aggiungi al carrello")');
  await expect(page.locator("text=Aggiunto al carrello.")).toBeVisible();
  await page.click('button:has-text("Aggiungi al carrello")');
  await page.click('a:has-text("Vai al carrello")');

  await expect(page.locator("h1")).toHaveText("Carrello");
  // it-IT non usa il separatore delle migliaia sotto le 5 cifre: 2 × 1660 = "3320,00 €"
  await expect(page.locator(".panel dd.price")).toHaveText(/3320,00/);

  await page.click('a:has-text("Procedi al pagamento")');
  await expect(page.locator("h1")).toHaveText("Cassa");

  // Submit a vuoto: errori di validazione e focus sul primo campo errato
  await page.click('button:has-text("Conferma l\'ordine")');
  await expect(page.locator("text=Inserisci nome e cognome.")).toBeVisible();
  await expect(page.locator("#nome")).toBeFocused();

  // Il contrassegno aggiunge il supplemento al riepilogo
  await page.click("text=Contrassegno (+ 8,00 €)");
  await expect(page.locator("text=Supplemento contrassegno")).toBeVisible();

  await page.fill("#nome", "Maria Rossi");
  await page.fill("#email", "maria@esempio.it");
  await page.fill("#telefono", "+39 333 1234567");
  await page.fill("#indirizzo", "Via Roma 10");
  await page.fill("#citta", "Nettuno");
  await page.fill("#cap", "00048");
  await page.fill("#provincia", "RM");
  await page.check("#privacy");
  await page.click('button:has-text("Conferma l\'ordine")');

  await expect(page.locator("h1")).toContainText("ordine ricevuto");
  await expect(page.locator("text=Contrassegno")).toBeVisible();

  // Dopo l'ordine il carrello deve risultare vuoto
  await page.goto("/carrello");
  await expect(page.locator("text=Il carrello è vuoto")).toBeVisible();
});
