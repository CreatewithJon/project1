export type ProspectStatus =
  | "New"
  | "Researched"
  | "Message Drafted"
  | "Contacted"
  | "Follow-Up Needed"
  | "Call Booked"
  | "Closed"
  | "Not Interested";

export interface OutreachDrafts {
  instagram_dm?: string;
  linkedin_dm?: string;
  email?: string;
  followup_1?: string;
  followup_2?: string;
  breakup?: string;
}

export interface Prospect {
  id: string;
  business_name: string;
  website?: string | null;
  instagram_url?: string | null;
  linkedin_url?: string | null;
  industry?: string | null;
  location?: string | null;
  contact_name?: string | null;
  email?: string | null;
  phone?: string | null;
  source?: string | null;
  problem_signal?: string | null;
  ai_score?: number | null;
  ai_score_reason?: string | null;
  recommended_offer?: string | null;
  status: ProspectStatus;
  notes?: string | null;
  outreach_drafts?: OutreachDrafts | null;
  created_at: string;
  last_contacted_at?: string | null;
  next_followup_at?: string | null;
}

export const STATUSES: ProspectStatus[] = [
  "New",
  "Researched",
  "Message Drafted",
  "Contacted",
  "Follow-Up Needed",
  "Call Booked",
  "Closed",
  "Not Interested",
];

export const STATUS_COLORS: Record<ProspectStatus, string> = {
  "New": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Researched": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Message Drafted": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Contacted": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  "Follow-Up Needed": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Call Booked": "bg-green-500/10 text-green-400 border-green-500/20",
  "Closed": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Not Interested": "bg-white/5 text-white/30 border-white/10",
};

export function scoreColor(score: number | null | undefined): string {
  if (!score) return "bg-white/5 text-white/30 border-white/10";
  if (score >= 9) return "bg-green-500/10 text-green-400 border-green-500/20";
  if (score >= 7) return "bg-blue-500/10 text-blue-400 border-blue-500/20";
  if (score >= 4) return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  return "bg-rose-500/10 text-rose-400 border-rose-500/20";
}

export function followupDaysFromStatus(status: ProspectStatus): number | null {
  if (status === "Contacted") return 2;
  if (status === "Follow-Up Needed") return 5;
  return null;
}

export function addDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export function isFollowupToday(dateStr: string | null | undefined): boolean {
  if (!dateStr) return false;
  return dateStr <= new Date().toISOString().split("T")[0];
}
