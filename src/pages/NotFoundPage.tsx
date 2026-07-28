import { Link } from "react-router-dom";
import { usePageTitle } from "@/lib/use-page-title";

// Pagina 404 per qualunque percorso sconosciuto.
export function NotFoundPage() {
  usePageTitle("Pagina non trovata — Gioielleria Saltini");

  return (
    <section className="subpage">
      <div className="container text-center" style={{ maxWidth: "28rem" }}>
        <h1 className="display-1">404</h1>
        <h2 className="fs-3 mt-3">Pagina non trovata</h2>
        <p className="small text-soft mt-2">
          La pagina che cercate non esiste o è stata spostata.
        </p>
        <Link to="/" className="btn btn-gold mt-4">
          Torna alla home
        </Link>
      </div>
    </section>
  );
}
