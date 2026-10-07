"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || motion.matches || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      element.classList.toggle("is-visible", entry.isIntersecting);
    }, { threshold: 0.08, rootMargin: "0px 0px -32px 0px" });

    element.classList.add("reveal-ready");
    observer.observe(element);
    const onMotionChange = () => {
      if (motion.matches) {
        element.classList.add("is-visible");
        observer.disconnect();
      }
    };
    motion.addEventListener("change", onMotionChange);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", onMotionChange);
      element.classList.remove("reveal-ready");
    };
  }, []);

  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}
