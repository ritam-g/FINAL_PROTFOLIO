"use client";

import { useReveal } from "@/hooks/useReveal";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
}

/**
 * Scroll-reveal wrapper. Fades + slides children into view when they
 * enter the viewport, using the useReveal IntersectionObserver hook.
 */
export default function Reveal({ children, delay = 0 }: RevealProps) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`
      }}
    >
      {children}
    </div>
  );
}
