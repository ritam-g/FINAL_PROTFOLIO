"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TraceLineProps {
  /** Labels shown below the trace line, evenly distributed left-to-right */
  nodes: readonly string[];
}

/**
 * The signature animated trace/node element.
 * A thin horizontal line with a glowing green dot that travels across it,
 * plus monospaced node labels below.
 *
 * Used in both Hero and Contact sections with different node arrays.
 */
export default function TraceLine({ nodes }: TraceLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.fromTo(
      lineRef.current,
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          end: "bottom 75%",
          scrub: true,
        },
      }
    );
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <div ref={containerRef}>
      <div ref={lineRef} className="trace-line" />
      <div className="flex justify-between mt-2">
        {nodes.map((node) => (
          <span key={node} className="node-label">
            {node}
          </span>
        ))}
      </div>
    </div>
  );
}

