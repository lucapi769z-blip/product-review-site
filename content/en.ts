// English text for the one-page Home, Header and Footer.
// Headline arrays are rendered one item per line on desktop.

export const en = {
  meta: {
    title: "[Brand] — Product reviews, editorial content and photography",
    description:
      "Video reviews, editorial articles, product photography and product stories that help people discover, understand and trust the products they use every day.",
  },

  brand: "[Brand]",

  a11y: {
    skipToContent: "Skip to content",
    primaryNav: "Primary",
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    homeLink: "[Brand], home",
  },

  // One-page navigation: anchors to the section ids in HomeSections.
  nav: [
    { label: "Reviews", href: "#approach" },
    { label: "Content", href: "#what-we-do" },
    { label: "For Brands", href: "#for-brands" },
  ],

  cta: { label: "Submit a Product", short: "Submit", href: "#contact" },

  hero: {
    kicker: "Products. Stories. Real life.",
    title: ["We review products", "for real people."],
    body: "Video reviews, editorial articles, photography and product stories that help people discover, understand and trust the products they use every day.",
  },

  whatWeDo: {
    kicker: "What we do",
    title: ["We turn great products", "into great stories."],
    intro:
      "We create video reviews, editorial articles, photography and product stories that help people discover, understand and trust the products we feature.",
    items: [
      {
        icon: "video",
        name: "Video Reviews",
        body: "Authentic, in-depth reviews and demonstrations that show products in real use.",
      },
      {
        icon: "article",
        name: "Editorial Articles",
        body: "Well-researched stories and reviews that highlight features, benefits and real-world value.",
      },
      {
        icon: "camera",
        name: "Product Photography",
        body: "Clean, professional images that capture the details and personality of each product.",
      },
      {
        icon: "book",
        name: "Product Stories",
        body: "Engaging content that explores the ideas, people and innovation behind the products.",
      },
    ],
  },

  approach: {
    kicker: "Our approach",
    title: ["Real products.", "Real use. Real stories."],
    body: "We test products in real-world conditions and focus on what really matters: how they work, how they feel to use, and the value they bring to everyday life.",
    steps: [
      {
        name: "We test",
        body: "We use the products in real-life situations to understand their strengths, limitations and unique features.",
      },
      {
        name: "We focus",
        body: "We highlight what makes a product truly interesting: design, functionality, quality and user experience.",
      },
      {
        name: "We communicate",
        body: "We transform our experience into clear, engaging content that helps people understand the product at a glance.",
      },
    ],
  },

  forBrands: {
    kicker: "For brands",
    title: ["Your products", "deserve a better story."],
    body: "We create high-quality content that presents your products in an authentic, engaging and credible way, helping more people discover, understand and appreciate what makes them special.",
    points: [
      {
        name: "Editorial quality",
        body: "Content created with care, attention to detail and a focus on real value.",
      },
      {
        name: "Real product experience",
        body: "We test and use the products in real-life situations to provide a genuine and honest perspective.",
      },
      {
        name: "Flexible collaboration",
        body: "Individual products, launches or ongoing editorial projects. Simple and structured process.",
      },
    ],
  },

  contact: {
    kicker: "Work with us",
    title: ["Have a product", "worth discovering?"],
    body: "We collaborate with brands, manufacturers, Amazon sellers and emerging product creators to tell authentic stories through editorial content, video and photography.",
    submit: { label: "Submit a Product", subject: "Product submission" },
    workWithUs: { label: "Work With Us", subject: "Collaboration enquiry" },
    emailLabel: "Or email us at",
    note: "We review selected collaborations only.",
  },

  // Alt text describes the intended photograph; `placeholder` is the visible
  // tag shown until the final photograph is supplied (content/media.ts).
  media: {
    hero: {
      alt: "Wireless headphones resting on a stone table in warm afternoon light.",
      placeholder: "Photo placeholder — headphones",
    },
    whatWeDo: {
      alt: "A fabric-covered smart speaker on a travertine shelf beside a ceramic vase.",
      placeholder: "Photo placeholder — smart speaker",
    },
    approach: {
      alt: "A wristwatch laid on a linen surface, its dial catching the light.",
      placeholder: "Photo placeholder — watch",
    },
    forBrands: {
      alt: "An espresso machine on a kitchen counter with a freshly poured cup.",
      placeholder: "Photo placeholder — coffee machine",
    },
  },

  footer: {
    copyright: "[Brand]",
    amazonNote: "Amazon is a trademark of Amazon.com, Inc. This website is not affiliated with Amazon.",
    prototypeNote: "Prototype — working text and placeholder photography.",
  },
};

export type Dictionary = typeof en;
