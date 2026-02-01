"use client";

import { type ReactNode } from "react";

/**
 * Wrapper for client-only content (GSAP, Three.js, etc.).
 * Renders children only on the client to avoid hydration issues.
 */
export function ClientOnly({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
