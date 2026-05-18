import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVehicleBySlug, vehicles, formatPrice, formatMileage } from "@/lib/data/vehicles";
import LeadForm from "@/components/dealership/LeadForm";
import AIChatWidget from "@/components/dealership/AIChatWidget";

export async function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata(
  props: PageProps<"/dealership-demo/inventory/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) return { title: "Vehicle Not Found" };
  return {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim} — Shafik N Sons`,
    description: vehicle.description,
  };
}

export default async function VehicleDetailPage(
  props: PageProps<"/dealership-demo/inventory/[slug]">
) {
  const { slug } = await props.params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) notFound();

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

      {/* Hero / Gallery */}
      <div className={`pt-16 w-full bg-gradient-to-br ${vehicle.gradient} aspect-[16/7] sm:aspect-[21/7] relative overflow-hidden`}>
        {vehicle.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={vehicle.imageUrl}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
        {/* Category + Year */}
        <div className="absolute top-8 left-8 flex items-center gap-3">
          <span
            className="text-[11px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border"
            style={{
              color: vehicle.accentColor,
              borderColor: vehicle.accentColor + "40",
              backgroundColor: vehicle.accentColor + "15",
            }}
          >
            {vehicle.categoryLabel}
          </span>
          <span className="text-[11px] font-bold text-white/50 bg-black/40 border border-white/[0.08] px-2.5 py-1 rounded-full">
            {vehicle.year}
          </span>
        </div>
        {/* Back link */}
        <Link
          href="/dealership-demo/inventory"
          className="absolute top-8 right-8 text-xs text-white/50 hover:text-white transition-colors flex items-center gap-1"
        >
          ← All Inventory
        </Link>
        {/* Price badge */}
        <div className="absolute bottom-8 right-8 text-right">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Asking Price</p>
          <p className="text-white font-black text-3xl sm:text-4xl tracking-tight">{formatPrice(vehicle.price)}</p>
          <p className="text-white/40 text-sm mt-1">Est. {formatPrice(vehicle.monthlyPayment)}/mo</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-10 py-14 grid lg:grid-cols-[1fr_420px] gap-14">

        {/* Left — Details */}
        <div>
          {/* Title */}
          <p className="text-white/40 text-sm tracking-wider uppercase mb-2">{vehicle.make}</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight mb-2">
            {vehicle.model}
          </h1>
          <p className="text-white/50 text-lg mb-8">{vehicle.trim}</p>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 p-6 bg-[#0F0F0F] border border-white/[0.06] rounded-2xl">
            {[
              { label: "Year", value: String(vehicle.year) },
              { label: "Mileage", value: formatMileage(vehicle.mileage) },
              { label: "Color", value: vehicle.color },
              { label: "Category", value: vehicle.categoryLabel },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-white/30 text-[11px] uppercase tracking-wider mb-1">{s.label}</p>
                <p className="text-white font-semibold text-sm">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-white/60 text-base leading-relaxed mb-10">{vehicle.description}</p>

          {/* Specs */}
          <div className="mb-10">
            <h2 className="text-white font-black text-xl tracking-tight mb-5">Specs</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {vehicle.specs.map((s) => (
                <div key={s.label} className="bg-[#0F0F0F] border border-white/[0.06] rounded-xl p-4">
                  <p className="text-white/30 text-[11px] uppercase tracking-wider mb-1">{s.label}</p>
                  <p className="text-white font-bold text-sm">{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-10">
            <h2 className="text-white font-black text-xl tracking-tight mb-5">Notable Features</h2>
            <ul className="grid sm:grid-cols-2 gap-2">
              {vehicle.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-white/60">
                  <span style={{ color: vehicle.accentColor }} className="mt-0.5 shrink-0 text-base leading-none">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Financing teaser */}
          <div className="bg-[#0F0F0F] border border-[#C9A84C]/20 rounded-2xl p-6 flex items-center justify-between gap-6 flex-wrap">
            <div>
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-1">In-House Financing</p>
              <p className="text-white font-bold text-lg">Est. {formatPrice(vehicle.monthlyPayment)}/mo</p>
              <p className="text-white/40 text-xs mt-1">OAC · All credit considered · Quick approval</p>
            </div>
            <Link
              href="/dealership-demo/financing"
              className="bg-[#C9A84C] hover:bg-[#FDBA74] text-black text-sm font-bold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-[0_4px_20px_rgba(201,168,76,0.35)] whitespace-nowrap"
            >
              Apply for Financing →
            </Link>
          </div>
        </div>

        {/* Right — Lead Form */}
        <div id="availability" className="lg:sticky lg:top-24 h-fit">
          <div className="bg-[#0F0F0F] border border-white/[0.08] rounded-2xl p-8">
            <p className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Check Availability</p>
            <h2 className="text-white font-black text-2xl tracking-tight mb-2 leading-tight">
              Interested in this {vehicle.year} {vehicle.model}?
            </h2>
            <p className="text-white/40 text-sm mb-7 leading-relaxed">
              Send us a message and we&apos;ll confirm availability, answer questions, and arrange a private showing.
            </p>
            <LeadForm
              leadType="inventory_inquiry"
              sourcePage={`/dealership-demo/inventory/${vehicle.slug}`}
              vehicleSlug={vehicle.slug}
              vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`}
              ctaLabel="Request More Info"
            />
          </div>
        </div>
      </div>

      <AIChatWidget />

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
            <Link href="/dealership-demo/inventory" className="hover:text-white/60 transition-colors">Inventory</Link>
            <Link href="/dealership-demo/financing" className="hover:text-white/60 transition-colors">Financing</Link>
            <Link href="/dealership-demo/sell-your-car" className="hover:text-white/60 transition-colors">Sell</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
