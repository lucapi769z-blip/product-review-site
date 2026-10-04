import Image from "next/image";
import type { MediaSlot, Scene } from "@/content/media";

// Product photograph. Until a final `src` is set in content/media.ts, an
// illustrated placeholder with the definitive crop and a visible tag is shown.
export function Photo({
  slot,
  alt,
  placeholder,
  className = "",
  sizes = "(min-width: 64em) 45vw, 100vw",
  priority = false,
  wide = false,
  centered = false,
}: {
  slot: MediaSlot;
  alt: string;
  placeholder: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Placeholder only: extend the scene to the left, subject framed right. */
  wide?: boolean;
  /** Placeholder only: extend the scene on both sides, subject centred. */
  centered?: boolean;
}) {
  if (slot.src) {
    return (
      <figure className={`photo ${className}`}>
        <Image
          src={slot.src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="photo__img"
          style={slot.position ? { objectPosition: slot.position } : undefined}
        />
      </figure>
    );
  }

  return (
    <figure className={`photo photo--placeholder ${className}`}>
      <div className="photo__img" role="img" aria-label={alt}>
        <SceneArt scene={slot.scene} framing={centered ? "centered" : wide ? "wide" : "default"} />
      </div>
      <figcaption className="photo__tag">{placeholder}</figcaption>
    </figure>
  );
}

/* Placeholder scenes ------------------------------------------------------
   Flat shapes only: warm wall, window light, stone surface, one product. */

const wall = "#e9dfd2";
const light = "#f3ece2";
const surface = "#ddd0bf";
const surfaceLight = "#e7dccd";
const contact = "#c7b6a1";

type Framing = "default" | "wide" | "centered";

const framings: Record<Framing, { viewBox: string; align: string; transform: string }> = {
  default: { viewBox: "0 0 800 900", align: "xMidYMid slice", transform: "translate(430 694) scale(1.2)" },
  // Larger and further right in the wide Home hero
  wide: { viewBox: "-640 0 1440 900", align: "xMaxYMid slice", transform: "translate(470 694) scale(1.4)" },
  centered: { viewBox: "-290 0 1440 900", align: "xMidYMid slice", transform: "translate(430 694) scale(1.5)" },
};

function SceneArt({ scene, framing }: { scene: Scene; framing: Framing }) {
  const f = framings[framing];
  return (
    <svg viewBox={f.viewBox} preserveAspectRatio={f.align} aria-hidden="true" focusable="false">
      <rect x="-640" width="2240" height="900" fill={wall} />
      <polygon points="440,0 575,0 480,575 345,575" fill={light} />
      <polygon points="615,0 700,0 620,575 535,575" fill={light} />
      <polygon points="-640,638 1600,540 1600,900 -640,900" fill={surface} />
      <polygon points="90,720 400,655 520,672 210,780" fill={surfaceLight} />
      <polygon points="-640,638 1600,540 1600,546 -640,645" fill="#e4d8c8" />
      {/* Product scaled from its base point */}
      <g transform={`${f.transform} translate(-430 -694)`}>
        {products[scene]}
      </g>
    </svg>
  );
}

const products: Record<Scene, React.ReactNode> = {
  speaker: (
    <g>
      <defs>
        <pattern id="ph-knit" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.1" fill="#a39a8e" />
        </pattern>
        <clipPath id="ph-speaker">
          <rect x="340" y="420" width="180" height="270" rx="72" />
        </clipPath>
      </defs>
      <polygon points="300,694 430,694 330,780 150,780" fill={contact} opacity="0.55" />
      <ellipse cx="430" cy="693" rx="104" ry="12" fill={contact} />
      <g clipPath="url(#ph-speaker)">
        <rect x="340" y="420" width="180" height="270" fill="#bdb4a8" />
        <rect x="340" y="420" width="180" height="270" fill="url(#ph-knit)" opacity="0.55" />
        <rect x="470" y="420" width="50" height="270" fill="#000" opacity="0.08" />
        <rect x="340" y="672" width="180" height="18" fill="#a2998d" />
      </g>
      <ellipse cx="430" cy="432" rx="80" ry="14" fill="#d3cbc0" />
      <circle cx="430" cy="432" r="4" fill="#a2998d" />
    </g>
  ),

  headphones: (
    <g>
      <ellipse cx="430" cy="694" rx="190" ry="14" fill={contact} />
      <polygon points="262,694 598,694 470,780 120,780" fill={contact} opacity="0.45" />
      <path d="M300 620C300 360 560 360 560 620" fill="none" stroke="#d6cdc0" strokeWidth="26" strokeLinecap="round" />
      <path d="M300 620C300 382 560 382 560 620" fill="none" stroke="#c4b9ab" strokeWidth="5" strokeLinecap="round" />
      <rect x="258" y="560" width="80" height="134" rx="36" fill="#cfc5b8" />
      <rect x="522" y="560" width="80" height="134" rx="36" fill="#cfc5b8" />
      <rect x="326" y="574" width="22" height="106" rx="11" fill="#b2a798" />
      <rect x="512" y="574" width="22" height="106" rx="11" fill="#b2a798" />
      <rect x="575" y="560" width="27" height="134" rx="13" fill="#000" opacity="0.07" />
    </g>
  ),

  watch: (
    <g>
      <ellipse cx="430" cy="694" rx="96" ry="12" fill={contact} />
      <polygon points="390,694 470,694 360,780 230,780" fill={contact} opacity="0.5" />
      <rect x="398" y="420" width="64" height="274" rx="14" fill="#6e5746" />
      <rect x="398" y="420" width="64" height="274" rx="14" fill="#000" opacity="0.06" />
      <rect x="506" y="550" width="14" height="22" rx="3" fill="#3a3733" />
      <circle cx="430" cy="561" r="80" fill="#2e2c29" />
      <circle cx="430" cy="561" r="67" fill="#efe9df" />
      <g stroke="#2e2c29" strokeWidth="3" strokeLinecap="round">
        <path d="M430 502v10M430 610v10M371 561h10M479 561h10" />
      </g>
      <g stroke="#2e2c29" strokeWidth="3.5" strokeLinecap="round">
        <path d="M430 561V522M430 561l26 18" />
      </g>
      <path d="M430 561l-18 34" stroke="#ad4e2c" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="430" cy="561" r="4" fill="#2e2c29" />
    </g>
  ),

  phone: (
    <g>
      <ellipse cx="430" cy="694" rx="74" ry="9" fill={contact} />
      <polygon points="372,694 488,694 400,780 250,780" fill={contact} opacity="0.5" />
      <rect x="372" y="430" width="116" height="264" rx="18" fill="#bdb3a7" />
      <rect x="470" y="430" width="18" height="264" rx="9" fill="#000" opacity="0.07" />
      <rect x="382" y="442" width="96" height="70" rx="14" fill="#aea396" />
      <circle cx="404" cy="462" r="13" fill="#8f8679" />
      <circle cx="404" cy="462" r="9" fill="#2e2c29" />
      <circle cx="404" cy="492" r="13" fill="#8f8679" />
      <circle cx="404" cy="492" r="9" fill="#2e2c29" />
      <circle cx="432" cy="477" r="13" fill="#8f8679" />
      <circle cx="432" cy="477" r="9" fill="#2e2c29" />
      <circle cx="460" cy="462" r="4" fill="#efe9df" />
      <circle cx="460" cy="492" r="2.5" fill="#8f8679" />
    </g>
  ),

  coffee: (
    <g>
      <ellipse cx="435" cy="694" rx="130" ry="11" fill={contact} />
      <polygon points="320,694 550,694 420,780 160,780" fill={contact} opacity="0.5" />
      <rect x="330" y="400" width="210" height="294" rx="6" fill="#302e2b" />
      <rect x="322" y="390" width="226" height="16" rx="3" fill="#3d3a36" />
      <rect x="500" y="400" width="40" height="294" fill="#000" opacity="0.12" />
      <rect x="350" y="512" width="170" height="160" fill="#232120" />
      <rect x="395" y="462" width="80" height="28" rx="3" fill="#8f8679" />
      <rect x="424" y="490" width="22" height="16" fill="#8f8679" />
      <circle cx="372" cy="440" r="9" fill="#8f8679" />
      <circle cx="400" cy="440" r="9" fill="#8f8679" />
      <path d="M408 612h54l-6 50h-42z" fill="#f1ece4" />
      <path d="M462 622h6a10 10 0 0 1 0 20h-8" fill="none" stroke="#f1ece4" strokeWidth="5" />
      <rect x="350" y="662" width="170" height="14" fill="#8f8679" />
    </g>
  ),
};
