// Formattazione dei prezzi in euro, stile italiano (es. "1.008,00 €").
const euro = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" });

export function formatEuro(value: number): string {
  return euro.format(value);
}
