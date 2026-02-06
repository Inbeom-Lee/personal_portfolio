"use client";

import Image from "next/image";
import type { Work } from "@/data/works";

interface WorkCardProps {
  work: Work;
  index: number;
  className?: string;
  /** "card" = vertical stack (image top, text bottom). "list" = horizontal row (image left, text right). */
  variant?: "card" | "list";
}

const cardBaseClass =
  "group relative flex overflow-hidden rounded-lg border border-white/5 bg-(--color-surface)/60 transition-all duration-300 ease-out group-hover:border-white/15 group-hover:bg-(--color-surface)/80";

export function WorkCard({
  work,
  index,
  className = "",
  variant = "list",
}: WorkCardProps) {
  const isList = variant === "list";
  const cardClass = [
    cardBaseClass,
    isList ? "flex-row w-full" : "flex-col hover:scale-[1.01] shrink-0",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const hasFourImages = work.images && work.images.length === 4;
  const heroImage = work.images?.[0] ?? work.image;

  const imageBlock = (
    <div
      className={
        isList
          ? "relative z-10 h-32 w-40 shrink-0 overflow-hidden bg-(--color-bg)/80 sm:h-40 sm:w-52 md:h-48 md:w-64"
          : "relative z-10 flex min-h-[160px] shrink-0 items-center justify-center overflow-hidden bg-(--color-bg)/80 md:min-h-[180px]"
      }
    >
      {isList ? (
        heroImage ? (
          <Image
            src={heroImage}
            alt=""
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 640px) 160px, (max-width: 768px) 208px, 256px"
          />
        ) : (
          <span
            className="flex h-full w-full items-center justify-center font-mono text-2xl font-bold tabular-nums text-(--color-accent)/12"
            aria-hidden
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        )
      ) : hasFourImages ? (
        <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-px">
          {work.images!.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ))}
        </div>
      ) : heroImage ? (
        <Image
          src={heroImage}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <span
          className="font-mono text-5xl font-bold tabular-nums text-(--color-accent)/12 md:text-6xl"
          aria-hidden
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
    </div>
  );

  const textBlock = (
    <div
      className={
        isList
          ? "relative z-10 flex min-w-0 flex-1 flex-col justify-center py-4 pr-4 pl-4 sm:py-5 sm:pr-5 sm:pl-5 md:py-6 md:pr-6 md:pl-6"
          : "relative z-10 flex min-h-0 flex-1 flex-col justify-center p-5 md:p-6"
      }
    >
      <span
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      >
        <span className="absolute inset-0 bg-linear-to-b from-transparent via-(--color-accent)/5 to-(--color-accent)/10" />
      </span>
      <span className="relative z-10 font-mono text-xs font-light uppercase tracking-[0.2em] text-(--color-text-subtle)">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="relative z-10 mt-1 text-lg font-light tracking-[0.04em] leading-tight text-(--color-text) transition-colors group-hover:text-(--color-accent) sm:mt-1.5 md:text-xl">
        {work.title}
      </h3>
      <p
        className={
          isList
            ? "relative z-10 mt-1 line-clamp-2 text-sm font-light leading-relaxed tracking-[0.03em] text-(--color-text-subtle)"
            : "relative z-10 mt-2 line-clamp-2 text-sm font-light leading-relaxed tracking-[0.03em] text-(--color-text-subtle)"
        }
      >
        {work.shortDescription}
      </p>
      <p className="relative z-10 mt-2 font-mono text-xs font-light tracking-[0.15em] text-(--color-text-subtle) sm:mt-3">
        {work.focus}
      </p>
      <span className="relative z-10 mt-3 flex items-center gap-2 font-mono text-xs font-light tracking-[0.2em] text-(--color-accent) opacity-0 -translate-y-0.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 sm:mt-4">
        View case study
        <span className="inline-block w-4 border-b border-current" aria-hidden />
      </span>
    </div>
  );

  return (
    <div className={cardClass} data-works-card>
      {imageBlock}
      {textBlock}
    </div>
  );
}
