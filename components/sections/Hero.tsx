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
  "Problem Solver"
];

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? {} : staggerContainer;
  const itemVariants = prefersReducedMotion ? {} : fadeInUp;

  return (
    <section id="hero" className="relative flex flex-col justify-center mx-auto px-6 pt-20 max-w-6xl min-h-[100svh]">
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
          <Badge variant="success" className="slide-in-from-bottom-2 animate-in duration-700 fade-in">
            <span className="bg-success shadow-[0_0_8px_rgba(34,197,94,0.8)] mr-1.5 rounded-full w-2 h-2 animate-pulse" />
            Open to opportunities
          </Badge>
        </motion.div>

        <motion.h1 variants={itemVariants} className="mb-6 font-bold text-primary text-5xl md:text-7xl lg:text-8xl tracking-tighter">
          Hi, I&apos;m {profile.name.split(" ")[0]}.<br />
          <span className="block mt-2 min-h-[3em] sm:min-h-[2em] lg:min-h-0 text-muted text-4xl md:text-6xl lg:text-7xl">
            I build <TypingHeadline phrases={HEADLINE_PHRASES} />
          </span>

        </motion.h1>

        <motion.p variants={itemVariants} className="mb-10 max-w-2xl text-muted text-lg md:text-xl text-balance leading-relaxed">
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
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="-m-2 p-2 hover:text-primary hover:scale-110 active:scale-95 transition-all duration-200" aria-label="GitHub">
            <Github size={24} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="-m-2 p-2 hover:text-primary hover:scale-110 active:scale-95 transition-all duration-200" aria-label="LinkedIn">
            <Linkedin size={24} />
          </a>
          <a href={profile.leetcode} target="_blank" rel="noopener noreferrer" className="-m-2 p-2 hover:text-primary hover:scale-110 active:scale-95 transition-all duration-200" aria-label="LeetCode">
            <Code2 size={24} />
          </a>
          <a href={`mailto:${profile.email}`} className="-m-2 p-2 hover:text-primary hover:scale-110 active:scale-95 transition-all duration-200" aria-label="Email">
            <Mail size={24} />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="bottom-12 left-6 md:left-1/2 absolute md:-translate-x-1/2"
      >
        <a href="#about" aria-label="Scroll down to About section" className="flex flex-col items-center gap-2 text-muted hover:text-accent transition-colors">
          <span className="hidden md:block font-mono text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown size={20} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
