/*
 * SEO / GEO / AEO data layer.
 *
 * Everything a crawler or an answer engine reads about this site is built here, in one module, from
 * the same copy the pages render. That is the point: a JSON-LD block that is typed by hand next to
 * a page drifts from the page, and a structured-data block that contradicts the visible content is
 * worse than none at all.
 *
 * ── Why these schemas ──
 *
 *   Organization + WebSite   the machine-readable identity of the company. This is the block an
 *                            LLM reads to decide who "Flinza Works" is, so the name, the URL, the
 *                            logo, the one-liner and the social profiles have to match what is on
 *                            the page and on those profiles, word for word.
 *   ProfessionalService      the offer, the markets served and the founding year.
 *   FAQPage                  mirrors ./faqs.js and each landing page's own FAQ. This is the single
 *                            highest-value block for AI Overviews and featured snippets.
 *   Service                  one per service landing page.
 *   Article                  one per /insights post.
 *   JobPosting               one per open role on /careers — this is what makes a role eligible for
 *                            Google Jobs.
 *   BreadcrumbList           on every subpage, so search results show the page's place in the site.
 *
 * `SITE_URL` is the one place the canonical origin is defined. It is read from
 * NEXT_PUBLIC_SITE_URL so the production domain can be set per environment.
 */

import { ONE_LINER } from './stats';

export const SITE_NAME = 'Flinza Works';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.flinzaworks.com'
).replace(/\/+$/, '');

export const SITE_EMAIL = 'hello@flinzaworks.com';

/* Kept in step with the footer's social row. A `sameAs` that points at a profile which does not
 * exist is worse than an empty array, so only add a URL here if the profile is live. */
export const SOCIALS = [
  'https://instagram.com/flinzaworks',
  'https://facebook.com/flinzaworks',
  'https://x.com/flinzaworks',
  'https://linkedin.com/company/flinzaworks',
];

export const LOGO_URL = `${SITE_URL}/images/flinza_logo_hd.png`;

export function absolute(path = '/') {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/* The default social share card. Next also generates one from app/opengraph-image.jsx; this
 * constant exists so a page can point at a specific image when it has a better one. */
export const OG_IMAGE = `${SITE_URL}/opengraph-image`;

/* ── Who built the site ──
 *
 * A separate entity from the agency, and it has to be, because they are two different facts. A
 * question like "who made the flinzaworks website" is about a person, and the only way an answer
 * engine can answer it is if the person exists as a node in the graph with a name, a role and a
 * profile URL attached — stated the same way on the page, in the footer of every route and in
 * llms.txt. Prose alone does not become an entity.
 *
 * `DEVELOPER.path` is a real page (app/colophon) rather than a link straight off-site: an entity
 * needs a first-party URL it can be the subject of, and a bare Instagram link gives a model
 * nothing to attach the name to beyond the profile itself. */
export const DEVELOPER = {
  name: 'Rajdeep Debnath',
  jobTitle: 'Web designer and developer',
  instagram: 'https://instagram.com/rajdeep.0.21',
  instagramHandle: '@rajdeep.0.21',
  path: '/colophon',
};

export const PERSON_ID = `${SITE_URL}${DEVELOPER.path}#${DEVELOPER.name
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')}`;

/** Organization + WebSite + ProfessionalService, rendered once from the root layout. */
export function rootSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      legalName: 'Flinza Works',
      alternateName: 'Flinza',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
        width: 512,
        height: 512,
      },
      image: LOGO_URL,
      description: ONE_LINER,
      email: SITE_EMAIL,
      foundingDate: '2019',
      sameAs: SOCIALS,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: SITE_EMAIL,
          url: `${SITE_URL}/contact`,
          availableLanguage: ['en'],
          areaServed: ['US', 'CA', 'GB', 'DE', 'NL', 'SE', 'AE', 'SA'],
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: ONE_LINER,
      publisher: { '@id': `${SITE_URL}/#organization` },
      /* `creator` and `author` are CreativeWork properties, and a WebSite is a CreativeWork — this
         is the valid place to record who designed and built it. It is not `founder` on the
         Organization, which would be a different and false claim. */
      creator: { '@id': PERSON_ID },
      author: { '@id': PERSON_ID },
      inLanguage: 'en',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#service`,
      name: SITE_NAME,
      url: SITE_URL,
      image: LOGO_URL,
      description: ONE_LINER,
      email: SITE_EMAIL,
      parentOrganization: { '@id': `${SITE_URL}/#organization` },
      foundingDate: '2019',
      priceRange: '$$$',
      areaServed: [
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'Germany' },
        { '@type': 'Place', name: 'Europe' },
        { '@type': 'Place', name: 'Middle East' },
      ],
      serviceType: [
        'Meta ads management',
        'Creative testing',
        'Creator-led content',
        'Founder-led content',
        'Video clipping for launches',
        'Ecommerce growth consulting',
      ],
      knowsAbout: [
        'Meta advertising',
        'creative testing',
        'profit contribution margin',
        'creator-led content',
        'ecommerce growth',
      ],
    },
    /* The person node, in the same graph as the company so a crawler meets them together and
       attaches the two. `sameAs` is the Instagram profile the client asked to be findable. */
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': PERSON_ID,
      name: DEVELOPER.name,
      jobTitle: DEVELOPER.jobTitle,
      url: absolute(DEVELOPER.path),
      sameAs: [DEVELOPER.instagram],
      description:
        'Rajdeep Debnath designed, built and maintains the Flinza Works website — Next.js, React, Framer Motion and front-end performance.',
      knowsAbout: [
        'Web design',
        'Next.js',
        'React',
        'Framer Motion',
        'Core Web Vitals',
        'Technical SEO',
      ],
    },
  ];
}

