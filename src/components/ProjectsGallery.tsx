"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Pause, Play, LockKeyhole } from "lucide-react";
import Reveal from "./Reveal";
import SystemPreview from "./SystemPreview";

type Project = {
  id: string; name: string; category: string; status: string; subtitle: string;
  description: string; detail: string; tech: string[];
  href?: string; linkLabel?: string;
  video?: string; poster?: string; gif?: string;
  diagram?: "watch" | "brain"; caption: string;
};

const projects: Project[] = [
  {
    id: "trainpilot", name: "TrainPilot", category: "iOS · Apple Watch", status: "On the App Store",
    subtitle: "A running coach and gym logbook, in one app.",
    description: "I wanted one place for my runs and my lifting. TrainPilot builds run plans around a goal race, tracks pace and heart rate, and speaks coaching cues while the phone stays in your pocket. In the gym, it logs sets and suggests what to lift next based on what you actually completed.",
    detail: "Apple Watch controls, Health import/export, Strava and intervals.icu sync, and training with friends. Built for both English and Spanish.",
    tech: ["React Native", "Expo", "Swift", "HealthKit"],
    href: "https://apps.apple.com/us/app/trainpilot/id6788894342", linkLabel: "Get TrainPilot",
    video: "/projects/trainpilot/demo.mp4", poster: "/projects/trainpilot/poster.webp", gif: "/projects/trainpilot/demo.gif",
    caption: "Product walkthrough · running, lifting, and Apple Watch",
  },
  {
    id: "skipper", name: "Skipper", category: "iOS · v2", status: "In development",
    subtitle: "Watch videos with fewer ads.",
    description: "Skipper blocks ads and trackers by default and automatically skips supported video ads. The second version adds a native personal library: save a video, queue the next one, and pick up at your last playback position. Browsing and playback run in separate WebViews, so opening another page doesn’t tear down the player.",
    detail: "Each profile gets its own library and sign-ins. Private mode keeps the queue in memory and saves no history. Saved videos are links and metadata, rather than downloads.",
    tech: ["React Native", "TypeScript", "WKWebView", "Swift"],
    href: "/docs/support/skipper", linkLabel: "About Skipper",
    video: "/projects/skipper/queue-profiles.mp4", poster: "/projects/skipper/queue-profiles.webp", gif: "/projects/skipper/queue-profiles.gif",
    caption: "Queue and profiles · current iOS UI",
  },
  {
    id: "ghostfleet", name: "Ghostfleet", category: "Developer tool", status: "Open source",
    subtitle: "A whole fleet of coding agents. One terminal.",
    description: "One screen to see what every coding agent is doing. Start a worker in its own Git worktree, jump between sessions, or watch several live terminals side by side. Sessions stay running when you close the window, and the phone client lets you answer a blocked worker from anywhere.",
    detail: "Works with multiple coding agents. Per-project session isolation, worktree reuse, and a governor for resource and usage limits handle the less glamorous parts of running a fleet.",
    tech: ["Node.js", "tmux", "Git worktrees", "MCP"],
    href: "https://github.com/PabloG55/ghostfleet", linkLabel: "View source",
    video: "/projects/ghostfleet/stack-demo.mp4", poster: "/projects/ghostfleet/stack-poster.webp", gif: "/projects/ghostfleet/stack-demo.gif",
    caption: "Recorded terminal demo · Claude, OpenCode, and Codex side by side",
  },
  {
    id: "hombre-muerto", name: "Hombre Muerto", category: "iOS · Android", status: "Prototype",
    subtitle: "An offline watch alarm for small boats.",
    description: "A bridge phone asks the officer on watch to check in. Captain and crew phones listen over local Wi-Fi, without an internet connection. Receivers schedule their own native alarms ahead of time; each check-in moves the deadline forward.",
    detail: "The design makes a missing heartbeat lead to an alarm instead of silence. Built with Swift and Kotlin alarm modules; cross-device failure testing and standalone releases are still in progress.",
    tech: ["React Native", "Swift", "Kotlin", "UDP"], diagram: "watch", gif: "/projects/hombre-muerto/demo.gif",
    caption: "Interactive architecture walkthrough · illustrative, not a device recording",
  },
  {
    id: "immich", name: "Immich Sync Assistant", category: "Desktop utility", status: "Open source",
    subtitle: "Get the photos off your phone. Keep the originals.",
    description: "A desktop tool that pulls photos and videos from an Android phone over USB using ADB, then uploads them to a self-hosted Immich server. Pick specific folders, skip files already on the server, and organize uploads into albums.",
    detail: "Optional local ZIP archives and cleanup after upload keep the workflow under your control. The Tkinter GUI stays responsive while transfers run in background threads.",
    tech: ["Python", "Tkinter", "ADB", "Immich API"],
    href: "https://github.com/PabloG55/immich_sync_assistant", linkLabel: "View source",
    video: "/projects/immich/demo.mp4", poster: "/projects/immich/poster.webp", gif: "/projects/immich/demo.gif",
    caption: "UI walkthrough · folder selection, transfer, and verification",
  },
  {
    id: "markserv-diff", name: "markserv-diff", category: "Developer tool", status: "Open source",
    subtitle: "Review the document, with the changes in place.",
    description: "Raw Markdown diffs are hard to read when you’re reviewing a spec. This local document browser renders the Markdown and highlights changes inline: words, whole blocks, and table rows. Compare your working copy with HEAD or the current branch with main.",
    detail: "A file-tree sidebar, change minimap, and live reload make it practical for everyday docs work. Two runtime dependencies keep the tool small.",
    tech: ["Node.js", "Markdown", "markdown-it", "jsdiff"],
    href: "https://github.com/PabloG55/markserv-diff", linkLabel: "View source",
    video: "/projects/markserv-diff/demo.mp4", poster: "/projects/markserv-diff/poster.webp", gif: "/projects/markserv-diff/demo.gif",
    caption: "Real rendered diff · sample documentation",
  },
  {
    id: "sec-brain", name: "sec-brain", category: "Personal system", status: "Private",
    subtitle: "Personal agents for creative work, school, and organization.",
    description: "A private workspace with specialized agents for graphic design, video editing, schoolwork, and day-to-day organization. I can ask an agent to create a visual, edit a video, organize coursework, or plan a project. The system keeps the relevant notes, tasks, and context together in plain Markdown, so the agents can work from the same information.",
    detail: "Tasks sync to Apple Reminders through macOS automation and reach the iPhone through iCloud. Git provides a private backup. This overview shows the workflow using an invented example; the vault and its contents stay private.",
    tech: ["Agents", "Markdown", "CLI", "macOS automation", "Apple Reminders"], diagram: "brain", gif: "/projects/sec-brain/demo.gif",
    caption: "Interactive workflow · synthetic example · no personal vault data",
  },
  {
    id: "galapass", name: "Galapass", category: "Web platform", status: "Web app",
    subtitle: "A tour marketplace built for the Galápagos.",
    description: "One platform for travelers, tour operators, and guides. Travelers discover and book island experiences; operators manage tours, availability, and bookings; guides see their schedules and passenger manifests.",
    detail: "A React frontend and Spring Boot backend support the three roles, with Docker packaging the API and PostgreSQL storing the bookings.",
    tech: ["React", "Spring Boot", "Docker"], href: "https://www.galapass.net/", linkLabel: "Visit Galapass",
    video: "/projects/galapass/demo.mp4", poster: "/projects/galapass/poster.webp", gif: "/projects/galapass/demo.gif", caption: "UI walkthrough · Galapagos tour marketplace",
  },
];

