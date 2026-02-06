"use client";

import { useEffect, useState } from "react";
import { registerScrollReveals } from "@/lib/gsap";

export function useScrollReveal(containerRef: React.RefObject<HTMLElement | null>) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    return registerScrollReveals(el, reduceMotion);
  }, [containerRef, reduceMotion]);
}
