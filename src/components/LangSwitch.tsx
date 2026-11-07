"use client";

import type { MouseEvent } from "react";
import { HOME, type Lang } from "@/i18n";
import { savePlace } from "@/i18n/keep-place";
import { LANG_KEY } from "@/i18n/lang-script";

const LINKS: { lang: Lang; short: string; name: string }[] = [
  { lang: "es", short: "ES", name: "Español" },
  { lang: "en", short: "EN", name: "English" },
];

// "ES / EN" in the header, set like the nav links beside it: the current language in the nav's
// text colour, the other muted until hover. Picking one is remembered, so the browser-language
// detector never overrides it, and the other page opens where you were reading.
export default function LangSwitch({ lang, label, size = "sm" }: { lang: Lang; label: string; size?: "sm" | "lg" }) {
  const go = (event: MouseEvent<HTMLAnchorElement>, next: Lang) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    try { localStorage.setItem(LANG_KEY, next); } catch {}
    event.preventDefault();
    if (next === lang) return;
    savePlace();
    window.location.assign(HOME[next]);
  };

  return (
    <div role="group" aria-label={label} className={`flex items-center font-medium ${size === "lg" ? "text-lg -ml-3" : "text-sm gap-0.5"}`}>
      {LINKS.map((link, index) => (
        <span key={link.lang} className="flex items-center">
          {index > 0 && <span aria-hidden="true" className="text-gray-300 dark:text-gray-700">/</span>}
          <a
            href={HOME[link.lang]}
            hrefLang={link.lang}
            lang={link.lang}
            aria-label={link.name}
            aria-current={link.lang === lang ? "page" : undefined}
            onClick={(event) => go(event, link.lang)}
            className={`inline-flex items-center justify-center rounded transition-colors ${size === "lg" ? "min-h-11 px-3" : "min-h-8 px-1"} ${
              link.lang === lang ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400 hover:text-primary"
            }`}
          >
            {link.short}
          </a>
        </span>
      ))}
    </div>
  );
}
