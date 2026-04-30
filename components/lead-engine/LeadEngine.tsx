"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Prospect,
  ProspectStatus,
  STATUSES,
  STATUS_COLORS,
  scoreColor,
  isFollowupToday,
  followupDaysFromStatus,
  addDays,
} from "./types";
import LeadModal from "./LeadModal";
import OutreachModal from "./OutreachModal";

// ─── CSV Parser ────────────────────────────────────────────────────────────────
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let cur = "";
  let inQ = false;
  for (const ch of line) {
    if (ch === '"') { inQ = !inQ; }
    else if (ch === "," && !inQ) { result.push(cur); cur = ""; }
    else { cur += ch; }
  }
  result.push(cur);
  return result;
}

const COL_MAP: Record<string, keyof Prospect> = {
  business_name: "business_name", business: "business_name", "business name": "business_name",
  website: "website", url: "website",
  instagram: "instagram_url", instagram_url: "instagram_url",
  linkedin: "linkedin_url", linkedin_url: "linkedin_url",
  industry: "industry",
  location: "location", city: "location",
  contact_name: "contact_name", contact: "contact_name", name: "contact_name",
  email: "email",
  phone: "phone",
  source: "source",
  problem_signal: "problem_signal", problem: "problem_signal", signal: "problem_signal",
  notes: "notes",
};

function parseCSV(text: string): Partial<Prospect>[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const headers = parseCSVLine(lines[0]).map((h) =>
    h.trim().toLowerCase().replace(/\s+/g, "_").replace(/[^a-z_]/g, "")
  );
  return lines
    .slice(1)
    .map((line) => {
      const vals = parseCSVLine(line);
      const row: Partial<Prospect> = {};
      headers.forEach((h, i) => {
        const field = COL_MAP[h];
        if (field && vals[i]?.trim()) (row as Record<string, string>)[field] = vals[i].trim();
      });
      return row;
    })
    .filter((r) => r.business_name);
}

// ─── Toast ─────────────────────────────────────────────────────────────────────
interface Toast { type: "success" | "error"; msg: string }

// ─── Filters ───────────────────────────────────────────────────────────────────
interface Filters {
  status: "all" | ProspectStatus;
  minScore: "" | "4" | "7" | "8" | "9";
  search: string;
  followupToday: boolean;
  highPriority: boolean;
}

const DEFAULT_FILTERS: Filters = {
  status: "all", minScore: "", search: "", followupToday: false, highPriority: false,
};

