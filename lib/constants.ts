/** Section IDs for scroll-anchor links */
export const SECTION_IDS = {
  PROJECTS: "projects",
  SKILLS: "skills",
  EXPERIENCE: "experience",
  ACHIEVEMENTS: "achievements",
  CONTACT: "contact"
} as const;

/** Hero trace-line node labels */
export const HERO_NODES = ["auth", "api-gateway", "rag-pipeline", "vector-search", "render"] as const;

/** Contact trace-line node labels (reuses same element with different nodes) */
export const CONTACT_NODES = HERO_NODES;
