# Domain 2 — Implement Tool Use & Environment (20–25%)

> Highest-weight domain. Master this one.

---

## What This Domain Tests

- Agent tool capabilities and when to use each level
- MCP configuration (both agent-scoped and global)
- MCP transport types and when to use each
- Copilot CLI usage and flags
- /delegate vs /fleet vs sequential execution

---

## Core Concept: Tool Capability Levels

Agents can be granted tools in increasing order of power:

| Tool | What It Can Do | Risk Level |
|---|---|---|
| `read` | Read files, browse URLs, query databases | Low |
| `search` | Search code, docs, web | Low |
| `edit` | Modify files, update records | Medium |
| `execute` | Run commands, scripts, code | High |
| `agent` | Spawn sub-agents, delegate tasks | Highest |

**The principle:** grant the minimum tools needed for the task. An agent that only needs to read logs should have `read` only — not `edit` or `execute`.

**Exam trap:** The exam will show you an over-privileged agent. Identify that it violates least privilege.

---

## Core Concept: MCP Configuration

MCP (Model Context Protocol) is the standard way to connect agents to external tools and data sources.

### Two Ways to Configure MCP

**1. In agent YAML (agent-scoped):**
```yaml
# .github/agents/researcher.agent.md
---
name: Researcher
tools:
  - read
  - search
mcp-servers:
  - name: firecrawl
    transport: http
    url: https://api.firecrawl.dev/mcp
---
```

**2. In global JSON config (all agents):**
```json
{
  "mcpServers": {
    "supabase": {
      "transport": "local",
      "command": ["npx", "@supabase/mcp-server"],
      "args": ["--read-only"]
    }
  }
}
```

**Critical difference:**
- `mcp-servers` (YAML) = only this agent can use this tool
- `mcpServers` (JSON) = all agents in the repo can use this tool

---

## Core Concept: MCP Transport Types

| Transport | How It Works | Use When |
|---|---|---|
| `local` / `stdio` | Spawns a subprocess on the same machine | Local tools, CLI tools, local DBs |
| `http` | Calls a remote HTTP endpoint | Cloud APIs, remote services |
| `sse` | Server-sent events, legacy streaming | Older MCP servers, streaming responses |

**Examples:**

```yaml
# local/stdio — runs a subprocess locally
mcp-servers:
  - name: filesystem
    transport: local
    command: ["npx", "@modelcontextprotocol/server-filesystem", "/workspace"]

# http — calls remote API
mcp-servers:
  - name: firecrawl
    transport: http
    url: https://api.firecrawl.dev/mcp

# sse — legacy streaming server
mcp-servers:
  - name: legacy-tool
    transport: sse
    url: https://legacy-server.example.com/events
```

---

## Core Concept: Copilot CLI

```bash
# Basic prompt
gh copilot suggest "create a GitHub Actions workflow for deployment"
gh copilot explain "what does this workflow do"

# With a detailed prompt
gh copilot -p "Research the top 5 competitors of Digital Wealth Transfer and summarize their tech stacks"

# CI mode — no interactive prompts, fails cleanly
gh copilot --no-ask-user "run the full test suite and report failures"

# Delegate to cloud agent (long-running tasks)
gh copilot /delegate "perform a full security audit of this repository"

# Parallel decomposition across multiple agents
gh copilot /fleet "update all API route handlers to use the new auth middleware"
```

**When to use each:**
- Regular prompt: short, synchronous tasks
- `--no-ask-user`: CI/CD pipelines where there's no human to answer
- `/delegate`: tasks that will take > 5 minutes or need cloud resources
- `/fleet`: tasks that can be broken into parallel independent subtasks

---

## What This Looks Like in Your DWT Codebase

| MCP Concept | Your Codebase Equivalent |
|---|---|
| HTTP MCP transport | Firecrawl API calls in lead engine (`fetch('https://api.firecrawl.dev/...')`) |
| Local MCP tool | Could wrap your Supabase queries as an MCP server |
| Read-only tool | CoinGecko + YouTube API in Signal — read only, never write |
| Execute tool | Supabase INSERT/UPDATE operations — highest risk, validate inputs |
| /fleet pattern | Could parallelize prospect scoring across multiple agents |

---

## Exam Practice Questions

**Q1:** An agent YAML specifies `transport: local` for an MCP server. What does this mean?

> **A:** The MCP server runs as a subprocess on the same machine as the agent, communicating via stdio. Used for local tools like filesystem access or local databases.

**Q2:** Your CI pipeline uses a Copilot agent to run automated code review. It keeps hanging waiting for user input. What flag fixes this?

> **A:** `--no-ask-user` — disables interactive prompts so the agent either proceeds or fails cleanly, never waits.

**Q3:** You need to grant an agent access to your Supabase database. It only needs to read prospect records. Which tool capability and which MCP config do you use?

> **A:** Tool: `read`. MCP: `local` transport with `--read-only` flag. Never give write access when read suffices.

**Q4:** What's the difference between `/delegate` and `/fleet`?

> **A:** `/delegate` = hand off one task to a single cloud agent for long-running work. `/fleet` = decompose one task into parallel subtasks executed by multiple agents simultaneously.

---

## Your Build Task for Day 2

Write a full MCP configuration for your lead engine:

```json
// .github/copilot/mcp-config.json
{
  "mcpServers": {
    "supabase-readonly": {
      "transport": "local",
      "command": ["npx", "@supabase/mcp-server"],
      "args": ["--read-only", "--schema", "prospects,leads"]
    }
  }
}
```

```yaml
# .github/agents/lead-scorer.agent.md
---
name: Lead Scorer
description: Scores leads from Supabase against ideal customer profile
tools:
  - read
  - search
mcp-servers:
  - name: firecrawl
    transport: http
    url: https://api.firecrawl.dev/mcp
---

You are a lead scoring agent for Digital Wealth Transfer.
Score each prospect on a 1-10 scale based on fit with our ICP.
Return valid JSON only. Never fabricate data.
```
