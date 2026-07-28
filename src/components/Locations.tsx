import { Clock, MapPin, Navigation, Phone, Smartphone } from "lucide-react";
import { BUSINESS, STORES } from "@/lib/site-content";
import { MapEmbed } from "./MapEmbed";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const telHref = (n: string) => `tel:+39${n.replace(/\s/g, "")}`;

export function Locations() {
  return (
    <section id="visitaci" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Visitaci"
          title="Due indirizzi, la stessa accoglienza"
          intro="Passate a trovarci in boutique: un caffè, qualche domanda e tutto il tempo che serve."
        />

        <div className="row g-4 mt-5">
          {STORES.map((store, i) => (
            <Reveal key={store.name} delay={i * 120} className="col-12 col-lg-6">
              <div className="panel p-4 p-md-5 h-100 d-flex flex-column">
                <h3 className="fs-3">{store.name}</h3>
                <span className="gold-rule mt-3" />

                <ul className="list-unstyled d-grid gap-3 mt-4 mb-0 flex-grow-1 small">
                  <li className="d-flex gap-3">
                    <MapPin size={16} className="text-gold flex-shrink-0 mt-1" aria-hidden="true" />
                    <span className="text-soft">{store.address}</span>
                  </li>
                  <li className="d-flex gap-3">
                    <Phone size={16} className="text-gold flex-shrink-0 mt-1" aria-hidden="true" />
                    <a href={telHref(store.phone)}>{store.phone}</a>
                  </li>
                  <li className="d-flex gap-3">
                    <Smartphone size={16} className="text-gold flex-shrink-0 mt-1" aria-hidden="true" />
                    <a href={telHref(store.mobile)}>{store.mobile}</a>
                  </li>
                  <li className="d-flex gap-3">
                    <Clock size={16} className="text-gold flex-shrink-0 mt-1" aria-hidden="true" />
                    <span className="text-soft">{BUSINESS.hours}</span>
                  </li>
                </ul>

                <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                  <a
                    href={telHref(store.phone)}
                    className="btn btn-gold flex-fill"
                    style={{ padding: "0.85rem 1.5rem", fontSize: "0.72rem" }}
                  >
                    Chiama ora
                  </a>
                  <a
                    href={store.directions}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn btn-outline-line flex-fill d-inline-flex align-items-center justify-content-center gap-2"
                    style={{ padding: "0.85rem 1.5rem", fontSize: "0.72rem" }}
                  >
                    <Navigation size={14} aria-hidden="true" />
                    Indicazioni
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Una mappa per negozio (caricata al click, vedi MapEmbed),
            nello stesso ordine delle card qui sopra */}
        <div className="row g-4 mt-0">
          {STORES.map((store, i) => (
            <Reveal key={store.name} delay={i * 120} className="col-12 col-lg-6">
              <MapEmbed
                title={`Mappa di ${store.name} — ${store.address}`}
                query={store.mapQuery}
                address={store.address}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
