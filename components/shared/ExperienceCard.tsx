"use client";

import { motion } from "framer-motion";
import { ExperienceEntry } from "@/types";
import { fadeInUp } from "@/lib/utils/animations";

interface ExperienceCardProps {
  entry: ExperienceEntry;
}

export function ExperienceCard({ entry }: ExperienceCardProps) {
  const isPresent = entry.period.toLowerCase().includes("present");

  return (
    <motion.div variants={fadeInUp} className="relative pl-8 md:pl-0">
      {/* Timeline line and dot (Mobile only, on desktop we might use a different layout, but let's keep it consistent) */}
      <div className="md:hidden absolute left-0 top-1.5 bottom-0 w-px bg-border">
        <div
          className={`absolute left-[-4px] top-0 h-2 w-2 rounded-full border-2 ${
            isPresent
              ? "bg-success border-success animate-pulse"
              : "bg-surface border-muted"
          }`}
        />
      </div>

      <div className="md:grid md:grid-cols-[200px_1fr] md:gap-8 items-baseline">
        <div className="mb-2 md:mb-0 relative">
          {/* Desktop timeline line and dot */}
          <div className="hidden md:block absolute right-[-17px] top-2 bottom-[-2rem] w-px bg-border">
            <div
              className={`absolute left-[-4px] top-0 h-2 w-2 rounded-full border-2 ${
                isPresent
                  ? "bg-success border-success animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                  : "bg-surface border-muted"
              }`}
            />
          </div>
          <span className="text-sm font-mono text-muted block md:text-right pr-8">
            {entry.period}
          </span>
        </div>

        <div className="pb-12">
          <h3 className="text-lg font-bold text-primary">{entry.role}</h3>
          <p className="text-accent font-medium mb-4">{entry.company}</p>
          
          {entry.description && (
            <p className="text-muted text-sm mb-4">{entry.description}</p>
          )}
          
          <ul className="space-y-2">
            {entry.points.map((point, i) => (
              <li key={i} className="text-sm text-muted flex gap-3 items-start">
                <span className="text-border mt-1.5 h-1.5 w-1.5 rounded-full bg-muted flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
