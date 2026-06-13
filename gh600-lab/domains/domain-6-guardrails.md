# Domain 6 — Implement Guardrails & Accountability (10–15%)

---

## What This Domain Tests

- Writing and reading `.github/hooks/*.json` files
- Understanding preToolUse vs postToolUse and their limitations
- Implementing least privilege across your agent fleet
- Branch protection as a governance mechanism
- Audit logs and accountability patterns

---

## Core Concept: Hooks

Hooks intercept tool execution. They're defined in `.github/hooks/*.json` and fire automatically before or after any tool call.

```json
// .github/hooks/safety.json
{
  "hooks": [
    {
      "event": "preToolUse",
      "tool": "execute",
      "conditions": {
        "command_contains": ["rm -rf", "DROP TABLE", "DELETE FROM", "force-push"]
      },
      "decision": "deny",
      "reason": "Destructive commands require human approval"
    },
    {
      "event": "preToolUse",
      "tool": "edit",
      "conditions": {
        "path_matches": [".github/**", "*.env", "*.pem"]
      },
      "decision": "ask",
      "reason": "Sensitive file modification requires confirmation"
    },
    {
      "event": "postToolUse",
      "tool": "execute",
      "action": "log",
      "destination": "audit-log.jsonl"
    }
  ]
}
```

---

## preToolUse vs postToolUse — Critical Distinction

| | preToolUse | postToolUse |
|---|---|---|
| **Fires** | BEFORE tool executes | AFTER tool executes |
| **Can block?** | YES — `decision: "deny"` stops execution | NO — action already happened |
| **Use for** | Safety gates, permission checks | Logging, auditing, output filtering |
| **Real example** | Block `rm -rf` before it runs | Log that `git push` was executed |

**Exam trap:** postToolUse cannot undo or prevent an action. If you need to block something, it MUST be preToolUse.

---

## The 3 Hook Decisions

```json
// decision: "allow" — proceed normally
{ "decision": "allow" }

// decision: "deny" — block the tool call, return error to agent
{ "decision": "deny", "reason": "This action requires human approval" }

// decision: "ask" — pause agent, prompt human, wait for response
{ "decision": "ask", "message": "Agent wants to delete prospect records. Allow?" }
```

**When to use each:**
- `allow`: explicit allowlist for safe operations
- `deny`: hard block on dangerous operations (destructive, irreversible)
- `ask`: uncertain operations where context matters (agent can explain, human decides)

---

## Least Privilege — Applied to Your Agent Fleet

For each agent in your system, ask: "What's the minimum it needs to do its job?"

```yaml
# WRONG — over-privileged
---
name: Content Analyzer
tools:
  - read
  - search
  - edit        # ← why? this agent only analyzes, doesn't write
  - execute     # ← definitely not needed
---

# RIGHT — least privilege
---
name: Content Analyzer
tools:
  - read
  - search
---
```

**Applying this to your codebase:**

| Your Route | Current State | Least Privilege |
|---|---|---|
| Lead scorer | Full DB access | Read-only on prospects table |
| Content draft generator | Full API access | Write to drafts only, no delete |
| Dealership chat | Reads inventory | Read-only on inventory table |
| B-roll generator | Read + write | Read transcripts, write job status only |

---

## Branch Protection as Governance

```yaml
# Repository settings → Branch protection rules for `main`:
# ✓ Require a pull request before merging
# ✓ Require approvals: 1 (at minimum)
# ✓ Dismiss stale PR approvals when new commits are pushed
# ✓ Require status checks to pass before merging
# ✓ Require branches to be up to date before merging
# ✓ Restrict who can push to matching branches
# ✗ NEVER check "Allow force pushes"
# ✗ NEVER check "Allow deletions"
```

**Why this matters for agents:** Without branch protection, an agent with `execute` tool permissions could `git push --force` to main, bypassing all review. Branch protection rules prevent this at the infrastructure level, not just at the agent configuration level.

