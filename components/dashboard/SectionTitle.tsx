import type { ReactNode } from "react";

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500 mb-4">
      {children}
    </p>
  );
}
