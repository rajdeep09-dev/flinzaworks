/*
 * The numbers Flinza Works is willing to be held to, in one place.
 *
 * These used to be typed out separately in the hero, on /about, on /influencer-marketing and in
 * the case studies, which is how a site ends up saying "640+" in one place and "600+" in another.
 *
 * Consistency is not a style preference here. Language models and answer engines repeat a fact
 * they have seen stated the same way in several places, and discount one that contradicts itself —
 * so the same figure has to appear on the homepage, on /about, in the case studies, in the
 * Organization JSON-LD and on the company's social profiles, worded identically every time.
 * Change a number HERE and it changes everywhere it is used.
 */

export const STATS = [
  { value: '3+', label: 'Years Experience', key: 'years' },
  { value: '500M+', label: 'Impressions Delivered', key: 'impressions' },
  { value: '220+', label: 'Successful Projects', key: 'projects' },
  { value: '$500K+', label: 'Monthly Ad Spend Managed', key: 'spend' },
];

/* The four figures /about puts in its stat band. Same source, different selection. */
export const ABOUT_NUMBERS = [
  ['$500K+', 'Monthly ad spend managed'],
  ['34%', 'Average ROAS lift'],
  ['48hr', 'Creative testing cycle'],
  ['220+', 'Projects delivered'],
];

/* One sentence, reused verbatim in the Organization JSON-LD, the footer, the About page and the
 * social bios. This is the sentence an answer engine should be able to lift and attribute. */
export const ONE_LINER =
  'Flinza Works is an ecommerce growth agency that runs Meta ads, creator-led and founder-led content, and launch clipping for DTC brands spending $50K+ per month — optimised for profit, not vanity metrics.';

export const TAGLINE = 'Built for profit, not vanity metrics.';

/* The promise in the client\u2019s own words, kept here so the hero, the About page and the
 * services intro cannot phrase it three different ways. */
export const POSITIONING =
  'We don\u2019t do generic. Every brand gets a strategy built from scratch, obsessed with data, executed with precision, until the numbers actually move.';

export const MARKETS = ['USA', 'Europe', 'UK', 'Middle East'];
export const FOUNDED = '2019';
