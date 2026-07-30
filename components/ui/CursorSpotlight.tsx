"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * A fixed-position, pointer-events-none radial-gradient that follows the cursor.
 *
 * Implementation notes:
 * - Updates CSS custom properties on the <div> element directly via rAF — zero React
 *   state re-renders on mousemove.
 * - Disabled entirely on touch/non-pointer devices via CSS `@media (hover: hover) and
 *   (pointer: fine)`.
 * - Disabled entirely under prefers-reduced-motion.
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Don't attach any listener if reduced motion is preferred
    if (prefersReducedMotion) return;

    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      if (rafId.current !== null) return; // already have a frame pending
      rafId.current = requestAnimationFrame(() => {
        el.style.setProperty("--x", `${e.clientX}px`);
        el.style.setProperty("--y", `${e.clientY}px`);
        rafId.current = null;
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="cursor-spotlight"
      style={
        {
          "--x": "-9999px",
          "--y": "-9999px",
        } as React.CSSProperties
      }
    />
  );
}
