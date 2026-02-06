import type { Metadata } from "next";

const SITE_URL = "https://inbeomlee.com";

export const metadata: Metadata = {
  title: "Contact | Inbeom Lee",
  description: "Get in touch — email, Threads, LinkedIn.",
  openGraph: {
    title: "Contact | Inbeom Lee",
    description: "Get in touch — email, Threads, LinkedIn.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
