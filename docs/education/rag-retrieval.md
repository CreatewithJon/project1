# Retrieval-Augmented Generation (RAG)

> **The one-sentence version:** RAG is the pattern of finding relevant information from an external knowledge base and injecting it into the AI's context before generating a response — so the AI answers based on your data, not just its training.

---

## The Problem RAG Solves

Language models are trained on data up to a cutoff date. They know a lot about the world in general, but they know nothing about:

- Your specific prospects and customers
- Your company's internal documents
- Information that changed after their training cutoff
- Proprietary data that was never in their training set

If you want Claude to answer a question about a specific business, a specific prospect, or a specific document — you have to give it that information. RAG is the systematic way to do that.

---

## The RAG Pipeline (Step by Step)

```
KNOWLEDGE BASE (documents, records, notes)
    │
    ▼
STEP 1: CHUNK
    Break documents into smaller pieces
    (Paragraphs, sections, sentences — depending on use case)
    │
    ▼
STEP 2: EMBED
    Run each chunk through an embedding model
    (OpenAI text-embedding-3-small, or Anthropic's embeddings)
    Each chunk becomes a vector: [0.023, -0.441, 0.887, ...]
    │
    ▼
STEP 3: STORE
    Save vector + original text in a vector database
    (pgvector in Supabase, Pinecone, Weaviate, Chroma)
    │
    ▼
─────────────────────────── (retrieval time) ────────────────────────────
    │
STEP 4: QUERY
    User asks a question
    Run the question through the SAME embedding model
    Produces a query vector
    │
    ▼
STEP 5: SEARCH
    Find vectors in the database closest to the query vector
    "Closest" = most semantically similar
    Return top-K results
    │
    ▼
STEP 6: AUGMENT
    Inject the retrieved text chunks into the prompt
    "Based on this context: [retrieved chunks]..."
    │
    ▼
STEP 7: GENERATE
    LLM generates a response based on the query + retrieved context
    The response is grounded in your actual data
```

---

## RAG vs. Fine-Tuning

This is a common GH-600 exam question.

| | RAG | Fine-Tuning |
|---|---|---|
| What it does | Retrieves relevant data at runtime | Bakes knowledge into model weights |
| When to use | Frequently changing data | Stable style/behavior changes |
| Cost | Moderate (embedding + retrieval) | High (GPU training time) |
| Updatable | Yes — update the database | No — requires retraining |
| Transparency | High (you can see what was retrieved) | Low (black box) |
| GH-600 answer | Default choice for enterprise | Use only for behavior, not knowledge |

**The rule:** Use RAG for knowledge (facts, documents, records). Use fine-tuning for style (tone, persona, output format). Almost always, RAG is the right answer.

---

## Embeddings Explained

An embedding is a mathematical representation of meaning.

The sentence "AI systems help businesses grow" and "machine learning tools help companies scale" are very different strings of characters. But their embeddings are close together in vector space, because they mean similar things.

This is the magic of semantic search: you don't need exact keyword matches. You find meaning.

```typescript
// Example: Creating an embedding with OpenAI
const response = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: "AI lead generation system for local businesses",
});

const vector = response.data[0].embedding;
// vector is an array of 1536 numbers
// e.g., [0.0234, -0.4412, 0.8873, ...]
```

The distance between two vectors tells you how semantically similar two pieces of text are. pgvector provides three distance operators:

```sql
-- Cosine distance (most common for text similarity)
SELECT * FROM prospect_notes
ORDER BY embedding <=> query_vector
LIMIT 5;

-- Euclidean distance
SELECT * FROM prospect_notes
ORDER BY embedding <-> query_vector
LIMIT 5;

-- Inner product (for normalized vectors)
SELECT * FROM prospect_notes
ORDER BY embedding <#> query_vector
LIMIT 5;
```

**GH-600 exam tip:** Know that `<=>` is cosine similarity in pgvector. It's the default choice for text embeddings.

---

## RAG in This System (Current + Roadmap)

### Current Implementation (Explicit Context Injection)

The simplest form of RAG — manually injecting known context:

```typescript
// /api/dealership-chat/route.ts
// The inventory is hardcoded in the system prompt
// This is "static RAG" — the knowledge base doesn't change

const INVENTORY_CONTEXT = `You are the AI sales assistant for Shafik N Sons...

CURRENT INVENTORY:
1. 1957 Chevrolet Bel Air — Custom Convertible Build | $75,000
   ...
6. 2023 Mercedes-Benz S580 Maybach 4MATIC | $215,000
`;
```

This works fine when the knowledge base is small and stable (6 cars). It breaks down when the knowledge base is large (1,000 prospects) or dynamic (prices change daily).

### Phase 2: Prospect RAG Pipeline

```typescript
// Planned implementation
async function getRelevantProspectContext(query: string): Promise<string> {
  // 1. Embed the query
  const queryEmbedding = await embedText(query);

  // 2. Retrieve similar prospect notes from pgvector
  const { data: relevantNotes } = await supabase.rpc("match_prospect_notes", {
    query_embedding: queryEmbedding,
    match_threshold: 0.7,
    match_count: 5,
  });

  // 3. Format as context
  return relevantNotes
    .map((n) => `[${n.business_name}]: ${n.content}`)
    .join("\n\n");
}

// In the scoring route:
const context = await getRelevantProspectContext(
  `${prospect.industry} business in ${prospect.location}`
);

const prompt = `
Score this prospect. For reference, here are similar prospects we've worked with:

${context}

Now score:
${buildProspectDescription(prospect)}
`;
```

This is full RAG — the agent's responses improve over time as more prospect data accumulates in the database.

---

## The Supabase + pgvector Setup

```sql
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create embeddings table
CREATE TABLE prospect_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id uuid REFERENCES prospects(id),
  content text NOT NULL,
  embedding vector(1536),          -- OpenAI text-embedding-3-small dimensions
  metadata jsonb,                   -- Flexible metadata
  created_at timestamptz DEFAULT now()
);

-- Create index for fast similarity search
CREATE INDEX ON prospect_notes
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Retrieval function
CREATE OR REPLACE FUNCTION match_prospect_notes(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (id uuid, content text, similarity float)
LANGUAGE sql STABLE
AS $$
  SELECT id, content, 1 - (embedding <=> query_embedding) AS similarity
  FROM prospect_notes
  WHERE 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;
```

---

## Common RAG Failure Modes (GH-600 Exam Ready)

**Failure 1: Chunking too large.**
If chunks are 5,000 tokens each, you can only retrieve a few before hitting the context limit. The retrieved context is full of irrelevant sentences diluting the relevant ones. Fix: smaller, more focused chunks.

**Failure 2: Wrong embedding model for retrieval.**
You embed documents with model A, but retrieve with model B. The vector spaces are different — similarity scores are meaningless. Always use the same embedding model for ingestion and retrieval.

**Failure 3: No re-ranking.**
The top-K similarity results aren't always the most useful. A cross-encoder re-ranker re-scores the retrieved chunks for actual relevance to the query. For production systems, re-ranking significantly improves quality.

**Failure 4: Hallucination when retrieval fails.**
If the similarity search returns nothing above the threshold, the model has no grounding context. Without a guard, it will hallucinate an answer. Always check if retrieved context is empty before the generation step.

**Failure 5: Stale embeddings.**
If a document changes but its embedding isn't updated, the model retrieves the old version. Implement update triggers that re-embed documents when their content changes.
