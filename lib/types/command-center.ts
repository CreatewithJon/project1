export type ProjectStatus = "active" | "building" | "paused" | "planning" | "complete";

export type OwnershipType = "sole" | "co-owned" | "managed";

export type ProjectCategory =
  | "media"
  | "software"
  | "services"
  | "client"
  | "education"
  | "community"
  | "content";

export interface ProjectPriority {
  text: string;
  done?: boolean;
}

export interface ProjectBlocker {
  text: string;
  severity: "low" | "medium" | "high";
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  category: ProjectCategory;
  status: ProjectStatus;
  ownership: OwnershipType;
  ownershipNote?: string;
  progress: number; // 0–100
  accentColor: string; // hex or rgba
  url?: string;
  priorities: ProjectPriority[];
  blockers: ProjectBlocker[];
  sprintFocus?: string;
  lastUpdated: string; // ISO date
}
