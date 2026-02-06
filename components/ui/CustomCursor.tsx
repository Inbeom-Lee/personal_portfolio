"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const SIZE_SMALL = 24;
const SIZE_BIG = 48;

function isClickable(element: Element | null): boolean {
  if (!element || element === document.body) return false;
  const tag = element.tagName.toLowerCase();
  if (tag === "a" || tag === "button") return true;
  const role = element.getAttribute("role");
  if (role === "button" || role === "link") return true;
  const cursor = window.getComputedStyle(element).cursor;
  if (cursor === "pointer") return true;
  return false;
}

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [big, setBig] = useState(false);
  const [visible, setVisible] = useState(false);
  const [useCustomCursor, setUseCustomCursor] = useState(false);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setUseCustomCursor(mq.matches);
    const handler = () => setUseCustomCursor(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (useCustomCursor && visible) {
      document.body.classList.add("custom-cursor-active");
    } else {
      document.body.classList.remove("custom-cursor-active");
    }
    return () => {
      document.body.classList.remove("custom-cursor-active");
    };
  }, [useCustomCursor, visible]);

  useEffect(() => {
    if (!useCustomCursor) return;
    const handleMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPosition(posRef.current);
        const el = document.elementFromPoint(posRef.current.x, posRef.current.y);
        setBig(isClickable(el));
        rafRef.current = 0;
      });
    };

    const handleEnter = () => setVisible(true);
    const handleLeave = () => setVisible(false);
    document.addEventListener("mousemove", handleMove, { passive: true });
    document.documentElement.addEventListener("mouseenter", handleEnter);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseenter", handleEnter);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [useCustomCursor]);

  if (!useCustomCursor || !visible) return null;

  const size = big ? SIZE_BIG : SIZE_SMALL;
  const half = size / 2;
  const circleBg = "rgb(255,255,255)";

  const cursorEl = (
    <div
      className="cursor-circle pointer-events-none fixed rounded-full"
      aria-hidden
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        marginLeft: -half,
        marginTop: -half,
        background: circleBg,
        mixBlendMode: "difference",
        zIndex: 2147483647,
        transition:
          "width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), margin-left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), margin-top 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    />
  );

  if (typeof document === "undefined") return null;
  return createPortal(cursorEl, document.body);
}
