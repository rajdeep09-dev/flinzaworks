/*
 * /insights — the blog index. A server component.
 *
 * ── What this was, and what it is ──
 *
 * It listed six "notes" as cards that led nowhere, and said so in a comment: "there are no article
 * routes behind them yet and a card that leads nowhere damages trust more than a card that is
 * honestly an excerpt". That was the right call at the time and it is still a page with no blog in
 * it — so the client asked for the section to be built ("blog ar section ta banaitam ni amra?").
 *
 * Every card now links to a real article at /insights/[slug], written from `@/data/insights`, and
 * the cards are grouped by category. Each article page carries an answer-first block, Article
 * structured data and a link back into the service it relates to, which is the internal-linking
 * loop the search plan asks for: article → service page → contact.
 */

import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/PageShell";
import CamoCtaButton from "@/components/CamoCtaButton";
import { insights, insightCategories } from "@/data/insights";
import { breadcrumbSchema, absolute, SITE_URL, socialMeta } from "@/data/seo";

export const metadata = {
  title: "Insights — Meta Ads, Creative & Creator Growth",
  description:
    "Notes from inside live ecommerce accounts: profit-first Meta ads, 48-hour creative testing, briefing creators so content converts, and clipping strategy for launches.",
  alternates: { canonical: "/insights" },
  ...socialMeta({
    title: "Insights — notes from inside live ecommerce accounts | Flinza Works",
    description:
      "Profit-first Meta ads, creative testing cycles, creator-led growth and clipping. Written for operators rather than for search engines.",
    url: "/insights",
  }),
};

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default function InsightsPage() {
  /* Newest first. The array is authored in order, but sorting here means the index stays correct
     when a post is inserted in the middle of the file rather than appended to it. */
  const posts = [...insights].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <PageShell active="/insights">
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Insights", path: "/insights" }]),
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Flinza Works Insights',
            url: absolute('/insights'),
            description:
              'Writing on profit-first Meta ads, creative testing, creator-led growth and clipping for ecommerce brands.',
            /* Same @id string as the root Organization block in src/data/seo.js, so this Blog and
               the company are one entity to a crawler rather than two. */
            publisher: { '@id': `${SITE_URL}/#organization` },
            blogPost: posts.map((post) => ({
              '@type': 'BlogPosting',
              headline: post.title,
              url: absolute(`/insights/${post.slug}`),
              datePublished: post.date,
              articleSection: post.category,
            })),
          },
        ]}
      />

      <div className="flinza-pagehead">
        <p className="flinza-pagehead-overline">
          <i />
          Blog · Insights
        </p>
        <h1>
          Notes from inside <em>live accounts</em>
        </h1>
        <p>
          What we learn running Meta ads, creative and creator programmes for ecommerce brands —
          written for operators rather than for search engines. Every post answers the question in
          its title in the first paragraph, because that is the only useful way to write one.
        </p>
        <div className="flinza-pagehead-actions">
          <CamoCtaButton href="/contact">Ask us about your account</CamoCtaButton>
          <Link href="/services" className="flinza-btn flinza-btn-ghost">How we work</Link>
        </div>
      </div>

      <div className="flinza-post-meta-row">
        <span>Categories</span>
        <div className="flinza-post-cats">
          {insightCategories.map((category) => (
            <span key={category} className="flinza-post-cat">
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="flinza-grid flinza-grid-2">
        {posts.map((post) => (
          <article key={post.slug} className="flinza-tile flinza-post-card">
            <div className="flinza-post-card-top">
              <span className="flinza-post-cat">{post.category}</span>
              <span className="flinza-post-time">{post.minutes} min read</span>
            </div>
            <h2 className="flinza-post-card-title">
              <Link href={`/insights/${post.slug}`}>{post.title}</Link>
            </h2>
            <p>{post.excerpt}</p>
            <div className="flinza-post-card-foot">
              <time dateTime={post.date}>{dateFormatter.format(new Date(post.date))}</time>
              <Link href={`/insights/${post.slug}`} className="flinza-post-card-cta">
                Read the note
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "clamp(46px, 7vw, 90px)" }}>
        <p style={{ margin: "0 auto 24px", maxWidth: "54ch", fontSize: 15.5, fontWeight: 300, lineHeight: 1.65, color: "#52525b" }}>
          New posts publish as they are written. If you want the reasoning behind any of this applied
          to your own account, that is a conversation rather than a subscription.
        </p>
        <CamoCtaButton href="/contact">Ask us about your account</CamoCtaButton>
      </div>
    </PageShell>
  );
}
