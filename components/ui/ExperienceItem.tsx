import { Circle } from "lucide-react";
import type { ExperienceEntry } from "@/types";

interface ExperienceItemProps {
  entry: ExperienceEntry;
}

/**
 * Single experience timeline entry. Renders the role, company, period,
 * and bullet points for one job/position.
 */
export default function ExperienceItem({ entry }: ExperienceItemProps) {
  return (
    <div
      className="grid md:grid-cols-[180px_1fr] gap-4 pb-8 border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="mono text-xs text-dim">{entry.period}</div>
      <div>
        <h3 className="font-semibold text-base">{entry.role}</h3>
        <p className="text-dim text-sm mb-3">{entry.company}</p>
        <ul className="space-y-1.5">
          {entry.points.map((point) => (
            <li key={point} className="text-sm text-dim flex gap-2">
              <Circle
                size={5}
                className="mt-2 flex-shrink-0"
                style={{ fill: "var(--accent-green)", color: "var(--accent-green)" }}
              />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
