export default function Problem() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-lg text-[#A1A1AA] mb-10 leading-relaxed">
          Most businesses are leaving money on the table because:
        </p>
        <div className="flex flex-col gap-4 text-left">
          {[
            { label: "01", text: "They rely on outdated systems that slow everything down and miss opportunities." },
            { label: "02", text: "They miss inbound leads — inquiries come in and never get followed up with properly." },
            { label: "03", text: "They don't know how to use AI effectively — so competitors get ahead while they stay stuck." },
          ].map(({ label, text }) => (
            <div key={label} className="flex items-start gap-4 bg-[#151B2D] border border-white/[0.08] rounded-2xl px-6 py-5">
              <span className="text-xs font-bold text-rose-500/50 uppercase tracking-widest shrink-0 mt-0.5">{label}</span>
              <p className="text-[#A1A1AA] text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
