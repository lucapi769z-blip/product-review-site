"use client";

import { useEffect, useId, useRef, useState } from "react";

type Link = { label: string; href: string };

// Disclosure menu for small screens. Closes on Escape, on link activation
// and when the viewport grows past the desktop breakpoint.
export function MobileMenu({
  nav,
  cta,
  openLabel,
  closeLabel,
  navLabel,
}: {
  nav: Link[];
  cta: Link;
  openLabel: string;
  closeLabel: string;
  navLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 64em)");
    const onChange = () => desktop.matches && setOpen(false);

    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onChange);
    document.documentElement.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onChange);
      document.documentElement.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <div className="menu">
      <button
        ref={buttonRef}
        type="button"
        className="menu__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="menu__icon" aria-hidden="true" data-open={open} />
        <span className="sr-only">{open ? closeLabel : openLabel}</span>
      </button>

      <div id={panelId} className="menu__panel" hidden={!open}>
        <nav aria-label={navLabel}>
          <ul className="menu__list">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="menu__link" onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={cta.href} className="btn btn--primary menu__cta" onClick={() => setOpen(false)}>
          {cta.label}
          <span className="btn__arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
