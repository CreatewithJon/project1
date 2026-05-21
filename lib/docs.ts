import fs from "fs";
import path from "path";
import { marked } from "marked";

export interface DocFile {
  slug: string[];
  title: string;
  section: string;
}

const DOCS_ROOT = path.join(process.cwd(), "docs");

// Navigation structure — order controls sidebar display
export const NAV: { section: string; color: string; files: { slug: string[]; label: string }[] }[] = [
  {
    section: "Start Here",
    color: "#3b82f6",
    files: [
      { slug: ["README"], label: "Documentation Map" },
    ],
  },
  {
    section: "Architecture",
    color: "#8b5cf6",
    files: [
      { slug: ["architecture", "overview"], label: "System Overview" },
      { slug: ["architecture", "layer-1-interface"], label: "Layer 1 — Interface" },
      { slug: ["architecture", "layer-2-orchestration"], label: "Layer 2 — Orchestration" },
      { slug: ["architecture", "layer-3-agents"], label: "Layer 3 — Agents" },
      { slug: ["architecture", "layer-4-memory"], label: "Layer 4 — Memory" },
      { slug: ["architecture", "layer-5-governance"], label: "Layer 5 — Governance" },
    ],
  },
  {
    section: "GH-600 Study Guide",
    color: "#f59e0b",
    files: [
      { slug: ["gh600-study-guide", "overview"], label: "Exam Overview" },
      { slug: ["gh600-study-guide", "domain-1-prompt-engineering"], label: "Domain 1 — Prompt Eng." },
      { slug: ["gh600-study-guide", "domain-2-agentic-systems"], label: "Domain 2 — Agents" },
      { slug: ["gh600-study-guide", "practice-scenarios"], label: "Practice Scenarios" },
    ],
  },
  {
    section: "Education",
    color: "#10b981",
    files: [
      { slug: ["education", "llm-vs-agents"], label: "LLMs vs Agents" },
      { slug: ["education", "tool-calling"], label: "Tool Calling" },
      { slug: ["education", "rag-retrieval"], label: "RAG & Retrieval" },
    ],
  },
  {
    section: "Agents",
    color: "#ef4444",
    files: [
      { slug: ["agents", "overview"], label: "Agent Inventory" },
    ],
  },
  {
    section: "Systems",
    color: "#06b6d4",
    files: [
      { slug: ["orchestration", "overview"], label: "Orchestration" },
      { slug: ["memory", "overview"], label: "Memory & Retrieval" },
      { slug: ["governance", "overview"], label: "Governance & Safety" },
    ],
  },
  {
    section: "Operations",
    color: "#a3a3a3",
    files: [
      { slug: ["onboarding", "developer"], label: "Developer Onboarding" },
      { slug: ["roadmap", "overview"], label: "Build Roadmap" },
      { slug: ["operations", "overview"], label: "SOPs" },
    ],
  },
];

export function getDocContent(slug: string[]): { html: string; title: string } | null {
  const filePath = path.join(DOCS_ROOT, ...slug) + ".md";
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");

  // Extract title from first H1
  const titleMatch = raw.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : slug[slug.length - 1];

  const html = marked(raw) as string;
  return { html, title };
}

export function slugToPath(slug: string[]): string {
  return "/docs/" + slug.join("/");
}

export function getAllSlugs(): string[][] {
  return NAV.flatMap((section) => section.files.map((f) => f.slug));
}
