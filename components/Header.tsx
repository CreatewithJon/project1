import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b border-white/[0.06] bg-[#0B0F1A]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <Image src="/brand/logo.svg" alt="Digital Wealth Transfer" width={180} height={37} priority unoptimized style={{ height: "auto" }} />
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2 text-sm text-[#A1A1AA]">
          <Link href="/blog" className="hidden sm:block hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
            Read
          </Link>
          <Link href="/#about" className="hidden sm:block hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
            About
          </Link>
          <Link
            href="/#newsletter"
            className="ml-2 bg-white/[0.07] border border-white/[0.12] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-white/[0.12] transition-colors"
          >
            Subscribe
          </Link>
        </nav>
      </div>
    </header>
  );
}
