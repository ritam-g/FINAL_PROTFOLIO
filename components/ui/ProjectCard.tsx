import { Circle, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

/**
 * Single project card. Displays name, live/local status badge, description,
 * role, optional note, stack pills, and a live link if available.
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="card rounded-lg p-5 h-full flex flex-col">
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold display text-lg">{project.name}</h3>
        <span
          className={`mono text-xs flex items-center gap-1.5 status-pill-${project.status}`}
        >
          <Circle size={7} style={{ fill: "currentColor" }} />
          {project.status === "live" ? "live" : "local only"}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-dim mb-3">{project.desc}</p>

      {/* Role */}
      <p className="mono text-xs text-dim mb-4">role: {project.role}</p>

      {/* Optional hackathon note */}
      {project.note && (
        <p className="mono text-xs mb-4" style={{ color: "var(--accent-amber)" }}>
          {project.note}
        </p>
      )}

      {/* Stack pills */}
      <div className="flex flex-wrap gap-1.5 mt-auto mb-4">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="mono text-xs px-2 py-1 rounded"
            style={{
              background: "rgba(232,234,237,0.05)",
              color: "var(--text-dim)"
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Link logic */}
      {project.link ? (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 mono text-xs"
          style={{ color: "var(--accent-green)" }}
        >
          View live <ExternalLink size={12} />
        </a>
      ) : project.githubLink ? (
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 mono text-xs"
          style={{ color: "var(--accent-green)" }}
        >
          View code <Github size={12} />
        </a>
      ) : null}
    </div>
  );
}
