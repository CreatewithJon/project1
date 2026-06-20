import type { Project } from "@/lib/types/command-center";

export const PROJECTS: Project[] = [
  {
    id: "dwt",
    name: "Digital Wealth Transfer",
    tagline: "Media platform · AI economy editorial brand",
    category: "media",
    status: "active",
    ownership: "sole",
    progress: 68,
    accentColor: "#3b82f6",
    url: "https://digitalwealthtransfer.com",
    sprintFocus: "Polish homepage, launch newsletter, publish 3 more articles",
    priorities: [
      { text: "Verify Resend domain & remove debug logs from /api/leads" },
      { text: "Add lead_type column to Supabase leads table" },
      { text: "Publish second and third cornerstone articles" },
    ],
    blockers: [
      { text: "Resend domain not verified — emails only go to joncardonabiz@gmail.com", severity: "medium" },
    ],
    lastUpdated: "2026-06-13",
  },
  {
    id: "sovereign-os",
    name: "Sovereign OS",
    tagline: "Personal intelligence OS · No subscriptions, no noise",
    category: "software",
    status: "building",
    ownership: "sole",
    progress: 32,
    accentColor: "#8b5cf6",
    sprintFocus: "Command center Phase 1, content engine planner integration",
    priorities: [
      { text: "Complete command center Phase 1 (this dashboard)" },
      { text: "Add Bitcoin portfolio tracking to overview" },
      { text: "B-roll pipeline — Higgsfield + Whisper integration" },
    ],
    blockers: [
      { text: "Higgsfield account needed for B-roll pipeline", severity: "low" },
    ],
    lastUpdated: "2026-06-13",
  },
  {
    id: "agentic-systems",
    name: "Aigentic Systems",
    tagline: "AI implementation & automation services company",
    category: "services",
    status: "active",
    ownership: "co-owned",
    ownershipNote: "Co-owned: Jonathan · Alberto · Kenneth",
    progress: 45,
    accentColor: "#f59e0b",
    sprintFocus: "Client delivery pipeline, outreach automation, service packaging",
    priorities: [
      { text: "Define service tiers and pricing finalize" },
      { text: "Build outbound lead system for local businesses" },
      { text: "Launch GH-600 course initiative (see separate project)" },
    ],
    blockers: [
      { text: "Team alignment needed on pricing and scope", severity: "medium" },
    ],
    lastUpdated: "2026-06-13",
  },
  {
    id: "big-money-realty",
    name: "Big Money Realty",
    tagline: "Aigentic Systems client · Real estate AI systems",
    category: "client",
    status: "building",
    ownership: "managed",
    ownershipNote: "Client of Aigentic Systems",
    progress: 20,
    accentColor: "#10b981",
    sprintFocus: "Lead capture system, AI chatbot, CRM integration",
    priorities: [
      { text: "Deliver lead capture landing page" },
      { text: "Set up CRM + email follow-up automation" },
      { text: "Deploy AI appointment setter" },
    ],
    blockers: [],
    lastUpdated: "2026-06-13",
  },
  {
    id: "gh600-cert",
    name: "GH-600 Certification",
    tagline: "Jonathan's personal cert prep · GreenHouse 600",
    category: "education",
    status: "paused",
    ownership: "sole",
    progress: 15,
    accentColor: "#22d3ee",
    sprintFocus: "Study schedule, practice materials, exam registration",
    priorities: [
      { text: "Register for exam date" },
      { text: "Build weekly study schedule" },
      { text: "Complete practice test set 1" },
    ],
    blockers: [
      { text: "Paused — bandwidth prioritized on revenue projects", severity: "low" },
    ],
    lastUpdated: "2026-06-13",
  },
  {
    id: "gh600-unlv",
    name: "GH-600 / UNLV Course Initiative",
    tagline: "Aigentic Systems educational initiative · UNLV partnership",
    category: "education",
    status: "planning",
    ownership: "co-owned",
    ownershipNote: "Aigentic Systems initiative",
    progress: 8,
    accentColor: "#f97316",
    sprintFocus: "Curriculum outline, UNLV contact, pilot group formation",
    priorities: [
      { text: "Draft curriculum outline and learning objectives" },
      { text: "Identify UNLV contact / department for partnership" },
      { text: "Recruit 10-person pilot cohort" },
    ],
    blockers: [
      { text: "UNLV partnership contact not yet established", severity: "high" },
    ],
    lastUpdated: "2026-06-13",
  },
  {
    id: "crypto-mondays",
    name: "Crypto Mondays Las Vegas",
    tagline: "Community chapter · Managed by Aigentic Systems",
    category: "community",
    status: "active",
    ownership: "managed",
    ownershipNote: "Chapter operator owns leads — managed by Aigentic Systems",
    progress: 55,
    accentColor: "#f59e0b",
    sprintFocus: "Event ops, speaker pipeline, attendance growth",
    priorities: [
      { text: "Confirm next 3 monthly event dates and venues" },
      { text: "Build speaker outreach template" },
      { text: "Set up event registration + lead capture" },
    ],
    blockers: [],
    lastUpdated: "2026-06-13",
  },
  {
    id: "founder-content",
    name: "Founder Content / Podcast",
    tagline: "Personal brand · LinkedIn · YouTube · Podcast",
    category: "content",
    status: "building",
    ownership: "sole",
    progress: 22,
    accentColor: "#ec4899",
    sprintFocus: "LinkedIn consistency, first 5 YouTube videos, podcast format",
    priorities: [
      { text: "Post 3x/week on LinkedIn for 4 weeks straight" },
      { text: "Record and publish first YouTube video" },
      { text: "Define podcast format and first 10 episode topics" },
    ],
    blockers: [
      { text: "Video recording setup not finalized", severity: "low" },
    ],
    lastUpdated: "2026-06-13",
  },
];

export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}

export function getProjectsByStatus(status: Project["status"]): Project[] {
  return PROJECTS.filter((p) => p.status === status);
}
