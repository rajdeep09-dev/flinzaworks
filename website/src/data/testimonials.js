/*
 * One source of truth for client voices.
 *
 * Both the focused case-study stage (item 8) and the contact page's circular
 * carousel + glass widget (item 9) render the same testimonial structure —
 * quote, avatar, name, role — so they read from here rather than drifting
 * apart as two hand-maintained copies.
 */

/** Attached to a case study by its tag, so the quote always matches the work shown. */
export const caseStudyTestimonials = {
  '01 // REVENUE AUDIT': {
    quote:
      'The collaboration felt clear, structured, and refreshingly straightforward from the very beginning. Our ideas were not only understood but translated into a design that genuinely reflects who we are.',
    name: 'Olivia Bennett',
    role: 'Founder, Northline Studio',
    avatar: '/images/avatar_elena.jpg',
  },
  '02 // CREATIVE': {
    quote:
      'Six weeks of production turned into forty-eight hours. We now test more angles in a single week than we used to ship in a quarter.',
    name: 'Sofia Marchetti',
    role: 'Co-founder, Casa Verde',
    avatar: '/images/avatar_sarah.jpg',
  },
  '03 // AI UGC': {
    quote:
      'We were paying three hundred dollars a video and waiting on creators. Now we produce unlimited variants and the only bottleneck is how fast we can test.',
    name: 'Marcus Bell',
    role: 'VP Growth, Northline',
    avatar: '/images/avatar_marcus.png',
  },
  '04 // PAID MEDIA': {
    quote:
      'They rebuilt our account structure from the ground up. CAC dropped inside the first month and it has held through two seasonal spikes.',
    name: 'Jonas Weber',
    role: 'Ecommerce Director, Trail & Peak',
    avatar: '/images/avatar_charlie.png',
  },
  '05 // OPTIMIZATION': {
    quote:
      'Every recommendation came with the numbers behind it. Nothing was guesswork, and the conversion lifts compounded faster than we projected.',
    name: 'Priya Raman',
    role: 'CMO, Lumen Skincare',
    avatar: '/images/avatar_elena.jpg',
  },
  '06 // ITERATION': {
    quote:
      'The speed of iteration is the part that surprised us most. Feedback on Monday was live by Wednesday, every week, without a single dropped deadline.',
    name: 'Charlie Nguyen',
    role: 'Founder, Halo Coffee',
    avatar: '/images/avatar_charlie.png',
  },
  '07 // OPERATIONS': {
    quote:
      'They untangled a reporting mess four agencies had left behind. For the first time we can see exactly which channel pays for itself.',
    name: 'Sarah Whitfield',
    role: 'Marketing Director, Fieldwright',
    avatar: '/images/avatar_sarah.jpg',
  },
  '08 // SCALE': {
    quote:
      'We doubled spend and kept efficiency. That is the whole game, and they made it look routine.',
    name: 'Daniel Okafor',
    role: 'Head of Growth, Novelle Atelier',
    avatar: '/images/avatar_marcus.png',
  },
};

/** Drives the contact page's orbiting carousel (item 9). */
export const contactTestimonials = Object.values(caseStudyTestimonials);

/** Attach the matching quote to a carousel project without touching its copy. */
export function withCaseStudyTestimonial(project) {
  const tag = project?.caseStudy?.tag;
  const testimonial = tag ? caseStudyTestimonials[tag] : undefined;
  if (!testimonial || project.caseStudy.testimonial) return project;
  return { ...project, caseStudy: { ...project.caseStudy, testimonial } };
}
