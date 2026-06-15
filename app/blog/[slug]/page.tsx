import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllPublishedArticles, getRelatedArticles } from "@/lib/content";
import { ARTICLE_CATEGORY_LABELS } from "@/lib/types";
import type { ContentBlock, Article } from "@/lib/types";
import SiteNav from "@/components/dwt/SiteNav";
import SignalLine from "@/components/dwt/SignalLine";
import RevealOnScroll from "@/components/dwt/RevealOnScroll";
import NewsletterSignup from "@/components/NewsletterSignup";

export async function generateStaticParams() {
  const articles = await getAllPublishedArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} — Digital Wealth Transfer`,
    description: article.excerpt,
  };
}

// ─── Block renderer ────────────────────────────────────────────────────────────

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={i}
          className="text-2xl sm:text-3xl font-bold text-white mt-14 mb-5 tracking-[-0.02em] leading-snug"
        >
          {block.text}
        </h2>
      );

    case "h3":
      return (
        <h3
          key={i}
          className="text-xl font-semibold text-white/90 mt-10 mb-4 tracking-[-0.01em]"
        >
          {block.text}
        </h3>
      );

    case "p":
      return (
        <p
          key={i}
          className="text-base sm:text-lg leading-[1.85] mb-6"
          style={{ color: "rgba(240,244,255,0.62)" }}
        >
          {block.text}
        </p>
      );

    case "ul":
      return (
        <ul key={i} className="mb-7 flex flex-col gap-3">
          {block.items.map((item, j) => (
            <li
              key={j}
              className="flex items-start gap-4 text-base leading-relaxed"
              style={{ color: "rgba(240,244,255,0.58)" }}
            >
              <span
                className="mt-2.5 shrink-0 h-1 w-4 rounded-full"
                style={{ background: "rgba(59,130,246,0.6)" }}
              />
              {item}
            </li>
          ))}
        </ul>
      );

    case "blockquote":
      return (
        <blockquote
          key={i}
          className="my-8 pl-6"
          style={{ borderLeft: "2px solid rgba(59,130,246,0.35)" }}
        >
          <p
            className="text-lg italic leading-relaxed mb-2"
            style={{ color: "rgba(240,244,255,0.55)" }}
          >
            {block.text}
          </p>
          {block.attribution && (
            <cite
              className="text-xs font-semibold uppercase tracking-[0.15em] not-italic"
              style={{ color: "rgba(240,244,255,0.28)" }}
            >
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      );

    case "pullquote":
      return (
        <div
          key={i}
          className="my-12 py-10 px-6 sm:px-10 text-center rounded-2xl"
          style={{
            background: "rgba(59,130,246,0.04)",
            border: "1px solid rgba(59,130,246,0.1)",
          }}
        >
          <p
            className="text-xl sm:text-2xl font-semibold leading-[1.5] tracking-[-0.01em]"
            style={{ color: "rgba(240,244,255,0.85)" }}
          >
            &ldquo;{block.text}&rdquo;
          </p>
        </div>
      );

    case "callout":
      return (
        <div
          key={i}
          className="my-8 p-6 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {block.label && (
            <p
              className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3"
              style={{ color: "rgba(240,244,255,0.3)" }}
            >
              {block.label}
            </p>
          )}
          <p
            className="text-base leading-relaxed"
            style={{ color: "rgba(240,244,255,0.65)" }}
          >
            {block.text}
          </p>
        </div>
      );

    case "divider":
      return (
        <div
          key={i}
          className="my-12"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        />
      );
  }
}

// ─── Related article card ─────────────────────────────────────────────────────

function RelatedCard({ article }: { article: Article }) {
  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <div
        className="rounded-xl p-6 h-full transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-400/70 block mb-3">
          {ARTICLE_CATEGORY_LABELS[article.category]}
        </span>
        <h3
          className="text-base font-semibold leading-snug mb-2 transition-colors duration-200 group-hover:text-blue-400"
          style={{ color: "rgba(240,244,255,0.85)" }}
        >
          {article.title}
        </h3>
        <p
          className="text-sm leading-relaxed line-clamp-2"
          style={{ color: "rgba(240,244,255,0.38)" }}
        >
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = article.relatedSlugs?.length
    ? await getRelatedArticles(slug, article.relatedSlugs)
    : [];

  const categoryLabel = ARTICLE_CATEGORY_LABELS[article.category];
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen font-sans" style={{ background: "#080C14" }}>
      <SiteNav />
      <SignalLine />

      {/* ── Article hero ── */}
      <header className="px-6 pt-36 pb-14">
        <div className="max-w-3xl mx-auto">

          {/* Category + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-7">
            <Link
              href={`/${article.category}`}
              className="text-xs font-bold uppercase tracking-[0.18em] text-blue-400 hover:text-blue-300 transition-colors"
            >
              {categoryLabel}
            </Link>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              {formattedDate}
            </span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              {article.readTime} min read
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-bold text-white leading-[1.05] tracking-[-0.03em] mb-5"
            style={{ fontSize: "clamp(32px, 5.5vw, 56px)" }}
          >
            {article.title}
          </h1>

          {/* Subtitle */}
          {article.subtitle && (
            <p
              className="text-lg sm:text-xl leading-relaxed mb-6"
              style={{ color: "rgba(240,244,255,0.45)" }}
            >
              {article.subtitle}
            </p>
          )}

          {/* Author */}
          <div className="flex items-center gap-3 mt-8">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
              style={{ background: "rgba(59,130,246,0.2)", border: "1px solid rgba(59,130,246,0.25)" }}
            >
              JC
            </div>
            <div>
              <p className="text-xs font-semibold" style={{ color: "rgba(240,244,255,0.6)" }}>
                {article.author.name}
              </p>
              {article.author.title && (
                <p className="text-[10px]" style={{ color: "rgba(240,244,255,0.28)" }}>
                  {article.author.title}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6">
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
      </div>

      {/* ── Article body ── */}
      <main className="px-6 py-14">
        <div className="max-w-3xl mx-auto">
          {article.content.map((block, i) => renderBlock(block, i))}
        </div>
      </main>

      {/* ── Tags ── */}
      {article.tags.length > 0 && (
        <div className="px-6 pb-14">
          <div className="max-w-3xl mx-auto">
            <div
              className="pt-10"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-semibold px-3 py-1 rounded-full"
                    style={{
                      color: "rgba(240,244,255,0.28)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Related articles ── */}
      {related.length > 0 && (
        <section className="px-6 pb-20">
          <div className="max-w-3xl mx-auto">
            <div
              className="pt-12 mb-8"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.2)" }}>
                Continue reading
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <RevealOnScroll key={r.slug}>
                  <RelatedCard article={r} />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Newsletter CTA ── */}
      <section
        className="px-6 py-20"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="max-w-xl mx-auto text-center">
          <RevealOnScroll>
            <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.22em] mb-5" style={{ color: "rgba(255,255,255,0.2)" }}>
              The newsletter
            </span>
            <h2
              className="font-bold text-white tracking-[-0.02em] mb-4"
              style={{ fontSize: "clamp(24px, 3.5vw, 36px)" }}
            >
              Stay in the signal.
            </h2>
            <p className="text-sm leading-relaxed mb-8 max-w-sm mx-auto" style={{ color: "rgba(240,244,255,0.36)" }}>
              A weekly dispatch on AI, Bitcoin, automation, and digital business.
              Written from inside the transition, not above it.
            </p>
            <NewsletterSignup />
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="px-6 py-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between text-xs" style={{ color: "rgba(240,244,255,0.22)" }}>
          <span>© 2026 Jonathan Cardona · DigitalWealthTransfer.com</span>
          <Link href="/blog" className="hover:text-white/60 transition-colors duration-200">
            ← All articles
          </Link>
        </div>
      </footer>
    </div>
  );
}
