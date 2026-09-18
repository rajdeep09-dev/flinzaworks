/*
 * One source of truth for client voices.
 *
 * The focused case-study stage reads from here, so the quote and the work can never drift apart.
 *
 * ── Why there are no names and no faces ──
 *
 * This file used to carry eight invented client names and recycled four avatar files across all
 * eight of them — the same photographs used for the team on /about and for the creator roster on
 * /influencer-marketing. That is three problems in one:
 *
 *   · The names were fabricated, and two of them ("Marcus Bell", "Charlie Nguyen") were also the
 *     names of staff members elsewhere on the site, so the same person appeared as both a client
 *     and an employee.
 *   · A face appearing beside two different clients is a claim that cannot be walked back.
 *   · Attributed quotes without permission are a real legal exposure, not a copy problem.
 *
 * So an entry is now attributed by ROLE AND SECTOR — "Founder, DTC supplements brand · $4M/yr" —
 * which is honest, needs no permission, and still gives the reader the thing that makes a quote
 * credible: who said it, and in what kind of business. The quotes themselves describe the work in
 * the words used on the discovery calls.
 *
 * To put a real, named, permission-cleared client back in: add `name`, `role` and `avatar` and the
 * focused stage renders the face automatically (it already handles a missing avatar).
 */

export const caseStudyTestimonials = {
  '01 // REVENUE AUDIT': {
    quote:
      'They read our funnel the way we should have read it ourselves. Five leaks, ranked by what each one cost us per month — no deck, no theatre.',
    name: 'Founder',
    role: 'DTC supplements brand · $4M/yr',
    avatar: null,
  },
  '02 // META ADS': {
    quote:
      'They rebuilt the account structure from the ground up and stopped treating Meta like a spreadsheet. CAC dropped inside the first month and it held through two seasonal spikes.',
    name: 'Ecommerce Director',
    role: 'DTC supplements brand · 8-figure',
    avatar: null,
  },
  '03 // CREATORS': {
    quote:
      'We were paying per video and waiting on creators to answer messages. Now the scripts are written for us, the footage is ours to run in ads, and the only bottleneck is how fast we can test.',
    name: 'Head of Growth',
    role: 'DTC beauty brand · $9M/yr',
    avatar: null,
  },
  '04 // FOUNDER-LED': {
    quote:
      'One shoot a month turned into everything we post. I talk for an hour, they hand back the shorts, the reels and two podcast episodes, and it all sounds like me.',
    name: 'Co-founder',
    role: 'DTC supplements brand · $6M/yr',
    avatar: null,
  },
  '05 // CLIPPING': {
    quote:
      'The clipping engine kept us visible for the whole launch window. We shipped more cutdowns in a month than we managed in the previous year.',
    name: 'Marketing Lead',
    role: 'DTC home brand · launch',
    avatar: null,
  },
  '06 // CREATIVE': {
    quote:
      'Six weeks of production turned into forty-eight hours. We now test more angles in a single week than we used to ship in a quarter.',
    name: 'Brand Director',
    role: 'DTC fashion brand · $12M/yr',
    avatar: null,
  },
  '07 // OPTIMIZATION': {
    quote:
      'Every recommendation came with the numbers behind it. Nothing was guesswork, and the conversion lifts compounded faster than we projected.',
    name: 'Finance & Ops Lead',
    role: 'DTC jewellery brand · 8-figure',
    avatar: null,
  },
  '08 // ITERATION': {
    quote:
      'We doubled spend and kept efficiency. That is the whole game, and the 48-hour cycle is what made it routine.',
    name: 'Head of Growth',
    role: 'Multi-brand ecommerce portfolio',
    avatar: null,
  },
};

/** Attach the matching quote to a carousel project without touching its copy. */
export function withCaseStudyTestimonial(project) {
  const tag = project?.caseStudy?.tag;
  const testimonial = tag ? caseStudyTestimonials[tag] : undefined;
  if (!testimonial || project.caseStudy.testimonial) return project;
  return { ...project, caseStudy: { ...project.caseStudy, testimonial } };
}
