"use client";

import { useState, useCallback } from "react";

const EMAIL = "inbeom@organizedcomplexity.com";

const SOCIAL = [
  { href: "https://www.threads.com/@inbeomlee_", label: "Threads" },
  {
    href: "https://www.linkedin.com/in/inbeom-lee-09b76824a/",
    label: "LinkedIn",
  },
] as const;

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <section
      id="contact"
      className="flex h-full min-h-0 flex-col justify-end overflow-hidden"
      aria-label="Contact"
    >
      <div className="flex w-full justify-end px-4 pr-6 pb-12 sm:pr-8 sm:pb-16 md:pr-20 md:pb-24 lg:pr-28 lg:pb-32">
        <div className="max-w-2xl text-right">
          <h2 className="text-2xl font-medium tracking-tight text-(--color-text) md:text-3xl">
            Get in touch
          </h2>
          <p className="mt-3 font-light tracking-[0.04em] text-(--color-text-subtle)">
            Open to roles and projects
            <br className="sm:hidden" />
            — email for work.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="font-mono text-base text-(--color-text) underline decoration-(--color-accent)/50 underline-offset-4 transition-all duration-200 hover:text-(--color-accent) hover:decoration-(--color-accent) md:text-lg"
            >
              {EMAIL}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="rounded border border-white/20 bg-white/5 px-2.5 py-1.5 font-mono text-xs text-(--color-text-subtle) transition-colors hover:border-(--color-accent)/40 hover:bg-white/10 hover:text-(--color-accent)"
              aria-label="Copy email address"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="mt-8 font-mono text-xs font-light tracking-[0.12em] text-(--color-text-subtle)">
            Also on{" "}
            {SOCIAL.map(({ href, label }, i) => (
              <span key={label}>
                {i > 0 && " · "}
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-(--color-accent)/50 underline-offset-4 transition-colors hover:text-(--color-accent) hover:decoration-(--color-accent)"
                >
                  {label}
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
