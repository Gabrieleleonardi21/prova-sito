/**
 * Prefissa un percorso assoluto con il base path della build.
 *
 * In locale e su dominio proprio il base è "/" e non cambia nulla; su
 * GitHub Pages di progetto il sito vive sotto /<nome-repo>/ (variabile
 * VITE_BASE nel workflow di deploy) e i link assoluti scritti a mano
 * («/#contatti», «/shop») punterebbero fuori dal sito senza questo helper.
 * I <Link> di react-router non ne hanno bisogno: usano il basename del router.
 */
export function withBase(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, "");
}
