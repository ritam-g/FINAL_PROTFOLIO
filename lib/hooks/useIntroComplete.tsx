'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'

/* ─── Types ───────────────────────────────────────────────────────────────── */

interface IntroContextValue {
  introComplete: boolean
  setIntroComplete: () => void
}

/* ─── Context ─────────────────────────────────────────────────────────────── */

const IntroContext = createContext<IntroContextValue | null>(null)

/* ─── Provider ────────────────────────────────────────────────────────────── */

export function IntroProvider({ children }: { children: ReactNode }) {
  const [introComplete, setIntroCompleteState] = useState(false)

  useEffect(() => {
    // Skip animation if already shown in this browser session
    if (sessionStorage.getItem('intro_shown')) {
      setIntroCompleteState(true)
    }
  }, [])

  const setIntroComplete = () => {
    sessionStorage.setItem('intro_shown', '1')
    setIntroCompleteState(true)
  }

  return (
    <IntroContext.Provider value={{ introComplete, setIntroComplete }}>
      {children}
    </IntroContext.Provider>
  )
}

/* ─── Hook ────────────────────────────────────────────────────────────────── */

export function useIntroComplete(): IntroContextValue {
  const ctx = useContext(IntroContext)
  if (!ctx) {
    throw new Error('useIntroComplete must be used within <IntroProvider>')
  }
  return ctx
}
