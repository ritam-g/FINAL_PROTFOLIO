import type { ExperienceEntry } from "@/types";

export const experience: ExperienceEntry[] = [
  {
    company: "iPROTECHS Commercial Solutions",
    role: "Junior Software Engineer — Node.js",
    period: "Jun 2026 — Present",
    points: [
      "Layered request validation & centralized error-handling middleware across REST APIs",
      "MongoDB schemas with compound indexes for high-read workloads",
      "OAuth-based third-party integrations with retry-with-backoff recovery"
    ]
  },
  {
    company: "Freelance",
    role: "Full-Stack Developer",
    period: "Remote",
    points: [
      "Bavesta's Hotel & Restaurant — production hospitality platform, live bookings",
      "Razorpay HMAC-verified payments preventing double-booking & fraud",
      "JWT + RBAC admin panel for inventory & reservation control"
    ]
  }
];
