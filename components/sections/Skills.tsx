'use client'

import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { skills } from '@/lib/constants/skills'
import { SkillCategory } from '@/types'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { sweepIn } from '@/lib/utils/animations'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/* ─── Category prefix symbols ────────────────────────────────────────────── */
const CATEGORY_PREFIX: Record<SkillCategory, string> = {
  'Languages':       '{ }',
  'Frontend':        '▤',
  'Backend':         '⚙',
  'Databases':       '⬡',
  'AI/LLM':          '◈',
  'Cloud & DevOps':  '⛶',
}

export function Skills() {
  const containerRef        = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<SkillCategory, typeof skills>)

  const categories = Object.keys(groupedSkills) as SkillCategory[]

  useGSAP(() => {
    // prefers-reduced-motion: no animations at all — fully static layout
    if (prefersReducedMotion) return

    // Animate each skill pill in with a stagger+scale
    gsap.fromTo(
      '.skill-pill',
      { opacity: 0, scale: 0.8, y: 4 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.28,
        stagger: 0.012,
        ease: 'back.out(1.3)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: containerRef, dependencies: [prefersReducedMotion] })

  return (
    <SectionWrapper id="skills">
      <div ref={containerRef}>
        <SectionHeading title="Skills & Technologies" subtitle="My toolbox" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {categories.map((category, idx) => (
            <motion.div
              key={category}
              className="skill-category-group"
              initial={prefersReducedMotion ? { opacity: 1 } : 'hidden'}
              whileInView={prefersReducedMotion ? { opacity: 1 } : 'visible'}
              viewport={{ once: true, margin: '-60px' }}
              variants={prefersReducedMotion ? {} : sweepIn}
              transition={{ delay: idx * 0.07 }}
            >
              {/* Category header with prefix symbol */}
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border-color">
                <span
                  className="font-mono text-accent text-sm"
                  aria-hidden="true"
                >
                  {CATEGORY_PREFIX[category]}
                </span>
                <h3 className="text-base font-bold text-primary">{category}</h3>
              </div>

              {/* Skill pills */}
              <ul className="flex flex-wrap gap-2" aria-label={`${category} skills`}>
                {groupedSkills[category].map((skill) => (
                  <li
                    key={skill.name}
                    className="skill-pill bg-surface border border-border-color text-muted px-3 py-1.5 rounded-full text-sm font-medium hover:border-accent/50 hover:text-primary hover:bg-surface-2 transition-colors duration-150 cursor-default"
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/*
          Connector lines between categories are implemented via CSS pseudo-elements
          (see .skill-category-group::after in globals.css).
          Mobile: display:none at < md (verified in build, not deferred).
        */}
      </div>
    </SectionWrapper>
  )
}
