"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { skills } from "@/lib/constants/skills";
import { SkillCategory } from "@/types";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { fadeInUp } from "@/lib/utils/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, typeof skills>);

  const categories = Object.keys(groupedSkills) as SkillCategory[];

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.fromTo(
      ".skill-pill",
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: 0.015,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <SectionWrapper id="skills">
      <div ref={containerRef}>
        <SectionHeading title="Skills & Technologies" subtitle="My toolbox" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, idx) => (
            <motion.div
              key={category}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h3 className="text-lg font-bold text-primary mb-4 border-b border-border-color pb-2">
                {category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {groupedSkills[category].map((skill) => (
                  <li
                    key={skill.name}
                    className="skill-pill bg-surface border border-border-color text-muted px-3 py-1.5 rounded-full text-sm font-medium hover:border-accent/50 hover:text-primary transition-colors"
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

