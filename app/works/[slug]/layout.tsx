import type { Metadata } from "next";
import { getWorkBySlug } from "@/data/works";

const SITE_URL = "https://inbeomlee.com";

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) return { title: "Work | Inbeom Lee" };

  const title = `${work.title} | Inbeom Lee`;
  const description =
    work.shortDescription || "Case study — system architecture, creative dev, brand & web.";
  const url = `${SITE_URL}/works/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function WorkSlugLayout({ children }: Props) {
  return children;
}
