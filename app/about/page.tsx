"use client";

import { useRef } from "react";
import { About } from "@/components/sections/about";
import { TechStack } from "@/components/sections/tech";
import { PageBackground, PageTransition } from "@/components/ui";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function AboutPage() {
  const mainRef = useRef<HTMLElement>(null);
  useScrollReveal(mainRef);

  return (
    <main ref={mainRef} id="main-content" className="relative min-h-screen">
      <PageBackground />
      <PageTransition className="relative z-10">
        <div data-scroll-reveal>
          <About />
        </div>
        <div data-scroll-reveal>
          <TechStack />
        </div>
      </PageTransition>
    </main>
  );
}
