'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '@/data/profile'

/* ─── Stack tags to show in the card — pulled from real data ──────────────── */
const STACK_TAGS = ['Node.js', 'K8s', 'RAG', 'Redis', 'TypeScript']

/* ─── Animation variants ──────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
}

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
}

/* ─── Sub-components ──────────────────────────────────────────────────────── */

function PingDot() {
  return (
    <span className="relative inline-flex h-2 w-2 flex-shrink-0">
      <span
        className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping"
        style={{ animationDuration: '2s' }}
      />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
    </span>
  )
}

/**
 * SystemStatusTerminal — Hero right-column health-check card.
 *
 * Visual language:
 *   • Styled as a GET /api/ritam/status JSON response — NOT a terminal emulator.
 *   • Different from IntroLoader (which is full-screen, typed, curtain-based).
 *   • Uses surface-2 bg + border-color-bright frame; stagger-slides in per row.
 *   • No typewriter cursor — that's the IntroLoader's signature gesture.
 *   • prefers-reduced-motion: rows appear instantly at full opacity with no slide.
 */
export function SystemStatusTerminal() {
  const shouldReduceMotion = useReducedMotion()

  const variants = shouldReduceMotion ? {} : containerVariants
  const itemVariants = shouldReduceMotion ? {} : rowVariants
  const initial = shouldReduceMotion ? { opacity: 1, y: 0 } : 'hidden'
  const animate = shouldReduceMotion ? { opacity: 1, y: 0 } : 'visible'

  return (
    <motion.div
      variants={variants}
      initial={initial}
      animate={animate}
      className="status-card w-full max-w-xs"
      role="complementary"
      aria-label="Ritam's system status"
    >
      {/* ── Header row ──────────────────────────────────────────────────── */}
      <motion.div variants={itemVariants} className="status-card-header">
        <span className="status-200">200 OK</span>
        <span className="text-border-color">/</span>
        <span>GET /api/ritam/status</span>
        <span className="ml-auto opacity-50">14ms</span>
      </motion.div>

      {/* ── Body rows ───────────────────────────────────────────────────── */}
      <div className="status-card-body">

        <motion.div variants={itemVariants} className="status-row">
          <span className="status-key">role</span>
          <span className="status-value">Backend &amp; Full-Stack</span>
        </motion.div>

        <motion.div variants={itemVariants} className="status-row">
          <span className="status-key">org</span>
          <span className="status-value flex items-center gap-2">
            iPROTECHS
            <PingDot />
            <span className="text-accent text-[10px]">active</span>
          </span>
        </motion.div>

        <motion.div variants={itemVariants} className="status-row">
          <span className="status-key">location</span>
          <span className="status-value">{profile.location}</span>
        </motion.div>

        <motion.div variants={itemVariants} className="status-row items-start">
          <span className="status-key mt-0.5">stack</span>
          <span className="status-value flex flex-wrap gap-1">
            {STACK_TAGS.map((tag) => (
              <span key={tag} className="status-tag">{tag}</span>
            ))}
          </span>
        </motion.div>

        <motion.div variants={itemVariants} className="status-row mt-2">
          <span className="status-open">
            <PingDot />
            Open to opportunities
          </span>
        </motion.div>

      </div>
    </motion.div>
  )
}
