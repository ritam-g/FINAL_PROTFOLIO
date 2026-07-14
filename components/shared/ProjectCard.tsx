"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "@/types";
import { cardHover, fadeInUp } from "@/lib/utils/animations";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <motion.div variants={fadeInUp} className={cn("h-full", className)}>
      <motion.div
        variants={cardHover}
        initial="rest"
        whileHover="hover"
        className="h-full"
      >
        <Card className="h-full flex flex-col p-6 transition-colors hover:border-accent/50 group overflow-hidden relative">
          {/* subtle hover glow */}
          <div className="absolute inset-0 bg-accent-glow opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <h3 className="text-xl font-bold text-primary mb-2">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="accent">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-3 text-muted">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  aria-label={`View ${project.title} source code on GitHub`}
                >
                  <Github size={20} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  aria-label={`View ${project.title} live project`}
                >
                  <ExternalLink size={20} />
                </a>
              )}
            </div>
          </div>

          <p className="text-muted text-sm leading-relaxed mb-6 relative z-10">
            {project.description}
          </p>

          <ul className="space-y-2 mb-6 relative z-10 flex-grow">
            {project.highlights.map((highlight, i) => (
              <li key={i} className="text-sm text-muted flex gap-2 items-start">
                <span className="text-accent mt-1 text-[10px]">▶</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mt-auto relative z-10">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono text-muted/80 bg-surface border border-border px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
