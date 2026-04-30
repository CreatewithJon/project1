"use client";

import { useState } from "react";

export default function CTAForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const business_type = (form.elements.namedItem("business_type") as HTMLInputElement).value;
    const goal = (form.elements.namedItem("goal") as HTMLSelectElement).value;

    const body = {
      name,
      email,
      service: `AI Strategy | Business type: ${business_type} | Goal: ${goal}`,
      companySlug: "general-inquiry",
      lead_type: "ai_strategy",
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        let message = "Something went wrong";
        try {
          const json = await res.json();
          if (json.error) message = json.error;
        } catch {}
        throw new Error(message);
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  const inputClass = "w-full bg-[#0B0F1A] border border-white/[0.1] rounded-lg px-4 py-3 text-sm text-[#F9FAFB] placeholder:text-[#A1A1AA]/50 focus:outline-none focus:ring-1 focus:ring-blue-500/60 focus:border-blue-500/40 transition-colors";
  const labelClass = "block text-xs font-semibold text-[#A1A1AA] mb-1.5";

  if (status === "success") {
    return (
      <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-12 text-center">
        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-green-400">
            <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-bold text-green-400 text-xl mb-2">Request received.</p>
        <p className="text-green-400/70 text-sm">
          Your request has been received. We&apos;ll reach out shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cta-name" className={labelClass}>Name *</label>
          <input id="cta-name" name="name" type="text" required placeholder="Your full name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="cta-email" className={labelClass}>Email *</label>
          <input id="cta-email" name="email" type="email" required placeholder="you@company.com" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="cta-business" className={labelClass}>Business Type</label>
        <input id="cta-business" name="business_type" type="text" placeholder="e.g. Real Estate, Med Spa, Law Firm..." className={inputClass} />
      </div>

      <div>
        <label htmlFor="cta-goal" className={labelClass}>What do you want to improve?</label>
        <select id="cta-goal" name="goal" className={inputClass}>
          <option value="">Select your main goal...</option>
          <option value="Leads / Sales">Leads / Sales</option>
          <option value="Automation">Automation</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {status === "error" && (
        <p className="text-sm text-rose-400">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl font-bold text-base hover:bg-blue-500 transition-colors disabled:opacity-50 shadow-[0_0_30px_rgba(59,130,246,0.35)] mt-1"
      >
        {status === "loading" ? "Sending..." : "Get My Free AI Strategy →"}
      </button>
      <p className="text-xs text-[#A1A1AA]/50 text-center">Free. No pressure. We&apos;ll reach out within 24 hours.</p>
    </form>
  );
}
