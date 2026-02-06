# Three.js Features for This Project

Features you can use in this portfolio (React Three Fiber + Three.js + Drei).  
**Already in use** ✓ | **Available to add** —

---

## Core (R3F + Three.js)

| Feature | Description | Where it fits |
|--------|-------------|----------------|
| **Canvas** ✓ | R3F root; renders WebGL scene | Hero, PageBackground, any full-page or section background |
| **useFrame** ✓ | Per-frame update (animation, physics) | Particle rotation, mouse tilt, scroll-driven motion |
| **BufferGeometry + BufferAttribute** ✓ | Custom vertex data (positions, colors, etc.) | Particle systems, custom meshes, instancing |
| **Points / PointsMaterial** ✓ | Particle systems | Hero + page backgrounds (ambient particles) |
| **LineSegments / LineBasicMaterial** | Lines, wireframes, paths | Timeline spine, connections, grids |
| **Mesh + geometries** | Box, Sphere, Torus, Plane, etc. | Work preview shapes, icons, abstract objects |
| **Materials** | Basic, Standard, Phong, etc. | Lit objects, emissive accents, glass/transparency |
| **Lights** ✓ | Ambient, Point, Directional, Spot | All scenes (ambient + point in Hero/PageBackground) |
| **Camera** | Perspective, controls | Already set in Canvas; can animate position/rotation |
| **Group** ✓ | Transform hierarchy | Mouse tilt in Hero (TiltGroup) |

---

## React Three Fiber

| Feature | Description | Where it fits |
|--------|-------------|----------------|
| **useThree** | Access camera, scene, gl, size | Custom controls, post-processing, resize logic |
| **useFrame** ✓ | Animation loop | Any animated object or effect |
| **useLoader** | Load textures, models (GLTF) | Work thumbnails in 3D, logos, assets |
| **useTexture** | Load images as textures | Apply images to planes or meshes |
| **Attach** | Bind props to underlying Three objects | Fine-grained control of materials/geometry |
| **Events** | onPointerMove, onClick, etc. | Interactive 3D elements (e.g. work cards in 3D) |

---

## Drei (@react-three/drei)

| Feature | Description | Where it fits |
|--------|-------------|----------------|
| **Html** | DOM overlay at 3D position | Labels, cards, or UI anchored in 3D (e.g. work titles) |
| **OrbitControls** | Drag to rotate, scroll to zoom | Works carousel, “explore” scene |
| **ScrollControls** | Scroll-driven camera/object motion | Scroll-driven hero or section transitions |
| **Float** | Gentle floating animation | Floating badges, icons, or decorative objects |
| **MeshTransmissionMaterial** | Glass / refraction | Glass panels, lenses, “digital” look |
| **Environment** | HDR environment map | Realistic reflections on metal/glass |
| **Sky** | Sky dome / gradient sky | Background for outdoor or abstract scenes |
| **Stars** | Starfield | Alternative to particles for background |
| **Sparkles** | Scattered sparkle points | Accent on hero or section headers |
| **Line** | 3D line from points | Timeline, connections, paths |
| **Text** | 3D text (troika-three-text) | Headlines or labels in 3D |
| **Center** | Center children in bounding box | Layout helper for 3D content |
| **Bounds** | Fit camera to content | “Focus on this work” or section |
| **useScroll** | Scroll progress (with ScrollControls) | Parallax, reveal, opacity by scroll |
| **useCursor** | Pointer style from hover | Hover state on 3D interactives |
| **Stage** | Pre-set lighting + environment | Quick “product shot” style for works |

---

## Effects & Post-Processing

| Feature | Description | Where it fits |
|--------|-------------|----------------|
| **EffectComposer** (postprocessing) | Post-processing pipeline | Bloom, vignette, noise for “industrial” look |
| **Bloom** | Glow on bright areas | Accent glow, neon-style elements |
| **Vignette** | Darkened edges | Focus attention, cinematic feel |
| **Noise** | Film grain | Texture, “analog” or industrial feel |
| **DepthOfField** | Blur by depth | Focus on one work or section |

---

## Water ripple on image click

A **single ripple per click** effect is implemented in **`components/ui/ImageRipple.tsx`**:

- **How it works:** Each click produces **one** expanding ring from the click point (like a stone in water). The shader uses a Gaussian pulse: displacement is large only near the ring radius `speed * time`, then fades out over `duration`. Time resets to 0 on each new click so every click gets a fresh ripple.
- **Usage:** Use `<ImageRipple>` with `src` and `alt`; optional `amplitude`, `speed`, `width`, `duration`, and `className`. The container needs a defined size.
- **Tech:** Fragment shader with `uMouse`, `uTime`, `uAmplitude`, `uSpeed`, `uWidth`, `uDuration`; `exp(-(distFromRing)²/width²)` for a single ring; amplitude fades with `1 - time/duration`.

```tsx
import { ImageRipple } from "@/components/ui";

<ImageRipple src="/your-image.jpg" alt="Description" className="rounded-xl" amplitude={0.04} />
```

---

## Full-page ripple (removed)

A **global ripple** (click anywhere → ripple affects the whole screen) was tried using **html2canvas** to capture the viewport, then a full-screen WebGL shader to apply the ripple. It was removed because:

- **html2canvas** does not support modern CSS color functions (e.g. **oklab**, oklch). Tailwind v4 and many themes use these, so capture fails with “Attempting to parse an unsupported color function 'oklab'”.
- Relying on DOM→canvas capture for a whole-page effect is **fragile** (CORS, unsupported CSS, performance).

**Alternatives if you want a whole-page effect later:**

- **SVG `feDisplacementMap`** on a wrapper: displace the live DOM with an SVG filter and a displacement map (e.g. canvas or SVG) updated each frame from the click. No capture; works with current CSS, but can be heavy on large pages.
- **Limit ripple to specific sections** (e.g. hero or a “canvas” area) and keep using **ImageRipple** or a small full-width canvas there.

---

## Ideas Mapped to This Project

| Area | Three.js feature | Use |
|------|------------------|-----|
| **Hero** ✓ | Particles, mouse tilt | Already: particles + tilt; could add Sparkles, Float, or subtle Line path |
| **Page backgrounds** ✓ | Particles | Already: particles; could add Stars or Line grid |
| **About** | Line, ScrollControls | 3D timeline spine; scroll-driven highlight |
| **Works** | Html, OrbitControls, Mesh, Stage | 3D cards, preview shapes, or “showcase” view |
| **Contact** | Float, Sparkles | Subtle motion or emphasis on CTA |
| **Tech stack** | Mesh, Float | 3D icons or floating badges per skill |
| **Transitions** | useFrame + camera/position | Animate camera between sections or pages |

---

## Performance & Best Practices

- **InstancedMesh** — Many copies of one object (e.g. particles, repeated shapes) with one draw call.
- **LOD (Level of Detail)** — Simpler geometry when far from camera.
- **Dynamic imports** — Canvas and heavy scenes already lazy-loaded; keep 3D off initial route when possible.
- **dpr** — Canvas `dpr={[1, 2]}` limits pixel ratio on low-end devices.
- **prefers-reduced-motion** ✓ — Already respected in PageBackground; apply to any motion in 3D.

---

## Dependencies Already Available

- `three` — Core library  
- `@react-three/fiber` — React renderer for Three.js  
- `@react-three/drei` — Helpers (Html, OrbitControls, etc.)  

Optional for advanced use:

- `@react-three/postprocessing` — Bloom, vignette, etc.  
- `@react-three/drei` (includes **Text** via troika-three-text) — 3D text
