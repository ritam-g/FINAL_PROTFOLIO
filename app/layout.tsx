import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* ─── Font configuration ─────────────────────────────────────────────────────── */

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap"
});

/* ─── Page metadata ──────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Ritam Maty — Backend & Full-Stack Engineer",
  description:
    "Backend and Full-Stack Engineer specializing in distributed systems, AI/LLM applications, and cloud-native microservices. Open to opportunities.",
  keywords: [
    "Ritam Maty",
    "Backend Engineer",
    "Full-Stack Developer",
    "Node.js",
    "React",
    "RAG",
    "LangChain",
    "Kubernetes"
  ],
  authors: [{ name: "Ritam Maty", url: "https://ritam-portfolio.vercel.app" }],
  openGraph: {
    title: "Ritam Maty — Backend & Full-Stack Engineer",
    description: "Building production-grade APIs, RAG pipelines, and cloud-native systems.",
    url: "https://ritam-portfolio.vercel.app",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Ritam Maty — Backend & Full-Stack Engineer"
  },
  robots: { index: true, follow: true }
};

/* ─── Root layout ────────────────────────────────────────────────────────────── */

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-background text-muted antialiased relative">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
