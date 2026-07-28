import { expect, test } from "@playwright/test";

// Form contatti della home: validazione, invio (simulato in dev) e honeypot.
test("validazione e invio del form contatti", async ({ page }) => {
  await page.goto("/");
  await page.locator("#contatti button[type=submit]").scrollIntoViewIfNeeded();

  // Submit a vuoto: errori e focus sul primo campo errato
  await page.locator("#contatti button[type=submit]").click();
  await expect(page.locator("text=Inserisci il tuo nome")).toBeVisible();
  await expect(page.locator("#nome")).toBeFocused();

  await page.fill("#nome", "Maria Rossi");
  await page.fill("#email", "maria@esempio.it");
  await page.fill("#telefono", "+39 333 1234567");
  await page.selectOption("#motivo", "riparazione");
  await page.fill("#messaggio", "Vorrei far riparare un orologio di famiglia.");
  await page.check("#privacy");
  await page.locator("#contatti button[type=submit]").click();
  await expect(page.locator("text=Richiesta inviata")).toBeVisible();
});

test("l'honeypot scarta i bot fingendo il successo", async ({ page }) => {
  await page.goto("/");
  await page.locator("#contatti button[type=submit]").scrollIntoViewIfNeeded();
  // Un bot compila anche il campo nascosto: FormData lo legge dal DOM
  await page.evaluate(() => {
    const honeypot = document.querySelector<HTMLInputElement>("#sito_web");
    if (honeypot) {
      honeypot.value = "https://spam.example";
    }
  });
  await page.locator("#contatti button[type=submit]").click();
  // Successo apparente, senza alcuna validazione né invio
  await expect(page.locator("text=Richiesta inviata")).toBeVisible();
});

test("le pagine legali sono raggiungibili dal footer", async ({ page }) => {
  await page.goto("/shop");
  await page.click('footer a:has-text("Condizioni di vendita")');
  await expect(page.locator("h1")).toHaveText("Condizioni generali di vendita");
  await expect(page.locator("text=Oreficeria Saltini snc").first()).toBeVisible();
});
