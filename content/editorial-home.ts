import type { CategoryId } from "@/content/articles";

// Testo della Home editoriale italiana (/it). Il vecchio one-page è ora
// /it/chi-siamo e continua a usare content/it.ts, che qui non si tocca.
//
// Regola: nessun contenuto fittizio. Gli articoli della gallery arrivano solo
// da content/articles; titolo, descrizione e tempo di lettura sono letti dal
// testo di ciascun articolo, la categoria dal campo `category`.

const about = "/it/chi-siamo";

export const editorialHome = {
  // Navigazione della Home, usata anche dall'header degli articoli italiani.
  nav: [
    { label: "Categorie", href: "#categorie" },
    { label: "Articoli", href: "#articoli" },
    { label: "Chi siamo", href: about },
  ],

  cta: { label: "Proponi un prodotto", short: "Proponi", href: `${about}#contact` },

  lead: {
    kicker: "In primo piano",
    // Estratto testuale dall'articolo, non riscritto.
    dek: "Quante di queste meraviglie sentirai davvero, ogni giorno, nella tua tasca?",
    readMore: "Leggi la recensione",
  },

  minutes: (n: number) => `${n} min di lettura`,

  categories: {
    title: "Esplora per categoria",
    all: "Tutte",
    count: (n: number) => (n === 1 ? "1 articolo" : `${n} articoli`),
    items: [
      { id: "smartphone", label: "Smartphone", icon: "smartphone" },
      { id: "audio", label: "Audio", icon: "headphones" },
      { id: "wearable", label: "Smartwatch e wearable", icon: "watch" },
      { id: "casa", label: "Casa e cucina", icon: "cup" },
      { id: "computer", label: "Computer e tablet", icon: "laptop" },
    ] satisfies { id: CategoryId; label: string; icon: string }[],
  },

  gallery: {
    title: "Articoli",
    empty: (category: string) => `Ancora nessun articolo in ${category}.`,
    showAll: "Mostra tutti gli articoli",
  },

  about: {
    text: "Recensiamo prodotti per persone reali.",
    link: { label: "Chi siamo", href: about },
  },
};

export type EditorialHome = typeof editorialHome;
