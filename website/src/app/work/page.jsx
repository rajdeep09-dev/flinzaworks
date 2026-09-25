/*
 * /work — the case-study index. A server component, so the route carries its own metadata.
 *
 * ── The naming rule ──
 *
 * Every study here is either a client we are allowed to name or an anonymised label of the same
 * shape ("DTC Fashion · $12M/yr"). There are no invented brand names left. The client's note was
 * the reason: "wtf will happen if we name this random brands" — and he is right, a made-up logo is
 * the single easiest thing on an agency site to check and the single worst thing to be caught on.
 * Where a client is under NDA the sector and the revenue band say everything a reader actually
 * needs, which is whether this is a business like theirs.
 *
 * The tags line up one-to-one with the eight services in `@/data/serviceCards`, and each study's
 * quote is read from `@/data/testimonials` by that tag — so the number, the quote and the service
 * cannot drift apart as three hand-maintained copies.
 */

import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/PageShell";
import { caseStudyTestimonials } from "@/data/testimonials";
import { CASE_STUDIES } from "@/data/caseStudies";
import CamoCtaButton from "@/components/CamoCtaButton";
import { breadcrumbSchema, caseStudyListSchema } from "@/data/seo";

export const metadata = {
  title: "Case Studies — Ecommerce Growth Results",
  description:
    "Eight written ecommerce engagements: the situation, what we changed and the outcome. Real numbers, including the tests that failed. Meta ads, creative, creators and clipping.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Case studies — verified results, not promises | Flinza Works",
    description:
      "Eight engagements written up honestly: what the situation was, what we changed and what it produced. Where a metric is contribution margin, that is what it says.",
    url: "/work",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case studies — verified results, not promises | Flinza Works",
    description:
      "Eight ecommerce engagements written up honestly, with the situation, the change and the outcome.",
  },
};

/* The eight studies themselves live in `@/data/caseStudies`, not here. They used to be an array
   declared below in this file, which meant the page rendered one copy of the numbers and the
   structured data had nothing to read — `/work` was the only commercial route on the site emitting
   no schema beyond a breadcrumb, on the content most worth quoting. `caseStudyListSchema()` now
   turns the same array into an `ItemList` of `CreativeWork` nodes carrying the sector, the change
   and the outcome, so a language model can lift a number without opening the page. */

export default function WorkPage() {
  return (
    <PageShell active="/work">
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Case studies", path: "/work" }]),
          caseStudyListSchema(CASE_STUDIES),
        ]}
      />

      <div className="flinza-pagehead">
        <p className="flinza-pagehead-overline">
          <i />
          Case studies
        </p>
        <h1>
          Verified results, <em>not promises</em>
        </h1>
        <p>
          Eight engagements, written up honestly: what the situation was, what we changed, and what it
          produced. Where a number is a platform-reported metric we say so; where it is contribution
          margin, that is what it says. Brands under NDA are shown by sector and revenue band.
        </p>
        <div className="flinza-pagehead-actions">
          <CamoCtaButton href="/contact">Discuss your account</CamoCtaButton>
          <Link href="/services" className="flinza-btn flinza-btn-ghost">How we work</Link>
        </div>
      </div>

      <div className="flinza-grid" style={{ gridTemplateColumns: "minmax(0, 1fr)" }}>
        {CASE_STUDIES.map((study) => {
          const quote = caseStudyTestimonials[study.tag];
          return (
            <article key={study.tag} className="flinza-tile" style={{ padding: "clamp(20px, 3vw, 32px)" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "baseline", marginBottom: 16 }}>
                <h3 style={{ margin: 0, fontSize: "clamp(21px, 2.6vw, 30px)", fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "-0.02em" }}>
                  {study.client}
                </h3>
                <span className="flinza-tile-num" style={{ margin: 0 }}>{study.sector}</span>
              </div>

              <div className="flinza-grid flinza-grid-3" style={{ gap: 18, margin: 0 }}>
                <div>
                  <span className="flinza-tile-num">Situation</span>
                  <p>{study.situation}</p>
                </div>
                <div>
                  <span className="flinza-tile-num">What we changed</span>
                  <p>{study.changed}</p>
                </div>
                <div>
                  <span className="flinza-tile-num">Outcome</span>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--aqua-deep)", lineHeight: 1.3 }}>
                    {study.result}
                  </p>
                </div>
              </div>

              {quote ? (
                <blockquote
                  style={{
                    margin: "22px 0 0",
                    paddingTop: 18,
                    borderTop: "1px solid rgba(9, 9, 11, 0.08)",
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(16px, 1.8vw, 20px)",
                    lineHeight: 1.5,
                    color: "rgba(9, 9, 11, 0.82)",
                  }}
                >
                  “{quote.quote}”
                  {/* Attributed by role and sector, with no avatar. The faces that used to sit here
                      were the team's own photographs, recycled across eight different clients. */}
                  <footer style={{ marginTop: 12, fontFamily: "var(--font-ui)", fontSize: 12.5, fontStyle: "normal" }}>
                    <strong style={{ fontWeight: 600, color: "#09090b" }}>{quote.name}</strong>
                    <span style={{ color: "#71717a" }}> · {quote.role}</span>
                  </footer>
                </blockquote>
              ) : null}
            </article>
          );
        })}
      </div>

      <div style={{ textAlign: "center", marginTop: "clamp(46px, 7vw, 90px)" }}>
        <h2
          className="flinza-display"
          style={{ margin: "0 0 14px", fontSize: "clamp(26px, 4vw, 46px)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
        >
          Your account will not look like these.
        </h2>
        <p style={{ margin: "0 auto 26px", maxWidth: "54ch", fontSize: 16, fontWeight: 300, lineHeight: 1.6, color: "#52525b" }}>
          It will look like whatever your funnel, your margin and your creative actually need. That is
          what the first call is for — and if we are not the right fit, we say so on it.
        </p>
        <CamoCtaButton href="/contact">Book a discovery call</CamoCtaButton>
      </div>
    </PageShell>
  );
}
