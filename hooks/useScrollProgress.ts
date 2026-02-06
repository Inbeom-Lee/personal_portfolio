"use client";

import { useEffect, useRef } from "react";

/**
 * Returns a ref to attach to the progress bar element.
 * Width is updated in requestAnimationFrame with lerp for smooth follow.
 */
export function useScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let rafId = 0;

    const tick = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const target = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

      progressRef.current += (target - progressRef.current) * 0.12;
      bar.style.width = `${progressRef.current * 100}%`;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return barRef;
}
