import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { CartProvider } from "@/lib/cart";

// Code-splitting per rotta: ogni pagina diventa un chunk separato e viene
// scaricata solo alla prima visita (le pagine esportano nomi, non default:
// il .then li adatta alla firma richiesta da lazy).
const HomePage = lazy(() => import("@/pages/HomePage").then((m) => ({ default: m.HomePage })));
const ShopPage = lazy(() => import("@/pages/ShopPage").then((m) => ({ default: m.ShopPage })));
const ProductPage = lazy(() =>
  import("@/pages/ProductPage").then((m) => ({ default: m.ProductPage })),
);
const CartPage = lazy(() => import("@/pages/CartPage").then((m) => ({ default: m.CartPage })));
const CheckoutPage = lazy(() =>
  import("@/pages/CheckoutPage").then((m) => ({ default: m.CheckoutPage })),
);
const OrderConfirmationPage = lazy(() =>
  import("@/pages/OrderConfirmationPage").then((m) => ({ default: m.OrderConfirmationPage })),
);
const LegalPage = lazy(() => import("@/pages/LegalPage").then((m) => ({ default: m.LegalPage })));
const NotFoundPage = lazy(() =>
  import("@/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })),
);

// Al cambio di pagina si riparte dall'alto (gli anchor #… restano gestiti dal browser).
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      // "instant" scavalca lo scroll-behavior: smooth globale: al cambio
      // pagina si riparte dall'alto subito, senza animazione di risalita.
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
}

// Mostrato nei pochi istanti di caricamento del chunk di una pagina.
function PageLoader() {
  return (
    <div className="subpage d-flex align-items-center justify-content-center">
      <span className="spinner-border text-gold" role="status" aria-label="Caricamento" />
    </div>
  );
}

// Router dell'app: header e footer comuni, pagine al centro.
export function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        {/* Per chi naviga da tastiera: salta la navigazione e va al contenuto */}
        <a href="#contenuto" className="skip-link">
          Salta al contenuto
        </a>
        <SiteHeader />
        <main id="contenuto" tabIndex={-1}>
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/shop/:slug" element={<ProductPage />} />
                <Route path="/carrello" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/ordine-confermato" element={<OrderConfirmationPage />} />
                <Route path="/condizioni-di-vendita" element={<LegalPage slug="condizioni-di-vendita" />} />
                <Route path="/resi" element={<LegalPage slug="resi" />} />
                <Route path="/privacy" element={<LegalPage slug="privacy" />} />
                <Route path="/cookie-policy" element={<LegalPage slug="cookie-policy" />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <SiteFooter />
      </CartProvider>
    </BrowserRouter>
  );
}
