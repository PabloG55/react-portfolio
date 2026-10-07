"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Mail, Menu, Phone, Send, X } from "lucide-react";
import ProjectsGallery from "@/components/ProjectsGallery";
import ParticleNetwork from "@/components/ParticleNetwork";
import SkillsTerminal from "@/components/SkillsTerminal";
import Reveal from "@/components/Reveal";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSectionNavigation = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const hash = event.currentTarget.hash;
    const section = document.getElementById(hash.slice(1));
    if (!section) return;

    event.preventDefault();
    setIsMenuOpen(false);

    const content = section.firstElementChild as HTMLElement | null;
    if (!content) return;
    const headerHeight = document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;
    const availableHeight = window.innerHeight - headerHeight;
    // Center the content rather than the section's generous outer padding.
    // Tall sections start with their heading and opening content in view.
    const visibleHeight = Math.min(content.offsetHeight, Math.max(0, availableHeight - 48));
    const top = content.getBoundingClientRect().top + window.scrollY
      - headerHeight - (availableHeight - visibleHeight) / 2;

    if (window.location.hash !== hash) window.history.pushState(null, "", hash);
    window.scrollTo({
      top: Math.max(0, top),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        setFormStatus("error");
        console.error("Contact Form Error:", result.error || "Unknown error");
      } else {
        setFormStatus("success");
        (e.target as HTMLFormElement).reset();
      }
    } catch (err) {
      console.error("Network or submission error:", err);
      setFormStatus("error");
    }
  };

  return (
    <main>
      <nav className="site-header fixed w-full z-50 top-0 bg-background-light dark:bg-background-dark border-b border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            <div className="flex-shrink-0">
              <a
                className="font-display font-bold text-xl tracking-tight hover:text-primary transition-colors flex items-center gap-2"
                href="#"
              >
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                GARCES.DEV
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-12">
                <a
                  className="hover:text-primary text-sm font-medium transition-colors"
                  href="#about" onClick={handleSectionNavigation}
                >
                  About
                </a>
                <a
                  className="hover:text-primary text-sm font-medium transition-colors"
                  href="#skills" onClick={handleSectionNavigation}
                >
                  Skills
                </a>
                <a
                  className="hover:text-primary text-sm font-medium transition-colors"
                  href="#experience" onClick={handleSectionNavigation}
                >
                  Experience
                </a>
                <a
                  className="hover:text-primary text-sm font-medium transition-colors"
                  href="#projects" onClick={handleSectionNavigation}
                >
                  Projects
                </a>
                <a
                  className="border border-gray-200 dark:border-gray-800 hover:border-primary hover:text-primary px-5 py-2 rounded-full text-sm font-medium transition-all"
                  href="#contact" onClick={handleSectionNavigation}
                >
                  Contact
                </a>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-black dark:hover:text-white focus:outline-none"
                type="button"
                aria-label="Open navigation"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu drawer overlay */}
      <div
        className={`fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm z-[90] transition-opacity duration-300 md:hidden ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile menu drawer */}
      <div
        inert={!isMenuOpen}
        aria-hidden={!isMenuOpen}
        className={`fixed top-0 right-0 h-full w-[250px] bg-zinc-950 text-white border-l border-zinc-900 z-[100] transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-900">
          <span className="font-display font-bold text-sm tracking-widest">
            MENU
          </span>
          <button
            aria-label="Close navigation"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col p-6 space-y-6 mt-4">
          <a
            className="hover:text-primary text-lg font-medium transition-colors"
            href="#about" onClick={handleSectionNavigation}
          >
            About
          </a>
          <a
            className="hover:text-primary text-lg font-medium transition-colors"
            href="#skills" onClick={handleSectionNavigation}
          >
            Skills
          </a>
          <a
            className="hover:text-primary text-lg font-medium transition-colors"
            href="#experience" onClick={handleSectionNavigation}
          >
            Experience
          </a>
          <a
            className="hover:text-primary text-lg font-medium transition-colors"
            href="#projects" onClick={handleSectionNavigation}
          >
            Projects
          </a>
          <a
            className="hover:text-primary text-lg font-medium transition-colors"
            href="#contact" onClick={handleSectionNavigation}
          >
            Contact
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="portfolio-hero relative isolate flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <ParticleNetwork />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>
        <div className="hero-content relative z-10 text-center px-6 mx-auto">
          <h1 className="hero-title font-display font-medium text-gray-900 dark:text-white">
            Always
            <br />
            <span className="hero-title-secondary font-light">
              Building.
            </span>
          </h1>
          <p className="hero-intro text-gray-600 dark:text-gray-400">
            Pablo Garces. Software engineer.
            <br />
            M.S. student at UNC Charlotte.
          </p>
          <div className="hero-links">
            <a href="#projects" onClick={handleSectionNavigation} className="hero-project-link">
              View projects <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href="https://github.com/PabloG55" target="_blank" rel="noopener noreferrer" className="hero-github-link">
              GitHub <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        className="py-32 bg-white dark:bg-background-dark relative"
        id="about"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-sm overflow-hidden aspect-[3/4] border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                <Image
                  fill
                  sizes="(max-width: 1023px) 100vw, 42vw"
                  alt="Pablo Garces Portrait"
                  className="object-cover object-top w-full h-full opacity-90 transition-all duration-700 grayscale hover:grayscale-0"
                  src="/images/graduation.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <p className="font-mono text-sm uppercase font-bold tracking-widest">
                    Software Engineer UNCC &apos;25
                  </p>
                </div>
              </div>
              <div className="absolute -z-10 top-4 right-0 lg:top-8 lg:-right-8 w-full h-full border border-gray-200 dark:border-gray-800 rounded-sm"></div>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center h-full">
              <h2 className="text-sm font-mono text-primary mb-4 tracking-widest uppercase">
                About Me
              </h2>
              <h3 className="text-3xl md:text-5xl font-display font-medium mb-8 text-gray-900 dark:text-white leading-tight">
                From a real problem
                <br />{" "}
                <span className="text-gray-400 dark:text-gray-600">
                  to working software.
                </span>
              </h3>
              <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-400 font-light mb-12">
                <p className="mb-4">
                  I hold a <strong>B.Sc. in Computer Science</strong> and am
                  currently pursuing my M.S. at the University of North Carolina
                  at Charlotte. I worked as a software engineering intern at
                  Superkey through September 2026. I spend most of my
                  time building mobile apps, backend systems, and tools that
                  make day-to-day development easier.
                </p>
                <p>
                  My personal projects usually start with something I want
                  to use: better training, a video player that remembers my
                  place, or a way to keep track of several coding agents.
                  I care about the details that make those tools reliable.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 dark:border-gray-800 pt-10">
                <div>
                  <div className="text-xs font-mono text-gray-400 dark:text-gray-500 mb-2">
                    MASTER OF SCIENCE
                  </div>
                  <div className="font-display text-xl text-gray-900 dark:text-white font-semibold">
                    Computer Science
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    UNC Charlotte
                  </div>
                  <div className="text-xs text-primary mt-2">
                    Expected Dec 2026
                  </div>
                </div>
                <div>
                  <div className="text-xs font-mono text-gray-400 dark:text-gray-500 mb-2">
                    BACHELOR OF SCIENCE
                  </div>
                  <div className="font-display text-xl text-gray-900 dark:text-white font-semibold">
                    Computer Science
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    UNC Charlotte • Summa Cum Laude
                  </div>
                  <div className="text-xs text-primary mt-2">
                    Graduated Dec 2025
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skills Section */}
      <section
        className="py-24 bg-surface-light dark:bg-surface-dark border-y border-gray-200 dark:border-gray-800"
        id="skills"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-display font-medium text-gray-900 dark:text-white">
              Tools I work with
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              The stack behind the apps, tools, and experiments below.
            </p>
          </div>
          <Reveal><SkillsTerminal /></Reveal>
        </div>
      </section>

      {/* Experience Section */}
      <section
        className="py-32 bg-white dark:bg-background-dark"
        id="experience"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-medium text-gray-900 dark:text-white">
              Experience
            </h2>
            <p className="text-gray-500 dark:text-gray-500 font-mono text-sm mt-4 md:mt-0">
              /timeline
            </p>
          </div>
          <div className="relative space-y-12">
            <div className="absolute left-[19px] top-2 bottom-2 w-[1px] bg-gray-200 dark:bg-gray-800"></div>

            <Reveal className="relative pl-12 group">
              <div className="absolute left-0 top-1.5 w-[39px] h-[39px] flex items-center justify-center bg-white dark:bg-background-dark z-10 border border-gray-100 dark:border-gray-800 rounded-full group-hover:border-primary transition-colors">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                  Software Engineering Intern
                </h3>
                <span className="font-mono text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded mt-2 sm:mt-0">
                  Nov 2025 - Sep 2026
                </span>
              </div>
              <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Superkey Insurance
              </div>
              <div className="text-gray-600 dark:text-gray-400 leading-relaxed font-light max-w-2xl space-y-2">
                <p>
                  • Spearheaded the end-to-end development of a new product
                  vertical from 0 to 1, architecting a scalable full-stack
                  solution that supports complex multi-user workflows, automated
                  payments, and secure document management.
                </p>
                <p>
                  • Engineered critical backend infrastructure and security
                  protocols, optimizing system reliability and session
                  management to support rapid release cycles and ensure high
                  availability.
                </p>
                <p>
                  • Enhanced the flagship SaaS platform by modernizing core
                  features, including the implementation of intelligent data
                  matching algorithms and streamlined document ingestion
                  workflows to improve user onboarding.
                </p>
              </div>
            </Reveal>

            <Reveal className="relative pl-12 group">
              <div className="absolute left-0 top-1.5 w-[39px] h-[39px] flex items-center justify-center bg-white dark:bg-background-dark z-10 border border-gray-100 dark:border-gray-800 rounded-full group-hover:border-primary transition-colors">
                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                  Instructional Assistant
                </h3>
                <span className="font-mono text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded mt-2 sm:mt-0">
                  Aug 2024 - Dec 2025
                </span>
              </div>
              <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                UNC Charlotte • College of Computing
              </div>
              <div className="text-gray-600 dark:text-gray-400 leading-relaxed font-light max-w-2xl space-y-2">
                <p>
                  • Supported a class of 90 students in mastering C programming
                  and Assembly language concepts.
                </p>
                <p>
                  • Led lab sessions independently, offering hands-on guidance
                  with coding exercises and system architecture.
                </p>
                <p>
                  • Provided targeted assignment feedback and held office hours
                  to resolve course-related inquiries.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-32 bg-gray-50 dark:bg-black/40" id="projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div><p className="font-mono text-xs text-primary mb-4">APPS / DEVELOPER TOOLS / PERSONAL SYSTEMS</p>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-gray-900 dark:text-white">Things I’ve built.</h2></div>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">Shipped apps, open-source tools, and a few projects still on the workbench.</p>
          </Reveal>
          <div className="space-y-24">
            <ProjectsGallery />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer
        className="py-24 bg-white dark:bg-background-dark border-t border-gray-200 dark:border-gray-800"
        id="contact"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-medium mb-5 text-gray-900 dark:text-white">
                Let&apos;s connect
              </h2>
              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                I&apos;m currently open to internship and full-time opportunities in
                software engineering.
              </p>
              <div className="space-y-6 mb-12">
                <a
                  className="flex items-center gap-4 text-gray-900 dark:text-white hover:text-primary transition-colors group"
                  href="mailto:pgarcesb1@gmail.com"
                >
                  <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center group-hover:border-primary transition-colors">
                    <Mail size={20} aria-hidden="true" className="" />
                  </div>
                  <span className="text-lg">pgarcesb1@gmail.com</span>
                </a>
                <div className="flex items-center gap-4 text-gray-900 dark:text-white">
                  <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center">
                    <Phone size={20} aria-hidden="true" className="" />
                  </div>
                  <span className="text-lg">+1 (980) 358-7992</span>
                </div>
              </div>
              <div className="flex gap-4">
                <a
                  target="_blank"
                  className="w-12 h-12 flex items-center justify-center border border-gray-200 dark:border-gray-800 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                  aria-label="LinkedIn"
                  rel="noopener noreferrer"
                  href="https://linkedin.com/in/pablogarces5"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
                <a
                  target="_blank"
                  className="w-12 h-12 flex items-center justify-center border border-gray-200 dark:border-gray-800 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                  aria-label="GitHub"
                  rel="noopener noreferrer"
                  href="https://github.com/PabloG55"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-surface-dark p-8 md:p-12 rounded-2xl border border-gray-100 dark:border-gray-800">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium text-gray-900 dark:text-gray-300"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      required
                      className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium text-gray-900 dark:text-gray-300"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      required
                      className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      type="email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-gray-900 dark:text-gray-300"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    required
                    className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all min-h-[150px]"
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                {formStatus === "success" && (
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 dark:text-green-400 text-sm">
                    Message sent successfully! I&apos;ll get back to you soon.
                  </div>
                )}
                {formStatus === "error" && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 dark:text-red-400 text-sm">
                    Failed to send message. Please try again.
                  </div>
                )}

                <button
                  disabled={formStatus === "submitting"}
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold py-4 px-6 rounded-lg hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  type="submit"
                >
                  {formStatus === "submitting" ? "Sending..." : "Send Message"}
                  {formStatus !== "submitting" && (
                    <Send size={14} aria-hidden="true" className="" />
                  )}
                </button>
              </form>
            </div>
          </Reveal>
          <div className="mt-24 pt-8 border-t border-gray-100 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© 2026 Pablo Garces. All rights reserved.</p>
            <p className="mt-2 md:mt-0 font-mono">
              Designed &amp; Built by Pablo.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
