export default function Hero() {
  return (
    <section className="relative pt-24 pb-20 px-6 text-center overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/12 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-8 tracking-wide">
          AI Strategy · Digital Wealth Transfer
        </span>
        <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.06] tracking-tight mb-6">
          Turn AI Into Revenue<br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            for Your Business
          </span>
        </h1>
        <p className="text-xl text-[#A1A1AA] leading-relaxed max-w-xl mx-auto mb-10">
          We help you generate more leads, automate operations, and grow using AI — without the guesswork.
        </p>
        <a
          href="#get-started"
          className="inline-block bg-blue-600 text-white px-9 py-4 rounded-xl font-bold text-base hover:bg-blue-500 transition-colors shadow-[0_0_35px_rgba(59,130,246,0.4)] mb-4"
        >
          Get My Free AI Strategy →
        </a>
        <p className="text-sm text-[#A1A1AA]/60">Or DM &ldquo;connect&rdquo;</p>
      </div>
    </section>
  );
}
