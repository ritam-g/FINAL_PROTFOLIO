import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/layout/Eyebrow";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";
import { SECTION_IDS } from "@/lib/constants";

/**
 * Projects section — 2-column grid of ProjectCard components.
 */
export default function Projects() {
  return (
    <section id={SECTION_IDS.PROJECTS} className="max-w-5xl mx-auto px-6 py-14">
      <Reveal>
        <Eyebrow>projects</Eyebrow>
        <h2 className="display text-2xl font-semibold mb-8">Service registry</h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <Reveal key={project.name} delay={index * 80}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
