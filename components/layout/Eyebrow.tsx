import { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
}

/**
 * Reusable "service/xxx" label shown above each section heading.
 * Renders a pulsing green dot + monospaced "service/{children}" text.
 */
export default function Eyebrow({ children }: EyebrowProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="dot-live" />
      <span
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
        className="text-xs tracking-widest uppercase text-dim"
      >
        service/{children}
      </span>
    </div>
  );
}
