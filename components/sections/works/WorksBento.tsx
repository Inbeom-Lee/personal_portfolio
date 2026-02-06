"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useNavigation } from "@/hooks/useNavigation";
import { WorkCard } from "./WorkCard";
import { TiltCard } from "./TiltCard";
import type { Work } from "@/data/works";

interface WorksBentoProps {
  works: Work[];
}

export function WorksBento({ works }: WorksBentoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const { push } = useNavigation();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduceMotion) return;
    const cards = section.querySelectorAll("[data-works-card]");
    if (cards.length === 0) return;
    gsap.set(cards, { opacity: 0, y: 24 });
    const ctx = gsap.context(() => {
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);
    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="px-4 py-16 sm:px-6 md:px-8 md:py-24 lg:px-10"
      aria-label="Works"
    >
      <div className="w-full">
        <ul className="flex flex-col gap-6 md:gap-8" role="list">
          {works.map((work, i) => (
            <li key={work.id}>
              <button
                type="button"
                onClick={() => push(`/works/${work.slug}`)}
                className="group block w-full text-left"
                data-works-card
              >
                <TiltCard reducedMotion={reduceMotion}>
                  <WorkCard
                    work={work}
                    index={i}
                    variant="list"
                    className="w-full"
                  />
                </TiltCard>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
