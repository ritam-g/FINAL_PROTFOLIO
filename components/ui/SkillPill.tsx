import type { SkillPillProps } from "@/types";

/**
 * Single skill pill. Renders as a production (green) or learning (amber dashed) pill.
 */
export default function SkillPill({ label, variant }: SkillPillProps) {
  const className = variant === "production" ? "pill-prod" : "pill-learn";

  return (
    <span className={`${className} px-3 py-1.5 rounded-md`}>{label}</span>
  );
}
