'use client'

import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { Lenis } from '@/lib/lenis'

/* ─── Context ───────────────────────────────────────────────────────────────── */

const LenisContext = createContext<Lenis | null>(null)

/** Access the Lenis instance from anywhere in the tree (e.g. Navbar for scrollTo) */
export function useLenis() {
  return useContext(LenisContext)
}

/* ─── Provider ──────────────────────────────────────────────────────────────── */

interface SmoothScrollProviderProps {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const prefersReducedMotion = useReducedMotion()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // When the user prefers reduced motion, skip Lenis entirely.
    // Native scroll-behavior:auto takes over (set in globals.css).
    if (prefersReducedMotion) return

    let lenis: Lenis

    // Dynamic import keeps Lenis out of the SSR bundle
    import('@/lib/lenis').then(({ createLenis, destroyLenis }) => {
      lenis = createLenis()
      lenisRef.current = lenis

      return () => {
        destroyLenis()
        lenisRef.current = null
      }
    })

    return () => {
      // Cleanup if reduced-motion changes while mounted
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}
