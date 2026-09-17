/*
 * The services section's seven cards, in the two rows the section renders them in.
 *
 * Exactly seven services, laid out as a row of three and a row of four — the cards used to be
 * declared inline in `app/page.jsx`, which is the longest file in the project and had no reason to
 * be rebuilt on every render just to hand static copy to `ServicesShowcase`.
 *
 * The last card carries a full `caseStudy` because the deck's expansion reads it; the first six
 * carry only the tag, title, copy and image the card face needs.
 */

export const row1Cards = [
  {
    tag: '01 • AUDIT',
    title: 'Find Your Revenue Leaks',
    description: 'We audit your funnel, creative, and attribution to find the 3–5 bottlenecks bleeding cash. Most brands have fixable problems worth six figures sitting in plain sight.',
    image: { src: 'https://framerusercontent.com/images/hIyXekP7SHBtRkcBBA8LoqjrdY.png' },
  },
  {
    tag: '02 • CREATIVE',
    title: 'Launch Videos That Convert',
    description: 'Product videos engineered for scroll-stopping impact. We shoot, edit, and test multiple angles to find what makes browsers buy — 48-hour turnaround.',
    image: { src: 'https://framerusercontent.com/images/xWq5qlnMo4nwNQlhbzFUKWqikwQ.jpg' },
  },
  {
    tag: '03 • AI UGC',
    title: 'AI UGC Without Creators',
    description: 'Custom AI avatars produce unlimited user-generated content. Test 10x more angles without creator bottlenecks, missed deadlines, or $300-per-video fees.',
    image: { src: 'https://framerusercontent.com/images/N6nWcGmKkdYDhvYS1RN1VoX05k.jpg' },
  },
];

export const row2Cards = [
  {
    tag: '04 • PAID MEDIA',
    title: 'Ads Built to Scale Revenue',
    description: 'Meta and TikTok campaigns optimized for profit, not vanity metrics. Weekly testing, real-time dashboards, and a strategist embedded in your Slack.',
    image: { src: 'https://framerusercontent.com/images/gO7oqH62CdjjxnyUBSU5GJTvFnk.jpg' },
  },
  {
    tag: '05 • OPTIMIZATION',
    title: 'Profit-First Optimization',
    description: 'We shift from ROAS to profit-contribution modeling — killing losers fast and scaling winners faster so every ad dollar works harder.',
    image: { src: 'https://framerusercontent.com/images/yldP1mipOxNl4NvNqiDxzXJC4bc.png' },
  },
  {
    tag: '06 • ITERATION',
    title: 'Rapid Iteration at Volume',
    description: 'Systematic A/B testing on 48-hour cycles keeps your creative pipeline fresh and your account learning, never plateauing.',
    image: { src: 'https://framerusercontent.com/images/LOUHKfxecdzS4oSB9PSeYz21fk.png' },
  },
  {
    brand: 'Creator-led commerce',
    description: 'Creators who actually convert',
    image: { src: '/images/story_portrait.jpg' },
    caseStudy: {
      tag: '09 // CREATORS',
      title: 'Influencer Marketing',
      whatWeDid: 'Source and vet creators on engagement quality rather than follower count, negotiate usage rights up front, then license their content into paid media where it consistently outperforms studio creative.',
      deliverables: ['Vetted creator roster', 'Negotiated usage rights', 'Creator content in paid'],
      stack: ['TikTok', 'Instagram', 'YouTube', 'Pinterest'],
      results: {
        primary: '3.2x', primaryLabel: 'Return on Creator Spend',
        metricA: '640+', metricALabel: 'Partnerships Negotiated', metricB: '-38%', metricBLabel: 'CAC vs Studio Creative',
        efficiency: 92, sparkline: 'M0,46 C30,44 60,30 90,32 C120,34 150,16 180,18 C210,20 235,6 260,4',
      },
    },
  },
];
