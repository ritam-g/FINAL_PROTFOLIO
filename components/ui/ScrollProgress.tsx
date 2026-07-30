"use client";

import { useScroll, useSpring, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Thin scroll-progress bar fixed to the top of the viewport.
 * - Uses Framer Motion's useScroll + useSpring for a silky feel.
 * - Under prefers-reduced-motion: drops the spring, binds directly to scrollYProgress.
 * - z-index 60 — above the Navbar (z-50 convention) so it's always visible.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  // Under reduced motion: no spring, just direct bind
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  const progress = prefersReducedMotion ? scrollYProgress : smoothProgress;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX: progress,
        transformOrigin: "left",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        zIndex: 60,
        backgroundColor: "var(--accent-green)",
        boxShadow: "0 0 8px var(--color-accent-glow)",
      }}
    />
  );
}
