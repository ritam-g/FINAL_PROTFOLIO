import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "cloud-ide",
    title: "Cloud IDE",
    description:
      "Kubernetes-based cloud development environment with AI-assisted code editing and real-time terminal access.",
    tech: [
      "React",
      "Node.js",
      "Kubernetes",
      "Docker",
      "LangChain",
      "Mistral AI",
      "Socket.IO",
      "Nginx"
    ],
    githubUrl:
      "https://github.com/ritam-g/Cloud-IDE-_-Kubernetes-Based-Development-Environment",
    featured: true,
    tags: ["AI/LLM", "DevOps", "Full-Stack"],
    highlights: [
      "Architected 4-service microservices system with Kubernetes pod provisioning per user session",
      "Streamed AI code suggestions via SSE using LangChain + Mistral AI with sub-second latency",
      "Containerized with Docker multi-stage builds; ConfigMaps + Secrets for secure config management"
    ]
  },
  {
    id: "datanest-ai",
    title: "DataNest AI",
    description:
      "RAG document intelligence platform — adaptive chunking, dual-LLM inference, D3 usage analytics.",
    tech: ["Pinecone", "Redis", "Mistral AI", "Gemini", "D3.js"],
    liveUrl: "https://datanest-ai.onrender.com/",
    featured: false,
    tags: ["AI/LLM"],
    highlights: [
      "Implemented adaptive chunking for document intelligence",
      "Integrated dual-LLM inference for better accuracy",
      "Added D3 usage analytics"
    ]
  },
  {
    id: "doramon-ai",
    title: "Doramon AI",
    description:
      "Multi-user RAG chat platform with room-scoped real-time sessions and citation-traceable answers.",
    tech: ["Socket.IO", "Pinecone", "Redis", "JWT"],
    liveUrl: "https://doramon-0z44.onrender.com/",
    featured: false,
    tags: ["AI/LLM", "Full-Stack"],
    highlights: [
      "Built multi-user chat rooms with Socket.IO",
      "Implemented RAG with Pinecone and citation traceability",
      "Secured with JWT auth"
    ]
  }
];
