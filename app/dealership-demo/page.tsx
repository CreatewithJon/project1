import type { Metadata } from "next";
import Link from "next/link";
import { formatPrice } from "@/lib/data/vehicles";
import type { Vehicle } from "@/lib/data/vehicles";
import { getSupabase, dbToVehicle } from "@/lib/db/vehicles";
import VehicleCard from "@/components/dealership/VehicleCard";
import SectionHeader from "@/components/dealership/SectionHeader";
import StatCard from "@/components/dealership/StatCard";
import CTASection from "@/components/dealership/CTASection";
import LeadForm from "@/components/dealership/LeadForm";
import AIChatWidget from "@/components/dealership/AIChatWidget";
import ScrollVideoHero from "@/components/dealership/ScrollVideoHero";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shafik N Sons — Family Owned. Premium Vehicles. Oxnard, CA.",
  description:
    "Family-owned dealership based in Oxnard, California. Lowriders, exotics, luxury SUVs, and custom builds. Lamborghini, McLaren, Range Rover, G-Wagon, and more.",
};

async function getInventory(): Promise<Vehicle[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("sold", false)
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data.map(dbToVehicle);
  } catch {
    return [];
  }
}

const reasons = [
  {
    title: "Exotic & Custom Specialists",
    desc: "From Lamborghinis to hand-built lowriders — we source, build, and sell vehicles that mainstream dealers won't touch.",
  },
  {
    title: "Family Owned. Oxnard Built.",
    desc: "Based in Oxnard, California — no commission pressure, no bait-and-switch pricing. We've been doing this for 15 years because we actually love cars.",
  },
  {
    title: "In-House Financing",
    desc: "We work with buyers across the credit spectrum. Our finance team finds solutions where other dealers say no.",
  },
  {
    title: "Trade-Ins Welcome",
    desc: "Bring your current vehicle. We buy cars, exotics, trucks, and customs — and apply fair market value to your purchase.",
  },
];

