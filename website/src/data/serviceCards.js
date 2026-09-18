/*
 * The services section's eight cards, in the two rows the section renders them in.
 *
 * ── What changed, and why ──
 *
 * The old set sold "AI UGC without creators": synthetic avatars producing unlimited video. That
 * offer is gone from the site entirely, because it is not what the studio does and not what the
 * client wants to be known for. In its place are the four things that are actually sold and
 * actually run:
 *
 *   · High-converting Meta ads, built around how the algorithm really allocates spend.
 *   · Creator-led organic content — we bring the best creators for the product, and scripting,
 *     briefing and editing are handled end to end by us. This is never described as "UGC ads".
 *   · Founder-led content — shorts, reels, YouTube, podcasts.
 *   · Clipping for awareness and launches.
 *
 * The four that were already true stay: the revenue-leak audit, conversion video, profit-first
 * optimisation and 48-hour iteration. Eight services, one row of four and one row of four.
 *
 * The metric and stack a card can show are not retyped here — they are read out of the matching
 * case study in ./projects.js by tag, so the number on the service card and the number in the
 * focused case study are the same number by construction.
 */

import { carouselProjects } from './projects';

/** The proof a card shows, taken from the case study with the same tag. */
function proofFor(tag) {
  const project = carouselProjects.find((item) => item.caseStudy?.tag === tag);
  if (!project) return {};
  return { results: project.caseStudy.results, stack: project.caseStudy.stack };
}

export const row1Cards = [
  {
    tag: '01 • AUDIT',
    title: 'Find Your Revenue Leaks',
    description:
      'We audit funnel, creative and attribution, then rank the three to five bottlenecks by what each one costs you per month. Most brands have six figures of fixable loss sitting in plain sight.',
    image: { src: 'https://framerusercontent.com/images/hIyXekP7SHBtRkcBBA8LoqjrdY.png' },
    caseStudy: proofFor('01 // REVENUE AUDIT'),
  },
  {
    tag: '02 • META ADS',
    title: 'High-Converting Meta Ads',
    description:
      'We know exactly how the Meta algorithm allocates spend and reads creative signals. Campaigns are built around profit rather than the platform\u2019s ROAS, and rebuilt every week as the data moves.',
    image: { src: 'https://framerusercontent.com/images/gO7oqH62CdjjxnyUBSU5GJTvFnk.jpg' },
    caseStudy: proofFor('02 // META ADS'),
  },
  {
    tag: '03 • CREATORS',
    title: 'Creators Who Actually Convert',
    description:
      'We bring the best creators in your niche to promote your product. Scripting, briefing, editing and paid usage rights are handled end to end by us \u2014 you approve the cut, we ship it.',
    image: { src: '/images/story_portrait.jpg' },
    caseStudy: proofFor('03 // CREATORS'),
  },
  {
    tag: '04 • FOUNDER-LED',
    title: 'Founder-Led Content',
    description:
      'Your face is the highest-trust asset you own. One shoot a month becomes shorts, reels, YouTube videos and even podcast episodes \u2014 scripted, edited and cut for paid by us.',
    image: { src: 'https://framerusercontent.com/images/yldP1mipOxNl4NvNqiDxzXJC4bc.png' },
    caseStudy: proofFor('04 // FOUNDER-LED'),
  },
];

export const row2Cards = [
  {
    tag: '05 • CLIPPING',
    title: 'Clipping for Awareness & Launches',
    description:
      'A high-volume clipping engine: dozens of vertical cut-downs a month from long-form, podcasts and creator footage, timed to keep you loud through launch week and the weeks either side of it.',
    image: { src: 'https://framerusercontent.com/images/MClVeYvMtXA3CRA1iECQ1CPv5c.png' },
    caseStudy: proofFor('05 // CLIPPING'),
  },
  {
    tag: '06 • CREATIVE',
    title: 'Launch Videos That Convert',
    description:
      'Product video engineered for conversion, shot and edited on 48-hour cycles. Multiple angles per cycle, so a winner surfaces inside two weeks instead of two months.',
    image: { src: 'https://framerusercontent.com/images/xWq5qlnMo4nwNQlhbzFUKWqikwQ.jpg' },
    caseStudy: proofFor('06 // CREATIVE'),
  },
  {
    tag: '07 • OPTIMIZATION',
    title: 'Profit-First Optimization',
    description:
      'We move you off ROAS and onto profit-contribution modelling \u2014 what is actually left after spend, fees and returns \u2014 then kill losers fast and scale winners faster.',
    image: { src: 'https://framerusercontent.com/images/LOUHKfxecdzS4oSB9PSeYz21fk.png' },
    caseStudy: proofFor('07 // OPTIMIZATION'),
  },
  {
    tag: '08 • ITERATION',
    title: 'Rapid Iteration at Volume',
    description:
      'Systematic A/B testing on 48-hour cycles with one written decision rule: scale at threshold, kill below it, no debates. Your account keeps learning instead of plateauing.',
    image: { src: 'https://framerusercontent.com/images/N6nWcGmKkdYDhvYS1RN1VoX05k.jpg' },
    caseStudy: proofFor('08 // ITERATION'),
  },
];

export const allServiceCards = [...row1Cards, ...row2Cards];

export default allServiceCards;
