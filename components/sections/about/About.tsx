"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ImageRipple } from "@/components/ui";

export interface TimelineEntry {
  period: string;
  role: string;
  focus: string;
}

const TIMELINE: TimelineEntry[] = [
  {
    period: "2018–2021",
    role: "Spencer Marine (Boat Builder)",
    focus: "Systemic production control.",
  },
  {
    period: "2021–2023",
    role: "Stitch-it (Full-stack Developer)",
    focus: "Industrial ERP/CRM ecosystems.",
  },
  {
    period: "2023–Present",
    role: "Organized Complexity (Founder & Developer)",
    focus: "System design and creative development.",
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    if (!section || !list) return;

    const items = list.querySelectorAll("[data-timeline-item]");
    if (items.length === 0) return;

    if (reduceMotion) {
      gsap.set(items, { opacity: 1, x: 0 });
      return () => {};
    }

    gsap.set(items, { opacity: 0, x: -16 });
    const ctx = gsap.context(() => {
      gsap.to(items, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="scroll-mt-20 px-4 py-16 sm:px-6 md:px-8 md:py-24 lg:px-10"
      aria-label="About"
    >
      <div className="w-full">
        <div className="flex flex-col gap-12 md:flex-row md:gap-16 lg:gap-20">
          {/* Side anchor: photo on desktop */}
          <div className="shrink-0 md:w-72 lg:w-80">
            <div className="md:sticky md:top-24">
              <div className="overflow-hidden rounded-lg border border-white/5">
                <ImageRipple
                  src="/images/inbeom.webp"
                  alt="Inbeom Lee"
                  className="w-full"
                  amplitude={0.04}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <h2 className="font-mono text-xs font-light tracking-[0.28em] text-(--color-text-subtle) uppercase">
              About
            </h2>
            <p className="mt-4 font-mono text-xs font-light tracking-[0.2em] text-(--color-text-subtle)">
              Physical → Digital → Strategic
            </p>
            <p className="mt-6 text-xl font-light tracking-[0.05em] text-(--color-text) md:text-2xl">
              Structure and scale run through everything I do.
            </p>
            <p className="mt-6 text-base leading-relaxed font-light tracking-[0.04em] text-(--color-text)">
              I bridge the gap between physical engineering and digital systems — from yacht
              building and systemic production control to full-stack development and industrial
              ERP/CRM ecosystems. Business-minded problem solving and a focus on structure and scale
              run through everything I do.
            </p>
            <div className="mt-10 rounded-lg border border-white/5 bg-(--color-surface)/40 p-6 md:p-8">
              <h3 className="font-mono text-xs font-light tracking-[0.28em] text-(--color-text-subtle) uppercase">
                What I do
              </h3>
              <p className="mt-4 leading-relaxed font-light tracking-[0.04em] text-(--color-text)">
                I design and build systems — ERP/CRM ecosystems, production control, and high-end
                web experiences. I work in structured, iterative ways: clear requirements, modular
                architecture, and collaboration with stakeholders.
              </p>
            </div>
            <ul ref={listRef} className="relative mt-14 space-y-0 pl-0" role="list">
              <span
                className="absolute top-2 bottom-2 left-[11.5px] w-px bg-(--color-accent)/20"
                aria-hidden
              />
              {TIMELINE.map((entry) => (
                <li
                  key={entry.period}
                  data-timeline-item
                  className="relative flex gap-6 pb-12 pl-8 last:pb-0 md:pl-10"
                >
                  <span
                    className="absolute top-0 left-0 flex h-6 w-6 items-center justify-center rounded-full border border-(--color-accent)/40 bg-(--color-bg)"
                    aria-hidden
                  />
                  <span
                    className="w-28 shrink-0 font-mono text-xs leading-6 font-light tracking-[0.12em] text-(--color-text-subtle)"
                    aria-hidden
                  >
                    {entry.period}
                  </span>
                  <div>
                    <p className="font-light tracking-[0.04em] text-(--color-text)">{entry.role}</p>
                    <p className="mt-1 text-sm font-light tracking-[0.03em] text-(--color-text-subtle) italic">
                      {entry.focus}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
