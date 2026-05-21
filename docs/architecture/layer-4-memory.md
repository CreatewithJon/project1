# Layer 4 — Memory Layer

> **The one-sentence version:** Memory is how AI systems know what happened before — and the four types of memory determine how far back they can remember, how precisely, and at what cost.

---

## Why Memory Is the Hardest Layer

A language model has no memory. Every call to the Claude API starts completely fresh. It doesn't know who you are, what you asked yesterday, or what it said five seconds ago in the same conversation. This is a fundamental property of LLMs — they are stateless functions.

The memory layer exists to solve this. It's the infrastructure that **pretends the AI has memory** by injecting the right context at the right time.

Get memory wrong and your agents are dumb, repetitive, and context-blind. Get it right and they feel like a colleague who has been paying attention for months.

---

## The Four Types of AI Memory

GH-600 tests all four. This system implements all four — some in production, some on the roadmap.

---

### Type 1: Working Memory (In-Context)

**What it is:** Everything currently inside the LLM's context window. The system prompt, the conversation history, the injected data, the current query — all of it.

**How it works:** You literally include it in the API call. The model "remembers" it because it's reading it right now.

**The limit:** Context windows are finite. Claude Haiku has a 200K token window. That sounds large, but a full conversation with document context fills up fast. When you hit the limit, you must **truncate** (remove old messages) or **summarize** (compress history into a shorter form).

**In this system:**

```typescript
// From /api/dealership-chat/route.ts
// The last 10 messages are sent as context on every call

const history: HistoryMessage[] = Array.isArray(body.history)
  ? body.history.slice(-10)  // ← Working memory: last 10 turns
  : [];

const messages = [...history, { role: "user", content: message }];

await callClaude({
  messages,               // ← This IS the working memory
  system: INVENTORY_CONTEXT,  // ← Procedural memory (see Type 4)
  maxTokens: 300,
});
```

The `.slice(-10)` is **memory management** — deliberately limiting how much working memory is loaded to control cost and latency.

**GH-600 relevance:** Working memory management is a core exam topic. Questions about context window limits, truncation strategies, and summarization are common.

---

### Type 2: Episodic Memory (Session History)

**What it is:** Records of past events, stored externally and retrieved when relevant. Unlike working memory (which is just "what's in this call"), episodic memory lets the system access events from previous sessions.

**Analogy:** Working memory is what you're currently reading. Episodic memory is your diary — you have to actively open it and read an entry to remember it.

**In this system:**

```typescript
// Signal Planner — app/planner/page.tsx
// Plans are stored in localStorage, loaded on each session

const saved = localStorage.getItem("planner-data");
const plannerData = saved ? JSON.parse(saved) : defaultPlannerData;

// When the user asks a planning question:
const context = `
  Current daily plan: ${plannerData.daily}
  Current weekly goals: ${plannerData.weekly}
  Current monthly targets: ${plannerData.monthly}
`;
// This context is injected into the Claude call
```

The planner "remembers" your goals across sessions because they're stored in localStorage and injected at call time. The AI isn't actually remembering — the system is feeding it the history.

**Production-grade episodic memory** would use a database instead of localStorage:
- Every planning session stored in Supabase
- Relevant past sessions retrieved by date or topic
- Injected as compressed context into new calls

**GH-600 relevance:** The distinction between episodic and working memory is tested. Episodic = stored externally, retrieved when needed. Working = currently in the context window.

---

### Type 3: Semantic Memory (Vector Search)

**What it is:** Knowledge stored as embeddings (mathematical representations of meaning) in a vector database. Allows the AI to find **relevant** information based on meaning, not exact keywords.

**Analogy:** Instead of searching for the exact word "revenue," semantic search finds "income," "sales," "money coming in" — because they mean similar things.

**How it works:**

```
1. Text → Embedding Model → Vector (array of 1536 numbers)
2. Vector stored in pgvector (Supabase extension)
3. Query text → Embedding → Search for nearest vectors
4. Return top-K most semantically similar records
5. Inject those records into Claude's context
```

This pattern is called **RAG — Retrieval-Augmented Generation**. The AI generates responses augmented with retrieved relevant knowledge.

**In this system (roadmap — Phase 2):**

