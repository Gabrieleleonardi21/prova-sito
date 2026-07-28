import { useState } from "react";
import { MapPin } from "lucide-react";

/**
 * Mappa Google caricata solo su richiesta (click-to-load), per il GDPR:
 * l'iframe — e quindi la connessione ai server Google, che può impostare
 * cookie di terze parti — parte solo dopo un'azione esplicita dell'utente.
 * Il comportamento è documentato nella cookie policy.
 */
export function MapEmbed({ title, query, address }: { title: string; query: string; address: string }) {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <div className="map-frame map-placeholder d-flex flex-column align-items-center justify-content-center text-center p-4">
        <MapPin size={28} className="text-gold" aria-hidden="true" />
        <p className="mt-3 mb-0 small">{address}</p>
        <p className="small text-soft mt-2 mb-0" style={{ maxWidth: "24rem" }}>
          La mappa carica contenuti da Google Maps, che può impostare cookie di terze parti.
        </p>
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="btn btn-outline-line mt-3"
          style={{ padding: "0.7rem 1.4rem", fontSize: "0.72rem" }}
        >
          Carica la mappa
        </button>
      </div>
    );
  }

  return (
    <div className="map-frame">
      <iframe
        title={title}
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
