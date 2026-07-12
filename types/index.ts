export interface Project {
  name: string;
  status: "live" | "local";
  role: string;
  desc: string;
  stack: string[];
  link: string;
  note?: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  points: string[];
}

export type SkillVariant = "production" | "learning";

export interface SkillPillProps {
  label: string;
  variant: SkillVariant;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
}
