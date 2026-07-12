import { Mail, Linkedin, Github } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/layout/Eyebrow";
import TraceLine from "@/components/sections/TraceLine";
import { profile } from "@/data/profile";
import { CONTACT_NODES, SECTION_IDS } from "@/lib/constants";

/**
 * Contact / Footer section — trace line, CTA links, and copyright.
 */
export default function Contact() {
  return (
    <section id={SECTION_IDS.CONTACT} className="max-w-5xl mx-auto px-6 py-16">
      <Reveal>
        {/* Reuses the same TraceLine element as Hero, with the same node labels */}
        <div className="mb-10">
          <TraceLine nodes={CONTACT_NODES} />
        </div>

        <Eyebrow>contact</Eyebrow>
        <h2 className="display text-2xl font-semibold mb-4">
          Open to opportunities
        </h2>

        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-md mono text-sm"
            style={{
              background: "var(--accent-green)",
              color: "#08110C",
              fontWeight: 500
            }}
          >
            <Mail size={14} /> {profile.email}
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-md mono text-sm card"
          >
            <Linkedin size={14} /> LinkedIn
          </a>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-md mono text-sm card"
          >
            <Github size={14} /> GitHub
          </a>
        </div>

        <p className="mono text-xs text-dim mt-12">
          © 2026 {profile.name.toLowerCase()} — built with next.js
        </p>
      </Reveal>
    </section>
  );
}
