"use client";

import { useState } from "react";

interface OfferLeadFormProps {
  service: string;
  companySlug: string;
  ctaLabel: string;
  accentColor?: "blue" | "purple" | "green";
  variant?: "default" | "ai-leads" | "ai-content" | "partners";
  sourcePage?: string;
}

export default function OfferLeadForm({
  service,
  companySlug,
  ctaLabel,
  accentColor = "blue",
  variant = "default",
  sourcePage,
}: OfferLeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const get = (n: string) => (form.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null)?.value ?? "";

    const body: Record<string, string> = {
      name: get("name"),
      email: get("email"),
      service,
      companySlug,
    };

    if (sourcePage) body.sourcePage = sourcePage;

    // Shared optional
    const businessName = get("business_name");
    const message = get("message");
    if (businessName) body.businessName = businessName;
    if (message) body.message = message;

    // Variant-specific fields
    if (variant === "ai-leads") {
      const budgetRange = get("budget_range");
      const leadType = get("lead_type");
      if (budgetRange) body.budgetRange = budgetRange;
      if (leadType) body.lead_type = leadType;
    }

    if (variant === "ai-content") {
      const platform = get("platform");
      if (platform) body.platform = platform;
    }

    if (variant === "partners") {
      const website = get("website");
      const idealClient = get("ideal_client");
      if (website) body.website = website;
      if (idealClient) body.idealClient = idealClient;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        let msg = "Something went wrong";
        try {
          const json = await res.json();
          if (json.error) msg = json.error;
        } catch {}
        throw new Error(msg);
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  const accent = {
    blue: {
      ring: "focus:ring-blue-500/60 focus:border-blue-500/40",
      btn: "bg-blue-600 hover:bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.35)]",
    },
    purple: {
      ring: "focus:ring-purple-500/60 focus:border-purple-500/40",
      btn: "bg-purple-600 hover:bg-purple-500 shadow-[0_0_30px_rgba(139,92,246,0.35)]",
    },
    green: {
      ring: "focus:ring-green-500/60 focus:border-green-500/40",
      btn: "bg-green-600 hover:bg-green-500 shadow-[0_0_30px_rgba(34,197,94,0.35)]",
    },
  }[accentColor];

  const inputClass = `w-full bg-[#0B0F1A] border border-white/[0.1] rounded-lg px-4 py-3 text-sm text-[#F9FAFB] placeholder:text-[#A1A1AA]/50 focus:outline-none focus:ring-1 transition-colors ${accent.ring}`;
  const labelClass = "block text-xs font-semibold text-[#A1A1AA] mb-1.5";
  const btnClass = `w-full text-white px-6 py-4 rounded-xl font-bold text-base transition-colors disabled:opacity-50 ${accent.btn}`;

  if (status === "success") {
    return (
      <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-10 text-center">
        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-green-400">
            <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-bold text-green-400 text-xl mb-2">Request received.</p>
        <p className="text-green-400/70 text-sm">
          I&apos;ll review your info and follow up personally within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${companySlug}-name`} className={labelClass}>Your Name *</label>
          <input id={`${companySlug}-name`} name="name" type="text" required placeholder="Jane Smith" className={inputClass} />
        </div>
        <div>
          <label htmlFor={`${companySlug}-email`} className={labelClass}>Email Address *</label>
          <input id={`${companySlug}-email`} name="email" type="email" required placeholder="you@company.com" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor={`${companySlug}-biz`} className={labelClass}>
          Business Name <span className="text-[#A1A1AA]/40 font-normal">(optional)</span>
        </label>
        <input id={`${companySlug}-biz`} name="business_name" type="text" placeholder="Your business name" className={inputClass} />
      </div>

      {variant === "ai-leads" && (
        <>
          <div>
            <label htmlFor={`${companySlug}-lead-type`} className={labelClass}>What do you need most?</label>
            <select id={`${companySlug}-lead-type`} name="lead_type" className={inputClass}>
              <option value="">Select one...</option>
              <option value="Lead capture form / landing page">Lead capture form / landing page</option>
              <option value="AI follow-up automation">AI follow-up automation</option>
              <option value="CRM setup and pipeline">CRM setup and pipeline</option>
              <option value="Full lead system (all of the above)">Full lead system (all of the above)</option>
              <option value="Not sure — need a strategy call">Not sure — need a strategy call</option>
            </select>
          </div>
          <div>
            <label htmlFor={`${companySlug}-budget`} className={labelClass}>Monthly budget range</label>
            <select id={`${companySlug}-budget`} name="budget_range" className={inputClass}>
              <option value="">Select range...</option>
              <option value="Under $500/mo">Under $500/mo</option>
              <option value="$500–$1,000/mo">$500–$1,000/mo</option>
              <option value="$1,000–$2,500/mo">$1,000–$2,500/mo</option>
              <option value="$2,500+/mo">$2,500+/mo</option>
              <option value="One-time project">One-time project</option>
            </select>
          </div>
        </>
      )}

      {variant === "ai-content" && (
        <div>
          <label htmlFor={`${companySlug}-platform`} className={labelClass}>Where do you want to post?</label>
          <select id={`${companySlug}-platform`} name="platform" className={inputClass}>
            <option value="">Select platform(s)...</option>
            <option value="Instagram">Instagram</option>
            <option value="TikTok">TikTok</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="YouTube">YouTube / YouTube Shorts</option>
            <option value="Instagram + TikTok">Instagram + TikTok</option>
            <option value="Multiple platforms">Multiple platforms</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>
      )}

      {variant === "partners" && (
        <>
          <div>
            <label htmlFor={`${companySlug}-website`} className={labelClass}>
              Agency / Business Website <span className="text-[#A1A1AA]/40 font-normal">(optional)</span>
            </label>
            <input id={`${companySlug}-website`} name="website" type="url" placeholder="https://youragency.com" className={inputClass} />
          </div>
          <div>
            <label htmlFor={`${companySlug}-ideal`} className={labelClass}>Who is your ideal client?</label>
            <input id={`${companySlug}-ideal`} name="ideal_client" type="text" placeholder="e.g. local service businesses, med spas, coaches..." className={inputClass} />
          </div>
        </>
      )}

      <div>
        <label htmlFor={`${companySlug}-msg`} className={labelClass}>
          {variant === "partners" ? "Tell me about your agency and what you're looking for" : "Anything you'd like me to know?"}
          <span className="text-[#A1A1AA]/40 font-normal"> (optional)</span>
        </label>
        <textarea
          id={`${companySlug}-msg`}
          name="message"
          rows={3}
          placeholder={variant === "partners" ? "Services you offer, client size, partnership goals..." : "Tell me about your business or what you're trying to improve..."}
          className={inputClass + " resize-none"}
        />
      </div>

      {status === "error" && <p className="text-sm text-rose-400">{errorMsg}</p>}

      <button type="submit" disabled={status === "loading"} className={btnClass}>
        {status === "loading" ? "Sending..." : ctaLabel}
      </button>
      <p className="text-xs text-[#A1A1AA]/50 text-center">Free. No pressure. Personal response within 24 hours.</p>
    </form>
  );
}
