export default function Steps() {
  const steps = [
    {
      step: "01",
      title: "Identify Opportunities",
      desc: "We find where your business is losing time or money — in your lead flow, follow-up process, or daily operations.",
      color: "blue",
    },
    {
      step: "02",
      title: "Match the Right Solution",
      desc: "We connect you with the right AI tools, automations, or systems built specifically for your business type.",
      color: "purple",
    },
    {
      step: "03",
      title: "Implement & Grow",
      desc: "You generate more leads, improve response times, and run a more efficient operation — with ongoing support.",
      color: "green",
    },
  ];

  const borderColor: Record<string, string> = {
    blue: "border-blue-500/20",
    purple: "border-purple-500/20",
    green: "border-green-500/20",
  };

  const numColor: Record<string, string> = {
    blue: "text-blue-500/20",
    purple: "text-purple-500/20",
    green: "text-green-500/20",
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-5 tracking-wide">
            How It Works
          </span>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Three steps to more revenue
          </h2>
        </div>
        <div className="flex flex-col gap-5">
          {steps.map(({ step, title, desc, color }) => (
            <div key={step} className={`bg-[#151B2D] border ${borderColor[color]} rounded-2xl p-7 flex gap-5`}>
              <span className={`text-4xl font-black leading-none shrink-0 select-none ${numColor[color]}`}>
                {step}
              </span>
              <div>
                <h3 className="text-white font-bold text-base mb-2">{title}</h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
