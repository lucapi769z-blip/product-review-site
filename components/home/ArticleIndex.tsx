"use client";

import { useState } from "react";
import type { Article, CategoryId } from "@/content/articles";
import { editorialHome as h } from "@/content/editorial-home";
import { Icon } from "./Graphics";
import { Photo } from "./Photo";

// Editorial Home (/it): "Esplora per categoria" and the article gallery.
// Choosing a category filters the gallery in place (there are no category
// pages yet). Without JavaScript every article is listed.

/** What the Home shows of an article, read from its Markdown on the server. */
export type Story = {
  article: Article;
  href: string;
  title: string;
  /** First paragraph of the article, shortened at a word boundary. */
  excerpt: string;
  minutes: number;
};

const labels = Object.fromEntries(h.categories.items.map((c) => [c.id, c.label])) as Record<CategoryId, string>;

export function ArticleIndex({ stories }: { stories: Story[] }) {
  const [current, setCurrent] = useState<CategoryId | null>(null);
  const shown = current ? stories.filter((s) => s.article.category === current) : stories;
  const c = h.categories;

  return (
    <>
      <section id="categorie" className="categories" aria-labelledby="categorie-title">
        <div className="container">
          <h2 id="categorie-title" className="home-heading">
            {c.title}
          </h2>
          <ul className="categories__list">
            {c.items.map((item) => {
              const n = stories.filter((s) => s.article.category === item.id).length;
              const active = current === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`category${active ? " is-active" : ""}`}
                    aria-pressed={active}
                    aria-controls="articoli-list"
                    onClick={() => setCurrent(active ? null : item.id)}
                  >
                    <span className="category__disc" aria-hidden="true">
                      <Icon name={item.icon} className="category__icon" />
                    </span>
                    <span className="category__name">{item.label}</span>
                    <span className="category__count">{c.count(n)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="articoli" className="articles" aria-labelledby="articoli-title">
        <div className="container">
          <div className="articles__head">
            <h2 id="articoli-title" className="home-heading">
              {h.gallery.title}
              {current ? <span className="articles__filter"> / {labels[current]}</span> : null}
            </h2>
            {current ? (
              <button type="button" className="articles__reset" onClick={() => setCurrent(null)}>
                {c.all}
              </button>
            ) : null}
          </div>

          <div id="articoli-list" aria-live="polite">
            {shown.length ? (
              <ul className="articles__grid">
                {shown.map((story) => (
                  <li key={story.href}>
                    <ArticleCard story={story} />
                  </li>
                ))}
              </ul>
            ) : current ? (
              <div className="articles__empty">
                <p>{h.gallery.empty(labels[current])}</p>
                <button type="button" className="articles__reset" onClick={() => setCurrent(null)}>
                  {h.gallery.showAll}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}

function ArticleCard({ story }: { story: Story }) {
  const id = `story-${story.article.slug}`;
  const type = story.article.kicker[story.article.kicker.length - 1];
  return (
    <a href={story.href} className="article-card" aria-labelledby={id}>
      <Photo
        slot={story.article.hero}
        alt={story.article.hero.alt}
        placeholder={story.article.hero.placeholder}
        className="article-card__photo"
        sizes="(min-width: 64em) 30vw, (min-width: 40em) 45vw, 100vw"
        centered
      />
      <p className="article-card__meta">
        {labels[story.article.category]}
        <span aria-hidden="true"> · </span>
        {type}
      </p>
      <h3 id={id} className="article-card__title">
        {story.title}
      </h3>
      {story.excerpt ? <p className="article-card__excerpt">{story.excerpt}</p> : null}
      <p className="article-card__time">{h.minutes(story.minutes)}</p>
    </a>
  );
}
