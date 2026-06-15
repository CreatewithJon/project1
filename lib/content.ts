/**
 * lib/content.ts — DWT Content Adapter Layer
 *
 * All pages import from here, never directly from lib/data/articles.ts.
 *
 * Phase 1: local static data (current)
 * Phase 2: replace the four core functions below with fetch() calls to the
 *           Sovereign OS Content Engine API. Schema is identical — no page
 *           changes required.
 *
 * Sovereign OS publishing workflow (Phase 2):
 *   Create in Sovereign OS → Edit → Review → Publish
 *   → POST /api/content/articles → appears on DWT automatically
 *
 * Migration surface: this file only.
 */

import {
  articles as localArticles,
  getArticleBySlug as localGetBySlug,
} from "./data/articles";
import type { Article } from "./types";

// ─── Core content functions ───────────────────────────────────────────────────
// Async signatures are intentional — Phase 2 will use await fetch() here.

export async function getArticles(): Promise<Article[]> {
  // Phase 2: return fetch(`${SOVEREIGN_OS_API}/articles`).then(r => r.json())
  return localArticles;
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  // Phase 2: return fetch(`${SOVEREIGN_OS_API}/articles/${slug}`).then(r => r.json())
  return localGetBySlug(slug);
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const all = await getArticles();
  return all.filter((a) => a.featured && a.status === "published");
}

export async function getRecentArticles(limit = 4): Promise<Article[]> {
  const all = await getArticles();
  return all
    .filter((a) => !a.featured && a.status === "published")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export async function getRelatedArticles(
  currentSlug: string,
  relatedSlugs: string[]
): Promise<Article[]> {
  const all = await getArticles();
  return all.filter(
    (a) => relatedSlugs.includes(a.slug) && a.slug !== currentSlug
  );
}

export async function getAllPublishedArticles(): Promise<Article[]> {
  const all = await getArticles();
  return all
    .filter((a) => a.status === "published")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
