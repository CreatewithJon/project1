import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return createClient(url!, key!);
}

async function callClaude(prompt: string): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) throw new Error(`Anthropic API ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return json.content[0].text as string;
}

export async function POST(
  _request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "ANTHROPIC_API_KEY not configured — add it in Vercel env vars." },
      { status: 500 }
    );
  }

  const supabase = getSupabase();
  const { data: p, error: fetchErr } = await supabase
    .from("prospects")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchErr || !p) return Response.json({ error: "Prospect not found" }, { status: 404 });

  const prompt = `You are a sales assistant for Digital Wealth Transfer — an AI systems business in Las Vegas that builds:
- AI Lead Capture Systems ($500–1k)
- AI Content Systems ($500/mo)
- AI Appointment Setters ($750–1k)
- AI Websites + Funnels ($1k+)

Ideal clients: local service businesses (med spas, real estate, solar, insurance, fitness, legal, home services), coaches, consultants, Web3/AI companies.

Score this prospect:
Business: ${p.business_name}
Industry: ${p.industry ?? "Unknown"}
Website: ${p.website ?? "None"}
Instagram: ${p.instagram_url ?? "None"}
LinkedIn: ${p.linkedin_url ?? "None"}
Problem Signal: ${p.problem_signal ?? "None"}
Notes: ${p.notes ?? "None"}
Location: ${p.location ?? "Unknown"}

Return ONLY valid JSON, no markdown:
{
  "score": 7,
  "reason": "2-3 sentences explaining the score based on specific signals",
  "recommended_offer": "AI Lead System"
}

Scores: 1-3 poor fit, 4-6 possible, 7-8 good signals, 9-10 strong match.
recommended_offer must be one of: "AI Lead System", "AI Content Engine", "AI Growth System", "Partner Referral", "Not a fit"`;

  try {
    const raw = await callClaude(prompt);
    const parsed = JSON.parse(raw.replace(/```json\n?|\n?```/g, "").trim());

    const { data, error } = await supabase
      .from("prospects")
      .update({
        ai_score: parsed.score,
        ai_score_reason: parsed.reason,
        recommended_offer: parsed.recommended_offer,
        status: "Researched",
      })
      .eq("id", id)
      .select()
      .single();

    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ prospect: data });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "AI scoring failed" },
      { status: 500 }
    );
  }
}
