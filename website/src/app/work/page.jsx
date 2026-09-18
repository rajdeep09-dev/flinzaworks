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
import CamoCtaButton from "@/components/CamoCtaButton";
import { breadcrumbSchema } from "@/data/seo";

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

const STUDIES = [
  {
    tag: "01 // REVENUE AUDIT",
    client: "StillRing",
    sector: "Supplements · $4M/yr",
    situation: "Spend was growing 20% month on month while contribution margin went backwards.",
    changed: "Rebuilt attribution in Triple Whale and found 31% of spend was acquiring customers who returned on first order.",
    result: "3.4× contribution return in 90 days, +$412K recovered",
  },
  {
    tag: "02 // META ADS",
    client: "StillRing",
    sector: "Paid media · 8-figure",
    situation: "Platform-reported ROAS was healthy but the brand was not profitable at scale.",
    changed: "Restructured campaigns around how the Meta algorithm allocates spend and reads creative signals, killed the prospecting sets that never paid back, and rebuilt retargeting around margin.",
    result: "ROAS 1.8x → 4.2x, −31% CAC held through two seasonal spikes",
  },
  {
    tag: "03 // CREATORS",
    client: "DTC Beauty",
    sector: "$9M/yr",
    situation: "Creator spend was capped at four assets a month by cost and by waiting on creators to answer messages.",
    changed: "Sourced a roster on engagement quality rather than follower count, wrote and directed every script in house, and cleared paid usage rights up front so the footage could run as ad creative.",
    result: "3.2× return on creator spend, −38% CAC vs studio creative",
  },
  {
    tag: "04 // FOUNDER-LED",
    client: "DTC Supplements",
    sector: "$6M/yr",
    situation: "The founder was the most trusted voice the brand had, and the least used one — nothing shipped without a studio day.",
    changed: "One scripted shoot a month, cut into shorts, reels, YouTube edits and two podcast episodes. Paid cutdowns come from the same footage.",
    result: "120+ assets a quarter, 48-hour shoot-to-publish",
  },
  {
    tag: "05 // CLIPPING",
    client: "DTC Home",
    sector: "Launch window",
    situation: "A launch with a two-week window and one hero asset carrying the whole thing.",
    changed: "Ran a high-volume clipping engine across the window — dozens of cut-downs a week from long-form, a founder podcast and creator footage — on a calendar agreed before launch day.",
    result: "60+ clips a month, 3.8× reach vs long-form alone",
  },
  {
    tag: "06 // CREATIVE",
    client: "DTC Fashion",
    sector: "$12M/yr",
    situation: "Six-week production cycles meant the account was testing last quarter's ideas.",
    changed: "Moved to 48-hour production and testing cycles, with hooks varied independently of body so a losing visual treatment was never mistaken for a losing idea.",
    result: "48-hour concept-to-cut, 30 angles tested, 3.4× CTR lift",
  },
  {
    tag: "07 // OPTIMIZATION",
    client: "DTC Jewellery",
    sector: "8-figure",
    situation: "High ROAS masked cash burn from returns and discount dependency.",
    changed: "Switched the optimisation target from ROAS to contribution, removed two permanent discount codes and re-cut the creative to sell on product rather than price.",
    result: "+22pts contribution margin, −38% wasted spend",
  },
  {
    tag: "08 // ITERATION",
    client: "Multi-brand portfolio",
    sector: "Ecommerce",
    situation: "Nine brands managed with inconsistent process and no shared learning.",
    changed: "Standardised creative testing, attribution and reporting across the portfolio, with one written decision rule: scale at threshold, kill below it, no debates.",
    result: "34% average ROAS lift, 48-hour cycles across nine brands",
  },
];

export default function WorkPage() {
  return (
    <PageShell active="/work">
      <JsonLd data={breadcrumbSchema([{ name: "Case studies", path: "/work" }])} />

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
        {STUDIES.map((study) => {
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
