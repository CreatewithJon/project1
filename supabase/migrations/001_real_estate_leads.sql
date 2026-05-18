-- ============================================================
-- MIGRATION 001: real_estate_leads
-- Run this in the Supabase SQL editor:
-- Dashboard → SQL Editor → New Query → paste → Run
-- ============================================================

-- Main table for auto-scraped + AI-scored real estate market leads
CREATE TABLE IF NOT EXISTS real_estate_leads (
  id                  uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          timestamptz   NOT NULL DEFAULT now(),

  -- Business info (from Apify Google Maps scraper)
  company_name        text          NOT NULL,
  contact_name        text,
  email               text,
  phone               text,
  website             text,
  address             text,
  city                text,
  state               text,
  niche               text,         -- e.g. "mortgage broker", "property manager"
  source              text          DEFAULT 'apify_google_maps',

  -- AI scoring output
  lead_score          integer       CHECK (lead_score BETWEEN 0 AND 100),
  ai_summary          text,         -- 2-3 sentence AI analysis
  website_quality     integer       CHECK (website_quality BETWEEN 0 AND 10),
  recommended_offer   text,         -- e.g. "AI Lead System", "AI Growth System"
  outreach_angle      text,         -- 1-sentence hook for outreach

  -- Status tracking
  status              text          NOT NULL DEFAULT 'new'
                                    CHECK (status IN ('new','scored','promoted','dismissed')),
  outreach_status     text          NOT NULL DEFAULT 'none'
                                    CHECK (outreach_status IN ('none','drafted','sent','replied','closed')),

  -- Notes / manual fields
  notes               text,

  -- Google Maps enrichment
  google_maps_url     text,
  google_rating       numeric(3,1),
  google_review_count integer,

  -- Firecrawl enrichment
  website_crawled_at  timestamptz,
  website_content     text,         -- raw markdown from Firecrawl
  missing_features    text[],       -- e.g. ARRAY['booking system','live chat']

  -- Raw source data
  raw_data            jsonb         -- full Apify place object
);

-- Indexes for fast dashboard queries
CREATE INDEX IF NOT EXISTS idx_rel_status       ON real_estate_leads (status);
CREATE INDEX IF NOT EXISTS idx_rel_niche        ON real_estate_leads (niche);
CREATE INDEX IF NOT EXISTS idx_rel_city         ON real_estate_leads (city);
CREATE INDEX IF NOT EXISTS idx_rel_lead_score   ON real_estate_leads (lead_score DESC);
CREATE INDEX IF NOT EXISTS idx_rel_created_at   ON real_estate_leads (created_at DESC);

-- ============================================================
-- EXISTING TABLE: prospects (already deployed — for reference)
-- This is the manually-managed outreach pipeline.
-- real_estate_leads feeds into prospects via "Promote to Pipeline".
-- ============================================================
--
-- prospects table already has:
--   id, created_at, business_name, website, instagram_url, linkedin_url,
--   industry, location, contact_name, email, phone, source,
--   problem_signal, ai_score (0-10), ai_score_reason, recommended_offer,
--   status (New→Closed pipeline), notes, outreach_drafts (jsonb),
--   last_contacted_at, next_followup_at
--
-- No changes needed to prospects.

-- ============================================================
-- HELPER: view joining both tables
-- ============================================================
CREATE OR REPLACE VIEW lead_pipeline_summary AS
SELECT
  'scraped'      AS origin,
  id,
  company_name   AS business_name,
  niche          AS industry,
  city || ', ' || state AS location,
  lead_score     AS score,
  status,
  created_at
FROM real_estate_leads
UNION ALL
SELECT
  'pipeline'     AS origin,
  id,
  business_name,
  industry,
  location,
  ai_score * 10  AS score,
  status,
  created_at
FROM prospects
ORDER BY created_at DESC;
