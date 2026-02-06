"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { PageBackgroundScene } from "./PageBackgroundScene";

const Canvas = dynamic(
  () => import("@react-three/fiber").then((m) => m.Canvas),
  { ssr: false }
);

export function PageBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <Suspense
        fallback={
          <div className="h-full w-full bg-(--color-bg)" />
        }
      >
        <Canvas
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 10], fov: 50 }}
          dpr={[1, 1.5]}
        >
          <PageBackgroundScene reducedMotion={reducedMotion} />
        </Canvas>
      </Suspense>
    </div>
  );
}
