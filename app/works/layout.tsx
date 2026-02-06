import type { Metadata } from "next";

const SITE_URL = "https://inbeomlee.com";

export const metadata: Metadata = {
  title: "Works | Inbeom Lee",
  description: "Selected work — system architecture, creative dev, brand & web.",
  openGraph: {
    title: "Works | Inbeom Lee",
    description: "Selected work — system architecture, creative dev, brand & web.",
    url: `${SITE_URL}/works`,
    type: "website",
  },
};

export default function WorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
