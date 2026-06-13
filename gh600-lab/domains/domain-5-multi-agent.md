# Domain 5 — Orchestrate Multi-Agent Coordination (15–20%)

---

## What This Domain Tests

- GitHub Actions: needs, strategy.matrix, concurrency, artifacts
- Parallel vs. sequential agent execution
- Inter-agent artifact handoffs
- /fleet and /delegate patterns
- Preventing concurrency conflicts

---

## Core Pattern: Sequential Agents with `needs`

```yaml
# .github/workflows/lead-engine.yml
name: Lead Engine Pipeline

on:
  schedule:
    - cron: '0 9 * * 1-5'  # 9am weekdays

jobs:
  # Job 1: Discover new prospects
  discover:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Find new prospects
        run: gh copilot -p "Search LinkedIn and Firecrawl for Las Vegas businesses matching our ICP. Output JSON to prospects.json"
      - uses: actions/upload-artifact@v4
        with:
          name: raw-prospects
          path: prospects.json
          retention-days: 7

  # Job 2: Score each prospect (waits for discover)
  score:
    needs: discover          # ← waits for discover to complete
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: raw-prospects     # ← picks up discover's output
      - name: Score prospects
        run: gh copilot -p "Read prospects.json. Score each on 1-10 for fit. Output scored-prospects.json"
      - uses: actions/upload-artifact@v4
        with:
          name: scored-prospects
          path: scored-prospects.json

  # Job 3: Generate outreach (waits for scoring)
  outreach:
    needs: score             # ← waits for score to complete
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: scored-prospects
      - name: Generate outreach drafts
        run: gh copilot -p "Read scored-prospects.json. Generate outreach messages for scores >= 7. Output drafts.json"
      - uses: actions/upload-artifact@v4
        with:
          name: outreach-drafts
          path: drafts.json

  # Job 4: Human review gate (creates PR, waits for approval)
  review-gate:
    needs: outreach
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: outreach-drafts
      - name: Create review PR
        run: |
          git checkout -b outreach-review-$(date +%Y%m%d)
          cp drafts.json outreach/pending/
          git add . && git commit -m "AI outreach drafts for review"
          gh pr create --title "Outreach Review: $(date +%Y-%m-%d)" \
            --body "AI-generated outreach drafts. Review and approve to send."
```

**This is sequential orchestration:** discover → score → outreach → human gate.

Each job waits for the previous via `needs`. Data flows via artifacts. Human approval is required before anything is sent.

---

## Core Pattern: Parallel Agents with `strategy.matrix`

```yaml
# .github/workflows/parallel-research.yml
name: Parallel Lead Research

on:
  workflow_dispatch:
    inputs:
      batch_size:
        description: 'Number of prospects per agent'
        default: '10'

jobs:
  research:
    strategy:
      matrix:
        batch: [0, 1, 2, 3, 4]  # 5 agents in parallel
      fail-fast: false            # Don't cancel others if one fails
    runs-on: ubuntu-latest
    steps:
      - name: Research batch ${{ matrix.batch }}
        run: |
          gh copilot --no-ask-user -p "
            Research prospects batch ${{ matrix.batch }}.
            Read from prospects_batch_${{ matrix.batch }}.json.
            Output results to research_${{ matrix.batch }}.json
          "
      - uses: actions/upload-artifact@v4
        with:
          name: research-${{ matrix.batch }}
          path: research_${{ matrix.batch }}.json

  # Aggregates after all parallel jobs finish
  aggregate:
    needs: research   # ← waits for ALL matrix jobs
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with:
          pattern: research-*     # ← downloads all 5 research artifacts
          merge-multiple: true
      - name: Merge results
        run: gh copilot -p "Merge all research_*.json files into final_research.json, deduplicating by company domain"
```

**5 research agents run in parallel. One aggregate agent runs after all complete.**

---

## Core Pattern: Concurrency Control

```yaml
# Without this, two pushes in quick succession create two competing runs
concurrency:
  group: lead-engine-${{ github.ref }}
  cancel-in-progress: true    # kill old run when new one starts

# Result: only one run of this workflow runs at a time
# Old run is cancelled (not completed) when new run starts
```

**When to use:** Any workflow that writes to a shared resource (database, file, external service). Without concurrency control, two runs can corrupt each other's state.

---

## Core Pattern: Artifact Handoffs

Artifacts are the primary way data moves between agents in a workflow:

```yaml
# Agent A: writes output
- uses: actions/upload-artifact@v4
  with:
    name: my-artifact       # artifact name — must match download
    path: output.json       # file to upload
    retention-days: 30      # how long to keep (default: 90)

# Agent B: reads Agent A's output
- uses: actions/download-artifact@v4
  with:
    name: my-artifact       # must match upload name
    path: ./input/          # where to download to
```

**Exam trap:** If you don't specify `retention-days`, artifacts default to 90 days. For sensitive data, set it shorter. For long pipelines, set it longer.

---

## What This Looks Like in Your DWT Codebase

Your current lead engine at `app/api/lead-engine/` is a single API route doing sequential work. Here's how it maps to multi-agent orchestration:

```
Current (single agent, one call):
POST /api/lead-engine/run
  → Firecrawl scrapes website
  → Claude scores the prospect
  → Supabase updates the record
  → Returns result

Enterprise (multi-agent workflow):
Job 1: scrape → save raw HTML to artifact
Job 2: analyze raw HTML → save score to artifact  
Job 3: write score to Supabase + notify
Gate: human reviews before any outreach
```

The logic is identical. The architecture adds parallelization, resilience, and a human gate.

---

## Exam Practice Questions

**Q1:** You have a GitHub Actions workflow where Job C must run after both Job A and Job B complete. How do you express this?

> **A:** `needs: [job-a, job-b]` in Job C's definition.

**Q2:** Two developers push to the same branch within 30 seconds. Both trigger a deployment workflow. What config prevents both from running simultaneously and kills the stale one?

> **A:** `concurrency: group: deploy-${{ github.ref }}` with `cancel-in-progress: true`.

**Q3:** How do you pass a 50MB JSON file from a research agent (Job 1) to a scoring agent (Job 2)?

> **A:** Upload as artifact in Job 1 (`actions/upload-artifact`), download in Job 2 (`actions/download-artifact`). Set appropriate `retention-days`.

**Q4:** You need to research 100 prospects and want to do it in parallel. How do you structure this in GitHub Actions?

> **A:** Use `strategy.matrix` with batches (e.g., 10 jobs × 10 prospects each). Each matrix job runs independently in parallel. Use `fail-fast: false` so one failure doesn't cancel others. Aggregate in a downstream job with `needs`.

---

## Your Build Task for Day 5

Create this in your repo:

```yaml
# .github/workflows/lead-engine.yml
name: Lead Engine — Daily Research

on:
  schedule:
    - cron: '0 8 * * 1-5'

jobs:
  scrape:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Scrape prospects
        run: echo "gh copilot scrape step placeholder"
      - uses: actions/upload-artifact@v4
        with:
          name: scraped-data
          path: scraped.json
          retention-days: 7

  score:
    needs: scrape
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: scraped-data
      - name: Score prospects  
        run: echo "gh copilot score step placeholder"
      - uses: actions/upload-artifact@v4
        with:
          name: scored-data
          path: scored.json
```

Even as a placeholder, **writing and reading this YAML is the exam skill**.
