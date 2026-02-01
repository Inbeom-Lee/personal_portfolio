# Personal Portfolio

Next.js 15 (App Router) + TypeScript + Tailwind CSS. Set up for high-quality animation and visuals (GSAP, Three.js / React Three Fiber).

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **ESLint + Prettier**
- **GSAP** – timeline and DOM animation
- **Three.js** + **@react-three/fiber** + **@react-three/drei** – 3D and WebGL

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start dev server         |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |
| `npm run format`| Format with Prettier     |

## Project structure

- `app/` – App Router pages and layout
- `components/` – React components  
  - `ClientOnly` – wrapper for client-only content (e.g. GSAP)
  - `Scene` / `SceneImpl` – lazy-loaded Three.js canvas (use `<Scene>` in pages)
- `hooks/` – e.g. `useIsClient` for GSAP/Three after hydration
- `lib/` – utilities and font config
- `public/fonts/` – put your `.woff2` / `.woff` / `.ttf` here

## Fonts

1. Add font files under `public/fonts/`.
2. In `lib/fonts.ts`, define them with `next/font/local` (see comments there).
3. Use the exported variables in `app/layout.tsx` (`fontSans.variable`, `fontSans.className`).

## Animation and 3D

- **GSAP**: Use in `"use client"` components. For layout/scroll effects, run after mount (e.g. with `useIsClient()` or `useEffect`).
- **Three.js**: Use the `<Scene>` component so the canvas is lazy-loaded and not rendered on the server. Put R3F content as children of `<Scene>`.

## License

Private.
