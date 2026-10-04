import { readFileSync } from "node:fs";
import path from "node:path";
import type { Locale } from "@/lib/i18n";
import type { MediaSlot } from "@/content/media";

// Blog articles. Each text lives verbatim in content/articles/{lang}/{slug}.md
// and is rendered as written: edit the Markdown, never the components.
//
// Order: newest first; the Home gallery follows it.
//
// Routes: /{lang}/blog/{slug}. There is no /{lang}/blog archive yet; add it
// (and the "Blog" entry in the primary navigation) once it is designed.
//
// Photography: same convention as content/media.ts. Set `src` to a file in
// /public/images/ to replace the placeholder. The article hero is cropped to
// 1:1 on mobile, 3:2 on tablet and 16:9 on desktop: supply 2400 × 1350 or
// larger, product near the centre. Figures between sections are not used
// yet; they would span the same wide column as the hero.

/** Product categories. Labels live in content/editorial-home.ts. */
export const categoryIds = ["smartphone", "audio", "wearable", "casa", "computer"] as const;
export type CategoryId = (typeof categoryIds)[number];

export type Article = {
  lang: Locale;
  slug: string;
  category: CategoryId;
  /** Kicker above the headline, e.g. ["Blog", "Recensione"]. */
  kicker: string[];
  hero: MediaSlot & { alt: string; placeholder: string };
};

export const articles: Article[] = [
  {
    lang: "it",
    slug: "iphone-18-pro-il-telefono-che-ti-mente-in-faccia",
    category: "smartphone",
    kicker: ["Blog", "Recensione"],
    hero: {
      src: null,
      scene: "phone",
      alt: "iPhone 18 Pro visto dal retro, con il modulo fotocamera, appoggiato su una superficie in pietra.",
      placeholder: "Segnaposto foto — iPhone 18 Pro",
    },
  },
];

export function getArticle(lang: string, slug: string): Article | undefined {
  return articles.find((article) => article.lang === lang && article.slug === slug);
}

export function articlePath(article: Pick<Article, "lang" | "slug">): string {
  return `/${article.lang}/blog/${article.slug}`;
}

export function readArticleSource(article: Article): string {
  return readFileSync(path.join(process.cwd(), "content/articles", article.lang, `${article.slug}.md`), "utf8");
}
