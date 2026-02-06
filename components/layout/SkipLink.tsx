"use client";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="fixed top-4 left-4 z-100 -translate-y-[200%] rounded bg-(--color-accent) px-4 py-2 font-mono text-sm text-white transition-transform focus:translate-y-0 focus:ring-2 focus:ring-(--color-accent) focus:ring-offset-2 focus:ring-offset-(--color-bg) focus:outline-none"
    >
      Skip to main content
    </a>
  );
}
