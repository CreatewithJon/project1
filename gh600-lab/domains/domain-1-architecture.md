# Domain 1 — Prepare Agent Architecture & SDLC (15–20%)

---

## What This Domain Tests

- Identifying tasks suitable (and unsuitable) for AI agents
- Understanding autonomy levels and when to use each
- Designing GitHub-native review workflows for agent output
- Integrating agents into the SDLC (not just coding — all phases)
- Reading and writing `.github/agents/*.agent.md` files

---

## Core Concept: The Agent Definition File

Every GitHub Copilot agent is defined in a Markdown file with YAML frontmatter:

```yaml
# .github/agents/lead-researcher.agent.md
---
name: Lead Researcher
description: Researches prospect companies and scores fit for outreach
tools:
  - read
  - search
  - execute
mcp-servers:
  - name: firecrawl
    transport: http
    url: https://api.firecrawl.dev/mcp
---

You are a lead research specialist for Digital Wealth Transfer.
Given a company name and URL, you will:
1. Research the company's current tech stack
2. Identify pain points relevant to AI automation
3. Score lead fit on a 1-10 scale
4. Return structured JSON with your findings

Always cite your sources. Never fabricate data.
```

**What the exam tests here:**
- Can you identify which `tools` are needed (and which are excessive)?
- Does the agent need `execute` or would `read + search` suffice?
- Is the system prompt clear, constrained, and well-scoped?

---

## Core Concept: Autonomy Levels

| Level | Description | When to Use | Example |
|---|---|---|---|
| Supervised | Every action requires human approval | High-stakes, irreversible | Deploying to production |
| Semi-autonomous | Acts autonomously, human reviews final output | Most business workflows | Lead scoring, content drafts |
| Fully autonomous | Acts without any human confirmation | Low-risk, reversible, high volume | Formatting, tagging, classification |

**In your projects:**
- Dealership chat widget → **fully autonomous** (responds in real-time, no review)
- Lead engine outreach drafts → **semi-autonomous** (AI drafts, human selects)
- B-roll generation → **semi-autonomous** (AI generates, human approves)
- Production deployments → **supervised** (should require human gate)

**Exam trap:** The exam will show you an agent doing irreversible actions (sending emails, deleting data, merging to main) and ask what's wrong. Answer: it needs a human review gate (HITL) before irreversible steps.

---

## Core Concept: PR-Based Workflows

The safest pattern for agent-generated changes:

```
Agent proposes change → opens PR → human reviews → merge gate → production
```

Why this matters on the exam:
- Direct commits to `main` by an agent = red flag
- PR workflow = auditability (who approved? when? what changed?)
- Branch protection rules enforce this pattern

```yaml
# .github/branch-protection.yml pattern
# Require PR reviews before merging
# No direct pushes to main — ever, not even for agents
```

---

## Core Concept: Agent Tasks — Suitable vs. Unsuitable

**Suitable agent tasks:**
- Repetitive, well-defined, large volume
- Research and information synthesis
- Code review with clear rubrics
- Data transformation and formatting
- Draft generation (with human review)

**Unsuitable agent tasks:**
- Tasks requiring real-world judgment (legal, medical, financial advice)
- Tasks with no clear success criteria
- Tasks where errors can't be detected or reversed
- Tasks requiring trust, relationship, or context the agent can't have

---

## What This Looks Like in Your DWT Codebase

| Pattern | File | How It Applies |
|---|---|---|
| HITL gate | Lead engine dashboard | Human selects which outreach draft to send — agent never sends autonomously |
| Semi-autonomous | B-roll pipeline | AI identifies moments + generates video, human approves final cut |
| Fully autonomous | Dealership chat | AI responds in real-time, no human in the loop |
| System prompt scoping | Every `SYSTEM_PROMPT` constant | Each agent has bounded scope — planner knows about planning, not sales |

---

## Exam Practice Questions

**Q1:** An agent is configured with tools: `[read, search, edit, execute, agent]`. It's task is to generate weekly reports. What's wrong?

> **A:** Over-privileged. A report generation agent needs `read` and `search` only. `edit`, `execute`, and `agent` give it unnecessary power that could cause harm if the agent malfunctions or is hijacked.

**Q2:** Your team deploys an agent that automatically merges PRs when all status checks pass. What governance concern does this raise?

> **A:** No human review gate. Automated merges bypass code review, which is a key accountability and safety check. The agent should open PRs but require human approval before merge.

**Q3:** Where do GitHub Copilot agent definition files live?

> **A:** `.github/agents/*.agent.md`

**Q4:** What's the key difference between `mcp-servers` in an agent file and `mcpServers` in a global JSON config?

> **A:** `mcp-servers` in agent YAML = scoped to that specific agent. `mcpServers` in global config = available to all agents. Agent-level scope is safer (principle of least privilege).

---

## Your Build Task for Day 1

Create this file in your `my-sample-proj` repo:

```markdown
# .github/agents/lead-researcher.agent.md
---
name: Lead Researcher
description: Researches and scores prospects for the DWT lead engine
tools:
  - read
  - search
mcp-servers:
  - name: firecrawl
    transport: http
    url: https://api.firecrawl.dev/mcp
  - name: supabase
    transport: local
    command: ["npx", "@supabase/mcp-server", "--read-only"]
---

You are a lead research assistant for Digital Wealth Transfer...
```

Why `--read-only` on Supabase? Because this agent only needs to READ existing prospects, not write new ones. That write happens in a separate, more privileged step. Least privilege in action.
