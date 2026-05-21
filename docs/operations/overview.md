# Operations — SOPs and Procedures

---

## Deployment SOP

### Deploy DWT Platform

```bash
# 1. Type check
npx tsc --noEmit

# 2. Lint
npm run lint

# 3. Push to main (auto-deploys via Vercel)
git push origin main

# 4. Verify deployment
# Watch: https://vercel.com/createwithjons-projects/createwithjon-project1
# Live: https://digitalwealthtransfer.com
```

**Vercel auto-deploys on every push to `main`.** No manual trigger needed.

### Deploy Signal Dashboard

```bash
cd /Users/jonathancardona/signal-dashboard
npx tsc --noEmit
git push origin main
# Deploys to signal dashboard Vercel project
```

---

## Adding Environment Variables

**Never use the Vercel dashboard UI** for env vars — use CLI to maintain consistency:

```bash
# Add a variable (will prompt for value)
npx vercel env add VARIABLE_NAME production --scope createwithjons-projects

# List current variables
npx vercel env ls --scope createwithjons-projects

# Remove a variable
npx vercel env rm VARIABLE_NAME production --scope createwithjons-projects
```

Always add to both `production` and optionally `preview` environments.

---

## Supabase Maintenance

### Check leads table
```sql
SELECT * FROM leads ORDER BY created_at DESC LIMIT 20;
```

### Check AI leads
```sql
SELECT * FROM ai_leads ORDER BY created_at DESC LIMIT 20;
```

### Check prospect scoring
```sql
SELECT business_name, ai_score, recommended_offer, status
FROM prospects
ORDER BY ai_score DESC;
```

### Manual schema additions (as needed)
```sql
-- Add column if missing
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lead_type text;
```

---

## Monitoring & Debugging

### Check AI call health
1. Open Helicone dashboard
2. Filter by `Helicone-Property-Feature` tag
3. Look for: error rates > 1%, latency > 5s, unexpected cost spikes

### Debug a failed AI call
1. Check Helicone for the failed call (search by timestamp)
2. Read the full request and response
3. Common failures:
   - `429` — rate limit. Add exponential backoff.
   - `503` — Anthropic outage. Check status.anthropic.com
   - `JSON parse error` — Model returned non-JSON. Check prompt, add regex cleanup.

### Debug a failed Vercel deployment
```bash
npx vercel logs --scope createwithjons-projects
```

---

## Secret Rotation SOP

When rotating an API key (quarterly or after suspected exposure):

1. Generate new key in the provider's dashboard (Anthropic, Supabase, etc.)
2. Add new key to Vercel: `npx vercel env add KEY_NAME production --scope createwithjons-projects`
3. Test in preview environment
4. Update local `.env.local`
5. Revoke old key in provider dashboard
6. Verify production still works

**Never commit `.env.local` to git.** It's in `.gitignore` — verify before committing.

---

## Incident Response

### AI giving wrong answers
1. Check if the system prompt has changed (git log on the route file)
2. Check Helicone for recent call history — did the prompt change?
3. Test the exact failing prompt in Claude Workbench
4. Update the system prompt, deploy, monitor

### Unexpected cost spike
1. Check Helicone cost dashboard — filter by feature tag
2. Identify the high-cost feature
3. Common causes: maxTokens too high, large context being injected, loop bug
4. Fix: reduce maxTokens, optimize context, add iteration limit

### Auth issues (users locked out of Signal/GH600)
1. Check middleware.ts — verify path matching is correct
2. Check env var: `GH600_PASSWORD` or `DASHBOARD_PASSWORD` set in Vercel?
3. Clear cookies in browser and retry
4. If still failing: temporarily remove middleware protection, debug, re-add

---

## Weekly Maintenance Checklist

- [ ] Review Helicone dashboard: errors, cost, latency
- [ ] Check Supabase lead tables: new leads from forms
- [ ] Review prospect pipeline: any scored but not contacted?
- [ ] Check Vercel deployment logs: any build errors?
- [ ] Rotate secrets if > 90 days old

---

## Backup & Data

**Current backup status:**
- Supabase: automatic daily backups (free tier: 7 days)
- Code: GitHub repository (all commits preserved)
- Env vars: stored in Vercel (not in code)

**What's NOT backed up:**
- Signal Dashboard localStorage data (planner plans, habit data) — export manually if important
- Helicone logs — available in dashboard, no export needed for ops

**Phase 2:** Add Supabase export automation via GitHub Actions (weekly CSV export to repo).
