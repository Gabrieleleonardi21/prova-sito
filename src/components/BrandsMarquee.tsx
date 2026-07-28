import { BRANDS } from "@/lib/site-content";

// Il secondo giro di nomi serve solo all'animazione: va nascosto agli screen reader.
function ariaHiddenFor(index: number): "true" | undefined {
  if (index >= BRANDS.length) {
    return "true";
  }
  return undefined;
}

/** Marquee infinito con i soli nomi dei marchi, resi in tipografia. */
export function BrandsMarquee() {
  const loop = [...BRANDS, ...BRANDS];

  return (
    <section
      id="marchi"
      aria-label="I marchi che trattiamo"
      className="border-top border-bottom py-5"
    >
      <p className="eyebrow text-center mb-4">I nostri brand</p>
      <div className="marquee">
        <div className="marquee__track">
          {loop.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              aria-hidden={ariaHiddenFor(i)}
              className="brand-name"
            >
              {brand}
            </span>
          ))}
        </div>
        <span className="marquee__fade marquee__fade--start" aria-hidden="true" />
        <span className="marquee__fade marquee__fade--end" aria-hidden="true" />
      </div>
    </section>
  );
}