/** ProfilePage + Person, for /colophon. The page whose subject the person is. */
export function profilePageSchema() {
  const url = absolute(DEVELOPER.path);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': `${url}#profilepage`,
      url,
      name: `${DEVELOPER.name} — designer and developer of the Flinza Works website`,
      description:
        'The site credits for flinzaworks.com: design, build, front-end engineering and performance work by Rajdeep Debnath.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': PERSON_ID },
      mainEntity: { '@id': PERSON_ID },
      inLanguage: 'en',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': PERSON_ID,
      name: DEVELOPER.name,
      jobTitle: DEVELOPER.jobTitle,
      url,
      sameAs: [DEVELOPER.instagram],
      description:
        'Rajdeep Debnath designed, built and maintains the Flinza Works website — Next.js, React, Framer Motion and front-end performance.',
      knowsAbout: [
        'Web design',
        'Next.js',
        'React',
        'Framer Motion',
        'Core Web Vitals',
        'Technical SEO',
      ],
    },
  ];
}

/** BreadcrumbList, in order, from the site root. */
export function breadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...items].map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

/** FAQPage, mirroring a `faqItems` array of { question, answer }. */
export function faqSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** Service, for a service landing page. */
export function serviceSchema({ name, description, path, areaServed = true }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: absolute(path),
    serviceType: name,
    provider: { '@id': `${SITE_URL}/#organization` },
    ...(areaServed
      ? {
          areaServed: [
            { '@type': 'Country', name: 'United States' },
            { '@type': 'Country', name: 'United Kingdom' },
            { '@type': 'Place', name: 'Europe' },
          ],
        }
      : {}),
  };
}

/** HowTo, for the "how we work" process blocks. */
export function howToSchema({ name, description, steps = [] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      url: step.url ? absolute(step.url) : undefined,
    })),
  };
}

/** Article, for an /insights post. */
export function articleSchema(post) {
  const url = absolute(`/insights/${post.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description || post.excerpt,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: post.date,
    dateModified: post.updated || post.date,
    articleSection: post.category,
    keywords: (post.keywords || []).join(', '),
    wordCount: undefined,
    inLanguage: 'en',
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    image: OG_IMAGE,
  };
}

/** JobPosting, for an open role. Makes the role eligible for Google Jobs. */
export function jobPostingSchema(role, { datePosted } = {}) {
  if (!role || !role.title) return null;
  const remote = /remote/i.test(role.location || '');
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: role.title,
    description: [role.blurb, ...(role.do || []), ...(role.need || [])].filter(Boolean).join(' '),
    employmentType: (role.type || 'FULL_TIME').toUpperCase().replace(/[^A-Z]/g, '_'),
    datePosted: datePosted || new Date().toISOString().slice(0, 10),
    hiringOrganization: {
      '@type': 'Organization',
      name: SITE_NAME,
      sameAs: SITE_URL,
      logo: LOGO_URL,
    },
    jobLocationType: remote ? 'TELECOMMUTE' : undefined,
    applicantLocationRequirements: remote ? { '@type': 'Country', name: 'Worldwide' } : undefined,
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: role.location || 'Remote',
        addressCountry: 'GB',
      },
    },
    directApply: true,
    url: absolute('/careers'),
  };
}
