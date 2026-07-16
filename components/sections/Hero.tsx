"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Code2 } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TypingHeadline } from "@/components/ui/TypingHeadline";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

const HEADLINE_PHRASES = [
  "scalable AI systems.",
  "production-grade APIs.",
  "real-time infrastructure.",
  "RAG pipelines that don't hallucinate.",
];

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? {} : staggerContainer;
  const itemVariants = prefersReducedMotion ? {} : fadeInUp;

  return (
    <section id="hero" className="min-h-[100svh] flex flex-col justify-center relative px-6 max-w-6xl mx-auto pt-20">
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl"
      >
        <motion.div variants={itemVariants} className="mb-6 flex items-center gap-4">
          <Badge variant="success" className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            <span className="mr-1.5 h-2 w-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            Open to opportunities
          </Badge>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-primary mb-6">
          Hi, I&apos;m {profile.name.split(" ")[0]}.<br />
          <span className="text-muted text-4xl md:text-6xl lg:text-7xl block mt-2 min-h-[3em] sm:min-h-[2em] lg:min-h-0">
            I build <TypingHeadline phrases={HEADLINE_PHRASES} />
          </span>

        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted mb-10 max-w-2xl leading-relaxed text-balance">
          Backend & Full-Stack Engineer specializing in distributed architectures, LLM applications, and cloud-native microservices. 
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-12">
          <Button asChild size="lg">
            <a href="#projects">View Projects</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="/resume.pdf" download>
              Download Resume
            </a>
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center gap-6 text-muted">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:scale-110 active:scale-95" aria-label="GitHub">
            <Github size={24} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:scale-110 active:scale-95" aria-label="LinkedIn">
            <Linkedin size={24} />
          </a>
          <a href={profile.leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:scale-110 active:scale-95" aria-label="LeetCode">
            <Code2 size={24} />
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-primary transition-colors hover:scale-110 active:scale-95" aria-label="Email">
            <Mail size={24} />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-6 md:left-1/2 md:-translate-x-1/2"
      >
        <a href="#about" aria-label="Scroll down to About section" className="text-muted hover:text-accent transition-colors flex flex-col items-center gap-2">
          <span className="text-xs font-mono tracking-widest uppercase hidden md:block">Scroll</span>
          <ArrowDown size={20} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
