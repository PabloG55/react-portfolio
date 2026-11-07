import { Space_Grotesk, Inter, JetBrains_Mono, Barlow } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

// What the two root layouts share: (en) for / and every app page, (es) for /es.
// Two root layouts are what let /es serve lang="es" in its HTML while every page stays static.

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});
// Barlow is the closest match to the PG.DEV logo's heavy, rounded-rectangle
// letters; the home page uses it for its display type.
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["500", "600", "800"],
  variable: "--font-brand",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const THEME_SCRIPT = `
            document.documentElement.classList.add('js');
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
              document.documentElement.classList.add('dark');
            }
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
              if (event.matches) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            });
          `;

/** The fonts' CSS variables and the page colours, set on <body> by both root layouts. */
export const BODY_CLASS = `${spaceGrotesk.variable} ${barlow.variable} ${inter.variable} ${jetbrainsMono.variable} bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 font-body transition-colors duration-300 antialiased overflow-x-hidden w-full`;

export { THEME_SCRIPT, Analytics };
