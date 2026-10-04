import type { Dictionary } from "./en";

// Testo italiano per la Home one-page, Header e Footer.
// Struttura identica a en.ts; i titoli in array vanno a capo per riga su desktop.

export const it: Dictionary = {
  meta: {
    title: "[Brand] — Recensioni di prodotto, contenuti editoriali e fotografia",
    description:
      "Video recensioni, articoli editoriali, fotografia e storie di prodotto che aiutano le persone a scoprire, comprendere e conoscere meglio i prodotti che usano ogni giorno.",
  },

  brand: "[Brand]",

  a11y: {
    skipToContent: "Vai al contenuto",
    primaryNav: "Principale",
    language: "Lingua",
    openMenu: "Apri il menu",
    closeMenu: "Chiudi il menu",
    homeLink: "[Brand], home",
  },

  nav: [
    { label: "Recensioni", href: "#approach" },
    { label: "Contenuti", href: "#what-we-do" },
    { label: "Per i brand", href: "#for-brands" },
  ],

  cta: { label: "Proponi un prodotto", short: "Proponi", href: "#contact" },

  hero: {
    kicker: "Prodotti. Storie. Vita reale.",
    title: ["Recensiamo prodotti", "per persone reali."],
    body: "Video recensioni, articoli editoriali, fotografia e storie di prodotto che aiutano le persone a scoprire, comprendere e conoscere meglio i prodotti che usano ogni giorno.",
  },

  whatWeDo: {
    kicker: "Cosa facciamo",
    title: ["Trasformiamo grandi prodotti", "in grandi storie."],
    intro:
      "Creiamo video recensioni, articoli editoriali, fotografia e storie di prodotto che aiutano le persone a scoprire, comprendere e conoscere meglio ciò che presentiamo.",
    items: [
      {
        icon: "video",
        name: "Video Recensioni",
        body: "Recensioni approfondite, prove e dimostrazioni che mostrano i prodotti nell'utilizzo reale.",
      },
      {
        icon: "article",
        name: "Articoli Editoriali",
        body: "Contenuti approfonditi che raccontano caratteristiche, vantaggi ed esperienza d'uso reale.",
      },
      {
        icon: "camera",
        name: "Fotografia di Prodotto",
        body: "Immagini pulite e professionali che valorizzano dettagli, materiali e personalità del prodotto.",
      },
      {
        icon: "book",
        name: "Storie di Prodotto",
        body: "Contenuti che raccontano idee, persone e innovazione dietro ogni prodotto.",
      },
    ],
  },

  approach: {
    kicker: "Il nostro approccio",
    title: ["Prodotti reali.", "Uso reale. Storie reali."],
    body: "Proviamo i prodotti in condizioni di utilizzo reale e ci concentriamo su ciò che conta davvero: come funzionano, come si utilizzano e quale valore portano nella vita quotidiana.",
    steps: [
      {
        name: "Proviamo",
        body: "Utilizziamo realmente i prodotti per comprenderne punti di forza, limiti e caratteristiche distintive.",
      },
      {
        name: "Osserviamo",
        body: "Individuiamo ciò che rende un prodotto interessante: design, funzionalità, qualità ed esperienza d'uso.",
      },
      {
        name: "Raccontiamo",
        body: "Trasformiamo l'esperienza in contenuti chiari e coinvolgenti che aiutano a comprendere il prodotto immediatamente.",
      },
    ],
  },

  forBrands: {
    kicker: "Per i brand",
    title: ["I vostri prodotti", "meritano una storia migliore."],
    body: "Creiamo contenuti di alta qualità che presentano i vostri prodotti in modo autentico, coinvolgente e credibile, aiutando le persone a scoprirli, comprenderli e apprezzarne il valore.",
    points: [
      {
        name: "Qualità editoriale",
        body: "Contenuti realizzati con cura, attenzione ai dettagli e concentrati sul valore reale del prodotto.",
      },
      {
        name: "Esperienza reale del prodotto",
        body: "Proviamo e utilizziamo i prodotti in situazioni reali per offrire una prospettiva autentica e onesta.",
      },
      {
        name: "Collaborazioni flessibili",
        body: "Singoli prodotti, lanci o progetti editoriali continuativi. Un processo semplice e strutturato.",
      },
    ],
  },

  contact: {
    kicker: "Lavora con noi",
    title: ["Hai un prodotto", "che merita di essere scoperto?"],
    body: "Collaboriamo con brand, produttori, seller Amazon e creatori di nuovi prodotti per raccontare storie autentiche attraverso contenuti editoriali, video e fotografia.",
    submit: { label: "Proponi un prodotto", subject: "Proposta di prodotto" },
    workWithUs: { label: "Lavora con noi", subject: "Richiesta di collaborazione" },
    emailLabel: "Oppure scrivici a",
    note: "Valutiamo solo collaborazioni selezionate.",
  },

  media: {
    hero: {
      alt: "Cuffie wireless appoggiate su un tavolo in pietra, nella luce calda del pomeriggio.",
      placeholder: "Segnaposto foto — cuffie",
    },
    whatWeDo: {
      alt: "Uno smart speaker rivestito in tessuto su una mensola in travertino, accanto a un vaso in ceramica.",
      placeholder: "Segnaposto foto — smart speaker",
    },
    approach: {
      alt: "Un orologio da polso adagiato su una superficie di lino, con il quadrante che cattura la luce.",
      placeholder: "Segnaposto foto — orologio",
    },
    forBrands: {
      alt: "Una macchina per espresso sul piano di una cucina, con una tazzina appena versata.",
      placeholder: "Segnaposto foto — macchina da caffè",
    },
  },

  footer: {
    copyright: "[Brand]",
    amazonNote: "Amazon è un marchio di Amazon.com, Inc. Questo sito non è affiliato ad Amazon.",
    prototypeNote: "Prototipo — testi di lavoro e fotografie segnaposto.",
  },
};
