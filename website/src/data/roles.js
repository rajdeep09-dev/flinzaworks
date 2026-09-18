/*
 * The open roles on /careers.
 *
 * They lived inline in `app/careers/page.jsx`, which meant the page could render them but no
 * server component could read them — and the JobPosting structured data that makes a role eligible
 * for Google Jobs has to be emitted by the server component. Same list, one source.
 *
 * The "AI UGC Producer" role is gone: that service is not offered any more, and advertising a job
 * for work the studio has stopped selling is worse than leaving the seat empty. In its place are
 * the roles the new service set actually needs — creators, clipping and founder content.
 *
 * `type` is written the way a person reads it; `seo.js` maps it to the schema.org employment type.
 */

export const roles = [
  {
    id: 'paid-media',
    team: 'Paid Media',
    type: 'Full-Time',
    title: 'Paid Media Strategist',
    blurb: 'Own Meta budgets for 4–6 DTC brands spending $50K+ a month. You build the test plan, read the data honestly, and scale what converts — with a strategist pod and our testing engine behind you.',
    location: 'Remote · EU/US overlap',
    salary: '$60,000–$85,000/yr + performance bonus',
    do: [
      'Run full-funnel Meta campaigns for 4–6 brands',
      'Ship weekly test plans: angles, audiences, budgets',
      'Move accounts from ROAS reporting to profit contribution',
    ],
    need: [
      '2+ years managing $50K+/mo paid social spend',
      'Fluent in CAC, MER and contribution margin — not vanity metrics',
      'Comfortable killing your own darlings when the data says so',
    ],
  },
  {
    id: 'creative-strategist',
    team: 'Creative',
    type: 'Full-Time',
    title: 'Creative Strategist',
    blurb: 'Turn performance data into angles, hooks and scripts. You brief creator and founder content that stops the scroll, and you think in hook rate, CTR and thumb-stop ratio.',
    location: 'Remote · Any timezone',
    salary: '$55,000–$75,000/yr + creative win bonuses',
    do: [
      'Mine analytics and comments for winning angles',
      'Brief, script and iterate 10+ concepts per week',
      'Pair with creators and editors to ship on 48-hour cycles',
    ],
    need: [
      'A portfolio of direct-response creative that scaled',
      'Obsession with hooks and the first 1.5 seconds',
      'Ability to write like a human, not a brand deck',
    ],
  },
  {
    id: 'creator-partnerships',
    team: 'Creators',
    type: 'Full-Time',
    title: 'Creator Partnerships Manager',
    blurb: 'Build and run the creator roster. You source on engagement quality rather than follower count, negotiate rates and usage rights, and keep the roster compounding.',
    location: 'Remote · Any timezone',
    salary: '$50,000–$72,000/yr + partnership commission',
    do: [
      'Source and vet creators by engagement quality and audience fit',
      'Negotiate fees, deliverables and paid usage rights',
      'Track cost per acquired customer for every partnership',
    ],
    need: [
      'Existing creator relationships in at least one ecommerce niche',
      'A clear head for contracts and usage windows',
      'You read a media kit sceptically and you are usually right',
    ],
  },
  {
    id: 'short-form-editor',
    team: 'Creative',
    type: 'Full-Time / Contract',
    title: 'Short-Form Editor (Clipping)',
    blurb: 'Cut long-form founder and podcast footage into vertical clips that hold attention past three seconds — at volume, without the quality sliding.',
    location: 'Remote · Any timezone',
    salary: '$40,000–$60,000/yr + output bonuses',
    do: [
      'Cut 10–20 vertical clips a week from long-form source',
      'Caption, hook and finish every clip for its platform',
      'Keep a template library so output scales without drift',
    ],
    need: [
      'CapCut, Premiere or Resolve — and speed in whichever you use',
      'Instinct for the first three seconds of a clip',
      'Systems thinking: presets, templates, repeatability',
    ],
  },
  {
    id: 'growth-analyst',
    team: 'Growth',
    type: 'Full-Time',
    title: 'Growth Analyst',
    blurb: 'Own attribution, dashboards and reporting. You turn messy multi-touch data into decisions the team can act on this week — not decks nobody reads.',
    location: 'Remote · EU overlap',
    salary: '$50,000–$70,000/yr + profit share',
    do: [
      'Build and maintain real-time client dashboards',
      'Model profit contribution per channel and per creative',
      'Surface the 3–5 leaks bleeding each account',
    ],
    need: [
      'SQL plus Looker Studio or Tableau fluency',
      'Experience with MMPs, pixels and server-side tracking',
      'Allergic to vanity metrics and to slow answers',
    ],
  },
  {
    id: 'cro-designer',
    team: 'Conversion',
    type: 'Full-Time',
    title: 'CRO / Landing Page Designer',
    blurb: 'Design and ship conversion-focused landing pages and funnels. You obsess over the audit-to-first-dollar journey and ship tests on 48-hour cycles.',
    location: 'Remote · Any timezone',
    salary: '$50,000–$72,000/yr + lift bonuses',
    do: [
      'Design landing pages, PDPs and funnel flows that convert',
      'Run structured A/B programmes with the analyst pod',
      'Translate brand kits into performance-first layouts',
    ],
    need: [
      'A portfolio of landing pages with proven conversion lifts',
      'Figma mastery plus working knowledge of Webflow or Next.js',
      'Instinct for hierarchy, speed and friction removal',
    ],
  },
  {
    id: 'account-lead',
    team: 'Client Growth',
    type: 'Full-Time',
    title: 'Account Lead (Client Growth)',
    blurb: 'Be the trusted voice for our brands. Run weekly optimisation calls, keep Slack buzzing, and turn results into long-term partnerships and expansions.',
    location: 'Hybrid · Remote + quarterly onsites',
    salary: '$55,000–$80,000/yr + retention commission',
    do: [
      'Own communication for 4–6 brand relationships',
      'Run weekly calls that clients actually look forward to',
      'Spot expansion opportunities before clients ask',
    ],
    need: [
      '2+ years in agency account or growth management',
      'Writes crisp updates; presents with confidence',
      'Commercial instinct: retention and expansion are the game',
    ],
  },
];

export default roles;
