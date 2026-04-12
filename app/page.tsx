import type { Metadata } from "next";
import Link from "next/link";
import BusinessLeadForm from "@/components/BusinessLeadForm";
import ProviderLeadForm from "@/components/ProviderLeadForm";

export const metadata: Metadata = {
  title: "DigitalWealthTransfer.com — Connect AI & Tech Businesses in Las Vegas",
  description:
    "Find a trusted AI, blockchain, or fintech provider in Las Vegas — or get matched with ready-to-buy clients. A two-sided marketplace for tech businesses.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">

      {/* Nav */}
      <nav className="border-b border-zinc-100 sticky top-0 bg-white z-50">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-sm font-semibold text-zinc-800">DigitalWealthTransfer.com</span>
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="#business-form"
              className="text-xs text-zinc-500 hover:text-zinc-800 transition-colors hidden sm:block px-2 py-1"
            >
              For Businesses
            </Link>
            <Link
              href="#provider-form"
              className="text-xs text-zinc-500 hover:text-zinc-800 transition-colors hidden sm:block px-2 py-1"
            >
              For Providers
            </Link>
            <Link
              href="/directory"
              className="text-xs text-zinc-500 hover:text-zinc-800 transition-colors hidden sm:block px-2 py-1"
            >
              Directory
            </Link>
            <Link
              href="/blog"
              className="text-xs text-zinc-500 hover:text-zinc-800 transition-colors hidden sm:block px-2 py-1"
            >
              Blog
            </Link>
            <Link
              href="#business-form"
              className="text-xs font-semibold bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors ml-2"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-5">
            Las Vegas · AI, Blockchain &amp; Fintech Marketplace
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 leading-tight mb-5">
            Connect With the Right AI &amp; Tech Experts in Las Vegas
          </h1>
          <p className="text-lg text-zinc-500 leading-relaxed max-w-2xl mx-auto mb-10">
            Find a trusted provider or get matched with ready-to-buy clients.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#business-form"
              className="w-full sm:w-auto inline-block bg-blue-600 text-white px-8 py-3.5 rounded-md font-semibold text-base hover:bg-blue-700 transition-colors text-center"
            >
              Find a Service Provider →
            </Link>
            <Link
              href="#provider-form"
              className="w-full sm:w-auto inline-block border border-zinc-300 text-zinc-700 px-8 py-3.5 rounded-md font-semibold text-base hover:bg-zinc-50 transition-colors text-center"
            >
              Get More Clients →
            </Link>
          </div>
          <p className="text-xs text-zinc-400 mt-5">Free to use · Las Vegas focused · Response within 24 hours</p>
        </div>
      </section>

      {/* Two-path section */}
      <section className="border-y border-zinc-100 bg-zinc-50 py-16 px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-8">

          {/* Business path */}
          <div className="bg-white rounded-xl border border-blue-100 p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">
              For Businesses
            </p>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">I Need a Service Provider</h2>
            <p className="text-sm text-zinc-500 mb-5 leading-relaxed">
              Looking for an AI solution, blockchain partner, or fintech platform?
              Tell us what you need and we'll match you with vetted Las Vegas providers —
              no cold calls, no RFPs.
            </p>
            <ul className="flex flex-col gap-2 mb-7">
              {[
                "Describe your needs once",
                "We identify and vet the right providers",
                "You receive a warm personal introduction",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-zinc-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="#business-form"
              className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Find a Provider →
            </Link>
          </div>

          {/* Provider path */}
          <div className="bg-white rounded-xl border border-zinc-200 p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
              For Providers
            </p>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">I Want More Clients</h2>
            <p className="text-sm text-zinc-500 mb-5 leading-relaxed">
              You're an AI, blockchain, or fintech company that wants qualified clients
              delivered — not cold leads. Tell us who you serve and we'll send you
              pre-vetted introductions.
            </p>
            <ul className="flex flex-col gap-2 mb-7">
              {[
                "Submit your services and ideal client profile",
                "We qualify buyers for budget and intent",
                "You receive warm intros ready to move forward",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-zinc-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="#provider-form"
              className="inline-block border border-zinc-300 text-zinc-700 px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-zinc-50 transition-colors"
            >
              Apply as a Provider →
            </Link>
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-3">How Matching Works</h2>
            <p className="text-zinc-500 max-w-lg mx-auto text-sm">
              A personal, human-reviewed process — not an algorithm.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                title: "Submit Your Request",
                desc: "Businesses describe what they need. Providers describe who they serve. Takes under 2 minutes.",
              },
              {
                step: "02",
                title: "We Manually Review",
                desc: "Every submission is personally reviewed. Businesses are qualified for budget and timeline. Providers are vetted for fit.",
              },
              {
                step: "03",
                title: "You Get a Warm Intro",
                desc: "Matched parties receive a personal introduction from Jonathan Cardona — not a cold email blast.",
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

      {/* Trust section */}
      <section className="border-y border-zinc-100 bg-zinc-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-zinc-900 mb-3">Why DigitalWealthTransfer.com</h2>
            <p className="text-zinc-500 text-sm max-w-lg mx-auto">
              Built specifically for the Las Vegas AI, blockchain, and fintech market.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "Las Vegas Focused",
                desc: "We specialize in the Las Vegas market — local knowledge, local connections, local results.",
              },
              {
                title: "Human-Reviewed Matches",
                desc: "Every match is manually reviewed by Jonathan Cardona — not routed by an algorithm.",
              },
              {
                title: "AI & Blockchain Specialists",
                desc: "We only work in AI, blockchain, fintech, and digital assets. No generalist noise.",
              },
              {
                title: "24-Hour Response",
                desc: "Every submission receives a personal response within 24 hours — guaranteed.",
              },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-white rounded-xl border border-zinc-200 p-6">
                <h3 className="text-sm font-semibold text-zinc-900 mb-2">{title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two lead forms */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-16">

          {/* Form A: Business */}
          <div id="business-form" className="scroll-mt-20">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
              For Businesses
            </p>
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">Find a Service Provider</h2>
            <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
              Tell me what you need. I'll find the right match and make a personal introduction.
            </p>
            <BusinessLeadForm />
          </div>

          {/* Form B: Provider */}
          <div id="provider-form" className="scroll-mt-20">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
              For Providers
            </p>
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">Get More Clients</h2>
            <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
              Tell me who you serve. I'll send you pre-vetted client introductions.
            </p>
            <ProviderLeadForm />
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <span>© 2025 DigitalWealthTransfer.com · Jonathan Cardona · Las Vegas, Nevada</span>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link href="#business-form" className="hover:text-zinc-600 transition-colors">For Businesses</Link>
            <Link href="#provider-form" className="hover:text-zinc-600 transition-colors">For Providers</Link>
            <Link href="/directory" className="hover:text-zinc-600 transition-colors">Directory</Link>
            <Link href="/blog" className="hover:text-zinc-600 transition-colors">Blog</Link>
            <a
              href="https://www.linkedin.com/in/jonathan-cardona-1089291b9"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-600 transition-colors"
            >
              LinkedIn →
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
