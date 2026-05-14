import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AILeadForm from "@/components/AILeadForm";

export const metadata: Metadata = {
  title: "AI Systems for Local Businesses — Digital Wealth Transfer",
  description:
    "Done-for-you AI lead capture, follow-up automation, and appointment-setting systems for local businesses. Built by Jonathan Cardona. Live in 7 days.",
};

const offers = [
  {
    name: "AI Lead Machine",
    price: "$750",
    timeline: "7 days",
    best: true,
    purpose: "Stop losing leads to slow follow-up.",
    items: [
      "Lead capture page or form optimization",
      "Automated 3-email follow-up sequence",
      "CRM setup and lead tracking",
      "2-minute AI response system",
      "Lead notification to your phone",
      "Loom walkthrough + written SOP",
    ],
    outcome: "Every lead captured. Every inquiry followed up. Automatically.",
    color: "blue",
  },
  {
    name: "AI Appointment Setter",
    price: "$1,000",
    timeline: "10 days",
    best: false,
    purpose: "Qualify leads and book appointments automatically.",
    items: [
      "Everything in AI Lead Machine",
      "AI chatbot or SMS bot",
      "Lead qualification workflow",
      "Calendar booking integration",
      "CRM handoff and tracking",
    ],
    outcome: "Leads get qualified and booked without you lifting a finger.",
    color: "purple",
  },
  {
    name: "AI Website + Funnel",
    price: "$1,500",
    timeline: "14 days",
    best: false,
    purpose: "A complete AI-powered sales machine.",
    items: [
      "Everything in AI Appointment Setter",
      "Conversion-focused website or funnel",
      "Offer positioning and copy",
      "SEO structure and meta setup",
      "30-day optimization check-in",
    ],
    outcome: "A complete system — from stranger to booked client.",
    color: "green",
  },
  {
    name: "AI Growth Retainer",
    price: "$500/mo",
    timeline: "Ongoing",
    best: false,
    purpose: "Keep your system optimized and your pipeline growing.",
    items: [
      "Monthly system optimization",
      "4 content scripts or captions",
      "Pipeline and analytics review",
      "1 new automation per quarter",
      "Priority support",
    ],
    outcome: "Your system keeps improving while you focus on your business.",
    color: "amber",
  },
];

