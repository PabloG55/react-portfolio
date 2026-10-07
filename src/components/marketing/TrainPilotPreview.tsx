"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./marketing.module.css";

const screens = {
  run: { src: "/marketing/trainpilot-hi1.webp", alt: "Actual TrainPilot Run home screen with the weekly schedule and today's threshold workout" },
  gym: { src: "/marketing/trainpilot-hi2.webp", alt: "Actual TrainPilot gym workout summary with logged sets, weight, and muscles worked" },
};

export default function TrainPilotPreview() {
  const [mode, setMode] = useState<"run" | "gym">("run");

  return <div className={styles.previewWrap} data-mode={mode}>
    <div className={styles.previewSwitch} aria-label="TrainPilot screenshots">
      <button aria-pressed={mode === "run"} onClick={() => setMode("run")}>Run</button>
      <button aria-pressed={mode === "gym"} onClick={() => setMode("gym")}>Gym</button>
    </div>
    <div className={styles.realPhone}>
      {Object.entries(screens).map(([key, screen]) => (
        <div key={key} className={styles.screenLayer} data-screen={key} data-active={mode === key} aria-hidden={mode !== key}>
          <Image src={screen.src} alt={screen.alt} fill sizes="(max-width: 800px) 290px, 280px" priority />
        </div>
      ))}
    </div>
    <p className={styles.previewCaption}>Actual app screens · {mode === "run" ? "Run home" : "Gym workout"}</p>
  </div>;
}
