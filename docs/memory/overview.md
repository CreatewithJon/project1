# Memory & Retrieval Guide

> See `architecture/layer-4-memory.md` for the deep architectural breakdown. This guide focuses on practical implementation and the retrieval pipeline.

---

## Quick Reference: Memory Types

| Type | Stored Where | Retrieved How | This System |
|---|---|---|---|
| Working | LLM context window | Always present (it's in the call) | Conversation history in chat routes |
| Episodic | Supabase, localStorage | Queried by session/date/user | Planner data in localStorage; prospect records in Supabase |
| Semantic | pgvector | Similarity search | Roadmap Phase 2 |
| Procedural | Code (system prompts) | Always injected into every call | `SYSTEM_PROMPT` constants in all AI routes |

---

## The Retrieval Pipeline (RAG in Detail)

See `education/rag-retrieval.md` for the full conceptual breakdown. Below is the implementation path for this system.

### Step 1: Enabling pgvector in Supabase

```sql
-- Run in Supabase SQL editor
CREATE EXTENSION IF NOT EXISTS vector;
```

### Step 2: Add embedding column to target table

```sql
-- Add to prospects table (Phase 2)
ALTER TABLE prospects ADD COLUMN notes_embedding vector(1536);
ALTER TABLE prospects ADD COLUMN description_embedding vector(1536);

-- Or create a dedicated notes table
CREATE TABLE prospect_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id uuid REFERENCES prospects(id) ON DELETE CASCADE,
  content text NOT NULL,
  embedding vector(1536),
  created_at timestamptz DEFAULT now()
);

-- Performance index
CREATE INDEX ON prospect_notes
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

### Step 3: Embedding function

```typescript
// lib/embeddings.ts (Phase 2)
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function embedText(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text.slice(0, 8191), // Model max input
  });
  return response.data[0].embedding;
}
```

### Step 4: Ingest pipeline

```typescript
// When a prospect note is saved, also embed it
async function saveProspectNote(prospectId: string, content: string) {
  const embedding = await embedText(content);

  await supabase.from("prospect_notes").insert({
    prospect_id: prospectId,
    content,
    embedding,
  });
}
```

### Step 5: Retrieval function

```typescript
// lib/retrieval.ts (Phase 2)
export async function getSimilarProspects(
  query: string,
  limit = 5
): Promise<Array<{ content: string; similarity: number }>> {
  const queryEmbedding = await embedText(query);

  const { data } = await supabase.rpc("match_prospect_notes", {
    query_embedding: queryEmbedding,
    match_threshold: 0.7,
    match_count: limit,
  });

  return data ?? [];
}
```

### Step 6: Inject into prompt

```typescript
// In the scoring route
const industry = prospect.industry ?? "local service business";
const similar = await getSimilarProspects(`${industry} in ${prospect.location}`);

const contextBlock = similar.length > 0
  ? `Similar prospects we've evaluated:\n${similar.map(s => s.content).join("\n\n")}`
  : "";

const prompt = `${SCORING_PROMPT}

${contextBlock}

Now score this prospect:
${buildProspectDescription(prospect)}`;
```

---

## Conversation Memory Management

### The Current Pattern

```typescript
// Client sends conversation history with each request
const messages = [
  ...body.history.slice(-10),  // Last 10 turns (working memory management)
  { role: "user", content: message },
];
```

### Calculating When to Truncate

Rough token estimation:
- Average turn: ~200 tokens (question + answer)
- 10 turns × 200 = 2,000 tokens for history
- System prompt: ~500 tokens
- Current message: ~100 tokens
- Buffer for response: ~500 tokens
- **Total:** ~3,100 tokens — well within 200K context window

The `.slice(-10)` is conservative. For a chat with a simple system prompt, you could safely keep 50-100 turns.

Increase the limit when:
- The conversation context benefits from more history
- The user explicitly refers to earlier parts of the conversation

Decrease the limit when:
- The system prompt is very long (>2,000 tokens)
- You're injecting large amounts of retrieved context
- You need to minimize cost per call

### Summarization Strategy (Phase 2)

When history grows large:

```typescript
async function manageHistory(
  messages: Message[],
  maxTurns = 20
): Promise<Message[]> {
  if (messages.length <= maxTurns) return messages;

  // Summarize the oldest half
  const toSummarize = messages.slice(0, Math.floor(messages.length / 2));
  const recent = messages.slice(Math.floor(messages.length / 2));

  const summary = await callClaude({
    messages: [{
      role: "user",
      content: `Summarize this conversation in 3-5 sentences: ${JSON.stringify(toSummarize)}`,
    }],
    maxTokens: 300,
    tag: "history-summary",
  });

  return [
    { role: "assistant", content: `[Earlier conversation summary: ${summary}]` },
    ...recent,
  ];
}
```

---

## pgvector Distance Operators (GH-600 Exam)

```sql
-- Cosine distance (default for text — use this)
ORDER BY embedding <=> query_vector

-- L2 (Euclidean) distance
ORDER BY embedding <-> query_vector

-- Inner product (negative, for normalized vectors)
ORDER BY embedding <#> query_vector
```

**When to use which:**
- Text similarity: cosine distance (`<=>`)
- Image similarity: cosine or L2 depending on the embedding model
- For most text RAG applications: always `<=>`

**Similarity threshold guide:**
- > 0.9: Near-duplicate content
- 0.7–0.9: Highly related content
- 0.5–0.7: Related but distinct
- < 0.5: Likely unrelated

Use 0.7 as a starting threshold. Adjust based on your data.
