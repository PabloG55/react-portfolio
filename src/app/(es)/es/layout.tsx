import type { Metadata } from "next";
import { Analytics, BODY_CLASS, THEME_SCRIPT } from "@/app/root-document";
import es from "@/i18n/es";
import "../../globals.css";

// Root layout for the Spanish home page (/es): same document as (en), with lang="es".
export const metadata: Metadata = {
  title: es.meta.title,
  description: es.meta.description,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className={BODY_CLASS}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
