import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Jonathan Cardona — Qualified Leads for AI & Digital Asset Companies",
  description:
    "I help AI, blockchain, and fintech companies connect with qualified clients actively looking for their services—without cold outreach or ads.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">

      {/* Nav */}
      <nav className="border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-sm font-semibold text-zinc-700">Jonathan Cardona</span>
          <Link
            href="#cta"
            className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Get Qualified Leads
          </Link>
        </div>
      </nav>

      {/* 1. Hero */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-zinc-400 tracking-wide mb-4">
            Jonathan Cardona
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 leading-tight mb-6">
            Find High-Intent Clients for Your AI &amp; Digital Asset Business
          </h1>
          <p className="text-lg text-zinc-500 leading-relaxed max-w-2xl mx-auto mb-8">
            I help AI, blockchain, and fintech companies connect with qualified clients
            actively looking for their services—without cold outreach or ads.
          </p>
          <Link
            href="#cta"
            className="inline-block bg-blue-600 text-white px-8 py-3.5 rounded-md font-semibold text-base hover:bg-blue-700 transition-colors"
          >
            Get Qualified Leads
          </Link>
        </div>
      </section>

      {/* 2. Authority Strip */}
      <section className="border-y border-zinc-100 bg-zinc-50 py-8 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm text-zinc-500">
            Specialized in the{" "}
            <span className="text-zinc-800 font-semibold">Las Vegas AI, blockchain, and fintech market</span>
            {" "}· Connecting qualified buyers with the right service providers · No cold outreach required
          </p>
        </div>
      </section>

      {/* 3. How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-3">How It Works</h2>
            <p className="text-zinc-500 max-w-lg mx-auto text-sm">
              A focused three-step process that puts your business in front of clients who are ready to buy.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                title: "Capture Demand",
                desc: "Through SEO, content, and AI-powered funnels, I attract prospects who are actively searching for services like yours—not passive browsers.",
              },
              {
                step: "02",
                title: "Qualify Leads",
                desc: "Each prospect is qualified for budget, intent, and service fit before they reach you. No tire-kickers. No time wasted on bad-fit conversations.",
              },
              {
                step: "03",
                title: "Match & Connect",
                desc: "I match qualified clients to the right provider and make a warm introduction. Your first conversation is with someone ready to move forward.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col gap-3">
                <span className="text-4xl font-black text-zinc-100 leading-none select-none">{step}</span>
                <h3 className="text-base font-semibold text-zinc-900">{title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Who It's For */}
      <section className="border-y border-zinc-100 bg-zinc-50 py-20 px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">Who It's For</h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Built for companies at the intersection of technology and wealth—where
              trust and expertise matter more than volume.
            </p>
          </div>
          <ul className="flex flex-col gap-3">
            {[
              "Enterprise AI solution providers",
              "AI-powered wealth advisory firms",
              "Blockchain infrastructure companies",
              "Digital asset custody providers",
              "Fintech platforms and payment companies",
              "Estate tech and digital inheritance firms",
              "Crypto-native family offices and RIAs",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-zinc-700">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Value Proposition */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-3">
              Qualified Opportunities. Not Generic Leads.
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto text-sm">
              Most lead generation sends you a name and an email. I send you a conversation with someone who already wants what you offer.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-5">
                Generic Lead Generation
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Unverified contact info",
                  "No purchase intent confirmed",
                  "High volume, low conversion",
                  "You do all the qualifying work",
                  "Cold, transactional outreach",
                ].map((pt) => (
                  <li key={pt} className="text-sm text-zinc-400 line-through flex items-start gap-2">
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-5">
                Jonathan Cardona
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Pre-qualified by budget and need",
                  "High purchase intent confirmed",
                  "Fewer leads, higher close rate",
                  "Warm introductions included",
                  "Built on trust and authority",
                ].map((pt) => (
                  <li key={pt} className="text-sm text-zinc-700 flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-0.5 leading-none">✓</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section id="cta" className="border-t border-zinc-100 py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold text-zinc-400 tracking-wide mb-4">
            Jonathan Cardona
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">
            Start Receiving Qualified Leads
          </h2>
          <p className="text-zinc-500 text-base leading-relaxed mb-8 max-w-lg mx-auto">
            Get your company in front of high-intent clients in the Las Vegas AI, blockchain,
            and fintech market. Let's talk about what that looks like for your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/directory"
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3.5 rounded-md font-semibold text-sm hover:bg-blue-700 transition-colors text-center"
            >
              Get Qualified Leads
            </Link>
            <Link
              href="/directory"
              className="w-full sm:w-auto border border-zinc-300 text-zinc-700 px-8 py-3.5 rounded-md font-semibold text-sm hover:bg-zinc-50 transition-colors text-center"
            >
              Browse the Directory
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 py-6 px-6">
        <div className="max-w-5xl mx-auto text-center text-xs text-zinc-400">
          © 2025 Jonathan Cardona · DigitalWealthTransfer.com · Las Vegas, Nevada
        </div>
      </footer>

    </div>
  );
}