// ─── Main Component ────────────────────────────────────────────────────────────
export default function LeadEngine() {
  const [auth, setAuth] = useState<"loading" | "locked" | "open">("loading");
  const [pw, setPw] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState("");

  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [modal, setModal] = useState<{ mode: "add" | "edit"; prospect?: Prospect } | null>(null);
  const [outreachState, setOutreachState] = useState<{ prospect: Prospect } | null>(null);
  const [scoringId, setScoringId] = useState<string | null>(null);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [importLoading, setImportLoading] = useState(false);
  const csvRef = useRef<HTMLInputElement>(null);

  function showToast(type: "success" | "error", msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  }

  // Auth
  useEffect(() => {
    setAuth(sessionStorage.getItem("le_auth") === "true" ? "open" : "locked");
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setPwLoading(true);
    setPwError("");
    try {
      const res = await fetch("/api/lead-engine/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (!res.ok) { setPwError("Wrong password"); return; }
      sessionStorage.setItem("le_auth", "true");
      setAuth("open");
    } catch {
      setPwError("Connection error");
    } finally {
      setPwLoading(false);
    }
  }

  // Data
  const fetchProspects = useCallback(async () => {
    setFetchLoading(true);
    try {
      const res = await fetch("/api/lead-engine/prospects");
      const json = await res.json();
      if (res.ok) setProspects(json.prospects ?? []);
      else showToast("error", json.error ?? "Failed to load prospects");
    } catch {
      showToast("error", "Failed to connect to database");
    } finally {
      setFetchLoading(false);
    }
  }, []);

  useEffect(() => {
    if (auth === "open") fetchProspects();
  }, [auth, fetchProspects]);

  // CRUD
  async function handleSave(data: Partial<Prospect>) {
    if (modal?.mode === "add") {
      const res = await fetch("/api/lead-engine/prospects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setProspects((prev) => [json.prospects[0], ...prev]);
      showToast("success", "Lead added");
    } else {
      const id = modal?.prospect?.id;
      const res = await fetch(`/api/lead-engine/prospects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setProspects((prev) => prev.map((p) => (p.id === id ? json.prospect : p)));
      showToast("success", "Lead updated");
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/lead-engine/prospects/${id}`, { method: "DELETE" });
      if (!res.ok) { showToast("error", "Delete failed"); return; }
      setProspects((prev) => prev.filter((p) => p.id !== id));
      showToast("success", "Lead deleted");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleStatusChange(prospect: Prospect, status: ProspectStatus) {
    const days = followupDaysFromStatus(status);
    const updates: Partial<Prospect> = { status };
    if (days !== null) updates.next_followup_at = addDays(days);
    if (["Contacted", "Follow-Up Needed", "Call Booked"].includes(status)) {
      updates.last_contacted_at = new Date().toISOString().split("T")[0];
    }
    const res = await fetch(`/api/lead-engine/prospects/${prospect.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const json = await res.json();
    if (!res.ok) { showToast("error", json.error); return; }
    setProspects((prev) => prev.map((p) => (p.id === prospect.id ? json.prospect : p)));
  }

  async function handleScore(id: string) {
    setScoringId(id);
    try {
      const res = await fetch(`/api/lead-engine/prospects/${id}/score`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) { showToast("error", json.error); return; }
      setProspects((prev) => prev.map((p) => (p.id === id ? json.prospect : p)));
      showToast("success", `Scored: ${json.prospect.ai_score}/10`);
    } finally {
      setScoringId(null);
    }
  }

  async function handleGenerateOutreach(prospect: Prospect) {
    setGeneratingId(prospect.id);
    try {
      const res = await fetch(`/api/lead-engine/prospects/${prospect.id}/outreach`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) { showToast("error", json.error); return; }
      const updated = json.prospect as Prospect;
      setProspects((prev) => prev.map((p) => (p.id === prospect.id ? updated : p)));
      setOutreachState({ prospect: updated });
    } finally {
      setGeneratingId(null);
    }
  }

  // CSV Import
  async function handleCSVFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportLoading(true);
    try {
      const text = await file.text();
      const rows = parseCSV(text);
      if (rows.length === 0) { showToast("error", "No valid rows found in CSV"); return; }

      const res = await fetch("/api/lead-engine/prospects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rows),
      });
      const json = await res.json();
      if (!res.ok) { showToast("error", json.error); return; }
      await fetchProspects();
      showToast("success", `Imported ${json.prospects?.length ?? rows.length} leads`);
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Import failed");
    } finally {
      setImportLoading(false);
      if (csvRef.current) csvRef.current.value = "";
    }
  }

  // Filter
  const filtered = prospects.filter((p) => {
    if (filters.status !== "all" && p.status !== filters.status) return false;
    if (filters.minScore && (p.ai_score ?? 0) < parseInt(filters.minScore)) return false;
    if (filters.followupToday && !isFollowupToday(p.next_followup_at)) return false;
    if (filters.highPriority && (p.ai_score ?? 0) < 8) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      return (
        p.business_name.toLowerCase().includes(q) ||
        (p.contact_name ?? "").toLowerCase().includes(q) ||
        (p.industry ?? "").toLowerCase().includes(q) ||
        (p.email ?? "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Stats
  const stats = {
    total: prospects.length,
    newLeads: prospects.filter((p) => p.status === "New").length,
    contacted: prospects.filter((p) => ["Contacted", "Follow-Up Needed"].includes(p.status)).length,
    booked: prospects.filter((p) => p.status === "Call Booked").length,
    dueToday: prospects.filter((p) => isFollowupToday(p.next_followup_at)).length,
  };

  // ── Render: Loading ──────────────────────────────────────────────────────────
  if (auth === "loading") {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  // ── Render: Password Gate ────────────────────────────────────────────────────
  if (auth === "locked") {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#151B2D] border border-white/[0.08] flex items-center justify-center p-2.5">
              <Image src="/brand/logo.svg" alt="DWT" width={32} height={32} unoptimized style={{ width: "100%", height: "auto" }} />
            </div>
            <h1 className="text-white font-bold text-xl mb-1">Lead Engine</h1>
            <p className="text-white/30 text-sm">Internal access only</p>
          </div>
          <form onSubmit={handleLogin} className="bg-[#151B2D] border border-white/[0.08] rounded-2xl p-6">
            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              autoFocus
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-[#0B0F1A] border border-white/[0.1] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-blue-500/50 mb-4"
            />
            {pwError && <p className="text-rose-400 text-sm mb-3">{pwError}</p>}
            <button
              type="submit"
              disabled={pwLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-sm transition-colors disabled:opacity-50"
            >
              {pwLoading ? "Checking..." : "Enter"}
            </button>
          </form>
          <p className="text-center text-xs text-white/20 mt-4">
            Set <code className="font-mono">LEAD_ENGINE_PASSWORD</code> in Vercel env vars
          </p>
        </div>
      </div>
    );
  }

  // ── Render: Dashboard ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0B0F1A] font-sans text-[#F9FAFB]">
      {/* Modals */}
      {modal && (
        <LeadModal
          mode={modal.mode}
          prospect={modal.prospect}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
      {outreachState && outreachState.prospect.outreach_drafts && (
        <OutreachModal
          businessName={outreachState.prospect.business_name}
          drafts={outreachState.prospect.outreach_drafts}
          onClose={() => setOutreachState(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-semibold shadow-lg border transition-all ${
          toast.type === "success"
            ? "bg-green-500/10 border-green-500/20 text-green-400"
            : "bg-rose-500/10 border-rose-500/20 text-rose-400"
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-[#0B0F1A]/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 h-13 flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image src="/brand/logo.svg" alt="DWT" width={120} height={25} unoptimized style={{ height: "auto" }} />
            </Link>
            <span className="hidden sm:block text-white/20 text-sm">·</span>
            <span className="hidden sm:block text-white/50 text-sm font-semibold">Lead Engine</span>
          </div>
          <button
            onClick={() => { sessionStorage.removeItem("le_auth"); setAuth("locked"); }}
            className="text-white/25 hover:text-white/60 text-xs transition-colors"
          >
            Lock
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          {[
            { label: "Total Leads", value: stats.total, color: "text-white" },
            { label: "New", value: stats.newLeads, color: "text-blue-400" },
            { label: "Contacted", value: stats.contacted, color: "text-indigo-400" },
            { label: "Call Booked", value: stats.booked, color: "text-green-400" },
            { label: "Follow-Up Due", value: stats.dueToday, color: "text-orange-400" },
          ].map((s) => (
            <div key={s.label} className="bg-[#151B2D] border border-white/[0.06] rounded-xl p-4">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-white/30 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="bg-[#111827] border border-white/[0.06] rounded-xl p-4 mb-5">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="flex-1 min-w-[180px]">
              <input
                type="text"
                placeholder="Search leads..."
                value={filters.search}
                onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                className="w-full bg-[#0B0F1A] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-blue-500/40"
              />
            </div>

            {/* Status */}
            <select
              value={filters.status}
              onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value as Filters["status"] }))}
              className="bg-[#0B0F1A] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/40"
            >
              <option value="all">All Status</option>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            {/* Min Score */}
            <select
              value={filters.minScore}
              onChange={(e) => setFilters((f) => ({ ...f, minScore: e.target.value as Filters["minScore"] }))}
              className="bg-[#0B0F1A] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/40"
            >
              <option value="">All Scores</option>
              <option value="4">Score 4+</option>
              <option value="7">Score 7+</option>
              <option value="8">Score 8+</option>
              <option value="9">Score 9+</option>
            </select>

            {/* Toggles */}
            <button
              onClick={() => setFilters((f) => ({ ...f, followupToday: !f.followupToday }))}
              className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                filters.followupToday
                  ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
                  : "bg-[#0B0F1A] border-white/[0.1] text-white/40 hover:text-white"
              }`}
            >
              Follow-Up Due
            </button>
            <button
              onClick={() => setFilters((f) => ({ ...f, highPriority: !f.highPriority }))}
              className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                filters.highPriority
                  ? "bg-green-500/10 border-green-500/30 text-green-400"
                  : "bg-[#0B0F1A] border-white/[0.1] text-white/40 hover:text-white"
              }`}
            >
              High Priority
            </button>

            {filters.status !== "all" || filters.minScore || filters.followupToday || filters.highPriority || filters.search ? (
              <button
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="text-xs text-white/30 hover:text-white transition-colors"
              >
                Clear
              </button>
            ) : null}

            {/* Actions */}
            <div className="ml-auto flex gap-2">
              <input
                ref={csvRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleCSVFile}
              />
              <button
                onClick={() => csvRef.current?.click()}
                disabled={importLoading}
                className="px-3 py-2 rounded-lg text-xs font-semibold border border-white/[0.1] text-white/50 hover:text-white hover:border-white/20 transition-colors disabled:opacity-50"
              >
                {importLoading ? "Importing..." : "Import CSV"}
              </button>
              <button
                onClick={() => setModal({ mode: "add" })}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              >
                + Add Lead
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        {fetchLoading ? (
          <div className="flex items-center justify-center h-48 text-white/20">
            <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mr-3" />
            Loading leads...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-white/20 gap-3">
            <p className="text-base">
              {prospects.length === 0 ? "No leads yet — add your first one" : "No leads match these filters"}
            </p>
            {prospects.length === 0 && (
              <button
                onClick={() => setModal({ mode: "add" })}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-blue-600/20 border border-blue-500/20 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors"
              >
                + Add Lead
              </button>
            )}
          </div>
        ) : (
          <div className="bg-[#111827] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {["Business", "Contact", "Industry / Location", "Score", "Status", "Next Follow-Up", "Actions"].map((h) => (
                      <th key={h} className="text-left text-[11px] font-bold text-white/30 uppercase tracking-wider px-4 py-3 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => {
                    const isExpanded = expandedId === p.id;
                    const followupDue = isFollowupToday(p.next_followup_at);

                    return [
                      // Main row
                      <tr
                        key={p.id}
                        onClick={() => setExpandedId(isExpanded ? null : p.id)}
                        className={`border-b border-white/[0.04] cursor-pointer transition-colors ${
                          isExpanded ? "bg-[#151B2D]" : "hover:bg-[#151B2D]/50"
                        } ${followupDue ? "border-l-2 border-l-orange-500/50" : ""}`}
                      >
                        {/* Business */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div>
                              <p className="text-white font-semibold leading-tight max-w-[160px] truncate">{p.business_name}</p>
                              {p.website && (
                                <a
                                  href={p.website.startsWith("http") ? p.website : `https://${p.website}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-[11px] text-blue-400/60 hover:text-blue-400 transition-colors truncate block max-w-[150px]"
                                >
                                  {p.website.replace(/^https?:\/\//, "")}
                                </a>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="px-4 py-3">
                          <p className="text-white/80 leading-tight max-w-[130px] truncate">{p.contact_name ?? "—"}</p>
                          {p.email && <p className="text-[11px] text-white/30 truncate max-w-[130px]">{p.email}</p>}
                        </td>

                        {/* Industry / Location */}
                        <td className="px-4 py-3">
                          <p className="text-white/70 truncate max-w-[140px]">{p.industry ?? "—"}</p>
                          {p.location && <p className="text-[11px] text-white/30">{p.location}</p>}
                        </td>

                        {/* Score */}
                        <td className="px-4 py-3">
                          {p.ai_score ? (
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${scoreColor(p.ai_score)}`}>
                              {p.ai_score}/10
                            </span>
                          ) : (
                            <span className="text-white/20 text-xs">—</span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${STATUS_COLORS[p.status]}`}>
                            {p.status}
                          </span>
                        </td>

                        {/* Follow-up */}
                        <td className="px-4 py-3">
                          {p.next_followup_at ? (
                            <span className={`text-xs font-medium ${followupDue ? "text-orange-400" : "text-white/40"}`}>
                              {followupDue ? "⚡ " : ""}{p.next_followup_at}
                            </span>
                          ) : (
                            <span className="text-white/20 text-xs">—</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleScore(p.id)}
                              disabled={scoringId === p.id}
                              title="AI Score"
                              className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors disabled:opacity-50"
                            >
                              {scoringId === p.id ? "…" : "Score"}
                            </button>
                            <button
                              onClick={() => {
                                if (p.outreach_drafts) {
                                  setOutreachState({ prospect: p });
                                } else {
                                  handleGenerateOutreach(p);
                                }
                              }}
                              disabled={generatingId === p.id}
                              title={p.outreach_drafts ? "View Outreach" : "Generate Outreach"}
                              className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-purple-600/10 border border-purple-500/20 text-purple-400 hover:bg-purple-600 hover:text-white transition-colors disabled:opacity-50"
                            >
                              {generatingId === p.id ? "…" : p.outreach_drafts ? "View" : "Draft"}
                            </button>
                            <button
                              onClick={() => setModal({ mode: "edit", prospect: p })}
                              title="Edit"
                              className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                            >
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>,

                      // Expanded detail row
                      isExpanded && (
                        <tr key={`${p.id}-exp`} className="bg-[#151B2D] border-b border-white/[0.06]">
                          <td colSpan={7} className="px-6 py-5">
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                              {/* Contact & Social */}
                              <div>
                                <p className="text-[11px] font-bold text-white/30 uppercase tracking-wider mb-2">Contact & Social</p>
                                <div className="space-y-1.5 text-sm">
                                  {p.phone && <p className="text-white/60">📞 {p.phone}</p>}
                                  {p.instagram_url && (
                                    <a href={p.instagram_url} target="_blank" rel="noopener noreferrer" className="block text-blue-400/70 hover:text-blue-400 truncate">
                                      📸 Instagram
                                    </a>
                                  )}
                                  {p.linkedin_url && (
                                    <a href={p.linkedin_url} target="_blank" rel="noopener noreferrer" className="block text-blue-400/70 hover:text-blue-400 truncate">
                                      💼 LinkedIn
                                    </a>
                                  )}
                                  {p.source && <p className="text-white/40 text-xs">Source: {p.source}</p>}
                                </div>
                              </div>

                              {/* Intel */}
                              <div>
                                <p className="text-[11px] font-bold text-white/30 uppercase tracking-wider mb-2">Intel</p>
                                {p.problem_signal && (
                                  <p className="text-white/60 text-sm leading-relaxed mb-2">
                                    <span className="text-amber-400/60">Problem: </span>{p.problem_signal}
                                  </p>
                                )}
                                {p.ai_score_reason && (
                                  <p className="text-white/50 text-xs leading-relaxed mb-2">
                                    <span className="text-blue-400/60">AI: </span>{p.ai_score_reason}
                                  </p>
                                )}
                                {p.recommended_offer && (
                                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
                                    {p.recommended_offer}
                                  </span>
                                )}
                              </div>

                              {/* Pipeline */}
                              <div>
                                <p className="text-[11px] font-bold text-white/30 uppercase tracking-wider mb-2">Pipeline</p>
                                {p.notes && <p className="text-white/50 text-xs leading-relaxed mb-3">{p.notes}</p>}
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {(["Contacted", "Follow-Up Needed", "Call Booked", "Closed", "Not Interested"] as ProspectStatus[]).map((s) => (
                                    <button
                                      key={s}
                                      onClick={() => handleStatusChange(p, s)}
                                      disabled={p.status === s}
                                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-colors disabled:opacity-30 ${STATUS_COLORS[s]} hover:opacity-100`}
                                    >
                                      {s}
                                    </button>
                                  ))}
                                </div>
                                <div className="flex gap-3 text-xs text-white/30">
                                  {p.last_contacted_at && <span>Last: {p.last_contacted_at}</span>}
                                  {p.next_followup_at && <span>Next: {p.next_followup_at}</span>}
                                </div>
                                <div className="flex gap-2 mt-3">
                                  <button
                                    onClick={() => handleDelete(p.id)}
                                    disabled={deletingId === p.id}
                                    className="text-[11px] font-semibold text-rose-400/50 hover:text-rose-400 transition-colors disabled:opacity-30"
                                  >
                                    {deletingId === p.id ? "Deleting..." : "Delete Lead"}
                                  </button>
                                  {p.outreach_drafts && (
                                    <button
                                      onClick={() => handleGenerateOutreach(p)}
                                      disabled={generatingId === p.id}
                                      className="text-[11px] font-semibold text-purple-400/50 hover:text-purple-400 transition-colors"
                                    >
                                      {generatingId === p.id ? "..." : "Regenerate Outreach"}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ),
                    ];
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-white/[0.04] flex items-center justify-between">
              <p className="text-xs text-white/25">
                Showing {filtered.length} of {prospects.length} leads
              </p>
              <p className="text-xs text-white/15">Click any row to expand</p>
            </div>
          </div>
        )}

        {/* CSV format hint */}
        <p className="mt-4 text-xs text-white/15 text-center">
          CSV import supports: business_name, website, instagram_url, linkedin_url, industry, location, contact_name, email, phone, source, problem_signal, notes
        </p>
      </div>
    </div>
  );
}
