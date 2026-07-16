import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "datanest-ai",
    title: "DataNest AI",
    description: "RAG document intelligence platform — adaptive chunking, dual-LLM inference, D3 usage analytics.",
    tech: ["Pinecone", "Redis", "Mistral AI", "Gemini", "D3.js"],
    liveUrl: "https://datanest-ai.onrender.com/",
    featured: true,
    tags: ["AI/LLM", "Full-Stack"],
    highlights: ["Full ownership", "Live status"]
  },
  {
    id: "doramon-ai",
    title: "Doramon AI",
    description: "Multi-user RAG chat platform with room-scoped real-time sessions and citation-traceable answers.",
    tech: ["Socket.IO", "Pinecone", "Redis", "JWT"],
    liveUrl: "https://doramon-0z44.onrender.com/",
    featured: true,
    tags: ["AI/LLM", "Full-Stack"],
    highlights: ["Full ownership", "Live status"]
  },
  {
    id: "cloud-ide",
    title: "Cloud IDE",
    description: "K8s-orchestrated per-session dev sandboxes with SSE-streamed AI code assistance.",
    tech: ["Kubernetes", "Docker", "LangChain", "Nginx"],
    githubUrl: "https://github.com/ritam-g/Cloud-IDE-_-Kubernetes-Based-Development-Environment",
    featured: true,
    tags: ["DevOps", "AI/LLM"],
    highlights: ["Full ownership", "Local status"]
  }
];
