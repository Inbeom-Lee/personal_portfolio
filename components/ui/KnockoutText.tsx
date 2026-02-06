"use client";

import { useEffect, useState, ReactNode } from "react";

interface KnockoutTextProps {
  children: ReactNode;
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "div";
  gradientColors?: string[];
  animationDuration?: number; // seconds
}

/**
 * KnockoutText - Text with animated gradient revealed through background-clip: text
 * Creates a striking visual effect where the text acts as a mask for a moving gradient
 * Respects prefers-reduced-motion
 */
export function KnockoutText({
  children,
  className = "",
  as = "span",
  gradientColors = [
    "var(--color-accent)",
    "#ff6b6b",
    "#4ecdc4",
    "#45b7d1",
    "var(--color-accent)",
  ],
  animationDuration = 8,
}: KnockoutTextProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const Tag = as;
  const gradientString = gradientColors.join(", ");

  return (
    <Tag
      className={`knockout-text ${className}`}
      style={{
        background: reduceMotion
          ? `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`
          : `linear-gradient(135deg, ${gradientString})`,
        backgroundSize: reduceMotion ? "100% 100%" : "300% 300%",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        animation: reduceMotion
          ? "none"
          : `knockout-gradient ${animationDuration}s ease infinite`,
      }}
    >
      {children}
    </Tag>
  );
}
