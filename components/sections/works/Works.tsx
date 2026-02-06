"use client";

import { WORKS } from "@/data/works";
import { WorksBento } from "./WorksBento";

export function Works() {
  return (
    <section
      id="works"
      className="relative min-h-screen w-full"
      aria-label="Works"
    >
      <header className="relative z-10 px-4 py-10 sm:px-6 md:px-8 md:py-14 lg:px-10">
        <div className="w-full">
          <h2 className="font-mono text-xs font-light uppercase tracking-[0.28em] text-(--color-text-subtle)">
            Works
          </h2>
          <p className="mt-3 text-2xl font-light tracking-[0.06em] text-(--color-text) md:text-4xl">
            Selected work — system architecture, creative dev, brand & web.
          </p>
        </div>
      </header>

      <WorksBento works={WORKS} />
    </section>
  );
}
