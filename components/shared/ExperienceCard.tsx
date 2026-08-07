'use client'

import { motion } from 'framer-motion'
import { ExperienceEntry } from '@/types'
import { fadeInUp } from '@/lib/utils/animations'

interface ExperienceCardProps {
  entry: ExperienceEntry
  /** 'stagger' = current stagger layout (≤2 entries or reduced-motion)
   *  'timeline' = nested inside pinned rail (3+ entries, motion on) */
  mode?: 'stagger' | 'timeline'
}

export function ExperienceCard({ entry, mode = 'stagger' }: ExperienceCardProps) {
  const isPresent = entry.period.toLowerCase().includes('present')

  const cardContent = (
    <div className="pb-10">
      {/* Period — shown above the card in timeline mode, inline in stagger */}
      {mode === 'stagger' && (
        <span className="block mb-1 text-xs font-mono text-muted md:hidden">
          {entry.period}
        </span>
      )}

      {/* Role + company */}
      <h3 className="text-lg font-bold text-primary leading-tight">{entry.role}</h3>
      <p className="text-accent font-medium text-sm mb-1">{entry.company}</p>

      {/* Period badge */}
      <span className="inline-block font-mono text-xs text-muted bg-surface border border-border-color rounded px-2 py-0.5 mb-4">
        {entry.period}
        {isPresent && (
          <span className="ml-2 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse inline-block" />
            <span className="text-success">now</span>
          </span>
        )}
      </span>

      {/* Description */}
      {entry.description && (
        <p className="text-muted text-sm mb-4 leading-relaxed">{entry.description}</p>
      )}

      {/* Bullet points */}
      <ul className="space-y-2.5">
        {entry.points.map((point, i) => (
          <li key={i} className="text-sm text-muted flex gap-3 items-start">
            <span className="text-accent-dim mt-1.5 flex-shrink-0 text-[9px]">▶</span>
            <span className="leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )

  /* ── Timeline mode: no extra wrapper needed (parent handles layout) ─── */
  if (mode === 'timeline') {
    return cardContent
  }

  /* ── Stagger mode: two-column desktop layout ─────────────────────────── */
  return (
    <motion.div variants={fadeInUp} className="relative pl-8 md:pl-0">
      {/* Mobile timeline line */}
      <div className="md:hidden absolute left-0 top-1.5 bottom-0 w-px bg-border-color">
        <div
          className={`absolute left-[-4px] top-0 h-2 w-2 rounded-full border-2 ${
            isPresent
              ? 'bg-success border-success animate-pulse'
              : 'bg-surface border-muted'
          }`}
        />
      </div>

      <div className="md:grid md:grid-cols-[200px_1fr] md:gap-8 items-baseline">
        {/* Desktop: period column */}
        <div className="mb-2 md:mb-0 relative hidden md:block">
          <div className="absolute right-[-17px] top-2 bottom-[-2rem] w-px bg-border-color">
            <div
              className={`absolute left-[-4px] top-0 h-2 w-2 rounded-full border-2 ${
                isPresent
                  ? 'bg-success border-success animate-pulse shadow-[0_0_8px_rgba(92,219,149,0.5)]'
                  : 'bg-surface border-muted'
              }`}
            />
          </div>
          <span className="text-sm font-mono text-muted block md:text-right pr-8">
            {entry.period}
          </span>
        </div>
        {cardContent}
      </div>
    </motion.div>
  )
}
