"use client";

import Link from "next/link";
import PageShell from "@/components/PageShell";
import { caseStudyTestimonials } from "@/data/testimonials";

/*
 * Case studies index. The homepage shows the results mosaic; this is the written version, with
 * the situation, what we changed and the outcome — and a client quote attached to each, read
 * from the same testimonial source the rest of the site uses.
 */

const STUDIES = [
  {
    tag: "01 // REVENUE AUDIT",
    client: "Alder & Oat",
    sector: "Supplements",
    situation: "Spend was growing 20% month on month while contribution margin went backwards.",
    changed: "Rebuilt attribution in Triple Whale and found 31% of spend was acquiring customers who returned on first order.",
    result: "3.4× contribution return in 90 days",
  },
  {
    tag: "02 // CREATIVE",
    client: "Casa Verde",
    sector: "Home & Garden",
    situation: "One winning video from eighteen months earlier was carrying the whole account.",
    changed: "Moved to 48-hour production cycles and tested 40 angles in six weeks, with hooks varied independently of body.",
    result: "Creative refresh cycle cut from six weeks to 48 hours",
  },
  {
    tag: "03 // AI UGC",
    client: "Northline",
    sector: "Beauty",
    situation: "Creator costs of $300 per video capped testing at four assets a month.",
    changed: "Replaced the creator pipeline with custom AI avatars and put the saved budget into media.",
    result: "10× more creative angles tested per month",
  },
  {
    tag: "04 // PAID MEDIA",
    client: "Trail & Peak",
    sector: "Outdoor",
    situation: "Platform-reported ROAS was healthy but the brand was not profitable at scale.",
    changed: "Restructured campaigns around profit contribution, killed the prospecting campaigns that never paid back, and rebuilt retargeting around margin.",
    result: "−31% CAC, held through two seasonal spikes",
  },
  {
    tag: "05 // OPTIMIZATION",
    client: "Sable Studio",
    sector: "Jewellery",
    situation: "High ROAS masked cash burn from returns and discount dependency.",
    changed: "Switched optimisation target from ROAS to contribution, removed two permanent discount codes and re-cut the creative to sell on product rather than price.",
    result: "2.8× average order value on retained creative",
  },
  {
    tag: "06 // ITERATION",
    client: "Northbeam Health",
    sector: "Health",
    situation: "Feedback loops were too slow to find winning creative before budgets exhausted.",
    changed: "Installed a 48-hour testing engine with a fixed decision rule: scale at threshold, kill below it, no debates.",
    result: "34% average ROAS lift across nine brands",
  },
  {
    tag: "07 // OPERATIONS",
    client: "Porter & Lane",
    sector: "Furniture",
    situation: "Founders were making tactical media decisions between other work.",
    changed: "Embedded a strategist in Slack with weekly optimisation calls and a written weekly read of the numbers.",
    result: "24/7 strategic access, zero order-taker meetings",
  },
  {
    tag: "08 // SCALE",
    client: "Multi-brand portfolio",
    sector: "Ecommerce",
    situation: "Nine brands managed with inconsistent process and no shared learning.",
    changed: "Standardised creative testing, attribution and reporting across the portfolio so a winning angle in one brand was tested in the rest.",
    result: "$500K+ monthly spend managed at 3.1× average multiple",
  },
];

export default function WorkPage() {
  return (
    <PageShell active="/work">
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
          margin, that is what it says.
        </p>
        <div className="flinza-pagehead-actions">
          <Link href="/contact" className="flinza-btn flinza-btn-solid">Discuss your account</Link>
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
                  <footer style={{ marginTop: 12, fontFamily: "var(--font-ui)", fontSize: 12.5, fontStyle: "normal" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <img src={quote.avatar} alt="" width={24} height={24} loading="lazy" style={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover" }} />
                      <strong style={{ fontWeight: 600, color: "#09090b" }}>{quote.name}</strong>
                      <span style={{ color: "#71717a" }}>{quote.role}</span>
                    </span>
                  </footer>
                </blockquote>
              ) : null}
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}
