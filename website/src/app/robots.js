/*
 * robots.txt, from the App Router convention.
 *
 * There was no robots file at all, which is not fatal — absent means allowed — but it also meant
 * there was nowhere to point at the sitemap, and the `/api/*` POST endpoints were crawlable.
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
        disallow: ['/api/', '/_next/static/chunks/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
