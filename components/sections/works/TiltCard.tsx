"use client";

import { useRef, type ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  reducedMotion?: boolean;
}

export function TiltCard({
  children,
  className = "",
  style,
  reducedMotion = false,
}: TiltCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const tiltRef = useRef({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !innerRef.current) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltRef.current = { x: -y * 8, y: x * 8 };
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const inner = innerRef.current;
        if (inner) {
          const { x: tx, y: ty } = tiltRef.current;
          inner.style.transform = `rotateX(${tx}deg) rotateY(${ty}deg)`;
        }
      });
    }
  };

  const handleLeave = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    tiltRef.current = { x: 0, y: 0 };
    if (innerRef.current) {
      innerRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div
        ref={innerRef}
        style={{
          transition: reducedMotion ? undefined : "transform 0.15s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
}
