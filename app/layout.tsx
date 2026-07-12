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
  title: "Ritam Maty — Full-Stack & Backend Engineer",
  description:
    "Backend & full-stack engineer building AI-integrated, production-grade systems — RAG pipelines, real-time infrastructure, and Kubernetes-native services.",
  keywords: [
    "Ritam Maty",
    "full-stack engineer",
    "backend engineer",
    "Node.js",
    "Next.js",
    "RAG",
    "Kubernetes",
    "portfolio"
  ],
  authors: [{ name: "Ritam Maty" }],
  openGraph: {
    title: "Ritam Maty — Full-Stack & Backend Engineer",
    description:
      "Building AI-integrated, production-grade systems — RAG pipelines, real-time infrastructure, and Kubernetes-native services.",
    type: "website"
  }
};

/* ─── Root layout ────────────────────────────────────────────────────────────── */

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
