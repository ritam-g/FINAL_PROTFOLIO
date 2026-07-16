"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { fadeInUp } from "@/lib/utils/animations";

export function About() {
  return (
    <SectionWrapper id="about">
      <SectionHeading title="About Me" subtitle="Who I am" />
      
      <div className="items-start gap-12 grid md:grid-cols-[1fr_300px]">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="prose-invert mb-8 text-muted text-balance leading-relaxed prose">
            <p className="mb-4">
              I am a Backend and Full-Stack Engineer with a strong focus on distributed architectures, cloud-native microservices, and AI/LLM integrations. I specialize in building highly scalable, fault-tolerant systems that power real-time applications and robust APIs.
            </p>
            <p className="mb-4">
              My engineering philosophy revolves around performance optimization, robust error handling, and clean, maintainable code. Whether it&apos;s architecting a multi-tenant platform with RBAC or streaming AI code suggestions via SSE, I thrive on solving complex technical challenges.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="bg-surface px-4 py-2 border border-border-color rounded-md">
              <span className="font-bold text-accent">2+</span> Projects in Production
            </div>
            <div className="bg-surface px-4 py-2 border border-border-color rounded-md">
              <span className="font-bold text-accent">3+</span> AI Systems Built
            </div>
            <div className="flex items-center gap-2 bg-surface px-4 py-2 border border-border-color rounded-md font-medium text-primary">
              <span className="bg-success rounded-full w-2 h-2 animate-pulse" />
              Currently @ iPROTECHS
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={fadeInUp} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          className="group hidden md:block relative"
        >
          {/* Subtle glow behind the image */}
          <div className="absolute inset-0 bg-accent opacity-20 group-hover:opacity-30 blur-2xl rounded-xl transition-opacity duration-500" />
          <div className="relative bg-surface border border-border-color rounded-xl aspect-square overflow-hidden">
            <Image
              src="/ritam.png"
              alt="Ritam Maty"
              fill
              className="grayscale hover:grayscale-0 object-cover transition-all duration-500"
              sizes="(max-width: 768px) 100vw, 300px"
              priority
            />
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
