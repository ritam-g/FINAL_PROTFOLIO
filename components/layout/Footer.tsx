import { profile } from '@/data/profile'
import { Github, Linkedin, Mail } from 'lucide-react'
import { navigation } from '@/lib/constants/navigation'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border-color bg-background mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-3">

        {/* Brand */}
        <div>
          <span className="font-heading font-bold text-xl tracking-tighter text-primary mb-3 block">
            RM.
          </span>
          <p className="text-xs text-muted leading-relaxed max-w-xs mb-4">
            Backend &amp; Full-Stack Engineer — distributed systems, AI/LLM, cloud-native.
          </p>
          {/* System status footer line */}
          <div className="font-mono text-[10px] text-fog flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
            <span>status: open · {profile.location}</span>
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer navigation">
          <h4 className="font-bold text-primary text-sm mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-muted hover:text-accent transition-colors duration-150 font-mono text-xs"
                >
                  <span className="text-accent-dim mr-1.5">//</span>
                  {item.name.toLowerCase()}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Connect */}
        <div>
          <h4 className="font-bold text-primary text-sm mb-4">Connect</h4>
          <div className="flex gap-4 mb-5">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary transition-colors duration-150"
              aria-label="GitHub profile"
            >
              <Github size={18} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary transition-colors duration-150"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-muted hover:text-primary transition-colors duration-150"
              aria-label="Send email"
            >
              <Mail size={18} />
            </a>
          </div>
          <p className="font-mono text-[10px] text-fog">
            © {year} {profile.name}
          </p>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-border-color/40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-mono text-[10px] text-fog/60">
            built · next.js + tailwind + gsap + framer-motion
          </span>
          <span className="font-mono text-[10px] text-fog/60">
            v1.0.0
          </span>
        </div>
      </div>
    </footer>
  )
}
