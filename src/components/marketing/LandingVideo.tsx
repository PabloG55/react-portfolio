"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./marketing.module.css";

export default function LandingVideo({ src, poster, label, className = "" }: { src: string; poster: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !motion.matches && !pausedByUser.current) video.play().catch(() => {});
      else video.pause();
    }, { threshold: .2 });
    const changed = () => { if (motion.matches) video.pause(); };
    motion.addEventListener("change", changed);
    observer.observe(video);
    return () => { observer.disconnect(); motion.removeEventListener("change", changed); video.pause(); };
  }, []);
  return <div className={`${styles.video} ${className}`}>
    <video ref={ref} muted loop playsInline preload="none" poster={poster} aria-label={label} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}><source src={src} type="video/mp4" /></video>
    <button className={styles.videoControl} aria-label={`${playing ? "Pause" : "Play"} ${label}`} onClick={() => {
      const video = ref.current;
      if (!video) return;
      if (video.paused) { pausedByUser.current = false; video.play().catch(() => {}); }
      else { pausedByUser.current = true; video.pause(); }
    }}>{playing ? <Pause size={13} /> : <Play size={13} />}{playing ? "Pause" : "Play"}</button>
  </div>;
}
