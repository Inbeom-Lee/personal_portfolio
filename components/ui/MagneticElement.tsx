"use client";

import { useRef, useState, useEffect, ReactNode } from "react";

interface MagneticElementProps {
  children: ReactNode;
  strength?: number; // How much the element moves toward cursor (0-1)
  className?: string;
}

/**
 * MagneticElement - Wrapper that pulls children toward cursor on hover
 * Uses spring physics for responsive feel
 * Respects prefers-reduced-motion
 */
export function MagneticElement({
  children,
  strength = 0.3,
  className = "",
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    let animating = false;

    const animate = () => {
      const dx = targetRef.current.x - currentRef.current.x;
      const dy = targetRef.current.y - currentRef.current.y;

      // Spring physics with damping
      currentRef.current.x += dx * 0.15;
      currentRef.current.y += dy * 0.15;

      setPosition({ ...currentRef.current });

      // Continue animating if not at rest
      if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        animating = false;
      }
    };

    const startAnimation = () => {
      if (!animating) {
        animating = true;
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      targetRef.current = {
        x: deltaX * strength,
        y: deltaY * strength,
      };

      startAnimation();
    };

    const handleMouseLeave = () => {
      targetRef.current = { x: 0, y: 0 };
      startAnimation();
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [strength, reduceMotion]);

  return (
    <div ref={ref} className={className}>
      <span
        style={{
          display: "inline-block",
          transform: reduceMotion
            ? "none"
            : `translate3d(${position.x}px, ${position.y}px, 0)`,
          willChange: reduceMotion ? "auto" : "transform",
        }}
      >
        {children}
      </span>
    </div>
  );
}
