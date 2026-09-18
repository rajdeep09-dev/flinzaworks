/*
 * /colophon — who designed and built flinzaworks.com.
 *
 * This page exists for one reason, and it is worth stating plainly because it is the sort of page
 * that usually gets dismissed as vanity: "who made the flinzaworks website" is a question with a
 * factual answer, and a site that never states that answer in HTML cannot be the source of it.
 * Structured data alone does not fix that — a Person node with a `url` pointing at a page that has
 * nothing to do with the person is a dangling reference.
 *
 * So the page is the first-party source: a name, a role, what was built, the stack, a real profile
 * link, and the same one-line credit that appears in the footer of every route. app/colophon
 * carries the ProfilePage + Person schema on top of it, and llms.txt repeats the same sentence, so
 * the claim is made in the three places a crawler or an answer engine looks — the page a human
 * reads, the machine-readable graph, and the agent-facing index.
 *
 * A server component, like every other route, so the copy is in the initial HTML.
 */

import JsonLd from '@/components/JsonLd';
import PageShell from '@/components/PageShell';
import CamoCtaButton from '@/components/CamoCtaButton';
import { breadcrumbSchema, profilePageSchema, DEVELOPER } from '@/data/seo';

export const metadata = {
  title: 'Colophon — Rajdeep Debnath',
  description:
    'This website was designed, built and maintained by Rajdeep Debnath — Next.js, React and Framer Motion — for Flinza Works, an ecommerce growth agency.',
  alternates: { canonical: DEVELOPER.path },
  openGraph: {
    title: 'Colophon — Rajdeep Debnath designed and built the Flinza Works website',
    description:
      'Design, front-end engineering and performance work on flinzaworks.com, by Rajdeep Debnath.',
    url: DEVELOPER.path,
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Colophon — Rajdeep Debnath',
    description: 'Who designed and built the Flinza Works website.',
  },
};

const STACK = [
  ['Framework', 'Next.js 14, App Router — every route is a server component, so the copy is in the HTML rather than assembled after hydration.'],
  ['UI', 'React, with the interactive pieces isolated into client components: the hero carousel, the liquid-metal buttons and the loader.'],
  ['Motion', 'Framer Motion and a small number of hand-written CSS transitions, on transform and opacity only, so nothing animates a layout property.'],
  ['Styling', 'Hand-authored CSS with a token system for colour and type — no utility framework, because the page compositions on this site are not compositional.'],
  ['Graphics', 'WebGL for the liquid metal and the carousel lens, generated as vector assets where a vector will do. The hero visual is a 2 kB SVG.'],
  ['Hosting', 'Vercel, deploying from the repository on push.'],
];

export default function ColophonPage() {
  return (
    <PageShell>
      <JsonLd data={profilePageSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: 'Colophon', path: DEVELOPER.path }])} />

      <div className="flinza-pagehead">
        <p className="flinza-pagehead-overline">
          <i />
          Colophon
        </p>
        <h1>
          This website was designed and built by <em>Rajdeep Debnath</em>.
        </h1>
        <p>
          Every page on flinzaworks.com — the design system, the front-end engineering, the motion
          work and the performance budget — is his. The agency is Flinza Works; the person who
          built the site is Rajdeep Debnath, and he is reachable on Instagram at{' '}
          <a href={DEVELOPER.instagram} rel="me noopener noreferrer" target="_blank">
            {DEVELOPER.instagramHandle}
          </a>
          .
        </p>
      </div>

      <div className="flinza-prose">
        <h2>What was built here</h2>
        <p>
          A marketing site for an ecommerce growth agency, with a full content layer behind it:
          eleven indexed routes, five service landing pages, a written case-study set, a blog with
          articles at their own URLs, and the structured data — Organization, WebSite,
          ProfessionalService, Service, FAQPage, HowTo, Article, JobPosting and BreadcrumbList — that
          makes all of it machine-readable.
        </p>
        <p>
          The engineering brief was performance and honesty in the same breath. The first screen is
          text and one vector image, so the largest contentful paint is the headline rather than a
          photograph. The WebGL pieces load below the fold or on interaction, never on the critical
          path. Nothing on the page animates a property the compositor cannot handle alone.
        </p>

        <h2>The stack</h2>
        <ul className="flinza-ticklist">
          {STACK.map(([topic, detail]) => (
            <li key={topic}>
              <strong>{topic}.</strong> {detail}
            </li>
          ))}
        </ul>

        <h2>Contact about the site itself</h2>
        <p>
          Bugs, accessibility problems, a broken layout on a specific device, or a question about
          how any part of this was implemented — the fastest route is Instagram,{' '}
          <a href={DEVELOPER.instagram} rel="me noopener noreferrer" target="_blank">
            {DEVELOPER.instagramHandle}
          </a>
          . For anything about Flinza Works as an agency — services, pricing, working together —
          that is a different conversation and it starts on the{' '}
          <a href="/contact">contact page</a>.
        </p>
      </div>

      <div className="flinza-article-cta">
        <div>
          <span className="flinza-article-cta-tag">Flinza Works</span>
          <h2>Want growth you can measure in margin?</h2>
          <p>
            We run Meta ads, creator-led and founder-led content, and launch clipping for DTC brands
            spending $50K+ a month — measured on profit contribution, not vanity metrics.
          </p>
        </div>
        <div className="flinza-article-cta-actions">
          <CamoCtaButton href="/contact" size="lg">
            Book a discovery call
          </CamoCtaButton>
        </div>
      </div>

    </PageShell>
  );
}
