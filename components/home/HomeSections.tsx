import type { Dictionary } from "@/content";
import { contactEmail, media } from "@/content/media";
import { Icon } from "./Graphics";
import { Photo } from "./Photo";

type Props = { t: Dictionary };

/** Headline lines: one per row on desktop, flowing text on small screens. */
function Lines({ lines }: { lines: string[] }) {
  return lines.map((line, i) => (
    <span key={line} className="line">
      {line}
      {i < lines.length - 1 ? " " : null}
    </span>
  ));
}

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="kicker">{children}</p>;
}

const pad = (i: number) => String(i + 1).padStart(2, "0");

function mailto(subject: string) {
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`;
}

/* 1 — Hero ------------------------------------------------------------- */

export function Hero({ t }: Props) {
  const h = t.hero;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__text">
        <Kicker>{h.kicker}</Kicker>
        <h1 id="hero-title" className="display hero__title">
          <Lines lines={h.title} />
        </h1>
        <p className="lead hero__body">{h.body}</p>
        <a href={t.cta.href} className="btn btn--primary btn--large hero__cta">
          {t.cta.label}
          <Icon name="arrow" className="btn__icon btn__arrow" />
        </a>
      </div>
      <Photo slot={media.hero} {...t.media.hero} className="hero__photo" sizes="100vw" priority wide />
    </section>
  );
}

/* 2 — What we do ------------------------------------------------------- */

export function WhatWeDo({ t }: Props) {
  const s = t.whatWeDo;
  return (
    <section id="what-we-do" className="split" aria-labelledby="what-we-do-title">
      <div className="split__text">
        <Kicker>{s.kicker}</Kicker>
        <h2 id="what-we-do-title" className="display section-title">
          <Lines lines={s.title} />
        </h2>
        <p className="lead">{s.intro}</p>
        <ul className="services">
          {s.items.map((item) => (
            <li key={item.name} className="service">
              <Icon name={item.icon} className="service__icon" />
              <h3 className="service__name">{item.name}</h3>
              <p className="service__body">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
      <Photo slot={media.whatWeDo} {...t.media.whatWeDo} className="split__photo" />
    </section>
  );
}

/* 3 — Our approach (image left) ----------------------------------------- */

export function Approach({ t }: Props) {
  const a = t.approach;
  return (
    <section id="approach" className="split split--reverse" aria-labelledby="approach-title">
      <div className="split__text">
        <Kicker>{a.kicker}</Kicker>
        <h2 id="approach-title" className="display section-title">
          <Lines lines={a.title} />
        </h2>
        <p className="lead">{a.body}</p>
        <ol className="steps">
          {a.steps.map((step, i) => (
            <li key={step.name} className="step">
              <span className="step__n" aria-hidden="true">
                {pad(i)}
              </span>
              <h3 className="step__name">{step.name}</h3>
              <p className="step__body">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
      <Photo slot={media.approach} {...t.media.approach} className="split__photo" />
    </section>
  );
}

/* 4 — For brands ------------------------------------------------------- */

export function ForBrands({ t }: Props) {
  const b = t.forBrands;
  return (
    <section id="for-brands" className="split" aria-labelledby="for-brands-title">
      <div className="split__text">
        <Kicker>{b.kicker}</Kicker>
        <h2 id="for-brands-title" className="display section-title">
          <Lines lines={b.title} />
        </h2>
        <p className="lead">{b.body}</p>
        <ol className="points">
          {b.points.map((point, i) => (
            <li key={point.name} className="point">
              <span className="point__n" aria-hidden="true">
                {pad(i)}
              </span>
              <h3 className="point__name">{point.name}</h3>
              <p className="point__body">{point.body}</p>
            </li>
          ))}
        </ol>
      </div>
      <Photo slot={media.forBrands} {...t.media.forBrands} className="split__photo" />
    </section>
  );
}

/* 5 — Work with us / Contact: dark editorial close ---------------------- */

export function Contact({ t }: Props) {
  const c = t.contact;
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container">
        <Kicker>{c.kicker}</Kicker>
        <h2 id="contact-title" className="display contact__title">
          <Lines lines={c.title} />
        </h2>

        <div className="contact__grid">
          <p className="contact__body">{c.body}</p>

          <div className="contact__side">
            <div className="contact__actions">
              <a href={mailto(c.submit.subject)} className="btn btn--primary btn--large">
                {c.submit.label}
                <Icon name="arrow" className="btn__icon btn__arrow" />
              </a>
              <a href={mailto(c.workWithUs.subject)} className="btn btn--outline-light btn--large">
                {c.workWithUs.label}
                <Icon name="mail" className="btn__icon btn__icon--accent" />
              </a>
            </div>

            <div className="contact__email">
              <p className="contact__email-label">{c.emailLabel}</p>
              <a href={`mailto:${contactEmail}`} className="contact__email-address">
                {contactEmail}
              </a>
              <p className="contact__note">{c.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
