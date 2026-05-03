interface Props {
  eyebrow?: string;
  heading: string;
  sub?: string;
  light?: boolean; // light = dark bg, false = cream/light bg
  center?: boolean;
}

export default function SectionHeader({
  eyebrow,
  heading,
  sub,
  light = true,
  center = false,
}: Props) {
  const textBase = light ? "text-white" : "text-[#0F0F0F]";
  const textMuted = light ? "text-white/40" : "text-black/40";
  const eyebrowColor = "text-[#C9A84C]";

  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <p className={`text-[11px] font-semibold tracking-[0.25em] uppercase ${eyebrowColor} mb-4`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-4xl sm:text-5xl font-black tracking-tight leading-[1.04] ${textBase} mb-4`}
      >
        {heading}
      </h2>
      {sub && (
        <p className={`text-base sm:text-lg leading-relaxed ${textMuted} max-w-2xl ${center ? "mx-auto" : ""}`}>
          {sub}
        </p>
      )}
    </div>
  );
}
