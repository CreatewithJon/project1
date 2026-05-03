interface Props {
  value: string;
  label: string;
  accent?: boolean;
}

export default function StatCard({ value, label, accent = false }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <p
        className={`text-4xl sm:text-5xl font-black tracking-tight ${
          accent ? "text-[#C9A84C]" : "text-white"
        }`}
      >
        {value}
      </p>
      <p className="text-white/40 text-sm tracking-wide">{label}</p>
    </div>
  );
}
