import type { Project } from "@/types";

export const projects: Project[] = [
  {
    name: "DataNest AI",
    status: "live",
    role: "Full ownership",
    desc: "RAG document intelligence platform — adaptive chunking, dual-LLM inference, D3 usage analytics.",
    stack: ["Pinecone", "Redis", "Mistral AI", "Gemini", "D3.js"],
    link: "https://datanest-ai.onrender.com/"
  },
  {
    name: "Doramon AI",
    status: "live",
    role: "Full ownership",
    desc: "Multi-user RAG chat platform with room-scoped real-time sessions and citation-traceable answers.",
    stack: ["Socket.IO", "Pinecone", "Redis", "JWT"],
    link: "https://doramon-0z44.onrender.com/"
  },
  {
    name: "Cloud IDE",
    status: "local",
    role: "Full ownership",
    desc: "K8s-orchestrated per-session dev sandboxes with SSE-streamed AI code assistance.",
    stack: ["Kubernetes", "Docker", "LangChain", "Nginx"],
    githubLink: "https://github.com/ritam-g/Cloud-IDE-_-Kubernetes-Based-Development-Environment"
  }
];
