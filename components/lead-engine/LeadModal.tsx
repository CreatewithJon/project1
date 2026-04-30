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

export default function LeadModal({ mode, prospect, onClose, onSave }: Props) {
  const [form, setForm] = useState<Partial<Prospect>>(
    mode === "edit" && prospect ? { ...prospect } : { ...EMPTY }
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
      // Auto-set follow-up date when status changes
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

  const inputCls =
    "w-full bg-[#0B0F1A] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-[#F9FAFB] placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/30 transition-colors";
  const labelCls = "block text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1";

  const Field = ({
    label,
    field,
    type = "text",
    placeholder = "",
    full = false,
  }: {
    label: string;
    field: keyof Prospect;
    type?: string;
    placeholder?: string;
    full?: boolean;
  }) => (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className={labelCls}>{label}</label>
      <input
        type={type}
        className={inputCls}
        placeholder={placeholder}
        value={(form[field] as string) ?? ""}
        onChange={(e) => set(field, e.target.value)}
      />
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-2xl bg-[#111827] border border-white/[0.08] rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <h2 className="text-white font-bold text-base">
            {mode === "add" ? "Add New Lead" : "Edit Lead"}
          </h2>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Section: Business */}
          <p className="text-[11px] font-bold uppercase tracking-widest text-blue-400/60 mb-3">Business Info</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <Field label="Business Name *" field="business_name" placeholder="Acme Med Spa" full />
            <Field label="Website" field="website" placeholder="https://..." />
            <Field label="Industry" field="industry" placeholder="Med Spa, Real Estate..." />
            <Field label="Location" field="location" placeholder="Las Vegas, NV" />
            <Field label="Instagram URL" field="instagram_url" placeholder="https://instagram.com/..." />
            <Field label="LinkedIn URL" field="linkedin_url" placeholder="https://linkedin.com/in/..." />
          </div>

          {/* Section: Contact */}
          <p className="text-[11px] font-bold uppercase tracking-widest text-purple-400/60 mb-3">Contact Info</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <Field label="Contact Name" field="contact_name" placeholder="Jane Smith" />
            <Field label="Email" field="email" type="email" placeholder="jane@business.com" />
            <Field label="Phone" field="phone" placeholder="+1 702..." />
            <Field label="Source" field="source" placeholder="Instagram, LinkedIn, Referral..." />
          </div>

          {/* Section: Intel */}
          <p className="text-[11px] font-bold uppercase tracking-widest text-amber-400/60 mb-3">Lead Intel</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div className="sm:col-span-2">
              <label className={labelCls}>Problem Signal</label>
              <textarea
                className={inputCls + " resize-none"}
                rows={2}
                placeholder="e.g. No lead follow-up, inconsistent content, weak website..."
                value={form.problem_signal ?? ""}
                onChange={(e) => set("problem_signal", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Notes</label>
              <textarea
                className={inputCls + " resize-none"}
                rows={2}
                placeholder="Anything else to remember..."
                value={form.notes ?? ""}
                onChange={(e) => set("notes", e.target.value)}
              />
            </div>
          </div>

          {/* Section: Pipeline */}
          <p className="text-[11px] font-bold uppercase tracking-widest text-green-400/60 mb-3">Pipeline</p>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className={labelCls}>Status</label>
              <select
                className={inputCls}
                value={form.status ?? "New"}
                onChange={(e) => set("status", e.target.value)}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Next Follow-Up</label>
              <input
                type="date"
                className={inputCls}
                value={form.next_followup_at ?? ""}
                onChange={(e) => set("next_followup_at", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Last Contacted</label>
              <input
                type="date"
                className={inputCls}
                value={form.last_contacted_at ?? ""}
                onChange={(e) => set("last_contacted_at", e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-rose-400 text-sm mb-4">{error}</p>}

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white/50 hover:text-white border border-white/[0.08] hover:border-white/20 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              {saving ? "Saving..." : mode === "add" ? "Add Lead" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
