import { redirect } from "next/navigation";
import Link from "next/link";
import { NAV, getDocContent, slugToPath } from "@/lib/docs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DWT Knowledge Base — AI OS Documentation",
};

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function DocsPage({ params }: PageProps) {
  const { slug } = await params;
  const activeSlug = slug ?? ["README"];

  const doc = getDocContent(activeSlug);
  if (!doc) redirect("/docs");

  return (
    <div className="min-h-screen flex" style={{ background: "#080C16", color: "#F9FAFB" }}>

      {/* ── SIDEBAR ── */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 shrink-0 border-r border-white/[0.06] h-screen sticky top-0 overflow-y-auto">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/[0.06]">
          <Link href="/docs" className="block">
            <p className="text-white font-black text-sm tracking-[-0.02em]">DWT Knowledge Base</p>
            <p className="text-[10px] text-white/25 tracking-[0.15em] uppercase mt-0.5">AI OS · Architecture · GH-600</p>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-5">
          {NAV.map((section) => (
            <div key={section.section}>
              <p
                className="text-[9px] font-black tracking-[0.2em] uppercase px-2 mb-1.5"
                style={{ color: section.color, opacity: 0.6 }}
              >
                {section.section}
              </p>
              {section.files.map((file) => {
                const isActive = JSON.stringify(file.slug) === JSON.stringify(activeSlug);
                return (
                  <Link
                    key={file.slug.join("/")}
                    href={slugToPath(file.slug)}
                    className="block px-3 py-1.5 rounded-lg text-xs transition-all"
                    style={{
                      background: isActive ? `${section.color}18` : "transparent",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                      borderLeft: isActive ? `2px solid ${section.color}` : "2px solid transparent",
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {file.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/[0.06]">
          <p className="text-[10px] text-white/15">© 2026 Digital Wealth Transfer</p>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
          <p className="text-white font-bold text-sm">DWT Knowledge Base</p>
          <Link href="/docs" className="text-xs text-white/40">← Index</Link>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-10 pb-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[11px] text-white/25 mb-8 flex-wrap">
            <Link href="/docs" className="hover:text-white/50 transition-colors">docs</Link>
            {activeSlug.map((part, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span>/</span>
                <span className={i === activeSlug.length - 1 ? "text-white/50" : ""}>{part}</span>
              </span>
            ))}
          </div>

          {/* Markdown rendered content */}
          <article
            className="docs-content"
            dangerouslySetInnerHTML={{ __html: doc.html }}
          />

          {/* Bottom navigation */}
          <DocNavButtons activeSlug={activeSlug} />
        </div>
      </main>

      {/* Markdown styles */}
      <style>{`
        .docs-content h1 {
          font-size: 1.875rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #fff;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }
        .docs-content h2 {
          font-size: 1.25rem;
          font-weight: 700;
          color: rgba(255,255,255,0.9);
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .docs-content h3 {
          font-size: 1rem;
          font-weight: 700;
          color: rgba(255,255,255,0.85);
          margin-top: 1.75rem;
          margin-bottom: 0.5rem;
        }
        .docs-content h4 {
          font-size: 0.875rem;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
          margin-top: 1.25rem;
          margin-bottom: 0.4rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .docs-content p {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.75;
          margin-bottom: 1rem;
        }
        .docs-content > p:first-of-type {
          font-size: 1rem;
          color: rgba(255,255,255,0.5);
          font-style: italic;
          padding: 1rem 1.25rem;
          background: rgba(59,130,246,0.06);
          border-left: 3px solid rgba(59,130,246,0.4);
          border-radius: 0 0.5rem 0.5rem 0;
          margin-bottom: 2rem;
        }
        .docs-content a {
          color: #60a5fa;
          text-decoration: none;
        }
        .docs-content a:hover {
          text-decoration: underline;
        }
        .docs-content code {
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 0.8rem;
          color: #a5f3fc;
          background: rgba(255,255,255,0.07);
          padding: 0.15em 0.4em;
          border-radius: 4px;
        }
        .docs-content pre {
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.75rem;
          padding: 1.25rem 1.5rem;
          overflow-x: auto;
          margin: 1.25rem 0;
        }
        .docs-content pre code {
          background: none;
          padding: 0;
          color: rgba(255,255,255,0.75);
          font-size: 0.8rem;
          line-height: 1.7;
        }
        .docs-content ul, .docs-content ol {
          color: rgba(255,255,255,0.55);
          font-size: 0.875rem;
          line-height: 1.75;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .docs-content li {
          margin-bottom: 0.3rem;
        }
        .docs-content table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.825rem;
          margin: 1.5rem 0;
        }
        .docs-content th {
          text-align: left;
          color: rgba(255,255,255,0.35);
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.6rem 0.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .docs-content td {
          padding: 0.6rem 0.75rem;
          color: rgba(255,255,255,0.5);
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .docs-content tr:hover td {
          background: rgba(255,255,255,0.02);
        }
        .docs-content blockquote {
          border-left: 3px solid rgba(139,92,246,0.5);
          padding: 0.75rem 1.25rem;
          background: rgba(139,92,246,0.05);
          border-radius: 0 0.5rem 0.5rem 0;
          margin: 1.25rem 0;
        }
        .docs-content blockquote p {
          color: rgba(255,255,255,0.6);
          font-style: italic;
          margin: 0;
        }
        .docs-content hr {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.07);
          margin: 2rem 0;
        }
        .docs-content strong {
          color: rgba(255,255,255,0.85);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

function DocNavButtons({ activeSlug }: { activeSlug: string[] }) {
  const allFiles = NAV.flatMap((s) => s.files);
  const currentIndex = allFiles.findIndex(
    (f) => JSON.stringify(f.slug) === JSON.stringify(activeSlug)
  );

  const prev = currentIndex > 0 ? allFiles[currentIndex - 1] : null;
  const next = currentIndex < allFiles.length - 1 ? allFiles[currentIndex + 1] : null;

  if (!prev && !next) return null;

  return (
    <div className="flex justify-between gap-4 mt-16 pt-8 border-t border-white/[0.06]">
      {prev ? (
        <Link
          href={slugToPath(prev.slug)}
          className="flex flex-col gap-0.5 px-4 py-3 rounded-xl transition-all max-w-[45%]"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <span className="text-[10px] text-white/25 uppercase tracking-widest">← Previous</span>
          <span className="text-sm text-white/60 font-medium">{prev.label}</span>
        </Link>
      ) : <div />}

      {next ? (
        <Link
          href={slugToPath(next.slug)}
          className="flex flex-col gap-0.5 px-4 py-3 rounded-xl transition-all text-right max-w-[45%]"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <span className="text-[10px] text-white/25 uppercase tracking-widest">Next →</span>
          <span className="text-sm text-white/60 font-medium">{next.label}</span>
        </Link>
      ) : <div />}
    </div>
  );
}
