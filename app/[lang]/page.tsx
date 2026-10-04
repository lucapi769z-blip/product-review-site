import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isBuiltLocale } from "@/lib/i18n";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Approach, Contact, ForBrands, Hero, WhatWeDo } from "@/components/home/HomeSections";

// One-page Home: Hero, What we do, Our approach, For brands, Work with us.
export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isBuiltLocale(lang)) notFound();
  const t = getDictionary(lang);

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
