import { ChevronRight, Download, Github } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/layout/Eyebrow";
import TraceLine from "@/components/sections/TraceLine";
import { profile } from "@/data/profile";
import { HERO_NODES, SECTION_IDS } from "@/lib/constants";

/**
 * Hero section — name, tagline, CTA buttons, and the signature trace line.
 */
export default function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
      <Reveal>
        <Eyebrow>identity</Eyebrow>
        <h1
          className="display"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.2rem)",
            fontWeight: 700,
            lineHeight: 1.05
          }}
        >
          {profile.name}
        </h1>
        <p className="mt-4 text-lg text-dim max-w-xl">{profile.tagline}</p>

        <div className="flex flex-wrap gap-3 mt-8">
          <a
            href={`#${SECTION_IDS.PROJECTS}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-md mono text-sm"
            style={{
              background: "var(--accent-green)",
              color: "#08110C",
              fontWeight: 500
            }}
          >
            View projects <ChevronRight size={14} />
          </a>

          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-4 py-2.5 rounded-md mono text-sm card"
          >
            <Download size={14} /> Resume
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
      </Reveal>

      {/* Signature trace element */}
      <div className="mt-16">
        <TraceLine nodes={HERO_NODES} />
      </div>
    </section>
  );
}
