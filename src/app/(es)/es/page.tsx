import type { Metadata } from "next";
import Home from "@/components/Home";
import es from "@/i18n/es";
import { homeMetadata } from "@/i18n";
import { RESTORE_PRE } from "@/i18n/lang-script";

export const metadata: Metadata = homeMetadata("es");

export default function Page() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: RESTORE_PRE }} />
      <Home lang="es" t={es} />
    </>
  );
}
