import type { Project } from "@/lib/types/command-center";
import StatusBadge from "./StatusBadge";
import ProgressBar from "./ProgressBar";

const OWNERSHIP_LABELS: Record<Project["ownership"], string> = {
  sole: "Sole",
  "co-owned": "Co-owned",
  managed: "Managed",
};

const CATEGORY_LABELS: Record<Project["category"], string> = {
  media: "Media",
  software: "Software",
  services: "Services",
  client: "Client",
  education: "Education",
  community: "Community",
  content: "Content",
};

export default function ProjectCard({ project }: { project: Project }) {
  const { name, tagline, category, status, ownership, ownershipNote, progress, accentColor, sprintFocus, priorities, blockers } = project;

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-5"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.16em]"
              style={{ color: `${accentColor}99` }}
            >
              {CATEGORY_LABELS[category]}
            </span>
            <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: "rgba(255,255,255,0.22)" }}
            >
              {ownershipNote ?? OWNERSHIP_LABELS[ownership]}
            </span>
          </div>
          <h3 className="text-base font-bold text-white leading-snug tracking-[-0.01em]">
            {name}
          </h3>
          <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.34)" }}>
            {tagline}
          </p>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "rgba(255,255,255,0.2)" }}>
            Progress
          </span>
        </div>
        <ProgressBar value={progress} color={accentColor} />
      </div>

      {/* Sprint focus */}
      {sprintFocus && (
        <div
          className="px-4 py-3 rounded-xl text-xs leading-relaxed"
          style={{
            background: `${accentColor}08`,
            border: `1px solid ${accentColor}18`,
            color: "rgba(255,255,255,0.48)",
          }}
        >
          <span className="font-semibold uppercase tracking-[0.12em] text-[9px]" style={{ color: `${accentColor}88` }}>
            Sprint focus{" "}
          </span>
          {sprintFocus}
        </div>
      )}

      {/* Priorities */}
      {priorities.length > 0 && (
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.16em] mb-2.5" style={{ color: "rgba(255,255,255,0.18)" }}>
            Next priorities
          </p>
          <ul className="flex flex-col gap-2">
            {priorities.map((p, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs" style={{ color: "rgba(255,255,255,0.42)" }}>
                <span
                  className="mt-1.5 shrink-0 w-3 h-px rounded-full"
                  style={{ background: p.done ? accentColor : "rgba(255,255,255,0.15)" }}
                />
                <span style={{ textDecoration: p.done ? "line-through" : "none", opacity: p.done ? 0.4 : 1 }}>
                  {p.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Blockers */}
      {blockers.length > 0 && (
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.16em] mb-2.5" style={{ color: "rgba(255,255,255,0.18)" }}>
            Blockers
          </p>
          <ul className="flex flex-col gap-1.5">
            {blockers.map((b, i) => {
              const severityColor = b.severity === "high" ? "#ef4444" : b.severity === "medium" ? "#f59e0b" : "#6b7280";
              return (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-xs px-3 py-2 rounded-lg"
                  style={{
                    background: `${severityColor}08`,
                    border: `1px solid ${severityColor}18`,
                    color: "rgba(255,255,255,0.38)",
                  }}
                >
                  <span className="mt-0.5 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: severityColor }} />
                  {b.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
