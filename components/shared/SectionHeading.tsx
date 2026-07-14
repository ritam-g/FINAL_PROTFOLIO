"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/utils/animations";
import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={cn("mb-12 md:mb-16", className)}
    >
      {subtitle && (
        <span className="text-accent text-sm font-mono tracking-widest uppercase mb-3 block">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary">
        {title}
      </h2>
    </motion.div>
  );
}
