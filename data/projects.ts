import type { Project } from "@/types";

export const projects: Project[] = [
  {
    name: "AlertForge",
    status: "live",
    role: "Frontend UI/animation + real-time layer",
    desc: "AI-powered incident orchestration platform — LangGraph postmortems, real-time war rooms, multi-tenant RBAC.",
    stack: ["React 19", "LangGraph", "Socket.IO", "Redis", "BullMQ"],
    link: "https://alertforge.onrender.com",
    note: "Top 15 — Sheryians Hackathon (Team CodeBlooded)"
  },
  {
    name: "DataNest AI",
    status: "live",
    role: "Full ownership",
    desc: "RAG document intelligence platform — adaptive chunking, dual-LLM inference, D3 usage analytics.",
    stack: ["Pinecone", "Redis", "Mistral AI", "Gemini", "D3.js"],
    link: "#"
  },
  {
    name: "Doramon AI",
    status: "live",
    role: "Full ownership",
    desc: "Multi-user RAG chat platform with room-scoped real-time sessions and citation-traceable answers.",
    stack: ["Socket.IO", "Pinecone", "Redis", "JWT"],
    link: "#"
  },
  {
    name: "Cloud IDE",
    status: "local",
    role: "Full ownership",
    desc: "K8s-orchestrated per-session dev sandboxes with SSE-streamed AI code assistance.",
    stack: ["Kubernetes", "Docker", "LangChain", "Nginx"],
    link: "#"
  }
];