Defense-in-depth: agent configuration AND infrastructure controls.

---

## Audit Logs — What Good Accountability Looks Like

```jsonl
// audit-log.jsonl — append-only, never modify
{"timestamp":"2026-05-26T14:23:11Z","agent":"lead-scorer","tool":"execute","action":"supabase_update","target":"prospects/abc123","result":"success","run_id":"run_xyz789","actor":"github-actions"}
{"timestamp":"2026-05-26T14:23:15Z","agent":"lead-scorer","tool":"execute","action":"supabase_update","target":"prospects/def456","result":"success","run_id":"run_xyz789","actor":"github-actions"}
{"timestamp":"2026-05-26T14:24:02Z","agent":"outreach-drafter","tool":"edit","action":"create_file","target":"outreach/drafts/2026-05-26.json","result":"success","run_id":"run_xyz789","actor":"github-actions"}
{"timestamp":"2026-05-26T14:24:45Z","hook":"safety","event":"preToolUse","tool":"execute","decision":"deny","reason":"Detected rm command","agent":"cleanup-agent","run_id":"run_abc111"}
```

**What an auditor looks for:**
- Every tool call logged with who, what, when, result
- Denied actions logged (not just successful ones)
- Run IDs that trace back to specific workflow runs
- No gaps in the log (append-only, immutable)

---

## Your Current Guardrails Audit

Go through your codebase and rate each item:

```
✓ ANTHROPIC_API_KEY check before every AI call (lib/ai.ts) — GOOD
✓ httpOnly cookie auth on Signal Dashboard (middleware.ts) — GOOD  
✓ Password gate on leads admin (/leads-admin) — GOOD
✓ Helicone proxy logs all AI calls — GOOD (observability)

⚠ No input sanitization on lead form fields — RISK
⚠ No rate limiting on /api/leads — RISK (could be spammed)
⚠ Supabase anon key in client? Check your routes — RISK if yes
⚠ No branch protection rules documented — ADD THIS
⚠ No hooks file — ADD THIS
```

---

## Exam Practice Questions

**Q1:** Which hook event can prevent a dangerous file deletion from executing?

> **A:** `preToolUse` with `decision: "deny"`. It fires BEFORE the tool executes. postToolUse cannot prevent execution.

**Q2:** Your audit log shows an agent called `execute` at 3am and deleted 200 prospect records. What's the accountability question and what should have prevented this?

> **A:** Accountability: check audit log for run_id, trace back to workflow run, identify who triggered it (scheduled? manual? compromised?). Prevention: preToolUse hook blocking DELETE operations + require human approval for bulk data deletion.

**Q3:** An agent is configured with `decision: "ask"` on all edit operations. What happens when it tries to modify a file in CI?

> **A:** The agent pauses and waits for human input — which will never come in CI. Fix: in CI, either use `decision: "allow"` for pre-approved operations, or restructure so edit operations never run in unattended CI.

**Q4:** What two layers should prevent an agent from force-pushing to main?

> **A:** 1) Agent configuration — don't grant `execute` unless needed, or use hooks to deny `--force` flags. 2) Branch protection rules — require PR reviews, no force pushes allowed. Defense in depth.

---

## Your Build Task for Day 6

Create these files:

**`.github/hooks/safety.json`:**
```json
{
  "hooks": [
    {
      "event": "preToolUse",
      "tool": "execute",
      "conditions": { "command_contains": ["rm -rf", "--force", "DROP", "DELETE"] },
      "decision": "deny",
      "reason": "Destructive operations require manual execution"
    },
    {
      "event": "postToolUse",
      "tool": "execute",
      "action": "log"
    }
  ]
}
```

**Audit your routes:** Go through every API route in both projects. For each one, write down:
- Who can call it (auth or open)?
- What can it write/delete?
- Is the data validated before it reaches the DB?

That audit = real GH-600 governance thinking.
