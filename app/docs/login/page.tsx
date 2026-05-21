"use client";

import { useState, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/docs";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/docs-auth?from=${encodeURIComponent(from)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Incorrect password.");
        return;
      }
      window.location.href = data.redirect ?? "/docs";
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
      <p className="text-sm text-white/50 text-center mb-6">Enter password to access documentation</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        />
        {error && <p className="text-xs text-rose-400/80 text-center">{error}</p>}
        <button
          type="submit"
          disabled={loading || !password}
          className="w-full py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-40"
          style={{ background: "rgba(59,130,246,0.9)", color: "white" }}
        >
          {loading ? "Checking..." : "Enter →"}
        </button>
      </form>
    </div>
  );
}

export default function DocsLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#080C16" }}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)", filter: "blur(60px)" }}
      />
      <div className="relative w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="text-2xl font-black tracking-[-0.03em] text-white mb-1">DWT Knowledge Base</p>
          <p className="text-xs text-white/20 tracking-[0.2em] uppercase">AI OS · Architecture · GH-600</p>
        </div>
        <Suspense fallback={<div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }} />}>
          <LoginForm />
        </Suspense>
        <p className="text-center text-xs text-white/15 mt-6">Digital Wealth Transfer · Jonathan Cardona</p>
      </div>
    </div>
  );
}
