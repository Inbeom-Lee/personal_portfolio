"use client";

/**
 * Four static vertical lines from top of viewport to bottom (hero to footer).
 * Equal gap: (screen edge ↔ line) = (line ↔ content edge). So lines are inset
 * by half of content padding from viewport (content uses full padding).
 * Lines spaced with space-between.
 */
export function VerticalPageLines() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    >
      {/* Half of content padding so gap(screen↔line) = gap(line↔content) */}
      <div className="flex h-full w-full justify-between pl-2.5 pr-2.5 sm:pl-3 sm:pr-3 md:pl-4 md:pr-4 lg:pl-5 lg:pr-5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-full w-px bg-(--color-text)/4"
          />
        ))}
      </div>
    </div>
  );
}
