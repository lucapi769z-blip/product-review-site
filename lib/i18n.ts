// Language architecture: symmetric /en and /it prefixes, both built.

export const locales = ["en", "it"] as const;
export type Locale = (typeof locales)[number];

export const builtLocales: readonly Locale[] = locales;

export const localeLabels: Record<Locale, { short: string; name: string }> = {
  en: { short: "EN", name: "English" },
  it: { short: "IT", name: "Italiano" },
};

export function isBuiltLocale(value: string): value is Locale {
  return (builtLocales as readonly string[]).includes(value);
}
