"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./trainpilot.module.css";

const screens = {
  run: { src: "/marketing/trainpilot-hi1.webp", alt: "TrainPilot Run home: this week's schedule and today's threshold intervals workout" },
  gym: { src: "/marketing/trainpilot-hi2.webp", alt: "TrainPilot gym summary for Push Day: 55 minutes, 12 sets, 3,621 kg and the muscles worked" },
};

export default function TrainPilotHero({ store }: { store: string }) {
  const [mode, setMode] = useState<"run" | "gym">("run");

  return <section className={styles.hero} data-mode={mode} aria-labelledby="tp-title">
    <div className={styles.field} aria-hidden="true"><span /><span /></div>
    <h1 id="tp-title" className={styles.srOnly}>A plan for your runs. A logbook for your lifts.</h1>
    <div className={`${styles.container} ${styles.heroGrid}`}>
      <div className={`${styles.side} ${styles.sideRun}`}>
        <p className={styles.display} aria-hidden="true"><span>A plan</span> <span>for your</span> <span className={styles.runWord}>runs.</span></p>
        <p className={styles.sub}>Built around your race, your current times and the days you can train.</p>
      </div>
      <div className={styles.center}>
        <div className={styles.switch} role="group" aria-label="Show the app in run or gym mode">
          <button type="button" aria-pressed={mode === "run"} onClick={() => setMode("run")}>Run</button>
          <button type="button" aria-pressed={mode === "gym"} onClick={() => setMode("gym")}>Gym</button>
        </div>
        <div className={styles.phone}>
          <div className={styles.screen}>
            {Object.entries(screens).map(([key, screen]) => (
              <div key={key} className={styles.screenLayer} data-screen={key} data-active={mode === key} aria-hidden={mode !== key}>
                <Image src={screen.src} alt={screen.alt} fill sizes="320px" priority />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.cta}>
          <a className={styles.button} href={store}>Download on the App Store</a>
          <p className={styles.note}>Free for iPhone and Apple Watch. No ads. English and Spanish.</p>
        </div>
      </div>
      <div className={`${styles.side} ${styles.sideGym}`}>
        <p className={styles.display} aria-hidden="true"><span>A logbook</span> <span>for your</span> <span className={styles.gymWord}>lifts.</span></p>
        <p className={styles.sub}>Log every set. Progression shows when to add weight and when to back off.</p>
      </div>
    </div>
  </section>;
}
