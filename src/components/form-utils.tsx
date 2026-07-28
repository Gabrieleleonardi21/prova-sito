/**
 * Utility condivise dai form del sito (contatti e checkout),
 * per evitare di ripetere le stesse funzioni in ogni componente.
 */

// Classi Bootstrap del campo: aggiunge "is-invalid" quando c'è un errore.
export function fieldClass(base: string, error?: string): string {
  if (error) {
    return `${base} is-invalid`;
  }
  return base;
}

// Collega il campo al proprio messaggio d'errore (screen reader inclusi).
export function describedBy(id: string, error?: string): string | undefined {
  if (error) {
    return `${id}-errore`;
  }
  return undefined;
}

// Messaggio d'errore del campo, con id referenziato da aria-describedby.
export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }
  return (
    <div id={`${id}-errore`} className="invalid-feedback d-block">
      {message}
    </div>
  );
}

/**
 * Campo honeypot anti-spam: invisibile agli utenti reali (classe Bootstrap
 * visually-hidden), ma i bot che compilano tutti i campi lo riempiono.
 * Se arriva pieno, il form finge il successo senza inviare nulla.
 */
export function HoneypotField() {
  return (
    <div className="visually-hidden" aria-hidden="true">
      <label htmlFor="sito_web">Non compilare questo campo</label>
      <input id="sito_web" name="sito_web" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

// Vero se il campo honeypot è stato compilato (quindi è un bot).
export function isSpam(data: Record<string, unknown>): boolean {
  return typeof data.sito_web === "string" && data.sito_web !== "";
}

/**
 * Dopo un submit fallito porta il focus al primo campo con errore,
 * nell'ordine in cui i campi compaiono nel form: chi usa tastiera o
 * screen reader arriva subito al punto da correggere.
 */
export function focusFirstError(
  form: HTMLFormElement,
  errors: Partial<Record<string, string>>,
): void {
  for (const element of Array.from(form.elements)) {
    const name = (element as HTMLInputElement).name;
    if (name && errors[name]) {
      (element as HTMLElement).focus();
      return;
    }
  }
}
