"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    // Simulate async signup — replace with real API call later
    setTimeout(() => setStatus("success"), 800);
  }

  if (status === "success") {
    return (
      <p className="text-sm text-green-700 font-medium">
        You&apos;re in. We&apos;ll be in touch with the latest from the Las Vegas digital wealth market.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 border border-zinc-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-blue-600 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-60 whitespace-nowrap"
      >
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
}
