"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputCls =
  "w-full bg-transparent border-b border-white/[0.15] py-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#F97316]/60 transition-colors";
const labelCls = "block text-[11px] font-semibold text-white/35 uppercase tracking-[0.15em] mb-2";

export default function LuxuryOrderForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    order_type: "",
    event_date: "",
    budget: "",
    description: "",
  });

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const serviceParts = [
      `Order: ${form.order_type || "Not specified"}`,
      form.event_date && `Event Date: ${form.event_date}`,
      form.budget && `Budget: ${form.budget}`,
      form.phone && `Phone: ${form.phone}`,
      form.description && `Details: ${form.description}`,
    ].filter(Boolean).join(" | ");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          service: serviceParts,
          companySlug: "lumbre-bakery",
          lead_type: "bakery_order",
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? "Something went wrong");
      }

      router.push("/lumbre-demo/thank-you");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <div className="grid sm:grid-cols-2 gap-10">
        <div>
          <label className={labelCls}>Full Name</label>
          <input
            type="text"
            required
            placeholder="Your name"
            className={inputCls}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>Email Address</label>
          <input
            type="email"
            required
            placeholder="your@email.com"
            className={inputCls}
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-10">
        <div>
          <label className={labelCls}>Phone</label>
          <input
            type="tel"
            placeholder="Optional"
            className={inputCls}
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>Order Type</label>
          <select
            required
            className={inputCls + " bg-[#0B0B0B]"}
            value={form.order_type}
            onChange={(e) => set("order_type", e.target.value)}
          >
            <option value="">Select...</option>
            <option value="Custom Cake">Custom Cake</option>
            <option value="Catering">Catering</option>
            <option value="Desserts">Desserts</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-10">
        <div>
          <label className={labelCls}>Event Date</label>
          <input
            type="date"
            className={inputCls + " bg-[#0B0B0B]"}
            value={form.event_date}
            onChange={(e) => set("event_date", e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>Budget</label>
          <select
            className={inputCls + " bg-[#0B0B0B]"}
            value={form.budget}
            onChange={(e) => set("budget", e.target.value)}
          >
            <option value="">Select a range</option>
            <option value="Under $150">Under $150</option>
            <option value="$150 – $300">$150 – $300</option>
            <option value="$300 – $600">$300 – $600</option>
            <option value="$600+">$600+</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Describe Your Vision</label>
        <textarea
          rows={4}
          placeholder="Flavors, design style, number of guests, inspiration..."
          className={inputCls + " resize-none border-b"}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
        />
      </div>

      {status === "error" && (
        <p className="text-rose-400 text-sm -mt-4">{errorMsg}</p>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <button
          type="submit"
          disabled={status === "loading"}
          className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#F97316] to-[#FDBA74] text-[#0B0B0B] font-semibold text-sm tracking-wide px-9 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(249,115,22,0.45)] disabled:opacity-50"
        >
          {status === "loading" ? "Sending..." : "Submit Request"}
          {status !== "loading" && (
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          )}
        </button>
        <p className="text-white/25 text-xs tracking-wide">Response within 24 hours. No commitment required.</p>
      </div>
    </form>
  );
}
