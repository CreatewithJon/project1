# Tool Calling & Function Calling

> **The one-sentence version:** Tool calling is how an AI agent reaches out into the real world — reading databases, calling APIs, running searches, and triggering actions — instead of just generating text.

---

## What Is a Tool?

A tool is any function that an AI agent can invoke. From the model's perspective, a tool has:
- A **name** (what to call it)
- A **description** (what it does, in plain English — this is what the model reads to decide whether to use it)
- An **input schema** (what parameters it accepts)
- A **return value** (what it gives back)

From the developer's perspective, a tool is just a TypeScript function.

```typescript
// This IS a tool — the website crawler
async function crawlUrl(url: string): Promise<CrawlResult> {
  const response = await fetch("https://api.firecrawl.dev/v1/scrape", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.FIRECRAWL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, formats: ["markdown"] }),
  });
  const data = await response.json();
  return { markdown: data.data?.markdown, title: data.data?.metadata?.title };
}
```

The function `crawlUrl` is a tool. It takes a URL, hits an external API, and returns content. When an agent calls this tool, it gets real website content to reason about.

---

## Two Approaches to Tool Calling

### Approach 1: Explicit Orchestration (Current System)

The developer decides when to call which tool. The AI is used only for reasoning steps, not for deciding the flow.

```typescript
// DEVELOPER controls the sequence
// Step 1: crawl (explicit tool call by developer)
const crawlResult = await crawlUrl(url);

// Step 2: analyze (AI reasoning step)
const analysis = await callClaude({
  messages: [{ role: "user", content: buildPrompt(crawlResult) }],
  tag: "analyze",
});

// Step 3: store (explicit tool call by developer)
await supabase.from("real_estate_leads").update({ ... }).eq("id", leadId);
```

The AI never decides to call Firecrawl. The AI never decides to update Supabase. The developer hardcodes these steps. This is explicit orchestration.

**When to use:** When the flow is deterministic, when the steps are always the same, when you need predictability and debuggability.

### Approach 2: Autonomous Tool Selection (Agentic)

The model receives a task and a list of available tools. It decides which tools to call, in what order, based on its reasoning.

```typescript
// MODEL controls the sequence — future implementation
const tools = [
  {
    name: "crawl_website",
    description: "Crawl a website and return its full text content",
    input_schema: {
      type: "object",
      properties: { url: { type: "string", description: "Website URL to crawl" } },
      required: ["url"],
    },
  },
  {
    name: "search_prospect_database",
    description: "Search existing prospects by industry or location",
    input_schema: { ... },
  },
  {
    name: "update_prospect_score",
    description: "Update a prospect's AI score in the database",
    input_schema: { ... },
  },
];

const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  body: JSON.stringify({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    tools,   // ← Model can now choose to call these
    messages: [{
      role: "user",
      content: "Research Acme Plumbing at acmeplumbing.com and score them for our AI services."
    }],
  }),
});

// Model might respond with:
// { type: "tool_use", name: "crawl_website", input: { url: "acmeplumbing.com" } }
// Developer executes the tool, returns result to model
// Model then decides: score_prospect, update_database, done
```

**When to use:** When tasks are open-ended, when the steps vary based on what's found, when you want the AI to handle edge cases intelligently.

---

## The Tool Call Cycle

In autonomous tool use, the conversation follows this pattern:

```
1. USER: "Research and score Acme Plumbing"

2. ASSISTANT: [Decides to use crawl_website tool]
   { type: "tool_use", name: "crawl_website", input: { url: "..." } }

3. DEVELOPER: Execute crawl_website → return result to model

4. ASSISTANT: [Receives crawl result, decides to score]
   { type: "tool_use", name: "update_prospect_score", input: { score: 7, reason: "..." } }

5. DEVELOPER: Execute update_prospect_score → return success

6. ASSISTANT: "I've researched Acme Plumbing and scored them 7/10.
   They're missing a lead form and live chat. Recommended offer: AI Lead System."

7. DONE
```

The conversation continues until the model returns a `end_turn` stop reason instead of a tool call. This is the agentic loop.

---

## Tools in This System

| Tool | Function | Explicit or Autonomous |
|---|---|---|
| `crawlUrl()` | Firecrawl website scraper | Explicit |
| `supabase.from().select()` | Database read | Explicit |
| `supabase.from().update()` | Database write | Explicit |
| `callClaude()` | AI reasoning | Explicit |
| Higgsfield API | Video generation | Explicit |
| Runway ML API | Video generation fallback | Explicit |
| YouTube Data API | Video search + metadata | Explicit |
| CoinGecko API | BTC price data | Explicit |

All current tools are explicitly orchestrated. Phase 3 will move select pipelines to autonomous tool selection using the Anthropic tools API.

---

## MCP — Model Context Protocol

**GH-600 exam topic:** MCP is Anthropic's standardized protocol for connecting AI models to external tools and data sources.

Think of MCP as a universal adapter. Instead of building a custom integration for every tool (Firecrawl, Supabase, GitHub, Slack), you build one MCP server per tool. Any MCP-compatible AI client can then use that tool.

```
WITHOUT MCP:
  Claude ──→ Custom Firecrawl integration (you built this)
  Claude ──→ Custom Supabase integration (you built this)
  Claude ──→ Custom GitHub integration (you built this)

WITH MCP:
  Claude ──→ MCP Protocol ──→ Firecrawl MCP Server
                           ──→ Supabase MCP Server
                           ──→ GitHub MCP Server
```

The benefit: you write the integration once as an MCP server. Any AI that speaks MCP can use it. It's the USB standard for AI tools.

**In this system:** Claude Code (which is used to build this system) uses MCP servers internally. As the platform matures, wrapping internal tools as MCP servers will allow future agents to use them autonomously.

---

## Tool Design Principles (GH-600 Exam Ready)

**Principle 1: Tool descriptions must be unambiguous.**
The model reads the description to decide whether to use a tool. "Search the database" is ambiguous — which database? For what? "Search existing prospects by industry and location to find similar companies we've already evaluated" is precise.

**Principle 2: Tools should do one thing.**
A tool called `research_and_score_and_email` is three tools poorly combined. Split it. The model can call all three in sequence; you benefit from modularity and debuggability.

**Principle 3: Tool inputs should be validated.**
Before executing a tool, validate its inputs. If the model calls `crawl_website` with an input that isn't a valid URL, catch it before making an external HTTP call.

**Principle 4: Tool failures should surface clearly.**
If a tool fails (Firecrawl is down, Runway returns 429), the agent needs to know so it can decide: retry, use a fallback, or report failure. Never silently swallow tool errors.

**Principle 5: Destructive tools need HITL gates.**
A tool that sends an email, posts to social media, or charges a credit card should require human confirmation before execution. Add an approval step in the agent loop before any irreversible action.
