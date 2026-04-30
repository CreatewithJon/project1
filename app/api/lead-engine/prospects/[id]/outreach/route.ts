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
      max_tokens: 2048,
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

  const prompt = `Write outreach messages for Jonathan Cardona at Digital Wealth Transfer.

Jonathan's personality: chill, direct, helpful, genuine. NOT corporate or salesy. He's a Las Vegas entrepreneur who builds AI systems for local businesses. He DMs people on Instagram and LinkedIn and sends cold emails.

Prospect:
- Contact name: ${p.contact_name ?? "there"}
- Business: ${p.business_name}
- Industry: ${p.industry ?? "Unknown"}
- Problem: ${p.problem_signal ?? "None noted"}
- Best offer: ${p.recommended_offer ?? "AI systems"}
- Notes: ${p.notes ?? "None"}

Write 6 messages. Return ONLY valid JSON, no markdown, no extra text:
{
  "instagram_dm": "...",
  "linkedin_dm": "...",
  "email": "subject: [subject line here]\\n\\n[email body here]",
  "followup_1": "...",
  "followup_2": "...",
  "breakup": "..."
}

Writing rules:
- DMs max 80 words. Email max 150 words.
- Reference something SPECIFIC about their business or industry
- Open with an observation, not a pitch
- Don't start with "I" or "Hey [name]," every single time — vary it
- No "I hope this finds you well", no "I wanted to reach out", no "quick question"
- No corporate language. Write how a person texts.
- Goal: get a reply, not explain everything
- Follow-ups assume no reply — try a different angle each time
- Breakup message is graceful, leaves the door open, 1-2 sentences

Example IG DM style: "Came across [Business] — [specific observation]. Building AI lead systems for [industry] businesses right now. Would it be worth a 10-min chat?"`;

  try {
    const raw = await callClaude(prompt);
    const drafts = JSON.parse(raw.replace(/```json\n?|\n?```/g, "").trim());

    const { data, error } = await supabase
      .from("prospects")
      .update({
        outreach_drafts: drafts,
        status: "Message Drafted",
      })
      .eq("id", id)
      .select()
      .single();

    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ prospect: data, drafts });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Outreach generation failed" },
      { status: 500 }
    );
  }
}
