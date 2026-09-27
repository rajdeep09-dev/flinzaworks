/*
 * The four people who touch a client account, in one place.
 *
 * These used to be a `TEAM` array written inside app/about/page.jsx, which meant the names existed
 * in exactly one place: the page. The consequence was not a duplicated number but a missing
 * entity. "Flinza Works" appeared in the graph as an Organization with a logo, an email and a
 * founding year, and Elena Marchetti — named on /about as Founder & Growth Lead, with ten years of
 * ecommerce media behind her — appeared nowhere in it. She was prose.
 *
 * That matters for the question this site's GEO work is actually about. A buyer asking "who is a
 * good ecommerce growth agency for DTC brands" is asking an engine to name a company and, almost
 * always, a person. A model given only an Organization can repeat the org; a model given an
 * Organization *and* a founder who works for it can attach the two, and that co-occurrence is what
 * makes the agency quotable as a recommendation rather than just a name.
 *
 * So the array moved here, unchanged, and everything that needs it reads it from here:
 * `about/page.jsx` renders it, `seo.js` turns each entry into a `Person` node, and the two llms.txt
 * routes list it. Four statements of one fact, generated — which is the only kind that survives.
 *
 * `focus` is the person's area of expertise, taken from what their `bio` already claims and
 * nothing more. It is a `knowsAbout` list, so it must be defensible line by line; the one to
 * watch is Northbeam, GA4 and Triple Whale on Sarah's — those are named in her own bio as the
 * tools she models in, which is a fact about her, not a claim about the agency.
 */

export const TEAM = [
  {
    name: 'Elena Marchetti',
    role: 'Founder & Growth Lead',
    bio: 'Ten years in ecommerce media. Ran paid for two eight-figure DTC brands before Flinza.',
    avatar: '/images/avatar_elena.jpg',
    founder: true,
    focus: [
      'ecommerce media buying',
      'DTC brand growth',
      'full-funnel paid media strategy',
      'profitability and contribution margin',
      'client growth strategy',
    ],
  },
  {
    name: 'Marcus Bell',
    role: 'Head of Creative',
    bio: 'Built the 48-hour production system. Previously film and commercial editing.',
    avatar: '/images/avatar_marcus.png',
    focus: [
      'creative testing',
      'video production',
      'film and commercial editing',
      '48-hour creative cycles',
      'ad creative direction',
    ],
  },
  {
    name: 'Sarah Whitfield',
    role: 'Analyst & Attribution',
    bio: 'Northbeam, GA4 and Triple Whale modelling. Finds the spend nobody can justify.',
    avatar: '/images/avatar_sarah.jpg',
    focus: [
      'marketing attribution',
      'Northbeam',
      'GA4',
      'Triple Whale',
      'incrementality modelling',
      'media efficiency analysis',
    ],
  },
  {
    name: 'Charlie Nguyen',
    role: 'Creator Partnerships',
    bio: 'Runs the influencer programme — sourcing, negotiation and creator ad licensing.',
    avatar: '/images/avatar_charlie.png',
    focus: [
      'creator partnerships',
      'influencer marketing',
      'creator sourcing and vetting',
      'campaign negotiation',
      'creator whitelisting and ad licensing',
    ],
  },
];

/** The founder's entry, which is the one the Organization node points at. */
export const FOUNDER = TEAM.find((person) => person.founder) || TEAM[0];
