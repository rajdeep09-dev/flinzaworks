/*
 * The home route — a server component, so it can own its own metadata.
 *
 * ── Why this file exists again ──
 *
 * Every route in this app used to be a single `'use client'` page, which means `export const
 * metadata` could not be used anywhere: the App Router only reads metadata from server components.
 * The result was one global title, one global description and one Open Graph card, shared by all
 * ten routes — so a search result, a shared link and a Slack unfurl for /services and /about were
 * byte-for-byte the same as the homepage's.
 *
 * The pattern now is the standard one: this file is the server component, it declares the route's
 * metadata and its structured data, and it renders the interactive page below it. The client logic
 * is unchanged and lives in `./HomeClient.jsx`.
 */

import JsonLd from '@/components/JsonLd';
import HomeClient from './HomeClient';
import { faqItems } from '@/data/faqs';
import { faqSchema, breadcrumbSchema } from '@/data/seo';

export const metadata = {
  /* Primary keyword first, brand second. Two things are deliberate here:

     1. The brand is NOT in this string. `layout.jsx` sets `title.template: '%s | Flinza Works'`,
        so writing it here as well renders "… | Flinza Works | Flinza Works". The template appends
        it, and openGraph.title (below) says it in full because og:title is never templated.
     2. The client's brief asked for a title ending in "…Meta Ads, Creative Testing & Creator-Led
        Content". That runs to 87 characters and is truncated in a result, so those keywords are
        carried in the description instead, where nothing is cut off. */
  title: 'Ecommerce Growth Agency for DTC Brands',
  description:
    'Flinza Works is an ecommerce growth agency for DTC brands spending $50K+ a month: Meta ads, creative testing, creator and founder content. Book a call.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Ecommerce Growth Agency for DTC Brands | Flinza Works',
    description:
      'Meta ads, 48-hour creative testing, creator and founder content, and launch clipping for ecommerce brands spending $50K+ a month. Optimised for profit.',
    url: '/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ecommerce Growth Agency for DTC Brands | Flinza Works',
    description:
      'Meta ads, 48-hour creative testing, creator and founder content and launch clipping for ecommerce brands spending $50K+ a month.',
  },
};

export default function HomePage() {
  return (
    <>
      {/* Organization / WebSite / ProfessionalService are emitted once, from the root layout — a
          second copy here would be a duplicate entity, which is worse than none.

          The FAQPage block mirrors `faqItems`, which is also what the page renders in its
          accordion, so the answer a search engine quotes and the answer a reader sees are the same
          sentences. This is the highest-value block on the site for AI Overviews and featured
          snippets, because the answers are short, self-contained and answer-first. */}
      <JsonLd data={[faqSchema(faqItems), breadcrumbSchema([])]} />
      <HomeClient />
    </>
  );
}
