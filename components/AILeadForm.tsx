"use client";

import { useState } from "react";

export default function AILeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const body = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      business_name: (form.elements.namedItem("business_name") as HTMLInputElement).value,
      website: (form.elements.namedItem("website") as HTMLInputElement).value,
      industry: (form.elements.namedItem("industry") as HTMLInputElement).value,
      service_need: (form.elements.namedItem("service_need") as HTMLSelectElement).value,
      budget: (form.elements.namedItem("budget") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/ai-leads", {
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
      <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-10 text-center">
        <p className="font-bold text-green-400 text-xl mb-2">Request received.</p>
        <p className="text-green-400/70 text-sm">
          I&apos;ll review your info and follow up personally within 24 hours.
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
          <label htmlFor="al-name" className={labelClass}>Your Name *</label>
          <input id="al-name" name="name" type="text" required placeholder="Jane Smith" className={inputClass} />
        </div>
        <div>
          <label htmlFor="al-email" className={labelClass}>Email Address *</label>
          <input id="al-email" name="email" type="email" required placeholder="you@company.com" className={inputClass} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="al-business" className={labelClass}>Business Name</label>
          <input id="al-business" name="business_name" type="text" placeholder="Acme Corp" className={inputClass} />
        </div>
        <div>
          <label htmlFor="al-website" className={labelClass}>Website</label>
          <input id="al-website" name="website" type="text" placeholder="yourwebsite.com" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="al-industry" className={labelClass}>Industry</label>
        <input id="al-industry" name="industry" type="text" placeholder="e.g. Real Estate, Med Spa, Law Firm..." className={inputClass} />
      </div>

      <div>
        <label htmlFor="al-service" className={labelClass}>What do you need? *</label>
        <select id="al-service" name="service_need" required className={inputClass}>
          <option value="">Select a service...</option>
          <option value="Landing Page">Landing Page</option>
          <option value="AI Chatbot">AI Chatbot</option>
          <option value="CRM Setup">CRM Setup</option>
          <option value="Automated Follow-Up">Automated Follow-Up</option>
          <option value="Content System">Content System</option>
          <option value="Not Sure Yet">Not Sure Yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="al-budget" className={labelClass}>Budget</label>
        <select id="al-budget" name="budget" className={inputClass}>
          <option value="">Select a budget...</option>
          <option value="$500">$500</option>
          <option value="$1,000">$1,000</option>
          <option value="$1,500+">$1,500+</option>
          <option value="Not sure">Not sure</option>
        </select>
      </div>

      <div>
        <label htmlFor="al-message" className={labelClass}>Anything else? <span className="text-[#A1A1AA]/40 font-normal">(optional)</span></label>
        <textarea
          id="al-message"
          name="message"
          rows={3}
          placeholder="Tell me about your business, your biggest challenge, or what you want to improve..."
          className={inputClass + " resize-none"}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-rose-400">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-blue-600 text-white px-4 py-3.5 rounded-xl text-sm font-bold hover:bg-blue-500 transition-colors disabled:opacity-50 shadow-[0_0_25px_rgba(59,130,246,0.3)]"
      >
        {status === "loading" ? "Sending..." : "Get My AI System →"}
      </button>
      <p className="text-xs text-[#A1A1AA]/50 text-center">Free consultation. No pressure. Response within 24 hours.</p>
    </form>
  );
}
