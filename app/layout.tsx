/**
 * layout.tsx — Root Layout
 * Path: app/layout.tsx
 *
 * Install fonts via next/font/google (no extra packages needed).
 * These two fonts are free on Google Fonts and perfectly suit
 * the Luxury & Refined aesthetic.
 */

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rohmatullah — Full-Stack Developer",
  description:
    "Professional full-stack developer specialising in web, desktop & mobile application development. Precision-built software for discerning clients.",
  keywords: [
    "Rohmatullah",
    "Rohmat",
    "Full-Stack Developer",
    "Web Development",
    "Mobile Development",
    "Desktop Development",
    "Next.js",
    "React",
    "TypeScript",
  ],
  openGraph: {
    title: "Rohmatullah — Full-Stack Developer",
    description: "Crafting digital experiences that matter.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
