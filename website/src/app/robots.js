/*
 * robots.txt, from the App Router convention.
 *
 * There was no robots file at all, which is not fatal — absent means allowed — but it also meant
 * there was nowhere to point at the sitemap, and the `/api/*` POST endpoints were crawlable.
 *
 * ── Why `/_next/static/chunks/` was dropped ──
 *
 * It was here from the start and it bought nothing. Chunks are not pages, so nothing
 * indexable lives under that path; and robots.txt does not stop Google from fetching
 * CSS and JS to render a page anyway, so blocking it could not protect the render.
 * What it could do is produce a "Blocked by robots.txt" line in Search Console's page
 * indexing report, which is a diagnostic the site does not need to be generating.
 *
 * ── What is deliberately NOT blocked ──
 *
 * GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot and the rest. The GEO half of this
 * project exists to be mentioned inside ChatGPT, Perplexity, Gemini and AI Overviews, and a
 * crawler that is not allowed to fetch the page cannot quote it. Blocking them would be actively
 * working against the goal.
 *
 * Only the API routes and the Next.js internals are disallowed. The Next file-convention handler
 * appends the sitemap reference and emits this at /robots.txt.
 */

import { SITE_URL } from '@/data/seo';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
