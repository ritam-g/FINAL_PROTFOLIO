"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TypingHeadlineProps {
  phrases: string[];
}

export function TypingHeadline({ phrases }: TypingHeadlineProps) {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || phrases.length === 0) return;

    const currentPhrase = phrases[index];
    
    // Slight randomization for natural typing feel
    const typeSpeed = 45 + Math.random() * 20; // ~45-65ms
    const deleteSpeed = 25 + Math.random() * 10; // ~25-35ms
    const pauseDuration = 1800;

    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (text === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % phrases.length);
        // Small pause before typing next word
        timeout = setTimeout(() => {}, typeSpeed);
      } else {
        timeout = setTimeout(() => {
          setText(currentPhrase.substring(0, text.length - 1));
        }, deleteSpeed);
      }
    } else {
      if (text === currentPhrase) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      } else {
        timeout = setTimeout(() => {
          setText(currentPhrase.substring(0, text.length + 1));
        }, typeSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, phrases, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <span className="text-accent">{phrases[0]}</span>;
  }

  // Create natural-sounding full text for screen readers
  const srText = phrases.length > 1 
    ? phrases.slice(0, -1).join(", ") + ", and " + phrases[phrases.length - 1]
    : phrases[0];

  return (
    <>
      <span className="sr-only">{srText}</span>
      <span aria-hidden="true" className="text-accent relative inline-block">
        {text}
        <motion.span
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, times: [0, 0.5, 0.5, 1] }}
          className="inline-block w-[4px] md:w-[6px] h-[0.9em] bg-accent ml-1 align-baseline -mb-[1px]"
        />
      </span>
    </>
  );
}
