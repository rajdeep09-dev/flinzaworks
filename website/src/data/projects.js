/*
 * The carousel's eight projects — data, not layout.
 *
 * These were declared inline in `app/page.jsx`, which is already the longest file in the project.
 * They are the same shape as `testimonials.js` and `faqs.js` next to them and they never change at
 * runtime, so they live here.
 *
 * Each entry carries its own case study, which is what the focused stage renders when a card is
 * clicked. `withCaseStudyTestimonial()` (see ./testimonials.js) attaches the matching quote by tag
 * before the list is handed to the carousel, so the quote and the work can never drift apart.
 *
 * ── Naming rule ──
 * Every brand here is either a real client name we are allowed to use or an anonymised label of
 * the same shape ("DTC Beauty · $9M/yr"). There are deliberately NO invented brand names: a made-up
 * logo is the one thing on an agency site that is trivially checkable and instantly fatal. The tag
 * before each title names the service the work proves, and the eight tags line up one-to-one with
 * the eight services in ./serviceCards.js so the case study index and the services section cannot
 * disagree about what we sell.
 */

export const carouselProjects = [
  {
    brand: 'StillRing · Supplements',
    description: 'Revenue-leak audit → +$412K recovered',
    image: { src: 'https://framerusercontent.com/images/gO7oqH62CdjjxnyUBSU5GJTvFnk.jpg?scale-down-to=1200' },
    caseStudy: {
      tag: '01 // REVENUE AUDIT',
      title: 'Funnel & Attribution Audit',
      whatWeDid: 'Audited funnel, creative, and attribution for a DTC supplement brand plateaued at $4M with climbing CAC, surfacing the bottlenecks bleeding cash.',
      deliverables: ['Funnel conversion analysis', 'Creative performance audit', 'Attribution model review'],
      stack: ['GA4', 'Triple Whale', 'Meta Ads', 'Northbeam'],
      results: {
        primary: '+$412K', primaryLabel: 'Recovered Annual Revenue',
        metricA: '5', metricALabel: 'Leaks Found', metricB: '2.1x', metricBLabel: 'AOV Lift',
        efficiency: 88, sparkline: 'M0,45 C30,40 60,20 90,25 C120,30 150,10 180,14 C210,18 235,4 260,3',
      },
    },
  },
  {
    brand: 'StillRing · Paid Media',
    description: 'ROAS 1.8x → 4.2x in two weeks',
    image: { src: 'https://framerusercontent.com/images/hIyXekP7SHBtRkcBBA8LoqjrdY.png?scale-down-to=1200' },
    caseStudy: {
      tag: '02 // META ADS',
      title: 'Profit-First Meta Ads',
      whatWeDid: 'Rebuilt the Meta account around how the algorithm actually allocates spend and how it reads creative signals — then tested 30 angles in two weeks to find the winner.',
      deliverables: ['Signal-first account structure', 'Weekly creative testing', 'Profit-based budget rules'],
      stack: ['Meta Ads', 'Triple Whale', 'Northbeam', 'Slack'],
      results: {
        primary: '4.2x', primaryLabel: 'Blended ROAS (from 1.8x)',
        metricA: '+89%', metricALabel: 'Revenue in 12 Weeks', metricB: '-31%', metricBLabel: 'Lower CAC',
        efficiency: 90, sparkline: 'M0,42 C30,40 60,22 90,26 C120,30 150,10 180,14 C210,17 235,4 260,3',
      },
    },
  },
  {
    brand: 'DTC Beauty · $9M/yr',
    description: 'Creator content licensed into paid',
    image: { src: 'https://framerusercontent.com/images/NtPZeRtjx0XeN3bHzsMaygic3Hs.jpg?scale-down-to=1200' },
    caseStudy: {
      tag: '03 // CREATORS',
      title: 'Creators, Briefed End to End',
      whatWeDid: 'Sourced and vetted a creator roster on engagement quality rather than follower count, wrote and directed every script in house, then licensed the footage into paid media where it beat studio creative outright.',
      deliverables: ['Vetted creator roster', 'In-house scripting & editing', 'Paid usage rights cleared'],
      stack: ['TikTok', 'Instagram', 'YouTube', 'Meta Ads'],
      results: {
        primary: '3.2x', primaryLabel: 'Return on Creator Spend',
        metricA: '-38%', metricALabel: 'CAC vs Studio Creative', metricB: '10x', metricBLabel: 'More Angles Tested',
        efficiency: 95, sparkline: 'M0,44 C35,44 65,30 95,32 C125,34 155,14 185,16 C215,18 235,6 260,3',
      },
    },
  },
  {
    brand: 'DTC Supplements · $6M/yr',
    description: 'Founder-led clips, paid social ready',
    image: { src: 'https://framerusercontent.com/images/yldP1mipOxNl4NvNqiDxzXJC4bc.png?scale-down-to=1200' },
    caseStudy: {
      tag: '04 // FOUNDER-LED',
      title: 'Founder-Led Content Engine',
      whatWeDid: 'Shot the founder once a month and turned a single session into shorts, reels, YouTube cuts and two podcast episodes — scripted, edited and cut for paid social by us, not handed back as raw files.',
      deliverables: ['Monthly founder shoot', 'Shorts, reels & YouTube edits', 'Podcast production & clipping'],
      stack: ['YouTube', 'Reels', 'Shorts', 'Podcasts'],
      results: {
        primary: '48hr', primaryLabel: 'Shoot-to-Publish Turnaround',
        metricA: '120+', metricALabel: 'Assets Per Quarter', metricB: '2.4x', metricBLabel: 'Hook-Rate Lift',
        efficiency: 92, sparkline: 'M0,48 C25,42 55,25 85,28 C115,31 145,12 175,15 C205,18 235,5 260,2',
      },
    },
  },
  {
    brand: 'DTC Home · Launch',
    description: 'Clipping engine for launch week',
    image: { src: 'https://framerusercontent.com/images/MClVeYvMtXA3CRA1iECQ1CPv5c.png?scale-down-to=1200' },
    caseStudy: {
      tag: '05 // CLIPPING',
      title: 'Clipping for Launch Week',
      whatWeDid: 'Ran a high-volume clipping engine across the launch window — dozens of cut-downs per week from long-form, a founder podcast and creator footage — so awareness never went quiet between media pushes.',
      deliverables: ['High-volume clip production', 'Launch-week publishing calendar', 'Paid-ready vertical cutdowns'],
      stack: ['TikTok', 'Reels', 'Shorts', 'Meta Ads'],
      results: {
        primary: '60+', primaryLabel: 'Clips Shipped Per Month',
        metricA: '3.8x', metricALabel: 'Reach vs Long-Form Only', metricB: '11 days', metricBLabel: 'To Launch Sell-Out',
        efficiency: 91, sparkline: 'M0,45 C30,40 60,20 90,25 C120,30 150,10 180,14 C210,18 235,4 260,3',
      },
    },
  },
  {
    brand: 'DTC Fashion · $12M/yr',
    description: '48hr concept-to-cut product video',
    image: { src: 'https://framerusercontent.com/images/K4sA5mbjMww6nIFRSGkWZeB2OI.jpg?scale-down-to=1200' },
    caseStudy: {
      tag: '06 // CREATIVE',
      title: 'Scroll-Stopping Product Video',
      whatWeDid: 'Shot, edited, and multi-angle tested product video for a fashion brand whose six-week production cycles were killing agility.',
      deliverables: ['Conversion-led product video', 'Multi-angle testing', 'Optimised for Meta / TikTok'],
      stack: ['Premiere Pro', 'Meta Ads', 'TikTok', 'Frame.io'],
      results: {
        primary: '48hr', primaryLabel: 'Concept-to-Cut Turnaround',
        metricA: '30', metricALabel: 'Angles Tested', metricB: '3.4x', metricBLabel: 'CTR Lift',
        efficiency: 92, sparkline: 'M0,48 C25,42 55,25 85,28 C115,31 145,12 175,15 C205,18 235,5 260,2',
      },
    },
  },
  {
    brand: 'DTC Jewellery · 8-figure',
    description: 'High ROAS, low profit → fixed',
    image: { src: 'https://framerusercontent.com/images/LOUHKfxecdzS4oSB9PSeYz21fk.png?scale-down-to=1200' },
    caseStudy: {
      tag: '07 // OPTIMIZATION',
      title: 'Profit Contribution Modelling',
      whatWeDid: 'Shifted a jewellery brand from ROAS optimisation to profit-contribution modelling after discovering high ROAS was masking cash burn.',
      deliverables: ['Profit margin optimisation', 'Contribution modelling', 'Wasted-spend elimination'],
      stack: ['Northbeam', 'GA4', 'Meta Ads', 'Sheets'],
      results: {
        primary: '+22pts', primaryLabel: 'Contribution Margin',
        metricA: '-38%', metricALabel: 'Wasted Spend Cut', metricB: '2.6x', metricBLabel: 'Profit Multiple',
        efficiency: 93, sparkline: 'M0,40 C30,35 60,15 90,20 C120,25 150,6 180,8 C210,12 235,2 260,1',
      },
    },
  },
  {
    brand: 'DTC Health · Multi-brand',
    description: '48-hour cycles, 34% avg ROAS lift',
    image: { src: 'https://framerusercontent.com/images/KJSVx7BZQys31ERwSHo7766lQg.png?scale-down-to=1200' },
    caseStudy: {
      tag: '08 // ITERATION',
      title: '48-Hour Testing Engine',
      whatWeDid: 'Installed a fixed decision rule — scale at threshold, kill below it, no debates — and ran every account on 48-hour creative cycles so a winning angle in one brand was tested in the rest.',
      deliverables: ['Rapid iteration framework', 'Weekly optimisation calls', 'Transparent dashboards'],
      stack: ['Meta Ads', 'TikTok Ads', 'A/B Framework', 'Looker'],
      results: {
        primary: '48hr', primaryLabel: 'Testing Cycles',
        metricA: '34%', metricALabel: 'Avg ROAS Lift', metricB: '120+', metricBLabel: 'Variants / Quarter',
        efficiency: 96, sparkline: 'M0,45 C30,40 60,20 90,25 C120,30 150,10 180,14 C210,18 235,4 260,3',
      },
    },
  },
];

export default carouselProjects;
