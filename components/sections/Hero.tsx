'use client'

import { useCallback } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Code2 } from 'lucide-react'
import { profile } from '@/data/profile'
import { Button, Badge, Magnetic, CopyEmailButton } from '@/components/ui'
import { TypingHeadline } from '@/components/ui/TypingHeadline'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Dynamically import the terminal card — it's client-only + adds weight
const SystemStatusTerminal = dynamic(
  () => import('@/components/ui/SystemStatusTerminal').then((m) => ({ default: m.SystemStatusTerminal })),
  { ssr: false }
)

const HEADLINE_PHRASES = [
  'scalable AI systems.',
  'production-grade APIs.',
  'real-time infrastructure.',
  "RAG pipelines that don't hallucinate.",
  'Problem Solver',
]

/* ─── Orchestrated load-in — delayed so it plays after IntroLoader exits ──── */
const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const terminalEntry = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.5 },
  },
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = prefersReducedMotion ? {} : heroContainer
  const itemVariants      = prefersReducedMotion ? {} : heroItem
  const terminalVariants  = prefersReducedMotion ? {} : terminalEntry
  const initialState      = prefersReducedMotion ? { opacity: 1, y: 0 } : 'hidden'
  const animateState      = prefersReducedMotion ? { opacity: 1, y: 0 } : 'visible'

  /**
   * Safety-net ScrollTrigger refresh.
   * Called by TypingHeadline once the first full phrase has been typed out,
   * meaning the hero's final height is now stable and all downstream
   * ScrollTrigger instances can recalculate their offsets against a settled DOM.
   */
  const handleFirstTyped = useCallback(() => {
    if (typeof window === 'undefined') return
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      // Small rAF delay to let the browser commit the final paint
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    })
  }, [])

  return (
    <section
      id="hero"
      className="relative mx-auto px-6 pt-20 max-w-6xl min-h-[100svh] flex items-center"
    >
      {/* ── Two-column grid — text left, terminal right ────────────────────── */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center py-16">

        {/* ── LEFT: text stack ─────────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial={initialState}
          animate={animateState}
          className="max-w-2xl"
        >
          {/* Badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6"
          >
            <Badge variant="success" className="whitespace-nowrap">
              <span className="bg-success shadow-[0_0_8px_rgba(92,219,149,0.8)] mr-1.5 rounded-full w-2 h-2 animate-pulse flex-shrink-0" />
              Open to opportunities
            </Badge>
            {profile.now && (
              <Badge variant="accent" className="font-normal max-w-full text-left">
                <span className="bg-accent shadow-[0_0_8px_rgba(92,219,149,0.6)] mr-1.5 rounded-full w-2 h-2 flex-shrink-0" />
                <span className="truncate sm:whitespace-normal">{profile.now}</span>
              </Badge>
            )}
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 font-bold text-primary text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.95]"
          >
            {profile.name.split(' ')[0]}
            <br />
            {profile.name.split(' ')[1]}.
            {/*
             * The span no longer carries min-h workarounds.
             * TypingHeadline's invisible placeholder reserves the exact height
             * of the longest phrase, eliminating the CLS and ScrollTrigger desync.
             */}
            <span className="block mt-3 text-muted text-3xl md:text-5xl lg:text-6xl tracking-tight">
              I build <TypingHeadline phrases={HEADLINE_PHRASES} onFirstTyped={handleFirstTyped} />
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="mb-10 max-w-xl text-muted text-lg md:text-xl text-balance leading-relaxed"
          >
            Backend &amp; Full-Stack Engineer specializing in distributed architectures,
            LLM applications, and cloud-native microservices.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-12">
            <Magnetic>
              <Button asChild size="lg">
                <a href="#projects">View Projects</a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="outline" size="lg">
                <a href="/RESUME.pdf" download>Download Resume</a>
              </Button>
            </Magnetic>
          </motion.div>

          {/* Social links */}
          <motion.div variants={itemVariants} className="flex items-center gap-6 text-muted">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="-m-2 p-2 hover:text-primary hover:scale-110 active:scale-95 transition-all duration-200"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="-m-2 p-2 hover:text-primary hover:scale-110 active:scale-95 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a
              href={profile.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="-m-2 p-2 hover:text-primary hover:scale-110 active:scale-95 transition-all duration-200"
              aria-label="LeetCode"
            >
              <Code2 size={22} />
            </a>
            <CopyEmailButton
              email={profile.email}
              variant="icon-only"
              className="-m-2 p-2 hover:text-primary hover:scale-110 active:scale-95 transition-all duration-200"
            />
          </motion.div>
        </motion.div>

        {/* ── RIGHT / BOTTOM: health-check status card ──────────────────────────
         *  On desktop (lg+): sits in the auto-width right grid column.
         *  On mobile: flows naturally below the text in the single-column grid.
         *  NO absolute positioning — the grid handles reflow at every breakpoint.
         * ──────────────────────────────────────────────────────────────────── */}
        <motion.div
          variants={terminalVariants}
          initial={initialState}
          animate={animateState}
          className="flex justify-center lg:justify-start mt-8 lg:mt-0 pb-4 lg:pb-0"
        >
          <div className="w-full max-w-sm lg:max-w-xs">
            <SystemStatusTerminal />
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: prefersReducedMotion ? 1 : 1 }}
        transition={{ delay: prefersReducedMotion ? 0 : 1.8, duration: 0.8 }}
        className="bottom-8 left-1/2 absolute -translate-x-1/2"
      >
        <a
          href="#about"
          aria-label="Scroll down to About section"
          className="flex flex-col items-center gap-2 text-muted hover:text-accent transition-colors duration-200"
        >
          <span className="hidden md:block font-mono text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown
            size={18}
            className={prefersReducedMotion ? '' : 'animate-bounce'}
            style={{ animationDuration: '1.5s' }}
          />
        </a>
      </motion.div>
    </section>
  )
}
