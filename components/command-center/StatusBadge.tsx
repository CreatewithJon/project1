import type { ProjectStatus } from "@/lib/types/command-center";

const CONFIG: Record<ProjectStatus, { label: string; color: string; bg: string; dot: string }> = {
  active:    { label: "Active",    color: "#10b981", bg: "rgba(16,185,129,0.1)",  dot: "#10b981" },
  building:  { label: "Building",  color: "#3b82f6", bg: "rgba(59,130,246,0.1)",  dot: "#3b82f6" },
  planning:  { label: "Planning",  color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  dot: "#f59e0b" },
  paused:    { label: "Paused",    color: "#6b7280", bg: "rgba(107,114,128,0.1)", dot: "#6b7280" },
  complete:  { label: "Complete",  color: "#8b5cf6", bg: "rgba(139,92,246,0.1)",  dot: "#8b5cf6" },
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  const c = CONFIG[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
      style={{ color: c.color, background: c.bg }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: c.dot,
          boxShadow: status === "active" ? `0 0 6px ${c.dot}` : "none",
        }}
      />
      {c.label}
    </span>
  );
}
