"use client";

import { useState, useEffect } from "react";
import {
  Prospect,
  ProspectStatus,
  STATUSES,
  followupDaysFromStatus,
  addDays,
} from "./types";

interface Props {
  mode: "add" | "edit";
  prospect?: Prospect;
  onClose: () => void;
  onSave: (data: Partial<Prospect>) => Promise<void>;
}

const EMPTY: Partial<Prospect> = {
  business_name: "",
  website: "",
  instagram_url: "",
  linkedin_url: "",
  industry: "",
  location: "",
  contact_name: "",
  email: "",
  phone: "",
  source: "",
  problem_signal: "",
  status: "New",
  notes: "",
  next_followup_at: "",
};

const inputCls =
  "w-full bg-[#0B0F1A] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-[#F9FAFB] placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/30 transition-colors";
const labelCls = "block text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1";

export default function LeadModal({ mode, prospect, onClose, onSave }: Props) {
  const [form, setForm] = useState<Partial<Prospect>>(
    prospect ? { ...EMPTY, ...prospect } : { ...EMPTY }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  function set(field: keyof Prospect, value: string) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "status") {
        const days = followupDaysFromStatus(value as ProspectStatus);
        if (days !== null) next.next_followup_at = addDays(days);
        if (["Contacted", "Follow-Up Needed", "Call Booked"].includes(value)) {
          next.last_contacted_at = new Date().toISOString().split("T")[0];
        }
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.business_name?.trim()) {
      setError("Business name is required");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-2xl bg-[#111827] border border-white/[0.08] rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <h2 className="text-white font-bold text-base">
            {mode === "add" ? "Add New Lead" : "Edit Lead"}
          </h2>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors text-xl leading-none">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Business Info */}
          <p className="text-[11px] font-bold uppercase tracking-widest text-blue-400/60 mb-3">Business Info</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div className="sm:col-span-2">
              <label className={labelCls}>Business Name *</label>
              <input type="text" className={inputCls} placeholder="Acme Med Spa"
                value={form.business_name ?? ""} onChange={(e) => set("business_name", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Website</label>
              <input type="text" className={inputCls} placeholder="https://..."
                value={form.website ?? ""} onChange={(e) => set("website", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Industry</label>
              <input type="text" className={inputCls} placeholder="Med Spa, Real Estate..."
                value={form.industry ?? ""} onChange={(e) => set("industry", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Location</label>
              <input type="text" className={inputCls} placeholder="Las Vegas, NV"
                value={form.location ?? ""} onChange={(e) => set("location", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Instagram URL</label>
              <input type="text" className={inputCls} placeholder="https://instagram.com/..."
                value={form.instagram_url ?? ""} onChange={(e) => set("instagram_url", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>LinkedIn URL</label>
              <input type="text" className={inputCls} placeholder="https://linkedin.com/in/..."
                value={form.linkedin_url ?? ""} onChange={(e) => set("linkedin_url", e.target.value)} />
            </div>
          </div>

          {/* Contact Info */}
          <p className="text-[11px] font-bold uppercase tracking-widest text-purple-400/60 mb-3">Contact Info</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className={labelCls}>Contact Name</label>
              <input type="text" className={inputCls} placeholder="Jane Smith"
                value={form.contact_name ?? ""} onChange={(e) => set("contact_name", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Email</label>
              <input type="email" className={inputCls} placeholder="jane@business.com"
                value={form.email ?? ""} onChange={(e) => set("email", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Phone</label>
              <input type="text" className={inputCls} placeholder="+1 702..."
                value={form.phone ?? ""} onChange={(e) => set("phone", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Source</label>
              <input type="text" className={inputCls} placeholder="Instagram, LinkedIn, Referral..."
                value={form.source ?? ""} onChange={(e) => set("source", e.target.value)} />
            </div>
          </div>

          {/* Lead Intel */}
          <p className="text-[11px] font-bold uppercase tracking-widest text-amber-400/60 mb-3">Lead Intel</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div className="sm:col-span-2">
              <label className={labelCls}>Problem Signal</label>
              <textarea className={inputCls + " resize-none"} rows={2}
                placeholder="e.g. No lead follow-up, inconsistent content, weak website..."
                value={form.problem_signal ?? ""} onChange={(e) => set("problem_signal", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Notes</label>
              <textarea className={inputCls + " resize-none"} rows={2}
                placeholder="Anything else to remember..."
                value={form.notes ?? ""} onChange={(e) => set("notes", e.target.value)} />
            </div>
          </div>

          {/* Pipeline */}
          <p className="text-[11px] font-bold uppercase tracking-widest text-green-400/60 mb-3">Pipeline</p>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className={labelCls}>Status</label>
              <select className={inputCls} value={form.status ?? "New"} onChange={(e) => set("status", e.target.value)}>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Next Follow-Up</label>
              <input type="date" className={inputCls}
                value={form.next_followup_at ?? ""} onChange={(e) => set("next_followup_at", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Last Contacted</label>
              <input type="date" className={inputCls}
                value={form.last_contacted_at ?? ""} onChange={(e) => set("last_contacted_at", e.target.value)} />
            </div>
          </div>

          {error && <p className="text-rose-400 text-sm mb-4">{error}</p>}

          <div className="flex gap-3 justify-end">
            <button type="button" onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white/50 hover:text-white border border-white/[0.08] hover:border-white/20 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              {saving ? "Saving..." : mode === "add" ? "Add Lead" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
