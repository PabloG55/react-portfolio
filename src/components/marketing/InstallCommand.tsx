"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import styles from "./marketing.module.css";

export default function InstallCommand() {
  const [status, setStatus] = useState("Copy");
  return <div className={styles.install}>
    <span aria-hidden="true">$</span><code>npx ghostfleet-cli</code>
    <button aria-label="Copy Ghostfleet install command" onClick={async () => {
      try { await navigator.clipboard.writeText("npx ghostfleet-cli"); setStatus("Copied"); }
      catch { setStatus("Select to copy"); }
    }}>{status === "Copied" ? <Check size={15} /> : <Copy size={15} />}<span aria-live="polite">{status}</span></button>
  </div>;
}
