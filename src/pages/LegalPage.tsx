import { Link } from "react-router-dom";
import { LEGAL_DOCS } from "@/lib/legal-content";
import { usePageTitle } from "@/lib/use-page-title";

// Pagina legale generica: il contenuto arriva da legal-content.ts per slug.
export function LegalPage({ slug }: { slug: string }) {
  const doc = LEGAL_DOCS.find((d) => d.slug === slug);

  let title = "Documento non trovato — Gioielleria Saltini";
  if (doc) {
    title = `${doc.title} — Gioielleria Saltini`;
  }
  usePageTitle(title);

  if (!doc) {
    return (
      <section className="subpage">
        <div className="container text-center" style={{ maxWidth: "28rem" }}>
          <h1 className="fs-3">Documento non trovato</h1>
          <Link to="/" className="btn btn-gold mt-4">
            Torna alla home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="subpage">
      <div className="container" style={{ maxWidth: "48rem" }}>
        <p className="eyebrow">Informazioni legali</p>
        <h1 className="mt-3 display-6">{doc.title}</h1>
        <span className="gold-rule mt-4" />

        {doc.sections.map((section) => (
          <div key={section.heading} className="mt-5">
            <h2 className="fs-4">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-soft mt-3 mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
