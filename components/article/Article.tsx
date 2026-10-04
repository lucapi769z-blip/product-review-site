import { Fragment } from "react";
import type { Article as ArticleData } from "@/content/articles";
import { type Block, type Inline, parseMarkdown, plainText } from "@/lib/markdown";
import { Photo } from "@/components/home/Photo";

// Long-form article page. The Markdown source is rendered as written: the
// first heading is the headline, each `---` opens a section, and the last,
// unnumbered section is the closing verdict.
//
// Grid (desktop): a wide column for headline, photograph and section numbers,
// and a reading column inset from it. See .article in globals.css.

export function Article({ article, source }: { article: ArticleData; source: string }) {
  const blocks = parseMarkdown(source);
  const titleIndex = blocks.findIndex((b) => b.type === "heading" && b.level === 1);
  const title = blocks[titleIndex] as Extract<Block, { type: "heading" }>;

  // Split the body on rules: the intro, then one chunk per section.
  const chunks: Block[][] = [[]];
  for (const block of blocks.slice(titleIndex + 1)) {
    if (block.type === "rule") chunks.push([]);
    else chunks[chunks.length - 1].push(block);
  }
  const [intro, ...sections] = chunks;
  const sectionLevel = sections[0]?.[0]?.type === "heading" ? sections[0][0].level : 2;

  return (
    <article className="article" aria-labelledby="article-title">
      <header className="article__header">
        <p className="kicker">
          <span>
            {article.kicker.map((part, i) => (
              <span key={part}>
                {i > 0 ? <span className="article__kicker-sep"> / </span> : null}
                {part}
              </span>
            ))}
          </span>
        </p>
        <h1 id="article-title" className="display article__title">
          <Headline text={plainText(title.content)} />
        </h1>
      </header>

      <Photo
        slot={article.hero}
        alt={article.hero.alt}
        placeholder={article.hero.placeholder}
        className="article__photo"
        sizes="(min-width: 64em) 90vw, 100vw"
        priority
        centered
      />

      <div className="article__section article__intro">
        <Blocks blocks={intro} sectionLevel={sectionLevel} />
      </div>

      {sections.map((blocks, i) => {
        const [heading, ...rest] = blocks;
        const id = `section-${i + 1}`;
        const numbered = heading?.type === "heading" && splitNumber(heading.content) !== null;
        const isVerdict = i === sections.length - 1 && !numbered;

        return (
          <Fragment key={id}>
            <hr className={`article__rule${isVerdict ? " article__rule--strong" : ""}`} />
            <section
              className={`article__section${isVerdict ? " article__verdict" : ""}`}
              aria-labelledby={heading?.type === "heading" ? id : undefined}
            >
              {heading?.type === "heading" ? (
                <h2 id={id} className={isVerdict ? "kicker article__verdict-title" : "article__heading"}>
                  <HeadingText content={heading.content} />
                </h2>
              ) : null}
              <Blocks blocks={heading?.type === "heading" ? rest : blocks} sectionLevel={sectionLevel} />
            </section>
          </Fragment>
        );
      })}
    </article>
  );
}

/** Headline broken after the colon on wider screens; text unchanged. */
function Headline({ text }: { text: string }) {
  const at = text.indexOf(": ");
  if (at === -1) return text;
  return (
    <>
      <span className="line">
        {text.slice(0, at + 1)}
        {" "}
      </span>
      <span className="line">{text.slice(at + 2)}</span>
    </>
  );
}

/** "1. Title" → number and title as separate spans; text unchanged. */
function splitNumber(content: Inline[]): [string, Inline[]] | null {
  const [first, ...rest] = content;
  if (typeof first !== "string") return null;
  const match = first.match(/^(\d+\.) ([\s\S]*)$/);
  return match ? [match[1], [match[2], ...rest]] : null;
}

function HeadingText({ content }: { content: Inline[] }) {
  const split = splitNumber(content);
  if (!split) return <Inlines content={content} />;
  return (
    <>
      <span className="article__number">{split[0]}</span>{" "}
      <span className="article__heading-text">
        <Inlines content={split[1]} />
      </span>
    </>
  );
}

function Blocks({ blocks, sectionLevel }: { blocks: Block[]; sectionLevel: number }) {
  return blocks.map((block, i) => {
    switch (block.type) {
      case "heading": {
        const Tag = block.level <= sectionLevel ? "h2" : "h3";
        return (
          <Tag key={i} className="article__subheading">
            <Inlines content={block.content} />
          </Tag>
        );
      }
      case "paragraph": {
        // A paragraph made only of bold text reads as a beat in the story.
        const standalone = block.content.length === 1 && typeof block.content[0] !== "string";
        return (
          <p key={i} className={standalone ? "article__beat" : undefined}>
            <Inlines content={block.content} />
          </p>
        );
      }
      case "list": {
        const Tag = block.ordered ? "ol" : "ul";
        return (
          <Tag key={i} role="list" className={`article__list article__list--${block.ordered ? "ordered" : "bullet"}`}>
            {block.items.map((item, j) => (
              <li key={j}>
                <Inlines content={item} />
              </li>
            ))}
          </Tag>
        );
      }
      case "rule":
        return <hr key={i} className="article__rule" />;
    }
  });
}

function Inlines({ content }: { content: Inline[] }) {
  return content.map((node, i) => {
    if (typeof node === "string") return node;
    const Tag = node.type === "strong" ? "strong" : "em";
    return (
      <Tag key={i}>
        <Inlines content={node.children} />
      </Tag>
    );
  });
}
