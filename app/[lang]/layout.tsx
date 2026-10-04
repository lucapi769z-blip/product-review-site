import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import { getDictionary } from "@/content";
import { builtLocales, isBuiltLocale } from "@/lib/i18n";
import "../globals.css";

// Source Serif 4 for headlines, IBM Plex Sans for text, menu and microcopy.
const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["opsz"],
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return builtLocales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isBuiltLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      languages: Object.fromEntries(builtLocales.map((locale) => [locale, `/${locale}`])),
    },
    // Prototype: keep out of search engines.
    robots: { index: false, follow: false },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isBuiltLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
