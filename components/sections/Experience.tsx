"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/constants/experience";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ExperienceCard } from "@/components/shared/ExperienceCard";
import { staggerContainer } from "@/lib/utils/animations";

export function Experience() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading title="Experience" subtitle="Where I've worked" />
      
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-12 md:space-y-0"
      >
        {experience.map((entry) => (
          <ExperienceCard key={entry.id} entry={entry} />
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
