"use client";

import Image from "next/image";
import { useNavigation } from "@/hooks/useNavigation";
import type { Work } from "@/data/works";

interface WorkDetailProps {
  work: Work;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-10 md:py-14">
      <h2 className="font-mono text-xs font-light tracking-[0.28em] text-(--color-text-subtle) uppercase">
        {title}
      </h2>
      <div className="mt-4 leading-relaxed font-light tracking-[0.04em] text-(--color-text) [&>p]:tracking-[0.04em]">
        {children}
      </div>
    </section>
  );
}

export function WorkDetail({ work }: WorkDetailProps) {
  const { push } = useNavigation();
  const heroImage = work.images?.[0] ?? work.image;

  return (
    <article className="relative min-h-screen w-full">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
        <nav className="py-6">
          <button
            type="button"
            onClick={() => push("/works")}
            className="font-mono text-sm font-light tracking-[0.2em] text-(--color-text-subtle) transition-colors hover:text-(--color-accent)"
          >
            ← Works
          </button>
        </nav>

        <header className="pt-8 md:pt-12">
          <p className="font-mono text-xs font-light tracking-[0.28em] text-(--color-text-subtle) uppercase">
            {work.focus}
          </p>
          <h1 className="mt-3 text-3xl font-light tracking-[0.05em] text-(--color-text) md:text-4xl lg:text-5xl">
            {work.title}
          </h1>
          <p className="mt-2 text-lg font-light tracking-[0.04em] text-(--color-text-subtle)">
            {work.shortDescription}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1 font-mono text-sm font-light tracking-[0.12em] text-(--color-text-subtle)">
            {work.role && <span>{work.role}</span>}
            {work.timeline && <span>{work.timeline}</span>}
          </div>
        </header>
      </div>

      {heroImage && (
        <div className="relative mt-10 w-full px-4 sm:px-6 md:mt-14 md:px-8 lg:px-10">
          <div
            className="relative w-full overflow-hidden rounded-lg border border-white/5 bg-(--color-bg)/80"
            style={{ aspectRatio: "16/10" }}
          >
            <Image
              src={heroImage}
              alt=""
              fill
              className="object-cover"
              loading="eager"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
            />
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl px-4 sm:px-6 md:px-8 lg:px-10">
        {work.overview && (
          <Section title="Overview">
            <p>{work.overview}</p>
          </Section>
        )}

        {work.challenge && (
          <Section title="Challenge">
            <p>{work.challenge}</p>
          </Section>
        )}

        {work.solution && (
          <Section title="Solution">
            <p>{work.solution}</p>
          </Section>
        )}

        {work.results && (
          <Section title="Results">
            <p>{work.results}</p>
            {work.highlights && work.highlights.length > 0 && (
              <ul className="mt-6 list-inside list-disc space-y-2 font-mono text-sm font-light tracking-[0.04em] text-(--color-text-subtle)">
                {work.highlights.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </Section>
        )}
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
        {work.images && work.images.length === 4 && (
          <Section title="Gallery">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {work.images.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-4/3 overflow-hidden rounded-lg border border-white/5 bg-(--color-bg)/80"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
        {work.tech && work.tech.length > 0 && (
          <Section title="Tech & tools">
            <ul className="flex flex-wrap gap-2">
              {work.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-md border border-white/5 bg-(--color-surface)/60 px-3 py-1.5 font-mono text-sm font-light tracking-widest text-(--color-text-subtle)"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Section>
        )}
      </div>

      <footer className="w-full px-4 pt-10 pb-32 sm:px-6 md:px-8 md:pt-14 lg:px-10">
        {work.link && work.link !== "#" && (
          <a
            href={work.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm font-light tracking-[0.2em] text-(--color-accent) underline-offset-4 hover:underline"
          >
            View project →
          </a>
        )}
        <button
          type="button"
          onClick={() => push("/works")}
          className="mt-6 inline-block font-mono text-sm font-light tracking-[0.2em] text-(--color-text-subtle) transition-colors hover:text-(--color-accent)"
        >
          ← Back to all works
        </button>
      </footer>
    </article>
  );
}
