"use client";

import { useState } from "react";
import Link from "next/link";
import { vehicles, formatPrice } from "@/lib/data/vehicles";
import VehicleCard from "@/components/dealership/VehicleCard";
import AIChatWidget from "@/components/dealership/AIChatWidget";

type Filter = "all" | "lowrider" | "exotic" | "luxury-suv" | "mercedes" | "under100" | "over100";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All Vehicles" },
  { key: "lowrider", label: "Lowriders" },
  { key: "exotic", label: "Exotics" },
  { key: "luxury-suv", label: "Luxury SUVs" },
  { key: "mercedes", label: "Mercedes-Benz" },
  { key: "under100", label: "Under $100K" },
  { key: "over100", label: "Over $100K" },
];

export default function InventoryPage() {
  const [active, setActive] = useState<Filter>("all");

  const filtered = vehicles.filter((v) => {
    if (active === "all") return true;
    if (active === "under100") return v.price < 100000;
    if (active === "over100") return v.price >= 100000;
    return v.category === active;
  });

  return (
    <div className="bg-[#080808] text-white min-h-screen font-sans">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/95 backdrop-blur-md border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 h-16 flex items-center justify-between">
          <Link href="/dealership-demo">
            <div>
              <p className="text-white font-black text-lg tracking-tight leading-none">SHAFIK N SONS</p>
              <p className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.25em] uppercase">Oxnard, California</p>
            </div>
          </Link>
          <div className="hidden sm:flex items-center gap-8 text-sm">
            <Link href="/dealership-demo/inventory" className="text-white transition-colors font-semibold">Inventory</Link>
            <Link href="/dealership-demo/financing" className="text-white/50 hover:text-white transition-colors">Financing</Link>
            <Link href="/dealership-demo/sell-your-car" className="text-white/50 hover:text-white transition-colors">Sell / Trade</Link>
          </div>
          <Link
            href="/dealership-demo/financing"
            className="bg-[#C9A84C] hover:bg-[#FDBA74] text-black text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-[0_4px_20px_rgba(201,168,76,0.35)]"
          >
            Get Pre-Approved
          </Link>
        </div>
      </nav>

      {/* Page Header */}
      <div className="pt-32 pb-12 px-5 sm:px-10 max-w-7xl mx-auto">
        <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C9A84C] mb-3">
          Browse the Collection
        </p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-3">
          Current Inventory
        </h1>
        <p className="text-white/40 text-base max-w-xl">
          {vehicles.length} vehicles available. Updated daily. All prices include certification inspection.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-16 z-40 bg-[#080808]/95 backdrop-blur-md border-b border-white/[0.05] px-5 sm:px-10">
        <div className="max-w-7xl mx-auto py-4 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`whitespace-nowrap text-xs font-bold px-4 py-2 rounded-full border transition-all duration-200 ${
                active === f.key
                  ? "bg-[#C9A84C] border-[#C9A84C] text-black"
                  : "border-white/[0.1] text-white/50 hover:text-white hover:border-white/30"
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto whitespace-nowrap text-white/30 text-xs shrink-0">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-10 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-white/30 text-lg">No vehicles match this filter.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((v) => (
              <VehicleCard key={v.slug} vehicle={v} />
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-white/[0.05] bg-[#0F0F0F] py-20 px-5 sm:px-10 text-center">
        <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-4">Don&apos;t see what you&apos;re looking for?</p>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
          We source vehicles on request.
        </h2>
        <p className="text-white/40 text-base mb-8 max-w-lg mx-auto">
          Tell us what you want — make, model, year, color, build — and we&apos;ll find it or build it.
        </p>
        <Link
          href="/dealership-demo/financing"
          className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#FDBA74] text-black font-bold text-sm tracking-wide px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,168,76,0.4)]"
        >
          Submit a Vehicle Request →
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-[#080808] border-t border-white/[0.05] px-5 sm:px-10 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-black text-base tracking-tight">SHAFIK N SONS</p>
            <p className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.25em] uppercase">Oxnard, California</p>
          </div>
          <p className="text-white/20 text-xs text-center">
            Demo concept. Not a real dealership. Built by{" "}
            <Link href="/" className="text-[#C9A84C]/60 hover:text-[#C9A84C] transition-colors">
              Digital Wealth Transfer
            </Link>
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            <Link href="/dealership-demo" className="hover:text-white/60 transition-colors">Home</Link>
            <Link href="/dealership-demo/financing" className="hover:text-white/60 transition-colors">Financing</Link>
            <Link href="/dealership-demo/sell-your-car" className="hover:text-white/60 transition-colors">Sell</Link>
          </div>
        </div>
      </footer>

      <AIChatWidget />
    </div>
  );
}
