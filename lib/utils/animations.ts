import { type Variants } from 'framer-motion'

/* ─── Basic stagger / fade ───────────────────────────────────────────────── */

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

export const cardHover: Variants = {
  rest:  { scale: 1, y: 0 },
  hover: { scale: 1.015, y: -5, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
}

/* ─── Clip-path line reveals (for text/section entrances) ───────────────── */

/** Reveals a line of text by wiping clip-path from left to right */
export const lineReveal: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    transition: {
      clipPath: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
      opacity:  { duration: 0.1 },
    },
  },
}

/** Staggered line reveal container */
export const lineRevealContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

/** Slide-in from below for individual words/spans */
export const wordReveal: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Staggered word reveal container */
export const wordRevealContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

/* ─── Horizontal sweep for skill categories ─────────────────────────────── */

export const sweepIn: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
  },
}
