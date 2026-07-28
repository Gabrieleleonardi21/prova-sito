/// <reference types="vite/client" />

// Tipizzazione delle variabili d'ambiente del progetto (file .env).
interface ImportMetaEnv {
  /** Endpoint HTTP a cui spedire il form contatti (es. Formspree). */
  readonly VITE_CONTACT_ENDPOINT?: string;
  /** Endpoint HTTP a cui spedire gli ordini dello shop (es. Formspree). */
  readonly VITE_ORDER_ENDPOINT?: string;
  /** Endpoint della function Stripe Checkout (es. /api/create-checkout-session). */
  readonly VITE_STRIPE_CHECKOUT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
