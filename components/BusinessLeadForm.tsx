"use client";

import { useState } from "react";

export default function BusinessLeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const business_name = (form.elements.namedItem("business_name") as HTMLInputElement).value;
    const service = (form.elements.namedItem("service") as HTMLSelectElement).value;
    const budget = (form.elements.namedItem("budget") as HTMLSelectElement).value;
    const details = (form.elements.namedItem("details") as HTMLTextAreaElement).value;

    const serviceSummary = [
      `Service needed: ${service}`,
      business_name && `Business: ${business_name}`,
      budget && `Budget: ${budget}`,
      details && `Details: ${details}`,
    ].filter(Boolean).join(" | ");

    const body = {
      name,
      email,
      service: serviceSummary,
      companySlug: "business-request",
      lead_type: "business_request",
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

  if (status === "success") {
    return (
      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-8 text-center">
        <p className="font-semibold text-green-400 mb-1 text-lg">Request received.</p>
        <p className="text-sm text-green-400/70">
          We&apos;ll follow up within 24 hours with matched providers.
        </p>
      </div>
    );
  }

  const inputClass = "w-full bg-[#0B0F1A] border border-white/[0.1] rounded-lg px-3 py-2.5 text-sm text-[#F9FAFB] placeholder:text-[#A1A1AA]/50 focus:outline-none focus:ring-1 focus:ring-blue-500/60 focus:border-blue-500/40 transition-colors";
  const labelClass = "block text-xs font-semibold text-[#A1A1AA] mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="bf-name" className={labelClass}>Your Name *</label>
          <input id="bf-name" name="name" type="text" required placeholder="Jane Smith" className={inputClass} />
        </div>
        <div>
          <label htmlFor="bf-business" className={labelClass}>Business Name *</label>
          <input id="bf-business" name="business_name" type="text" required placeholder="Acme Corp" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="bf-email" className={labelClass}>Work Email *</label>
        <input id="bf-email" name="email" type="email" required placeholder="you@company.com" className={inputClass} />
      </div>

      <div>
        <label htmlFor="bf-service" className={labelClass}>Service Needed *</label>
        <select id="bf-service" name="service" required className={inputClass}>
          <option value="">Select a service...</option>
          <option value="Enterprise AI Solutions">Enterprise AI Solutions</option>
          <option value="AI Services / Custom AI">AI Services / Custom AI</option>
          <option value="Blockchain Infrastructure">Blockchain Infrastructure</option>
          <option value="Digital Asset Custody">Digital Asset Custody</option>
          <option value="Fintech / Payment Platforms">Fintech / Payment Platforms</option>
          <option value="AI Wealth Advisory">AI Wealth Advisory</option>
          <option value="Estate Tech / Digital Inheritance">Estate Tech / Digital Inheritance</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="bf-budget" className={labelClass}>
          Budget Range <span className="text-[#A1A1AA]/40 font-normal">(optional)</span>
        </label>
        <select id="bf-budget" name="budget" className={inputClass}>
          <option value="">Prefer not to say</option>
          <option value="Under $5,000">Under $5,000</option>
          <option value="$5,000 – $25,000">$5,000 – $25,000</option>
          <option value="$25,000 – $100,000">$25,000 – $100,000</option>
          <option value="$100,000+">$100,000+</option>
        </select>
      </div>

      <div>
        <label htmlFor="bf-details" className={labelClass}>
          Tell us more <span className="text-[#A1A1AA]/40 font-normal">(optional)</span>
        </label>
        <textarea
          id="bf-details"
          name="details"
          rows={3}
          placeholder="Describe your project, timeline, or any specific requirements..."
          className={inputClass + " resize-none"}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-rose-400">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-blue-600 text-white px-4 py-3 rounded-xl text-sm font-semibold hover:bg-blue-500 transition-colors disabled:opacity-50 shadow-[0_0_20px_rgba(59,130,246,0.25)]"
      >
        {status === "loading" ? "Sending..." : "Find My Match →"}
      </button>
      <p className="text-xs text-[#A1A1AA]/50 text-center">Free. No spam. Response within 24 hours.</p>
    </form>
  );
}
