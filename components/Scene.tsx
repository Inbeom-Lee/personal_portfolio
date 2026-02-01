"use client";

import { type ReactNode } from "react";
import dynamic from "next/dynamic";

/**
 * Lazy-loaded Three.js canvas wrapper.
 * Use this to wrap @react-three/fiber <Canvas> so it only loads on the client
 * and doesn’t block the main bundle.
 *
 * Example:
 *   <Scene>
 *     <ambientLight />
 *     <mesh>...</mesh>
 *   </Scene>
 */
export const Scene = dynamic<{ children: ReactNode; className?: string }>(
  () => import("./SceneImpl").then((mod) => mod.SceneImpl),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[50vh] items-center justify-center bg-neutral-100">
        <span className="text-neutral-500">Loading scene…</span>
      </div>
    ),
  }
);
