"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Pause, Play, LockKeyhole } from "lucide-react";
import Reveal from "./Reveal";
import SystemPreview from "./SystemPreview";
import { fill, type Dict } from "@/i18n";

// What a project is (name, links, media, tech) lives here; what it says lives in the
// dictionary under t.projects[id], so both languages show the same projects in the same order.
type ProjectId = keyof Dict["projects"];
type Project = {
  id: ProjectId; name: string; tech: string[];
  href?: string; website?: string;
  video?: string; poster?: string; gif?: string;
  diagram?: "watch" | "brain";
  live?: boolean; locked?: boolean; hidden?: boolean;
};

const projects: Project[] = [
  {
    id: "trainpilot", name: "TrainPilot", live: true,
    tech: ["React Native", "Expo", "Swift", "HealthKit"],
    href: "https://apps.apple.com/us/app/trainpilot/id6788894342", website: "https://trainpilot.pablogarces.dev",
    video: "/projects/trainpilot/demo.mp4", poster: "/projects/trainpilot/poster.webp", gif: "/projects/trainpilot/demo.gif",
  },
  {
    id: "skipper", name: "Skipper",
    tech: ["React Native", "TypeScript", "WKWebView", "Swift"],
    href: "https://skipper.pablogarces.dev",
    video: "/projects/skipper/queue-profiles.mp4", poster: "/projects/skipper/queue-profiles.webp", gif: "/projects/skipper/queue-profiles.gif",
  },
  {
    id: "ghostfleet", name: "Ghostfleet",
    tech: ["Node.js", "tmux", "Git worktrees", "MCP"],
    href: "https://github.com/PabloG55/ghostfleet", website: "https://ghostfleet.pablogarces.dev",
    video: "/projects/ghostfleet/stack-demo.mp4", poster: "/projects/ghostfleet/stack-poster.webp", gif: "/projects/ghostfleet/stack-demo.gif",
  },
  {
    id: "hombre-muerto", hidden: true, name: "Hombre Muerto",
    tech: ["React Native", "Expo", "Swift", "Kotlin", "UDP"],
    video: "/projects/hombre-muerto/demo.mp4", poster: "/projects/hombre-muerto/poster.webp", gif: "/projects/hombre-muerto/demo.gif",
  },
  {
    id: "immich", name: "Immich Sync Assistant",
    tech: ["Python", "Tkinter", "ADB", "Immich API"],
    href: "https://github.com/PabloG55/immich_sync_assistant",
    video: "/projects/immich/demo.mp4", poster: "/projects/immich/poster.webp", gif: "/projects/immich/demo.gif",
  },
  {
    id: "markserv-diff", name: "markserv-diff",
    tech: ["Node.js", "Markdown", "markdown-it", "jsdiff"],
    href: "https://github.com/PabloG55/markserv-diff",
    video: "/projects/markserv-diff/demo.mp4", poster: "/projects/markserv-diff/poster.webp", gif: "/projects/markserv-diff/demo.gif",
  },
  {
    id: "sec-brain", name: "sec-brain", locked: true,
    tech: ["Ghostfleet", "Agents", "Markdown", "CLI", "macOS automation", "Apple Reminders"], diagram: "brain", gif: "/projects/sec-brain/demo.gif",
  },
  {
    id: "galapass", name: "Galapass",
    tech: ["React", "Spring Boot", "Docker"], href: "https://www.galapass.net/",
    video: "/projects/galapass/demo.mp4", poster: "/projects/galapass/poster.webp", gif: "/projects/galapass/demo.gif",
  },
];

const frontendProjects: Project[] = [
  {
    id: "paula-garces", name: "Dra. Paula Garcés",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "WebGL", "Vercel Blob", "Upstash Redis"],
    href: "https://drapaulagarces.vercel.app/",
    video: "/projects/paula-garces/demo.mp4", poster: "/projects/paula-garces/poster.webp", gif: "/projects/paula-garces/demo.gif",
  },
  {
    id: "isa-cruz-art", name: "Isa Cruz Art",
    tech: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Auth.js", "Vercel Blob"],
    href: "https://isacruzart.com/",
    video: "/projects/isa-cruz-art/demo.mp4", poster: "/projects/isa-cruz-art/poster.webp", gif: "/projects/isa-cruz-art/demo.gif",
  },
  {
    id: "sos-galapagos", name: "SOS Galápagos",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Vercel"],
    href: "https://sosgalapagos.pablogarces.dev/",
    video: "/projects/sos-galapagos/demo.mp4", poster: "/projects/sos-galapagos/poster.webp", gif: "/projects/sos-galapagos/demo.gif",
  },
];

function ProjectMedia({ project, t }: { project: Project; t: Dict }) {
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
      <div className={`project-media ${(project.id === "skipper" || project.id === "hombre-muerto") ? "project-media-phone" : ""}`}>
        {project.diagram ? <SystemPreview kind={project.diagram} t={t.preview} /> : project.video ? <>
          <video ref={video} muted loop playsInline preload="none" poster={project.poster} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label={fill(t.gallery.videoLabel, { name: project.name })}><source src={project.video} type="video/mp4" /></video>
          <button onClick={toggleVideo} className="media-play-button" aria-label={fill(playing ? t.gallery.pauseLabel : t.gallery.playLabel, { name: project.name })}>{playing ? <Pause size={14} /> : <Play size={14} />} {playing ? t.gallery.pause : t.gallery.play}</button>
        </> : null}
      </div>
      <figcaption><span>{t.projects[project.id].caption}</span>{project.gif && <a href={project.gif} target="_blank" rel="noopener noreferrer" aria-label={fill(t.gallery.gifLabel, { name: project.name })}>GIF <ArrowUpRight size={11} /></a>}</figcaption>
    </figure>
  );
}

export default function ProjectsGallery({ t, kind = "projects" }: { t: Dict; kind?: "projects" | "frontend" }) {
  const items = (kind === "frontend" ? frontendProjects : projects).filter((project) => !project.hidden);
  return <div className="projects-gallery">{items.map((project, index) => { const copy = t.projects[project.id]; return <Reveal key={project.id}>
    <article id={`project-${project.id}`} className="project-row grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      <div className={`order-2 ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
        <div className="project-meta"><span>{copy.category}</span><span className={`project-status ${project.live ? "status-live" : ""}`}>{project.locked && <LockKeyhole size={11} />}{copy.status}</span></div>
        <h3 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-gray-900 dark:text-white mb-4">{project.name}</h3>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-5 leading-snug">{copy.subtitle}</p>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{copy.description}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">{copy.detail}</p>
        <ul className="project-tech" aria-label={fill(t.gallery.techLabel, { name: project.name })}>{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul>
        <div className="flex flex-wrap gap-6">{project.href && <a target={project.href.startsWith("http") ? "_blank" : undefined} rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined} href={project.href} className="project-link">{copy.linkLabel}<ArrowUpRight size={17} /></a>}{project.website && <a href={project.website} className="project-link">{t.gallery.exploreApp}<ArrowUpRight size={17} /></a>}</div>
      </div>
      <div className={`order-1 min-w-0 ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}><ProjectMedia project={project} t={t} /></div>
    </article>
  </Reveal>; })}</div>;
}
