"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/constants/projects";
import { type ProjectTag } from "@/types";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Button } from "@/components/ui/Button";

const FILTERS: (ProjectTag | "All")[] = ["All", "AI/LLM", "Full-Stack", "DevOps"];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectTag | "All">("All");

  const filteredProjects = projects.filter((project) =>
    activeFilter === "All" ? true : project.tags.includes(activeFilter as ProjectTag)
  );

  return (
    <SectionWrapper id="projects">
      <SectionHeading title="Featured Projects" subtitle="What I've built" />
      
      {/* Filter Row */}
      <div className="flex flex-wrap gap-2 mb-12">
        {FILTERS.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "primary" : "surface" as any} // 'surface' isn't explicitly typed, using 'secondary' is better
            className={activeFilter === filter ? "" : "bg-surface text-muted hover:text-primary"}
            size="sm"
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={project.featured ? "md:col-span-2" : ""}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
}