const colorMap: Record<string, { border: string; activeBorder: string; badge: string; dot: string; check: string }> = {
  blue:   { border: "border-blue-500/30",   activeBorder: "border-blue-500/50",   badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",   dot: "bg-blue-400",   check: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  purple: { border: "border-purple-500/30", activeBorder: "border-purple-500/50", badge: "bg-purple-500/10 text-purple-400 border-purple-500/20", dot: "bg-purple-400", check: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
  green:  { border: "border-green-500/30",  activeBorder: "border-green-500/50",  badge: "bg-green-500/10 text-green-400 border-green-500/20",  dot: "bg-green-400",  check: "text-green-400 bg-green-500/10 border-green-500/20" },
  amber:  { border: "border-amber-500/30",  activeBorder: "border-amber-500/50",  badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",  dot: "bg-amber-400",  check: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
};

const problems = [
  { label: "01", title: "Leads slipping through the cracks", desc: "Inquiries come in through forms, DMs, and calls — but there's no system to capture, track, or follow up with all of them." },
  { label: "02", title: "Response times are too slow", desc: "78% of customers buy from whoever responds first. If you're following up manually hours later, you've already lost the deal." },
  { label: "03", title: "No follow-up after the first touch", desc: "Most sales happen after 5–7 touchpoints. Without automation, follow-ups never happen and revenue walks out the door." },
  { label: "04", title: "Website doesn't convert visitors", desc: "Most business websites look fine but aren't built to generate leads. No clear offer, no strong CTA, no follow-up path." },
  { label: "05", title: "No visibility into your pipeline", desc: "Without a CRM, there's no way to know who's interested, what stage they're at, or who needs a follow-up today." },
];

const steps = [
  { step: "01", title: "Free System Audit", desc: "Fill out the form below. I'll review your current lead process and tell you exactly what I'd build — no obligation, no sales pressure." },
  { step: "02", title: "I Build It For You", desc: "Jonathan designs and builds your system personally. Every tool configured, every automation tested, before you ever see it." },
  { step: "03", title: "You Go Live in 7–14 Days", desc: "Your system is live, documented, and fully yours. You get a Loom walkthrough and written SOP so your team can use it." },
  { step: "04", title: "Optional Monthly Optimization", desc: "For $500/mo I'll maintain your system, add new automations quarterly, and produce content to grow your pipeline." },
];

const faqs = [
  {
    q: "How long does it actually take?",
    a: "The AI Lead Machine is delivered in 7 business days. The Appointment Setter takes 10 days. The full AI system is 14 days. Timeline starts from the day I receive your onboarding information.",
  },
  {
    q: "Do I need to be technical?",
    a: "Not at all. I build and configure everything. You'll get a Loom video walkthrough and a written SOP so you or anyone on your team can use it. Most clients are not technical.",
  },
  {
    q: "What tools do you use?",
    a: "Depends on your business and what you already have. I work with GoHighLevel, Notion, Airtable, Zapier, Make, and custom-built systems. If you already have a CRM, I'll integrate with it.",
  },
  {
    q: "What kind of results can I expect?",
    a: "That depends on your current volume and industry. The most common results clients see: faster lead response (under 2 minutes vs. hours), higher follow-up rates (automated vs. manual), and fewer leads falling through the cracks. I don't promise specific revenue numbers because I don't control your offer or pricing — I control the system.",
  },
  {
    q: "What if I already have some tools in place?",
    a: "Even better. I'll audit what you have, identify the gaps, and build the missing pieces. You don't have to start from scratch.",
  },
  {
    q: "Do you offer refunds?",
    a: "I require 50% upfront before I start work. The remaining 50% is due at delivery. If you're not satisfied with the final system, I'll revise until you are. I stand behind my work.",
  },
];

export default function AISystemsPage() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] font-sans text-[#F9FAFB]">

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#0B0F1A]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image src="/brand/logo.svg" alt="Digital Wealth Transfer" width={180} height={37} priority unoptimized style={{ height: "auto" }} />
          </Link>
          <div className="hidden sm:flex items-center gap-2">
            <Link href="/directory" className="text-sm text-[#A1A1AA] hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
              Directory
            </Link>
            <Link href="/blog" className="text-sm text-[#A1A1AA] hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
              Blog
            </Link>
            <Link
              href="#get-started"
              className="ml-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              Get My System
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-7 tracking-wide">
            Done-For-You AI Systems · Local Businesses · Las Vegas & Nationwide
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.06] tracking-tight mb-6">
            Most businesses don&apos;t need<br />
            <span className="text-blue-400">more leads. They need a better system.</span>
          </h1>
          <p className="text-xl text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto mb-10">
            I build AI-powered lead capture, follow-up automation, and appointment-setting systems for local service businesses.
            Done for you. Delivered in 7 days. Built personally by Jonathan Cardona.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link
              href="#get-started"
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-blue-500 transition-colors text-center shadow-[0_0_30px_rgba(59,130,246,0.35)]"
            >
              Get a Free System Audit →
            </Link>
            <Link
              href="#offer"
              className="w-full sm:w-auto border border-white/[0.12] bg-white/[0.04] text-[#F9FAFB] px-8 py-4 rounded-xl font-bold text-base hover:bg-white/[0.08] transition-colors text-center"
            >
              See What&apos;s Included
            </Link>
          </div>
          <p className="text-xs text-[#A1A1AA]/50">Free consultation · Personal response within 24 hours · No pressure</p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/[0.06] bg-[#111827] py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { value: "< 2 min", label: "AI response time to new leads" },
            { value: "78%", label: "Of buyers go with whoever responds first" },
            { value: "7 days", label: "From kickoff to live system" },
            { value: "5–7×", label: "Follow-ups needed to close most sales" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-black text-white mb-1">{value}</p>
              <p className="text-xs text-[#A1A1AA]/70 leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3.5 py-1.5 rounded-full mb-5">
              Sound Familiar?
            </span>
            <h2 className="text-4xl font-bold text-white tracking-tight mb-5">
              You&apos;re getting inquiries.<br />You&apos;re not converting enough of them.
            </h2>
            <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
              The problem isn&apos;t your offer. It&apos;s the system around it.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {problems.map(({ label, title, desc }) => (
              <div key={label} className="bg-[#151B2D] border border-white/[0.08] rounded-2xl p-6 hover:border-rose-500/20 transition-all">
                <span className="text-[11px] font-bold text-rose-500/40 uppercase tracking-widest mb-3 block">{label}</span>
                <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Stack */}
      <section id="offer" className="bg-[#111827] border-y border-white/[0.06] py-24 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-5">
              The Systems
            </span>
            <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
              Pick your system. I build it. You use it.
            </h2>
            <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto">
              Every system is built custom for your business. No templates. No outsourcing. No shortcuts.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {offers.map((offer) => {
              const c = colorMap[offer.color];
              return (
                <div
                  key={offer.name}
                  className={`rounded-2xl p-7 flex flex-col transition-all ${
                    offer.best
                      ? `bg-blue-600/[0.07] border-2 ${c.activeBorder} shadow-[0_0_40px_rgba(59,130,246,0.1)]`
                      : `bg-[#151B2D] border ${c.border} hover:border-opacity-60`
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest border px-2.5 py-1 rounded-full ${c.badge}`}>
                      {offer.best ? "Most Popular" : offer.timeline}
                    </span>
                    {offer.best && (
                      <span className="text-[10px] font-bold text-blue-400/60 uppercase tracking-widest">{offer.timeline}</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mt-3 mb-1">{offer.name}</h3>
                  <p className="text-sm text-[#A1A1AA] mb-4">{offer.purpose}</p>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-black text-white">{offer.price}</span>
                    {!offer.price.includes("mo") && <span className="text-sm text-[#A1A1AA]/50">one-time</span>}
                  </div>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {offer.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#A1A1AA]">
                        <span className={`mt-0.5 w-4 h-4 shrink-0 rounded-full border flex items-center justify-center ${c.check}`}>
                          <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-2.5 h-2.5">
                            <path d="M2 5l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className={`border-t pt-4 mb-5 border-white/[0.06]`}>
                    <p className="text-xs text-[#A1A1AA]/60 leading-relaxed italic">&ldquo;{offer.outcome}&rdquo;</p>
                  </div>
                  <Link
                    href="#get-started"
                    className={`text-center text-sm font-bold px-5 py-3 rounded-xl transition-colors ${
                      offer.best
                        ? "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                        : "border border-white/[0.1] bg-white/[0.04] text-white hover:bg-white/[0.08]"
                    }`}
                  >
                    Get Started →
                  </Link>
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-[#A1A1AA]/60 mt-8">
            Not sure which system fits? Book a free 15-min call and I&apos;ll tell you exactly what I&apos;d build.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-5">
              The Process
            </span>
            <h2 className="text-4xl font-bold text-white tracking-tight">
              From audit to live system in 7 days
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="bg-[#151B2D] border border-white/[0.08] rounded-2xl p-6 hover:border-blue-500/20 transition-all">
                <span className="text-3xl font-black text-white/10 leading-none block mb-4 select-none">{step}</span>
                <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Jonathan */}
      <section className="bg-[#111827] border-y border-white/[0.06] py-20 px-6">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-semibold text-[#A1A1AA]/50 uppercase tracking-[0.15em] mb-5">
              Who Builds These Systems
            </span>
            <h2 className="text-3xl font-bold text-white mb-5">Built by Jonathan Cardona</h2>
            <p className="text-[#A1A1AA] leading-relaxed mb-4">
              I&apos;m a first-gen founder from East LA, now based in Las Vegas. I came up through sales, banking, and customer support — not a CS degree or venture funding. I taught myself AI and software development because I saw the leverage these tools create for people who actually know how to use them.
            </p>
            <p className="text-[#A1A1AA] leading-relaxed mb-6">
              I don&apos;t run an agency. I don&apos;t outsource your project to a junior overseas. Every system I build, I build myself — and I only take on projects where I&apos;m confident I can deliver real results.
            </p>
            <a
              href="https://www.linkedin.com/in/jonathan-cardona-1089291b9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              Connect on LinkedIn →
            </a>
          </div>
          <div className="space-y-3">
            {[
              { icon: "✓", text: "No outsourcing — built by Jonathan personally" },
              { icon: "✓", text: "No templates — custom-built for your business" },
              { icon: "✓", text: "No black holes — personal response within 24 hours" },
              { icon: "✓", text: "No jargon — plain English walkthrough on delivery" },
              { icon: "✓", text: "No lock-in — you own everything we build" },
              { icon: "✓", text: "No guesswork — free audit before any commitment" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3 bg-[#151B2D] border border-white/[0.06] rounded-xl px-5 py-3.5">
                <span className="text-blue-400 font-bold shrink-0">{icon}</span>
                <span className="text-sm text-[#A1A1AA]">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
            Built for local service businesses
          </h2>
          <p className="text-[#A1A1AA] max-w-xl mx-auto mb-10">
            If you have customers and you want more of them — and you want a system that works while you sleep — this is for you.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Med Spas & Aesthetics", "Real Estate Agents", "Roofing Companies", "Solar Providers",
              "Home Service Businesses", "Insurance Agents", "Law Firms", "Fitness Coaches",
              "Business Consultants", "AI & Tech Providers", "Any Local Service Business",
            ].map((type) => (
              <span key={type} className="bg-white/[0.04] border border-white/[0.08] text-[#A1A1AA] text-sm px-4 py-2 rounded-full">
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#111827] border-y border-white/[0.06] py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white tracking-tight">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-[#151B2D] border border-white/[0.08] rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white mb-2">{q}</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Form */}
      <section id="get-started" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-5">
              Get Started
            </span>
            <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
              Get a free system audit
            </h2>
            <p className="text-lg text-[#A1A1AA]">
              Tell me about your business. I&apos;ll tell you exactly what I&apos;d build and what results you can expect — free, no pressure, within 24 hours.
            </p>
          </div>
          <div className="bg-[#151B2D] border border-white/[0.08] rounded-2xl p-8">
            <AILeadForm />
          </div>
          <p className="text-center text-sm text-[#A1A1AA]/50 mt-5">
            Prefer to DM? Message me &ldquo;AI&rdquo; on{" "}
            <a href="https://www.linkedin.com/in/jonathan-cardona-1089291b9" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
              LinkedIn
            </a>
            {" "}and I&apos;ll tell you what I&apos;d build for your business.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#0B0F1A] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <Link href="/">
              <Image src="/brand/logo.svg" alt="Digital Wealth Transfer" width={160} height={33} unoptimized style={{ height: "auto" }} />
            </Link>
            <p className="text-xs text-[#A1A1AA]/60 mt-1">© 2026 Jonathan Cardona · Las Vegas, Nevada</p>
          </div>
          <div className="flex items-center gap-5 text-sm text-[#A1A1AA]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/directory" className="hover:text-white transition-colors">Directory</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <a href="https://www.linkedin.com/in/jonathan-cardona-1089291b9" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              LinkedIn →
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
