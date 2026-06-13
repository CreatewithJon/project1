import type { Metadata } from "next";
import GH600Dashboard from "./GH600Dashboard";

export const metadata: Metadata = {
  title: "GH-600 Study System — Jonathan Cardona",
  description: "Interactive GH-600 Agentic AI Developer certification study system. 7-day roadmap, all 6 exam domains, flashcards, and practice questions mapped to real projects.",
};

export default function GH600Page() {
  return <GH600Dashboard />;
}
