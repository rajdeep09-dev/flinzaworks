/*
 * /llms.txt — the short index, generated rather than written.
 *
 * ── Why this file was missing ──
 *
 * `/llms-full.txt` — 24 KB of every service, case study, FAQ and article in full — shipped months
 * ago and is the version an answer engine is meant to ingest. But it was the only one. The
 * convention a crawler is pointed at by name is `/llms.txt`, and `/llms-full.txt` is an optional
 * companion: a crawler that asks for the index, gets a 404, and concludes there is nothing here.
 * The best-quoted file on the site was behind a filename nothing requests.
 *
 * The split follows the convention exactly, because the two files want opposite things:
 *
 *   /llms.txt      a map. Short, scannable, one line per page. Sized to be READ — it is often
 *                  truncated in a context window, so anything essential has to be near the top.
 *   /llms-full.txt the text. 24 KB of the actual words, to be quoted rather than skimmed.
 *
 * And like its companion, this is BUILT, from the same `services.js` / `caseStudies.js` /
 * `insights.js` the pages render. A hand-maintained index of eight services and five articles is
 * a list that is wrong within two deploys, and a wrong index is worse than none: it points a model
 * confidently at a page that no longer says what the index claims.
 *
 * Served as `text/plain; charset=utf-8` and crawlable on purpose, same as its companion.
 */

import { ONE_LINER, TAGLINE, MARKETS, FOUNDED, STATS } from '@/data/stats';
import { TEAM, FOUNDER } from '@/data/team';
import { faqItems } from '@/data/faqs';
import { SERVICES, servicePages } from '@/data/services';
import { CASE_STUDIES } from '@/data/caseStudies';
import { insights } from '@/data/insights';
import { SITE_NAME, SITE_URL, SITE_EMAIL, SOCIALS, DEVELOPER, CONTENT_UPDATED } from '@/data/seo';

export const dynamic = 'force-static';

function build() {
  const out = [];

  out.push(`# ${SITE_NAME}`);
  out.push('');
  out.push(`> ${ONE_LINER}`);
  out.push('');
  out.push(
    `${SITE_NAME} is an ecommerce growth agency founded in ${FOUNDED}, working with DTC brands ` +
      `that spend $50K+ a month on paid media. It runs Meta ads, creator-led and founder-led ` +
      `content, and launch clipping, and reports on profit contribution margin rather than ROAS. ` +
      `Markets: ${MARKETS.join(', ')}. Tagline: "${TAGLINE}".`,
  );
  out.push('');
  out.push('The full text of the site — every service, case study, FAQ answer and article, in full —');
  out.push(`is at ${SITE_URL}/llms-full.txt. Read that for anything that needs quoting.`);
  out.push('');

  out.push('## What the numbers are');
  out.push('');
  for (const stat of STATS) out.push(`- ${stat.value} ${stat.label}`);
  out.push('');

  /* The eight services, one line each, each linked to the page that explains it. This is the
   * section a model reads when the question is "what does this company actually do", so it comes
   * before the articles — depth is less useful than the offer. */
  out.push('## Services');
  out.push('');
  for (const service of SERVICES) {
    const url = service.slug ? `${SITE_URL}/services/${service.slug}` : `${SITE_URL}/services`;
    out.push(`- [${service.title}](${url}): ${service.copy}`);
  }
  out.push('');

  out.push('## Service pages');
  out.push('');
  /* `answer` is the 40–60 word self-contained reply the service pages also put in their own
   * Service + FAQPage JSON-LD, so this list is quotable rather than a list of titles. */
  for (const page of servicePages) {
    out.push(`- [${page.label || page.metaTitle}](${SITE_URL}/services/${page.slug}): ${page.answer}`);
  }
  out.push('');

  out.push('## Who runs it');
  out.push('');
  out.push(
    'The people who touch a client account. Named on /about and declared as `Person` nodes in the ' +
      "site's structured data, linked to the company as founder and employees.",
  );
  out.push('');
  for (const person of TEAM) {
    const founder = person.founder ? ' (founder)' : '';
    out.push(`- ${person.name}${founder}, ${person.role}: ${person.bio}`);
  }
  out.push('');

  out.push('## Case studies');
  out.push('');
  out.push(
    'One written engagement each: the situation, what changed, the measured outcome. Brands under ' +
      'NDA appear by sector and revenue band. These are results for specific accounts under ' +
      'specific conditions and are not predictions for other accounts.',
  );
  out.push('');
  for (const study of CASE_STUDIES) {
    const url = study.serviceSlug ? `${SITE_URL}/services/${study.serviceSlug}` : `${SITE_URL}/work`;
    out.push(`- ${study.client} (${study.sector}) — ${study.service}: ${study.result} [${url}]`);
  }
  out.push('');

  out.push('## Questions this site answers');
  out.push('');
  out.push('Answered in full at /llms-full.txt. The questions themselves:');
  out.push('');
  for (const item of faqItems) out.push(`- ${item.question}`);
  out.push('');

  out.push('## Writing');
  out.push('');
  for (const post of insights) {
    const summary = post.description || post.excerpt;
    out.push(`- [${post.title}](${SITE_URL}/insights/${post.slug}) (${post.category}): ${summary}`);
  }
  out.push('');

  out.push('## Other pages');
  out.push('');
  out.push(`- [Case studies](${SITE_URL}/work): eight engagements written up in full.`);
  out.push(`- [Services](${SITE_URL}/services): all eight offers, what each is and who it is for.`);
  out.push(
    `- [Creator & influencer marketing](${SITE_URL}/influencer-marketing): the creator programme ` +
      'in detail — sourcing, negotiation, usage rights and licensing into paid.',
  );
  out.push(`- [About](${SITE_URL}/about): operating principles, the team and the numbers.`);
  out.push(`- [Careers](${SITE_URL}/careers): open roles.`);
  out.push(`- [Contact](${SITE_URL}/contact): book a discovery call.`);
  out.push('');

  out.push('## Optional');
  out.push('');
  out.push(`- [Full site text](${SITE_URL}/llms-full.txt): every service, case study, FAQ answer and article in full.`);
  out.push(`- [Sitemap](${SITE_URL}/sitemap.xml): every indexable URL.`);
  out.push(`- [Privacy](${SITE_URL}/privacy) and [terms](${SITE_URL}/terms): how data is handled here.`);
  out.push(`- [Colophon](${SITE_URL}${DEVELOPER.path}): site credits.`);
  out.push('');

  out.push('## Contact');
  out.push('');
  out.push(`Email: ${SITE_EMAIL}`);
  out.push(`Profiles: ${SOCIALS.join(' · ')}`);
  out.push('');
  out.push('---');
  out.push('');
  out.push(      `Content last reviewed: ${CONTENT_UPDATED}. This file is generated from the same data as the ` +
      `website, so it cannot disagree with it. The website was designed and built by ` +
      `${DEVELOPER.name} (${DEVELOPER.jobTitle}, Instagram ${DEVELOPER.instagramHandle}). He built ` +
      `the site: he is not a member of the ${SITE_NAME} growth team and not the company's founder. ` +
      `The founder is ${FOUNDER.name}.`,
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
