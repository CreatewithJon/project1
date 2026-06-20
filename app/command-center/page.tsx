import { PROJECTS } from "@/lib/data/projects";
import ProjectCard from "@/components/command-center/ProjectCard";
import StatusBadge from "@/components/command-center/StatusBadge";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-5" style={{ color: "rgba(255,255,255,0.18)" }}>
      {children}
    </p>
  );
}

export default function CommandCenterPage() {
  const activeProjects = PROJECTS.filter((p) => p.status === "active" || p.status === "building");
  const pausedProjects = PROJECTS.filter((p) => p.status === "paused" || p.status === "planning");

  // Aggregate top blockers across all projects
  const allBlockers = PROJECTS.flatMap((p) =>
    p.blockers.map((b) => ({ ...b, projectName: p.name, accentColor: p.accentColor }))
  ).sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.severity] - order[b.severity];
  });

  // Top priorities across active projects
  const topPriorities = activeProjects.flatMap((p) =>
    p.priorities.slice(0, 1).map((pr) => ({ ...pr, projectName: p.name, accentColor: p.accentColor }))
  ).slice(0, 6);

  // Overall health metric
  const avgProgress = Math.round(PROJECTS.reduce((acc, p) => acc + p.progress, 0) / PROJECTS.length);

  return (
    <main className="px-6 pt-24 pb-28">
      <div className="max-w-6xl mx-auto">

        {/* Page header */}
        <div className="mb-14">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: "rgba(255,255,255,0.18)" }}>
              Sovereign OS · Ecosystem
            </span>
            <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.18)" }}>
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <h1
            className="font-bold text-white tracking-[-0.025em] leading-[1.06] mb-3"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            Command Center
          </h1>
          <p className="text-sm max-w-md" style={{ color: "rgba(255,255,255,0.32)" }}>
            All active projects. All priorities. One view.
          </p>
        </div>

        {/* Pulse row */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14 p-6 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] mb-1.5" style={{ color: "rgba(255,255,255,0.2)" }}>
              Projects
            </p>
            <p className="text-2xl font-bold text-white">{PROJECTS.length}</p>
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] mb-1.5" style={{ color: "rgba(255,255,255,0.2)" }}>
              Active / Building
            </p>
            <p className="text-2xl font-bold" style={{ color: "#10b981" }}>{activeProjects.length}</p>
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] mb-1.5" style={{ color: "rgba(255,255,255,0.2)" }}>
              Open blockers
            </p>
            <p className="text-2xl font-bold" style={{ color: allBlockers.length > 2 ? "#ef4444" : "#f59e0b" }}>
              {allBlockers.length}
            </p>
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] mb-1.5" style={{ color: "rgba(255,255,255,0.2)" }}>
              Avg progress
            </p>
            <p className="text-2xl font-bold" style={{ color: "#8b5cf6" }}>{avgProgress}%</p>
          </div>
        </div>

        {/* Top priorities + blockers — two col */}
        <div className="grid sm:grid-cols-2 gap-6 mb-14">

          {/* Top priorities */}
          <div
            className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <SectionLabel>Next 3 Priorities</SectionLabel>
            <ul className="flex flex-col gap-3">
              {topPriorities.slice(0, 6).map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: p.accentColor }}
                  />
                  <div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {p.text}
                    </p>
                    <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.22)" }}>
                      {p.projectName}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Blockers */}
          <div
            className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <SectionLabel>Active Blockers</SectionLabel>
            {allBlockers.length === 0 ? (
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>No blockers. Clean state.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {allBlockers.map((b, i) => {
                  const severityColor = b.severity === "high" ? "#ef4444" : b.severity === "medium" ? "#f59e0b" : "#6b7280";
                  return (
                    <li key={i} className="flex items-start gap-3 px-3 py-2.5 rounded-xl"
                      style={{ background: `${severityColor}08`, border: `1px solid ${severityColor}15` }}>
                      <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: severityColor }} />
                      <div>
                        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                          {b.text}
                        </p>
                        <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.22)" }}>
                          {b.projectName}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* Current sprint */}
        <div className="mb-14">
          <SectionLabel>Current Sprint</SectionLabel>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeProjects.filter((p) => p.sprintFocus).map((p) => (
              <div
                key={p.id}
                className="rounded-xl px-5 py-4"
                style={{ background: `${p.accentColor}08`, border: `1px solid ${p.accentColor}15` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: p.accentColor, boxShadow: `0 0 6px ${p.accentColor}` }}
                  />
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: `${p.accentColor}cc` }}>
                    {p.name}
                  </span>
                  <StatusBadge status={p.status} />
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                  {p.sprintFocus}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Project grid — active */}
        <div className="mb-10">
          <SectionLabel>Active Projects</SectionLabel>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {activeProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Project grid — paused / planning */}
        {pausedProjects.length > 0 && (
          <div>
            <SectionLabel>Planning / Paused</SectionLabel>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
              {pausedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
