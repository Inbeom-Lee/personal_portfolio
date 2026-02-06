"use client";

import { Canvas } from "@react-three/fiber";
import { HeroSceneImpl } from "./HeroSceneImpl";

interface HeroSceneProps {
  mouseX: number;
  mouseY: number;
  particleColor?: string;
}

export function HeroScene({ mouseX, mouseY, particleColor = "#ffffff" }: HeroSceneProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
      >
        <HeroSceneImpl mouseX={mouseX} mouseY={mouseY} particleColor={particleColor} />
      </Canvas>
    </div>
  );
}
