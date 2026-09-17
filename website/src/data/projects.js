/*
 * The hero carousel's eight projects — data, not layout.
 *
 * These were declared inline in `app/page.jsx`, which is already the longest file in the project.
 * They are the same shape as `testimonials.js` and `faqs.js` next to them and they never change at
 * runtime, so they live here.
 *
 * Each entry carries its own case study, which is what the focused stage renders when a card is
 * clicked. `withCaseStudyTestimonial()` (see ./testimonials.js) attaches the matching quote by tag
 * before the list is handed to the carousel, so the quote and the work can never drift apart.
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
    brand: 'Fashion Ecom · $12M/yr',
    description: '48hr concept-to-cut product video',
    image: { src: 'https://framerusercontent.com/images/K4sA5mbjMww6nIFRSGkWZeB2OI.jpg?scale-down-to=1200' },
    caseStudy: {
      tag: '02 // CREATIVE',
      title: 'Scroll-Stopping Product Video',
      whatWeDid: 'Shot, edited, and multi-angle tested product video for a fashion brand whose 6-week production cycles were killing agility.',
      deliverables: ['AI-enhanced product videos', 'Multi-angle testing', 'Optimized for Meta / TikTok'],
      stack: ['Premiere Pro', 'Runway', 'Meta Ads', 'TikTok'],
      results: {
        primary: '48hr', primaryLabel: 'Concept-to-Cut Turnaround',
        metricA: '30', metricALabel: 'Angles Tested', metricB: '3.4x', metricBLabel: 'CTR Lift',
        efficiency: 92, sparkline: 'M0,48 C25,42 55,25 85,28 C115,31 145,12 175,15 C205,18 235,5 260,2',
      },
    },
  },
  {
    brand: 'DTC Beauty',
    description: 'AI avatar UGC at $50 per video',
    image: { src: 'https://framerusercontent.com/images/NtPZeRtjx0XeN3bHzsMaygic3Hs.jpg?scale-down-to=1200' },
    caseStudy: {
      tag: '03 // AI UGC',
      title: 'AI Avatar UGC System',
      whatWeDid: 'Trained custom AI avatars to produce unlimited user-generated content, removing creator bottlenecks and $300-per-video fees.',
      deliverables: ['Custom AI avatar training', 'Unlimited variant production', 'Systematic angle testing'],
      stack: ['AI Avatars', 'UGC Pipeline', 'Meta Ads', 'TikTok'],
      results: {
        primary: '$50', primaryLabel: 'Cost Per Video vs $300+',
        metricA: '10x', metricALabel: 'More Angles Tested', metricB: '0', metricBLabel: 'Creator Bottlenecks',
        efficiency: 95, sparkline: 'M0,44 C35,44 65,30 95,32 C125,34 155,14 185,16 C215,18 235,6 260,3',
      },
    },
  },
  {
    brand: 'StillRing · Paid Media',
    description: 'ROAS 1.8x → 4.2x in two weeks',
    image: { src: 'https://framerusercontent.com/images/hIyXekP7SHBtRkcBBA8LoqjrdY.png?scale-down-to=1200' },
    caseStudy: {
      tag: '04 // PAID MEDIA',
      title: 'Profit-First Meta & TikTok',
      whatWeDid: 'Rebuilt Meta and TikTok campaigns around profit, not vanity metrics — testing 30 angles in two weeks to find the winner.',
      deliverables: ['Profit-first optimization', 'Weekly creative testing', 'Real-time Slack access'],
      stack: ['Meta Ads', 'TikTok Ads', 'Triple Whale', 'Slack'],
      results: {
        primary: '4.2x', primaryLabel: 'Blended ROAS (from 1.8x)',
        metricA: '+89%', metricALabel: 'Revenue in 12 Weeks', metricB: '-31%', metricBLabel: 'Lower CAC',
        efficiency: 90, sparkline: 'M0,42 C30,40 60,22 90,26 C120,30 150,10 180,14 C210,17 235,4 260,3',
      },
    },
  },
  {
    brand: 'Jewellery Brand',
    description: 'High ROAS, low profit → fixed',
    image: { src: 'https://framerusercontent.com/images/LOUHKfxecdzS4oSB9PSeYz21fk.png?scale-down-to=1200' },
    caseStudy: {
      tag: '05 // OPTIMIZATION',
      title: 'Profit Contribution Modeling',
      whatWeDid: 'Shifted a jewellery brand from ROAS optimization to profit-contribution modeling after discovering high ROAS was masking cash burn.',
      deliverables: ['Profit margin optimization', 'Contribution modeling', 'Wasted-spend elimination'],
      stack: ['Northbeam', 'GA4', 'Meta Ads', 'Sheets'],
      results: {
        primary: '+22pts', primaryLabel: 'Contribution Margin',
        metricA: '-38%', metricALabel: 'Wasted Spend Cut', metricB: '2.6x', metricBLabel: 'Profit Multiple',
        efficiency: 93, sparkline: 'M0,40 C30,35 60,15 90,20 C120,25 150,6 180,8 C210,12 235,2 260,1',
      },
    },
  },
  {
    brand: 'Flinza Testing Engine',
    description: '48-hour cycles, 34% avg ROAS lift',
    image: { src: 'https://framerusercontent.com/images/MClVeYvMtXA3CRA1iECQ1CPv5c.png?scale-down-to=1200' },
    caseStudy: {
      tag: '06 // ITERATION',
      title: '48-Hour Testing Engine',
      whatWeDid: 'Run systematic A/B testing on 48-hour cycles across every account, killing losers fast and scaling winners faster.',
      deliverables: ['Rapid iteration framework', 'Weekly optimization calls', 'Transparent dashboards'],
      stack: ['Meta Ads', 'TikTok Ads', 'A/B Framework', 'Looker'],
      results: {
        primary: '48hr', primaryLabel: 'Testing Cycles',
        metricA: '34%', metricALabel: 'Avg ROAS Lift', metricB: '120+', metricBLabel: 'Variants / Quarter',
        efficiency: 96, sparkline: 'M0,45 C30,40 60,20 90,25 C120,30 150,10 180,14 C210,18 235,4 260,3',
      },
    },
  },
  {
    brand: 'Embedded Growth Pod',
    description: 'Strategist in your Slack, weekly calls',
    image: { src: 'https://framerusercontent.com/images/yldP1mipOxNl4NvNqiDxzXJC4bc.png?scale-down-to=1200' },
    caseStudy: {
      tag: '07 // OPERATIONS',
      title: 'Embedded Growth Pod',
      whatWeDid: 'Embed a strategist directly in your Slack with weekly optimization calls — challenging assumptions instead of taking orders.',
      deliverables: ['Real-time Slack access', 'Weekly optimization calls', 'Assumption-challenging strategy'],
      stack: ['Slack', 'Notion', 'Loom', 'Looker'],
      results: {
        primary: '24/7', primaryLabel: 'Real-Time Slack Access',
        metricA: 'Weekly', metricALabel: 'Optimization Calls', metricB: '0', metricBLabel: 'Order-Taker Meetings',
        efficiency: 97, sparkline: 'M0,48 C25,42 55,25 85,28 C115,31 145,12 175,15 C205,18 235,5 260,2',
      },
    },
  },
  {
    brand: 'Flinza Works · Agency',
    description: '$500K+ monthly spend managed',
    image: { src: 'https://framerusercontent.com/images/KJSVx7BZQys31ERwSHo7766lQg.png?scale-down-to=1200' },
    caseStudy: {
      tag: '08 // SCALE',
      title: '$500K+ Spend Managed',
      whatWeDid: 'Manage over half a million dollars in monthly ad spend across ecommerce brands, optimized for profit margin at volume.',
      deliverables: ['Multi-brand account management', 'Profit-first budget allocation', 'Volume creative execution'],
      stack: ['Meta Ads', 'TikTok Ads', 'Google Ads', 'Triple Whale'],
      results: {
        primary: '$500K+', primaryLabel: 'Monthly Spend Managed',
        metricA: '9', metricALabel: 'Brands Scaled', metricB: '3.1x', metricBLabel: 'Avg Revenue Multiple',
        efficiency: 94, sparkline: 'M0,44 C35,44 65,30 95,32 C125,34 155,14 185,16 C215,18 235,6 260,3',
      },
    },
  },
];
