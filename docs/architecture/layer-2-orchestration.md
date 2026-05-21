# Layer 2 — Orchestration Layer

> **The one-sentence version:** Orchestration is the logic that decides what information to give the AI, which model to use, and what to do with the output — it's everything that happens between the user's action and the AI call.

---

## What Orchestration Actually Does

Most developers think orchestration is about routing requests to different AI models. That's a small part of it. Orchestration is really about **context assembly** — taking raw user input and turning it into a prompt that gives the AI everything it needs to do a good job.

The quality of an AI system is mostly determined here, not in the model. A mediocre model with excellent orchestration outperforms a great model with poor orchestration every time.

---

## Context Assembly: The Core Job

Before calling Claude, you need to assemble:

```
USER INPUT
    +
SYSTEM PROMPT (who the AI is, what rules it follows)
    +
WORKING MEMORY (conversation history, if any)
    +
RETRIEVED CONTEXT (relevant data from database, if any)
    +
STRUCTURED INSTRUCTIONS (what format to return, constraints)
    =
THE PROMPT
```

The orchestration layer assembles this context, then calls the model. The model's job is just to process it.

**In this system, every route handler IS an orchestration layer:**

```typescript
// /api/lead-engine/prospects/[id]/score/route.ts
// This route is entirely orchestration logic

// Step 1: Retrieve context (prospect data from database)
const { data: prospect } = await supabase
  .from("prospects")
  .select("*")
  .eq("id", id)
  .single();

// Step 2: Assemble prompt (structure the context for the AI)
const prompt = `You are a sales analyst for Digital Wealth Transfer...

Score this prospect:
Business: ${prospect.business_name}        // ← injected context
Industry: ${prospect.industry ?? "Unknown"}
Website: ${prospect.website ?? "None"}
Problem Signal: ${prospect.problem_signal ?? "None"}

Return ONLY valid JSON:                    // ← output format instruction
{ "score": <1-10>, "reason": "...", "recommended_offer": "..." }`;

// Step 3: Call model with assembled context
const raw = await callClaude({
  messages: [{ role: "user", content: prompt }],
  maxTokens: 512,         // ← model configuration
  tag: "lead-score",      // ← observability tag
});

// Step 4: Process output
const parsed = JSON.parse(raw.replace(/```json\n?|\n?```/g, "").trim());
```

This is orchestration: retrieve → assemble → call → process.

---

## The `callClaude()` Helper: Orchestration Infrastructure

