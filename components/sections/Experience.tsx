import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/layout/Eyebrow";
import ExperienceItem from "@/components/ui/ExperienceItem";
import { experience } from "@/data/experience";
import { SECTION_IDS } from "@/lib/constants";

/**
 * Experience section — timeline of roles, rendered as individual ExperienceItem cards.
 */
export default function Experience() {
  return (
    <section id={SECTION_IDS.EXPERIENCE} className="max-w-5xl mx-auto px-6 py-14">
      <Reveal>
        <Eyebrow>experience</Eyebrow>
        <h2 className="display text-2xl font-semibold mb-8">Timeline</h2>
      </Reveal>

      <div className="space-y-8">
        {experience.map((entry, index) => (
          <Reveal key={entry.company} delay={index * 100}>
            <ExperienceItem entry={entry} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
