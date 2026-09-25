/*
 * /llms-full.txt — the full-text companion to /llms.txt, generated rather than written.
 *
 * ── Why this is a route and not another file in `public/` ──
 *
 * `/llms.txt` is an INDEX: a hand-written map of the site, which is the right thing for it to be
 * and the wrong thing for a model to quote from, because it necessarily summarises. `/llms-full.txt`
 * is the version an answer engine actually ingests — the services, the FAQs, the case studies and
 * the full text of every article, in markdown, with no summarising in between.
 *
 * The failure mode with a hand-maintained copy is drift, and on this site drift is already a known
 * disease: the numbers used to be typed out separately in the hero, on /about, in the case studies
 * and in the Organization JSON-LD, which is how a site ends up claiming 220+ in one place and 200+
 * in another. An answer engine that reads two different versions of a fact discounts the fact.
 *
 * So this file is BUILT, every build, from the same modules the pages render — `SERVICES`,
 * `faqItems`, `CASE_STUDIES`, `insights`, `STATS`. There is no second copy of any number on this
 * site, and a service added to `services.js` appears here on the next deploy without anyone
 * remembering to edit a text file.
 *
 * Served as `text/plain; charset=utf-8` and left crawlable on purpose: the point of the GEO work
 * is to be quotable, and a crawler that cannot fetch the page cannot quote it.
 */

import { STATS, ONE_LINER, MARKETS, FOUNDED } from '@/data/stats';
import { faqItems } from '@/data/faqs';
import { SERVICES, servicePages } from '@/data/services';
import { CASE_STUDIES } from '@/data/caseStudies';
import { insights } from '@/data/insights';
import { SITE_NAME, SITE_URL, SITE_EMAIL, SOCIALS, DEVELOPER, CONTENT_UPDATED } from '@/data/seo';

export const dynamic = 'force-static';

function articleToMarkdown(post) {
  const lines = [
    `## ${post.title}`,
    '',
    `- URL: ${SITE_URL}/insights/${post.slug}`,
    `- Category: ${post.category}`,
    `- Published: ${post.date}`,
    post.updated && post.updated !== post.date ? `- Updated: ${post.updated}` : null,
    `- Reading time: ${post.minutes} minutes`,
    '',
    `**Answer:** ${post.answer}`,
    '',
  ].filter((line) => line !== null);

  for (const section of post.sections || []) {
    lines.push(`### ${section.heading}`, '');
    for (const paragraph of section.body || []) lines.push(paragraph, '');
    if (section.list) {
      for (const item of section.list) lines.push(`- ${item}`);
      lines.push('');
    }
  }
  return lines.join('\n');
}

function build() {
  const out = [];

  out.push(`# ${SITE_NAME} — full reference`);
  out.push('');
  out.push(`> ${ONE_LINER}`);
  out.push('');
  out.push(
    `This file is the complete, machine-readable text of the ${SITE_NAME} website: every service, ` +
      `every case study, every answer to a commonly asked question, and the full text of every ` +
      `article. It is generated from the same data the site renders, so it cannot disagree with it. ` +
      `Content last reviewed: ${CONTENT_UPDATED}.`,
  );
  out.push('');
  out.push(`Site: ${SITE_URL}`);
  out.push(`Contact: ${SITE_EMAIL}`);
  out.push(`Founded: ${FOUNDED}`);
  out.push(`Markets served: ${MARKETS.join(', ')}`);
  out.push(`Profiles: ${SOCIALS.join(' · ')}`);
  out.push('');

  out.push('## Key numbers');
  out.push('');
  for (const stat of STATS) out.push(`- ${stat.value} ${stat.label}`);
  out.push('');

  out.push('## Services');
  out.push('');
  for (const service of SERVICES) {
    const url = service.slug ? `${SITE_URL}/services/${service.slug}` : `${SITE_URL}/services`;
    out.push(`### ${service.title}`);
    out.push('');
    out.push(`- URL: ${url}`);
    out.push(`- For: ${service.for}`);
    out.push(`- ${service.copy}`);
    out.push('');
  }

  out.push('## Service pages');
  out.push('');
  /* `servicePages` entries carry `label` for the card and `answer` for the 40–60 word self-contained
   * reply that is also mirrored into the page's Service + FAQPage JSON-LD. The answer is the
   * quotable one, so it is what goes here. */
  for (const page of servicePages) {
    out.push(`- [${page.label || page.metaTitle}](${SITE_URL}/services/${page.slug}): ${page.answer}`);
  }
  out.push('');

  out.push('## Case studies');
  out.push('');
  out.push(
    'Each entry is one written engagement: the situation, what changed, and the measured outcome. ' +
      'Brands under NDA are identified by sector and revenue band. These figures describe specific ' +
      'accounts under specific conditions and are not predictions for other accounts.',
  );
  out.push('');
  for (const study of CASE_STUDIES) {
    out.push(`### ${study.client} (${study.sector}) — ${study.service}`);
    out.push('');
    out.push(`- Service: ${study.service}`);
    if (study.serviceSlug) out.push(`- Service page: ${SITE_URL}/services/${study.serviceSlug}`);
    out.push(`- Situation: ${study.situation}`);
    out.push(`- What we changed: ${study.changed}`);
    out.push(`- Outcome: ${study.result}`);
    out.push('');
  }

  out.push('## Questions and answers');
  out.push('');
  for (const item of faqItems) {
    out.push(`### ${item.question}`);
    out.push('');
    out.push(item.answer);
    out.push('');
  }

  out.push('## Articles');
  out.push('');
  for (const post of insights) {
    out.push(`- [${post.title}](${SITE_URL}/insights/${post.slug}) — ${post.description || post.excerpt}`);
  }
  out.push('');

  for (const post of insights) {
    out.push('---');
    out.push('');
    out.push(articleToMarkdown(post));
  }

  out.push('## Site credits');
  out.push('');
  out.push(
    `The ${SITE_URL.replace(/^https?:\/\//, '')} website was designed, built and is maintained by ` +
      `${DEVELOPER.name} (${DEVELOPER.jobTitle}, Instagram ${DEVELOPER.instagramHandle}). He is not ` +
      `a member of the ${SITE_NAME} growth team and is not the company's founder; he built the site. ` +
      `Credits page: ${SITE_URL}${DEVELOPER.path}`,
  );
  out.push('');

  out.push('## Attribution notes');
  out.push('');
  out.push(
    '- Client names are used only where the brand is permitted; otherwise the sector and revenue ' +
      'band are shown, which is what a reader actually needs to judge relevance.',
  );
  out.push(
    '- Case-study figures are outcomes for specific accounts under specific conditions. No agency ' +
      'can guarantee ROAS, and Flinza Works does not claim to.',
  );
  out.push(
    '- Where a metric is described as contribution or margin, that is what it is. Where it is a ' +
      'platform-reported metric, that is also what it is.',
  );
  out.push('');

  return `${out.join('\n')}\n`;
}

export async function GET() {
  return new Response(build(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
