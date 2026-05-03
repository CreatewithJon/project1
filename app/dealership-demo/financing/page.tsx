"use client";

import { useState } from "react";
import Link from "next/link";

const inputCls =
  "w-full bg-[#0A0A0A] border border-white/[0.1] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C]/40 transition-colors";
const labelCls =
  "block text-[11px] font-semibold text-white/40 uppercase tracking-[0.12em] mb-2";
const selectCls = inputCls + " bg-[#0A0A0A]";

export default function FinancingPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle_interested_in: "",
    budget: "",
    down_payment: "",
    credit_range: "",
    trade_in: "",
    preferred_contact: "",
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
          ...form,
          lead_type: "financing_application",
          source_page: "/dealership-demo/financing",
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

  return (
    <div className="bg-[#080808] text-white min-h-screen font-sans">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/95 backdrop-blur-md border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 h-16 flex items-center justify-between">
          <Link href="/dealership-demo">
            <div>
              <p className="text-white font-black text-lg tracking-tight leading-none">ELITE AUTO</p>
              <p className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.25em] uppercase">Collection</p>
            </div>
          </Link>
          <div className="hidden sm:flex items-center gap-8 text-sm">
            <Link href="/dealership-demo/inventory" className="text-white/50 hover:text-white transition-colors">Inventory</Link>
            <Link href="/dealership-demo/financing" className="text-white font-semibold transition-colors">Financing</Link>
            <Link href="/dealership-demo/sell-your-car" className="text-white/50 hover:text-white transition-colors">Sell / Trade</Link>
          </div>
          <Link
            href="/dealership-demo/financing"
            className="bg-[#C9A84C] hover:bg-[#FDBA74] text-black text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-[0_4px_20px_rgba(201,168,76,0.35)]"
          >
            Get Pre-Approved
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div className="pt-32 pb-16 px-5 sm:px-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

        {/* Left — Copy */}
        <div>
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C9A84C] mb-4">
            In-House Financing
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight mb-5">
            We work with all<br />credit situations.
          </h1>
          <p className="text-white/50 text-base leading-relaxed mb-10 max-w-lg">
            Don&apos;t let credit stop you from driving your dream car. Our finance team has creative solutions for buyers who&apos;ve been turned down elsewhere — and competitive rates for those who haven&apos;t.
          </p>

          {/* Trust points */}
          <div className="space-y-5">
            {[
              { icon: "✓", title: "All credit considered", desc: "From excellent to rebuilding — we review every application personally." },
              { icon: "✓", title: "Fast approvals", desc: "Most applicants hear back within 2–4 hours during business hours." },
              { icon: "✓", title: "Flexible down payments", desc: "We work with what you have. Bring your trade-in to reduce your out-of-pocket." },
              { icon: "✓", title: "No hard sell", desc: "Fill out the form, get a call. You drive the conversation — no pressure tactics." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#C9A84C] text-xs font-bold">{item.icon}</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm mb-0.5">{item.title}</p>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stat row */}
          <div className="mt-12 pt-10 border-t border-white/[0.06] grid grid-cols-3 gap-6">
            {[
              { value: "98%", label: "Approval rate" },
              { value: "2hrs", label: "Avg. response" },
              { value: "500+", label: "Cars financed" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-black text-[#C9A84C] tracking-tight">{s.value}</p>
                <p className="text-white/40 text-xs mt-1 tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div>
          {status === "success" ? (
            <div className="bg-[#0F1A0A] border border-green-500/20 rounded-2xl p-10 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-green-400">
                  <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="font-bold text-white text-xl mb-2">Application received.</p>
              <p className="text-white/40 text-sm leading-relaxed">
                Our finance team will reach out within 2 hours during business hours to discuss your options.
              </p>
            </div>
          ) : (
            <div className="bg-[#0F0F0F] border border-white/[0.08] rounded-2xl p-8">
              <p className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Buyer Application</p>
              <h2 className="text-white font-black text-2xl tracking-tight mb-6">Get Pre-Qualified</h2>

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
                  <label className={labelCls}>Phone *</label>
                  <input type="tel" required placeholder="+1 702 555 0100" className={inputCls}
                    value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                </div>

                <div>
                  <label className={labelCls}>Vehicle Interested In</label>
                  <input type="text" placeholder="e.g. 2022 Lamborghini Huracán, or open to suggestions" className={inputCls}
                    value={form.vehicle_interested_in} onChange={(e) => set("vehicle_interested_in", e.target.value)} />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>Budget Range</label>
                    <select className={selectCls} value={form.budget} onChange={(e) => set("budget", e.target.value)}>
                      <option value="">Select range...</option>
                      <option value="Under $50k">Under $50,000</option>
                      <option value="$50k – $100k">$50,000 – $100,000</option>
                      <option value="$100k – $200k">$100,000 – $200,000</option>
                      <option value="$200k – $350k">$200,000 – $350,000</option>
                      <option value="$350k+">$350,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Down Payment</label>
                    <select className={selectCls} value={form.down_payment} onChange={(e) => set("down_payment", e.target.value)}>
                      <option value="">Select...</option>
                      <option value="Under $5k">Under $5,000</option>
                      <option value="$5k – $15k">$5,000 – $15,000</option>
                      <option value="$15k – $30k">$15,000 – $30,000</option>
                      <option value="$30k – $50k">$30,000 – $50,000</option>
                      <option value="$50k+">$50,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Credit Range</label>
                  <select className={selectCls} value={form.credit_range} onChange={(e) => set("credit_range", e.target.value)}>
                    <option value="">Select credit range...</option>
                    <option value="Excellent (720+)">Excellent (720+)</option>
                    <option value="Good (660–719)">Good (660–719)</option>
                    <option value="Fair (600–659)">Fair (600–659)</option>
                    <option value="Below 600">Below 600</option>
                    <option value="Not sure">Not sure</option>
                  </select>
                </div>

                <div>
                  <label className={labelCls}>Do You Have a Trade-In?</label>
                  <select className={selectCls} value={form.trade_in} onChange={(e) => set("trade_in", e.target.value)}>
                    <option value="">Select...</option>
                    <option value="No trade-in">No trade-in</option>
                    <option value="Yes – car">Yes — Car</option>
                    <option value="Yes – truck/SUV">Yes — Truck / SUV</option>
                    <option value="Yes – exotic/custom">Yes — Exotic or Custom</option>
                  </select>
                </div>

                <div>
                  <label className={labelCls}>Preferred Contact Method</label>
                  <select className={selectCls} value={form.preferred_contact} onChange={(e) => set("preferred_contact", e.target.value)}>
                    <option value="">Select...</option>
                    <option value="Phone call">Phone Call</option>
                    <option value="Text">Text Message</option>
                    <option value="Email">Email</option>
                    <option value="WhatsApp">WhatsApp</option>
                  </select>
                </div>

                <div>
                  <label className={labelCls}>Message (optional)</label>
                  <textarea rows={3} placeholder="Anything else we should know about your situation?"
                    className={inputCls + " resize-none"}
                    value={form.message} onChange={(e) => set("message", e.target.value)} />
                </div>

                {status === "error" && <p className="text-rose-400 text-sm">{errorMsg}</p>}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group w-full flex items-center justify-center gap-3 bg-[#C9A84C] hover:bg-[#FDBA74] text-black font-bold text-sm tracking-wide py-4 rounded-xl transition-all duration-300 hover:shadow-[0_6px_25px_rgba(201,168,76,0.4)] disabled:opacity-50"
                >
                  {status === "loading" ? "Submitting..." : "Submit Application"}
                  {status !== "loading" && <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>}
                </button>
                <p className="text-white/20 text-xs text-center">Typically respond within 2 hours · No commitment required</p>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#080808] border-t border-white/[0.05] px-5 sm:px-10 py-8 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-black text-base tracking-tight">ELITE AUTO</p>
            <p className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.25em] uppercase">Collection</p>
          </div>
          <p className="text-white/20 text-xs text-center">
            Demo concept. Not a real dealership. Built by{" "}
            <Link href="/" className="text-[#C9A84C]/60 hover:text-[#C9A84C] transition-colors">
              Digital Wealth Transfer
            </Link>
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            <Link href="/dealership-demo/inventory" className="hover:text-white/60 transition-colors">Inventory</Link>
            <Link href="/dealership-demo/financing" className="hover:text-white/60 transition-colors">Financing</Link>
            <Link href="/dealership-demo/sell-your-car" className="hover:text-white/60 transition-colors">Sell</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
