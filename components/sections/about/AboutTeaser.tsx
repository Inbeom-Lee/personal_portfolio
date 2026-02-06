"use client";

import { useNavigation } from "@/hooks/useNavigation";

export function AboutTeaser() {
  const { push } = useNavigation();
  return (
    <section
      className="px-4 py-20 sm:px-6 md:px-8 md:py-28 lg:px-10 lg:py-32"
      aria-label="About teaser"
    >
      <div className="w-full">
        <button
          type="button"
          onClick={() => push("/about")}
          className="font-mono text-xs font-light uppercase tracking-[0.28em] text-(--color-text-subtle) transition-colors hover:text-(--color-accent)"
        >
          About
        </button>
        <p className="mt-6 text-lg font-light leading-relaxed tracking-[0.04em] text-(--color-text)">
          I bridge the gap between physical engineering and digital systems —
          from yacht building and systemic production control to full-stack
          development and industrial ERP/CRM ecosystems. Business-minded
          problem solving and a focus on structure and scale run through
          everything I do.
        </p>
        <p className="mt-6 font-mono text-sm font-light tracking-[0.12em] text-(--color-text-subtle)">
          2018–2021 Boat Builder → 2021–2023 Full-stack Developer → 2023–Present
          Founder & Developer
        </p>
        <button
          type="button"
          onClick={() => push("/about")}
          className="mt-8 inline-flex items-center gap-2 font-mono text-sm font-light tracking-[0.2em] text-(--color-accent) underline-offset-4 transition-all duration-200 hover:tracking-[0.28em] hover:underline"
        >
          About & skills
          <span className="inline-block w-4 border-b border-current" aria-hidden />
        </button>
      </div>
    </section>
  );
}
