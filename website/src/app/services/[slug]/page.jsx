/*
 * /services/[slug] — the keyword-cluster landing pages.
 *
 * One page per cluster rather than one generic /services page, because a single page cannot rank
 * for five different searches: somebody searching "creative testing agency" should land on a page
 * about creative testing, and somebody searching "video clipping service for launches" should land
 * on a page about clipping. The copy, the FAQ and the proof on each page come from
 * `@/data/services`, and the numbers in the proof block are read from the matching case study in
 * `@/data/projects` rather than retyped — so a landing page cannot overstate a result.
 *
 * Each page carries four structured-data blocks:
 *   BreadcrumbList   where the page sits in the site
 *   Service          what is being sold, by whom, where
 *   FAQPage          the page's own questions, mirrored from the visible accordion
 *   Organization     already emitted once from the root layout — deliberately not repeated here
 *
 * `generateStaticParams` builds all five at build time, so they are static HTML on the CDN rather
 * than rendered per request.
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/PageShell";
import FaqList from "@/components/FaqList";
import CamoCtaButton from "@/components/CamoCtaButton";
import { servicePages, getServicePage, proofForPage } from "@/data/services";
import { breadcrumbSchema, faqSchema, serviceSchema, absolute } from "@/data/seo";

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }) {
  const page = getServicePage(params.slug);
  if (!page) return {};

  const path = `/services/${page.slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: path },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: path,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default function ServiceLandingPage({ params }) {
  const page = getServicePage(params.slug);
  if (!page) notFound();

  const proof = proofForPage(page);
  const path = `/services/${page.slug}`;

  return (
    <PageShell active="/services">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: page.label, path },
          ]),
          serviceSchema({
            name: `${page.label} for ecommerce brands`,
            description: page.answer,
            path,
          }),
          faqSchema(page.faq),
        ]}
      />

      <div className="flinza-pagehead">
        <p className="flinza-pagehead-overline">
          <i />
          {page.overline}
        </p>
        <h1>
          {page.h1} <em>{page.h1em}</em>
        </h1>
        <p>{page.lede}</p>
        <div className="flinza-pagehead-actions">
          <CamoCtaButton href="/contact">Book a discovery call</CamoCtaButton>
          <Link href="/services" className="flinza-btn flinza-btn-ghost">All services</Link>
        </div>
      </div>

      {/* ── The answer block ──
          Forty to sixty words, self-contained, answering "what is this and who is it for" in the
          first sentence. This is the paragraph an AI Overview or a featured snippet lifts, so it is
          set as a real, visible block directly under the H1 rather than buried in the copy — a
          block hidden from readers is a block search engines discount. */}
      <div className="flinza-answerblock">
        <span className="flinza-answerblock-tag">In short</span>
        <p>{page.answer}</p>
      </div>

      <div className="flinza-section-title">
        <h2>What we actually do</h2>
        <p>
          Three things, in the order they happen. The first two are the reason the third works.
        </p>
      </div>

      <div className="flinza-grid" style={{ gridTemplateColumns: "minmax(0, 1fr)" }}>
        {page.sections.map((section, index) => (
          <div key={section.heading} className="flinza-tile">
            <span className="flinza-tile-num">{String(index + 1).padStart(2, "0")}</span>
            <h3>{section.heading}</h3>
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
          </div>
        ))}
      </div>

      <div className="flinza-section-title">
        <h2>What you get</h2>
        <p>Every engagement is fixed-scope, so this is the scope.</p>
      </div>
      <div className="flinza-grid flinza-grid-2">
        <div className="flinza-tile">
          <span className="flinza-tile-num">Deliverables</span>
          <ul className="flinza-ticklist">
            {page.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {/* The proof, read out of the case study this page is allowed to quote. The numbers are not
            in this file at all — they come from `@/data/projects`, so the page and the case study
            cannot disagree. */}
        {proof ? (
          <div className="flinza-tile">
            <span className="flinza-tile-num">Proof · {proof.brand}</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>{proof.title}</h3>
            <p>{proof.whatWeDid}</p>
            {proof.results?.primary ? (
              <p className="flinza-proof-metric">
                <strong>{proof.results.primary}</strong>
                <span>{proof.results.primaryLabel}</span>
              </p>
            ) : null}
            <Link
              href="/work"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                marginTop: 12,
                fontSize: 13.5,
                fontWeight: 600,
                color: "var(--aqua-deep)",
                textDecoration: "none",
              }}
            >
              Read the full case study
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        ) : null}
      </div>

      <div className="flinza-section-title">
        <h2>Questions we get asked about this</h2>
        <p>Short answers, first sentence first. Anything else, ask on the call.</p>
      </div>
      <FaqList items={page.faq} />

      <div style={{ textAlign: "center", marginTop: "clamp(46px, 7vw, 90px)" }}>
        <h2
          className="flinza-display"
          style={{ margin: "0 0 14px", fontSize: "clamp(26px, 4vw, 46px)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
        >
          Tell us where growth <em>stalled</em>.
        </h2>
        <p style={{ margin: "0 auto 26px", maxWidth: "52ch", fontSize: 16, fontWeight: 300, lineHeight: 1.6, color: "#52525b" }}>
          A 30-minute call, an honest answer, and a fixed quote within 48 hours.
        </p>
        <CamoCtaButton href="/contact">Book a discovery call</CamoCtaButton>
      </div>

      {/* Every cluster page links back to the index and across to the services it is most often
          bought with — the internal linking the search plan asks for, done as real links a reader
          can use rather than hidden anchors. */}
      <nav className="flinza-related" aria-label="Related services">
        <span>Related</span>
        {servicePages
          .filter((item) => item.slug !== page.slug)
          .map((item) => (
            <Link key={item.slug} href={absolute(`/services/${item.slug}`)}>
              {item.label}
            </Link>
          ))}
      </nav>
    </PageShell>
  );
}