export default async function DealershipDemoPage() {
  const allVehicles = await getInventory();
  const featured = allVehicles.filter((v) => v.featured).slice(0, 3);

  return (
    <div className="bg-[#080808] text-white font-sans min-h-screen">

      {/* ── Demo Banner ──────────────────────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] py-2 px-4 text-center text-[11px] font-semibold"
        style={{
          background: "linear-gradient(90deg, rgba(201,168,76,0.12), rgba(201,168,76,0.06), rgba(201,168,76,0.12))",
          borderBottom: "1px solid rgba(201,168,76,0.2)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span className="text-white/40">Demo Site · </span>
        <span className="text-[#C9A84C]/90">Built by </span>
        <Link
          href="/"
          className="text-[#C9A84C] font-bold hover:text-[#FDBA74] transition-colors"
        >
          Digital Wealth Transfer
        </Link>
        <span className="text-white/30"> · </span>
        <Link
          href="/ai-systems"
          className="text-white/45 hover:text-white/70 transition-colors"
        >
          Get one for your business →
        </Link>
      </div>

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav className="fixed top-8 left-0 right-0 z-50 bg-[#080808]/95 backdrop-blur-md border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 h-16 flex items-center justify-between">
          <div>
            <p className="text-white font-black text-lg tracking-tight leading-none">
              SHAFIK N SONS
            </p>
            <p className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.25em] uppercase">
              Collection
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-8 text-sm">
            <Link href="/dealership-demo/inventory" className="text-white/50 hover:text-white transition-colors">Inventory</Link>
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

      {/* ── Scroll Video Hero ────────────────────────────────────────────── */}
      <div className="mt-8">
        <ScrollVideoHero />
      </div>

      {/* ── Featured Inventory ───────────────────────────────────────────── */}
      <section className="bg-[#080808] py-24 px-5 sm:px-10 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <SectionHeader
              eyebrow="Featured Inventory"
              heading={`${allVehicles.length} Vehicle${allVehicles.length !== 1 ? "s" : ""} Available`}
              sub="A curated selection of exotics, customs, and luxury vehicles — ready for serious buyers."
            />
            <Link
              href="/dealership-demo/inventory"
              className="text-sm text-[#C9A84C] hover:text-[#FDBA74] font-semibold tracking-wide transition-colors shrink-0"
            >
              View all {allVehicles.length} vehicle{allVehicles.length !== 1 ? "s" : ""} →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((vehicle) => (
              <VehicleCard key={vehicle.slug} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] py-24 px-5 sm:px-10 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <SectionHeader
              eyebrow="Why Shafik N Sons"
              heading="Not your average dealership."
              sub="Family owned and operated in Oxnard, California. We exist for buyers who know what they want and don't need a sales pitch."
            />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reasons.map((r, i) => (
              <div key={r.title} className="bg-[#0F0F0F] border border-white/[0.06] rounded-2xl p-7 hover:border-[#C9A84C]/20 transition-all duration-300 group">
                <p className="text-[#C9A84C]/30 text-4xl font-black mb-5 group-hover:text-[#C9A84C]/60 transition-colors">
                  0{i + 1}
                </p>
                <h3 className="text-white font-bold text-lg mb-3 leading-tight">{r.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Family Trust Section ─────────────────────────────────────────── */}
      <section className="bg-[#080808] py-24 px-5 sm:px-10 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                eyebrow="Our Story"
                heading={"Family owned.\nDealer built.\nCar obsessed."}
                sub="We didn't start with a lot. We started with a passion for cars, a social media account, and a promise to every buyer: you will never feel like a number here."
              />
              <div className="mt-8 space-y-5">
                {[
                  "Direct access to the owner — not a salesperson",
                  "Full vehicle history on every unit",
                  "We turn down cars that don't meet our standard",
                  "Post-purchase support and referrals",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] shrink-0 mt-2" />
                    <p className="text-white/60 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust metrics */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "A+", label: "BBB Rating", sub: "Accredited Business" },
                { value: "4.9★", label: "Google Reviews", sub: "200+ verified reviews" },
                { value: "100%", label: "Title Guarantee", sub: "Clean & clear titles" },
                { value: "24h", label: "Response Time", sub: "Or we call you first" },
              ].map((m) => (
                <div key={m.label} className="bg-[#0F0F0F] border border-white/[0.06] rounded-2xl p-6 text-center">
                  <p className="text-[#C9A84C] font-black text-3xl mb-1">{m.value}</p>
                  <p className="text-white font-bold text-sm mb-1">{m.label}</p>
                  <p className="text-white/30 text-xs">{m.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Instagram Section ────────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] py-24 px-5 sm:px-10 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Grid of IG-style placeholders */}
            <div className="grid grid-cols-3 gap-2">
              {[
                "from-violet-950 to-purple-900",
                "from-amber-950 to-orange-900",
                "from-zinc-800 to-zinc-900",
                "from-red-950 to-rose-900",
                "from-blue-950 to-indigo-900",
                "from-emerald-950 to-teal-900",
                "from-orange-950 to-amber-900",
                "from-zinc-900 to-zinc-800",
                "from-violet-900 to-purple-950",
              ].map((grad, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-xl bg-gradient-to-br ${grad} border border-white/[0.04]`}
                />
              ))}
            </div>

            <div>
              <SectionHeader
                eyebrow="Born on Instagram"
                heading="We built our reputation one post at a time."
                sub="Before we had a website, we had Instagram. Thousands of followers, hundreds of deals — all through direct messages. This digital showroom is what happens when that energy meets real infrastructure."
              />
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { value: "50K+", label: "IG Followers" },
                  { value: "300+", label: "DM Deals Closed" },
                  { value: "5 yrs", label: "Active on IG" },
                  { value: "Daily", label: "New Content" },
                ].map((s) => (
                  <div key={s.label} className="bg-[#0F0F0F] border border-white/[0.06] rounded-xl p-5">
                    <p className="text-[#C9A84C] font-black text-2xl">{s.value}</p>
                    <p className="text-white/40 text-xs mt-1 tracking-wide">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Inventory Price Range ────────────────────────────────────────── */}
      <section className="bg-[#080808] py-24 px-5 sm:px-10 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <SectionHeader
              eyebrow="Current Inventory"
              heading="Something for every serious buyer."
              center
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { range: "Under $100K", label: "Custom Builds & Pre-Owned Luxury", count: allVehicles.filter(v => v.price < 100000).length },
              { range: "$100K – $200K", label: "Luxury SUVs & Premium Sedans", count: allVehicles.filter(v => v.price >= 100000 && v.price < 200000).length },
              { range: "$200K+", label: "Exotic Supercars", count: allVehicles.filter(v => v.price >= 200000).length },
            ].map((tier) => (
              <Link
                key={tier.range}
                href={`/dealership-demo/inventory`}
                className="group bg-[#0F0F0F] border border-white/[0.06] hover:border-[#C9A84C]/30 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
              >
                <p className="text-[#C9A84C] font-black text-3xl mb-2">{tier.range}</p>
                <p className="text-white font-semibold text-sm mb-2">{tier.label}</p>
                <p className="text-white/30 text-xs">{tier.count} vehicle{tier.count !== 1 ? "s" : ""} available</p>
                <p className="text-[#C9A84C]/0 group-hover:text-[#C9A84C]/60 text-xs mt-3 transition-colors">
                  Browse →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Financing CTA ─────────────────────────────────────────────────── */}
      <CTASection
        eyebrow="In-House Financing"
        heading={"Bad credit?\nNo credit?\nWe have options."}
        sub="Our finance team works with all credit situations. Submit a 2-minute pre-approval and find out what you qualify for today."
        primaryLabel="Start Pre-Approval"
        primaryHref="/dealership-demo/financing"
        secondaryLabel="View Inventory"
        secondaryHref="/dealership-demo/inventory"
      />

      {/* ── Sell Your Car CTA ─────────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] py-24 px-5 sm:px-10 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader
              eyebrow="Sell or Trade"
              heading={"We buy cars.\nExotics. Trucks. Customs."}
              sub="Get a fair market offer in 24 hours. No games, no lowballs. We'll apply your trade value directly to your new purchase or simply write you a check."
            />
            <Link
              href="/dealership-demo/sell-your-car"
              className="inline-flex items-center gap-3 mt-8 bg-[#C9A84C] hover:bg-[#FDBA74] text-black font-bold text-sm tracking-wide px-9 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_35px_rgba(201,168,76,0.4)]"
            >
              Get My Offer →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { title: "Fair Offers", sub: "Based on real market data" },
              { title: "Fast Process", sub: "Offer within 24 hours" },
              { title: "Any Condition", sub: "We'll assess on the spot" },
              { title: "Exotics Welcome", sub: "We specialize in high-value" },
              { title: "Trade Credit", sub: "Applied instantly" },
              { title: "Cash Option", sub: "Direct payment available" },
            ].map((item) => (
              <div key={item.title} className="bg-[#0F0F0F] border border-white/[0.06] rounded-xl p-4 text-center">
                <p className="text-white font-bold text-xs mb-1">{item.title}</p>
                <p className="text-white/30 text-[11px]">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final Lead Capture ────────────────────────────────────────────── */}
      <section id="contact" className="bg-[#080808] py-24 px-5 sm:px-10 border-t border-white/[0.05]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <SectionHeader
              eyebrow="Get In Touch"
              heading="Ready to find your car?"
              sub="Tell us what you're looking for. Our team responds within 2 hours."
              center
            />
          </div>
          <div className="bg-[#0F0F0F] border border-white/[0.08] rounded-2xl p-8 sm:p-10">
            <LeadForm
              leadType="general_inquiry"
              sourcePage="/dealership-demo"
              showVehicleField
              showBudgetField
              ctaLabel="Send My Inquiry"
            />
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-[#050505] border-t border-white/[0.05] py-12 px-5 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-8">
            <div>
              <p className="text-white font-black text-xl tracking-tight">SHAFIK N SONS</p>
              <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.15em] uppercase mt-0.5">Family Owned · Oxnard, CA</p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-white/30">
              <Link href="/dealership-demo/inventory" className="hover:text-white transition-colors">Inventory</Link>
              <Link href="/dealership-demo/financing" className="hover:text-white transition-colors">Financing</Link>
              <Link href="/dealership-demo/sell-your-car" className="hover:text-white transition-colors">Sell Your Car</Link>
              <Link href="/" className="hover:text-white transition-colors">Digital Wealth Transfer</Link>
            </div>
          </div>
          <div className="h-px bg-white/[0.04] mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-xs">© 2026 Shafik N Sons · Oxnard, CA · All rights reserved</p>
            <p className="text-white/15 text-xs italic text-center">
              Demo concept — customized with your real inventory, photos, branding, and Instagram content.
            </p>
          </div>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <AIChatWidget />

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#080808]/95 backdrop-blur border-t border-white/[0.08] p-4">
        <div className="flex gap-3">
          <Link
            href="/dealership-demo/inventory"
            className="flex-1 text-center text-sm font-bold text-white bg-white/[0.08] border border-white/[0.12] py-3.5 rounded-xl"
          >
            View Inventory
          </Link>
          <Link
            href="/dealership-demo/financing"
            className="flex-1 text-center text-sm font-bold text-black bg-[#C9A84C] py-3.5 rounded-xl"
          >
            Get Pre-Approved
          </Link>
        </div>
      </div>

    </div>
  );
}
