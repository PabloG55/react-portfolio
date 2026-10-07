"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Heart, Minus, Plus, Activity } from "lucide-react";
import styles from "./marketing.module.css";

export default function TrainPilotPreview() {
  const [mode, setMode] = useState("run");
  const [weight, setWeight] = useState(52.5);
  const [sets, setSets] = useState(0);
  return <div className={styles.previewWrap}>
    <div className={styles.phone} data-mode={mode}>
      <div className={styles.phoneStatus}><span>9:41</span><span className={styles.island} /><span>••• ▰</span></div>
      <div className={styles.modeSwitch} aria-label="Training preview mode">
        <button aria-pressed={mode === "run"} onClick={() => setMode("run")}>Run</button>
        <button aria-pressed={mode === "gym"} onClick={() => setMode("gym")}>Gym</button>
      </div>
      {mode === "run" ? <>
        <div className={styles.previewHeading}><span>MONDAY · WEEK 1</span><h3>Threshold intervals</h3><p>7 km · warm-up, intervals, cool-down</p></div>
        <div className={styles.runMap}>
          <svg viewBox="0 0 280 180" role="img" aria-label="Illustrative running route"><path className={styles.mapGrid} d="M0 30H280M0 75H280M0 120H280M0 165H280M30 0V180M90 0V180M150 0V180M210 0V180M270 0V180" /><path className={styles.runRoute} d="M40 147C83 129 64 94 105 81S144 117 175 84 174 32 224 36" /><circle cx="224" cy="36" r="7" fill="#0BB66B" stroke="white" strokeWidth="4" /></svg>
          <span>THRESHOLD · 2 / 3</span>
        </div>
        <div className={styles.paceReadout}><span>PACE</span><strong>4:55<small>/km</small></strong><p>Right on target <Check size={12} /></p></div>
        <div className={styles.runMetrics}><div><span>DISTANCE</span><strong>2.42<small> km</small></strong></div><div><span>TIME</span><strong>12:37</strong></div><div><span>HEART RATE</span><strong><Heart size={13} />153</strong></div></div>
        <div className={styles.cue}><Activity size={17} /><span>Spoken cues keep you on pace.<br />Your phone stays in your pocket.</span></div>
      </> : <>
        <div className={styles.previewHeading}><span>TODAY · STRENGTH</span><h3>Build on your last session.</h3><p>A little more, when you’re ready.</p></div>
        <div className={styles.gymExercise}><span>CHEST · BARBELL</span><h3>Bench press</h3><p>3 sets × 8 reps</p><div className={styles.recommendation}><ArrowUpRight size={18} /><div><strong>Try 52.5 kg today</strong><p>You completed 3 × 8 at 50 kg.</p></div></div>
          <div className={styles.weightInput}><span>WEIGHT · KG</span><div><button aria-label="Decrease sample weight" disabled={weight <= 0} onClick={() => setWeight(w => Math.max(0, w - 2.5))}><Minus size={18} /></button><strong>{weight}</strong><button aria-label="Increase sample weight" onClick={() => setWeight(w => w + 2.5)}><Plus size={18} /></button></div></div>
          <button className={styles.logSet} onClick={() => setSets(s => s + 1)}>Log sample set <Check size={17} /></button>
          <p className={styles.logged} aria-live="polite">{sets ? `${sets} sample ${sets === 1 ? "set" : "sets"} logged · ${weight} kg × 8` : "Rest timer starts after your set."}</p>
        </div>
        <div className={styles.nextExercise}><span>UP NEXT</span><strong>Seated cable row</strong><span>3 × 10</span></div>
      </>}
      <div className={styles.phoneTabs}><span>Today</span><span>Plan</span><span>Activities</span></div>
    </div>
    <p className={styles.previewCaption}>Try Run / Gym · interactive preview with sample data</p>
  </div>;
}
