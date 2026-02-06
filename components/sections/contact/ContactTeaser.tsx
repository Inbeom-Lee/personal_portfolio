"use client";

import { useNavigation } from "@/hooks/useNavigation";

const EMAIL = "inbeom@organizedcomplexity.com";

export function ContactTeaser() {
  const { push } = useNavigation();
  return (
    <section
      className="px-4 py-20 sm:px-6 md:px-8 md:py-28 lg:px-10 lg:py-32"
      aria-label="Contact teaser"
    >
      <div className="w-full text-center md:text-left">
        <button
          type="button"
          onClick={() => push("/contact")}
          className="font-mono text-xs font-light uppercase tracking-[0.28em] text-(--color-text-subtle) transition-colors hover:text-(--color-accent)"
        >
          Contact
        </button>
        <p className="mt-6 text-xl font-light tracking-[0.05em] text-(--color-text) md:text-2xl">
          Open to roles and projects.
        </p>
        <p className="mt-4 font-light tracking-[0.04em] text-(--color-text-subtle)">
          Email for work, Threads or LinkedIn for casual chat.
        </p>
        <a
          href={`mailto:${EMAIL}`}
          className="mt-4 inline-block font-mono text-sm font-light tracking-[0.15em] text-(--color-accent) underline-offset-4 hover:underline"
        >
          {EMAIL}
        </a>
        <div className="mt-8">
          <button
            type="button"
            onClick={() => push("/contact")}
            className="inline-flex items-center gap-2 rounded border border-white/20 bg-white/5 px-5 py-2.5 font-mono text-sm font-light tracking-[0.2em] text-(--color-accent) transition-colors hover:border-white/30 hover:bg-white/10"
          >
            Get in touch
            <span className="inline-block w-4 border-b border-current" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
