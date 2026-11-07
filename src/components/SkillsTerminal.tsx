"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import { Check, Copy, FileJson, Terminal } from "lucide-react";
import type { Dict } from "@/i18n";

const stack = {
  languages: ["TypeScript", "JavaScript", "Python", "Java", "Swift", "Kotlin", "SQL", "Bash", "C", "C++", "Dart", "HTML/CSS"],
  frontend: ["React", "Next.js", "Preact", "React Native", "Expo", "Flutter", "SwiftUI", "Tailwind CSS", "GSAP", "Gradio", "Tkinter", "JavaFX"],
  backend: ["Node.js", "Spring Boot", "NestJS", "FastAPI", "Express", "Fastify", "Flask", "Prisma"],
  infrastructure: ["PostgreSQL", "Supabase", "MongoDB", "Redis", "SQLite", "ChromaDB", "Docker", "Vercel", "Render", "Cloudflare Workers"],
  ai: ["Gemini", "Groq", "RAG"],
  tools: ["Git", "Linux", "tmux", "MCP", "Stripe Connect", "ADB", "Playwright", "Vitest", "Remotion", "FFmpeg"],
};
const source = "{\n" + Object.entries(stack).map(([key, values]) => `  "${key}": [\n    ${values.map(value => JSON.stringify(value)).join(", ")}\n  ]`).join(",\n") + "\n}";
const lines = source.split("\n");

function highlight(line: string) {
  return line.split(/("[^"\\]*(?:\\.[^"\\]*)*"\s*:|"[^"\\]*(?:\\.[^"\\]*)*")/g).map((token, index) => (
    <span key={index} className={token.startsWith('"') ? (token.endsWith(":") ? "syntax-key" : "syntax-string") : "syntax-punctuation"}>{token}</span>
  ));
}

// The JSON itself (keys and tech names) stays in English in both languages: it is code.
export default function SkillsTerminal({ t }: { t: Dict["skills"] }) {
  const [view, setView] = useState<"stack" | "workflow">("stack");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const copyLabel = copyState === "copied" ? t.copied : copyState === "failed" ? t.copyFailed : t.copy;
  const [fromKeyboard, setFromKeyboard] = useState(false);
  const [indicator, setIndicator] = useState<{ x: number; width: number } | null>(null);
  const tabs = useRef<Record<string, HTMLButtonElement | null>>({});
  const id = useId();

  // One shared underline slides to the active tab (motion.md, "Content swaps").
  useLayoutEffect(() => {
    const measure = () => {
      const tab = tabs.current[view];
      if (tab) setIndicator({ x: tab.offsetLeft, width: tab.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [view]);

  const select = (next: "stack" | "workflow", keyboard: boolean) => {
    setFromKeyboard(keyboard);
    setView(next);
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(source);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  };

  return (
    <div className="skills-terminal">
      <div className="terminal-titlebar">
        <div className="terminal-dots" aria-hidden="true"><i /><i /><i /></div>
        <span>pablo / workspace</span>
        <span className="terminal-local"><span /> local</span>
      </div>
      <div className="terminal-tabs" role="tablist" aria-label={t.tabsLabel} onKeyDown={event => {
        if (!(event.target instanceof HTMLElement) || event.target.getAttribute("role") !== "tab") return;
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === "Home" ? "stack" : event.key === "End" ? "workflow" : view === "stack" ? "workflow" : "stack";
        select(next, true);
        document.getElementById(`${id}-${next}-tab`)?.focus();
      }}>
        <button ref={el => { tabs.current.stack = el; }} id={`${id}-stack-tab`} role="tab" tabIndex={view === "stack" ? 0 : -1} aria-selected={view === "stack"} aria-controls={`${id}-stack-panel`} onClick={event => select("stack", event.detail === 0)}><FileJson size={14} /> skills.json</button>
        <button ref={el => { tabs.current.workflow = el; }} id={`${id}-workflow-tab`} role="tab" tabIndex={view === "workflow" ? 0 : -1} aria-selected={view === "workflow"} aria-controls={`${id}-workflow-panel`} onClick={event => select("workflow", event.detail === 0)}><Terminal size={14} /> workflow.sh</button>
        <span className={`terminal-indicator ${fromKeyboard ? "is-instant" : ""}`} aria-hidden="true" style={indicator ? { width: indicator.width, transform: `translateX(${indicator.x}px)` } : { opacity: 0 }} />
        {view === "stack" && <button className="terminal-copy" onClick={copy} aria-label={copyLabel}>{copyState === "copied" ? <Check size={14} /> : <Copy size={14} />}<span aria-live="polite">{copyLabel}</span></button>}
      </div>
      {/* Both panels share one grid cell, so the slot is always as tall as the
          tallest panel and switching tabs never moves the page. */}
      <div className="terminal-panels">
      <div id={`${id}-stack-panel`} role="tabpanel" aria-labelledby={`${id}-stack-tab`} aria-hidden={view !== "stack"} tabIndex={view === "stack" ? 0 : -1} className={`terminal-code ${view !== "stack" ? "is-inactive" : ""}`}>
        <pre aria-label={t.stackLabel}><code>{lines.map((line, index) => <span className="terminal-line" key={index}><span className="line-number" aria-hidden="true">{index + 1}</span><span>{highlight(line)}</span>{"\n"}</span>)}</code></pre>
      </div>
      <div id={`${id}-workflow-panel`} role="tabpanel" aria-labelledby={`${id}-workflow-tab`} aria-hidden={view !== "workflow"} tabIndex={view === "workflow" ? 0 : -1} className={`terminal-workflow ${view !== "workflow" ? "is-inactive" : ""}`}>
        <p className="syntax-comment">{t.workflowIntro}</p>
        {t.workflow.map(([command, result]) => <div className="workflow-command" key={command}><p><span className="syntax-key">❯</span> {command}</p><p className="syntax-comment">{result}</p></div>)}
        <span className="syntax-key" aria-hidden="true">❯ <span className="terminal-cursor" /></span>
      </div>
      </div>
      <div className="terminal-statusbar"><span><span className="terminal-status-dot" /> main</span><span>{view === "stack" ? "JSON · UTF-8" : t.workflowStatus}</span></div>
    </div>
  );
}
