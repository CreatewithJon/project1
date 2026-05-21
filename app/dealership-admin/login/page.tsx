"use client";

import { useState, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/dealership-admin";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/dealership-admin-auth?from=${encodeURIComponent(from)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Incorrect password.");
        return;
      }
      window.location.href = data.redirect ?? "/dealership-admin";
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
      <p className="text-sm text-white/50 text-center mb-6">Enter admin password to continue</p>
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
          style={{ background: "rgba(201,168,76,0.9)", color: "black" }}
        >
          {loading ? "Checking..." : "Enter →"}
        </button>
      </form>
    </div>
  );
}

export default function DealershipAdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#080808" }}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)", filter: "blur(60px)" }}
      />
      <div className="relative w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="text-2xl font-black tracking-[-0.03em] text-white mb-1">SHAFIK N SONS</p>
          <p className="text-xs text-[#C9A84C]/60 tracking-[0.25em] uppercase">Inventory Admin</p>
        </div>
        <Suspense fallback={<div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }} />}>
          <LoginForm />
        </Suspense>
        <p className="text-center text-xs text-white/15 mt-6">Shafik N Sons · Oxnard, CA</p>
      </div>
    </div>
  );
}
