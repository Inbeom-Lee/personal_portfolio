"use client";

import { TECH_STACK, TECH_CATEGORY_LABELS, type TechCategory } from "@/data/techStack";

const CATEGORY_ORDER: TechCategory[] = [
  "frontendCore",
  "frontendVisual",
  "backend",
  "database",
  "cloud",
  "applications",
  "craft",
];

export function TechStack() {
  return (
    <section
      id="tech"
      className="scroll-mt-20 px-4 py-16 sm:px-6 md:px-8 md:py-24 lg:px-10"
      aria-label="Tech Stack"
    >
      <div className="w-full">
        <h2 className="font-mono text-xs font-light uppercase tracking-[0.28em] text-(--color-text-subtle)">
          Tech Stack
        </h2>
        <p className="mt-3 text-2xl font-light tracking-[0.06em] text-(--color-text) md:text-3xl">
          Frontend · Backend · Database · Cloud · Applications · Craft
        </p>
        {/* Layers: one row per category, tools as flowing sentence */}
        <div className="mt-12 flex flex-col gap-10 md:gap-12">
          {CATEGORY_ORDER.map((cat) => {
            const items = TECH_STACK.filter((item) => item.category === cat);
            const label = TECH_CATEGORY_LABELS[cat];
            return (
              <div
                key={cat}
                className="flex flex-col gap-3 pb-10 last:pb-0 md:flex-row md:items-baseline md:gap-8 md:pb-12"
              >
                <h3 className="shrink-0 font-mono text-sm font-light tracking-[0.2em] text-(--color-text-subtle) md:w-36">
                  {label}
                </h3>
                <p className="font-light leading-relaxed tracking-[0.04em] text-(--color-text)">
                  {items.map((item) => item.name).join(" · ")}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
