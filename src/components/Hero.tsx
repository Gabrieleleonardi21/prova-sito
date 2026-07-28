import { Star } from "lucide-react";
import { BUSINESS, IMAGES } from "@/lib/site-content";

export function Hero() {
  return (
    <section id="top" className="hero">
      <img
        src={IMAGES.hero}
        alt="Dettaglio di gioielli in oro esposti nella boutique Saltini di Nettuno"
        className="hero__media"
        loading="eager"
        fetchPriority="high"
      />
      <span className="hero__overlay" aria-hidden="true" />

      <div className="container hero__body text-center">
        <div className="mx-auto" style={{ maxWidth: "52rem" }}>
          <p className="eyebrow" style={{ color: "var(--saltini-gold-soft)" }}>
            Nettuno — dal {BUSINESS.since}
          </p>

          <p className="wordmark hero__wordmark mt-4 mb-0 text-white">Saltini</p>

          <h1 className="hero__title mt-4 text-white">Tre generazioni di alta gioielleria</h1>

          <p className="mt-4 mx-auto text-on-ink" style={{ maxWidth: "36rem" }}>
            Dal 1946 scegliamo, creiamo e custodiamo gioielli e orologi per le famiglie del litorale
            romano. Con la cura di una bottega artigiana e la fiducia di chi ci sceglie da sempre.
          </p>

          <div className="mt-5 d-flex flex-column flex-sm-row justify-content-center gap-3">
            <a href="#contatti" className="btn btn-gold">
              Prenota una consulenza
            </a>
            <a href="#collezioni" className="btn btn-outline-ivory">
              Scopri le collezioni
            </a>
          </div>

          <div className="mt-5">
            <span className="rating-badge">
              <span className="d-flex gap-1" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" className="text-gold" />
                ))}
              </span>
              {BUSINESS.rating.toString().replace(".", ",")}/5 su {BUSINESS.reviewCount} recensioni
              Google
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
