import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ArticleCard from "@/components/ArticleCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import { getFeaturedArticles, articles } from "@/lib/data/articles";
import { ARTICLE_CATEGORY_LABELS } from "@/lib/types";

export const metadata: Metadata = {
  title: "Digital Wealth Transfer — Media, Education & Research",
  description:
    "Documenting the transition into the AI-powered digital economy. Articles, research, and commentary for people navigating what's happening — not engineers, not institutions.",
};

const topics = [
  { slug: "ai-economy", label: "AI Economy", desc: "How AI is restructuring work, business, and value" },
  { slug: "digital-assets", label: "Digital Assets", desc: "Bitcoin, ownership, and monetary sovereignty" },
  { slug: "financial-shift", label: "Financial Shift", desc: "The economic transition underway right now" },
  { slug: "opportunities", label: "Opportunities", desc: "How to position yourself in what's coming" },
];

export default function HomePage() {
  const featured = getFeaturedArticles().slice(0, 1)[0];
  const recent = articles.filter((a) => !a.featured).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0B0F1A] font-sans text-[#F9FAFB]">

      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-600/8 rounded-full blur-[140px] pointer-events-none" />

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-[#0B0F1A]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image src="/brand/logo.svg" alt="Digital Wealth Transfer" width={180} height={37} priority unoptimized style={{ height: "auto" }} />
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            <Link href="/blog" className="hidden sm:block text-sm text-[#A1A1AA] hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
              Read
            </Link>
            <Link href="#about" className="hidden sm:block text-sm text-[#A1A1AA] hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
              About
            </Link>
            <Link
              href="#newsletter"
              className="ml-2 bg-white/[0.07] border border-white/[0.12] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-white/[0.12] transition-colors"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 px-6">
        <div className="relative max-w-4xl mx-auto">
          <span className="inline-block text-[11px] font-semibold text-blue-400/80 uppercase tracking-[0.2em] mb-7">
            Media · Education · Research · Commentary
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.06] tracking-[-0.02em] mb-6 max-w-3xl">
            Documenting the transition into the{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              AI-powered digital economy.
            </span>
          </h1>
          <p className="text-xl text-[#A1A1AA] leading-relaxed max-w-2xl mb-10">
            Articles, research, and commentary for regular people navigating what&apos;s happening —
            not engineers, not institutions. Written by Jonathan Cardona from Las Vegas.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              href="/blog"
              className="bg-blue-600 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-blue-500 transition-colors shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            >
              Start Reading →
            </Link>
            <Link
              href="#newsletter"
              className="text-sm text-[#A1A1AA] hover:text-white transition-colors font-medium"
            >
              Subscribe to the newsletter ↓
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Article ── */}
      {featured && (
        <section className="px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A1A1AA]/40">Featured</span>
              <div className="flex-1 h-px bg-white/[0.05]" />
            </div>
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="bg-[#111827] border border-white/[0.08] rounded-2xl p-8 sm:p-10 hover:border-blue-500/25 hover:shadow-[0_0_40px_rgba(59,130,246,0.07)] transition-all">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                    {ARTICLE_CATEGORY_LABELS[featured.category]}
                  </span>
                  <span className="text-white/20">·</span>
                  <span className="text-xs text-[#A1A1AA]/60">{featured.readTime} min read</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white leading-snug tracking-[-0.01em] mb-4 max-w-3xl group-hover:text-blue-400 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-[#A1A1AA] text-base leading-relaxed max-w-2xl mb-6">{featured.excerpt}</p>
                <span className="text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                  Read article →
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── Recent Articles ── */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A1A1AA]/40">Recent</span>
            <div className="flex-1 h-px bg-white/[0.05]" />
            <Link href="/blog" className="text-xs text-[#A1A1AA]/40 hover:text-white transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {recent.map((article) => (
              <ArticleCard key={article.slug} article={article} size="large" />
            ))}
          </div>
        </div>
      </section>

      {/* ── Topics ── */}
      <section className="border-y border-white/[0.06] bg-[#0D1117] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A1A1AA]/40">Topics</span>
            <div className="flex-1 h-px bg-white/[0.05]" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topics.map(({ slug, label, desc }) => (
              <Link key={slug} href={`/${slug}`} className="group block bg-[#151B2D] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.14] transition-all">
                <p className="text-sm font-semibold text-white mb-1.5 group-hover:text-blue-400 transition-colors">{label}</p>
                <p className="text-xs text-[#A1A1AA]/60 leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#A1A1AA]/40 mb-5">
              The writer
            </span>
            <h2 className="text-3xl font-bold text-white mb-5 tracking-[-0.01em]">
              Jonathan Cardona
            </h2>
            <p className="text-[#A1A1AA] leading-relaxed mb-4">
              First-gen, self-taught. East LA raised, Las Vegas based. I came up through sales, banking,
              and customer support — not a CS degree. I taught myself AI, automation, Bitcoin, and software
              because I saw the leverage they create for people who actually use them.
            </p>
            <p className="text-[#A1A1AA] leading-relaxed mb-6">
              I write because I needed this content and it didn&apos;t exist. If you&apos;re figuring this out on your own —
              no institutional backing, no technical pedigree — this is built for you.
            </p>
            <div className="flex items-center gap-5">
              <a
                href="https://www.linkedin.com/in/jonathan-cardona-1089291b9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                LinkedIn →
              </a>
              <Link href="/portfolio" className="text-sm font-semibold text-[#A1A1AA] hover:text-white transition-colors">
                Portfolio →
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: "Background", value: "Sales · Banking · Customer Support · Crypto Education" },
              { label: "Building", value: "AI systems, automation tools, digital products" },
              { label: "Focus", value: "Making advanced technology accessible to regular people" },
              { label: "Based", value: "Las Vegas, Nevada" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#111827] border border-white/[0.06] rounded-xl px-5 py-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#A1A1AA]/40 mb-1">{label}</p>
                <p className="text-sm text-[#A1A1AA]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sovereign OS Teaser ── */}
      <section className="border-y border-white/[0.06] bg-[#0D1117] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-violet-400/60 mb-5">
            Coming soon
          </span>
          <h2 className="text-3xl font-bold text-white mb-4 tracking-[-0.01em]">
            Sovereign OS
          </h2>
          <p className="text-[#A1A1AA] leading-relaxed max-w-xl mx-auto mb-8">
            A personal intelligence operating system for the AI era. Built for people who want to own their tools,
            their data, and their workflow — without subscriptions, without the noise.
          </p>
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold px-4 py-2 rounded-full tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            In development · Follow the build on DWT
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section id="newsletter" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#A1A1AA]/40 mb-5">
            The Newsletter
          </span>
          <h2 className="text-3xl font-bold text-white mb-4 tracking-[-0.01em]">
            Stay in the signal.
          </h2>
          <p className="text-[#A1A1AA] leading-relaxed mb-8">
            A weekly dispatch on AI, Bitcoin, automation, and digital business.
            No hype. No filler. Just what&apos;s actually happening and what it means for you.
          </p>
          <NewsletterSignup />
          <p className="text-[11px] text-[#A1A1AA]/30 mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] bg-[#0B0F1A] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <Image src="/brand/logo.svg" alt="Digital Wealth Transfer" width={160} height={33} unoptimized style={{ height: "auto" }} />
            <p className="text-xs text-[#A1A1AA]/40 mt-1.5">© 2026 Jonathan Cardona · Las Vegas, Nevada</p>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-sm text-[#A1A1AA]">
            <Link href="/blog" className="hover:text-white transition-colors">Read</Link>
            <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <Link href="#about" className="hover:text-white transition-colors">About</Link>
            <Link href="#newsletter" className="hover:text-white transition-colors">Newsletter</Link>
            <a href="https://www.linkedin.com/in/jonathan-cardona-1089291b9" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn →</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

