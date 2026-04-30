"use client";

import { useState } from "react";

interface LeadFormProps {
  companySlug: string;
  companyName: string;
}

export default function LeadForm({ companySlug, companyName }: LeadFormProps) {
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
      service: (form.elements.namedItem("service") as HTMLTextAreaElement).value,
      companySlug,
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
      <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center">
        <p className="font-bold text-green-400 text-lg mb-1">Request sent!</p>
        <p className="text-sm text-green-400/70">
          Your request has been received. Jonathan will follow up within 24 hours with next steps.
        </p>
      </div>
    );
  }

  const inputClass = "w-full bg-[#0B0F1A] border border-white/[0.1] rounded-lg px-3 py-2.5 text-sm text-[#F9FAFB] placeholder:text-[#A1A1AA]/50 focus:outline-none focus:ring-1 focus:ring-blue-500/60 focus:border-blue-500/40 transition-colors";
  const labelClass = "block text-xs font-semibold text-[#A1A1AA] mb-1.5";

  return (
    <div className="bg-[#151B2D] border border-white/[0.08] rounded-2xl p-6">
      <h2 className="font-bold text-white text-lg mb-1">Request an Introduction to {companyName}</h2>
      <p className="text-sm text-[#A1A1AA] mb-5">
        Submit your request and Jonathan Cardona will personally facilitate an introduction within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="lf-name" className={labelClass}>Name *</label>
          <input id="lf-name" name="name" type="text" required placeholder="Your full name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="lf-email" className={labelClass}>Email *</label>
          <input id="lf-email" name="email" type="email" required placeholder="you@company.com" className={inputClass} />
        </div>
        <div>
          <label htmlFor="lf-service" className={labelClass}>What are you looking for?</label>
          <textarea
            id="lf-service"
            name="service"
            rows={3}
            placeholder="Describe what you need or the problem you're trying to solve..."
            className={inputClass + " resize-none"}
          />
        </div>

        {status === "error" && <p className="text-sm text-rose-400">{errorMsg}</p>}

        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-blue-600 text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-blue-500 transition-colors disabled:opacity-50 shadow-[0_0_20px_rgba(59,130,246,0.25)]"
        >
          {status === "loading" ? "Sending..." : "Get Connected →"}
        </button>
        <p className="text-xs text-[#A1A1AA]/50 text-center">Free. Personal response within 24 hours.</p>
      </form>
    </div>
  );
}
