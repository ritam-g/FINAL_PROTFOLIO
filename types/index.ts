export interface NavigationItem {
  name: string;
  href: string;
}

export type ProjectTag = "AI/LLM" | "Full-Stack" | "DevOps";

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  tags: ProjectTag[];
  highlights: string[];
}

export interface ExperienceEntry {
  id?: string;
  company: string;
  role: string;
  period: string;
  description?: string;
  points: string[];
  logo?: string;
}

export type SkillCategory = "Languages" | "Frontend" | "Backend" | "Databases" | "AI/LLM" | "Cloud & DevOps";

export interface Skill {
  name: string;
  category: SkillCategory;
}

export interface Profile {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  leetcode: string;
  githubUsername: string;
  location: string;
  now?: string;
}
