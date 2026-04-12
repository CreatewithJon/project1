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
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <p className="font-semibold text-green-800 mb-1 text-lg">Request received.</p>
        <p className="text-sm text-green-700">
          We'll follow up within 24 hours with matched providers.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="bf-name" className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Your Name *
          </label>
          <input
            id="bf-name"
            name="name"
            type="text"
            required
            placeholder="Jane Smith"
            className="w-full border border-zinc-300 rounded-md px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="bf-business" className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Business Name *
          </label>
          <input
            id="bf-business"
            name="business_name"
            type="text"
            required
            placeholder="Acme Corp"
            className="w-full border border-zinc-300 rounded-md px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="bf-email" className="block text-xs font-semibold text-zinc-700 mb-1.5">
          Work Email *
        </label>
        <input
          id="bf-email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          className="w-full border border-zinc-300 rounded-md px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="bf-service" className="block text-xs font-semibold text-zinc-700 mb-1.5">
          Service Needed *
        </label>
        <select
          id="bf-service"
          name="service"
          required
          className="w-full border border-zinc-300 rounded-md px-3 py-2.5 text-sm text-zinc-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
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
        <label htmlFor="bf-budget" className="block text-xs font-semibold text-zinc-700 mb-1.5">
          Budget Range <span className="text-zinc-400 font-normal">(optional)</span>
        </label>
        <select
          id="bf-budget"
          name="budget"
          className="w-full border border-zinc-300 rounded-md px-3 py-2.5 text-sm text-zinc-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Prefer not to say</option>
          <option value="Under $5,000">Under $5,000</option>
          <option value="$5,000 – $25,000">$5,000 – $25,000</option>
          <option value="$25,000 – $100,000">$25,000 – $100,000</option>
          <option value="$100,000+">$100,000+</option>
        </select>
      </div>

      <div>
        <label htmlFor="bf-details" className="block text-xs font-semibold text-zinc-700 mb-1.5">
          Tell us more <span className="text-zinc-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="bf-details"
          name="details"
          rows={3}
          placeholder="Describe your project, timeline, or any specific requirements..."
          className="w-full border border-zinc-300 rounded-md px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-blue-600 text-white px-4 py-3 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Find My Match →"}
      </button>
      <p className="text-xs text-zinc-400 text-center">Free. No spam. Response within 24 hours.</p>
    </form>
  );
}
