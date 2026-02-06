"use client";

import { useNavigation } from "@/hooks/useNavigation";
import { WORKS } from "@/data/works";
import type { Work } from "@/data/works";

const FEATURED_COUNT = 3;

function FeaturedWorkCard({
  work,
  index,
}: {
  work: Work;
  index: number;
}) {
  const { push } = useNavigation();
  return (
    <button
      type="button"
      onClick={() => push("/works")}
      className="group relative flex w-full flex-col overflow-hidden rounded-lg border border-white/5 bg-(--color-surface)/60 p-5 text-left transition-all duration-300 ease-out hover:border-white/15 hover:bg-(--color-surface)/80"
    >
      <span className="font-mono text-xs font-light tracking-[0.2em] text-(--color-text-subtle)">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-2 text-lg font-light tracking-[0.04em] text-(--color-text) transition-colors group-hover:text-(--color-accent)">
        {work.title}
      </h3>
      <p className="mt-1 text-sm font-light tracking-[0.03em] text-(--color-text-subtle)">
        {work.shortDescription}
      </p>
    </button>
  );
}

export function WorksTeaser() {
  const { push } = useNavigation();
  const featured = WORKS.slice(0, FEATURED_COUNT);

  return (
    <section
      className="px-4 py-20 sm:px-6 md:px-8 md:py-28 lg:px-10 lg:py-32"
      aria-label="Works teaser"
    >
      <div className="w-full">
        <button
          type="button"
          onClick={() => push("/works")}
          className="font-mono text-xs font-light uppercase tracking-[0.28em] text-(--color-text-subtle) transition-colors hover:text-(--color-accent)"
        >
          Works
        </button>
        <p className="mt-2 text-2xl font-light tracking-[0.06em] text-(--color-text) md:text-3xl">
          Selected work — system architecture, creative dev, brand & web.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {featured.map((work, i) => (
            <FeaturedWorkCard key={work.id} work={work} index={i} />
          ))}
        </div>
        <button
          type="button"
          onClick={() => push("/works")}
          className="mt-10 inline-flex items-center gap-2 font-mono text-sm font-light tracking-[0.2em] text-(--color-accent) underline-offset-4 transition-all duration-200 hover:tracking-[0.28em] hover:underline"
        >
          View all works
          <span className="inline-block w-4 border-b border-current" aria-hidden />
        </button>
      </div>
    </section>
  );
}
