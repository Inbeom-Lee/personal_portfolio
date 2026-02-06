"use client";

import { useRef, useState, useCallback, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const R3FCanvas = dynamic(
  () => import("@react-three/fiber").then((m) => m.Canvas),
  { ssr: false }
);

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uMap;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uAmplitude;
  uniform float uSpeed;
  uniform float uWidth;
  uniform float uDuration;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec2 toMouse = vUv - uMouse;
    float d = length(toMouse);
    // Single expanding ring: ring radius = uSpeed * uTime
    float ringRadius = uSpeed * uTime;
    float distFromRing = abs(d - ringRadius);
    // Gaussian pulse so only the ring displaces; fade out over duration
    float pulse = uAmplitude * exp(-distFromRing * distFromRing / (uWidth * uWidth));
    pulse *= max(0.0, 1.0 - uTime / uDuration);
    vec2 dir = d > 0.001 ? normalize(toMouse) : vec2(0.0);
    uv += dir * pulse;
    gl_FragColor = texture2D(uMap, uv);
  }
`;

interface RipplePlaneProps {
  src: string;
  mouse: [number, number];
  active: boolean;
  amplitude?: number;
  speed?: number;
  width?: number;
  duration?: number;
}

function RipplePlane({
  src,
  mouse,
  active,
  amplitude = 0.04,
  speed = 1.4,
  width = 0.06,
  duration = 1.2,
}: RipplePlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, src);
  const timeRef = useRef(0);
  const prevActiveRef = useRef(false);

  const uniforms = useRef({
    uMap: { value: texture as THREE.Texture },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uTime: { value: 0 },
    uAmplitude: { value: 0 },
    uSpeed: { value: speed },
    uWidth: { value: width },
    uDuration: { value: duration },
  }).current;
  uniforms.uMap.value = texture;

  useFrame((_, delta) => {
    // Reset time when a new click starts (active just became true)
    if (active && !prevActiveRef.current) timeRef.current = 0;
    prevActiveRef.current = active;

    if (active) timeRef.current += delta;
    uniforms.uMouse.value.set(mouse[0], mouse[1]);
    uniforms.uTime.value = timeRef.current;
    uniforms.uAmplitude.value = active ? amplitude : 0;
  });

  return (
    <mesh ref={meshRef} scale={[1, 1, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

function RippleScene({
  src,
  mouse,
  active,
  amplitude,
  speed,
  width,
  duration,
}: {
  src: string;
  mouse: [number, number];
  active: boolean;
  amplitude?: number;
  speed?: number;
  width?: number;
  duration?: number;
}) {
  return (
    <>
      <RipplePlane
        src={src}
        mouse={mouse}
        active={active}
        amplitude={amplitude}
        speed={speed}
        width={width}
        duration={duration}
      />
    </>
  );
}

interface ImageRippleProps {
  src: string;
  alt: string;
  className?: string;
  amplitude?: number;
  speed?: number;
  width?: number;
  duration?: number;
}

const RIPPLE_DURATION_MS = 1400;

export function ImageRipple({
  src,
  alt,
  className = "",
  amplitude = 0.04,
  speed = 1.4,
  width = 0.06,
  duration = 1.2,
}: ImageRippleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState<[number, number]>([0.5, 0.5]);
  const [active, setActive] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Size canvas to match image aspect ratio so picture and canvas are the same
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setAspectRatio(img.naturalWidth / img.naturalHeight);
    };
    img.src = src;
  }, [src]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1 - (e.clientY - rect.top) / rect.height;
    setMouse([x, y]);
    setActive(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActive(false);
      timeoutRef.current = null;
    }, RIPPLE_DURATION_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      className={`relative cursor-pointer overflow-hidden ${className}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const el = containerRef.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            setMouse([0.5, 0.5]);
            setActive(true);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              setActive(false);
              timeoutRef.current = null;
            }, RIPPLE_DURATION_MS);
          }
        }
      }}
      style={{
        aspectRatio: aspectRatio != null ? String(aspectRatio) : "1",
        width: "100%",
      }}
      aria-label={alt}
    >
      {/* Fallback image for SSR / no-JS / alt */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover opacity-0 pointer-events-none"
        aria-hidden
      />
      <Suspense
        fallback={
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
          />
        }
      >
        <R3FCanvas
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 1], fov: 90 }}
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <RippleScene
            src={src}
            mouse={mouse}
            active={active}
            amplitude={amplitude}
            speed={speed}
            width={width}
            duration={duration}
          />
        </R3FCanvas>
      </Suspense>
    </div>
  );
}
