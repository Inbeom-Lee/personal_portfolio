"use client";

import { useRef } from "react";
import { Hero } from "@/components/sections/hero";
import { AboutTeaser } from "@/components/sections/about";
import { WorksTeaser } from "@/components/sections/works";
import { ContactTeaser } from "@/components/sections/contact";
import { Footer } from "@/components/layout";
import { PageTransition } from "@/components/ui";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  useScrollReveal(mainRef);

  return (
    <>
      <main ref={mainRef} id="main-content" className="min-h-screen">
        <PageTransition>
          <div data-scroll-reveal>
            <Hero />
          </div>
          <div data-scroll-reveal>
            <AboutTeaser />
          </div>
          <div data-scroll-reveal>
            <WorksTeaser />
          </div>
          <div data-scroll-reveal>
            <ContactTeaser />
          </div>
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}
