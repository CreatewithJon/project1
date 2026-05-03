"use client";

import { useState } from "react";

interface Props {
  leadType: string;
  sourcePage: string;
  vehicleSlug?: string;
  vehicleName?: string;
  ctaLabel?: string;
  showVehicleField?: boolean;
  showBudgetField?: boolean;
}

const inputCls =
  "w-full bg-[#0A0A0A] border border-white/[0.1] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C]/40 transition-colors";
const labelCls =
  "block text-[11px] font-semibold text-white/40 uppercase tracking-[0.12em] mb-2";

export default function LeadForm({
  leadType,
  sourcePage,
  vehicleSlug,
  vehicleName,
  ctaLabel = "Send My Request",
  showVehicleField = false,
  showBudgetField = false,
}: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle_interested_in: vehicleName ?? "",
    budget: "",
    message: "",
  });

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/dealership-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          lead_type: leadType,
          vehicle_slug: vehicleSlug,
          vehicle_interested_in: form.vehicle_interested_in,
          budget: form.budget,
          message: form.message,
          source_page: sourcePage,
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-[#0F1A0A] border border-green-500/20 rounded-2xl p-10 text-center">
        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-green-400">
            <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-bold text-white text-xl mb-2">Request received.</p>
        <p className="text-white/40 text-sm leading-relaxed">
          Our team will contact you within 2 hours during business hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Full Name *</label>
          <input type="text" required placeholder="Your name" className={inputCls}
            value={form.name} onChange={(e) => set("name", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Email *</label>
          <input type="email" required placeholder="your@email.com" className={inputCls}
            value={form.email} onChange={(e) => set("email", e.target.value)} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Phone</label>
        <input type="tel" placeholder="+1 702 555 0100" className={inputCls}
          value={form.phone} onChange={(e) => set("phone", e.target.value)} />
      </div>

      {showVehicleField && (
        <div>
          <label className={labelCls}>Vehicle Interested In</label>
          <input type="text" placeholder="e.g. 2022 Lamborghini Huracán" className={inputCls}
            value={form.vehicle_interested_in} onChange={(e) => set("vehicle_interested_in", e.target.value)} />
        </div>
      )}

      {showBudgetField && (
        <div>
          <label className={labelCls}>Budget Range</label>
          <select className={inputCls + " bg-[#0A0A0A]"}
            value={form.budget} onChange={(e) => set("budget", e.target.value)}>
            <option value="">Select range...</option>
            <option value="Under $50k">Under $50,000</option>
            <option value="$50k – $100k">$50,000 – $100,000</option>
            <option value="$100k – $200k">$100,000 – $200,000</option>
            <option value="$200k – $350k">$200,000 – $350,000</option>
            <option value="$350k+">$350,000+</option>
          </select>
        </div>
      )}

      <div>
        <label className={labelCls}>Message</label>
        <textarea rows={3} placeholder="Tell us what you're looking for..."
          className={inputCls + " resize-none"}
          value={form.message} onChange={(e) => set("message", e.target.value)} />
      </div>

      {status === "error" && <p className="text-rose-400 text-sm">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="group w-full flex items-center justify-center gap-3 bg-[#C9A84C] hover:bg-[#FDBA74] text-black font-bold text-sm tracking-wide py-4 rounded-xl transition-all duration-300 hover:shadow-[0_6px_25px_rgba(201,168,76,0.4)] disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : ctaLabel}
        {status !== "loading" && <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>}
      </button>
      <p className="text-white/20 text-xs text-center">Typically respond within 2 hours · No commitment required</p>
    </form>
  );
}
