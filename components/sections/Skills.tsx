import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/layout/Eyebrow";
import SkillPill from "@/components/ui/SkillPill";
import { skillsData } from "@/data/skills";
import { SECTION_IDS } from "@/lib/constants";

/**
 * Skills section — production skills grid + "currently building toward" learning pills.
 */
export default function Skills() {
  return (
    <section id={SECTION_IDS.SKILLS} className="max-w-5xl mx-auto px-6 py-14">
      <Reveal>
        <Eyebrow>skills</Eyebrow>
        <h2 className="display text-2xl font-semibold mb-6">
          What&apos;s running in production
        </h2>

        <div className="flex flex-wrap gap-2 mb-8">
          {skillsData.production.map((skill) => (
            <SkillPill key={skill} label={skill} variant="production" />
          ))}
        </div>

        <p className="mono text-xs text-dim mb-3 uppercase tracking-widest">
          currently building toward
        </p>

        <div className="flex flex-wrap gap-2">
          {skillsData.learning.map((skill) => (
            <SkillPill key={skill} label={skill} variant="learning" />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
