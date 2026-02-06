export interface Work {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  focus: string;
  link?: string;
  /** Single hero image (used when images array not set). */
  image?: string;
  /** Up to 4 images per work: [0]=hero, [1..3]=gallery. */
  images?: [string, string, string, string];
  longDescription?: string;
  /** Detail page: role, timeline, tech stack. */
  role?: string;
  timeline?: string;
  tech?: string[];
  /** Detail page: long-form sections. */
  overview?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  /** Optional bullet highlights for results. */
  highlights?: string[];
}

export const WORKS: Work[] = [
  {
    id: "stitch-it",
    slug: "stitch-it",
    title: "Stitch-it",
    shortDescription: "Industrial ERP/CRM ecosystems for production and operations.",
    focus: "System architecture, production line logic.",
    link: "#",
    images: [
      "/images/works/stitch-it-1.webp",
      "/images/works/stitch-it-2.webp",
      "/images/works/stitch-it-3.webp",
      "/images/works/stitch-it-4.webp",
    ],
    longDescription:
      "Full-stack ERP/CRM for production and operations. Production line logic, inventory, and order management.",
    role: "Lead system designer & full-stack developer",
    timeline: "2022 — 2024",
    tech: ["React", "Node.js", "MongoDB", "Redis", "AWS"],
    overview:
      "Stitch-it is an industrial ERP/CRM platform that unifies production planning, inventory, orders, and customer data for manufacturing teams. I led the system design and implementation from discovery through launch, working with operations and product to align technical architecture with real shop-floor workflows.",
    challenge:
      "The client had multiple disconnected tools (spreadsheets, legacy DBs, and manual handoffs) leading to delays, double-entry, and visibility gaps. They needed a single source of truth that could scale across several production lines and support real-time capacity and order status without replacing existing machinery or processes overnight.",
    solution:
      "We designed a modular system with a shared core (orders, inventory, capacity) and pluggable adapters for legacy systems and new integrations. I owned the data model, API design, and the main React dashboard used daily by planners and floor leads. We introduced event-driven updates so status changes propagate in real time and built a lightweight mobile view for on-floor checks.",
    results:
      "The platform went live for two pilot lines; planners reduced time spent on status checks and re-planning by roughly 40%, and order-to-ship visibility improved from batch end-of-day to near real time. The architecture is now the base for rolling out to additional lines and future modules.",
    highlights: [
      "Reduced planning and status-check time by ~40% in pilot lines",
      "Unified 3+ legacy data sources into one real-time dashboard",
      "Event-driven architecture supporting future lines and modules",
    ],
  },
  {
    id: "concrete-cake",
    slug: "concrete-cake",
    title: "Concrete Cake",
    shortDescription: "Creative dev and 3D experiences in the browser.",
    focus: "Creative dev, 3D (Blender + Three.js).",
    link: "#",
    images: [
      "/images/works/concrete-cake-1.webp",
      "/images/works/concrete-cake-2.webp",
      "/images/works/concrete-cake-3.webp",
      "/images/works/concrete-cake-4.webp",
    ],
    longDescription:
      "Creative development and 3D in the browser. Blender + Three.js for spatial and interactive experiences.",
    role: "Creative developer & 3D lead",
    timeline: "2023 — 2024",
    tech: ["Three.js", "React Three Fiber", "Blender", "GSAP", "TypeScript"],
    overview:
      "Concrete Cake is a series of browser-based 3D and interactive experiences for brand campaigns and product launches. I was responsible for concept-through-ship: modeling and optimization in Blender, implementation in Three.js/React Three Fiber, and integration with existing design systems and analytics.",
    challenge:
      "Clients wanted high-fidelity 3D and motion without sacrificing load times or accessibility. We had to support both desktop and mobile, respect reduced-motion preferences, and keep bundle size and GPU usage within strict budgets while still delivering a distinctive visual language.",
    solution:
      "I established a pipeline from Blender (modeling, UVs, LODs) to glTF/DRACO for the web, with custom shaders and instancing where needed. We used React Three Fiber for composition and GSAP for timeline-based animations, with feature detection and fallbacks for older devices. Performance budgets and lazy loading kept initial load under targets.",
    results:
      "Shipped multiple campaign experiences with strong engagement metrics; one product configurator became the primary touchpoint for a product launch. The pipeline is now reused for follow-up projects with faster turnaround.",
    highlights: [
      "Shipped 3D configurator as primary launch touchpoint for product campaign",
      "Met performance budgets on mobile and desktop with LOD + DRACO",
      "Reusable Blender → Three.js pipeline adopted for later projects",
    ],
  },
  {
    id: "methodical-fidelity",
    slug: "methodical-fidelity",
    title: "Methodical Fidelity",
    shortDescription: "Brand identity and high-end web development.",
    focus: "Brand identity, high-end web dev.",
    link: "#",
    images: [
      "/images/works/methodical-fidelity-1.webp",
      "/images/works/methodical-fidelity-2.webp",
      "/images/works/methodical-fidelity-3.webp",
      "/images/works/methodical-fidelity-4.webp",
    ],
    longDescription:
      "Brand identity and high-end web development. Design systems and pixel-perfect interfaces.",
    role: "Lead front-end & design system",
    timeline: "2022 — 2023",
    tech: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Figma"],
    overview:
      "Methodical Fidelity is a design and development studio project where I led front-end and design system work for a rebrand and new marketing site. I translated the new identity into a scalable component library, ensured design-dev parity, and built the public site and several internal tools with a focus on accessibility and maintainability.",
    challenge:
      "The rebrand included a new visual language, typography, and motion guidelines that had to be implemented consistently across the marketing site, blog, and client-facing tools. The team was small, so the system had to be documented and easy for other devs to use without constant hand-holding.",
    solution:
      "I built a design system in Figma and mirrored it in code with a React component library and Tailwind-based tokens. Components and variants were documented in code and aligned with Figma for design–dev parity. The marketing site was built on this system with SSR and static generation for speed and SEO.",
    results:
      "The new site launched on schedule and became the reference for all subsequent client work. The design system reduced back-and-forth between design and dev and cut the time to build new pages. We later open-sourced parts of the component set for community use.",
    highlights: [
      "Delivered rebrand site and design system on schedule as single front-end lead",
      "Reduced design–dev iteration time with shared component library and Figma alignment",
      "Open-sourced core components for community use",
    ],
  },
];

export function getWorkBySlug(slug: string): Work | undefined {
  return WORKS.find((w) => w.slug === slug);
}

export function getWorkSlugs(): string[] {
  return WORKS.map((w) => w.slug);
}
