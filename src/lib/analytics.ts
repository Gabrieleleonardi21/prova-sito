/**
 * Statistiche di traffico SENZA cookie (Plausible), attive solo se in `.env`
 * è impostato VITE_PLAUSIBLE_DOMAIN (es. "gioielleriasaltini.com").
 *
 * Plausible non usa cookie né identifica i visitatori: dati aggregati e
 * anonimi, quindi niente banner di consenso — coerente con la cookie policy.
 * Lo script traccia da solo anche i cambi pagina della SPA (pushState).
 */
export function initAnalytics(): void {
  const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
  if (!domain) {
    return;
  }
  const script = document.createElement("script");
  script.defer = true;
  script.src = "https://plausible.io/js/script.js";
  script.setAttribute("data-domain", domain);
  document.head.append(script);
}
