interface ProgressBarProps {
  value: number; // 0–100
  color: string;
  showLabel?: boolean;
}

export default function ProgressBar({ value, color, showLabel = true }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex-1 h-1 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(to right, ${color}99, ${color})`,
          }}
        />
      </div>
      {showLabel && (
        <span
          className="text-[10px] font-semibold tabular-nums w-7 text-right"
          style={{ color: "rgba(255,255,255,0.28)" }}
        >
          {pct}%
        </span>
      )}
    </div>
  );
}
