import { Star } from "lucide-react";
import { BUSINESS, TESTIMONIALS } from "@/lib/site-content";
import { Reveal } from "./Reveal";

function Stars() {
  return (
    <span className="d-flex gap-1" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} fill="currentColor" className="text-gold" />
      ))}
    </span>
  );
}

export function Reviews() {
  return (
    <section id="recensioni" className="section bg-sand">
      <div className="container">
        <Reveal className="text-center mx-auto" >
          <div className="mx-auto" style={{ maxWidth: "42rem" }}>
            <p className="eyebrow">Recensioni</p>
            <p className="score mt-4 mb-0">{BUSINESS.rating.toString().replace(".", ",")}</p>
            <div className="d-flex justify-content-center mt-3">
              <Stars />
            </div>
            <p
              className="mt-3 mb-0 text-soft text-uppercase small"
              style={{ letterSpacing: "0.14em" }}
            >
              stelle su {BUSINESS.reviewCount} recensioni
            </p>
          </div>
        </Reveal>

        <div className="row g-4 mt-5">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.initials} delay={i * 120} className="col-12 col-md-4">
              <figure className="panel p-4 h-100 d-flex flex-column mb-0">
                <Stars />
                <blockquote className="review-quote mt-3 flex-grow-1">“{t.quote}”</blockquote>
                <figcaption className="d-flex justify-content-between align-items-center border-top pt-3 mt-3">
                  <span
                    className="small fw-medium text-uppercase"
                    style={{ letterSpacing: "0.12em" }}
                  >
                    {t.initials}
                  </span>
                  <span
                    className="text-soft text-uppercase"
                    style={{ fontSize: "0.68rem", letterSpacing: "0.18em" }}
                  >
                    {t.source}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
