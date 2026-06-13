"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, lead_type: "newsletter" }),
      });
      if (res.ok) {
        setState("success");
        setEmail("");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-semibold py-4 max-w-md mx-auto">
        <span>✓</span>
        <span>You&apos;re in. Welcome to the signal.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="your@email.com"
        className="flex-1 bg-[#151B2D] border border-white/[0.12] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 transition-colors"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors whitespace-nowrap shadow-[0_0_20px_rgba(59,130,246,0.25)]"
      >
        {state === "loading" ? "Subscribing…" : "Subscribe"}
      </button>
      {state === "error" && (
        <p className="w-full text-xs text-red-400 mt-1 text-center">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
