'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useIntroComplete } from '@/lib/hooks/useIntroComplete'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero, About, Experience, Projects, Skills, Contact } from '@/components/sections'

// SSR disabled — IntroLoader uses sessionStorage + browser APIs
const IntroLoader = dynamic(
  () => import('@/components/ui/IntroLoader').then((m) => ({ default: m.IntroLoader })),
  { ssr: false }
)

export default function Home() {
  const { introComplete } = useIntroComplete()

  return (
    <>
      <IntroLoader />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Navbar />
        <main id="main">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  )
}
