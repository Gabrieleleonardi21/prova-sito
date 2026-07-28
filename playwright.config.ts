import { defineConfig } from "@playwright/test";

// Test end-to-end (npm run test:e2e): avviano da soli il dev server di Vite.
// Usano il Chrome installato sulla macchina (channel), niente browser da scaricare.
export default defineConfig({
  testDir: "e2e",
  timeout: 60_000,
  use: {
    channel: "chrome",
    headless: true,
    viewport: { width: 1440, height: 900 },
    baseURL: "http://localhost:5173",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    // In locale riusa un dev server già aperto; in CI ne avvia sempre uno pulito
    reuseExistingServer: !process.env.CI,
  },
});
