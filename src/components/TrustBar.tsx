import { Gift, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { Reveal } from "./Reveal";

const ITEMS = [
  { icon: Truck, label: "Spedizione gratuita 24/72h" },
  { icon: ShieldCheck, label: "Garanzia 2 anni" },
  { icon: RotateCcw, label: "Possibilità di reso" },
  { icon: Gift, label: "Confezione regalo" },
];

export function TrustBar() {
  return (
    <section aria-label="I nostri servizi inclusi" className="border-top border-bottom bg-white py-4">
      <div className="container">
        <div className="row g-3 text-center">
          {ITEMS.map((item, i) => (
            <Reveal key={item.label} delay={i * 80} className="col-6 col-lg-3">
              <div className="d-flex align-items-center justify-content-center gap-2">
                <item.icon size={16} className="text-gold flex-shrink-0" aria-hidden="true" />
                <span
                  className="text-soft text-uppercase"
                  style={{ fontSize: "0.72rem", letterSpacing: "0.14em" }}
                >
                  {item.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
