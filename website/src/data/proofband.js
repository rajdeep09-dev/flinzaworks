/*
 * The proof band — the home-page section that replaced the founder-stories video mosaic.
 *
 * Two honesty rules shape this file, and both come from the client's own guardrails:
 *
 *  1. Never invent a brand. The "clients" below are the same anonymised descriptors the case
 *     studies already use ("DTC supplements brand · 8-figure"), each carrying the metric its
 *     account actually produced. A row of plausible-sounding logo names would be exactly the
 *     "random brands" problem he flagged.
 *  2. Never invent a number. Every result here is the same figure stated elsewhere on the site
 *     (the stories captions it replaced, the carousel projects, the stats file). If a number
 *     changes, it changes in the case studies FIRST and here second — never the other way round.
 *
 * The marquee list is deliberately decorative (the section renders it aria-hidden): the services
 * section below the band lists the same capabilities in real, crawlable markup.
 */

export const PROOF_CAPABILITIES = [
  'Meta Ads',
  'Creative Testing',
  'Creator Partnerships',
  'Founder-Led Content',
  'Launch Clipping',
  'Conversion Video',
  'Profit-First Optimisation',
  '48-Hour Iteration',
];

export const PROOF_CARDS = [
  {
    index: '01',
    sector: 'DTC Supplements',
    role: '8-figure brand',
    result: '−31% cost per acquisition',
  },
  {
    index: '02',
    sector: 'DTC Home & Interiors',
    role: 'Founder-led',
    result: '3.4× return in 90 days',
  },
  {
    index: '03',
    sector: 'DTC Fashion',
    role: '$12M/yr brand',
    result: '48-hour production cycles',
  },
  {
    index: '04',
    sector: 'Multi-brand portfolio',
    role: 'Ecommerce group',
    result: '10× more angles tested',
  },
];
