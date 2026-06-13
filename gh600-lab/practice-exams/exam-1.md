# GH-600 Practice Exam — 30 Questions

> Format mirrors the real exam: scenario-based, YAML-reading, architecture evaluation.
> Cover all answers before reading. Score yourself honestly.

---

## Section 1: Agent Architecture & SDLC

**Q1.** An engineer creates a Copilot agent that automatically merges pull requests when all CI checks pass. What is the primary governance concern?

A) The agent is using too many tokens  
B) There is no human review gate before merging  
C) The agent should use a different model  
D) CI checks are not sufficient

**Answer: B** — No human in the loop. Automated merges bypass code review, which is a key accountability gate. Agents should propose (open PR) but not merge without human approval.

---

**Q2.** You see this in an agent definition file. What's wrong?

```yaml
name: Log Analyzer
description: Reads and summarizes application logs
tools:
  - read
  - search
  - edit
  - execute
```

A) The agent name is too generic  
B) The agent has excessive tool permissions for its stated task  
C) The tools list is in the wrong order  
D) Agents cannot have more than 2 tools

**Answer: B** — A log analysis agent only needs `read` and `search`. `edit` and `execute` grant write and code execution access that creates unnecessary risk.

---

**Q3.** Where does a GitHub Copilot custom agent definition file live?

A) `.github/workflows/agent.yml`  
B) `.copilot/agents/agent.md`  
C) `.github/agents/agent.md`  
D) `agents/github/agent.yaml`

**Answer: C**

---

**Q4.** An agent that responds to customer chat messages without any human review represents what autonomy level?

A) Supervised  
B) Semi-autonomous  
C) Fully autonomous  
D) Delegated

**Answer: C** — Acts without human confirmation.

---

## Section 2: Tool Use & MCP

**Q5.** What does this MCP configuration indicate?

```yaml
mcp-servers:
  - name: database
    transport: local
    command: ["npx", "@company/db-mcp", "--read-only"]
```

A) The MCP server is hosted on a remote cloud server  
B) The MCP server runs as a local subprocess with read-only access  
C) The agent has full database write access  
D) This configuration is invalid

**Answer: B** — `transport: local` means subprocess on the same machine. `--read-only` limits access.

---

**Q6.** Your GitHub Actions workflow uses a Copilot agent to run automated code analysis. The workflow hangs indefinitely in CI. What's the most likely cause and fix?

A) The model is too slow — switch to a faster model  
B) The agent is missing `--no-ask-user` flag and is waiting for user input  
C) GitHub Actions doesn't support Copilot agents  
D) The agent needs more memory

**Answer: B** — Without `--no-ask-user`, the agent pauses for interactive prompts that will never come in CI.

---

**Q7.** What is the key difference between `mcp-servers` in an agent YAML file and `mcpServers` in a global JSON config?

A) YAML is deprecated; JSON is the only valid format  
B) `mcp-servers` is agent-scoped; `mcpServers` is available to all agents  
C) They are identical and interchangeable  
D) `mcpServers` requires authentication; `mcp-servers` does not

**Answer: B**

---

**Q8.** A developer wants to give an agent access to 50 parallel sub-agents to research competitors simultaneously. Which Copilot CLI command achieves this?

A) `gh copilot /delegate`  
B) `gh copilot --parallel 50`  
C) `gh copilot /fleet`  
D) `gh copilot -p --multi`

**Answer: C** — `/fleet` decomposes a task and runs it across multiple agents in parallel.

---

## Section 3: Memory & State

**Q9.** An agent running a 30-step research task begins ignoring constraints set in step 1 by step 20. What is happening?

A) The model has a bug  
B) The agent's tools are malfunctioning  
C) Context drift — early instructions are compressing as the context grows  
D) The rate limit has been exceeded

**Answer: C**

---

**Q10.** Which memory type is LOST when a model's context window closes?

A) Episodic memory  
B) Working memory  
C) Semantic memory  
D) Procedural memory

