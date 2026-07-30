'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useIntroComplete } from '@/lib/hooks/useIntroComplete'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero, About, Experience, Projects, Skills, Contact } from '@/components/sections'
import TraceLine from '@/components/sections/TraceLine'

// SSR disabled — IntroLoader uses sessionStorage + browser APIs
const IntroLoader = dynamic(
  () => import('@/components/ui/IntroLoader').then((m) => ({ default: m.IntroLoader })),
  { ssr: false }
)

/* Divider node sets — contextually themed per position */
const DIVIDER_NODES_1 = ['init', 'auth', 'api-gateway', 'rag-pipeline', 'vector-db'] as const
const DIVIDER_NODES_2 = ['build', 'test', 'deploy', 'monitor', 'rollback'] as const
const DIVIDER_NODES_3 = ['http', 'validate', 'rate-limit', 'resend', 'delivered'] as const

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
          {/* Divider 1: Hero → About — signals system init */}
          <div className="max-w-6xl mx-auto px-6 py-2">
            <TraceLine nodes={DIVIDER_NODES_1} />
          </div>
          <About />
          <Experience />
          {/* Divider 2: Experience → Projects — signals build/deploy pipeline */}
          <div className="max-w-6xl mx-auto px-6 py-2">
            <TraceLine nodes={DIVIDER_NODES_2} />
          </div>
          <Projects />
          <Skills />
          {/* Divider 3: Skills → Contact — signals the contact API pipeline */}
          <div className="max-w-6xl mx-auto px-6 py-2">
            <TraceLine nodes={DIVIDER_NODES_3} />
          </div>
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  )
}

