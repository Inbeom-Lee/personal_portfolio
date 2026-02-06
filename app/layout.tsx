import type { Metadata } from "next";
import { fontSans } from "@/lib/fonts";
import { ThemeProvider, Nav, SkipLink } from "@/components/layout";
import { CustomCursor, VerticalPageLines } from "@/components/ui";
import "./globals.css";
import { ViewTransitionProvider } from "@/providers/viewTransition-provider";

const SITE_URL = "https://inbeomlee.com";

export const metadata: Metadata = {
  title: "Inbeom Lee — System Designer & Creative Developer",
  description:
    "Personal portfolio. Physical to digital: systemic production control, business-minded problem solving. System Designer & Creative Developer.",
  openGraph: {
    title: "Inbeom Lee — System Designer & Creative Developer",
    description:
      "Personal portfolio. Physical to digital: systemic production control, business-minded problem solving.",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Inbeom Lee — System Designer & Creative Developer",
    description:
      "Personal portfolio. Physical to digital: systemic production control, business-minded problem solving.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Inbeom Lee",
  jobTitle: "System Designer & Creative Developer",
  url: SITE_URL,
  sameAs: [
    "https://www.linkedin.com/in/inbeom-lee-09b76824a/",
    "https://www.threads.com/@inbeomlee_",
  ],
  email: "inbeom@organizedcomplexity.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitionProvider>
      <html lang="en" className={fontSans.variable}>
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          />
        </head>
        <body
          className={`min-h-screen bg-(--color-bg) text-(--color-text) antialiased font-light tracking-wide ${fontSans.className}`}
        >
          <SkipLink />
          <ThemeProvider>
            <VerticalPageLines />
            <CustomCursor />
            <Nav />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitionProvider>
  );
}
