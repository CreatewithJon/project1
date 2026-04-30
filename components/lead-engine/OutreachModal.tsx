"use client";

import { useState, useEffect } from "react";
import { OutreachDrafts } from "./types";

interface Props {
  businessName: string;
  drafts: OutreachDrafts;
  onClose: () => void;
}

const TABS: { key: keyof OutreachDrafts; label: string }[] = [
  { key: "instagram_dm", label: "Instagram DM" },
  { key: "linkedin_dm", label: "LinkedIn DM" },
  { key: "email", label: "Email" },
  { key: "followup_1", label: "Follow-Up 1" },
  { key: "followup_2", label: "Follow-Up 2" },
  { key: "breakup", label: "Breakup" },
];

export default function OutreachModal({ businessName, drafts, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<keyof OutreachDrafts>("instagram_dm");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  function copy(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const content = drafts[activeTab] ?? "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-2xl bg-[#111827] border border-white/[0.08] rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <div>
            <h2 className="text-white font-bold text-base">Outreach Drafts</h2>
            <p className="text-white/40 text-xs mt-0.5">{businessName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-4 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white"
                  : "text-white/40 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          {content ? (
            <>
              <div className="bg-[#0B0F1A] border border-white/[0.08] rounded-xl p-4 mb-4 min-h-[140px]">
                <pre className="text-[#F9FAFB] text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  {content}
                </pre>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => copy(content)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    copied
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                  }`}
                >
                  {copied ? (
                    <>
                      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                        <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                        <rect x="5" y="5" width="8" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M3 11V3a1 1 0 011-1h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      Copy to Clipboard
                    </>
                  )}
                </button>
                <p className="text-white/25 text-xs">Paste manually into Instagram, LinkedIn, or email</p>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-32 text-white/20 text-sm">
              No draft for this message type
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div className="px-6 pb-5 flex justify-between">
          <button
            onClick={() => {
              const idx = TABS.findIndex((t) => t.key === activeTab);
              if (idx > 0) setActiveTab(TABS[idx - 1].key);
            }}
            disabled={TABS[0].key === activeTab}
            className="text-xs text-white/30 hover:text-white disabled:opacity-20 transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={() => {
              const idx = TABS.findIndex((t) => t.key === activeTab);
              if (idx < TABS.length - 1) setActiveTab(TABS[idx + 1].key);
            }}
            disabled={TABS[TABS.length - 1].key === activeTab}
            className="text-xs text-white/30 hover:text-white disabled:opacity-20 transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
