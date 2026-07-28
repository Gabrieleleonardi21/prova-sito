/**
 * Pagamento diretto con carta via Stripe Checkout (opzionale).
 *
 * Si attiva impostando VITE_STRIPE_CHECKOUT_ENDPOINT in `.env`
 * (es. /api/create-checkout-session, la function serverless in api/).
 * Senza endpoint il metodo "carta" segue il flusso base: ordine via email
 * e link di pagamento inviato dalla boutique.
 *
 * Il server riceve solo slug e quantità e ricalcola i prezzi dal catalogo:
 * i prezzi non viaggiano mai dal client, che potrebbe manometterli.
 */

import type { CartItem } from "./cart";

export type StripeCheckoutPayload = {
  items: CartItem[];
  email: string;
  /** Dati di spedizione, allegati come metadata all'ordine Stripe. */
  cliente: Record<string, string>;
};

const ENDPOINT = import.meta.env.VITE_STRIPE_CHECKOUT_ENDPOINT;

export function stripeCheckoutActive(): boolean {
  return Boolean(ENDPOINT);
}

export async function startStripeCheckout(payload: StripeCheckoutPayload): Promise<void> {
  const response = await fetch(ENDPOINT!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Creazione sessione di pagamento fallita (HTTP ${response.status})`);
  }

  const data: { url?: string } = await response.json();
  if (!data.url) {
    throw new Error("Risposta del server di pagamento senza URL di checkout.");
  }

  // Redirect alla pagina di pagamento ospitata da Stripe.
  window.location.assign(data.url);
}
