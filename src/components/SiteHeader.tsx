import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ShoppingBag, X } from "lucide-react";
import { BUSINESS, NAV_LINKS } from "@/lib/site-content";
import { useCart } from "@/lib/cart";
import { prefetch } from "@/lib/prefetch";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fuori dalla home non c'è la hero scura: l'header resta sempre pieno.
  const solid = location.pathname !== "/";

  let headerClass = "site-header";
  if (scrolled || solid) {
    headerClass += " is-scrolled";
  }

  let toggleIcon = <Menu size={24} />;
  let toggleLabel = "Apri il menu";
  if (open) {
    toggleIcon = <X size={24} />;
    toggleLabel = "Chiudi il menu";
  }

  // Il badge del carrello compare solo quando contiene qualcosa.
  let cartBadge = null;
  if (count > 0) {
    cartBadge = <span className="cart-count">{count}</span>;
  }

  return (
    <header className={headerClass}>
      <div className="container d-flex align-items-center justify-content-between">
        <Link
          to="/"
          className="wordmark"
          onMouseEnter={() => prefetch("home")}
          onFocus={() => prefetch("home")}
        >
          {BUSINESS.wordmark}
        </Link>

        <nav aria-label="Navigazione principale" className="d-none d-lg-flex align-items-center gap-4">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="header-link">
              {link.label}
            </a>
          ))}
          <Link
            to="/shop"
            className="header-link"
            onMouseEnter={() => prefetch("shop")}
            onFocus={() => prefetch("shop")}
          >
            Shop
          </Link>
          <Link
            to="/carrello"
            className="header-link cart-link"
            aria-label={`Carrello, ${count} articoli`}
            onMouseEnter={() => prefetch("carrello")}
            onFocus={() => prefetch("carrello")}
          >
            <ShoppingBag size={18} aria-hidden="true" />
            {cartBadge}
          </Link>
          <a
            href="/#contatti"
            className="btn btn-outline-ivory"
            style={{ padding: "0.7rem 1.4rem", fontSize: "0.72rem" }}
          >
            Prenota
          </a>
        </nav>

        <div className="d-flex align-items-center gap-3 d-lg-none">
          <Link
            to="/carrello"
            className="header-link cart-link"
            aria-label={`Carrello, ${count} articoli`}
            onFocus={() => prefetch("carrello")}
          >
            <ShoppingBag size={20} aria-hidden="true" />
            {cartBadge}
          </Link>
          <button
            type="button"
            className="header-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={toggleLabel}
          >
            {toggleIcon}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Navigazione mobile" className="header-drawer d-lg-none">
          <div className="container">
            <ul className="list-unstyled mb-0 d-grid gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="header-link d-block"
                    style={{ fontSize: "0.9rem", letterSpacing: "0.18em" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/shop"
                  onClick={() => setOpen(false)}
                  className="header-link d-block"
                  style={{ fontSize: "0.9rem", letterSpacing: "0.18em" }}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/carrello"
                  onClick={() => setOpen(false)}
                  className="header-link d-block"
                  style={{ fontSize: "0.9rem", letterSpacing: "0.18em" }}
                >
                  Carrello ({count})
                </Link>
              </li>
              <li>
                <a
                  href="/#contatti"
                  onClick={() => setOpen(false)}
                  className="btn btn-outline-ivory"
                  style={{ padding: "0.7rem 1.4rem", fontSize: "0.72rem" }}
                >
                  Prenota una consulenza
                </a>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
}
