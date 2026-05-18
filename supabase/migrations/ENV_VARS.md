# Environment Variables — Lead Acquisition System

## Required (already set)
| Variable | Description |
|---|---|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| `ANTHROPIC_API_KEY` | Claude API key — used for AI scoring + outreach generation |

## New — Add These in Vercel

### Apify (Google Maps Scraper)
| Variable | Where to get it |
|---|---|
| `APIFY_API_TOKEN` | apify.com → Settings → Integrations → API Token |
| `APIFY_ACTOR_ID` | Optional. Default: `apify~google-maps-scraper`. Change if you use a different actor. |

### Firecrawl (Website Crawling)
| Variable | Where to get it |
|---|---|
| `FIRECRAWL_API_KEY` | firecrawl.dev → Dashboard → API Keys |

## Add to Vercel
```bash
npx vercel env add APIFY_API_TOKEN --scope createwithjons-projects
npx vercel env add FIRECRAWL_API_KEY --scope createwithjons-projects
```

---

# n8n Workflow Architecture

## Overview
n8n connects Supabase → Claude → Slack/Email → CRM.
The Next.js app handles UI and Supabase writes.
n8n handles async enrichment, notifications, and follow-up scheduling.

## Workflow 1: New Lead Notification
**Trigger:** Supabase → real_estate_leads INSERT (via webhook)
**Steps:**
1. Receive new lead data
2. Check: does lead have a website? → branch
3a. If yes: call `/api/analyze` to crawl + score
3b. If no: set lead_score = 40 (phone-only)
4. Update real_estate_leads row with score
5. If lead_score >= 60: send Slack message with lead details

## Workflow 2: Daily Follow-Up Reminder
**Trigger:** Schedule (8am daily)
**Steps:**
1. Query Supabase: `SELECT * FROM prospects WHERE next_followup_at <= TODAY AND status NOT IN ('Closed','Not Interested')`
2. If results: send daily digest email with lead list
3. Optionally: post to Slack #leads channel

## Workflow 3: Auto-Enrich on Scrape
**Trigger:** Webhook POST from `/api/scrape` (add webhook call at end of scrape)
**Steps:**
1. Receive list of new company_names + websites
2. For each (throttled): call `/api/analyze?url={website}&leadId={id}`
3. Store results back in real_estate_leads
4. Send summary: "Scraped 45 leads, 18 scored 60+, 5 scored 80+"

## Workflow 4: Weekly Outreach Sequence
**Trigger:** Schedule (Monday 9am)
**Steps:**
1. Query prospects with status = 'Contacted' and next_followup_at <= TODAY
2. For each: fetch outreach_drafts.followup_1 or followup_2
3. (Manual approval step) → Send via connected Gmail/IG

## Workflow 5: Lead Nurturing
**Trigger:** Prospect status changes to 'Call Booked'
**Steps:**
1. Send confirmation SMS via Twilio
2. Create calendar event (Google Calendar via OAuth)
3. Update CRM (HubSpot / GoHighLevel if connected)

---

# Supabase Table Setup

Run `supabase/migrations/001_real_estate_leads.sql` in:
Supabase Dashboard → SQL Editor → New Query → Paste → Run

---

# How the Scraping Pipeline Works

1. User opens `/lead-engine` → clicks **Scraper** tab
2. Selects niches (e.g., "mortgage broker", "property manager") + city
3. Clicks **Start Scrape** → POSTs to `/api/scrape`
4. Apify runs Google Maps actor (1-3 min)
5. Frontend polls every 4 seconds → `/api/scrape?runId=xxx&store=true`
6. Results auto-stored in `real_estate_leads` table
7. User clicks **⚡ Analyze** per lead → POSTs to `/api/analyze`
8. Firecrawl crawls the website, Claude scores it 0-100
9. Score + AI summary + outreach angle written back to the row
10. User clicks **→ Pipeline** to promote high-score leads to `prospects`
11. Add Lead modal pre-fills with all scraped + AI data
12. From Pipeline tab: click **Draft** to generate outreach messages
