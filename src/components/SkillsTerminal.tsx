"use client";

import { useId, useState } from "react";
import { Check, Copy, FileJson, Terminal } from "lucide-react";

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

export default function SkillsTerminal() {
  const [view, setView] = useState<"stack" | "workflow">("stack");
  const [copyState, setCopyState] = useState("Copy JSON");
  const id = useId();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(source);
      setCopyState("Copied");
    } catch {
      setCopyState("Could not copy");
    }
  };

  return (
    <div className="skills-terminal">
      <div className="terminal-titlebar">
        <div className="terminal-dots" aria-hidden="true"><i /><i /><i /></div>
        <span>pablo / workspace</span>
        <span className="terminal-local"><span /> local</span>
      </div>
      <div className="terminal-tabs" role="tablist" aria-label="Skills views" onKeyDown={event => {
        if (!(event.target instanceof HTMLElement) || event.target.getAttribute("role") !== "tab") return;
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === "Home" ? "stack" : event.key === "End" ? "workflow" : view === "stack" ? "workflow" : "stack";
        setView(next);
        document.getElementById(`${id}-${next}-tab`)?.focus();
      }}>
        <button id={`${id}-stack-tab`} role="tab" tabIndex={view === "stack" ? 0 : -1} aria-selected={view === "stack"} aria-controls={`${id}-stack-panel`} onClick={() => setView("stack")}><FileJson size={14} /> skills.json</button>
        <button id={`${id}-workflow-tab`} role="tab" tabIndex={view === "workflow" ? 0 : -1} aria-selected={view === "workflow"} aria-controls={`${id}-workflow-panel`} onClick={() => setView("workflow")}><Terminal size={14} /> workflow.sh</button>
        {view === "stack" && <button className="terminal-copy" onClick={copy} aria-label={copyState}>{copyState === "Copied" ? <Check size={14} /> : <Copy size={14} />}<span aria-live="polite">{copyState}</span></button>}
      </div>
      <div id={`${id}-stack-panel`} role="tabpanel" aria-labelledby={`${id}-stack-tab`} hidden={view !== "stack"} tabIndex={0} className="terminal-code">
        <pre aria-label="My technical stack"><code>{lines.map((line, index) => <span className="terminal-line" key={index}><span className="line-number" aria-hidden="true">{index + 1}</span><span>{highlight(line)}</span>{"\n"}</span>)}</code></pre>
      </div>
      <div id={`${id}-workflow-panel`} role="tabpanel" aria-labelledby={`${id}-workflow-tab`} hidden={view !== "workflow"} tabIndex={0} className="terminal-workflow">
        <p className="syntax-comment"># How I work, from an idea to something you can use.</p>
        {[
          ["read the problem", "Start with the constraints and write down what has to work."],
          ["build a small version", "Get the core flow running on a real device or in a real terminal."],
          ["test the awkward parts", "Offline mode, interrupted sessions, native APIs, and recovery."],
          ["ship and keep improving", "Use it myself. Read the feedback. Fix what gets in the way."],
        ].map(([command, result]) => <div className="workflow-command" key={command}><p><span className="syntax-key">❯</span> {command}</p><p className="syntax-comment">{result}</p></div>)}
        <span className="syntax-key" aria-hidden="true">❯ <span className="terminal-cursor" /></span>
      </div>
      <div className="terminal-statusbar"><span><span className="terminal-status-dot" /> main</span><span>{view === "stack" ? "JSON · UTF-8" : "Shell · working notes"}</span></div>
    </div>
  );
}
