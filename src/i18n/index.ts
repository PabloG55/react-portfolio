import type { Metadata } from "next";
import en, { type Dict } from "./en";
import es from "./es";

export type { Dict };
export type Lang = "en" | "es";

const SITE = "https://pablogarces.dev";

/** Where each language's home page lives. English keeps the root URL. */
export const HOME: Record<Lang, string> = { en: "/", es: "/es" };

export const dictionaries: Record<Lang, Dict> = { en, es };

/** Fills "{name}" placeholders in a dictionary string. */
export function fill(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

/** Home-page metadata: translated title and description, canonical, hreflang alternates and OG locale.
 *  Set on the page, not the layout, so the app pages under (en) keep their own canonicals. */
export function homeMetadata(lang: Lang): Metadata {
  const { meta } = dictionaries[lang];
  const url = `${SITE}${HOME[lang]}`;
  return {
    metadataBase: new URL(SITE),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      languages: { en: `${SITE}${HOME.en}`, es: `${SITE}${HOME.es}`, "x-default": `${SITE}${HOME.en}` },
    },
    openGraph: { title: meta.title, description: meta.description, url, type: "website", locale: meta.ogLocale },
  };
}
