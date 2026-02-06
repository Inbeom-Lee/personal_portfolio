"use client";

import { usePathname } from "next/navigation";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useNavigation } from "@/hooks/useNavigation";
import { useTheme } from "./ThemeProvider";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/works", label: "Works" },
  { href: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const pathname = usePathname();
  const progressBarRef = useScrollProgress();
  const { theme, setTheme } = useTheme();
  const { push } = useNavigation();

  return (
    <nav
      className="sticky top-0 z-50 min-h-[var(--nav-height)] bg-(--color-bg)/90 backdrop-blur-sm"
      aria-label="Main"
    >
      <div className="flex h-[var(--nav-height)] w-full items-center justify-between px-4 py-3 sm:px-6 md:px-8 lg:px-10">
        <button
          type="button"
          onClick={() => push("/")}
          className="font-mono text-sm font-light tracking-[0.2em] text-(--color-text) transition-all duration-200 hover:text-(--color-accent) hover:tracking-[0.28em] w-32"
        >
          Inbeom Lee
        </button>
        <ul className="flex items-center gap-6">
          {LINKS.map(({ href, label }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href} className="group/link">
                <button
                  type="button"
                  onClick={() => push(href)}
                  className={`relative inline-block font-mono text-xs font-light tracking-[0.2em] transition-all duration-200 hover:text-(--color-accent) hover:tracking-[0.28em] ${
                    isActive
                      ? "text-(--color-accent)"
                      : "text-(--color-text-subtle)"
                  }`}
                >
                  {label}
                  <span
                    className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-(--color-accent) transition-transform duration-200 group-hover/link:scale-x-100"
                    aria-hidden
                  />
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 h-px w-full bg-(--color-accent)"
                      aria-hidden
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="w-32 flex justify-end">
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="font-mono text-xs font-light tracking-[0.18em] text-(--color-text-subtle) underline-offset-4 transition-all duration-200 hover:text-(--color-accent) hover:tracking-[0.25em]"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>
      {/* Scroll progress bar — width updated in rAF for smooth lerp */}
      <div
        ref={progressBarRef}
        className="absolute bottom-0 left-0 h-0.25 bg-(--color-accent) will-change-[width]"
        style={{ width: "0%" }}
        aria-hidden
      />
    </nav>
  );
}
