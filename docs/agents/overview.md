# Agent System Documentation

---

## Agent Inventory

This system has 10 AI-powered routes, each functioning as a discrete agent with a specific purpose, persona, and toolset.

---

### Agent 1: Lead Scorer

**Route:** `POST /api/lead-engine/prospects/[id]/score`
**Purpose:** Analyze a prospect's profile and score their fit for DWT's AI services
**Type:** Single-pass, explicit orchestration

**Tools used:**
- Supabase SELECT (read prospect data)
- Claude Haiku (reasoning + scoring)
- Supabase UPDATE (write score back)

**System persona:** Sales analyst for Digital Wealth Transfer

**Input:** Prospect ID (UUID)

**Output stored:**
```typescript
{
  ai_score: number,           // 1-10
  ai_score_reason: string,    // 2-3 sentence explanation
  recommended_offer: string,  // One of 5 offer types
  status: "Researched"
}
```

**HITL:** Not required (internal DB update, no external action)

**Helicone tag:** `"lead-score"`

---

### Agent 2: Outreach Generator

**Route:** `POST /api/lead-engine/prospects/[id]/outreach`
**Purpose:** Generate 6 personalized outreach message variants for a prospect
**Type:** Single-pass, explicit orchestration

**Tools used:**
- Supabase SELECT (read scored prospect)
- Claude Haiku (creative copywriting)
- Supabase UPDATE (store drafts)

**System persona:** None (persona embedded in prompt, not system field)

**Output stored:**
```typescript
{
  instagram_dm: string,
  linkedin_dm: string,
  email: string,          // "subject: ...\n\n[body]"
  followup_1: string,
  followup_2: string,
  breakup: string,
  status: "Message Drafted"
}
```

**HITL:** Required — human selects and sends manually. Drafts never auto-sent.

**Helicone tag:** `"lead-outreach"`

---

### Agent 3: Website Analyzer

**Route:** `POST /api/analyze`
**Purpose:** Crawl a business website and generate an AI-powered lead score + outreach angle
**Type:** Multi-tool, explicit orchestration

**Tools used:**
1. Firecrawl (`crawlUrl()`) — website content extraction
2. `quickAnalysis()` — heuristic feature detection
3. Claude Haiku — deep analysis + scoring
4. Supabase UPDATE (optional, if leadId provided)

**The pipeline:**
```
URL input → Firecrawl crawl → Quick heuristics → Claude analysis → Supabase store
```

**Output:**
```typescript
{
  websiteQuality: number,      // 1-10
  leadScore: number,           // 0-100
  aiSummary: string,           // What the business does, problems, prospects
  outreachAngle: string,       // Specific hook for first message
  recommendedOffer: string,
  missingFeatures: string[],
  hasBookingSystem: boolean,
  hasLiveChat: boolean,
  hasLeadCapture: boolean,
  hasSocial: boolean,
  hasSEO: boolean
}
```

**Helicone tag:** `"analyze"`

---

### Agent 4: Dealership Chat Assistant

**Route:** `POST /api/dealership-chat`
**Purpose:** AI sales assistant for Shafik N Sons dealership with full inventory knowledge
**Type:** Conversational, with working memory (history injection)

**Tools used:**
- Claude Haiku with INVENTORY_CONTEXT system prompt
- Conversation history (working memory — last 10 turns)

**System persona:** "AI sales assistant for Shafik N Sons"
- Knowledge: full inventory of 6 vehicles with specs, pricing, financing
- Behavior: match customers to vehicles, direct to inquiry form
- Constraints: never make up inventory information

**Working memory pattern:**
```typescript
const messages = [...history.slice(-10), { role: "user", content: message }];
```

**Helicone tag:** `"dealership-chat"`

---

### Agent 5: B-Roll Planner

**Route:** `POST /api/broll/plan`
**Purpose:** Analyze a video transcript and identify optimal moments for B-roll footage
**Type:** Single-pass, returns structured JSON array

