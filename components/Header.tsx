import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b border-white/[0.06] bg-[#0B0F1A]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <Image src="/brand/logo.svg" alt="Digital Wealth Transfer" width={180} height={37} priority unoptimized style={{ height: "auto" }} />
        </Link>
        <nav className="flex items-center gap-6 text-sm text-[#A1A1AA]">
          <Link href="/directory" className="hover:text-white transition-colors">
            Directory
          </Link>
          <Link
            href="/#business-form"
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-500 transition-colors font-semibold shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            Get Matched
          </Link>
        </nav>
      </div>
    </header>
  );
}
