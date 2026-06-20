import type { Metadata } from "next";
import CommandNav from "@/components/command-center/CommandNav";

export const metadata: Metadata = {
  title: "Command Center — Sovereign OS",
  description: "Private ecosystem command center for all active projects.",
  robots: { index: false, follow: false },
};

export default function CommandCenterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen font-sans" style={{ background: "#06090F" }}>
      <CommandNav />
      {children}
    </div>
  );
}