function ProjectMedia({ project }: { project: Project }) {
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !motion.matches && !userPaused.current) element.play().catch(() => {});
      else element.pause();
    }, { threshold: 0.25 });
    const onMotionChange = () => { if (motion.matches) element.pause(); };
    observer.observe(element);
    motion.addEventListener("change", onMotionChange);
    return () => { observer.disconnect(); motion.removeEventListener("change", onMotionChange); element.pause(); };
  }, []);

  const toggleVideo = () => {
    const element = video.current;
    if (!element) return;
    if (element.paused) { userPaused.current = false; element.play().catch(() => {}); }
    else { userPaused.current = true; element.pause(); }
  };

  return (
    <figure className="project-figure">
      <div className={`project-media ${project.id === "skipper" ? "project-media-phone" : ""}`}>
        {project.diagram ? <SystemPreview kind={project.diagram} /> : project.video ? <>
          <video ref={video} muted loop playsInline preload="none" poster={project.poster} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label={`${project.name} walkthrough`}><source src={project.video} type="video/mp4" /></video>
          <button onClick={toggleVideo} className="media-play-button" aria-label={`${playing ? "Pause" : "Play"} ${project.name} walkthrough`}>{playing ? <Pause size={14} /> : <Play size={14} />} {playing ? "Pause" : "Play"}</button>
        </> : null}
      </div>
      <figcaption><span>{project.caption}</span>{project.gif && <a href={project.gif} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} GIF`}>GIF <ArrowUpRight size={11} /></a>}</figcaption>
    </figure>
  );
}

export default function ProjectsGallery() {
  return <div className="projects-gallery">{projects.map((project, index) => <Reveal key={project.id}>
    <article id={`project-${project.id}`} className="project-row grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      <div className={`order-2 ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
        <div className="project-meta"><span>{project.category}</span><span className={`project-status ${project.status === "On the App Store" ? "status-live" : ""}`}>{project.status === "Private" && <LockKeyhole size={11} />}{project.status}</span></div>
        <h3 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-gray-900 dark:text-white mb-4">{project.name}</h3>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-5 leading-snug">{project.subtitle}</p>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{project.description}</p>
        <p className="text-sm text-gray-500 dark:text-gray-500 leading-relaxed mb-6">{project.detail}</p>
        <ul className="project-tech" aria-label={`${project.name} technologies`}>{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul>
        {project.href && <a target={project.href.startsWith("http") ? "_blank" : undefined} rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined} href={project.href} className="project-link">{project.linkLabel}<ArrowUpRight size={17} /></a>}
      </div>
      <div className={`order-1 min-w-0 ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}><ProjectMedia project={project} /></div>
    </article>
  </Reveal>)}</div>;
}
