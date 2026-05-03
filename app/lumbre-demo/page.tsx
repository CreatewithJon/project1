import type { Metadata } from "next";
import Link from "next/link";
import OrderForm from "@/components/OrderForm";

export const metadata: Metadata = {
  title: "Lumbre Bakery — Custom Cakes Made Simple",
  description:
    "Request your custom cake, catering, or desserts in under 60 seconds. Lumbre Bakery — handcrafted for every occasion.",
};

const categories = [
  {
    title: "Wedding Cakes",
    desc: "Timeless, elegant designs crafted to make your wedding day unforgettable. Every tier tells your story.",
    tag: "Most Popular",
    tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    border: "border-amber-500/20",
    glow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.08)]",
    emoji: "🎂",
  },
  {
    title: "Birthday & Celebrations",
    desc: "From one candle to one hundred, we create cakes as unique as the person you're celebrating.",
    tag: "Fan Favorite",
    tagColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    border: "border-rose-500/20",
    glow: "hover:shadow-[0_0_30px_rgba(244,63,94,0.08)]",
    emoji: "🎉",
  },
  {
    title: "Corporate & Events",
    desc: "Branded dessert spreads, custom pastry boxes, and showpiece centerpieces for any gathering.",
    tag: "New",
    tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    border: "border-purple-500/20",
    glow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.08)]",
    emoji: "✨",
  },
];

const testimonials = [
  {
    quote: "Lumbre made our wedding cake the most talked-about detail of the night. Absolutely stunning and even better tasting.",
    name: "Maria & James T.",
    event: "Wedding, March 2025",
  },
  {
    quote: "Ordered a custom birthday cake with 24 hours notice. They delivered something I couldn't have imagined. Incredible.",
    name: "Devon R.",
    event: "Birthday Party",
  },
  {
    quote: "We use Lumbre for every company event. Professional, beautiful, and always on time. Our team looks forward to it.",
    name: "Ashley K.",
    event: "Corporate Events Manager",
  },
];

export default function LumbreDemoPage() {
  return (
    <div className="min-h-screen bg-[#0C0906] font-sans text-[#FDF8F0]">

      {/* Ambient glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-600/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed top-40 right-0 w-[300px] h-[300px] bg-rose-600/4 rounded-full blur-[120px] pointer-events-none" />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#0C0906]/90 backdrop-blur-md border-b border-white/[0.05]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#FDF8F0] tracking-tight">Lumbre</span>
            <span className="text-amber-500 font-bold text-lg">Bakery</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#categories" className="hidden sm:block text-sm text-white/40 hover:text-white transition-colors">
              Menu
            </Link>
            <a
              href="#order"
              className="bg-amber-500 hover:bg-amber-400 text-[#0C0906] text-sm font-bold px-4 py-2 rounded-xl transition-colors shadow-[0_0_20px_rgba(245,158,11,0.3)]"
            >
              Order Now
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-24 pb-20 px-6 text-center overflow-hidden">
        <div className="relative max-w-3xl mx-auto">
          <span className="inline-block text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full mb-7 tracking-wide">
            Handcrafted · Las Vegas, NV
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold text-[#FDF8F0] leading-[1.06] tracking-tight mb-5">
            Custom Cakes<br />
            <span className="text-amber-400">Made Simple</span>
          </h1>
          <p className="text-xl text-white/50 leading-relaxed max-w-xl mx-auto mb-10">
            Request your custom cake in under 60 seconds. We handle the rest — design, baking, delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#order"
              className="inline-block bg-amber-500 hover:bg-amber-400 text-[#0C0906] px-8 py-4 rounded-xl font-bold text-base transition-colors shadow-[0_0_35px_rgba(245,158,11,0.4)]"
            >
              Request My Cake →
            </a>
            <a
              href="#categories"
              className="inline-block bg-white/[0.06] hover:bg-white/10 border border-white/[0.08] text-white px-8 py-4 rounded-xl font-semibold text-base transition-colors"
            >
              View Menu
            </a>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-white/30">
            {["⭐ 5.0 Rating", "🎂 500+ Orders", "📍 Las Vegas, NV", "⚡ 24h Response"].map((item) => (
              <span key={item} className="font-medium">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-20 px-6 bg-[#0F0C08] border-y border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full mb-5">
              What We Make
            </span>
            <h2 className="text-3xl font-bold text-[#FDF8F0] tracking-tight">
              Every occasion deserves something special
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {categories.map((c) => (
              <div
                key={c.title}
                className={`bg-[#15100A] border ${c.border} rounded-2xl p-7 ${c.glow} transition-all flex flex-col`}
              >
                <div className="text-3xl mb-4">{c.emoji}</div>
                <span className={`inline-block text-[11px] font-bold uppercase tracking-widest border px-2.5 py-1 rounded-full mb-4 w-fit ${c.tagColor}`}>
                  {c.tag}
                </span>
                <h3 className="text-white font-bold text-lg mb-2">{c.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed flex-1">{c.desc}</p>
                <a
                  href="#order"
                  className="mt-6 text-amber-400 text-sm font-semibold hover:text-amber-300 transition-colors"
                >
                  Order this →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold text-white/40 bg-white/[0.05] border border-white/[0.08] px-3.5 py-1.5 rounded-full mb-5">
              What Customers Say
            </span>
            <h2 className="text-3xl font-bold text-[#FDF8F0] tracking-tight">
              People love their cakes
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-[#15100A] border border-white/[0.06] rounded-2xl p-6 flex flex-col"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-white/60 text-sm leading-relaxed flex-1 mb-5">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/30 text-xs mt-0.5">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency */}
      <section className="py-8 px-6 bg-amber-500/5 border-y border-amber-500/10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-amber-400 font-semibold text-sm">
            🔥 Only <span className="font-black text-amber-300">8 custom order slots</span> remaining this month — book yours before they&apos;re gone.
          </p>
        </div>
      </section>

      {/* Order Form */}
      <section id="order" className="py-24 px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full mb-5">
              Get Started
            </span>
            <h2 className="text-3xl font-bold text-[#FDF8F0] tracking-tight mb-4">
              Request your custom cake
            </h2>
            <p className="text-white/40">
              Fill out the form below and we&apos;ll follow up within 24 hours with a quote and next steps.
            </p>
          </div>
          <div className="bg-[#15100A] border border-white/[0.08] rounded-2xl p-8">
            <OrderForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-white/60">Lumbre</span>
            <span className="text-amber-500 font-bold text-sm">Bakery</span>
            <span className="text-white/20 text-xs ml-2">· Las Vegas, NV</span>
          </div>
          <p className="text-xs text-white/20">
            © 2025 Lumbre Bakery · All rights reserved
          </p>
          <p className="text-xs text-white/15 italic">
            Demo by <span className="text-white/30">Digital Wealth Transfer</span>
          </p>
        </div>
      </footer>

    </div>
  );
}
