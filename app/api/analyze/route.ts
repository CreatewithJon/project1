/**
 * POST /api/analyze
 * Crawl a business website with Firecrawl, run AI scoring via Claude,
 * and optionally update a real_estate_leads row.
 *
 * Body:
 *   url          string   — the business website to crawl
 *   leadId?      string   — real_estate_leads.id to update with results
 *   companyName? string   — used in the AI prompt context
 *   niche?       string   — used in the AI prompt context
 *
 * Env vars: FIRECRAWL_API_KEY, ANTHROPIC_API_KEY
 *   (Supabase vars only needed when leadId is provided)
 */

import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { crawlUrl, quickAnalysis } from "@/lib/firecrawl";
import type { WebsiteAnalysis } from "@/lib/firecrawl";

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return createClient(url!, key!);
}

async function callClaude(prompt: string, maxTokens = 512): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return json.content[0].text as string;
}

// ── POST ─────────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  if (!process.env.FIRECRAWL_API_KEY) {
    return Response.json({ error: "FIRECRAWL_API_KEY not configured." }, { status: 500 });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "ANTHROPIC_API_KEY not configured." }, { status: 500 });
  }

  let body: { url: string; leadId?: string; companyName?: string; niche?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { url, leadId, companyName = "this business", niche = "local service business" } = body;

  if (!url) {
    return Response.json({ error: "'url' is required" }, { status: 400 });
  }

  // ── Step 1: Crawl the website ──────────────────────────────────────────────
  let crawlResult;
  try {
    crawlResult = await crawlUrl(url);
  } catch (err) {
    return Response.json(
      { error: `Website crawl failed: ${err instanceof Error ? err.message : "unknown error"}` },
      { status: 422 }
    );
  }

  // ── Step 2: Heuristic quick analysis ──────────────────────────────────────
  const quick = quickAnalysis(crawlResult);

  // ── Step 3: AI deep analysis ───────────────────────────────────────────────
  const contentSnippet = crawlResult.markdown.slice(0, 3000);
  const missingList = quick.missingFeatures?.join(", ") ?? "unknown";

  const prompt = `You are a sales analyst for Digital Wealth Transfer, a Las Vegas AI systems company.
We build:
- AI Lead Capture Systems ($500–1k): landing page + lead form + CRM + email automation
- AI Appointment Setters ($750–1k): chatbot/SMS bot + qualification + calendar booking
- AI Websites + Funnels ($1k+): website + conversion copy + lead form + SEO
- AI Content + Growth System ($500/mo): scripts, captions, blog repurposing, monthly optimization

Target clients: real estate agents, mortgage brokers, property managers, home inspectors, contractors, moving companies, insurance agencies in Las Vegas.

Analyze this business for outreach potential:

Business: ${companyName}
Niche: ${niche}
Website URL: ${url}
Website title: ${crawlResult.title ?? "N/A"}
Meta description: ${crawlResult.metaDescription ?? "N/A"}
Missing features detected: ${missingList}
Website content (first 3000 chars):
---
${contentSnippet}
---

Return ONLY valid JSON, no markdown fences:
{
  "websiteQuality": <1-10 integer, 10=perfect modern conversion machine>,
  "leadScore": <0-100 integer, 100=perfect lead for DWT>,
  "aiSummary": "<2-3 sentences: what the business does, what problems it has, why it's a good/bad prospect>",
  "outreachAngle": "<1 sentence: specific, non-generic hook for the first outreach message>",
  "recommendedOffer": "<one of: AI Lead System | AI Appointment Setter | AI Website + Funnel | AI Growth System | Not a fit>",
  "missingFeatures": ["<array of specific missing conversion features>"]
}

Scoring guide — leadScore:
- 80-100: obvious pain + budget signals + strong niche fit
- 60-79: good fit, needs some education
- 40-59: possible fit but unclear signals
- 0-39: poor fit or too small/too large`;

  let aiResult: WebsiteAnalysis;
  try {
    const raw = await callClaude(prompt, 600);
    const parsed = JSON.parse(raw.replace(/```json\n?|\n?```/g, "").trim());
    aiResult = {
      ...quick,
      websiteQuality: parsed.websiteQuality ?? quick.websiteQuality ?? 5,
      leadScore: parsed.leadScore ?? 50,
      aiSummary: parsed.aiSummary ?? "",
      outreachAngle: parsed.outreachAngle ?? "",
      recommendedOffer: parsed.recommendedOffer ?? "AI Lead System",
      missingFeatures: parsed.missingFeatures ?? quick.missingFeatures ?? [],
      hasBookingSystem: quick.hasBookingSystem ?? false,
      hasLiveChat: quick.hasLiveChat ?? false,
      hasLeadCapture: quick.hasLeadCapture ?? false,
      hasSocial: quick.hasSocial ?? false,
      hasSEO: quick.hasSEO ?? false,
    };
  } catch (err) {
    return Response.json(
      { error: `AI analysis failed: ${err instanceof Error ? err.message : "parse error"}` },
      { status: 500 }
    );
  }

  // ── Step 4: Optionally update real_estate_leads row ───────────────────────
  if (leadId) {
    const supabase = getSupabase();
    const { error } = await supabase
      .from("real_estate_leads")
      .update({
        lead_score: aiResult.leadScore,
        ai_summary: aiResult.aiSummary,
        website_quality: aiResult.websiteQuality,
        recommended_offer: aiResult.recommendedOffer,
        outreach_angle: aiResult.outreachAngle,
        missing_features: aiResult.missingFeatures,
        website_crawled_at: new Date().toISOString(),
        website_content: crawlResult.markdown.slice(0, 10000),
        status: "scored",
        notes: aiResult.outreachAngle,
      })
      .eq("id", leadId);

    if (error) {
      return Response.json(
        { warning: `Analysis complete but DB update failed: ${error.message}`, analysis: aiResult },
        { status: 207 }
      );
    }
  }

  return Response.json({ analysis: aiResult, crawledAt: new Date().toISOString() });
}
