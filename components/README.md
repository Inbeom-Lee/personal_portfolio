# Components

- **`layout/`** — Site-wide chrome: `Nav`, `Footer`, `SkipLink`, `ThemeProvider`. Use `@/components/layout`.
- **`sections/`** — Page/section content. Each subfolder is a section; import from its barrel, e.g. `@/components/sections/hero`, `@/components/sections/about`.
  - `hero/` — Landing hero + 3D scene
  - `about/` — About section + AboutTeaser
  - `works/` — Works grid + WorkCard, WorkDetail, WorksTeaser
  - `contact/` — Contact section + ContactTeaser
  - `tech/` — Tech stack
- **`ui/`** — Reusable primitives: `CustomCursor`, `ImageRipple`, `PageBackground`, `PageTransition`. Use `@/components/ui`.

Use barrel imports (e.g. `import { Hero } from "@/components/sections/hero"`) so paths stay stable if files inside a folder are renamed.
