import { Terminal } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/layout/Eyebrow";
import { SECTION_IDS } from "@/lib/constants";

/**
 * Achievements section — hackathon recognition card.
 * When adding more achievements, extend the achievements array here or
 * move it to data/achievements.ts following the same pattern.
 */
export default function Achievements() {
  return (
    <section id={SECTION_IDS.ACHIEVEMENTS} className="max-w-5xl mx-auto px-6 py-14">
      <Reveal>
        <Eyebrow>achievements</Eyebrow>
        <div className="card rounded-lg p-5 flex items-center gap-4">
          <Terminal size={20} style={{ color: "var(--accent-green)" }} />
          <div>
            <p className="font-medium text-sm">
              Top 15 — Sheryians Coding School Hackathon
            </p>
            <p className="text-xs text-dim">Team CodeBlooded · Built AlertForge</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
