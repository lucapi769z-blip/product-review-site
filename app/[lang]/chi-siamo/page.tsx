import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Approach, Contact, ForBrands, Hero, WhatWeDo } from "@/components/home/HomeSections";

// Italian "Chi siamo": /it/chi-siamo. The former one-page /it Home, moved
// here unchanged (Hero, What we do, Our approach, For brands, Work with us).
// Italian only; any other language is a 404.

const lang = "it";
const path = `/${lang}/chi-siamo`;

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang }];
}

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(lang);
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: { canonical: path, languages: {} },
  };
}

export default async function ChiSiamoPage({ params }: { params: Promise<{ lang: string }> }) {
  if ((await params).lang !== lang) notFound();
  const t = getDictionary(lang);

  // No `paths` on header and footer: the nav anchors (#approach, #contact…)
  // stay on this page, exactly as on the one-page Home.
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
