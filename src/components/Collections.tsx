import { Link } from "react-router-dom";
import { COLLECTIONS } from "@/lib/site-content";
import { prefetch } from "@/lib/prefetch";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Collections() {
  return (
    <section id="collezioni" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Le nostre collezioni"
          title="Ogni pezzo scelto, uno per uno"
          intro="Selezioniamo poche cose, ma giuste: metalli preziosi, segnatempo affidabili e creazioni che restano in famiglia."
        />

        <div className="row g-4 mt-5">
          {COLLECTIONS.map((item, i) => (
            <Reveal key={item.title} delay={i * 100} className="col-12 col-sm-6">
              {/* Ogni card porta alla propria categoria dello shop */}
              <Link
                to={`/shop?categoria=${item.categoryId}`}
                className="collection-card"
                onMouseEnter={() => prefetch("shop")}
                onFocus={() => prefetch("shop")}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="collection-card__img"
                />
                <span className="collection-card__veil" aria-hidden="true" />
                <span className="collection-card__body">
                  <span className="d-block display-serif fs-2">{item.title}</span>
                  <span className="d-block mt-2 small text-on-ink">{item.description}</span>
                  <span className="d-inline-block mt-3 collection-card__cta">
                    Scopri nello shop
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
