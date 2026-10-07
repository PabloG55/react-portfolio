"use client";

import { useState } from "react";
import { Anchor, ArrowDown, Bell, Check, FileText, Radio, ShieldCheck } from "lucide-react";

export default function SystemPreview({ kind }: { kind: "watch" | "brain" }) {
  const [step, setStep] = useState(0);
  const stages = kind === "watch" ? ["Watch armed", "Check-in received", "Check-in missed"] : ["Capture", "Organize", "Remind"];

  return (
    <div className="system-preview" data-preview={kind}>
      <div className="system-preview-header"><span>{kind === "watch" ? <Anchor size={15} /> : <FileText size={15} />}{kind === "watch" ? "HOMBRE MUERTO" : "SECOND BRAIN"}</span><span>HOW IT WORKS</span></div>
      {kind === "watch" ? (
        <div className="watch-diagram">
          <div className={`watch-radar ${step === 2 ? "watch-alert" : ""}`}>
            <span className="radar-ring" /><span className="radar-ring inner" /><span className="radar-cross" />
            <div><Radio size={22} /><strong>{step === 2 ? "NO RESPONSE" : step === 1 ? "CHECK-IN ✓" : "WATCH ARMED"}</strong><span>{step === 2 ? "Escalate to receivers" : "Bridge phone"}</span></div>
          </div>
          <div className="watch-connection"><span />LOCAL WI-FI · NO INTERNET<span /></div>
          <div className="watch-receivers">{["Captain", "Crew"].map((role) => <div key={role} className={step === 2 ? "receiver-alert" : ""}>{step === 2 ? <Bell size={20} /> : <ShieldCheck size={20} />}<strong>{role}</strong><span>{step === 2 ? "Scheduled alarm" : "Alarm pre-armed"}</span></div>)}</div>
        </div>
      ) : (
        <div className="brain-diagram">
          <p className="brain-example-label">ILLUSTRATIVE EXAMPLE</p>
          <div className={`brain-stage ${step === 0 ? "active" : ""}`}><span className="brain-stage-label">Capture</span><p>“Remind me to review the demo tomorrow.”</p></div>
          <ArrowDown size={16} className="brain-arrow" />
          <div className={`brain-stage ${step === 1 ? "active" : ""}`}><span className="brain-stage-label">Organize</span><p><FileText size={16} /> Plain Markdown · a task with a due date</p></div>
          <ArrowDown size={16} className="brain-arrow" />
          <div className={`brain-stage ${step === 2 ? "active" : ""}`}><span className="brain-stage-label">Remind</span><p><Bell size={16} /> Apple Reminders → iPhone notification</p></div>
          <p className="brain-private"><Check size={13} /> Local files. Private backup. Your data.</p>
        </div>
      )}
      <div className="system-stages" aria-label="Walkthrough steps">{stages.map((label, index) => <button key={label} onClick={() => setStep(index)} aria-pressed={step === index}>{label}</button>)}</div>
    </div>
  );
}
