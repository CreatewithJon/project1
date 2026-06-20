import Link from "next/link";

const NAV_LINKS = [
  { label: "Overview", href: "/command-center" },
  { label: "DWT", href: "/command-center/dwt" },
  { label: "Sovereign OS", href: "/command-center/sovereign-os" },
  { label: "Aigentic", href: "/command-center/aigentic-systems" },
];

export default function CommandNav() {
  return (
    <header
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 h-14"
      style={{
        background: "rgba(6,9,15,0.94)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Brand */}
      <div className="flex items-center gap-3">
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: "#8b5cf6", boxShadow: "0 0 8px #8b5cf6" }}
        />
        <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.55)" }}>
          Sovereign OS
        </span>
        <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
        <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.28)" }}>
          Command Center
        </span>
      </div>

      {/* Nav */}
      <nav className="hidden sm:flex items-center gap-5">
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 hover:text-white/70"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Exit */}
      <Link
        href="/"
        className="text-[11px] font-semibold transition-colors duration-200 hover:text-white/60"
        style={{ color: "rgba(255,255,255,0.22)" }}
      >
        ← Exit
      </Link>
    </header>
  );
}
