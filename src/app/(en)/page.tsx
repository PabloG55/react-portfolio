import type { Metadata } from "next";
import Home from "@/components/Home";
import en from "@/i18n/en";
import { homeMetadata } from "@/i18n";
import { LANG_DETECT, RESTORE_PRE } from "@/i18n/lang-script";

export const metadata: Metadata = homeMetadata("en");

export default function Page() {
  return (
    <>
      {/* First thing in <body>, before anything paints: send Spanish-first browsers to /es. Only this
          page has it, so the app subdomains rewritten to other pages never redirect. */}
      <script dangerouslySetInnerHTML={{ __html: LANG_DETECT + RESTORE_PRE }} />
      <Home lang="en" t={en} />
    </>
  );
}
