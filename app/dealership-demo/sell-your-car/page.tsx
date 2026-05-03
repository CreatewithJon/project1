"use client";

import { useState } from "react";
import Link from "next/link";

const inputCls =
  "w-full bg-[#0A0A0A] border border-white/[0.1] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C]/40 transition-colors";
const labelCls =
  "block text-[11px] font-semibold text-white/40 uppercase tracking-[0.12em] mb-2";
const selectCls = inputCls + " bg-[#0A0A0A]";

export default function SellYourCarPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    year: "",
    make: "",
    model: "",
    trim: "",
    mileage: "",
    condition: "",
    asking_price: "",
    vin: "",
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
      const vehicleInfo = `${form.year} ${form.make} ${form.model} ${form.trim}`.trim();
      const res = await fetch("/api/dealership-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          vehicle_interested_in: vehicleInfo,
          budget: form.asking_price,
          message: [
            form.mileage ? `Mileage: ${form.mileage}` : "",
            form.condition ? `Condition: ${form.condition}` : "",
            form.vin ? `VIN: ${form.vin}` : "",
            form.message,
          ].filter(Boolean).join(" | "),
          lead_type: "sell_your_car",
          source_page: "/dealership-demo/sell-your-car",
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
            <Link href="/dealership-demo/financing" className="text-white/50 hover:text-white transition-colors">Financing</Link>
            <Link href="/dealership-demo/sell-your-car" className="text-white font-semibold transition-colors">Sell / Trade</Link>
          </div>
          <Link
            href="/dealership-demo/financing"
            className="bg-[#C9A84C] hover:bg-[#FDBA74] text-black text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-[0_4px_20px_rgba(201,168,76,0.35)]"
          >
            Get Pre-Approved
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="pt-32 pb-16 px-5 sm:px-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

        {/* Left — Copy */}
        <div>
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C9A84C] mb-4">
            Sell or Trade Your Vehicle
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight mb-5">
            We buy cars,<br />exotics & customs.
          </h1>
          <p className="text-white/50 text-base leading-relaxed mb-10 max-w-lg">
            Whether you&apos;re ready to sell outright or trade up to something in our inventory, we make it simple. No lowball offers. No runaround. Just a fair price and fast transaction.
          </p>

          {/* What we buy */}
          <div className="mb-10">
            <p className="text-white/30 text-xs uppercase tracking-wider font-semibold mb-5">What We Buy</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "🚗", label: "Luxury Cars", sub: "BMW, Mercedes, Audi, Lexus" },
                { icon: "🏎", label: "Exotics", sub: "Lambo, McLaren, Ferrari, Porsche" },
                { icon: "🚙", label: "SUVs", sub: "Range Rover, G-Wagon, Escalade" },
                { icon: "🎨", label: "Custom Builds", sub: "Lowriders, show cars, resto-mods" },
              ].map((item) => (
                <div key={item.label} className="bg-[#0F0F0F] border border-white/[0.06] rounded-xl p-4">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className="text-white font-bold text-sm mb-0.5">{item.label}</p>
                  <p className="text-white/40 text-xs leading-relaxed">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="space-y-5">
            <p className="text-white/30 text-xs uppercase tracking-wider font-semibold">How It Works</p>
            {[
              { step: "01", title: "Submit your vehicle details", desc: "Tell us about your car using the form. Takes less than 3 minutes." },
              { step: "02", title: "Get a fair offer", desc: "We review your submission and contact you with a real offer — no algorithm, no lowball opener." },
              { step: "03", title: "Close the deal", desc: "We handle the paperwork. You get paid. Or apply the value directly toward your next vehicle." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <span className="text-[#C9A84C] font-black text-sm w-6 shrink-0 mt-0.5">{item.step}</span>
                <div>
                  <p className="text-white font-bold text-sm mb-0.5">{item.title}</p>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
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
              <p className="font-bold text-white text-xl mb-2">Submission received.</p>
              <p className="text-white/40 text-sm leading-relaxed">
                We&apos;ll review your vehicle details and reach out within 2 hours with a fair offer.
              </p>
            </div>
          ) : (
            <div className="bg-[#0F0F0F] border border-white/[0.08] rounded-2xl p-8">
              <p className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Vehicle Submission</p>
              <h2 className="text-white font-black text-2xl tracking-tight mb-6">Tell Us About Your Car</h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Contact */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>Full Name *</label>
                    <input type="text" required placeholder="Your name" className={inputCls}
                      value={form.name} onChange={(e) => set("name", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>Phone *</label>
                    <input type="tel" required placeholder="+1 702 555 0100" className={inputCls}
                      value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Email *</label>
                  <input type="email" required placeholder="your@email.com" className={inputCls}
                    value={form.email} onChange={(e) => set("email", e.target.value)} />
                </div>

                {/* Vehicle info */}
                <div className="pt-2 pb-1 border-t border-white/[0.06]">
                  <p className="text-white/30 text-[11px] uppercase tracking-wider font-semibold">Vehicle Information</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className={labelCls}>Year *</label>
                    <input type="text" required placeholder="2021" className={inputCls}
                      value={form.year} onChange={(e) => set("year", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>Make *</label>
                    <input type="text" required placeholder="Lamborghini" className={inputCls}
                      value={form.make} onChange={(e) => set("make", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>Model *</label>
                    <input type="text" required placeholder="Huracán" className={inputCls}
                      value={form.model} onChange={(e) => set("model", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>Trim</label>
                    <input type="text" placeholder="Spyder" className={inputCls}
                      value={form.trim} onChange={(e) => set("trim", e.target.value)} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>Mileage</label>
                    <input type="text" placeholder="e.g. 12,400" className={inputCls}
                      value={form.mileage} onChange={(e) => set("mileage", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>Condition</label>
                    <select className={selectCls} value={form.condition} onChange={(e) => set("condition", e.target.value)}>
                      <option value="">Select...</option>
                      <option value="Show quality">Show Quality</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair (needs work)">Fair (needs work)</option>
                      <option value="Project car">Project / Parts</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>Asking Price</label>
                    <input type="text" placeholder="e.g. $75,000 or open to offers" className={inputCls}
                      value={form.asking_price} onChange={(e) => set("asking_price", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>VIN (optional)</label>
                    <input type="text" placeholder="Last 6 digits is fine" className={inputCls}
                      value={form.vin} onChange={(e) => set("vin", e.target.value)} />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Additional Details</label>
                  <textarea rows={3} placeholder="Mods, service history, reason for selling, photos available, etc."
                    className={inputCls + " resize-none"}
                    value={form.message} onChange={(e) => set("message", e.target.value)} />
                </div>

                {status === "error" && <p className="text-rose-400 text-sm">{errorMsg}</p>}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group w-full flex items-center justify-center gap-3 bg-[#C9A84C] hover:bg-[#FDBA74] text-black font-bold text-sm tracking-wide py-4 rounded-xl transition-all duration-300 hover:shadow-[0_6px_25px_rgba(201,168,76,0.4)] disabled:opacity-50"
                >
                  {status === "loading" ? "Submitting..." : "Submit My Vehicle"}
                  {status !== "loading" && <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>}
                </button>
                <p className="text-white/20 text-xs text-center">We respond within 2 hours · No commitment required</p>
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
