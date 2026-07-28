import { expect, test } from "@playwright/test";

// Le categorie dello shop devono mostrare solo i propri prodotti.
test("la card Orologi della home apre solo orologi", async ({ page }) => {
  await page.goto("/");
  await page.locator(".collection-card").nth(1).scrollIntoViewIfNeeded();
  await page.locator(".collection-card").nth(1).click();
  await page.waitForURL("**/shop?categoria=orologi");
  await expect(page.locator("text=Orologio Tissot Gentleman 38 mm")).toBeVisible();
  await expect(page.locator("text=Anello Solitario")).toHaveCount(0);
});

test("dentro Gioielli il sotto-filtro per tipologia funziona", async ({ page }) => {
  await page.goto("/shop?categoria=gioielli");
  await page.click('button:has-text("Collane")');
  await expect(page.locator("text=Collana con Perla in Oro Giallo 18 Kt e Diamanti")).toBeVisible();
  await expect(page.locator("text=Anello Veretta")).toHaveCount(0);
});

test("un pezzo non disponibile online non è acquistabile", async ({ page }) => {
  await page.goto("/shop/anello-trilogy-oro-giallo-diamanti");
  await expect(page.locator('a:has-text("Verifica disponibilità")')).toBeVisible();
  await expect(page.locator('button:has-text("Aggiungi al carrello")')).toHaveCount(0);
});
