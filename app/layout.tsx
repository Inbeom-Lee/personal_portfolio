import type { Metadata } from "next";
import { fontSans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Portfolio",
  description: "Portfolio site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontSans.variable}>
      <body className={`min-h-screen bg-white text-neutral-900 antialiased ${fontSans.className}`}>
        {children}
      </body>
    </html>
  );
}
