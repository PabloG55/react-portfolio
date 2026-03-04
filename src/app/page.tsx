"use client";

import { useState } from "react";
import ProjectsGallery from "@/components/ProjectsGallery";
import ParticleNetwork from "@/components/ParticleNetwork";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

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
      <nav className="fixed w-full z-50 top-0 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <a
                className="font-display font-bold text-xl tracking-tight hover:text-primary transition-colors flex items-center gap-2"
                href="#"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                GARCES.DEV
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-12">
                <a
                  className="hover:text-primary text-sm font-medium transition-colors"
                  href="#about"
                >
                  About
                </a>
                <a
                  className="hover:text-primary text-sm font-medium transition-colors"
                  href="#skills"
                >
                  Skills
                </a>
                <a
                  className="hover:text-primary text-sm font-medium transition-colors"
                  href="#experience"
                >
                  Experience
                </a>
                <a
                  className="hover:text-primary text-sm font-medium transition-colors"
                  href="#projects"
                >
                  Projects
                </a>
                <a
                  className="border border-gray-200 dark:border-gray-800 hover:border-primary hover:text-primary px-5 py-2 rounded-full text-sm font-medium transition-all"
                  href="#contact"
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
              >
                <span className="material-symbols-outlined">
                  {isMenuOpen ? "close" : "menu"}
                </span>
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
        className={`fixed top-0 right-0 h-full w-[250px] bg-zinc-950 text-white border-l border-zinc-900 z-[100] transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-900">
          <span className="font-display font-bold text-sm tracking-widest">
            MENU
          </span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="flex flex-col p-6 space-y-6 mt-4">
          <a
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-primary text-lg font-medium transition-colors"
            href="#about"
          >
            About
          </a>
          <a
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-primary text-lg font-medium transition-colors"
            href="#skills"
          >
            Skills
          </a>
          <a
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-primary text-lg font-medium transition-colors"
            href="#experience"
          >
            Experience
          </a>
          <a
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-primary text-lg font-medium transition-colors"
            href="#projects"
          >
            Projects
          </a>
          <a
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-primary text-lg font-medium transition-colors"
            href="#contact"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <ParticleNetwork />
          <div className="absolute top-[20%] left-[10%] w-[50vw] h-[50vw] bg-blue-500/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] bg-purple-500/5 rounded-full blur-[100px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-display font-medium tracking-tighter mb-6 leading-none text-gray-900 dark:text-white">
            Designing
            <br />
            <span className="font-light text-gray-400 dark:text-gray-600">
              Intelligence.
            </span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Pablo Garces. Computer Science Student at UNCC.{" "}
            <br className="hidden sm:block" />
            Specializing in{" "}
            <span className="text-primary font-medium">
              AI &amp; Software Engineering
            </span>
            .
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              className="group relative px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-medium overflow-hidden transition-all hover:shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
              href="#projects"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Work
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </span>
            </a>
            <a
              className="group px-8 py-4 bg-transparent text-gray-900 dark:text-white rounded-full font-medium transition-all flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-900"
              href="#experience"
            >
              Experience
              <span className="material-symbols-outlined text-[18px] opacity-0 group-hover:opacity-100 transition-opacity">
                south
              </span>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-sm overflow-hidden aspect-[3/4] border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                <img
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
              <div className="absolute -z-10 top-8 -right-8 w-full h-full border border-gray-200 dark:border-gray-800 rounded-sm"></div>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center h-full">
              <h2 className="text-sm font-mono text-primary mb-4 tracking-widest uppercase">
                About Me
              </h2>
              <h3 className="text-3xl md:text-5xl font-display font-medium mb-8 text-gray-900 dark:text-white leading-tight">
                Bridging the gap between
                <br />{" "}
                <span className="text-gray-400 dark:text-gray-600">
                  complex logic and human experience.
                </span>
              </h3>
              <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-400 font-light mb-12">
                <p className="mb-4">
                  I hold a <strong>B.Sc. in Computer Science</strong> and am
                  currently pursuing my M.S. at the University of North Carolina
                  at Charlotte, while working at Superkey. My professional and
                  academic journey is defined by a rigorous focus on Software
                  Engineering and Artificial Intelligence.
                </p>
                <p>
                  I combine technical expertise with a passion for social
                  impact. Whether I&apos;m architecting scalable backends or
                  fine-tuning AI logic, my goal is to build software that
                  matters.
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
          </div>
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
              Technical Arsenal
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              My preferred stack and tools.
            </p>
          </div>
          <div className="code-editor shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <div className="text-xs font-mono text-gray-400">skills.json</div>
              <div className="w-10"></div>
            </div>
            <div className="p-4 md:p-6 overflow-x-auto">
              <pre className="text-sm md:text-base font-mono leading-relaxed">
                <div className="flex">
                  <span className="line-number">1</span>
                  <span className="text-gray-500">{"{"}</span>
                </div>
                <div className="flex">
                  <span className="line-number">2</span>{" "}
                  <span className="text-[#7ee787]">"languages"</span>:{" "}
                  <span className="text-gray-500">[</span>
                </div>
                <div className="flex">
                  <span className="line-number">3</span>{" "}
                  <span className="text-[#a5d6ff]">"Java"</span>
                  <span className="text-gray-500">,</span>{" "}
                  <span className="text-[#a5d6ff]">"Python"</span>
                  <span className="text-gray-500">,</span>{" "}
                  <span className="text-[#a5d6ff]">
                    "JavaScript/TypeScript"
                  </span>
                  <span className="text-gray-500">,</span>
                </div>
                <div className="flex">
                  <span className="line-number">4</span>{" "}
                  <span className="text-[#a5d6ff]">"C"</span>
                  <span className="text-gray-500">,</span>{" "}
                  <span className="text-[#a5d6ff]">"C++"</span>
                  <span className="text-gray-500">,</span>{" "}
                  <span className="text-[#a5d6ff]">"SQL"</span>
                  <span className="text-gray-500">,</span>{" "}
                  <span className="text-[#a5d6ff]">"Dart"</span>
                  <span className="text-gray-500">,</span>{" "}
                  <span className="text-[#a5d6ff]">"HTML/CSS"</span>
                </div>
                <div className="flex">
                  <span className="line-number">5</span>{" "}
                  <span className="text-gray-500">],</span>
                </div>
                <div className="flex">
                  <span className="line-number">6</span>{" "}
                  <span className="text-[#7ee787]">"frameworks"</span>:{" "}
                  <span className="text-gray-500">{"{"}</span>
                </div>
                <div className="flex">
                  <span className="line-number">7</span>{" "}
                  <span className="text-[#7ee787] pl-4">"frontend"</span>:{" "}
                  <span className="text-gray-500">[</span>
                  <span className="text-[#a5d6ff]">"Next.js"</span>
                  <span className="text-gray-500">,</span>{" "}
                  <span className="text-[#a5d6ff]">"React.js"</span>
                  <span className="text-gray-500">,</span>{" "}
                  <span className="text-[#a5d6ff]">"Tailwind CSS"</span>
                  <span className="text-gray-500">,</span>{" "}
                  <span className="text-[#a5d6ff]">"JavaFX"</span>
                  <span className="text-gray-500">],</span>
                </div>
                <div className="flex">
                  <span className="line-number">8</span>{" "}
                  <span className="text-[#7ee787] pl-4">"backend"</span>:{" "}
                  <span className="text-gray-500">[</span>
                  <span className="text-[#a5d6ff]">"Spring Boot"</span>
                  <span className="text-gray-500">,</span>{" "}
                  <span className="text-[#a5d6ff]">"Node.js"</span>
                  <span className="text-gray-500">,</span>{" "}
                  <span className="text-[#a5d6ff]">"Flask"</span>
                  <span className="text-gray-500">]</span>
                </div>
                <div className="flex">
                  <span className="line-number">9</span>{" "}
                  <span className="text-gray-500">{"}"},</span>
                </div>
                <div className="flex">
                  <span className="line-number">10</span>{" "}
                  <span className="text-[#7ee787]">"infrastructure"</span>:{" "}
                  <span className="text-gray-500">[</span>
                </div>
                <div className="flex">
                  <span className="line-number">11</span>{" "}
                  <span className="text-[#a5d6ff]">"Supabase"</span>
                  <span className="text-gray-500">,</span>{" "}
                  <span className="text-[#a5d6ff]">"PostgreSQL"</span>
                  <span className="text-gray-500">,</span>{" "}
                  <span className="text-[#a5d6ff]">"MongoDB"</span>
                  <span className="text-gray-500">,</span>{" "}
                  <span className="text-[#a5d6ff]">"Docker"</span>
                  <span className="text-gray-500">,</span>{" "}
                  <span className="text-[#a5d6ff]">"Vercel"</span>
                  <span className="text-gray-500">,</span>{" "}
                  <span className="text-[#a5d6ff]">"Render"</span>
                </div>
                <div className="flex">
                  <span className="line-number">12</span>{" "}
                  <span className="text-gray-500">],</span>
                </div>
                <div className="flex">
                  <span className="line-number">13</span>{" "}
                  <span className="text-[#7ee787]">"developer_tools"</span>:{" "}
                  <span className="text-gray-500">[</span>
                </div>
                <div className="flex">
                  <span className="line-number">14</span>{" "}
                  <span className="text-[#a5d6ff]">"Git"</span>
                  <span className="text-gray-500">,</span>{" "}
                  <span className="text-[#a5d6ff]">"Linux"</span>
                  <span className="text-gray-500">,</span>{" "}
                  <span className="text-[#a5d6ff]">"Stripe Connect"</span>
                  <span className="text-gray-500">,</span>{" "}
                  <span className="text-[#a5d6ff]">"MCP"</span>
                </div>
                <div className="flex">
                  <span className="line-number">15</span>{" "}
                  <span className="text-gray-500">]</span>
                </div>
                <div className="flex">
                  <span className="line-number">16</span>
                  <span className="text-gray-500">{"}"}</span>
                  <span className="animate-pulse ml-1 inline-block w-2 h-4 bg-primary align-middle"></span>
                </div>
              </pre>
            </div>
          </div>
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

            <div className="relative pl-12 group">
              <div className="absolute left-0 top-1.5 w-[39px] h-[39px] flex items-center justify-center bg-white dark:bg-background-dark z-10 border border-gray-100 dark:border-gray-800 rounded-full group-hover:border-primary transition-colors">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                  Software Engineering Intern
                </h3>
                <span className="font-mono text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded mt-2 sm:mt-0">
                  Nov 2025 - Present
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
            </div>

            <div className="relative pl-12 group">
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
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-32 bg-gray-50 dark:bg-black/40" id="projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-display font-medium mb-16 text-gray-900 dark:text-white">
            Selected Works
          </h2>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-5xl font-display font-bold mb-8 text-gray-900 dark:text-white">
                Let's Connect
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 font-light mb-12 max-w-md">
                I'm currently open to internship and full-time opportunities in
                software engineering.
              </p>
              <div className="space-y-6 mb-12">
                <a
                  className="flex items-center gap-4 text-gray-900 dark:text-white hover:text-primary transition-colors group"
                  href="mailto:pgarcesb1@gmail.com"
                >
                  <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center group-hover:border-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">
                      mail
                    </span>
                  </div>
                  <span className="text-lg">pgarcesb1@gmail.com</span>
                </a>
                <div className="flex items-center gap-4 text-gray-900 dark:text-white">
                  <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">
                      call
                    </span>
                  </div>
                  <span className="text-lg">+1 (980) 358-7992</span>
                </div>
              </div>
              <div className="flex gap-4">
                <a
                  target="_blank"
                  className="w-12 h-12 flex items-center justify-center border border-gray-200 dark:border-gray-800 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                  href="https://linkedin.com/in/pablogarces5"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
                <a
                  target="_blank"
                  className="w-12 h-12 flex items-center justify-center border border-gray-200 dark:border-gray-800 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
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
                    Message sent successfully! I'll get back to you soon.
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
                    <span className="material-symbols-outlined text-sm">
                      send
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
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
