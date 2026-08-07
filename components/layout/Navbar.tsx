'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { navigation } from '@/lib/constants/navigation'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useLenis } from '@/components/providers/SmoothScrollProvider'
import { cn } from '@/lib/utils/cn'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Magnetic } from '@/components/ui/Magnetic'

/* ─── Mobile drawer animation ────────────────────────────────────────────── */
const drawerVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.15, ease: 'easeIn' as const },
  },
}

const drawerItemVariants = {
  hidden:   { opacity: 0, x: -8 },
  visible:  { opacity: 1, x: 0, transition: { duration: 0.2 } },
}

export function Navbar() {
  const [isScrolled, setIsScrolled]       = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const lenis = useLenis()

  const sectionIds  = navigation.map((item) => item.href.replace('#', ''))
  const activeSection = useActiveSection(sectionIds, 0.5)

  // Scroll progress bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close drawer on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [mobileMenuOpen])

  /**
   * Navigate with Lenis smooth scroll if available.
   * Falls back to native anchor behaviour when Lenis isn't active
   * (reduced-motion path) so hash navigation still works.
   */
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!lenis) return // native scroll takes over
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.2 })
      }
      setMobileMenuOpen(false)
    },
    [lenis]
  )

  return (
    <header
      className={cn(
        'top-0 right-0 left-0 z-50 fixed transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border-color py-4'
          : 'bg-transparent py-6'
      )}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="top-0 right-0 left-0 z-50 absolute bg-accent h-[2px] origin-left"
        style={{ scaleX }}
      />

      <div className="flex justify-between items-center mx-auto px-6 max-w-6xl">
        {/* Logotype — Space Grotesk now correctly loaded */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="font-heading font-bold text-primary text-xl tracking-tighter hover:text-accent transition-colors duration-200"
        >
          RM.
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          <ul className="flex items-center gap-6" role="list">
            {navigation.map((item) => {
              const id       = item.href.replace('#', '')
              const isActive = activeSection === id

              return (
                <li key={item.name} className="relative">
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      'py-2 font-medium hover:text-primary text-sm transition-colors duration-150',
                      isActive ? 'text-accent' : 'text-muted'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="right-0 -bottom-1 left-0 absolute bg-accent rounded-full h-[2px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </li>
              )
            })}
          </ul>
          <Magnetic>
            <Button asChild variant="outline" size="sm">
              <a href="/RESUME.pdf" download aria-label="Download resume PDF">
                Resume
              </a>
            </Button>
          </Magnetic>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden relative -mr-2 p-2 text-muted hover:text-primary transition-colors duration-150"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Animated Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav"
            role="navigation"
            aria-label="Mobile navigation"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden top-full right-0 left-0 absolute flex flex-col gap-4 bg-surface shadow-xl px-6 py-5 border-b border-border-color"
          >
            <ul className="flex flex-col gap-1" role="list">
              {navigation.map((item, i) => {
                const id       = item.href.replace('#', '')
                const isActive = activeSection === id

                return (
                  <motion.li
                    key={item.name}
                    variants={drawerItemVariants}
                    custom={i}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => { handleNavClick(e, item.href); setMobileMenuOpen(false) }}
                      className={cn(
                        'block py-2.5 border-b border-border-color/40 font-medium text-base transition-colors',
                        isActive ? 'text-accent' : 'text-muted hover:text-primary'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  </motion.li>
                )
              })}
            </ul>
            <Button asChild variant="primary" size="sm" className="mt-2 w-full">
              <a
                href="/RESUME.pdf"
                download
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Download resume PDF"
              >
                Download Resume
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
