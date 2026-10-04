import type { Dictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import { LanguageSwitch } from "./LanguageSwitch";

// Quiet closing footer, continuing the dark Contact section. No registration
// or legal details are shown because none exist yet; added once approved.
// `standalone` is for pages without the Contact section above it.
export function SiteFooter({
  lang,
  t,
  paths,
  standalone = false,
}: {
  lang: Locale;
  t: Dictionary;
  paths?: Partial<Record<Locale, string>>;
  standalone?: boolean;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className={`site-footer${standalone ? " site-footer--standalone" : ""}`}>
      <div className="container">
        <div className="site-footer__inner">
          <p className="site-footer__brand">{t.brand}</p>
          <div className="site-footer__notes">
            <p>{t.footer.amazonNote}</p>
            <p>{t.footer.prototypeNote}</p>
          </div>
          <div className="site-footer__end">
            <LanguageSwitch current={lang} t={t} paths={paths} />
            <p>
              © {year} {t.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
