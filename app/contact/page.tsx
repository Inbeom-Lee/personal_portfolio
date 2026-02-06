"use client";

import { useRef, useEffect } from "react";
import { Contact } from "@/components/sections/contact";
import { PageBackground, PageTransition } from "@/components/ui";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ContactPage() {
  const mainRef = useRef<HTMLElement>(null);
  useScrollReveal(mainRef);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <main
      ref={mainRef}
      id="main-content"
      className="relative flex min-h-0 flex-col overflow-hidden"
      style={{
        height: "calc(100dvh - var(--nav-height))",
        maxHeight: "calc(100dvh - var(--nav-height))",
      }}
    >
      <PageBackground />
      <PageTransition className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden">
        <div
          data-scroll-reveal
          className="flex min-h-0 flex-1 flex-col overflow-hidden"
        >
          <Contact />
        </div>
      </PageTransition>
    </main>
  );
}
