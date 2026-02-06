import type { Metadata } from "next";

const SITE_URL = "https://inbeomlee.com";

export const metadata: Metadata = {
  title: "About | Inbeom Lee",
  description:
    "Physical to digital: systemic production control, business-minded problem solving. Timeline and skills.",
  openGraph: {
    title: "About | Inbeom Lee",
    description:
      "Physical to digital: systemic production control, business-minded problem solving. Timeline and skills.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
