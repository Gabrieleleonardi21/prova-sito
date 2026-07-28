import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/** Rivela il contenuto allo scroll tramite Intersection Observer. */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Classi e ritardo di transizione calcolati prima del render, senza ternari.
  const parts = ["reveal"];
  if (visible) {
    parts.push("is-visible");
  }
  if (className) {
    parts.push(className);
  }

  let style: CSSProperties | undefined;
  if (delay) {
    style = { transitionDelay: `${delay}ms` };
  }

  return (
    <Tag ref={ref} style={style} className={parts.join(" ")}>
      {children}
    </Tag>
  );
}
