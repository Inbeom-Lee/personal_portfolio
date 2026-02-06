export type TechCategory =
  | "frontendCore"
  | "backend"
  | "database"
  | "cloud"
  | "frontendVisual"
  | "applications"
  | "craft";

export interface TechItem {
  id: string;
  name: string;
  category: TechCategory;
}

export const TECH_CATEGORY_LABELS: Record<TechCategory, string> = {
  frontendCore: "Frontend (core)",
  backend: "Backend",
  database: "Database",
  cloud: "Cloud",
  frontendVisual: "Frontend (visual)",
  applications: "Applications",
  craft: "Craft",
};

export const TECH_STACK: TechItem[] = [
  // Frontend (core): foundation stack
  { id: "html", name: "HTML", category: "frontendCore" },
  { id: "css", name: "CSS", category: "frontendCore" },
  { id: "javascript", name: "JavaScript", category: "frontendCore" },
  { id: "typescript", name: "TypeScript", category: "frontendCore" },
  { id: "nextjs", name: "Next.js", category: "frontendCore" },
  // Backend: server, version control
  { id: "nodejs", name: "Node.js", category: "backend" },
  { id: "express", name: "Express", category: "backend" },
  { id: "git", name: "Git", category: "backend" },
  // Database
  { id: "postgresql", name: "PostgreSQL", category: "database" },
  { id: "mongodb", name: "MongoDB", category: "database" },
  { id: "firestore", name: "Firestore", category: "database" },
  // Cloud: hosting & services
  { id: "vercel", name: "Vercel", category: "cloud" },
  { id: "aws", name: "AWS", category: "cloud" },
  { id: "gcp", name: "GCP", category: "cloud" },
  { id: "firebase", name: "Firebase", category: "cloud" },
  { id: "supabase", name: "Supabase", category: "cloud" },
  // Frontend (visual): 3D, animation, styling
  { id: "threejs", name: "Three.js", category: "frontendVisual" },
  { id: "webgl", name: "WebGL", category: "frontendVisual" },
  { id: "gsap", name: "GSAP", category: "frontendVisual" },
  { id: "framer-motion", name: "Framer Motion", category: "frontendVisual" },
  { id: "tailwind", name: "Tailwind", category: "frontendVisual" },
  // Applications: native / cross-platform
  { id: "react-native", name: "React Native", category: "applications" },
  { id: "expo", name: "Expo", category: "applications" },
  // Craft: design & 3D tools
  { id: "figma", name: "Figma", category: "craft" },
  { id: "blender", name: "Blender", category: "craft" },
];
