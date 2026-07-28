import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { IntroProvider } from '@/lib/hooks/useIntroComplete'
import { profile } from '@/data/profile'
import './globals.css'

/* ─── Font configuration ─────────────────────────────────────────────────────── */

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

/* ─── Page metadata ──────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  metadataBase: new URL('https://final-protfolio-ruddy.vercel.app'),
  title: {
    default: 'Ritam Maty — Backend & Full-Stack Engineer',
    template: '%s | Ritam Maty',
  },
  description:
    'Backend and Full-Stack Engineer specializing in distributed systems, AI/LLM applications, and cloud-native microservices. Open to opportunities.',
  keywords: [
    'Ritam Maty',
    'Backend Engineer',
    'Full-Stack Developer',
    'Node.js',
    'React',
    'RAG',
    'LangChain',
    'Kubernetes',
  ],
  authors: [{ name: 'Ritam Maty', url: 'https://final-protfolio-ruddy.vercel.app' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ritam Maty — Backend & Full-Stack Engineer',
    description: 'Building production-grade APIs, RAG pipelines, and cloud-native systems.',
    url: 'https://final-protfolio-ruddy.vercel.app',
    siteName: 'Ritam Maty — Portfolio',
    locale: 'en_US',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ritam Maty — Backend & Full-Stack Engineer',
    description: 'Building production-grade APIs, RAG pipelines, and cloud-native systems.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
}

/* ─── Root layout ────────────────────────────────────────────────────────────── */

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: 'Backend & Full-Stack Engineer',
    url: 'https://final-protfolio-ruddy.vercel.app',
    sameAs: [
      profile.linkedin,
      profile.github,
      profile.leetcode,
    ].filter(Boolean),
    email: `mailto:${profile.email}`,
  }

  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-muted antialiased relative">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded"
        >
          Skip to main content
        </a>
        <IntroProvider>{children}</IntroProvider>
      </body>
    </html>
  )
}
