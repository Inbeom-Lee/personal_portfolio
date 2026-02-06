import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Set up scroll-triggered reveal animations for elements with data-scroll-reveal.
 * Each element reveals when it enters the viewport. Pass reduceMotion to respect prefers-reduced-motion.
 */
export function registerScrollReveals(
  container: HTMLElement | null,
  reduceMotion: boolean
): () => void {
  if (!container) return () => {};

  const els = container.querySelectorAll("[data-scroll-reveal]");

  if (reduceMotion) {
    els.forEach((el) => {
      (el as HTMLElement).style.opacity = "1";
      (el as HTMLElement).style.transform = "none";
    });
    return () => {};
  }

  const ctx = gsap.context(() => {
    els.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 28, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, container);

  return () => ctx.revert();
}

export { gsap, ScrollTrigger };
