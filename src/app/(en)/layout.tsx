import type { Metadata } from "next";
import { Analytics, BODY_CLASS, THEME_SCRIPT } from "@/app/root-document";
import "../globals.css";

// Root layout for / (English) and every app page (trainpilot, skipper, ghostfleet, docs, ...).
// The Spanish home page has its own root layout in (es), so its HTML says lang="es".
export const metadata: Metadata = {
  title: "Pablo Garces | Software Engineer",
  description:
    "Software engineer and M.S. student at UNC Charlotte. Building TrainPilot, Skipper, Ghostfleet, and tools I use every day.",
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
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
