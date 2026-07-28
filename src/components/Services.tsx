import { BatteryCharging, CreditCard, Diamond, Hammer, PenLine, Scale } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const SERVICES = [
  {
    icon: Hammer,
    title: "Riparazioni e restauri",
    text: "Rimettiamo in vita gioielli e orologi di famiglia, rispettandone il carattere originale.",
  },
  {
    icon: BatteryCharging,
    title: "Cambio batteria e cinturini",
    text: "Intervento rapido in negozio, con verifica dell'impermeabilità quando serve.",
  },
  {
    icon: Scale,
    title: "Valutazione oro e usato",
    text: "Perizia trasparente e quotazione aggiornata, senza alcun impegno da parte vostra.",
  },
  {
    icon: PenLine,
    title: "Incisioni personalizzate",
    text: "Nomi, date e dediche incise a mano o a macchina, anche mentre attendete.",
  },
  {
    icon: Diamond,
    title: "Certificazione diamanti",
    text: "Pietre accompagnate da certificato dei principali istituti gemmologici internazionali.",
  },
  {
    icon: CreditCard,
    title: "Gift Card",
    text: "Il regalo giusto quando volete lasciare la scelta finale a chi lo riceve.",
  },
];

export function Services() {
  return (
    <section id="servizi" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Servizi della boutique"
          title="Ci occupiamo di tutto, anche dopo"
          intro="Il rapporto con voi non finisce alla vendita: è lì che, di solito, comincia davvero."
        />

        <div className="service-grid mt-5">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 100} className="service-card">
              <service.icon size={24} className="text-gold" aria-hidden="true" />
              <h3 className="fs-4 mt-4">{service.title}</h3>
              <p className="small text-soft mb-0">{service.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