**Answer: B**

---

**Q11.** A system prompt defines how an agent should behave across all interactions. This is an example of which memory type?

A) Working memory  
B) Episodic memory  
C) Semantic memory  
D) Procedural memory

**Answer: D**

---

**Q12.** You need an agent to "remember" that a specific prospect said they have budget concerns. This note needs to be retrievable in future sessions. Which memory type is most appropriate?

A) Working memory  
B) Procedural memory  
C) Episodic memory  
D) Stack memory

**Answer: C** — Episodic memory stores events/notes that are retrieved in future sessions.

---

**Q13.** What technology enables semantic (vector) memory in a Postgres database?

A) Full-text search (`tsvector`)  
B) JSON columns with GIN indexing  
C) `pgvector` extension with `vector` column type  
D) Redis caching layer

**Answer: C**

---

## Section 4: Evaluation & Tuning

**Q14.** An agent's output quality has degraded over the past week. In what order should you investigate adjustment levers?

A) Switch model → retrain → fix prompt  
B) Fix prompt → switch model → change tools/data  
C) Change tools → fix prompt → switch model  
D) Retrain → fix prompt → switch model

**Answer: B** — Prompt tuning is cheapest and fastest. Switch models only when prompts fail repeatedly.

---

**Q15.** Your observability dashboard shows a specific feature's AI calls have a 25% error rate. What's the first action?

A) Switch to a different AI provider  
B) Disable the feature  
C) Filter logs to that feature and read the raw error responses  
D) Increase the max token limit

**Answer: C** — Read the actual errors before making any changes.

---

**Q16.** What is the key distinction between testing and evaluation?

A) Testing uses real data; evaluation uses synthetic data  
B) Testing is pre-deployment; evaluation is continuous production monitoring  
C) Evaluation is automated; testing requires humans  
D) They are synonyms

**Answer: B**

---

## Section 5: Multi-Agent Orchestration

**Q17.** You have a GitHub Actions workflow. Job C must wait for both Job A and Job B to complete. How is this expressed?

```yaml
jobs:
  job-a:
    ...
  job-b:
    ...
  job-c:
    ???
```

A) `depends_on: [job-a, job-b]`  
B) `after: [job-a, job-b]`  
C) `needs: [job-a, job-b]`  
D) `requires: job-a, job-b`

**Answer: C**

---

**Q18.** Two developers push to the same branch within seconds. Both trigger a deployment workflow. What configuration prevents both from running and cancels the older run?

A) `max-parallel: 1`  
B) `concurrency: group: deploy cancel-in-progress: true`  
C) `sequential: true`  
D) `lock: branch`

**Answer: B**

---

**Q19.** How do you pass a large JSON file between Job 1 (research) and Job 2 (scoring) in a GitHub Actions workflow?

A) Write to a shared database  
B) Use environment variables  
C) Upload artifact in Job 1, download artifact in Job 2  
D) Pass as a job output variable

**Answer: C** — For large files, artifacts are the correct approach. Environment variables have size limits.

---

**Q20.** You need to research 200 companies in parallel using GitHub Actions. The most appropriate pattern is:

A) A single job with a loop that processes each company sequentially  
B) `strategy.matrix` with 20 batches of 10 companies each  
C) 200 separate workflow files  
D) A single Copilot /fleet command (no Actions needed)

**Answer: B** — `strategy.matrix` with batches is the correct GitHub Actions parallel pattern.

---

## Section 6: Guardrails & Accountability

**Q21.** Which hook event type can PREVENT a destructive tool call from executing?

A) `postToolUse`  
B) `onToolError`  
C) `preToolUse`  
D) `toolInterrupt`

**Answer: C**

---

**Q22.** What file path contains GitHub Copilot hook definitions?

A) `.github/workflows/hooks.yml`  
B) `.copilot/hooks.json`  
C) `.github/hooks/*.json`  
D) `hooks/copilot.json`

**Answer: C**

---

