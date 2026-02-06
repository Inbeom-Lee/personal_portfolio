"use client";

import { useEffect, useState, useRef } from "react";

const CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,!?-";

interface SplitFlapCharProps {
  targetChar: string;
  delay?: number; // stagger delay in ms
  flipDuration?: number; // duration of single flip in ms
  className?: string;
}

/**
 * SplitFlapChar - Single character split-flap display
 * Cycles through characters until reaching the target (like airport boards)
 * Respects prefers-reduced-motion
 */
export function SplitFlapChar({
  targetChar,
  delay = 0,
  flipDuration = 60,
  className = "",
}: SplitFlapCharProps) {
  const [currentChar, setCurrentChar] = useState(" ");
  const [isFlipping, setIsFlipping] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const target = targetChar.toUpperCase();

    if (reduceMotion) {
      setCurrentChar(target);
      return;
    }

    // Clear any existing animation
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Start after delay
    timeoutRef.current = setTimeout(() => {
      let charIndex = 0;
      const targetIndex = CHARS.indexOf(target);

      if (targetIndex === -1) {
        setCurrentChar(target);
        return;
      }

      setIsFlipping(true);

      intervalRef.current = setInterval(() => {
        if (charIndex >= targetIndex) {
          setCurrentChar(target);
          setIsFlipping(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
          return;
        }

        setCurrentChar(CHARS[charIndex]);
        charIndex++;
      }, flipDuration);
    }, delay);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [targetChar, delay, flipDuration, reduceMotion]);

  return (
    <span
      className={`inline-block px-px ${isFlipping ? "split-flap-flip" : ""} ${className}`}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {currentChar === " " ? "\u00A0" : currentChar}
    </span>
  );
}
