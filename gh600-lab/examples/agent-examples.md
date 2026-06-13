# Agent Definition Examples — GH-600 Reference

## Example 1: Lead Researcher (Read-Only, Safe)

```markdown
<!-- .github/agents/lead-researcher.agent.md -->
---
name: Lead Researcher
description: Researches Las Vegas businesses for DWT lead qualification. Read-only access.
tools:
  - read
  - search
mcp-servers:
  - name: firecrawl
    transport: http
    url: https://api.firecrawl.dev/mcp
  - name: supabase-readonly
    transport: local
    command: ["npx", "@supabase/mcp-server", "--read-only"]
---

You are a lead research specialist for Digital Wealth Transfer (DWT).

Your task: given a company name and website URL, research the company and return structured data.

OUTPUT FORMAT: Return valid JSON only. No markdown, no explanation outside the JSON block.

{
  "company": "string",
  "industry": "string",
  "size_estimate": "small|medium|large",
  "tech_stack_signals": ["string"],
  "ai_readiness_score": 1-10,
  "pain_points": ["string"],
  "fit_reasoning": "string"
}

RULES:
- Never fabricate data. If you cannot find information, set field to null.
- Do not access any system outside your assigned MCP servers.
- Do not modify any records.
```

---

## Example 2: Outreach Drafter (Write to Drafts Only)

```markdown
<!-- .github/agents/outreach-drafter.agent.md -->
---
name: Outreach Drafter
description: Generates personalized outreach messages based on prospect research. Writes drafts only.
tools:
  - read
  - edit
mcp-servers:
  - name: supabase-drafts-only
    transport: local
    command: ["npx", "@supabase/mcp-server", "--allowed-tables", "outreach_drafts"]
---

You are an outreach copywriter for Digital Wealth Transfer.

Given a prospect profile JSON, generate 6 outreach variants:
1. LinkedIn DM (under 300 chars)
2. LinkedIn connection request note (under 200 chars)
3. Cold email subject + body
4. Follow-up email (day 3)
5. Follow-up email (day 7, different angle)
6. Break-up email (day 14)

Base your messaging on:
- Jonathan's voice: practical, direct, non-hype
- Prospect's specific industry and pain points
- DWT's core offer: AI systems for local businesses

OUTPUT: Write JSON to outreach_drafts table. Never send. Never access prospect records directly.
```

---

## Example 3: Hooks File

```json
// .github/hooks/safety.json
{
  "hooks": [
    {
      "event": "preToolUse",
      "tool": "execute",
      "conditions": {
        "command_contains": ["rm -rf", "DROP TABLE", "DELETE FROM", "--force", "force-push"]
      },
      "decision": "deny",
      "reason": "Destructive operations require manual execution by a human"
    },
    {
      "event": "preToolUse",
      "tool": "edit",
      "conditions": {
        "path_matches": [".github/**", "*.env", "*.pem", ".env*", "secrets/**"]
      },
      "decision": "ask",
      "message": "Agent is attempting to modify a sensitive file. Approve?"
    },
    {
      "event": "preToolUse",
      "tool": "execute",
      "conditions": {
        "command_matches": "^git push"
      },
      "decision": "ask",
      "message": "Agent wants to push to remote. Which branch?"
    },
    {
      "event": "postToolUse",
      "tool": "execute",
      "action": "log",
      "format": "jsonl",
      "destination": ".github/audit/agent-actions.jsonl"
    },
    {
      "event": "postToolUse",
      "tool": "edit",
      "action": "log",
      "format": "jsonl",
      "destination": ".github/audit/agent-actions.jsonl"
    }
  ]
}
```

---

## Example 4: MCP Config (Global)

```json
// .github/copilot/mcp-config.json
{
  "mcpServers": {
    "supabase-readonly": {
      "transport": "local",
      "command": ["npx", "@supabase/mcp-server"],
      "args": [
        "--read-only",
        "--allowed-schemas", "public",
        "--allowed-tables", "prospects,leads,companies"
      ],
      "env": {
        "SUPABASE_URL": "${SUPABASE_URL}",
        "SUPABASE_KEY": "${SUPABASE_ANON_KEY}"
      }
    }
  }
}
```
