"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputCls =
  "w-full bg-[#0C0906] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-[#FDF8F0] placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/30 transition-colors";
const labelCls = "block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5";

export default function OrderForm() {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Your Name *</label>
          <input
            type="text"
            required
            placeholder="Sarah Johnson"
            className={inputCls}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>Email Address *</label>
          <input
            type="email"
            required
            placeholder="sarah@email.com"
            className={inputCls}
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Phone <span className="text-white/25 font-normal normal-case">(optional)</span></label>
          <input
            type="tel"
            placeholder="+1 702 555 0100"
            className={inputCls}
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>Order Type *</label>
          <select
            required
            className={inputCls}
            value={form.order_type}
            onChange={(e) => set("order_type", e.target.value)}
          >
            <option value="">Select an option...</option>
            <option value="Custom Cake">Custom Cake</option>
            <option value="Catering">Catering</option>
            <option value="Desserts">Desserts</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Event Date <span className="text-white/25 font-normal normal-case">(optional)</span></label>
          <input
            type="date"
            className={inputCls}
            value={form.event_date}
            onChange={(e) => set("event_date", e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>Budget <span className="text-white/25 font-normal normal-case">(optional)</span></label>
          <select
            className={inputCls}
            value={form.budget}
            onChange={(e) => set("budget", e.target.value)}
          >
            <option value="">Select a range...</option>
            <option value="Under $150">Under $150</option>
            <option value="$150 – $300">$150 – $300</option>
            <option value="$300 – $600">$300 – $600</option>
            <option value="$600+">$600+</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Tell us about your order <span className="text-white/25 font-normal normal-case">(optional)</span></label>
        <textarea
          rows={4}
          placeholder="Describe your vision — flavors, design style, number of guests, any inspiration photos..."
          className={inputCls + " resize-none"}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
        />
      </div>

      {status === "error" && (
        <p className="text-rose-400 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-amber-500 hover:bg-amber-400 text-[#0C0906] font-bold text-base py-4 rounded-xl transition-colors disabled:opacity-50 shadow-[0_0_30px_rgba(245,158,11,0.35)]"
      >
        {status === "loading" ? "Sending your request..." : "Request My Cake →"}
      </button>

      <p className="text-xs text-white/25 text-center">
        We respond within 24 hours. No commitment required.
      </p>
    </form>
  );
}
