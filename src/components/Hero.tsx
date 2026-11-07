"use client";

import { useRef, type CSSProperties, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import ParticleNetwork from "./ParticleNetwork";
import type { Dict } from "@/i18n";

type Props = { t: Dict["hero"]; onNavigate: (event: MouseEvent<HTMLAnchorElement>) => void };
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// The hero is the thesis: "Building." is made of the particle network, and it
// assembles on load and rebuilds itself after the cursor knocks it apart.
// "Always Building." is the brand line: it stays in English on the Spanish page too.
export default function Hero({ t, onNavigate }: Props) {
  const wordRef = useRef<HTMLSpanElement>(null);

  return (
    <section className="portfolio-hero relative isolate overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <ParticleNetwork wordRef={wordRef} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_60%,transparent_100%)]"></div>
      </div>

      <div className="hero-inner relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="hero-stage">
          <p className="hero-kicker hero-enter">{t.kicker}</p>
          <h1 className="hero-display font-display font-medium">
            <span className="block hero-enter">Always</span>
            <span ref={wordRef} className="hero-word block">Building.</span>
          </h1>
        </div>
        <div className="hero-foot">
          <p className="hero-lede hero-enter" style={delay(900)}>
            {t.lede}
          </p>
          <div className="hero-links-row hero-enter" style={delay(1050)}>
            <a href="#projects" onClick={onNavigate} className="hero-project-link">
              {t.viewProjects} <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a href="https://github.com/PabloG55" target="_blank" rel="noopener noreferrer" className="hero-github-link">
              GitHub <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a href="#contact" onClick={onNavigate} className="hero-github-link">
              {t.contact} <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
