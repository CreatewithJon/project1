import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Links — Digital Wealth Transfer",
  description: "Everything from Digital Wealth Transfer in one place. AI systems, lead generation, content, partnerships, and more.",
};

const links = [
  {
    group: "Start Here",
    items: [
      {
        label: "Get a Free AI Strategy",
        sub: "Tell me your goal — I'll map out the system",
        href: "/ai-strategy",
        style: "bg-blue-600 hover:bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)] text-white",
        arrow: true,
        featured: true,
      },
    ],
  },
  {
    group: "AI Systems",
    items: [
      {
        label: "AI Lead System",
        sub: "Capture and follow up with leads automatically",
        href: "/ai-leads",
        style: "bg-[#151B2D] border border-purple-500/20 hover:border-purple-500/40 text-white hover:bg-[#1a2236]",
        arrow: true,
        featured: false,
      },
      {
        label: "AI Content Engine",
        sub: "Create a week of content from one idea",
        href: "/ai-content",
        style: "bg-[#151B2D] border border-blue-500/20 hover:border-blue-500/40 text-white hover:bg-[#1a2236]",
        arrow: true,
        featured: false,
      },
      {
        label: "View All Solutions",
        sub: "AI Content, AI Leads, and AI Growth System",
        href: "/solutions",
        style: "bg-[#151B2D] border border-white/[0.08] hover:border-white/20 text-white hover:bg-[#1a2236]",
        arrow: true,
        featured: false,
      },
    ],
  },
  {
    group: "Work With Me",
    items: [
      {
        label: "Partner With Us",
        sub: "Agencies & consultants — expand your offer stack",
        href: "/partners",
        style: "bg-[#151B2D] border border-green-500/20 hover:border-green-500/40 text-white hover:bg-[#1a2236]",
        arrow: true,
        featured: false,
      },
      {
        label: "Explore the Marketplace",
        sub: "Find vetted AI & tech partners in Las Vegas",
        href: "/directory",
        style: "bg-[#151B2D] border border-white/[0.08] hover:border-white/20 text-white hover:bg-[#1a2236]",
        arrow: true,
        featured: false,
      },
    ],
  },
  {
    group: "Learn",
    items: [
      {
        label: "Read the Blog",
        sub: "Insights on AI, wealth, and modern business",
        href: "/blog",
        style: "bg-[#151B2D] border border-white/[0.08] hover:border-white/20 text-white hover:bg-[#1a2236]",
        arrow: true,
        featured: false,
      },
    ],
  },
];

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] font-sans text-[#F9FAFB]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-20 left-1/3 w-[300px] h-[200px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-md mx-auto px-5 py-16">

        {/* Profile */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-5 rounded-2xl overflow-hidden bg-[#151B2D] border border-white/[0.08] flex items-center justify-center p-3">
            <Image
              src="/brand/logo.svg"
              alt="Digital Wealth Transfer"
              width={56}
              height={56}
              unoptimized
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <h1 className="text-xl font-bold text-white mb-1">Digital Wealth Transfer</h1>
          <p className="text-sm text-[#A1A1AA] mb-1">Jonathan Cardona · Las Vegas, NV</p>
          <p className="text-sm text-[#A1A1AA]/70 max-w-xs mx-auto leading-relaxed">
            AI systems that help modern businesses attract customers, capture leads, and grow revenue.
          </p>
        </div>

        {/* Link Groups */}
        <div className="flex flex-col gap-8">
          {links.map((group) => (
            <div key={group.group}>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#A1A1AA]/40 mb-3 px-1">{group.group}</p>
              <div className="flex flex-col gap-3">
                {group.items.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block rounded-2xl px-5 py-4 transition-all ${link.style}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className={`font-bold text-sm leading-tight ${link.featured ? "text-white" : "text-white"}`}>{link.label}</p>
                        {link.sub && (
                          <p className={`text-xs mt-0.5 leading-relaxed ${link.featured ? "text-white/70" : "text-[#A1A1AA]"}`}>{link.sub}</p>
                        )}
                      </div>
                      {link.arrow && (
                        <svg viewBox="0 0 16 16" fill="none" className={`w-4 h-4 shrink-0 ${link.featured ? "text-white/70" : "text-white/30"}`}>
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-14 text-center">
          <p className="text-[11px] text-[#A1A1AA]/30">© 2025 Digital Wealth Transfer · Jonathan Cardona</p>
        </div>
      </div>
    </div>
  );
}
