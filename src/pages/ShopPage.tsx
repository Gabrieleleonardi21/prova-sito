import { Link, useSearchParams } from "react-router-dom";
import { CATEGORIES, JEWELRY_TYPES, PRODUCTS, isAvailable } from "@/lib/shop-content";
import { formatEuro } from "@/lib/format";
import { prefetch } from "@/lib/prefetch";
import { usePageTitle } from "@/lib/use-page-title";
import { Reveal } from "@/components/Reveal";

// Classe del bottone-filtro: evidenziato quando è quello attivo.
function filterClass(active: boolean): string {
  if (active) {
    return "btn btn-outline-line btn-filter is-active";
  }
  return "btn btn-outline-line btn-filter";
}

// Catalogo con filtro per categoria (?categoria=orologi) e, dentro i
// gioielli, sotto-filtro per tipologia (?categoria=gioielli&tipo=anelli).
export function ShopPage() {
  usePageTitle("Shop online — Gioielleria Saltini");
  const [params, setParams] = useSearchParams();
  const activeType = params.get("tipo") ?? "";

  // Un vecchio link con solo ?tipo=… sottintende la categoria gioielli.
  let activeCategory = params.get("categoria") ?? "tutti";
  if (activeCategory === "tutti" && activeType) {
    activeCategory = "gioielli";
  }

  let shown = PRODUCTS;
  if (activeCategory !== "tutti") {
    shown = shown.filter((product) => product.category === activeCategory);
  }
  if (activeCategory === "gioielli" && activeType) {
    shown = shown.filter((product) => product.type === activeType);
  }

  function selectCategory(id: string) {
    // "Tutti" pulisce la query string; cambiare categoria azzera il sotto-filtro.
    if (id === "tutti") {
      setParams({});
      return;
    }
    setParams({ categoria: id });
  }

  function selectType(id: string) {
    if (!id) {
      setParams({ categoria: "gioielli" });
      return;
    }
    setParams({ categoria: "gioielli", tipo: id });
  }

  return (
    <section className="subpage">
      <div className="container">
        <div className="text-center mx-auto" style={{ maxWidth: "42rem" }}>
          <p className="eyebrow">Shop online</p>
          <h1 className="mt-3 display-5">Il nostro catalogo</h1>
          <span className="gold-rule mt-4 mx-auto" />
          <p className="mt-4 text-soft">
            Le creazioni artigianali Saltini, gli orologi e gli accessori delle maison che
            trattiamo. Spedizione gratuita in Italia in 24/72 ore, confezione regalo inclusa.
          </p>
        </div>

        <div
          className="d-flex flex-wrap justify-content-center gap-2 mt-5"
          role="group"
          aria-label="Filtra per categoria"
        >
          <button
            type="button"
            onClick={() => selectCategory("tutti")}
            className={filterClass(activeCategory === "tutti")}
          >
            Tutti
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => selectCategory(category.id)}
              className={filterClass(activeCategory === category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {activeCategory === "gioielli" && (
          <div
            className="d-flex flex-wrap justify-content-center gap-2 mt-3"
            role="group"
            aria-label="Filtra i gioielli per tipologia"
          >
            <button
              type="button"
              onClick={() => selectType("")}
              className={filterClass(activeType === "")}
            >
              Tutti i gioielli
            </button>
            {JEWELRY_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => selectType(type.id)}
                className={filterClass(activeType === type.id)}
              >
                {type.label}
              </button>
            ))}
          </div>
        )}

        <div className="row g-4 mt-4">
          {shown.map((product, i) => (
            <Reveal key={product.slug} delay={(i % 4) * 80} className="col-12 col-sm-6 col-lg-3">
              <Link
                to={`/shop/${product.slug}`}
                className="product-card h-100"
                onMouseEnter={() => prefetch("prodotto")}
                onFocus={() => prefetch("prodotto")}
              >
                <span className="product-card__media">
                  <img src={product.image} alt={product.alt} loading="lazy" />
                </span>
                <span className="d-block p-3">
                  <span
                    className="d-block text-soft text-uppercase"
                    style={{ fontSize: "0.68rem", letterSpacing: "0.18em" }}
                  >
                    {product.brand}
                  </span>
                  <span className="d-block display-serif fs-5 mt-1">{product.name}</span>
                  <span className="d-block price mt-2">{formatEuro(product.price)}</span>
                  {!isAvailable(product) && (
                    <span
                      className="d-block text-soft text-uppercase mt-1"
                      style={{ fontSize: "0.65rem", letterSpacing: "0.16em" }}
                    >
                      Disponibilità in boutique
                    </span>
                  )}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
