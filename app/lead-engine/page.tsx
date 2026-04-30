import type { Metadata } from "next";
import LeadEngine from "@/components/lead-engine/LeadEngine";

export const metadata: Metadata = {
  title: "Lead Engine — Digital Wealth Transfer",
  description: "Internal lead research and outreach dashboard",
  robots: "noindex, nofollow",
};

export default function LeadEnginePage() {
  return <LeadEngine />;
}
