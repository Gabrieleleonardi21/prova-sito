import { Component, type ReactNode } from "react";
import { withBase } from "@/lib/base";

type Props = { children: ReactNode };
type State = { error: Error | null };

/**
 * Rete di sicurezza: se una pagina lancia un errore a runtime, invece dello
 * schermo bianco compare un pannello con la possibilità di riprovare.
 * (Deve essere un class component: React non ha ancora un equivalente hook.)
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error("[errore pagina]", error);
  }

  render() {
    if (this.state.error) {
      return (
        <section className="subpage">
          <div className="container text-center" style={{ maxWidth: "28rem" }}>
            <h1 className="fs-3">Questa pagina non si è caricata</h1>
            <p className="small text-soft mt-2">
              Qualcosa è andato storto. Provate a ricaricare oppure tornate alla home.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
              <button
                type="button"
                onClick={() => this.setState({ error: null })}
                className="btn btn-gold"
              >
                Riprova
              </button>
              <a
                href={withBase("/")}
                className="btn btn-outline-line"
                style={{ padding: "0.85rem 1.5rem", fontSize: "0.72rem" }}
              >
                Torna alla home
              </a>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
