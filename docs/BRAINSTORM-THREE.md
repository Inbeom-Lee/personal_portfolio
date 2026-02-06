# Three.js on Every Page — Brainstorm

## Goals
- Use Three.js on **every page** (not just Hero).
- Re-design the **Works** page; current layout feels generic.
- Show **About** and **Works** in a more distinctive, spatial way.

---

## About Page + Three.js

| Idea | Description | Pros / Cons |
|------|-------------|-------------|
| **Timeline as 3D path** | Timeline entries sit along a 3D curve (helix or winding path). Scroll or hover reveals each node; text in overlay. | Strong "journey" feel. More complex to implement. |
| **Floating nodes + connections** | Each role (Spencer Marine, Stitch-it, OC) is a 3D node; subtle lines connect them. Text beside or on hover. | Fits "system / network" vibe. Clear structure. |
| **Orbiting segments** | Three rings or arcs (one per timeline entry) that orbit slowly; center shows "What I do" summary. | Clean, systemic. Less literal. |
| **Depth layers** | Parallax 3D planes; content on each plane, different scroll speed. | Adds depth without a full "scene." |
| **One object + timeline** | One strong 3D object (gear, anchor, abstract) that reacts to scroll; timeline stays 2D beside it. | Simple, recognizable. |
| **Full-page subtle background** | Same family as Hero (particles, ring) but calmer; timeline stays 2D. | Consistent with Hero, low risk. |

**Chosen direction:** Full-page subtle 3D background (particles + ring) + optional 3D "spine" (line + spheres at each timeline stop) that highlights on scroll. Keeps content readable, adds atmosphere and a bit of structure.

---

## Works Page + Three.js

| Idea | Description | Pros / Cons |
|------|-------------|-------------|
| **3D carousel / orbit** | Each work is a card in 3D space on a circle; drag or arrow keys to rotate; selected work centers and scales. | Very portfolio-like, interactive. |
| **Floating cards in space** | Cards as 3D planes at different depths; parallax on mouse; click to bring forward. | Immersive. Needs good depth cues. |
| **Tunnel / corridor** | Works as "windows" along a tunnel; scroll or walk through. | Strong narrative. Heavy to build. |
| **Bento grid + 3D backdrop** | Keep grid layout; full-width 3D scene behind (particles, grid); cards tilt on hover. | Familiar layout, added depth. |
| **Orbiting project spheres** | Each project is a sphere; they orbit; hover shows title; click opens detail. | Minimal, memorable. Less literal. |
| **Scroll-driven 3D** | Camera moves through 3D space on scroll; work cards on billboards. | One continuous scroll. Complex. |

**Chosen direction:** 3D carousel — works as cards arranged in a circle (or arc). User drags to rotate (OrbitControls); click a card to open the existing slide-over. Full-page Canvas with a subtle shared background. Makes the Works page clearly different and puts Three.js at the center.

---

## Shared Patterns
- **Page background:** One reusable subtle scene (particles only; no rings) used on About, Works, Contact so every page has a light 3D layer.
- **Respect prefers-reduced-motion:** Reduce or disable 3D motion when the user prefers reduced motion.
- **Performance:** Lazy-load Canvas per page (dynamic import) so only the current page pays for R3F.
