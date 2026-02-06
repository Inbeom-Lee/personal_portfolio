"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import { useTheme } from "@/components/layout/ThemeProvider";

const HeroScene = dynamic(() => import("./HeroScene").then((m) => ({ default: m.HeroScene })), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-(--color-bg)" aria-hidden />,
});

export function Hero() {
  const { theme } = useTheme();
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [reduceMotion, setReduceMotion] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const name = nameRef.current;
    const title = titleRef.current;
    const tagline = taglineRef.current;
    if (!name || !title || !tagline) return;

    if (reduceMotion) {
      gsap.set([name, title, tagline], { opacity: 1, y: 0 });
      return;
    }

    gsap.set([name, title, tagline], { opacity: 0, y: 24 });
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.to(name, { opacity: 1, y: 0, duration: 0.6 })
      .to(title, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .to(tagline, { opacity: 1, y: 0, duration: 0.5 }, "-=0.25");
    return () => {
      tl.kill();
    };
  }, [reduceMotion]);

  const rafScheduled = useRef(false);
  const onPointerMove = (e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
    if (rafScheduled.current) return;
    rafScheduled.current = true;
    requestAnimationFrame(() => {
      setMouse({ ...mouseRef.current });
      rafScheduled.current = false;
    });
  };

  const onPointerLeave = () => {
    mouseRef.current = { x: 0.5, y: 0.5 };
    setMouse({ x: 0.5, y: 0.5 });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 py-24 sm:px-6 sm:py-28 md:px-8 md:py-32 lg:px-10"
      aria-label="Hero"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <HeroScene
        mouseX={mouse.x}
        mouseY={mouse.y}
        particleColor={theme === "light" ? "#121216" : "#ffffff"}
      />
      <div
        className="pointer-events-none absolute inset-0 z-1 bg-linear-to-b from-(--color-bg)/60 via-transparent to-(--color-bg)/80"
        aria-hidden
      />
      <div className="relative z-10 w-full max-w-full text-center">
        <h1
          ref={nameRef}
          title="System Designer & Creative Developer — open to roles and projects."
          className="font-display text-4xl font-extralight tracking-[0.35em] text-(--color-text) sm:text-5xl md:text-6xl"
        >
          Inbeom Lee
        </h1>
        <p
          ref={titleRef}
          className="mt-16 font-mono text-xs font-light tracking-[0.35em] text-(--color-text-subtle) uppercase sm:text-sm"
        >
          System Designer & Creative Developer
        </p>
        <p
          ref={taglineRef}
          className="mt-4 text-sm font-light tracking-[0.12em] text-(--color-text-subtle) sm:text-base"
        >
          Physical to digital — systemic production control, business-minded problem solving.
        </p>
      </div>
    </section>
  );
}
