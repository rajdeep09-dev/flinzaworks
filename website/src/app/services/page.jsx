/*
 * /services — the index of the eight offers, one line each. A server component.
 *
 * ── What changed ──
 *
 * The list was inline, it had seven entries, and one of them was "AI UGC at scale" — a service the
 * studio does not sell any more and the client asked to be removed from the site entirely. The
 * eight that remain are the ones actually delivered: the revenue-leak audit, Meta ads, creator-led
 * content, founder-led content, launch clipping, conversion video, profit-first optimisation and
 * 48-hour iteration.
 *
 * Five of the eight now link to their own landing page (`/services/<cluster>`), which is what the
 * search strategy needs: one page per keyword cluster rather than one generic page trying to rank
 * for five different searches. The three that do not have a landing page yet link straight to the
 * booking flow, because a link that goes nowhere useful is worse than no link.
 */

import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/PageShell";
import CamoCtaButton from "@/components/CamoCtaButton";
import { SERVICES } from "@/data/services";
import { breadcrumbSchema, howToSchema, serviceListSchema } from "@/data/seo";

export const metadata = {
  title: "Services — Ecommerce Growth, Engineered for Profit",
  description:
    "Meta ads, 48-hour creative testing, creator-led and founder-led content, launch clipping and profit-first optimisation for ecommerce brands spending $50K+ a month. See what each one is.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — growth engineered for profit | Flinza Works",
    description:
      "Eight offers, each with what it is and who it is for: revenue audits, Meta ads, creators, founder content, clipping, conversion video, optimisation and iteration.",
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — growth engineered for profit | Flinza Works",
    description:
      "Revenue audits, Meta ads, creator-led and founder-led content, launch clipping, conversion video and profit-first optimisation.",
  },
};

/* The engagement process, as steps. It is rendered as a numbered block on the page AND mirrored
 * into HowTo structured data, which is one of the formats an AI Overview or a voice assistant
 * answers "how does Flinza Works work" from. */
const PROCESS = [
  {
    name: "Discovery",
    text: "A 30-minute call to understand the offer, the margin and the bottleneck. If we are not the right fit, we say so on the call.",
  },
  {
    name: "Audit",
    text: "We audit funnel, creative and attribution, then return a written read of the three to five things actually costing you money, ranked by monthly cost.",
  },
  {
    name: "Engagement",
    text: "A fixed quote within 48 hours. Work starts in week one with a creative testing cycle already running, and a strategist in your Slack.",
  },
];

export default function ServicesPage() {
  return (
    <PageShell active="/services">
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Services", path: "/services" }]),
          /* The eight offers as a list, built from the same `SERVICES` array rendered below. The
             page had a HowTo (how an engagement starts) but no description of what is being sold,
             which is the thing a search for "what does a DTC growth agency do" is actually asking
             for. Each entry carries its own description and, where a landing page exists, its URL
             — so a model can answer the question and cite the right page without guessing. */
          serviceListSchema(SERVICES),
          howToSchema({
            name: "How Flinza Works starts with a new ecommerce client",
            description:
              "How Flinza Works scopes an engagement: a discovery call, a written audit of the funnel, creative and attribution, and a fixed quote within 48 hours.",
            steps: PROCESS.map((step) => ({ ...step, url: "/contact" })),
          }),
        ]}
      />

      <div className="flinza-pagehead">
        <p className="flinza-pagehead-overline">
          <i />
          Services
        </p>
        <h1>
          Eight ways we move <em>ecommerce revenue</em>
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
              {service.slug ? (
                <Link
                  href={`/services/${service.slug}`}
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
                  More on {service.title.toLowerCase()}
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* The engagement, in three steps. Also emitted as HowTo structured data above. */}
      <div className="flinza-section-title">
        <h2>How an engagement starts</h2>
        <p>Three steps, and the first one is free of charge whether or not you become a client.</p>
      </div>
      <div className="flinza-grid flinza-grid-3">
        {PROCESS.map((step, index) => (
          <div key={step.name} className="flinza-tile">
            <span className="flinza-tile-num">{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.name}</h3>
            <p>{step.text}</p>
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
