import { notFound } from "next/navigation";
import { getWorkBySlug, getWorkSlugs } from "@/data/works";
import { WorkDetail } from "@/components/sections/works/WorkDetail";
import { PageBackground, PageTransition } from "@/components/ui";

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getWorkSlugs().map((slug) => ({ slug }));
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  return (
    <main id="main-content" className="relative min-h-screen">
      <PageBackground />
      <PageTransition className="relative z-10">
        <WorkDetail work={work} />
      </PageTransition>
    </main>
  );
}
