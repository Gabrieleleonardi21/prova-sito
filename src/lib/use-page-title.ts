import { useEffect } from "react";

// Aggiorna il titolo della scheda del browser quando si cambia pagina (SPA).
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
