import type { Dictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import { LanguageSwitch } from "./LanguageSwitch";
import { MobileMenu } from "./MobileMenu";

// `paths` maps each language to the equivalent of the current page. Outside
// the Home, the one-page anchors point back to the Home sections.
export function SiteHeader({
  lang,
  t,
  paths,
}: {
  lang: Locale;
  t: Dictionary;
  paths?: Partial<Record<Locale, string>>;
}) {
  const isHome = !paths?.[lang] || paths[lang] === `/${lang}`;
  const home = (href: string) => (isHome || !href.startsWith("#") ? href : `/${lang}${href}`);
  const nav = t.nav.map((item) => ({ ...item, href: home(item.href) }));
  const cta = { ...t.cta, href: home(t.cta.href) };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a
          href={`/${lang}`}
          className="site-header__brand"
          aria-label={t.a11y.homeLink}
          aria-current={isHome ? "page" : undefined}
        >
          {t.brand}
        </a>

        <nav className="site-nav" aria-label={t.a11y.primaryNav}>
          <ul className="site-nav__list">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="site-nav__link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__tools">
          <a href={cta.href} className="btn btn--outline site-header__cta">
            <span className="site-header__cta-full">{cta.label}</span>
            <span className="site-header__cta-short" aria-hidden="true">
              {cta.short}
            </span>
          </a>
          <span className="site-header__divider" aria-hidden="true" />
          <LanguageSwitch current={lang} t={t} paths={paths} />
          <MobileMenu
            nav={nav}
            cta={cta}
            openLabel={t.a11y.openMenu}
            closeLabel={t.a11y.closeMenu}
            navLabel={t.a11y.primaryNav}
          />
        </div>
      </div>
    </header>
  );
}
