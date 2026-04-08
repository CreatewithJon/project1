import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-zinc-900 tracking-tight">
          Digital<span className="text-blue-600">Wealth</span>Transfer
        </Link>
        <nav className="flex items-center gap-6 text-sm text-zinc-600">
          <Link href="/directory" className="hover:text-zinc-900 transition-colors">
            Directory
          </Link>
          <Link
            href="/directory"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Get Matched
          </Link>
        </nav>
      </div>
    </header>
  );
}
