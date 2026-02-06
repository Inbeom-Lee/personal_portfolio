"use client";

import { useNavigation } from "@/hooks/useNavigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/works", label: "Works" },
  { href: "/contact", label: "Contact" },
] as const;

export function Footer() {
  const { push } = useNavigation();
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 py-12 sm:px-6 md:px-8 lg:px-10" aria-label="Footer">
      <div className="flex w-full flex-col items-center justify-between gap-8 md:flex-row">
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center justify-center gap-6 md:gap-8" role="list">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <button
                  type="button"
                  onClick={() => push(href)}
                  className="font-mono text-xs font-light tracking-[0.2em] text-(--color-text-subtle) underline-offset-4 transition-all duration-200 hover:tracking-[0.28em] hover:text-(--color-accent) hover:underline"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <p className="font-mono text-xs font-light tracking-[0.15em] text-(--color-text-subtle)">
          © {year} Inbeom Lee
        </p>
      </div>
    </footer>
  );
}
