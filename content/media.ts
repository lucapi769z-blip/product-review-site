// Photography slots for the Home. Language-independent.
//
// To replace a placeholder: put the final file in /public/images/ and set
// `src` (e.g. "/images/hero.jpg"). Alt text lives in content/{en,it}.ts.
// `scene` only drives the illustrated placeholder shown while `src` is null.
//
// Crops are applied with object-fit: cover, so supply generous originals:
//
//   hero       2400 × 1200 (2:1). Desktop fills the whole hero behind the
//              text: keep the left 45% calm (wall, light) and the product in
//              the right half. Mobile crops to 1:1 around `position`.
//   whatWeDo   1600 × 2000 (4:5). Desktop crop follows the height of the
//   approach   text block (roughly 4:5 to 1:1); mobile 4:5, tablet 4:3.
//   forBrands  Keep the product near the centre with air on every side.
//
// `position` is the CSS object-position used for every crop.

export type Scene = "headphones" | "speaker" | "watch" | "coffee" | "phone";

export type MediaSlot = { src: string | null; scene: Scene; position?: string };

export const media = {
  hero: { src: null, scene: "headphones", position: "75% 50%" },
  whatWeDo: { src: null, scene: "speaker" },
  approach: { src: null, scene: "watch" },
  forBrands: { src: null, scene: "coffee" },
} satisfies Record<string, MediaSlot>;

// Contact address placeholder (reserved example domain). Replace before launch.
export const contactEmail = "hello@example.com";
