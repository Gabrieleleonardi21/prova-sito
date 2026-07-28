import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Font self-hosted (@fontsource): nessuna connessione a Google Fonts,
// meglio per privacy (GDPR) e per la velocità del primo caricamento.
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/jost/300.css";
import "@fontsource/jost/400.css";
import "@fontsource/jost/500.css";
import "@fontsource/jost/600.css";

// Bootstrap precompilato PRIMA di styles.css: gli override devono venire dopo.
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
