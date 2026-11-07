"use client";

import { useState } from "react";
import { Anchor, ArrowDown, Bell, Check, FileText, Radio, ShieldCheck } from "lucide-react";
import type { Dict } from "@/i18n";

export default function SystemPreview({ kind, t }: { kind: "watch" | "brain"; t: Dict["preview"] }) {
  const [step, setStep] = useState(0);
  const stages = kind === "watch" ? t.watchStages : t.brainStages;

  return (
    <div className="system-preview" data-preview={kind}>
      <div className="system-preview-header"><span>{kind === "watch" ? <Anchor size={15} /> : <FileText size={15} />}{kind === "watch" ? "HOMBRE MUERTO" : t.brainTitle}</span><span>{t.howItWorks}</span></div>
      {kind === "watch" ? (
        <div className="watch-diagram">
          <div className={`watch-radar ${step === 2 ? "watch-alert" : ""}`}>
            <span className="radar-ring" /><span className="radar-ring inner" /><span className="radar-cross" />
            <div><Radio size={22} /><strong>{step === 2 ? t.watchNoResponse : step === 1 ? t.watchCheckIn : t.watchArmed}</strong><span>{step === 2 ? t.watchEscalate : t.watchBridge}</span></div>
          </div>
          <div className="watch-connection"><span />{t.watchLink}<span /></div>
          <div className="watch-receivers">{t.watchRoles.map((role) => <div key={role} className={step === 2 ? "receiver-alert" : ""}>{step === 2 ? <Bell size={20} /> : <ShieldCheck size={20} />}<strong>{role}</strong><span>{step === 2 ? t.watchScheduled : t.watchPreArmed}</span></div>)}</div>
        </div>
      ) : (
        <div className="brain-diagram">
          <p className="brain-example-label">{t.brainExample}</p>
          <div className={`brain-stage ${step === 0 ? "active" : ""}`}><span className="brain-stage-label">{t.brainStages[0]}</span><p>{t.brainCapture}</p></div>
          <ArrowDown size={16} className="brain-arrow" />
          <div className={`brain-stage ${step === 1 ? "active" : ""}`}><span className="brain-stage-label">{t.brainStages[1]}</span><p><FileText size={16} /> {t.brainOrganize}</p></div>
          <ArrowDown size={16} className="brain-arrow" />
          <div className={`brain-stage ${step === 2 ? "active" : ""}`}><span className="brain-stage-label">{t.brainStages[2]}</span><p><Bell size={16} /> {t.brainRemind}</p></div>
          <p className="brain-private"><Check size={13} /> {t.brainPrivate}</p>
        </div>
      )}
      <div className="system-stages" aria-label={t.stepsLabel}>{stages.map((label, index) => <button key={label} onClick={() => setStep(index)} aria-pressed={step === index}>{label}</button>)}</div>
    </div>
  );
}
