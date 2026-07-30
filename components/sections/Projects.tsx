"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { projects } from "@/lib/constants/projects";
import { type ProjectTag } from "@/types";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FILTERS: (ProjectTag | "All")[] = ["All", "AI/LLM", "Full-Stack", "DevOps"];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectTag | "All">("All");
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const filteredProjects = projects.filter((project) =>
    activeFilter === "All" ? true : project.tags.includes(activeFilter as ProjectTag)
  );

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.fromTo(
      ".project-card-wrapper",
      {
        opacity: 0,
        y: 30,
        scale: 0.96,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <SectionWrapper id="projects">
      <div ref={containerRef}>
        <SectionHeading title="Featured Projects" subtitle="What I've built" />
        
        {/* Filter Row */}
        <div className="flex flex-wrap gap-2 mb-12">
          {FILTERS.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "primary" : "surface" as any}
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
              <div
                key={project.id}
                className={cn(
                  "project-card-wrapper h-full",
                  project.featured ? "md:col-span-2" : ""
                )}
              >
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <ProjectCard project={project} />
                </motion.div>
              </div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

