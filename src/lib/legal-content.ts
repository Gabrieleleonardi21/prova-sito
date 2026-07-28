/**
 * Testi delle pagine legali, in un unico punto come gli altri contenuti.
 *
 * Basati sulle condizioni pubblicate dal sito ufficiale gioielleriasaltini.com
 * (ragione sociale: Oreficeria Saltini snc) e adattati al funzionamento
 * effettivo di QUESTO sito: spedizione gratuita in Italia, contrassegno +8 €,
 * niente cookie di profilazione, mappe Google caricate solo su richiesta.
 *
 * ⚠️ Sono una base di partenza seria ma vanno fatti rileggere a un
 * professionista prima della messa online: non sostituiscono una consulenza legale.
 */

export type LegalDoc = {
  slug: string;
  title: string;
  /** Usata come meta description della pagina. */
  description: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: "condizioni-di-vendita",
    title: "Condizioni generali di vendita",
    description:
      "Condizioni generali di vendita dello shop online di Gioielleria Saltini: ordini, prezzi, spedizioni, pagamenti e garanzie.",
    sections: [
      {
        heading: "Il venditore",
        paragraphs: [
          "I prodotti acquistati su questo sito sono venduti da Oreficeria Saltini snc, con sedi in Piazza Mazzini 5/6 e Via Santa Maria 14, 00048 Nettuno (RM) — email info@gioielleriasaltini.com, telefono 06 9880711.", // TODO: aggiungere P.IVA e REA reali
        ],
      },
      {
        heading: "Ordini e conclusione del contratto",
        paragraphs: [
          "L'invio dell'ordine dal sito costituisce una proposta di acquisto. Il contratto si conclude quando la boutique conferma l'ordine via email, insieme alle istruzioni per completare il pagamento con il metodo scelto (carta tramite link sicuro, PayPal, Klarna, bonifico bancario oppure contrassegno).",
          "Gli ordini con merce disponibile vengono preparati entro 2 giorni lavorativi dalla ricezione del pagamento. In caso di indisponibilità sopravvenuta di un articolo, il cliente viene avvisato e l'eventuale importo già versato viene interamente rimborsato.",
        ],
      },
      {
        heading: "Prezzi",
        paragraphs: [
          "Tutti i prezzi sono espressi in euro e comprensivi di IVA. I prezzi possono variare senza preavviso, anche in occasione di promozioni: al cliente si applica il prezzo visibile al momento dell'invio dell'ordine.",
        ],
      },
      {
        heading: "Spedizione",
        paragraphs: [
          "La spedizione è gratuita in tutta Italia, con corriere espresso assicurato e consegna in 24/72 ore. Il pagamento in contrassegno comporta un supplemento di 8,00 €, indicato chiaramente prima della conferma dell'ordine.",
          "Il cliente è responsabile della correttezza dei dati di consegna. Alla ricezione si raccomanda di verificare l'integrità del pacco e di segnalare eventuali danni al corriere (accettazione con riserva) e via email entro 48 ore.",
        ],
      },
      {
        heading: "Garanzia",
        paragraphs: [
          "Tutti i prodotti sono coperti dalla garanzia legale di conformità di 24 mesi prevista dal Codice del Consumo per i consumatori privati, oltre all'eventuale garanzia convenzionale del produttore (di norma 12 mesi). La garanzia copre i difetti di conformità originari, non i danni da uso improprio o usura.",
        ],
      },
      {
        heading: "Legge applicabile",
        paragraphs: [
          "Le presenti condizioni sono regolate dalla legge italiana. Per le controversie con consumatori è competente il foro del luogo di residenza o domicilio del consumatore. È possibile ricorrere alla piattaforma europea di risoluzione online delle controversie (ODR): https://ec.europa.eu/consumers/odr.",
        ],
      },
    ],
  },
  {
    slug: "resi",
    title: "Recesso, cambi e restituzioni",
    description:
      "Come esercitare il diritto di recesso entro 14 giorni e come funzionano cambi e restituzioni degli acquisti online.",
    sections: [
      {
        heading: "Diritto di recesso (14 giorni)",
        paragraphs: [
          "Il consumatore può recedere dall'acquisto entro 14 giorni dalla ricezione dei prodotti, senza doverne indicare il motivo, dandone comunicazione esplicita via email a info@gioielleriasaltini.com oppure per posta a Oreficeria Saltini snc, Piazza Mazzini 5, 00048 Nettuno (RM).",
          "Il rimborso avviene entro 14 giorni dalla comunicazione di recesso, con lo stesso metodo di pagamento utilizzato per l'acquisto. Le spese di restituzione sono a carico del cliente.",
        ],
      },
      {
        heading: "Condizioni della merce restituita",
        paragraphs: [
          "La merce deve rientrare integra e non utilizzata, con confezione esterna, imballo interno e tutti gli accessori originali (garanzie, certificati, astucci). Non è possibile accettare resi di merce visibilmente utilizzata o con confezione manomessa.",
        ],
      },
      {
        heading: "Esclusioni",
        paragraphs: [
          "Il diritto di recesso non si applica ai prodotti personalizzati: incisioni, anelli messi a misura, orologi modificati su richiesta e creazioni su misura. Sono esclusi anche gli acquisti effettuati con Partita IVA.",
        ],
      },
      {
        heading: "Cambio merce",
        paragraphs: [
          "In caso di errore del cliente, il cambio può essere richiesto entro 14 giorni per merce non utilizzata e ancora imballata; le spese di spedizione sono a carico del cliente.",
          "In caso di errore della boutique (articolo diverso da quello ordinato o difettoso all'origine), tutti i costi di ritiro e rispedizione sono a nostro carico, con risposta entro 24/48 ore dalla segnalazione.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Informativa sulla privacy",
    description:
      "Come Gioielleria Saltini tratta i dati personali raccolti dal sito: titolare, finalità, basi giuridiche e diritti dell'interessato (GDPR).",
    sections: [
      {
        heading: "Titolare del trattamento",
        paragraphs: [
          "Il titolare del trattamento è Oreficeria Saltini snc, Piazza Mazzini 5 — 00048 Nettuno (RM), telefono +39 06 9880711, email info@gioielleriasaltini.com.",
        ],
      },
      {
        heading: "Quali dati raccogliamo e perché",
        paragraphs: [
          "Form di contatto: nome, email, telefono e contenuto del messaggio, trattati al solo scopo di rispondere alla richiesta (base giuridica: misure precontrattuali su richiesta dell'interessato).",
          "Ordini dello shop: dati identificativi, di contatto e di spedizione, trattati per gestire l'ordine, il pagamento e la consegna (base giuridica: esecuzione del contratto) e per gli adempimenti fiscali (base giuridica: obbligo legale).",
          "Non utilizziamo i dati per marketing senza un consenso esplicito e separato, e non li cediamo a terzi al di fuori dei fornitori necessari all'esecuzione dell'ordine (corriere, fornitore dei servizi di pagamento, piattaforma di inoltro email).",
        ],
      },
      {
        heading: "Conservazione",
        paragraphs: [
          "I dati delle richieste di contatto sono conservati per il tempo necessario a gestirle. I dati degli ordini sono conservati per i termini previsti dagli obblighi fiscali e contabili (10 anni).",
        ],
      },
      {
        heading: "I tuoi diritti",
        paragraphs: [
          "Ai sensi degli artt. 15–22 del GDPR puoi accedere ai tuoi dati, rettificarli, chiederne la cancellazione, limitarne il trattamento, opporti al trattamento e richiederne la portabilità, scrivendo a info@gioielleriasaltini.com. Hai inoltre il diritto di proporre reclamo al Garante per la protezione dei dati personali.",
        ],
      },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie policy",
    description:
      "Quali cookie e tecnologie di memorizzazione usa questo sito: nessun cookie di profilazione, mappe Google caricate solo su richiesta.",
    sections: [
      {
        heading: "Cookie utilizzati da questo sito",
        paragraphs: [
          "Questo sito non utilizza cookie di profilazione né strumenti di analisi di terze parti.",
          "Per il funzionamento del carrello viene usata la memoria locale del browser (localStorage): contiene solo gli articoli selezionati, resta sul tuo dispositivo e non viene trasmessa a nessuno.",
        ],
      },
      {
        heading: "Contenuti di terze parti su richiesta",
        paragraphs: [
          "Le mappe di Google Maps nella sezione «Visitaci» non vengono caricate automaticamente: compaiono solo dopo un tuo clic su «Carica la mappa». Solo in quel momento il browser si collega ai server di Google, che può impostare propri cookie secondo la sua informativa (https://policies.google.com/privacy).",
          "I caratteri tipografici sono ospitati direttamente su questo sito: la visita non comporta alcuna connessione a servizi di font esterni.",
        ],
      },
      {
        heading: "Come gestire i cookie",
        paragraphs: [
          "Puoi cancellare o bloccare i cookie e la memoria locale in qualsiasi momento dalle impostazioni del tuo browser. Bloccare la memoria locale svuota il carrello ma non impedisce la navigazione del sito.",
        ],
      },
    ],
  },
];
