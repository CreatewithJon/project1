"use client";

import { useState } from "react";

export default function ProviderLeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const company_name = (form.elements.namedItem("company_name") as HTMLInputElement).value;
    const services_offered = (form.elements.namedItem("services_offered") as HTMLTextAreaElement).value;
    const location = (form.elements.namedItem("location") as HTMLInputElement).value;
    const ideal_client = (form.elements.namedItem("ideal_client") as HTMLTextAreaElement).value;

    const serviceSummary = [
      `Company: ${company_name}`,
      `Services: ${services_offered}`,
      `Location: ${location}`,
      `Ideal client: ${ideal_client}`,
    ].filter(Boolean).join(" | ");

    const body = {
      name,
      email,
      service: serviceSummary,
      companySlug: "provider-application",
      lead_type: "provider_application",
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
        <p className="font-semibold text-green-800 mb-1 text-lg">Application received.</p>
        <p className="text-sm text-green-700">
          We review every application manually. We'll follow up within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="pf-name" className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Your Name *
          </label>
          <input
            id="pf-name"
            name="name"
            type="text"
            required
            placeholder="Jonathan Smith"
            className="w-full border border-zinc-300 rounded-md px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="pf-company" className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Company Name *
          </label>
          <input
            id="pf-company"
            name="company_name"
            type="text"
            required
            placeholder="Acme AI Solutions"
            className="w-full border border-zinc-300 rounded-md px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="pf-email" className="block text-xs font-semibold text-zinc-700 mb-1.5">
          Work Email *
        </label>
        <input
          id="pf-email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          className="w-full border border-zinc-300 rounded-md px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="pf-services" className="block text-xs font-semibold text-zinc-700 mb-1.5">
          Services You Offer *
        </label>
        <textarea
          id="pf-services"
          name="services_offered"
          rows={2}
          required
          placeholder="e.g. Enterprise AI, blockchain infrastructure, digital asset custody..."
          className="w-full border border-zinc-300 rounded-md px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <div>
        <label htmlFor="pf-location" className="block text-xs font-semibold text-zinc-700 mb-1.5">
          Location / Areas Served *
        </label>
        <input
          id="pf-location"
          name="location"
          type="text"
          required
          placeholder="Las Vegas, NV · Nationwide"
          className="w-full border border-zinc-300 rounded-md px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="pf-ideal" className="block text-xs font-semibold text-zinc-700 mb-1.5">
          Describe Your Ideal Client *
        </label>
        <textarea
          id="pf-ideal"
          name="ideal_client"
          rows={3}
          required
          placeholder="e.g. Mid-size financial firms adopting AI, crypto-native family offices, startups building on blockchain..."
          className="w-full border border-zinc-300 rounded-md px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-zinc-900 text-white px-4 py-3 rounded-md text-sm font-semibold hover:bg-zinc-700 transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Apply as a Provider →"}
      </button>
      <p className="text-xs text-zinc-400 text-center">Every application is reviewed manually. Response within 24 hours.</p>
    </form>
  );
}
