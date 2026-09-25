/*
 * The eight case studies, in one place.
 *
 * ── Why this file exists ──
 *
 * These were an array declared inline inside `app/work/page.jsx`, which meant the prose a reader
 * sees and the prose a crawler is handed were two separate problems. `/work` had no structured
 * data at all — every other commercial route emits Service, FAQPage, HowTo, Article or JobPosting,
 * and the case studies, which are the single most quotable thing on the site, emitted only a
 * breadcrumb. An AI Overview cannot quote a number it cannot parse, and Google cannot put a
 * result in a position without knowing what the page is about.
 *
 * So the array moved here, unchanged, and three consumers read it: the /work page that renders it,
 * the `caseStudyListSchema()` ItemList in `@/data/seo`, and the generated `/llms-full.txt`. One
 * source means the number a reader is shown, the number in the JSON-LD and the number an answer
 * engine quotes cannot disagree — which is the whole point of the other data files in this folder
 * having been split out in the first place.
 *
 * ── The naming rule (unchanged) ──
 *
 * Every study is either a client we are allowed to name or an anonymised label of the same shape
 * ("DTC Beauty · $9M/yr"). There are no invented brand names: a made-up logo is the one thing on an
 * agency site that is trivially checkable and instantly fatal. Where a client is under NDA the
 * sector and the revenue band say what a reader actually needs, which is whether this is a business
 * like theirs.
 *
 * `service` and `serviceSlug` name the offer each study proves. They are declared here rather than
 * derived from the `tag` string so the case-study list can link into the service pages, and so a
 * change to a tag's wording cannot silently repoint a link.
 */

export const CASE_STUDIES = [
  {
    tag: '01 // REVENUE AUDIT',
    client: 'StillRing',
    sector: 'Supplements · $4M/yr',
    service: 'Revenue leak audit',
    serviceSlug: null,
    situation:
      'Spend was growing 20% month on month while contribution margin went backwards.',
    changed:
      'Rebuilt attribution in Triple Whale and found 31% of spend was acquiring customers who returned on first order.',
    result: '3.4× contribution return in 90 days, +$412K recovered',
  },
  {
    tag: '02 // META ADS',
    client: 'StillRing',
    sector: 'Paid media · 8-figure',
    service: 'High-converting Meta ads',
    serviceSlug: 'meta-ads',
    situation:
      'Platform-reported ROAS was healthy but the brand was not profitable at scale.',
    changed:
      'Restructured campaigns around how the Meta algorithm allocates spend and reads creative signals, killed the prospecting sets that never paid back, and rebuilt retargeting around margin.',
    result: 'ROAS 1.8x → 4.2x, −31% CAC held through two seasonal spikes',
  },
  {
    tag: '03 // CREATORS',
    client: 'DTC Beauty',
    sector: '$9M/yr',
    service: 'Creator-led content',
    serviceSlug: 'creator-partnerships',
    situation:
      'Creator spend was capped at four assets a month by cost and by waiting on creators to answer messages.',
    changed:
      'Sourced a roster on engagement quality rather than follower count, wrote and directed every script in house, and cleared paid usage rights up front so the footage could run as ad creative.',
    result: '3.2× return on creator spend, −38% CAC vs studio creative',
  },
  {
    tag: '04 // FOUNDER-LED',
    client: 'DTC Supplements',
    sector: '$6M/yr',
    service: 'Founder-led content',
    serviceSlug: 'founder-led-content',
    situation:
      'The founder was the most trusted voice the brand had, and the least used one — nothing shipped without a studio day.',
    changed:
      'One scripted shoot a month, cut into shorts, reels, YouTube edits and two podcast episodes. Paid cutdowns come from the same footage.',
    result: '120+ assets a quarter, 48-hour shoot-to-publish',
  },
  {
    tag: '05 // CLIPPING',
    client: 'DTC Home',
    sector: 'Launch window',
    service: 'Clipping for awareness & launches',
    serviceSlug: 'launch-clipping',
    situation: 'A launch with a two-week window and one hero asset carrying the whole thing.',
    changed:
      'Ran a high-volume clipping engine across the window — dozens of cut-downs a week from long-form, a founder podcast and creator footage — on a calendar agreed before launch day.',
    result: '60+ clips a month, 3.8× reach vs long-form alone',
  },
  {
    tag: '06 // CREATIVE',
    client: 'DTC Fashion',
    sector: '$12M/yr',
    service: 'Conversion video production',
    serviceSlug: 'creative-testing',
    situation:
      'Six-week production cycles meant the account was testing last quarter’s ideas.',
    changed:
      'Moved to 48-hour production and testing cycles, with hooks varied independently of body so a losing visual treatment was never mistaken for a losing idea.',
    result: '48-hour concept-to-cut, 30 angles tested, 3.4× CTR lift',
  },
  {
    tag: '07 // OPTIMIZATION',
    client: 'DTC Jewellery',
    sector: '8-figure',
    service: 'Profit-first optimisation',
    serviceSlug: null,
    situation: 'High ROAS masked cash burn from returns and discount dependency.',
    changed:
      'Switched the optimisation target from ROAS to contribution, removed two permanent discount codes and re-cut the creative to sell on product rather than price.',
    result: '+22pts contribution margin, −38% wasted spend',
  },
  {
    tag: '08 // ITERATION',
    client: 'Multi-brand portfolio',
    sector: 'Ecommerce',
    service: 'Rapid iteration at volume',
    serviceSlug: null,
    situation:
      'Nine brands managed with inconsistent process and no shared learning.',
    changed:
      'Standardised creative testing, attribution and reporting across the portfolio, with one written decision rule: scale at threshold, kill below it, no debates.',
    result: '34% average ROAS lift, 48-hour cycles across nine brands',
  },
];

export default CASE_STUDIES;
