import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Link from "next/link";
import FadeIn from "@/components/lumbre/FadeIn";
import LuxuryOrderForm from "@/components/lumbre/LuxuryOrderForm";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumbre Bakery — Custom Cakes, Crafted to Perfection",
  description:
    "Lumbre Bakery creates bespoke custom cakes and desserts for moments that deserve more than ordinary.",
};

const offers = [
  {
    title: "Custom Cakes",
    desc: "Every tier designed around you. We work closely with each client to create something singular.",
  },
  {
    title: "Dessert Catering",
    desc: "Full dessert spreads for private events, corporate gatherings, and everything in between.",
  },
  {
    title: "Event Packages",
    desc: "End-to-end dessert service for weddings, celebrations, and milestone occasions.",
  },
];

const menuItems = [
  {
    category: "Cake Sizes",
    items: [
      { name: "6-inch", detail: "Serves 8 – 12" },
      { name: "8-inch", detail: "Serves 16 – 20" },
      { name: "10-inch", detail: "Serves 28 – 35" },
      { name: "Tiered", detail: "Custom quote" },
    ],
  },
  {
    category: "Flavors",
    items: [
      { name: "Vanilla Bean", detail: "Classic" },
      { name: "Dark Chocolate", detail: "Rich" },
      { name: "Lemon Lavender", detail: "Seasonal" },
      { name: "Salted Caramel", detail: "Signature" },
      { name: "Red Velvet", detail: "Timeless" },
      { name: "Matcha", detail: "Limited" },
    ],
  },
  {
    category: "Starting Prices",
    items: [
      { name: "Signature", detail: "From $150" },
      { name: "Celebration", detail: "From $300" },
      { name: "Grand", detail: "From $600" },
      { name: "Wedding", detail: "Custom quote" },
    ],
  },
];

const quotes = [
  {
    text: "The most beautiful cake I have ever seen at an event. The taste matched the presentation perfectly.",
    author: "Sarah T.",
    occasion: "Wedding Reception",
  },
  {
    text: "Lumbre turned our corporate event into something people are still talking about months later.",
    author: "David M.",
    occasion: "Events Director",
  },
  {
    text: "Every detail was considered. Worth every penny and more.",
    author: "Maria L.",
    occasion: "Private Celebration",
  },
];

