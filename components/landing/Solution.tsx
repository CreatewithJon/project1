export default function Solution() {
  return (
    <section className="py-20 px-6 bg-[#111827] border-y border-white/[0.06]">
      <div className="max-w-2xl mx-auto text-center">
        <span className="inline-block text-xs font-semibold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3.5 py-1.5 rounded-full mb-6 tracking-wide">
          The Solution
        </span>
        <h2 className="text-3xl font-bold text-white tracking-tight mb-5">
          Digital Wealth Transfer
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-10">
          Through Digital Wealth Transfer, we connect you with the right AI tools and systems to help your business grow — without wasting time figuring it out alone.
        </p>
        <div className="flex flex-col gap-4 text-left">
          {[
            { icon: "→", label: "Capture more leads", desc: "Build systems that catch every inquiry and never let a prospect slip through." },
            { icon: "→", label: "Automate repetitive work", desc: "Free up your time by automating follow-ups, scheduling, and routine tasks." },
            { icon: "→", label: "Increase revenue", desc: "More leads contacted faster means more deals closed with less effort." },
          ].map(({ icon, label, desc }) => (
            <div key={label} className="flex items-start gap-4 bg-[#151B2D] border border-purple-500/15 rounded-2xl px-6 py-5">
              <span className="text-purple-400 font-bold text-base shrink-0 mt-0.5">{icon}</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">{label}</p>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
