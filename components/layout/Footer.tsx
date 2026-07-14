import { profile } from "@/data/profile";
import { Github, Linkedin, Mail } from "lucide-react";
import { navigation } from "@/lib/constants/navigation";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid gap-8 md:grid-cols-3">
        <div>
          <span className="font-heading font-bold text-xl tracking-tighter text-primary mb-4 block">
            RM.
          </span>
          <p className="text-sm text-muted max-w-xs">
            Backend and Full-Stack Engineer specializing in distributed systems, AI/LLM applications, and cloud-native microservices.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-primary mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted">
            {navigation.map((item) => (
              <li key={item.name}>
                <a href={item.href} className="hover:text-accent transition-colors">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-primary mb-4">Connect</h4>
          <div className="flex gap-4 mb-6">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${profile.email}`} className="text-muted hover:text-primary transition-colors" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-border/50 text-center text-xs text-muted/50">
        Built with Next.js & Tailwind CSS. Designed for performance and accessibility.
      </div>
    </footer>
  );
}
