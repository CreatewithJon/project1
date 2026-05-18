"use client";

import { useState, useEffect, useRef } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface RawLead {
  id?: string;
  company_name: string;
  phone?: string | null;
  website?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  niche?: string | null;
  google_rating?: number | null;
  google_review_count?: number | null;
  google_maps_url?: string | null;
  lead_score?: number | null;
  ai_summary?: string | null;
  website_quality?: number | null;
  recommended_offer?: string | null;
  outreach_angle?: string | null;
  status?: string;
}

interface ScrapeResult {
  runId: string;
  status: "RUNNING" | "READY" | "SUCCEEDED" | "FAILED";
  total?: number;
  stored?: number;
  skipped?: number;
  results?: RawLead[];
  error?: string;
}

// ── Industry Preset Packs ─────────────────────────────────────────────────────
// Each pack is a collection of niches that work well together for a campaign.
// You can build a pack around a specific client type or city vertical.

const INDUSTRY_PACKS: Record<string, { label: string; color: string; niches: string[] }> = {
  real_estate: {
    label: "Real Estate",
    color: "blue",
    niches: [
      "real estate agent",
      "mortgage broker",
      "property manager",
      "home inspector",
      "title company",
      "real estate attorney",
      "home stager",
      "real estate photographer",
    ],
  },
  home_services: {
    label: "Home Services",
    color: "amber",
    niches: [
      "general contractor",
      "roofing contractor",
      "plumber",
      "electrician",
      "HVAC company",
      "home cleaning service",
      "landscaping company",
      "pool service",
      "pest control",
      "garage door repair",
    ],
  },
  health_wellness: {
    label: "Health & Wellness",
    color: "emerald",
    niches: [
      "med spa",
      "chiropractor",
      "physical therapist",
      "personal trainer",
      "gym",
      "yoga studio",
      "dentist",
      "plastic surgeon",
      "dermatologist",
      "weight loss clinic",
    ],
  },
  legal_financial: {
    label: "Legal & Finance",
    color: "purple",
    niches: [
      "insurance agency",
      "law firm",
      "financial advisor",
      "tax accountant",
      "bookkeeper",
      "mortgage broker",
      "credit repair",
      "bankruptcy attorney",
    ],
  },
  auto: {
    label: "Automotive",
    color: "rose",
    niches: [
      "auto dealership",
      "auto repair shop",
      "car detailing",
      "auto glass repair",
      "towing company",
      "oil change service",
      "tire shop",
    ],
  },
  solar_energy: {
    label: "Solar & Energy",
    color: "yellow",
    niches: [
      "solar company",
      "solar installer",
      "energy consultant",
      "battery storage company",
      "EV charging installer",
    ],
  },
  restaurants_hospitality: {
    label: "Restaurants",
    color: "orange",
    niches: [
      "restaurant",
      "catering company",
      "food truck",
      "bakery",
      "coffee shop",
      "bar",
      "event venue",
    ],
  },
  custom: {
    label: "Custom",
    color: "white",
    niches: [],
  },
};

const PACK_COLORS: Record<string, string> = {
  blue: "bg-blue-600/20 border-blue-500/30 text-blue-400",
  amber: "bg-amber-600/20 border-amber-500/30 text-amber-400",
  emerald: "bg-emerald-600/20 border-emerald-500/30 text-emerald-400",
  purple: "bg-purple-600/20 border-purple-500/30 text-purple-400",
  rose: "bg-rose-600/20 border-rose-500/30 text-rose-400",
  yellow: "bg-yellow-600/20 border-yellow-500/30 text-yellow-400",
  orange: "bg-orange-600/20 border-orange-500/30 text-orange-400",
  white: "bg-white/5 border-white/15 text-white/50",
};

const SCORE_COLOR = (score: number | null | undefined) => {
  if (!score) return "bg-white/5 text-white/30 border-white/10";
  if (score >= 80) return "bg-green-500/10 text-green-400 border-green-500/20";
  if (score >= 60) return "bg-blue-500/10 text-blue-400 border-blue-500/20";
  if (score >= 40) return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  return "bg-rose-500/10 text-rose-400 border-rose-500/20";
};

// ── Component ─────────────────────────────────────────────────────────────────

interface ScrapePanelProps {
  onPromoteToPipeline: (lead: RawLead) => void;
}

