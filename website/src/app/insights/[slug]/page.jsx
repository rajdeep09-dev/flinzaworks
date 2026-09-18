/*
 * /insights/[slug] — one article.
 *
 * Three things every post page does, and they are the reason the blog is worth having at all:
 *
 *   1. ANSWER-FIRST. The first block on the page is a 40–60 word, self-contained answer to the
 *      question in the title, written so it stands alone if it is quoted with no surrounding
 *      context. That is what a featured snippet and an AI Overview lift. It is also the paragraph
 *      most readers want first, which is the point.
 *   2. STRUCTURED. Article JSON-LD with a real `datePublished`, `dateModified`, an author and a
 *      publisher that resolves to the same Organization @id emitted site-wide — so the post is
 *      attributed to the company rather than to nobody.
 *   3. A WAY OUT. Every post links to the service page it relates to and then to contact, which is
 *      the article → service → contact loop the search plan asks for, done as real links.
 *
 * The body is rendered from the structured `sections` in `@/data/insights` rather than from HTML,
 * so a post cannot contain a stray tag, the reading order is enforced, and the same data can feed
 * the index card, the schema and the page without a second copy existing.
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/PageShell";
import CamoCtaButton from "@/components/CamoCtaButton";
import { insights, getInsight } from "@/data/insights";
import { servicePages } from "@/data/services";
import { articleSchema, breadcrumbSchema, absolute } from "@/data/seo";

export function generateStaticParams() {
  return insights.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }) {
  const post = getInsight(params.slug);
  if (!post) return {};

  const path = `/insights/${post.slug}`;

  return {
    /* `absolute` and not a plain string: the root layout's title template would append " | Flinza
       Works" to a headline that is already at the length limit, and article headlines are chosen
       to be the search query, not to fit an agency's name after them. */
    title: { absolute: post.title },
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: path },
    openGraph: {
      title: post.title,
      description: post.description,
      url: path,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: ["Flinza Works"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/* Which service page a post belongs beside, by category. Keeps the internal link honest: the
 * creative-testing post points at the creative-testing page, not at whichever page is convenient. */
const SERVICE_FOR_CATEGORY = {
  "Meta Ads": "meta-ads",
  "Creative Testing": "creative-testing",
  "Creator-Led Growth": "creator-partnerships",
  Clipping: "launch-clipping",
};

export default function InsightArticlePage({ params }) {
  const post = getInsight(params.slug);
  if (!post) notFound();

  const related = insights
    .filter((item) => item.slug !== post.slug)
    .sort((a, b) => (a.category === post.category ? -1 : b.category === post.category ? 1 : 0))
    .slice(0, 3);

  const serviceSlug = SERVICE_FOR_CATEGORY[post.category];
  const service = servicePages.find((item) => item.slug === serviceSlug);

  return (
    <PageShell active="/insights">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Insights", path: "/insights" },
            { name: post.title, path: `/insights/${post.slug}` },
          ]),
          articleSchema(post),
        ]}
      />

      <article className="flinza-article">
        <header className="flinza-article-head">
          <div className="flinza-article-meta">
            <span className="flinza-post-cat">{post.category}</span>
            <span className="flinza-post-time">{post.minutes} min read</span>
            <time dateTime={post.date}>{dateFormatter.format(new Date(post.date))}</time>
          </div>
          <h1>{post.title}</h1>
          <p className="flinza-article-standfirst">{post.excerpt}</p>
        </header>

        {/* The answer block. Visible, first, and self-contained — see the file header. */}
        <div className="flinza-answerblock">
          <span className="flinza-answerblock-tag">The short answer</span>
          <p>{post.answer}</p>
        </div>

        <div className="flinza-article-body">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.list ? (
                <ul className="flinza-ticklist">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        {/* The way out: the service this post is about, then the booking flow. */}
        <aside className="flinza-article-cta">
          <div>
            <span className="flinza-article-cta-tag">
              {service ? `Related service · ${service.label}` : "Related service"}
            </span>
            <h2>
              {service ? service.h1 + " " : ""}
              {service ? service.h1em : "Work with us"}
            </h2>
            <p>
              {service
                ? service.lede
                : "We run Meta ads, creator-led and founder-led content and launch clipping for ecommerce brands spending $50K+ a month."}
            </p>
          </div>
          <div className="flinza-article-cta-actions">
            {service ? (
              <Link href={`/services/${service.slug}`} className="flinza-btn flinza-btn-ghost">
                More on {service.label.toLowerCase()}
              </Link>
            ) : null}
            <CamoCtaButton href="/contact">Book a discovery call</CamoCtaButton>
          </div>
        </aside>
      </article>

      <nav className="flinza-related" aria-label="More posts">
        <span>Keep reading</span>
        {related.map((item) => (
          <Link key={item.slug} href={absolute(`/insights/${item.slug}`)}>
            {item.title}
          </Link>
        ))}
      </nav>
    </PageShell>
  );
}