**Output format:**
```typescript
Array<{
  id: string,          // "moment_1", "moment_2"...
  timestamp: number,   // When B-roll should start (seconds)
  duration: number,    // 3-6 seconds
  description: string, // What visual would enhance this moment
  prompt: string,      // AI video generation prompt (for Higgsfield/Runway)
  quote: string        // Exact transcript quote this covers
}>
```

**Helicone tag:** `"broll-plan"`

---

### Agent 6: B-Roll Generator

**Route:** `POST /api/broll/generate`
**Purpose:** Generate AI video from a text prompt using Higgsfield (primary) or Runway ML (fallback)
**Type:** Multi-tool with fallback chain

**Tool chain:**
```
tryHiggsfield(prompt, duration)
  ├── SUCCESS: return { jobId: "higgsfield:xxx", provider: "higgsfield" }
  └── FAIL (timeout/error): tryRunway(prompt, duration)
      ├── SUCCESS: return { jobId: "runway:xxx", provider: "runway" }
      └── FAIL: throw Error("All video generation services failed")
```

**Provider abstraction:**
The `"higgsfield:"` or `"runway:"` prefix on jobId lets the status endpoint know which API to poll — without the client needing to track provider state.

**No Claude call in this agent** — it's pure tool orchestration.

---

### Agent 7: Signal Chat Assistant

**Route:** `POST /api/chat` (signal-dashboard)
**Purpose:** Personal AI assistant focused on Bitcoin, productivity, and wealth strategy
**Type:** Single-pass conversational

**System persona:** "Well-read, experienced operator who has done the work"
**Topics:** Bitcoin/digital wealth, focus/productivity, wealth mindset
**Off-topic behavior:** Brief redirect back to core themes

**Helicone tag:** `"chat"`

---

### Agent 8: Planner Assistant

**Route:** `POST /api/planner-chat` (signal-dashboard)
**Purpose:** Life planning and goal-setting assistant connecting long-term vision to daily action
**Type:** Single-pass conversational

**System persona:** "Seasoned operator and coach"
**Behavior:** Structures goals across daily/weekly/monthly/yearly horizons, gives concrete plans

**Helicone tag:** `"planner-chat"`

---

### Agent 9: Content Drafter

**Route:** `POST /api/content/draft` (signal-dashboard)
**Purpose:** Generate platform-specific content in Jonathan's exact voice
**Type:** Format-aware content generation

**Supported formats:**
- LinkedIn post, LinkedIn about section
- X/Twitter thread, X/Twitter post, X/Twitter bio
- YouTube script, YouTube titles, YouTube description

**System persona:** "Jonathan Cardona" — full backstory, voice, content pillars, anti-patterns

**Helicone tag:** `"content-draft"`

---

### Agent 10: YouTube Content Analyzer

**Route:** `POST /api/content/analyze` (signal-dashboard)
**Purpose:** Analyze outlier YouTube videos and generate rewritten scripts in Jonathan's voice
**Type:** Long-form analysis (4096 max tokens)

**Output sections:**
1. Hook Analysis
2. Content Framework
3. Keywords & Topics
4. Why It's an Outlier
5. Rewritten Script (in Jonathan's voice)

**Helicone tag:** `"content-analyze"`

---

## Agent Design Principles Applied

| Principle | How It's Applied |
|---|---|
| Single objective | Each agent has one clearly defined job |
| Bounded output | All agents have explicit `maxTokens` |
| Structured output | 5 agents return JSON, validated after parse |
| Observable | All agents tagged in Helicone |
| HITL enforced | Outreach drafts require human send |
| Graceful degradation | Helicone optional, B-roll has fallback provider |
| No module-level state | Supabase initialized inside handlers |

---

## Phase 3 Agent Additions (Roadmap)

| Agent | Purpose | New Capability Required |
|---|---|---|
| Research Agent | Full autonomous company research | Function calling + web search tool |
| Content Scheduler | Plan and queue a month of content | Database + calendar integration |
| Competitor Monitor | Track competitor moves weekly | Scheduled trigger + Firecrawl |
| Lead Nurture Agent | Follow-up sequence management | Email API + scheduling |
| Founder OS Agent | Answer questions about business metrics | pgvector + all data sources |
