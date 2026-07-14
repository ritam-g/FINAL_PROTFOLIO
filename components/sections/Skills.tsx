"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/constants/skills";
import { SkillCategory } from "@/types";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

export function Skills() {
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, typeof skills>);

  const categories = Object.keys(groupedSkills) as SkillCategory[];

  return (
    <SectionWrapper id="skills">
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
            <h3 className="text-lg font-bold text-primary mb-4 border-b border-border pb-2">
              {category}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {groupedSkills[category].map((skill) => (
                <li
                  key={skill.name}
                  className="bg-surface border border-border text-muted px-3 py-1.5 rounded-full text-sm font-medium hover:border-accent/50 hover:text-primary transition-colors"
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
