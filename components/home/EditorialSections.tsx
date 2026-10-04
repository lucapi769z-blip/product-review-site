import { type Article, articlePath, readArticleSource } from "@/content/articles";
import type { EditorialHome } from "@/content/editorial-home";
import { parseMarkdown, plainText } from "@/lib/markdown";
import type { Story } from "./ArticleIndex";
import { Icon } from "./Graphics";
import { Photo } from "./Photo";

// Editorial Home (/it), server parts: the lead story, the Markdown reading
// behind every Story, and the quiet link to Chi siamo. Categories and the
// article gallery are in ArticleIndex.

type Props = { h: EditorialHome };

const EXCERPT_MAX = 140;

export function toStory(article: Article): Story {
  const blocks = parseMarkdown(readArticleSource(article));
  const titleAt = blocks.findIndex((b) => b.type === "heading" && b.level === 1);
  const title = blocks[titleAt];
  const first = blocks.slice(titleAt + 1).find((b) => b.type === "paragraph");
  const words = blocks
    .flatMap((b) => (b.type === "list" ? b.items.map(plainText) : b.type === "rule" ? [] : [plainText(b.content)]))
    .join(" ")
    .split(/\s+/).length;

  let excerpt = first?.type === "paragraph" ? plainText(first.content) : "";
  if (excerpt.length > EXCERPT_MAX) excerpt = `${excerpt.slice(0, excerpt.lastIndexOf(" ", EXCERPT_MAX))}…`;

  return {
    article,
    href: articlePath(article),
    title: title?.type === "heading" ? plainText(title.content) : article.slug,
    excerpt,
    minutes: Math.max(1, Math.round(words / 200)),
  };
}

function Lines({ lines }: { lines: string[] }) {
  return lines.map((line, i) => (
    <span key={line} className="line">
      {line}
      {i < lines.length - 1 ? " " : null}
    </span>
  ));
}

/** "Prodotto: tesi" → one line each on wider screens; text unchanged. */
function Headline({ text }: { text: string }) {
  const at = text.indexOf(": ");
  return at === -1 ? text : <Lines lines={[text.slice(0, at + 1), text.slice(at + 2)]} />;
}

function Meta({ story, h, className = "story-meta" }: { story: Story; className?: string } & Props) {
  return (
    <p className={className}>
      <span>{story.article.kicker[story.article.kicker.length - 1]}</span>
      <span aria-hidden="true"> · </span>
      <span>{h.minutes(story.minutes)}</span>
    </p>
  );
}

/* 1 — Lead story ---------------------------------------------------------- */

export function LeadStory({ h, story }: Props & { story: Story }) {
  return (
    <section className="hero lead-story" aria-labelledby="lead-title">
      <div className="hero__text">
        <p className="kicker">{h.lead.kicker}</p>
        <Meta story={story} h={h} />
        <h1 id="lead-title" className="display hero__title lead-story__title">
          <a href={story.href} className="story-link">
            <Headline text={story.title} />
          </a>
        </h1>
        <p className="lead hero__body">{h.lead.dek}</p>
        <a href={story.href} className="btn btn--primary btn--large hero__cta">
          {h.lead.readMore}
          <Icon name="arrow" className="btn__icon btn__arrow" />
        </a>
      </div>
      <Photo
        slot={story.article.hero}
        alt={story.article.hero.alt}
        placeholder={story.article.hero.placeholder}
        className="hero__photo"
        sizes="100vw"
        priority
        wide
      />
    </section>
  );
}

/* 2 — A quiet line to Chi siamo ------------------------------------------- */

export function AboutNote({ h }: Props) {
  const a = h.about;
  return (
    <aside className="about-note" aria-label={a.link.label}>
      <div className="container about-note__inner">
        <p className="about-note__text">{a.text}</p>
        <a href={a.link.href} className="about-note__link">
          {a.link.label}
          <Icon name="arrow" className="about-note__arrow btn__arrow" />
        </a>
      </div>
    </aside>
  );
}