```sql
-- Supabase pgvector table (planned)
CREATE TABLE prospect_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id uuid REFERENCES prospects(id),
  content text NOT NULL,
  embedding vector(1536),  -- pgvector column
  created_at timestamptz DEFAULT now()
);

-- Similarity search
SELECT content
FROM prospect_notes
ORDER BY embedding <=> query_embedding  -- cosine distance
LIMIT 5;
```

When scoring a new prospect in the plumbing industry, the system would:
1. Embed the query "plumbing company in Las Vegas"
2. Find the 5 most similar past prospect notes
3. Inject those notes into the scoring prompt
4. Claude scores with the benefit of past experience

**GH-600 relevance:** Vector databases and RAG are ~15% of the exam. pgvector, embedding models, similarity search operators (`<=>`, `<->`, `<#>`) are all tested.

---

### Type 4: Procedural Memory (System Prompts)

**What it is:** The AI's "how to behave" knowledge — encoded as system prompts, fine-tuned weights, or function signatures. This is the most stable type of memory: it rarely changes and shapes everything else.

**Analogy:** Procedural memory is like riding a bike. You don't consciously recall "step 1: pedal." It's just baked in. System prompts are baked-in behavior.

**In this system:**

```typescript
// From /api/content/draft/route.ts
// This system prompt IS the procedural memory

const SYSTEM_PROMPT = `You are a personal brand strategist and copywriter for Jonathan Cardona.

Jonathan's positioning: "Helping everyday people and businesses leverage AI, automation, Bitcoin..."

Brand voice:
- Approachable and intelligent — never condescending
- Practical and grounded — not theoretical or abstract
...`;
```

Every time the content drafting agent runs, it "knows" Jonathan's voice, backstory, content pillars, and communication style — because it's encoded in the system prompt. This is procedural memory.

**Why this matters architecturally:** Procedural memory should be:
- Version controlled (in `lib/prompts/` — roadmap item)
- Tested (does changing this prompt improve output quality?)
- Separated from business logic (prompts should not be buried in route files)

**GH-600 relevance:** The exam distinguishes procedural memory (stable, behavioral) from the other types. System prompt engineering IS procedural memory engineering.

---

## Memory Architecture Diagram

```
QUERY
  │
  ▼
┌─────────────────────────────────────────┐
│           CONTEXT ASSEMBLY              │
│                                         │
│  PROCEDURAL ──→ System Prompt           │
│  WORKING    ──→ Last N messages         │
│  EPISODIC   ──→ Retrieved session data  │
│  SEMANTIC   ──→ Top-K similar chunks    │
│                                         │
│  ASSEMBLED CONTEXT → [Claude API Call]  │
└─────────────────────────────────────────┘
  │
  ▼
RESPONSE
  │
  ▼
┌─────────────────────────────────────────┐
│             MEMORY UPDATE               │
│                                         │
│  Append to conversation history         │
│  Write scores/results to Supabase       │
│  [Future] Embed and store in pgvector   │
└─────────────────────────────────────────┘
```

---

## Memory Costs and Tradeoffs

| Memory Type | Speed | Cost | Accuracy | Staleness Risk |
|---|---|---|---|---|
| Working | Instant | High (tokens) | Perfect | None (real-time) |
| Episodic | Fast (DB query) | Low | Good | Low |
| Semantic | Moderate (embedding) | Moderate | Approximate | Moderate |
| Procedural | Instant | High (tokens) | Perfect | Low (version controlled) |

**Key insight for GH-600:** There is no single best memory type. Good systems combine them. Retrieve semantically, expand episodically, reason within working memory, behave via procedural.

---

## Common Memory Anti-Patterns

**Anti-pattern 1: Sending the entire database as context.**
If you inject 50,000 words of prospect history into every call, you'll burn through tokens, hit latency issues, and confuse the model with irrelevant information. Use RAG to retrieve only what's relevant.

**Anti-pattern 2: Never clearing working memory.**
Conversation history that grows unbounded will eventually exceed the context window and cause errors. Always truncate or summarize.

**Anti-pattern 3: Storing prompts in the database.**
System prompts that live in a database feel flexible but become a version control nightmare. Keep prompts in code. Database prompts make debugging and rollbacks nearly impossible.

**Anti-pattern 4: Treating all memory the same.**
Some information should be semantic (find by meaning). Some should be episodic (find by time/session). Some should be procedural (always present). Using the wrong storage type for the use case leads to bloated prompts or poor retrieval.
