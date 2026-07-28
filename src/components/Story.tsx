import { IMAGES, TIMELINE } from "@/lib/site-content";
import { Reveal } from "./Reveal";

export function Story() {
  return (
    <section id="storia" className="section bg-sand">
      <div className="container">
        <div className="row g-5 align-items-center">
          <Reveal className="col-12 col-lg-6 order-2 order-lg-1">
            <p className="eyebrow">La nostra storia</p>
            <h2 className="mt-3 display-5">Dal 1946, a Nettuno</h2>
            <span className="gold-rule mt-4" />
            <p className="mt-4 text-soft">
              Tutto è cominciato con un banco da orafo, pochi attrezzi e la convinzione che un
              gioiello valga soprattutto per la storia che porta con sé. Da allora sono passate tre
              generazioni, ma il modo di lavorare è rimasto lo stesso: lentamente, a mano, guardando
              negli occhi chi entra.
            </p>
            <p className="text-soft mb-0">
              Consigliamo senza fretta e senza forzature. Ci piace capire l'occasione, il carattere
              di chi indosserà il pezzo, il ricordo che c'è dietro. È per questo che molte famiglie
              del litorale tornano da noi per ogni momento importante: un battesimo, un
              anniversario, una promessa.
            </p>
          </Reveal>

          <Reveal delay={120} className="col-12 col-lg-6 order-1 order-lg-2">
            <div className="zoom-frame mx-auto" style={{ aspectRatio: "3 / 4", maxWidth: "26rem" }}>
              <img
                src={IMAGES.boutique}
                alt="Interno della boutique con vetrine illuminate e gioielli in esposizione"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>

        {/* Timeline orizzontale minimale */}
        <ol className="row g-4 list-unstyled mt-5 pt-4 mb-0">
          {TIMELINE.map((step, i) => (
            <Reveal
              as="li"
              key={step.year}
              delay={i * 100}
              className="col-12 col-sm-6 col-lg-3 timeline-item"
            >
              <p className="display-serif fs-2 text-gold mb-1">{step.year}</p>
              <h3 className="fs-5 mb-2">{step.title}</h3>
              <p className="small text-soft mb-0">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
