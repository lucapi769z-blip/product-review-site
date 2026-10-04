import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { editorialHome } from "@/content/editorial-home";
import { articlePath, articles, getArticle, readArticleSource } from "@/content/articles";
import { isBuiltLocale } from "@/lib/i18n";
import { parseMarkdown, plainText } from "@/lib/markdown";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Article } from "@/components/article/Article";

// Single blog article: /{lang}/blog/{slug}. Only articles listed in
// content/articles are built; any other slug or language is a 404.
// Params are generated here for both segments (bottom-up): the article
// list already says which language each article exists in.

type Params = Promise<{ lang: string; slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map(({ lang, slug }) => ({ lang, slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const article = getArticle(lang, slug);
  if (!article || !isBuiltLocale(lang)) return {};

  const heading = parseMarkdown(readArticleSource(article)).find((b) => b.type === "heading");
  const title = heading?.type === "heading" ? plainText(heading.content) : slug;
  return {
    title: `${title} — ${getDictionary(lang).brand}`,
    alternates: { canonical: articlePath(article), languages: {} },
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { lang, slug } = await params;
  const article = getArticle(lang, slug);
  if (!article || !isBuiltLocale(lang)) notFound();
  const t = getDictionary(lang);

  // No translation yet: the other language links to its Home.
  const paths = { [lang]: articlePath(article) };
  // Italian: the same navigation as the editorial Home (anchors to /it).
  const nav = lang === "it" ? { ...t, nav: editorialHome.nav, cta: editorialHome.cta } : t;

  return (
    <>
      <a href="#main" className="skip-link">
        {t.a11y.skipToContent}
      </a>
      <SiteHeader lang={lang} t={nav} paths={paths} />
      <main id="main" tabIndex={-1}>
        <Article article={article} source={readArticleSource(article)} />
      </main>
      <SiteFooter lang={lang} t={t} paths={paths} standalone />
    </>
  );
}
