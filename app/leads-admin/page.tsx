"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

interface Lead {
  id: string;
  name: string;
  email: string;
  service?: string;
  lead_type?: string;
  created_at: string;
}

interface AiLead {
  id: string;
  name: string;
  email: string;
  business_name?: string;
  website?: string;
  industry?: string;
  service_need?: string;
  budget?: string;
  message?: string;
  created_at: string;
}

type Tab = "ai_leads" | "leads";

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

const LEAD_TYPE_LABELS: Record<string, string> = {
  business_request: "Business Request",
  provider_application: "Provider Application",
  ai_systems: "AI Systems",
};

export default function LeadsAdminPage() {
  const [tab, setTab] = useState<Tab>("ai_leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [aiLeads, setAiLeads] = useState<AiLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const supabase = getSupabase();
      const [{ data: l }, { data: al }] = await Promise.all([
        supabase.from("leads").select("*").order("created_at", { ascending: false }),
        supabase.from("ai_leads").select("*").order("created_at", { ascending: false }),
      ]);
      setLeads(l ?? []);
      setAiLeads(al ?? []);
      setLoading(false);
    }
    fetchAll();
  }, []);

  const activeLeads = tab === "leads" ? leads : aiLeads;
  const totalLeads = leads.length + aiLeads.length;

  // Last 7 days count
  const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recentCount = [...leads, ...aiLeads].filter(
    (l) => new Date(l.created_at).getTime() > cutoff
  ).length;

  async function handleLogout() {
    await fetch("/api/leads-admin-auth", { method: "DELETE" });
    window.location.href = "/leads-admin/login";
  }

  return (
    <div className="min-h-screen bg-[#060606] text-white font-sans">

      {/* Header */}
      <header className="border-b border-white/[0.06] px-6 sm:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="font-black text-sm tracking-tight">DWT Leads</span>
          <span className="text-white/20 text-xs hidden sm:block">digitalwealthtransfer.com</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-white/30 hover:text-white/60 text-xs transition-colors"
        >
          Log out
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-5 sm:px-10 py-10">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Total Leads", value: loading ? "—" : String(totalLeads) },
            { label: "Last 7 Days", value: loading ? "—" : String(recentCount) },
            { label: "AI Systems", value: loading ? "—" : String(aiLeads.length) },
          ].map((s) => (
            <div key={s.label} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
              <p className="text-white/30 text-[11px] uppercase tracking-wider mb-2">{s.label}</p>
              <p className="text-3xl font-black text-white">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {([
            { key: "ai_leads" as Tab, label: "AI Systems Inquiries", count: aiLeads.length },
            { key: "leads" as Tab, label: "General Leads", count: leads.length },
          ]).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200 ${
                tab === t.key
                  ? "bg-rose-600 border-rose-600 text-white"
                  : "border-white/[0.1] text-white/40 hover:text-white hover:border-white/30"
              }`}
            >
              {t.label}
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                tab === t.key ? "bg-white/20 text-white" : "bg-white/[0.06] text-white/30"
              }`}>
                {loading ? "…" : t.count}
              </span>
            </button>
          ))}
        </div>

        {/* Lead List */}
        {loading ? (
          <div className="text-center py-24 text-white/30">Loading leads…</div>
        ) : activeLeads.length === 0 ? (
          <div className="text-center py-24 text-white/30">No leads yet.</div>
        ) : (
          <div className="flex flex-col gap-3">
            {activeLeads.map((lead) => {
              const isOpen = expanded === lead.id;
              const isAi = tab === "ai_leads";
              const al = lead as AiLead;
              const gl = lead as Lead;

              return (
                <div
                  key={lead.id}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden"
                >
                  {/* Row */}
                  <button
                    onClick={() => setExpanded(isOpen ? null : lead.id)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-rose-500/15 border border-rose-500/20 flex items-center justify-center shrink-0">
                        <span className="text-rose-400 text-xs font-black">
                          {lead.name?.charAt(0)?.toUpperCase() ?? "?"}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-bold text-sm truncate">{lead.name}</p>
                        <p className="text-white/40 text-xs truncate">{lead.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      {!isAi && gl.lead_type && (
                        <span className="hidden sm:block text-[10px] font-semibold uppercase tracking-wider text-white/30 bg-white/[0.05] px-2.5 py-1 rounded-full">
                          {LEAD_TYPE_LABELS[gl.lead_type] ?? gl.lead_type}
                        </span>
                      )}
                      {isAi && al.budget && (
                        <span className="hidden sm:block text-[10px] font-semibold uppercase tracking-wider text-rose-400/60 bg-rose-500/10 px-2.5 py-1 rounded-full">
                          {al.budget}
                        </span>
                      )}
                      <span className="text-white/25 text-xs">{timeAgo(lead.created_at)}</span>
                      <span className={`text-white/30 text-xs transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>▾</span>
                    </div>
                  </button>

                  {/* Expanded */}
                  {isOpen && (
                    <div className="border-t border-white/[0.06] px-6 py-5 grid sm:grid-cols-2 gap-4">
                      {isAi ? (
                        <>
                          {al.business_name && <Detail label="Business" value={al.business_name} />}
                          {al.website && <Detail label="Website" value={al.website} />}
                          {al.industry && <Detail label="Industry" value={al.industry} />}
                          {al.service_need && <Detail label="Service Need" value={al.service_need} />}
                          {al.budget && <Detail label="Budget" value={al.budget} />}
                          {al.message && <Detail label="Message" value={al.message} full />}
                        </>
                      ) : (
                        <>
                          {gl.service && <Detail label="Service" value={gl.service} />}
                          {gl.lead_type && <Detail label="Type" value={LEAD_TYPE_LABELS[gl.lead_type] ?? gl.lead_type} />}
                        </>
                      )}
                      <Detail label="Submitted" value={new Date(lead.created_at).toLocaleString()} full />

                      {/* Actions */}
                      <div className="sm:col-span-2 flex gap-3 pt-2">
                        <a
                          href={`mailto:${lead.email}`}
                          className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                        >
                          ✉ Email {lead.name.split(" ")[0]}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function Detail({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <p className="text-white/30 text-[11px] uppercase tracking-wider mb-1">{label}</p>
      <p className="text-white/80 text-sm leading-relaxed break-words">{value}</p>
    </div>
  );
}