**Q23.** An agent hook is configured with `decision: "ask"` for all file deletion operations. The agent runs in an unattended CI pipeline. What happens?

A) The deletion proceeds automatically  
B) The deletion is denied  
C) The agent pauses indefinitely waiting for human input  
D) The hook is ignored in CI

**Answer: C** — `ask` waits for human input. In unattended CI, this creates a permanent hang. Use `allow` or `deny` for CI environments.

---

**Q24.** What is the principle of least privilege as applied to agent tool configuration?

A) Agents should have all tools enabled to maximize capability  
B) Agents should only be granted the minimum tool permissions necessary for their specific task  
C) Tool permissions should rotate daily  
D) Only senior developers can configure agent tools

**Answer: B**

---

**Q25.** Your audit log shows an agent executed a database DELETE operation at 2am. What information in the log allows you to trace accountability?

A) The model name and token count  
B) The run_id linking to a specific workflow run, timestamp, and actor  
C) The number of rows deleted  
D) The IP address of the server

**Answer: B**

---

## Section 7: Scenario Analysis (Mixed)

**Q26.** Review this agent definition. Identify all issues:

```yaml
name: deployment-agent
description: Handles production deployments
tools:
  - read
  - search
  - edit
  - execute
  - agent
mcp-servers:
  - name: prod-database
    transport: http
    url: https://prod-db.company.com/mcp
```

Issues to identify:

**Answer:**
1. No least privilege — an agent should not have ALL 5 tools unless all are explicitly needed
2. Connected directly to PRODUCTION database — should connect to staging first, or be read-only
3. No `--read-only` flag or scope restriction on the MCP server
4. `agent` tool (can spawn sub-agents) on a deployment agent creates recursive risk
5. No authentication headers shown for the MCP server

---

**Q27.** A developer proposes: "Our agent should write directly to the main branch instead of opening PRs — it's faster and our CI catches issues." What's wrong?

**Answer:** Bypasses code review (human accountability), removes audit trail of who approved what, if the agent is compromised or malfunctions it can corrupt production directly, violates branch protection principles. PRs are slower but add human review, auditability, and a rollback point.

---

**Q28.** You have an agent that generates outreach emails and needs to send them. What architecture best balances automation with accountability?

A) Give the agent full email send permissions — it's more efficient  
B) Agent drafts emails, human reviews in a dashboard, human manually sends or approves  
C) Agent sends during business hours only  
D) Agent sends with a 1-hour delay to allow cancellation

**Answer: B** — HITL before irreversible external actions (sending email).

---

**Q29.** An engineer argues: "We don't need observability on our AI calls — if something breaks, users will report it." What risks does this position ignore?

**Answer:**
1. Silent failures — model returns bad output that looks valid to users
2. Cost runaway — unexpectedly high token usage goes unnoticed
3. No baseline for comparison when you tune prompts
4. Can't do root cause analysis without logs
5. Compliance risk — no audit trail of what the AI decided and why

---

**Q30.** Rank these agent designs from MOST to LEAST enterprise-appropriate:

A) Agent with all tools, no hooks, direct main branch access  
B) Agent with read-only tools, preToolUse safety hooks, PR-based output, full observability  
C) Agent with write access, postToolUse logging only, requires manual trigger  
D) Agent with read-write access, ask decision on all writes, full audit log

**Answer (most to least appropriate): B → D → C → A**

- B: best — least privilege, proactive safety hooks, PR gate, observable
- D: good — asks before writes (accountable), full audit, but `ask` may fail in CI
- C: acceptable — manual trigger adds human gate, but no proactive blocking
- A: dangerous — maximum privilege, no hooks, no review, full risk

---

## Scoring

| Score | Assessment |
|---|---|
| 28–30 | Exam-ready. Review any misses and book your exam. |
| 24–27 | Strong. Targeted review of missed domains. |
| 20–23 | Good foundation. Focus 2 more days on weak domains. |
| Below 20 | Re-study weak domains, then retake this practice exam. |
