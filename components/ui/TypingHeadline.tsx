'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIntroComplete } from '@/lib/hooks/useIntroComplete'

interface TypingHeadlineProps {
  phrases: string[]
  /** Called once when the first full phrase has been typed out.
   *  Used by the Hero to trigger ScrollTrigger.refresh(). */
  onFirstTyped?: () => void
}

/**
 * TypingHeadline — fixed version.
 *
 * Layout fix (CLS):
 *   The outer container uses position:relative with a fixed height equal to
 *   the tallest phrase. An invisible clone of the longest phrase acts as a
 *   layout placeholder so the hero's height never changes while typing.
 *   The typed text is position:absolute on top of it.
 *   This eliminates the CLS hit and the ScrollTrigger desync.
 *
 * Timing fix:
 *   Typing only starts after `introComplete` is true (the IntroLoader curtain
 *   has fully exited). This ensures ScrollTrigger initialises against a
 *   stable layout, not a partially-typed hero.
 *
 * Scope fix:
 *   The effect runs exactly once per mount cycle. It has no shared/global
 *   state — all state is local to this component instance.
 *   Typing does not replay on resize, scroll, or re-render (the interval is
 *   managed via a stable ref, not a dependency-chain of setState calls).
 *
 * Reduced-motion:
 *   No typing animation. First phrase renders immediately at full opacity.
 *   No layout shift because the invisible placeholder is the same element.
 */
export function TypingHeadline({ phrases, onFirstTyped }: TypingHeadlineProps) {
  const prefersReducedMotion = useReducedMotion()
  const { introComplete } = useIntroComplete()

  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting]   = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const hasStartedRef   = useRef(false)   // ensure typing starts exactly once
  const firstTypedRef   = useRef(false)   // ensure onFirstTyped fires exactly once
  const timeoutRef      = useRef<ReturnType<typeof setTimeout> | null>(null)

  // The longest phrase acts as the invisible height reservation
  const longestPhrase = phrases.reduce(
    (longest, p) => (p.length > longest.length ? p : longest),
    ''
  )

  const clearPending = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    // Do not start until the intro curtain has fully exited
    if (!introComplete) return
    // Do not start if reduced-motion is on — text is already rendered statically
    if (prefersReducedMotion) return
    // Run the typing loop exactly once per mount
    if (hasStartedRef.current) return
    hasStartedRef.current = true

    const TYPE_SPEED   = 48  // ms per character — fixed (no random, avoids jitter)
    const DELETE_SPEED = 28
    const PAUSE_AFTER  = 1800 // ms to hold the completed phrase

    let localText     = ''
    let localDeleting = false
    let localIndex    = 0

    function tick() {
      const currentPhrase = phrases[localIndex]

      if (localDeleting) {
        localText = currentPhrase.substring(0, localText.length - 1)
        setDisplayText(localText)

        if (localText === '') {
          localDeleting = false
          localIndex = (localIndex + 1) % phrases.length
          setPhraseIndex(localIndex)
          setIsDeleting(false)
          timeoutRef.current = setTimeout(tick, TYPE_SPEED)
        } else {
          timeoutRef.current = setTimeout(tick, DELETE_SPEED)
        }
      } else {
        localText = currentPhrase.substring(0, localText.length + 1)
        setDisplayText(localText)

        if (localText === currentPhrase) {
          // Phrase fully typed
          if (!firstTypedRef.current) {
            firstTypedRef.current = true
            onFirstTyped?.()
          }
          // Pause, then start deleting
          localDeleting = true
          setIsDeleting(true)
          timeoutRef.current = setTimeout(tick, PAUSE_AFTER)
        } else {
          timeoutRef.current = setTimeout(tick, TYPE_SPEED)
        }
      }
    }

    timeoutRef.current = setTimeout(tick, TYPE_SPEED)

    return clearPending
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [introComplete, prefersReducedMotion])

  // Cleanup on unmount
  useEffect(() => clearPending, [clearPending])

  /* ── Reduced-motion: render first phrase immediately, no shift ─────────── */
  if (prefersReducedMotion) {
    return (
      <span className="text-accent" aria-label={phrases[0]}>
        {phrases[0]}
      </span>
    )
  }

  const currentFull = phrases[phraseIndex]

  return (
    <>
      {/* Screen-reader text: announce all options once */}
      <span className="sr-only">
        {phrases.slice(0, -1).join(', ')}, and {phrases[phrases.length - 1]}
      </span>

      {/*
       * Outer span: position:relative, height reserved by the invisible placeholder.
       * This is the key CLS fix — the container always has the height of the
       * longest phrase, regardless of what's currently typed.
       */}
      <span
        aria-hidden="true"
        className="relative inline-block text-accent"
        style={{ verticalAlign: 'baseline' }}
      >
        {/* Invisible placeholder — reserves max height/width, never collapses */}
        <span
          aria-hidden="true"
          className="invisible whitespace-nowrap"
          style={{ display: 'block', minWidth: '1ch' }}
        >
          {longestPhrase}
        </span>

        {/* Typed text — absolutely positioned over the placeholder */}
        <span
          className="absolute inset-0 flex items-center whitespace-nowrap"
          style={{ color: 'inherit' }}
        >
          {displayText}
          {/* Blinking cursor */}
          <motion.span
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, times: [0, 0.5, 0.5, 1] }}
            className="inline-block w-[3px] md:w-[5px] h-[0.85em] bg-accent ml-1 align-middle flex-shrink-0"
          />
        </span>
      </span>
    </>
  )
}
