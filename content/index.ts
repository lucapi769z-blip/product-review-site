import type { Locale } from "@/lib/i18n";
import { en, type Dictionary } from "./en";
import { it } from "./it";

const dictionaries: Record<Locale, Dictionary> = { en, it };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
