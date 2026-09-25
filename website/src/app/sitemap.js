/*
 * sitemap.xml, from the App Router convention.
 *
 * The site had none — no `sitemap.js`, no `sitemap.xml` — so a crawler had to discover every page
 * by following links, and the article pages behind /insights were one hop further away than
 * anything else. This lists every public route, plus one entry per insight post and one per service
 * landing page, generated from the same data files the pages render, so a new post cannot be
 * published without appearing here.
 *
 * Priorities are relative and coarse on purpose: the commercial pages (home, services, work,
 * contact) sit at 0.9–1.0, the content that earns links at 0.8, and the legal pages at 0.3, which
 * is the honest ranking of how much they matter. The HTML sitemap is the footer.
 *
 * `/api/*` is excluded — those are POST endpoints, not pages. They are also disallowed in robots.js.
 */

import { insights } from '@/data/insights';
import { servicePages } from '@/data/services';
import { SITE_URL, CONTENT_UPDATED } from '@/data/seo';

/* The `lastModified` below is `CONTENT_UPDATED`, not `new Date()`.
 *
 * The sitemap used to stamp every URL with the moment the build ran. Thirty URLs all claiming to
 * have changed on every deploy is not freshness information, it is noise — and a crawler that
 * learns `lastmod` is always "now" stops using it to decide what is worth recrawling, which is the
 * opposite of what a sitemap is for. The date moves when the copy is actually reviewed, by hand. */
const reviewed = new Date(`${CONTENT_UPDATED}T00:00:00.000Z`);

export default function sitemap() {
  const routes = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/services', priority: 0.95, changeFrequency: 'monthly' },
    { path: '/work', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/influencer-marketing', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/insights', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/careers', priority: 0.6, changeFrequency: 'weekly' },
    /* Not a commercial page, so its priority is low — but it is listed rather than left out,
       because it is the first-party source for who built the site and a page that is not in the
       sitemap is a page a crawler has to find by guessing. */
    { path: '/colophon', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  ];

  const serviceRoutes = servicePages.map((page) => ({
    path: `/services/${page.slug}`,
    priority: 0.85,
    changeFrequency: 'monthly',
  }));

  const articleRoutes = insights.map((post) => ({
    path: `/insights/${post.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: new Date(post.updated || post.date),
  }));

  return [...routes, ...serviceRoutes, ...articleRoutes].map((route) => ({
    url: `${SITE_URL}${route.path}`,
    /* Articles carry their own real publish/update date; everything else carries the review date. */
    lastModified: route.lastModified || reviewed,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
