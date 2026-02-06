"use client";

import { Works } from "@/components/sections/works";
import { PageBackground, PageTransition } from "@/components/ui";

export default function WorksPage() {
  return (
    <main id="main-content" className="relative min-h-screen">
      <PageBackground />
      <PageTransition className="relative z-10">
        <Works />
      </PageTransition>
    </main>
  );
}
