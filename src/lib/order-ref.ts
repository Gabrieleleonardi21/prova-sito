/**
 * Riferimento d'ordine leggibile, es. "SLT-260728-K4TQ":
 * data + 4 caratteri casuali. Serve a boutique e cliente per citare
 * l'ordine al telefono o via email; viaggia nell'oggetto dell'email,
 * nei metadata Stripe e nella pagina di conferma.
 */

// Niente caratteri ambigui (0/O, 1/I/L) per dettarlo senza errori.
const ALPHABET = "ABCDEFGHJKMNPQRSTVWXYZ23456789";

export function makeOrderRef(): string {
  const now = new Date();
  const anno = String(now.getFullYear()).slice(2);
  const mese = String(now.getMonth() + 1).padStart(2, "0");
  const giorno = String(now.getDate()).padStart(2, "0");

  const random = new Uint32Array(4);
  crypto.getRandomValues(random);
  let suffisso = "";
  for (const value of random) {
    suffisso += ALPHABET[value % ALPHABET.length];
  }

  return `SLT-${anno}${mese}${giorno}-${suffisso}`;
}