const CakeImage = ({
  className = "",
  variant = "warm",
}: {
  className?: string;
  variant?: "warm" | "dark" | "cream";
}) => {
  const gradients = {
    warm: "bg-gradient-to-br from-[#2A1506] via-[#1C0F04] to-[#0F0A04]",
    dark: "bg-gradient-to-br from-[#1A1208] via-[#120D05] to-[#0B0B0B]",
    cream: "bg-gradient-to-br from-[#D4956A] via-[#B87340] to-[#8C4E1A]",
  };
  return (
    <div className={`relative overflow-hidden ${gradients[variant]} ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(249,115,22,0.12)_0%,transparent_70%)]" />
      <div className="absolute inset-0 flex items-end p-6">
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/15">
          Photography
        </p>
      </div>
    </div>
  );
};

export default function LumbreDemoPage() {
  return (
    <div
      className={`${playfair.variable} ${inter.variable} bg-[#0B0B0B] text-white`}
      style={{ fontFamily: "var(--font-inter)" }}
    >

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B0B0B]/90 backdrop-blur-md border-b border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          <div>
            <span
              className="text-xl font-bold text-white tracking-wide"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Lumbre
            </span>
            <span className="text-[#F97316] text-xl font-bold tracking-wide ml-1.5"
              style={{ fontFamily: "var(--font-playfair)" }}>
              Bakery
            </span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#offers" className="hidden sm:block text-sm text-white/40 hover:text-white transition-colors tracking-wide">
              Menu
            </a>
            <a href="#order" className="hidden sm:block text-sm text-white/40 hover:text-white transition-colors tracking-wide">
              Order
            </a>
            <a
              href="#order"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#F97316] to-[#FDBA74] text-[#0B0B0B] text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(249,115,22,0.4)]"
            >
              Start Your Order
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="min-h-screen pt-16 flex items-center">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 w-full py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <FadeIn>
                <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F97316]/70 mb-8">
                  Lumbre Bakery · Las Vegas
                </p>
              </FadeIn>
              <FadeIn delay={100}>
                <h1
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-8"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Custom Cakes,<br />
                  <em className="text-[#F97316] not-italic">Crafted to</em><br />
                  Perfection.
                </h1>
              </FadeIn>
              <FadeIn delay={200}>
                <p className="text-lg text-white/40 leading-relaxed mb-10 max-w-md">
                  For moments that deserve more than ordinary desserts. We create bespoke cakes that live in memory long after the last bite.
                </p>
              </FadeIn>
              <FadeIn delay={300}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#order"
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#F97316] to-[#FDBA74] text-[#0B0B0B] font-semibold px-9 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_35px_rgba(249,115,22,0.45)] text-sm tracking-wide"
                  >
                    Start Your Order
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                  </a>
                  <a
                    href="#offers"
                    className="inline-flex items-center text-white/40 hover:text-white text-sm tracking-wide transition-colors gap-2"
                  >
                    View our menu
                    <span>↓</span>
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Image */}
            <FadeIn delay={150} className="relative">
              <CakeImage
                className="w-full aspect-[4/5] rounded-2xl"
                variant="warm"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 bg-[#111111] border border-white/[0.08] rounded-xl px-5 py-4">
                <p className="text-white font-bold text-2xl" style={{ fontFamily: "var(--font-playfair)" }}>500+</p>
                <p className="text-white/30 text-xs tracking-wide mt-0.5">Cakes delivered</p>
              </div>
              <div className="absolute -top-5 -right-5 bg-[#F97316] rounded-xl px-5 py-4">
                <p className="text-[#0B0B0B] font-bold text-sm tracking-wide">5.0</p>
                <p className="text-[#0B0B0B]/60 text-xs mt-0.5">Rating</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* ── Signature Offers (Cream) ──────────────────────────────────────── */}
      <section id="offers" className="bg-[#FFF6EE] py-28 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F97316]/70 mb-4">
                  What We Offer
                </p>
                <h2
                  className="text-4xl sm:text-5xl font-bold text-[#1A0D04] leading-tight tracking-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Every occasion.<br />One bakery.
                </h2>
              </div>
              <a
                href="#order"
                className="text-sm text-[#1A0D04]/50 hover:text-[#F97316] transition-colors tracking-wide shrink-0"
              >
                Request a quote →
              </a>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-3 gap-6">
            {offers.map((offer, i) => (
              <FadeIn key={offer.title} delay={i * 100}>
                <div className="group flex flex-col">
                  <CakeImage
                    className="w-full aspect-[4/3] rounded-xl mb-6 transition-transform duration-500 group-hover:scale-[1.02]"
                    variant={i === 0 ? "warm" : i === 1 ? "cream" : "dark"}
                  />
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#1A0D04]/30 mb-2">
                    0{i + 1}
                  </p>
                  <h3
                    className="text-2xl font-bold text-[#1A0D04] mb-3"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {offer.title}
                  </h3>
                  <p className="text-[#1A0D04]/50 text-sm leading-relaxed">{offer.desc}</p>
                  <a
                    href="#order"
                    className="mt-5 text-sm text-[#F97316] font-medium hover:text-[#EA580C] transition-colors tracking-wide"
                  >
                    Order now →
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Editorial (Dark) ─────────────────────────────────────────────── */}
      <section className="bg-[#0B0B0B] py-28 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-20">
            <FadeIn>
              <h2
                className="text-5xl sm:text-6xl font-bold text-white leading-[1.06] tracking-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Designed Around<br />
                <em className="text-[#FDBA74] not-italic">Your Vision.</em>
              </h2>
            </FadeIn>
            <FadeIn delay={150}>
              <div className="pt-2">
                <p className="text-white/40 text-lg leading-relaxed mb-6">
                  No two cakes are the same. Before we bake a single layer, we sit with your story — the occasion, the people, the feeling you want to create. Then we build something worthy of it.
                </p>
                <p className="text-white/30 text-base leading-relaxed">
                  From the first sketch to the final delivery, every decision is made with intention. That is what separates a Lumbre cake from everything else.
                </p>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={100}>
            <CakeImage
              className="w-full aspect-[16/7] rounded-2xl"
              variant="warm"
            />
          </FadeIn>
        </div>
      </section>

      {/* ── How It Works (Cream) ─────────────────────────────────────────── */}
      <section className="bg-[#FFF6EE] py-28 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F97316]/70 mb-4">
              The Process
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold text-[#1A0D04] mb-16 tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Simple from start<br />to celebration.
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-12">
            {[
              { n: "01", title: "Submit your request", desc: "Tell us about your occasion, vision, and budget. It takes under two minutes." },
              { n: "02", title: "We design your cake", desc: "Our team creates a concept tailored to your event. We refine it until it is exactly right." },
              { n: "03", title: "Enjoy your event", desc: "Your cake arrives beautifully presented, on time, ready for the moment." },
            ].map((step, i) => (
              <FadeIn key={step.n} delay={i * 120}>
                <div className="flex flex-col gap-5">
                  <span
                    className="text-[80px] font-bold text-[#1A0D04]/[0.07] leading-none select-none"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {step.n}
                  </span>
                  <h3
                    className="text-xl font-bold text-[#1A0D04] -mt-4"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#1A0D04]/50 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Menu Preview (Dark) ──────────────────────────────────────────── */}
      <section className="bg-[#0B0B0B] py-28 px-6 sm:px-10 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F97316]/70 mb-4">
                  The Menu
                </p>
                <h2
                  className="text-4xl sm:text-5xl font-bold text-white tracking-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Crafted with care,<br />priced with clarity.
                </h2>
              </div>
              <a
                href="#order"
                className="text-sm text-white/30 hover:text-[#F97316] transition-colors tracking-wide shrink-0"
              >
                Request a custom quote →
              </a>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-3 gap-0 border border-white/[0.06] rounded-2xl overflow-hidden">
            {menuItems.map((col, ci) => (
              <FadeIn key={col.category} delay={ci * 80}>
                <div className={`p-10 h-full ${ci < menuItems.length - 1 ? "border-r border-white/[0.06]" : ""}`}>
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#F97316]/60 mb-8">
                    {col.category}
                  </p>
                  <div className="flex flex-col gap-5">
                    {col.items.map((item) => (
                      <div key={item.name} className="flex items-baseline justify-between gap-4 group">
                        <span
                          className="text-white font-medium text-base group-hover:text-[#FDBA74] transition-colors"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          {item.name}
                        </span>
                        <span className="text-white/25 text-sm shrink-0">{item.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof (Cream) ─────────────────────────────────────────── */}
      <section className="bg-[#FFF6EE] py-28 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F97316]/70 mb-16">
              Client Stories
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-12">
            {quotes.map((q, i) => (
              <FadeIn key={q.author} delay={i * 100}>
                <div className="flex flex-col gap-6">
                  <p
                    className="text-2xl text-[#1A0D04]/80 leading-snug"
                    style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
                  >
                    &ldquo;{q.text}&rdquo;
                  </p>
                  <div className="h-px bg-[#1A0D04]/10" />
                  <div>
                    <p className="text-[#1A0D04] font-semibold text-sm">{q.author}</p>
                    <p className="text-[#1A0D04]/40 text-xs tracking-wide mt-0.5">{q.occasion}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA (Dark) ─────────────────────────────────────────────── */}
      <section className="bg-[#0B0B0B] py-28 px-6 sm:px-10 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F97316]/70 mb-6">
                Limited Availability
              </p>
              <h2
                className="text-5xl sm:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Limited availability<br />each week.
              </h2>
              <p className="text-white/35 text-lg mb-10 leading-relaxed">
                Secure your date before it fills up. We take a limited number of orders each week to ensure every cake receives the care it deserves.
              </p>
              <a
                href="#order"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#F97316] to-[#FDBA74] text-[#0B0B0B] font-semibold px-10 py-4.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_35px_rgba(249,115,22,0.45)] text-sm tracking-wide"
              >
                Request Your Cake
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Order Form (Dark) ─────────────────────────────────────────────── */}
      <section id="order" className="bg-[#111111] py-28 px-6 sm:px-10 border-t border-white/[0.04]">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F97316]/70 mb-6">
              Get Started
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Request your cake.
            </h2>
            <p className="text-white/35 text-base mb-14 leading-relaxed max-w-lg">
              Fill out the form and we will follow up within 24 hours with a tailored quote and next steps.
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <LuxuryOrderForm />
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-[#0B0B0B] border-t border-white/[0.05] py-12 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-1">
              <span className="text-base font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>Lumbre</span>
              <span className="text-[#F97316] font-bold text-base ml-1" style={{ fontFamily: "var(--font-playfair)" }}>Bakery</span>
            </div>
            <p className="text-white/20 text-xs mt-1 tracking-wide">Las Vegas, Nevada</p>
          </div>
          <div className="flex items-center gap-8 text-sm text-white/25">
            <a href="#offers" className="hover:text-white transition-colors">Menu</a>
            <a href="#order" className="hover:text-white transition-colors">Order</a>
            <Link href="/" className="hover:text-white transition-colors">Digital Wealth Transfer</Link>
          </div>
          <p className="text-white/15 text-xs">
            © 2025 Lumbre Bakery
          </p>
        </div>
      </footer>

    </div>
  );
}
