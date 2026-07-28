import { STEPS } from "@/lib/site-content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function CustomCreations() {
  return (
    <section id="su-misura" className="section bg-ink">
      <div className="container">
        <SectionHeading
          tone="dark"
          eyebrow="Creazioni su misura"
          title="Un gioiello che esiste solo per voi"
          intro="Dall'idea al pezzo finito, seguiamo ogni passaggio nel nostro laboratorio."
        />

        <div className="row g-4 g-md-5 mt-5">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 120} className="col-12 col-md-4">
              <div
                className="pt-4"
                style={{ borderTop: "1px solid rgba(198, 161, 91, 0.35)" }}
              >
                <p className="display-serif display-4 text-gold mb-3">{step.number}</p>
                <h3 className="fs-3 text-white">{step.title}</h3>
                <p className="small text-on-ink mb-0">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-5">
          <a href="#contatti" className="btn btn-gold">
            Parliamo del tuo progetto
          </a>
        </Reveal>
      </div>
    </section>
  );
}
