"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
}

/**
 * Reusable animated numeric counter that tweens from 0 to the target value
 * on viewport entry. Uses GSAP ScrollTrigger and respects prefers-reduced-motion.
 */
export function CountUp({ end, duration = 1.2, suffix = "" }: CountUpProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    const el = elementRef.current;
    if (!el) return;

    if (prefersReducedMotion) {
      el.textContent = `${end}${suffix}`;
      return;
    }

    const obj = { val: 0 };

    gsap.to(obj, {
      val: end,
      duration: duration,
      ease: "power1.out",
      scrollTrigger: {
        trigger: el,
        start: "top 95%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        el.textContent = `${Math.floor(obj.val)}${suffix}`;
      },
    });
  }, { scope: elementRef, dependencies: [end, duration, suffix, prefersReducedMotion] });

  return <span ref={elementRef}>{prefersReducedMotion ? `${end}${suffix}` : "0"}</span>;
}
