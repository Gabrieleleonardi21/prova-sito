import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  // Classi calcolate prima del render, senza ternari.
  let wrapperClass = "";
  let innerClass = "";
  let ruleClass = "gold-rule mt-4";
  if (align === "center") {
    wrapperClass = "mx-auto text-center";
    innerClass = "mx-auto";
    ruleClass += " mx-auto";
  }

  // Su fondo scuro l'introduzione usa il colore avorio attenuato.
  let introClass = "mt-4 mb-0 text-soft";
  if (tone === "dark") {
    introClass = "mt-4 mb-0 text-on-ink";
  }

  return (
    <Reveal className={wrapperClass}>
      <div style={{ maxWidth: "42rem" }} className={innerClass}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-3 display-5">{title}</h2>
        <span className={ruleClass} />
        {intro && <p className={introClass}>{intro}</p>}
      </div>
    </Reveal>
  );
}
