'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useIntroComplete } from '@/lib/hooks/useIntroComplete'

/* ─── Constants ───────────────────────────────────────────────────────────── */

const BOOT_LINES = [
  '$ npx portfolio --init',
  '> connecting services... auth ✓  api-gateway ✓',
  '> loading rag-pipeline ✓  vector-search ✓',
  '> profile: ritam_maty.json ✓',
]

// Timeline (ms) — tune these together, they're all relative to mount
const T_BOOT_DONE = 900
const T_NAME_SHOW = 950
const T_SUBTITLE_SHOW = 1500
const T_CURTAIN_EXIT = 2150
const PROGRESS_TICK_MS = 40

/* ─── Animation Variants ──────────────────────────────────────────────────── */

const curtainTopVariants = {
  initial: { y: 0 },
  exit: {
    y: '-100%',
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] as const },
  },
}

const curtainBottomVariants = {
  initial: { y: 0 },
  exit: {
    y: '100%',
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] as const },
  },
}

const bootContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

const bootLineVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: 'easeOut' as const },
  },
}

const subtitleVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.15 },
  },
}

const progressVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

/* Word reveal: clip-path wipe + spring settle + a brief RGB-split glitch flick */
function wordVariants(fromLeft: boolean) {
  return {
    hidden: {
      clipPath: fromLeft ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
      x: fromLeft ? -24 : 24,
      opacity: 0,
    },
    visible: {
      clipPath: 'inset(0 0% 0 0%)',
      x: 0,
      opacity: 1,
      textShadow: [
        '0 0 0 rgba(0,0,0,0)',
        '-2px 0 #ef4444, 2px 0 #22d3ee',
        '2px 0 #ef4444, -2px 0 #22d3ee',
        '0 0 0 rgba(0,0,0,0)',
      ],
      transition: {
        clipPath: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as const },
        x: { type: 'spring' as const, stiffness: 260, damping: 24 },
        opacity: { duration: 0.15 },
        textShadow: { duration: 0.32, delay: 0.25, times: [0, 0.3, 0.6, 1] },
      },
    },
  }
}

/* ─── Component ───────────────────────────────────────────────────────────── */

export function IntroLoader() {
  const { introComplete, setIntroComplete } = useIntroComplete()
  const prefersReducedMotion = useReducedMotion()

  const [showBoot, setShowBoot] = useState(true)
  const [showName, setShowName] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [exitCurtain, setExitCurtain] = useState(false)
  const [progress, setProgress] = useState(0)

  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([])
  const addTimeout = (fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay)
    timeoutRefs.current.push(id)
    return id
  }

  useEffect(() => {
    if (prefersReducedMotion) {
      setIntroComplete()
      return
    }

    // Progress counter, ticks up to ~99% then snaps to 100 right before curtain exit
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 6 + 2
        return next >= 99 ? 99 : next
      })
    }, PROGRESS_TICK_MS)

    addTimeout(() => setShowBoot(false), T_BOOT_DONE)
    addTimeout(() => setShowName(true), T_NAME_SHOW)
    addTimeout(() => setShowSubtitle(true), T_SUBTITLE_SHOW)
    addTimeout(() => {
      setProgress(100)
      setExitCurtain(true)
    }, T_CURTAIN_EXIT)

    return () => {
      clearInterval(progressInterval)
      timeoutRefs.current.forEach(clearTimeout)
      timeoutRefs.current = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion])

  if (introComplete) return null

  return (
    <AnimatePresence>
      {!introComplete && (
        <div
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          className="z-[9999] fixed inset-0 pointer-events-none"
        >
          {/* ── Top Curtain ─────────────────────────────────────────────── */}
          <motion.div
            className="top-0 right-0 left-0 absolute h-1/2"
            style={{ background: 'var(--bg)' }}
            variants={curtainTopVariants}
            initial="initial"
            animate={exitCurtain ? 'exit' : 'initial'}
            onAnimationComplete={(definition) => {
              if (definition === 'exit') setIntroComplete()
            }}
          />

          {/* ── Bottom Curtain ───────────────────────────────────────────── */}
          <motion.div
            className="right-0 bottom-0 left-0 absolute h-1/2"
            style={{ background: 'var(--bg)' }}
            variants={curtainBottomVariants}
            initial="initial"
            animate={exitCurtain ? 'exit' : 'initial'}
          />

          {/* ── Centered Content ─────────────────────────────────────────── */}
          <div className="z-10 absolute inset-0 flex flex-col justify-center items-center gap-6 px-6 text-center">
            {/* ACT 1 — Terminal boot sequence */}
            <AnimatePresence mode="wait">
              {showBoot && (
                <motion.div
                  className="flex flex-col items-start gap-1.5 font-[family-name:var(--font-jetbrains-mono)] text-xs md:text-sm"
                  style={{ color: 'var(--accent-green)' }}
                  variants={bootContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  aria-hidden="true"
                >
                  {BOOT_LINES.map((line, i) => (
                    <motion.p
                      key={line}
                      variants={bootLineVariants}
                      style={{ color: i === 0 ? 'var(--text-dim)' : 'var(--accent-green)' }}
                    >
                      {line}
                    </motion.p>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ACT 2 — Name reveal with glitch + clip-path wipe */}
            {showName && (
              <div className="flex items-baseline gap-4 md:gap-6">
                <motion.span
                  className="font-[family-name:var(--font-space-grotesk)] font-bold text-white text-5xl md:text-7xl lg:text-8xl tracking-tight"
                  variants={wordVariants(true)}
                  initial="hidden"
                  animate="visible"
                >
                  RITAM
                </motion.span>
                <motion.span
                  className="font-[family-name:var(--font-space-grotesk)] font-bold text-white text-5xl md:text-7xl lg:text-8xl tracking-tight"
                  variants={wordVariants(false)}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.08 }}
                >
                  MATY
                </motion.span>
              </div>
            )}

            {/* ACT 3 — Subtitle + signature trace-line (reused from site design system) */}
            {showSubtitle && (
              <motion.div
                className="flex flex-col items-center gap-3"
                variants={subtitleVariants}
                initial="hidden"
                animate="visible"
              >
                <p className="font-[family-name:var(--font-inter)] text-sm md:text-base" style={{ color: 'var(--text-dim)' }}>
                  Backend &amp; Full-Stack Engineer
                </p>
                <motion.div
                  className="trace-line"
                  style={{ width: 200 }}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                />
              </motion.div>
            )}
          </div>

          {/* ── Progress readout, bottom-right corner ─────────────────────── */}
          <motion.div
            className="right-6 bottom-6 absolute font-[family-name:var(--font-jetbrains-mono)] text-xs"
            style={{ color: 'var(--text-dim)' }}
            variants={progressVariants}
            initial="hidden"
            animate="visible"
            aria-hidden="true"
          >
            {Math.floor(progress).toString().padStart(3, '0')}%
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}