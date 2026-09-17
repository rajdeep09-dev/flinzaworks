"use client";

import Link from "next/link";
import PageShell from "@/components/PageShell";
import CamoCtaButton from "@/components/CamoCtaButton";

/*
 * Services index — the seven offers in one place, each with what it is and who it is for.
 * The homepage carries the short version; this is the page a prospect sends to their founder.
 */

const SERVICES = [
  {
    number: "01",
    title: "Revenue leak audit",
    for: "Brands that cannot explain where growth stalled",
    copy: "We audit funnel, creative, attribution and margin, then rank the three to five bottlenecks by how much they cost you per month.",
    link: null,
  },
  {
    number: "02",
    title: "Conversion video production",
    for: "Products that need better creative, fast",
    copy: "Product video shot, edited and tested on 48-hour cycles. Multiple angles per cycle, so winners surface inside two weeks.",
    link: null,
  },
  {
    number: "03",
    title: "AI UGC at scale",
    for: "Brands that need volume without creator bottlenecks",
    copy: "Custom AI avatars produce unlimited user-generated content at a fraction of the cost of paid creators — up to ten times the angles tested per month.",
    link: null,
  },
  {
    number: "04",
    title: "Profit-first paid media",
    for: "Accounts with spend but no profit",
    copy: "Meta, TikTok and Google rebuilt around contribution margin instead of platform-reported ROAS, with budget allocated to what actually pays.",
    link: null,
  },
  {
    number: "05",
    title: "Profit contribution modelling",
    for: "High-ROAS brands quietly burning cash",
    copy: "Northbeam, GA4 and Triple Whale modelling that separates real profit from the numbers the platforms want you to celebrate.",
    link: null,
  },
  {
    number: "06",
    title: "Influencer marketing",
    for: "Brands with margin for creator partnerships",
    copy: "Vetted creators, negotiated contracts, licensed content that runs as ad creative, and a hard cost per acquired customer for each partnership.",
    link: "/influencer-marketing",
  },
  {
    number: "07",
    title: "Embedded growth pod",
    for: "Teams that want a strategist on call",
    copy: "A strategist inside your Slack with weekly optimisation calls — challenging assumptions instead of waiting on tickets.",
    link: null,
  },
];

export default function ServicesPage() {
  return (
    <PageShell active="/services">
      <div className="flinza-pagehead">
        <p className="flinza-pagehead-overline">
          <i />
          Services
        </p>
        <h1>
          Seven ways we move <em>ecommerce revenue</em>
        </h1>
        <p>
          Each service stands alone or runs as one system. Most engagements start with the audit and
          end up running creative, media and creators together — because that is where the compounding
          happens.
        </p>
        <div className="flinza-pagehead-actions">
          <CamoCtaButton href="/contact">Start with an audit</CamoCtaButton>
          <Link href="/influencer-marketing" className="flinza-btn flinza-btn-ghost">Creator partnerships</Link>
        </div>
      </div>

      <div className="flinza-grid" style={{ gridTemplateColumns: "minmax(0, 1fr)" }}>
        {SERVICES.map((service) => (
          <div
            key={service.number}
            className="flinza-tile"
            style={{ display: "grid", gridTemplateColumns: "auto minmax(0, 1fr)", gap: "6px 22px", alignItems: "start" }}
          >
            <span className="flinza-tile-num" style={{ gridRow: "1 / span 2", margin: 0, fontSize: 13 }}>
              {service.number}
            </span>
            <div>
              <h3 style={{ fontSize: "clamp(20px, 2.4vw, 28px)", fontFamily: "var(--font-display)", fontWeight: 400 }}>
                {service.title}
              </h3>
              <span
                style={{
                  display: "inline-block",
                  margin: "2px 0 12px",
                  fontSize: 10.5,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--aqua-deep)",
                }}
              >
                For {service.for}
              </span>
              <p style={{ maxWidth: "68ch" }}>{service.copy}</p>
              {service.link ? (
                <Link
                  href={service.link}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    marginTop: 14,
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: "var(--aqua-deep)",
                    textDecoration: "none",
                  }}
                >
                  Explore the creator programme
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "clamp(46px, 7vw, 90px)" }}>
        <h2
          className="flinza-display"
          style={{ margin: "0 0 14px", fontSize: "clamp(26px, 4vw, 46px)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
        >
          Not sure which one you need?
        </h2>
        <p style={{ margin: "0 auto 26px", maxWidth: "52ch", fontSize: 16, fontWeight: 300, lineHeight: 1.6, color: "#52525b" }}>
          That is what the audit is for. We will tell you which lever moves first — and which ones
          can wait.
        </p>
        <CamoCtaButton href="/contact">Book a discovery call</CamoCtaButton>
      </div>
    </PageShell>
  );
}
