import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { articles } from "@/content/articles";
import { editorialHome } from "@/content/editorial-home";
import { isBuiltLocale } from "@/lib/i18n";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Approach, Contact, ForBrands, Hero, WhatWeDo } from "@/components/home/HomeSections";
import { AboutNote, LeadStory, toStory } from "@/components/home/EditorialSections";
import { ArticleIndex } from "@/components/home/ArticleIndex";

// Home. /it is the editorial Home: lead story, categories, the grid of all
// articles, a quiet link to Chi siamo. /en keeps the one-page Home (Hero, What we do, Our approach,
// For brands, Work with us), which in Italian now lives at /it/chi-siamo.
export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isBuiltLocale(lang)) notFound();
  const t = getDictionary(lang);

  if (lang === "it") {
    const h = editorialHome;
    const stories = articles.filter((article) => article.lang === lang).map(toStory);
    const [lead] = stories;

    return (
      <>
        <a href="#main" className="skip-link">
          {t.a11y.skipToContent}
        </a>
        <SiteHeader lang={lang} t={{ ...t, nav: h.nav, cta: h.cta }} />
        <main id="main" tabIndex={-1}>
          {lead ? <LeadStory h={h} story={lead} /> : null}
          <ArticleIndex stories={stories} />
          <AboutNote h={h} />
        </main>
        <SiteFooter lang={lang} t={t} standalone />
      </>
    );
  }

  return (
    <>
      <a href="#main" className="skip-link">
        {t.a11y.skipToContent}
      </a>
      <SiteHeader lang={lang} t={t} />
      <main id="main" tabIndex={-1}>
        <Hero t={t} />
        <WhatWeDo t={t} />
        <Approach t={t} />
        <ForBrands t={t} />
        <Contact t={t} />
      </main>
      <SiteFooter lang={lang} t={t} />
    </>
  );
}
