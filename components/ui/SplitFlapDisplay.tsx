"use client";

import { SplitFlapChar } from "./SplitFlapChar";

interface SplitFlapDisplayProps {
  text: string;
  className?: string;
  charClassName?: string;
  staggerDelay?: number; // ms between each character starting
  flipDuration?: number; // ms per character flip
}

/**
 * SplitFlapDisplay - Airport/train station style flip display
 * Text appears character by character with staggered flip animation
 */
export function SplitFlapDisplay({
  text,
  className = "",
  charClassName = "",
  staggerDelay = 80,
  flipDuration = 50,
}: SplitFlapDisplayProps) {
  const chars = text.split("");

  return (
    <span className={`inline-flex ${className}`} aria-label={text}>
      {chars.map((char, index) => (
        <SplitFlapChar
          key={`${index}-${char}`}
          targetChar={char}
          delay={index * staggerDelay}
          flipDuration={flipDuration}
          className={`font-mono ${charClassName}`}
        />
      ))}
    </span>
  );
}
