"use client";

import { useEffect, useRef, useState, RefObject } from "react";

/**
 * IntersectionObserver hook that returns a ref and a boolean indicating
 * whether the observed element has entered the viewport.
 * Once visible, it stays visible (no toggle back).
 */
export function useReveal(): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}
