'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { CountUp } from '@/components/ui'
import { fadeInUp, lineRevealContainer, lineReveal } from '@/lib/utils/animations'

const ABOUT_PARAGRAPHS = [
  'I am a Backend and Full-Stack Engineer with a strong focus on distributed architectures, cloud-native microservices, and AI/LLM integrations. I specialize in building highly scalable, fault-tolerant systems that power real-time applications and robust APIs.',
  'My engineering philosophy revolves around performance optimization, robust error handling, and clean, maintainable code. Whether it\'s architecting a multi-tenant platform with RBAC or streaming AI code suggestions via SSE, I thrive on solving complex technical challenges.',
]

const STATS = [
  { label: 'Projects in Production', end: 2, suffix: '+' },
  { label: 'AI Systems Built',       end: 3, suffix: '+' },
]

export function About() {
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = shouldReduceMotion ? {} : lineRevealContainer
  const textVariants      = shouldReduceMotion ? {} : lineReveal

  return (
    <SectionWrapper id="about">
      <SectionHeading title="About Me" subtitle="Who I am" />

      <div className="items-start gap-12 grid md:grid-cols-[1fr_300px]">

        {/* ── Left: text + stats ─────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? { opacity: 1 } : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="mb-8 space-y-5">
            {ABOUT_PARAGRAPHS.map((para, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <motion.p
                  variants={textVariants}
                  className="text-muted leading-relaxed text-base md:text-lg text-balance"
                >
                  {para}
                </motion.p>
              </div>
            ))}
          </div>

          {/* Stat chips */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap gap-4 text-sm"
          >
            {STATS.map(({ label, end, suffix }) => (
              <div
                key={label}
                className="bg-surface px-4 py-2 border border-border-color rounded-md"
              >
                <span className="font-bold text-accent">
                  <CountUp end={end} suffix={suffix} />
                </span>{' '}
                {label}
              </div>
            ))}
            <div className="flex items-center gap-2 bg-surface px-4 py-2 border border-border-color rounded-md font-medium text-primary">
              <span className="bg-success rounded-full w-2 h-2 animate-pulse" />
              Currently @ iPROTECHS
            </div>
          </motion.div>
        </motion.div>

        {/* ── Right: portrait + diagnostic stats overlay ─────────────────── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="group hidden md:block relative"
        >
          {/* Glow behind image */}
          <div className="absolute inset-0 bg-accent opacity-15 group-hover:opacity-25 blur-2xl rounded-xl transition-opacity duration-500" />

          {/* Portrait */}
          <div className="relative bg-surface border border-border-color rounded-xl aspect-square overflow-hidden">
            <Image
              src="/ritam.png"
              alt="Ritam Maty — Backend & Full-Stack Engineer"
              fill
              className="grayscale hover:grayscale-0 object-cover transition-all duration-500"
              sizes="(max-width: 768px) 100vw, 300px"
              priority
            />
          </div>

          {/* Diagnostic overlay — below the portrait */}
          <div className="mt-3 bg-surface-2 border border-border-color rounded-lg p-3 font-mono text-[11px] space-y-1.5">
            <div className="flex justify-between text-fog">
              <span className="text-signal-dim">projects_shipped</span>
              <span className="text-stone">2+</span>
            </div>
            <div className="flex justify-between text-fog">
              <span className="text-signal-dim">ai_systems</span>
              <span className="text-stone">3+</span>
            </div>
            <div className="flex justify-between text-fog">
              <span className="text-signal-dim">current_org</span>
              <span className="text-accent">iPROTECHS</span>
            </div>
            <div className="flex justify-between text-fog">
              <span className="text-signal-dim">status</span>
              <span className="text-accent flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                open
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
