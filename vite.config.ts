import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configurazione Vite classica: SPA React con alias "@" → src/
// VITE_BASE serve al deploy su GitHub Pages di progetto (es. "/gioielleria-saltini/");
// in locale e su dominio proprio resta "/".
export default defineConfig({
  base: process.env.VITE_BASE ?? "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
