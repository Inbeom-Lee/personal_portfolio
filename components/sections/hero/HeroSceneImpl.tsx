"use client";

import type { ReactNode } from "react";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Soft round particle texture (white center → transparent edge) */
function useRoundParticleTexture() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,0.9)");
    g.addColorStop(0.4, "rgba(255,255,255,0.4)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

const MINIMAL_PARTICLE_COUNT = 260;

function MinimalParticles({ color = "#ffffff" }: { color?: string }) {
  const ref = useRef<THREE.Points>(null);
  const map = useRoundParticleTexture();
  const positions = useMemo(() => {
    const arr = new Float32Array(MINIMAL_PARTICLE_COUNT * 3);
    for (let i = 0; i < MINIMAL_PARTICLE_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.08;
    ref.current.rotation.y = t * 0.05;
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.03;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        map={map}
        size={0.06}
        transparent
        opacity={0.55}
        color={color}
        sizeAttenuation
        depthWrite={false}
        blending={color === "#ffffff" ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

const FLOATING_COUNT = 24;
const FLOATING_AMPLITUDE = 1.2;
const FLOATING_SPEED = 0.15;

/** Few particles that drift on their own */
function FloatingParticles({ color = "#ffffff" }: { color?: string }) {
  const ref = useRef<THREE.Points>(null);
  const map = useRoundParticleTexture();
  const { positions, phases } = useMemo(() => {
    const pos = new Float32Array(FLOATING_COUNT * 3);
    const ph: number[] = [];
    for (let i = 0; i < FLOATING_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      ph.push(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);
    }
    return { positions: pos, phases: ph };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(positions), 3));
    return geo;
  }, [positions]);

  const basePositions = useRef(new Float32Array(positions));
  const phasesRef = useRef(phases);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const base = basePositions.current;
    const p = phasesRef.current;
    for (let i = 0; i < FLOATING_COUNT; i++) {
      const ix = i * 3;
      arr[ix] = base[ix] + Math.sin(t * FLOATING_SPEED + p[ix]) * FLOATING_AMPLITUDE;
      arr[ix + 1] = base[ix + 1] + Math.cos(t * FLOATING_SPEED * 0.7 + p[ix + 1]) * FLOATING_AMPLITUDE;
      arr[ix + 2] = base[ix + 2] + Math.sin(t * FLOATING_SPEED * 0.5 + p[ix + 2]) * (FLOATING_AMPLITUDE * 0.6);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        map={map}
        size={0.08}
        transparent
        opacity={0.6}
        color={color}
        sizeAttenuation
        depthWrite={false}
        blending={color === "#ffffff" ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

interface HeroSceneImplProps {
  mouseX: number;
  mouseY: number;
  particleColor?: string;
}

function TiltGroup({
  children,
  mouseX,
  mouseY,
}: {
  children: ReactNode;
  mouseX: number;
  mouseY: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!ref.current) return;
    const t = 0.06;
    target.current.x += ((mouseY - 0.5) * 0.15 - target.current.x) * t;
    target.current.y += ((mouseX - 0.5) * 0.15 - target.current.y) * t;
    ref.current.rotation.x = target.current.x;
    ref.current.rotation.y = target.current.y;
  });

  return <group ref={ref}>{children}</group>;
}

export function HeroSceneImpl({ mouseX, mouseY, particleColor = "#ffffff" }: HeroSceneImplProps) {
  return (
    <TiltGroup mouseX={mouseX} mouseY={mouseY}>
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 4]} intensity={0.3} />
      <MinimalParticles color={particleColor} />
      <FloatingParticles color={particleColor} />
    </TiltGroup>
  );
}