export default function ScrapePanel({ onPromoteToPipeline }: ScrapePanelProps) {
  // UI state
  const [activeSection, setActiveSection] = useState<"scrape" | "guide">("scrape");
  const [searchMode, setSearchMode] = useState<"pack" | "free">("pack");

  // Free search mode state
  const [freeQueries, setFreeQueries] = useState<string[]>([]);
  const [freeInput, setFreeInput] = useState("");

  // Pack / niche state
  const [activePack, setActivePack] = useState<string>("real_estate");
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState("");

  // Location state
  const [city, setCity] = useState("Las Vegas");
  const [stateAbbr, setStateAbbr] = useState("NV");
  const [maxPerQuery, setMaxPerQuery] = useState(20);

  // Scrape run state
  const [runId, setRunId] = useState<string | null>(null);
  const [runStatus, setRunStatus] = useState<ScrapeResult["status"] | null>(null);
  const [scrapeLoading, setScrapeLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Results state
  const [results, setResults] = useState<RawLead[]>([]);
  const [filterNiche, setFilterNiche] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"default" | "score" | "rating">("default");

  // Per-lead actions
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [promotingId, setPromotingId] = useState<string | null>(null);
  const [storedCount, setStoredCount] = useState(0);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function showToast(type: "success" | "error", msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4500);
  }

  // Free search helpers
  function addFreeQuery() {
    const trimmed = freeInput.trim();
    if (!trimmed || freeQueries.includes(trimmed)) return;
    setFreeQueries((prev) => [...prev, trimmed]);
    setFreeInput("");
  }

  function removeFreeQuery(q: string) {
    setFreeQueries((prev) => prev.filter((x) => x !== q));
  }

  function handleFreeKeydown(e: React.KeyboardEvent) {
    if (e.key === "Enter") { e.preventDefault(); addFreeQuery(); }
  }

  // When pack changes, load its niches
  function selectPack(packKey: string) {
    setActivePack(packKey);
    if (packKey !== "custom") {
      setSelectedNiches([...INDUSTRY_PACKS[packKey].niches]);
    }
  }

  // Toggle single niche
  function toggleNiche(niche: string) {
    setSelectedNiches((prev) =>
      prev.includes(niche) ? prev.filter((n) => n !== niche) : [...prev, niche]
    );
  }

  // Add custom niche from input
  function addCustomNiche() {
    const trimmed = customInput.trim().toLowerCase();
    if (!trimmed || selectedNiches.includes(trimmed)) return;
    setSelectedNiches((prev) => [...prev, trimmed]);
    setCustomInput("");
  }

  function handleCustomKeydown(e: React.KeyboardEvent) {
    if (e.key === "Enter") { e.preventDefault(); addCustomNiche(); }
  }

  // ── Trigger scrape ─────────────────────────────────────────────────────────
  async function handleScrape() {
    if (searchMode === "free" && !freeQueries.length) { setError("Add at least one search query."); return; }
    if (searchMode === "pack" && !selectedNiches.length) { setError("Add at least one niche to search."); return; }
    setError(null);
    setScrapeLoading(true);
    setResults([]);
    setRunId(null);
    setRunStatus(null);
    setStoredCount(0);

    try {
      const body = searchMode === "free"
        ? { rawQueries: freeQueries, maxPerQuery }
        : { niches: selectedNiches, city, state: stateAbbr, maxPerQuery };

      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.error); return; }
      setRunId(json.runId);
      setRunStatus("RUNNING");
    } catch {
      setError("Failed to start scrape. Check your Apify API token.");
    } finally {
      setScrapeLoading(false);
    }
  }

  // ── Poll for completion ────────────────────────────────────────────────────
  useEffect(() => {
    if (!runId || runStatus === "SUCCEEDED" || runStatus === "FAILED") return;

    pollRef.current = setInterval(async () => {
      try {
        const niche = selectedNiches[0] ?? "business";
        const res = await fetch(
          `/api/scrape?runId=${runId}&niche=${encodeURIComponent(niche)}&store=true`
        );
        const json: ScrapeResult = await res.json();
        setRunStatus(json.status);

        if (json.status === "SUCCEEDED") {
          clearInterval(pollRef.current!);
          setResults(json.results ?? []);
          setStoredCount(json.stored ?? 0);
          showToast(
            "success",
            `Done — ${json.total} scraped · ${json.stored} new · ${json.skipped} already in DB`
          );
        } else if (json.status === "FAILED") {
          clearInterval(pollRef.current!);
          setError(json.error ?? "Scrape run failed on Apify.");
        }
      } catch { /* keep polling silently */ }
    }, 4000);

    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runId, runStatus]);

  // ── Analyze single lead ────────────────────────────────────────────────────
  async function handleAnalyze(lead: RawLead, idx: number) {
    if (!lead.website) { showToast("error", "No website URL for this lead"); return; }
    const key = lead.id ?? String(idx);
    setAnalyzingId(key);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: lead.website,
          leadId: lead.id,
          companyName: lead.company_name,
          niche: lead.niche ?? selectedNiches[0] ?? "local business",
        }),
      });
      const json = await res.json();
      if (!res.ok) { showToast("error", json.error); return; }

      const a = json.analysis;
      setResults((prev) =>
        prev.map((r, i) =>
          (r.id ? r.id === lead.id : i === idx)
            ? { ...r, lead_score: a.leadScore, ai_summary: a.aiSummary, website_quality: a.websiteQuality, recommended_offer: a.recommendedOffer, outreach_angle: a.outreachAngle }
            : r
        )
      );
      showToast("success", `Analyzed — Lead score: ${a.leadScore}/100`);
    } catch {
      showToast("error", "Analysis request failed");
    } finally {
      setAnalyzingId(null);
    }
  }

  // ── Analyze all with websites ──────────────────────────────────────────────
  async function handleAnalyzeAll() {
    const queue = results.filter((r) => r.website && !r.lead_score);
    if (!queue.length) { showToast("error", "No unanalyzed leads with websites found"); return; }
    showToast("success", `Analyzing ${queue.length} websites — this will take a minute…`);
    for (let i = 0; i < queue.length; i++) {
      await handleAnalyze(queue[i], results.indexOf(queue[i]));
      await new Promise((r) => setTimeout(r, 700));
    }
    showToast("success", "All websites analyzed!");
  }

  // ── Promote to pipeline ────────────────────────────────────────────────────
  function handlePromote(lead: RawLead, idx: number) {
    const key = lead.id ?? String(idx);
    setPromotingId(key);
    onPromoteToPipeline(lead);
    setTimeout(() => setPromotingId(null), 600);
    showToast("success", `${lead.company_name} sent to pipeline`);
  }

  // ── Sorted / filtered results ──────────────────────────────────────────────
  const displayResults = [...(filterNiche === "all" ? results : results.filter((r) => r.niche === filterNiche))]
    .sort((a, b) => {
      if (sortBy === "score") return (b.lead_score ?? 0) - (a.lead_score ?? 0);
      if (sortBy === "rating") return (b.google_rating ?? 0) - (a.google_rating ?? 0);
      return 0;
    });

  const nicheCounts = results.reduce<Record<string, number>>((acc, r) => {
    const n = r.niche ?? "unknown";
    acc[n] = (acc[n] ?? 0) + 1;
    return acc;
  }, {});

  const currentPackNiches = activePack === "custom" ? [] : INDUSTRY_PACKS[activePack]?.niches ?? [];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-5">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-semibold shadow-xl border transition-all ${
          toast.type === "success"
            ? "bg-green-500/10 border-green-500/20 text-green-400"
            : "bg-rose-500/10 border-rose-500/20 text-rose-400"
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Section toggle */}
      <div className="flex gap-1 bg-[#151B2D] border border-white/[0.06] rounded-lg p-1 w-fit">
        <button
          onClick={() => setActiveSection("scrape")}
          className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors ${
            activeSection === "scrape" ? "bg-emerald-600 text-white" : "text-white/40 hover:text-white"
          }`}
        >
          ⚙ Configure &amp; Run
        </button>
        <button
          onClick={() => setActiveSection("guide")}
          className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors ${
            activeSection === "guide" ? "bg-blue-600 text-white" : "text-white/40 hover:text-white"
          }`}
        >
          📖 How to Use
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          GUIDE SECTION
         ══════════════════════════════════════════════════════════════════════ */}
      {activeSection === "guide" && (
        <div className="space-y-4">

          {/* Step-by-step */}
          <div className="bg-[#111827] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-white font-bold text-base mb-1">How to Use the Scraper</h3>
            <p className="text-white/30 text-xs mb-6">A full walkthrough from cold list to warm outreach.</p>

            <div className="space-y-5">
              {[
                {
                  step: "01",
                  color: "blue",
                  title: "Pick an Industry Pack",
                  detail: "Choose a preset pack (Real Estate, Home Services, Health, etc.) or use Custom to type in any business type. Each pack preloads the most valuable niches for that vertical. You can deselect niches you don't want or mix niches from different packs using Custom mode.",
                  tip: "💡 For a new city, start with 3–4 niches and 20 results each. That gives you 60–80 leads to work from without overwhelming yourself.",
                },
                {
                  step: "02",
                  color: "emerald",
                  title: "Set Your Target City",
                  detail: "Enter the city + state you want to target. The scraper sends each niche as a Google Maps search: \"mortgage broker Las Vegas NV\". You can run the same niches in multiple cities by changing the city and running again.",
                  tip: "💡 Best cities: Las Vegas, Henderson, Summerlin, North Las Vegas. For other markets, just change the city field.",
                },
                {
                  step: "03",
                  color: "purple",
                  title: "Start Scrape + Wait",
                  detail: "Click Start Scrape. Apify runs the Google Maps actor — it usually takes 1–3 minutes. The page polls every 4 seconds and shows results as soon as the run completes. New results are auto-saved to the real_estate_leads table in Supabase. Duplicate businesses (same name + phone) are automatically skipped.",
                  tip: "💡 Set Max per niche to 20–30 for most campaigns. Only go to 50–100 if you're doing a high-volume city sweep.",
                },
                {
                  step: "04",
                  color: "amber",
                  title: "Enrich With AI (Website Analysis)",
                  detail: "After scraping, click ⚡ Analyze on any lead that has a website. This sends the URL to Firecrawl (which crawls the site like a browser), then passes the full site content to Claude. Claude reads the site and returns: a lead score (0–100), a 2-3 sentence business summary, what's missing from their site, and the exact outreach angle to use. Click Analyze All to process every lead with a website automatically — takes 1–2 minutes.",
                  tip: "💡 Prioritize leads with websites. A business with no website is a harder sell — they need more trust-building before they'll invest in AI systems.",
                },
                {
                  step: "05",
                  color: "rose",
                  title: "Filter + Sort Results",
                  detail: "Use the niche filter tabs to view results by category. Sort by Score to see your best leads first, or by Rating to find high-credibility businesses (many reviews = active, profitable business). Focus on leads with score 60+ first.",
                  tip: "💡 A score of 80+ means: they have an active business, a weak or missing digital presence, and a clear problem our AI systems solve.",
                },
                {
                  step: "06",
                  color: "indigo",
                  title: "Promote to Pipeline",
                  detail: "For every lead worth pursuing, click → Pipeline. This opens the Add Lead modal pre-filled with all scraped + AI data (business name, website, phone, industry, AI score, recommended offer, outreach angle). Save it and it appears in your Pipeline tab. From there, click Draft to generate personalized outreach messages — Instagram DM, LinkedIn, email, and 2 follow-ups.",
                  tip: "💡 Only promote leads you actually plan to contact. Keep the pipeline clean — quality over quantity.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-5">
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black border ${
                    item.color === "blue" ? "bg-blue-500/10 border-blue-500/20 text-blue-400" :
                    item.color === "emerald" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                    item.color === "purple" ? "bg-purple-500/10 border-purple-500/20 text-purple-400" :
                    item.color === "amber" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" :
                    item.color === "rose" ? "bg-rose-500/10 border-rose-500/20 text-rose-400" :
                    "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
                  }`}>
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
                    <p className="text-white/45 text-xs leading-relaxed mb-2">{item.detail}</p>
                    <p className="text-white/25 text-[11px] leading-relaxed italic">{item.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enrichment deep dive */}
          <div className="bg-[#111827] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-white font-bold text-base mb-1">Data Enrichment Explained</h3>
            <p className="text-white/30 text-xs mb-5">What each data point means and how to use it in outreach.</p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  field: "Lead Score (0–100)",
                  source: "Claude AI",
                  color: "green",
                  what: "Overall fit score for selling AI systems to this business.",
                  use: "80–100: reach out today. 60–79: good candidate, slightly longer pitch. 40–59: warm them up with content first. Under 40: skip or deprioritize.",
                },
                {
                  field: "Website Quality (0–10)",
                  source: "Firecrawl + AI",
                  color: "blue",
                  what: "How professional and conversion-optimized the business website is.",
                  use: "Low score (1–4) = major opportunity to pitch AI Website + Funnel. High score (8–10) = they have a decent site, pitch AI Lead System or Appointment Setter instead.",
                },
                {
                  field: "AI Summary",
                  source: "Claude AI",
                  color: "purple",
                  what: "2–3 sentence description of what the business does, what problems it has, and why it's a good (or bad) prospect.",
                  use: "Read this before writing any outreach message. Reference specific details from the summary to show you actually looked at their business.",
                },
                {
                  field: "Outreach Angle",
                  source: "Claude AI",
                  color: "amber",
                  what: "A single specific hook sentence written for your first message to this lead.",
                  use: "Use this as the opening line of your DM or email — or paste it into the Draft Outreach flow to generate full messages.",
                },
                {
                  field: "Recommended Offer",
                  source: "Claude AI",
                  color: "indigo",
                  what: "Which of your AI systems packages best matches this business's needs.",
                  use: "Lead the pitch with this offer. Don't try to sell everything — one clear recommendation converts better.",
                },
                {
                  field: "Missing Features",
                  source: "Firecrawl + AI",
                  color: "rose",
                  what: "List of conversion features the business website is missing (booking system, live chat, lead form, SEO, social links).",
                  use: "Use these as pain points in outreach. 'I noticed you don't have a way to book online...' is far more effective than generic AI pitches.",
                },
                {
                  field: "Google Rating + Reviews",
                  source: "Apify (Google Maps)",
                  color: "yellow",
                  what: "The business's star rating and total review count from Google Maps.",
                  use: "High rating + high reviews = active, trusted business with budget. Low reviews = newer or struggling business — higher risk but potentially motivated.",
                },
                {
                  field: "Phone + Address",
                  source: "Apify (Google Maps)",
                  color: "teal",
                  what: "Direct contact info pulled from the Google Maps listing.",
                  use: "Call the number directly for warm outreach. Use the address to confirm they're genuinely local and operational.",
                },
              ].map((item) => (
                <div key={item.field} className="bg-[#0B0F1A] border border-white/[0.05] rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-white font-semibold text-sm">{item.field}</p>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/25 bg-white/5 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {item.source}
                    </span>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed mb-2">{item.what}</p>
                  <p className="text-white/60 text-xs leading-relaxed border-l-2 border-white/10 pl-2.5 italic">{item.use}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick reference scoring */}
          <div className="bg-[#111827] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-white font-bold text-base mb-4">Lead Score Quick Reference</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { range: "80–100", label: "Hot Lead", color: "green", action: "Contact immediately. Use the outreach angle + draft messages." },
                { range: "60–79", label: "Warm Lead", color: "blue", action: "Good fit. Promote to pipeline, draft outreach this week." },
                { range: "40–59", label: "Possible", color: "amber", action: "Borderline. Follow on social, warm up before cold pitch." },
                { range: "0–39", label: "Skip", color: "rose", action: "Poor fit — too small, too established, or wrong niche." },
              ].map((item) => (
                <div key={item.range} className={`p-4 rounded-xl border ${
                  item.color === "green" ? "bg-green-500/5 border-green-500/20" :
                  item.color === "blue" ? "bg-blue-500/5 border-blue-500/20" :
                  item.color === "amber" ? "bg-amber-500/5 border-amber-500/20" :
                  "bg-rose-500/5 border-rose-500/20"
                }`}>
                  <p className={`text-2xl font-black mb-1 ${
                    item.color === "green" ? "text-green-400" :
                    item.color === "blue" ? "text-blue-400" :
                    item.color === "amber" ? "text-amber-400" :
                    "text-rose-400"
                  }`}>{item.range}</p>
                  <p className="text-white/70 text-xs font-semibold mb-1">{item.label}</p>
                  <p className="text-white/30 text-[11px] leading-relaxed">{item.action}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          SCRAPE SECTION
         ══════════════════════════════════════════════════════════════════════ */}
      {activeSection === "scrape" && (
        <div className="space-y-5">

          {/* Config card */}
          <div className="bg-[#111827] border border-white/[0.06] rounded-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-white font-bold text-base">Google Maps Scraper</h3>
                <p className="text-white/30 text-xs mt-0.5">Powered by Apify · Works for any industry in any city</p>
              </div>
              {runStatus === "RUNNING" && (
                <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold">
                  <div className="w-3 h-3 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                  Scraping… (1–3 min)
                </div>
              )}
              {runStatus === "SUCCEEDED" && (
                <span className="text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
                  ✓ Complete — {results.length} results
                </span>
              )}
            </div>

            {/* Mode toggle */}
            <div className="flex gap-1 bg-[#0B0F1A] border border-white/[0.08] rounded-lg p-1 w-fit mb-5">
              <button
                onClick={() => setSearchMode("pack")}
                className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors ${
                  searchMode === "pack" ? "bg-blue-600 text-white" : "text-white/35 hover:text-white"
                }`}
              >
                Industry Packs
              </button>
              <button
                onClick={() => setSearchMode("free")}
                className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors ${
                  searchMode === "free" ? "bg-emerald-600 text-white" : "text-white/35 hover:text-white"
                }`}
              >
                Free Search
              </button>
            </div>

            {/* ── FREE SEARCH MODE ─────────────────────────────────────────── */}
            {searchMode === "free" && (
              <div className="mb-6">
                <p className="text-white/30 text-xs mb-3 leading-relaxed">
                  Type any Google Maps search query. Include the city + state in each query for best results.
                  <span className="text-white/20 ml-1">e.g. "barbershops Houston TX" · "vegan restaurants Austin TX"</span>
                </p>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={freeInput}
                    onChange={(e) => setFreeInput(e.target.value)}
                    onKeyDown={handleFreeKeydown}
                    placeholder='e.g. "tattoo shops Las Vegas NV"'
                    className="flex-1 bg-[#0B0F1A] border border-white/[0.1] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-emerald-500/40"
                  />
                  <button
                    onClick={addFreeQuery}
                    className="px-4 py-2.5 rounded-lg text-xs font-bold bg-emerald-600/15 border border-emerald-500/25 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors"
                  >
                    + Add
                  </button>
                </div>
                {freeQueries.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {freeQueries.map((q) => (
                      <span
                        key={q}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600/10 border border-emerald-500/20 text-emerald-400"
                      >
                        {q}
                        <button
                          onClick={() => removeFreeQuery(q)}
                          className="text-emerald-400/40 hover:text-emerald-400 transition-colors leading-none"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/15 text-xs">No queries added yet</p>
                )}
              </div>
            )}

            {/* Location + settings row */}
            <div className={`grid gap-4 mb-6 ${searchMode === "free" ? "grid-cols-1" : "grid-cols-3"}`}>
              {searchMode === "pack" && (
                <>
                  <div>
                    <label className="block text-[11px] font-bold text-white/30 uppercase tracking-wider mb-2">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#0B0F1A] border border-white/[0.1] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-white/30 uppercase tracking-wider mb-2">State</label>
                    <input
                      type="text"
                      value={stateAbbr}
                      onChange={(e) => setStateAbbr(e.target.value)}
                      className="w-full bg-[#0B0F1A] border border-white/[0.1] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/40"
                    />
                  </div>
                </>
              )}
              <div>
                <label className="block text-[11px] font-bold text-white/30 uppercase tracking-wider mb-2">Max per niche</label>
                <select
                  value={maxPerQuery}
                  onChange={(e) => setMaxPerQuery(parseInt(e.target.value))}
                  className="w-full bg-[#0B0F1A] border border-white/[0.1] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/40"
                >
                  {[10, 20, 30, 50, 100].map((n) => <option key={n} value={n}>{n} results</option>)}
                </select>
              </div>
            </div>

            {/* Pack mode UI */}
            {searchMode === "pack" && (
              <>
                {/* Industry pack selector */}
                <div className="mb-5">
                  <label className="block text-[11px] font-bold text-white/30 uppercase tracking-wider mb-3">Industry Pack</label>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(INDUSTRY_PACKS).map(([key, pack]) => {
                      const active = activePack === key;
                      const colorClass = PACK_COLORS[pack.color];
                      return (
                        <button
                          key={key}
                          onClick={() => selectPack(key)}
                          className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all ${
                            active
                              ? colorClass
                              : "bg-[#0B0F1A] border-white/[0.08] text-white/30 hover:text-white/70"
                          }`}
                        >
                          {pack.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Niche chips for selected pack */}
                {activePack !== "custom" && (
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[11px] font-bold text-white/30 uppercase tracking-wider">
                        Niches — {INDUSTRY_PACKS[activePack]?.label}
                      </label>
                      <div className="flex gap-3 text-[10px]">
                        <button onClick={() => setSelectedNiches([...currentPackNiches])} className="text-white/30 hover:text-white transition-colors">All</button>
                        <span className="text-white/15">·</span>
                        <button onClick={() => setSelectedNiches([])} className="text-white/30 hover:text-white transition-colors">None</button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentPackNiches.map((niche) => {
                        const on = selectedNiches.includes(niche);
                        return (
                          <button
                            key={niche}
                            onClick={() => toggleNiche(niche)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                              on
                                ? "bg-blue-600 border-blue-500 text-white"
                                : "bg-[#0B0F1A] border-white/[0.08] text-white/35 hover:text-white"
                            }`}
                          >
                            {niche}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Custom niche input */}
                <div className="mb-5">
                  <label className="block text-[11px] font-bold text-white/30 uppercase tracking-wider mb-2">
                    {activePack === "custom" ? "Type any business type" : "Add custom niche"}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      onKeyDown={handleCustomKeydown}
                      placeholder='e.g. "wedding photographer" or "dog groomer"'
                      className="flex-1 bg-[#0B0F1A] border border-white/[0.1] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-blue-500/40"
                    />
                    <button
                      onClick={addCustomNiche}
                      className="px-4 py-2.5 rounded-lg text-xs font-bold bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      + Add
                    </button>
                  </div>
                  {selectedNiches.filter((n) => !currentPackNiches.includes(n)).length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedNiches.filter((n) => !currentPackNiches.includes(n)).map((niche) => (
                        <span
                          key={niche}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 text-white/50"
                        >
                          {niche}
                          <button
                            onClick={() => toggleNiche(niche)}
                            className="text-white/25 hover:text-white/70 transition-colors leading-none"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Summary */}
                {selectedNiches.length > 0 && (
                  <p className="text-white/20 text-[11px] mb-4">
                    {selectedNiches.length} niche{selectedNiches.length !== 1 ? "s" : ""} selected ·
                    up to {selectedNiches.length * maxPerQuery} total results ·
                    {city}, {stateAbbr}
                  </p>
                )}
              </>
            )}

            {/* Free search summary */}
            {searchMode === "free" && freeQueries.length > 0 && (
              <p className="text-white/20 text-[11px] mb-4">
                {freeQueries.length} quer{freeQueries.length !== 1 ? "ies" : "y"} · up to {freeQueries.length * maxPerQuery} total results
              </p>
            )}
            {error && (
              <p className="text-rose-400 text-sm mb-4 bg-rose-500/5 border border-rose-500/20 rounded-lg px-4 py-2.5">
                {error}
              </p>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleScrape}
                disabled={
                  scrapeLoading ||
                  runStatus === "RUNNING" ||
                  (searchMode === "pack" ? !selectedNiches.length : !freeQueries.length)
                }
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-[0_0_20px_rgba(59,130,246,0.25)] disabled:opacity-40"
              >
                {scrapeLoading ? "Starting…" : runStatus === "RUNNING" ? "Scraping…" : "▶ Start Scrape"}
              </button>

              {results.length > 0 && (
                <>
                  <button
                    onClick={handleAnalyzeAll}
                    disabled={!!analyzingId}
                    className="px-5 py-2.5 rounded-xl text-sm font-bold bg-purple-600/15 border border-purple-500/25 text-purple-400 hover:bg-purple-600 hover:text-white transition-colors disabled:opacity-40"
                  >
                    {analyzingId ? "Analyzing…" : `⚡ Analyze All Websites (${results.filter((r) => r.website && !r.lead_score).length})`}
                  </button>
                  <button
                    onClick={() => setActiveSection("guide")}
                    className="px-4 py-2.5 rounded-xl text-xs text-white/25 hover:text-white/60 transition-colors"
                  >
                    📖 How to use results →
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div>
              {/* Filter + sort bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilterNiche("all")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      filterNiche === "all" ? "bg-white/10 border-white/20 text-white" : "bg-transparent border-white/[0.08] text-white/30 hover:text-white"
                    }`}
                  >
                    All ({results.length})
                  </button>
                  {Object.entries(nicheCounts).map(([niche, count]) => (
                    <button
                      key={niche}
                      onClick={() => setFilterNiche(niche)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                        filterNiche === niche ? "bg-blue-600/20 border-blue-500/30 text-blue-400" : "bg-transparent border-white/[0.08] text-white/30 hover:text-white"
                      }`}
                    >
                      {niche} ({count})
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/25 text-xs">Sort:</span>
                  {(["default", "score", "rating"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSortBy(s)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                        sortBy === s ? "bg-white/10 text-white" : "text-white/25 hover:text-white"
                      }`}
                    >
                      {s === "default" ? "Default" : s === "score" ? "Score ↓" : "Rating ↓"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#111827] border border-white/[0.06] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/[0.06]">
                        {["Business", "Niche", "Location", "Google", "AI Score", "Summary / Angle", "Actions"].map((h) => (
                          <th key={h} className="text-left text-[11px] font-bold text-white/30 uppercase tracking-wider px-4 py-3 whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {displayResults.map((lead, idx) => {
                        const key = lead.id ?? String(idx);
                        const isAnalyzing = analyzingId === key;
                        const isPromoting = promotingId === key;
                        const realIdx = results.indexOf(lead);

                        return (
                          <tr key={key} className="border-b border-white/[0.04] hover:bg-[#151B2D]/50 transition-colors">

                            {/* Business */}
                            <td className="px-4 py-3 max-w-[170px]">
                              <p className="text-white font-semibold text-sm truncate">{lead.company_name}</p>
                              <div className="flex flex-wrap gap-x-2 mt-0.5">
                                {lead.website && (
                                  <a href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`} target="_blank" rel="noopener noreferrer"
                                    className="text-[10px] text-blue-400/60 hover:text-blue-400 truncate max-w-[140px] block">
                                    🌐 site
                                  </a>
                                )}
                                {lead.google_maps_url && (
                                  <a href={lead.google_maps_url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-red-400/50 hover:text-red-400">
                                    📍 maps
                                  </a>
                                )}
                              </div>
                              {lead.phone && <p className="text-[10px] text-white/20 mt-0.5">{lead.phone}</p>}
                            </td>

                            {/* Niche */}
                            <td className="px-4 py-3">
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 whitespace-nowrap">
                                {lead.niche ?? "—"}
                              </span>
                            </td>

                            {/* Location */}
                            <td className="px-4 py-3 text-white/45 text-xs whitespace-nowrap">
                              {[lead.city, lead.state].filter(Boolean).join(", ") || "—"}
                            </td>

                            {/* Google */}
                            <td className="px-4 py-3">
                              {lead.google_rating ? (
                                <div>
                                  <p className="text-amber-400 text-xs font-bold">★ {lead.google_rating}</p>
                                  <p className="text-white/25 text-[10px]">{lead.google_review_count} reviews</p>
                                </div>
                              ) : <span className="text-white/20 text-xs">—</span>}
                            </td>

                            {/* Score */}
                            <td className="px-4 py-3">
                              {lead.lead_score != null ? (
                                <div>
                                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${SCORE_COLOR(lead.lead_score)}`}>
                                    {lead.lead_score}/100
                                  </span>
                                  {lead.website_quality != null && (
                                    <p className="text-white/20 text-[10px] mt-0.5">web: {lead.website_quality}/10</p>
                                  )}
                                  {lead.recommended_offer && (
                                    <p className="text-purple-400/60 text-[10px] mt-0.5 truncate max-w-[100px]">{lead.recommended_offer}</p>
                                  )}
                                </div>
                              ) : (
                                <span className="text-white/20 text-xs">{lead.website ? "Not scored" : "No website"}</span>
                              )}
                            </td>

                            {/* Summary / angle */}
                            <td className="px-4 py-3 max-w-[220px]">
                              {lead.outreach_angle ? (
                                <p className="text-white/60 text-[11px] leading-relaxed italic line-clamp-2">
                                  &ldquo;{lead.outreach_angle}&rdquo;
                                </p>
                              ) : lead.ai_summary ? (
                                <p className="text-white/40 text-[11px] leading-relaxed line-clamp-3">{lead.ai_summary}</p>
                              ) : (
                                <span className="text-white/15 text-xs">Run ⚡ Analyze</span>
                              )}
                            </td>

                            {/* Actions */}
                            <td className="px-4 py-3">
                              <div className="flex flex-col gap-1.5">
                                {lead.website && !lead.lead_score && (
                                  <button
                                    onClick={() => handleAnalyze(lead, realIdx)}
                                    disabled={isAnalyzing}
                                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-purple-600/10 border border-purple-500/20 text-purple-400 hover:bg-purple-600 hover:text-white transition-colors disabled:opacity-50 whitespace-nowrap"
                                  >
                                    {isAnalyzing ? "…" : "⚡ Analyze"}
                                  </button>
                                )}
                                <button
                                  onClick={() => handlePromote(lead, realIdx)}
                                  disabled={isPromoting}
                                  className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-green-600/10 border border-green-500/20 text-green-400 hover:bg-green-600 hover:text-white transition-colors disabled:opacity-50 whitespace-nowrap"
                                >
                                  {isPromoting ? "…" : "→ Pipeline"}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="px-4 py-3 border-t border-white/[0.04] flex items-center justify-between">
                  <p className="text-xs text-white/25">
                    {displayResults.length} shown · {results.filter((r) => r.lead_score).length} scored · {results.filter((r) => r.website).length} with websites
                    {storedCount > 0 && <span className="text-green-400 ml-2">· {storedCount} saved to DB</span>}
                  </p>
                  <p className="text-[10px] text-white/15">Apify · Firecrawl · Claude Haiku</p>
                </div>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!results.length && runStatus !== "RUNNING" && !scrapeLoading && (
            <div className="flex flex-col items-center justify-center h-36 text-white/20 gap-2 bg-[#111827] border border-white/[0.06] rounded-xl">
              <p>No results yet</p>
              <p className="text-xs text-center max-w-xs">
                Select an industry pack, choose your niches, and hit Start Scrape
              </p>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