```typescript
// lib/ai.ts — the orchestration infrastructure layer

export async function callClaude({
  model = "claude-haiku-4-5-20251001",  // Default model selection
  messages,
  system,
  maxTokens = 1024,
  tag = "general",
}: CallClaudeOptions): Promise<string> {
  const useHelicone = !!process.env.HELICONE_API_KEY;
  const baseURL = useHelicone
    ? "https://anthropic.helicone.ai"      // ← Route through observability proxy
    : "https://api.anthropic.com";

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-api-key": process.env.ANTHROPIC_API_KEY!,
    "anthropic-version": "2023-06-01",
  };

  if (useHelicone) {
    headers["Helicone-Auth"] = `Bearer ${process.env.HELICONE_API_KEY}`;
    headers["Helicone-Property-Feature"] = tag;  // ← Feature tagging for observability
  }

  const res = await fetch(`${baseURL}/v1/messages`, {
    method: "POST",
    headers,
    body: JSON.stringify({ model, max_tokens: maxTokens, system, messages }),
  });

  if (!res.ok) throw new Error(`Claude ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return json.content[0].text as string;
}
```

This function handles:
- **Model routing** (which endpoint to hit)
- **Observability routing** (through Helicone or direct)
- **Header assembly** (auth, API version, feature tags)
- **Error propagation** (throws on non-OK, caller handles)
- **Response extraction** (returns just the text content)

Every concern except "what to say to the AI" is handled here.

---

## Model Selection Strategy

The system currently defaults to `claude-haiku-4-5-20251001` for all calls. This is a deliberate cost decision.

**Model selection framework:**

| Use Case | Model | Reasoning |
|---|---|---|
| Lead scoring (simple JSON) | Haiku | Fast, cheap, JSON output is reliable |
| Outreach generation (nuanced copy) | Haiku (or Sonnet for quality) | Copy quality is important — consider Sonnet |
| Content analysis (4096 tokens) | Haiku | Large output but pattern-based |
| Complex reasoning | Sonnet | Better at multi-step reasoning |
| Long document analysis | Sonnet/Opus | Better at maintaining context over long inputs |
| Cheap iteration / prototyping | Haiku | Always |

**The cost difference (approximate):**
- Haiku: $0.00025/1K input tokens, $0.00125/1K output tokens
- Sonnet: $0.003/1K input, $0.015/1K output
- Opus: $0.015/1K input, $0.075/1K output

Sonnet is ~12x more expensive than Haiku. Use it where quality matters and test whether the quality improvement is worth the cost.

---

## Prompt Templates: The Orchestration Artifact

A prompt template is a function that takes structured data and returns a well-formatted string ready for the model.

```typescript
// Good prompt template — captures all context, clear structure
function buildScoringPrompt(prospect: Prospect, similarProspects?: string): string {
  return `You are a sales analyst for Digital Wealth Transfer, a Las Vegas AI systems company.
We build:
- AI Lead Capture Systems ($500–1k)
- AI Appointment Setters ($750–1k)
- AI Websites + Funnels ($1k+)
- AI Content + Growth System ($500/mo)

${similarProspects ? `Similar prospects we've evaluated:\n${similarProspects}\n\n` : ""}

Score this prospect:
Business: ${prospect.business_name}
Industry: ${prospect.industry ?? "Unknown"}
Website: ${prospect.website ?? "None"}
Problem Signal: ${prospect.problem_signal ?? "None"}
Notes: ${prospect.notes ?? "None"}
Location: ${prospect.location ?? "Unknown"}

Return ONLY valid JSON, no markdown:
{
  "score": <1-10 integer>,
  "reason": "<2-3 sentences>",
  "recommended_offer": "<AI Lead System | AI Content Engine | AI Growth System | Partner Referral | Not a fit>"
}`;
}
```

This template:
- Sets the agent's role and context
- Optionally injects retrieved similar prospects (RAG)
- Injects the specific prospect's data
- Specifies exact output format
- Specifies valid enum values for `recommended_offer`

---

## Output Processing Patterns

After the model responds, the orchestration layer processes the output.

**Pattern 1: Plain text (no processing needed)**
```typescript
const reply = await callClaude({ messages, maxTokens: 300 });
return NextResponse.json({ reply });  // Use as-is
```

**Pattern 2: JSON extraction**
```typescript
const raw = await callClaude({ messages, maxTokens: 512 });
const cleaned = raw.replace(/```json\n?|\n?```/g, "").trim();
const parsed = JSON.parse(cleaned);  // May throw — wrap in try/catch
```

**Pattern 3: Section parsing (content analysis)**
```typescript
const analysis = await callClaude({ messages, maxTokens: 4096 });
const sections = parseAnalysis(analysis);  // Extract named sections

function parseAnalysis(text: string): Record<string, string> {
  const parts = text.split(/##\s+\d+\.\s+/);
  return parts.slice(1).reduce((acc, part, i) => {
    acc[LABELS[i]] = part.trim();
    return acc;
  }, {} as Record<string, string>);
}
```

**Pattern 4: JSON from unstructured response**
```typescript
const text = await callClaude({ messages, maxTokens: 2048 });
const jsonMatch = text.match(/\[[\s\S]*\]/);  // Extract JSON array
if (!jsonMatch) throw new Error("Could not parse response");
const moments = JSON.parse(jsonMatch[0]);
```

All four patterns are in this codebase. Learn to recognize when each is appropriate.

---

## GH-600 Orchestration Exam Topics

**Topic: Model routing**
Know when to use which model. Haiku for speed/cost, Sonnet for quality, Opus for complex reasoning. The exam will give you a use case and ask which model is appropriate.

**Topic: Context window budgeting**
Given a system prompt (500 tokens), conversation history (2,000 tokens), retrieved context (1,000 tokens), and user message (200 tokens): total = 3,700 input tokens. If maxTokens is 1,024, total call = ~4,724 tokens. Does this fit? Always calculate.

**Topic: Prompt injection in templates**
If user input is directly interpolated into prompts, it can contain instructions that hijack the model. Always sanitize and constrain user input before prompt injection.

**Topic: Output validation**
The exam will ask about handling malformed AI output. Know: try/catch around JSON.parse, fallback values, retry strategies, and Zod validation.
