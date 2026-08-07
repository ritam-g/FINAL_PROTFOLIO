'use client'

import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { experience } from '@/lib/constants/experience'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ExperienceCard } from '@/components/shared/ExperienceCard'
import { staggerContainer } from '@/lib/utils/animations'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Experience section.
 *
 * Layout decision:
 *   • experience.length >= 3 → pinned left-rail GSAP timeline (scrubbed progress dot)
 *   • experience.length < 3  → existing stagger reveal (current design, no fake data)
 *
 * prefers-reduced-motion:
 *   • GSAP is NOT initialised. Component renders as a static vertical list.
 *   • No pinning, no scrubbing, no scroll-triggered reveals — fully static layout.
 *   • This is not "just slower" — pinning can be disorienting and is disabled entirely.
 */
export function Experience() {
  const containerRef  = useRef<HTMLDivElement>(null)
  const railRef       = useRef<HTMLDivElement>(null)
  const dotRef        = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const usePinnedTimeline = experience.length >= 3 && !prefersReducedMotion

  useGSAP(() => {
    // Required change 2: reduced-motion → no GSAP at all
    if (prefersReducedMotion) return

    // Required change 1: only pin when 3+ real entries exist
    if (experience.length < 3) return

    // Pin the left rail while the right content scrolls through all entries
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 120px',
        end: 'bottom bottom',
        pin: railRef.current,
        pinSpacing: false,
      })

      // Scrubbed progress dot travels from top to bottom of the rail
      const entries = containerRef.current?.querySelectorAll('.exp-entry')
      if (!entries || entries.length === 0) return

      gsap.to(dotRef.current, {
        top: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 120px',
          end: 'bottom 80%',
          scrub: 0.6,
        },
      })

      // Staggered entry reveals
      entries.forEach((entry) => {
        gsap.fromTo(
          entry,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: entry,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, { scope: containerRef, dependencies: [prefersReducedMotion] })

  /* ── Pinned timeline layout (3+ entries only, motion enabled) ─────────── */
  if (usePinnedTimeline) {
    return (
      <SectionWrapper id="experience">
        <SectionHeading title="Experience" subtitle="Where I've worked" />

        <div ref={containerRef} className="relative grid grid-cols-[80px_1fr] gap-8">
          {/* Left rail: pinned progress line */}
          <div ref={railRef} className="relative h-full">
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-border-color" />
            {/* Animated scrub dot */}
            <div
              ref={dotRef}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent border-2 border-ink shadow-[0_0_12px_rgba(92,219,149,0.6)]"
              style={{ top: '0%' }}
            />
            {/* Entry dots */}
            {experience.map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-surface border border-border-color-bright"
                style={{ top: `${(i / (experience.length - 1)) * 100}%`, transform: 'translate(-50%, -50%)' }}
              />
            ))}
          </div>

          {/* Right: entry cards */}
          <div className="space-y-16 py-2">
            {experience.map((entry) => (
              <div key={entry.company} className="exp-entry">
                <ExperienceCard entry={entry} mode="timeline" />
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    )
  }

  /* ── Stagger fallback (≤2 entries, or reduced-motion) ─────────────────── */
  return (
    <SectionWrapper id="experience">
      <SectionHeading title="Experience" subtitle="Where I've worked" />

      <motion.div
        variants={prefersReducedMotion ? {} : staggerContainer}
        initial={prefersReducedMotion ? { opacity: 1 } : 'hidden'}
        whileInView={prefersReducedMotion ? { opacity: 1 } : 'visible'}
        viewport={{ once: true, margin: '-100px' }}
        className="space-y-12 md:space-y-0"
      >
        {experience.map((entry) => (
          <ExperienceCard key={entry.company} entry={entry} mode="stagger" />
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
