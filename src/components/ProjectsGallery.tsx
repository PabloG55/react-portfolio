"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const projects = [
  {
    id: 1,
    name: "Galapass",
    images: [
      "/images/galapass/1.png",
      "/images/galapass/2.png",
      "/images/galapass/3.png",
      "/images/galapass/4.png",
      "/images/galapass/5.png",
    ],
    description: `A comprehensive travel management platform. Galapass simplifies complex travel itineraries. Built with a robust microservices architecture, it handles real-time booking updates and integrates with third-party flight APIs.`,
    repo: "https://www.galapass.net/",
    tech: ["Spring Boot", "React", "Docker"],
    subtitle: "A comprehensive travel management platform.",
  },
  {
    id: 2,
    name: "Expense Tracker",
    images: [
      "/images/2.webp",
      "/images/7.webp",
      "/images/4.webp",
      "/images/5.webp",
    ],
    description: `An intelligent tool that doesn't just track spending but predicts it. Using TensorFlow, it categorizes transactions automatically and forecasts future monthly expenses with 85% accuracy.`,
    repo: "https://github.com/PabloG55/expense-tracker-maven",
    tech: ["Python", "TensorFlow", "SQL"],
    subtitle: "ML-driven financial management.",
  },
  {
    id: 3,
    name: "Skipper",
    images: ["/images/img.webp", "/images/img_1.webp"],
    description: `Skipper helps students learn faster by generating concise summaries of long educational videos. It leverages the OpenAI API to extract key concepts and action items in seconds.`,
    repo: "https://play.google.com/store/apps/details?id=com.pgarc.skipper",
    tech: ["Next.js", "OpenAI API", "Node.js"],
    subtitle: "Educational content summarization.",
  },
  {
    id: 4,
    name: "Botifier",
    images: [
      "/images/phone1.webp",
      "/images/phone2.webp",
      "/images/phone3.webp",
      "/images/phone4.webp",
    ],
    description: `Telegram-based productivity assistant with natural language processing (NLP) that lets users schedule, manage, and complete reminders via chat or voice. Includes smart follow-ups, a real-time dashboard, and multi-user timezone support. Built for accountability and intuitive task interaction.`,
    repo: "https://github.com/PabloG55/telegram-reminder-bot",
    tech: ["Python", "NLP", "Telegram API"],
    subtitle: "Telegram-based productivity assistant.",
  },
  {
    id: 5,
    name: "Immich Sync Assistant",
    images: [
      "/images/screenshot_config.webp",
      "/images/screenshot_folders.webp",
      "/images/screenshot_process.webp",
      "/images/screenshot_verify.webp",
    ],
    description: `Desktop GUI tool to reliably sync photos and videos from an Android device to a self-hosted Immich server. It uses a robust ADB connection to bypass unstable MTP transfers, leveraging a PC as a secure staging area. Features include duplicate detection, automatic local .zip archiving, full metadata preservation, and granular cleanup control.`,
    repo: "https://github.com/PabloG55/immich_sync_assistant",
    tech: ["Python", "ADB", "PyQt"],
    subtitle: "Desktop GUI sync tool.",
  },
];

export default function ProjectsGallery() {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    fade: true,
    pauseOnHover: false,
  };

  return (
    <div className="space-y-24">
      {projects.map((proj, index) => {
        // According to the original HTML layout, alternating grid structure
        const isEven = index % 2 === 0;
        return (
          <div
            key={proj.id}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group"
          >
            <div className={`order-2 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
              <h3 className="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
                {proj.name}
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-400 font-light mb-6">
                {proj.subtitle}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-full text-xs font-mono uppercase tracking-wide"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {proj.description}
              </p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={proj.repo}
                className="inline-flex items-center text-sm font-bold uppercase tracking-wider border-b-2 border-black dark:border-white pb-1 hover:text-primary hover:border-primary transition-colors"
              >
                View Project{" "}
                <span className="material-symbols-outlined text-sm ml-2">
                  arrow_outward
                </span>
              </a>
            </div>

            <div
              className={`order-1 ${isEven ? "lg:order-2" : "lg:order-1"} relative`}
            >
              <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden relative">
                <Slider
                  {...sliderSettings}
                  className="w-full h-full absolute inset-0 [&_.slick-track]:h-full [&_.slick-list]:h-full [&_.slick-slide>div]:h-full"
                >
                  {proj.images.map((img, i) => (
                    <div
                      key={i}
                      className="w-full h-full relative outline-none flex items-center justify-center"
                    >
                      <img
                        alt={`${proj.name} slide ${i + 1}`}
                        className="object-cover w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                        src={img}
                      />
                    </div>
                  ))}
                </Slider>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none z-10"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
