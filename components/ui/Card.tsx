"use client";

import { forwardRef, type HTMLAttributes, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const localRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useGSAP(() => {
      const card = localRef.current;
      if (!card || prefersReducedMotion) return;

      const isTouch = window.matchMedia("(hover: none)").matches;
      if (isTouch) return;

      const xTo = gsap.quickTo(card, "rotateY", { duration: 0.3, ease: "power2.out" });
      const yTo = gsap.quickTo(card, "rotateX", { duration: 0.3, ease: "power2.out" });

      const onMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const relX = (e.clientX - rect.left) / width - 0.5;
        const relY = (e.clientY - rect.top) / height - 0.5;

        const tiltMax = 5;
        xTo(relX * tiltMax);
        yTo(-relY * tiltMax);
      };

      const onMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      card.addEventListener("mousemove", onMouseMove);
      card.addEventListener("mouseleave", onMouseLeave);

      if (card.parentElement) {
        gsap.set(card.parentElement, { perspective: 1000 });
      }

      return () => {
        card.removeEventListener("mousemove", onMouseMove);
        card.removeEventListener("mouseleave", onMouseLeave);
      };
    }, { scope: localRef, dependencies: [prefersReducedMotion] });

    return (
      <div
        ref={(el) => {
          (localRef as any).current = el;
          if (ref) {
            if (typeof ref === "function") ref(el);
            else (ref as any).current = el;
          }
        }}
        className={cn(
          "rounded-xl border border-border-color bg-surface text-primary shadow-sm transition-all duration-200 hover:border-accent/50",
          className
        )}
        style={{
          transformStyle: "preserve-3d",
          ...props.style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export { Card };

