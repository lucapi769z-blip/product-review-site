import { localeLabels, locales, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content";

// EN / IT switch. Each link points to the equivalent page in the other
// language: the Home by default, or the page given in `paths`.
export function LanguageSwitch({
  current,
  t,
  paths = {},
}: {
  current: Locale;
  t: Dictionary;
  paths?: Partial<Record<Locale, string>>;
}) {
  return (
    <nav className="lang" aria-label={t.a11y.language}>
      <ul className="lang__list">
        {locales.map((locale) => {
          const { short, name } = localeLabels[locale];
          const isCurrent = locale === current;

          return (
            <li key={locale} className="lang__item">
              <a
                href={paths[locale] ?? `/${locale}`}
                className={`lang__link${isCurrent ? " is-current" : ""}`}
                aria-current={isCurrent ? "page" : undefined}
                hrefLang={locale}
                lang={locale}
              >
                <span aria-hidden="true">{short}</span>
                <span className="sr-only">{name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
