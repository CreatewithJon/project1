"use client";

import { useState } from "react";

export default function LandingLeadForm() {
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
      companySlug: "general-inquiry",
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
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center max-w-xl mx-auto">
        <p className="font-semibold text-green-800 mb-1 text-lg">You're in.</p>
        <p className="text-sm text-green-700">
          I'll review your request and be in touch within 24 hours with next steps.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-8 max-w-xl mx-auto w-full">
      <p className="text-sm text-zinc-500 mb-6 text-center">
        Tell us what you're looking for and we'll connect you with the right provider.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="lf-name" className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Your Name
          </label>
          <input
            id="lf-name"
            name="name"
            type="text"
            required
            placeholder="Jonathan Smith"
            className="w-full border border-zinc-300 rounded-md px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="lf-email" className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Work Email
          </label>
          <input
            id="lf-email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className="w-full border border-zinc-300 rounded-md px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="lf-service" className="block text-xs font-semibold text-zinc-700 mb-1.5">
            What service are you looking for?
          </label>
          <textarea
            id="lf-service"
            name="service"
            rows={3}
            placeholder="e.g. AI advisory, digital asset custody, blockchain infrastructure..."
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
          {status === "loading" ? "Sending..." : "Get Started"}
        </button>
      </form>
    </div>
  );
}
