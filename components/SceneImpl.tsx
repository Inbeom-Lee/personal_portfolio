"use client";

import { type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";

interface SceneImplProps {
  children: ReactNode;
  className?: string;
}

/**
 * Client-only Three.js canvas. Use <Scene> in pages to get lazy loading + no SSR.
 */
export function SceneImpl({ children, className }: SceneImplProps) {
  return (
    <div className={className}>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
      >
        {children}
      </Canvas>
    </div>
  );
}
