"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { ghostfleetSetupPrompt } from "./ghostfleetSetupPrompt";
import styles from "./marketing.module.css";

export default function InstallCommand() {
  const [status, setStatus] = useState("Copy");
  const [promptStatus, setPromptStatus] = useState("Copy AI setup prompt");
  const preview = useRef<HTMLDetailsElement>(null);

  return <div className={styles.installBlock}>
    <div className={styles.install}>
      <span aria-hidden="true">$</span><code>npx ghostfleet-cli</code>
      <button aria-label="Copy Ghostfleet install command" onClick={async () => {
        try { await navigator.clipboard.writeText("npx ghostfleet-cli"); setStatus("Copied"); }
        catch { setStatus("Select to copy"); }
      }}>{status === "Copied" ? <Check size={15} /> : <Copy size={15} />}<span aria-live="polite">{status}</span></button>
    </div>
    <div className={styles.promptActions}>
      <span>Have your coding agent set it up.</span>
      <button aria-label="Copy AI setup prompt" onClick={async () => {
        try { await navigator.clipboard.writeText(ghostfleetSetupPrompt); setPromptStatus("Prompt copied"); }
        catch {
          setPromptStatus("Select the prompt below");
          if (preview.current) preview.current.open = true;
        }
      }}>{promptStatus === "Prompt copied" ? <Check size={14} /> : <Copy size={14} />}<span aria-live="polite">{promptStatus}</span></button>
    </div>
    <details ref={preview} className={styles.promptPreview}>
      <summary>Read the setup prompt</summary>
      <pre>{ghostfleetSetupPrompt}</pre>
    </details>
  </div>;
}
