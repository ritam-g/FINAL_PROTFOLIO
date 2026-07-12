import { profile } from "@/data/profile";

/**
 * Top status bar — "all systems operational" + location.
 * Fixed at the very top of the page.
 */
export default function StatusBar() {
  return (
    <div className="border-b" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="dot-live" />
          <span className="mono text-xs text-dim">all systems operational</span>
        </div>
        <div className="flex items-center gap-4 mono text-xs text-dim">
          <span>{profile.location}</span>
        </div>
      </div>
    </div>
  );
}
