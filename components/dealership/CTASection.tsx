import Link from "next/link";

interface Props {
  eyebrow?: string;
  heading: string;
  sub?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  dark?: boolean;
}

export default function CTASection({
  eyebrow,
  heading,
  sub,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  dark = true,
}: Props) {
  const bg = dark ? "bg-[#080808]" : "bg-[#0F0F0F]";

  return (
    <section className={`${bg} py-24 px-6 sm:px-10 border-t border-white/[0.05]`}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-10">
        <div className="max-w-xl">
          {eyebrow && (
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C9A84C] mb-4">
              {eyebrow}
            </p>
          )}
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight mb-4">
            {heading}
          </h2>
          {sub && <p className="text-white/40 text-base leading-relaxed">{sub}</p>}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#FDBA74] text-black font-bold text-sm tracking-wide px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,168,76,0.4)] whitespace-nowrap"
          >
            {primaryLabel} →
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="inline-flex items-center gap-2 border border-white/[0.15] text-white hover:bg-white/[0.06] font-semibold text-sm tracking-wide px-8 py-4 rounded-full transition-all duration-300 whitespace-nowrap"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
