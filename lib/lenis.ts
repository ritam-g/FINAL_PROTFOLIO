import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let lenisInstance: Lenis | null = null

/**
 * Creates (or returns existing) Lenis smooth-scroll instance,
 * wires it into GSAP's ticker, and sets up the ScrollTrigger
 * scrollerProxy so scrub/pin animations stay in sync.
 *
 * Must only be called client-side (after mount).
 */
export function createLenis(): Lenis {
  if (lenisInstance) return lenisInstance

  if (typeof window === 'undefined') {
    throw new Error('createLenis() must be called client-side only.')
  }

  gsap.registerPlugin(ScrollTrigger)

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  })

  // Wire Lenis RAF into GSAP ticker so both run in sync
  gsap.ticker.add((time) => {
    lenisInstance!.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  // scrollerProxy: GSAP ScrollTrigger reads scroll position from Lenis
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value?: number) {
      if (arguments.length && value !== undefined) {
        lenisInstance!.scrollTo(value, { immediate: true })
      }
      return lenisInstance!.scroll
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    },
    pinType: document.body.style.transform ? 'transform' : 'fixed',
  })

  // Refresh ScrollTrigger whenever Lenis scrolls
  lenisInstance.on('scroll', ScrollTrigger.update)

  return lenisInstance
}

/** Destroy the Lenis instance (called on unmount) */
export function destroyLenis(): void {
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
  gsap.ticker.remove((time) => {
    lenisInstance?.raf(time * 1000)
  })
}

export type { Lenis }
