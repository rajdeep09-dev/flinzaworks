"use client";

import Link from "next/link";
import PageShell from "@/components/PageShell";
import CamoCtaButton from "@/components/CamoCtaButton";

/*
 * Insights index. These are written as notes with a reading time rather than links, because
 * there are no article routes behind them yet and a card that leads nowhere damages trust more
 * than a card that is honestly an excerpt. Full essays publish as they are finished.
 */

const NOTES = [
  {
    kind: "Attribution",
    minutes: 6,
    title: "Your ROAS is lying to you, and it is costing you margin",
    excerpt:
      "Platform-reported ROAS counts revenue that returns, ignores discount dependency and cannot see the customers who would have bought anyway. How to rebuild the number around contribution margin, and what changes in the account once you do.",
  },
  {
    kind: "Creative",
    minutes: 5,
    title: "The 48-hour testing cycle, written out end to end",
    excerpt:
      "Forty angles in six weeks is not a volume trick — it is a decision-rule trick. The brief template, the threshold for scaling, and the reason most brands cannot run this cycle yet.",
  },
  {
    kind: "Creators",
    minutes: 7,
    title: "Why a 60K creator outperforms a 400K one",
    excerpt:
      "Mid-tier creators carry better engagement quality and lower cost per acquisition. What to check before paying anyone, and how to license their content into paid without renegotiating later.",
  },
  {
    kind: "Paid media",
    minutes: 6,
    title: "The audits that find six figures in wasted spend",
    excerpt:
      "The five patterns that show up in almost every underperforming account — duplicated retargeting, permanent discounts, attribution windows tuned to flatter the platform, and two others.",
  },
  {
    kind: "AI UGC",
    minutes: 4,
    title: "AI UGC is a testing tool, not a brand strategy",
    excerpt:
      "Where synthetic creators genuinely win (angle discovery, cost per test) and where they fall down (brand affinity, loyalty). A realistic split of the creative mix by funnel stage.",
  },
  {
    kind: "Operations",
    minutes: 5,
    title: "What an embedded growth pod actually does all week",
    excerpt:
      "A week in the Slack channel: what gets read on Monday, what gets killed on Wednesday, and why the strategist who owns your numbers should not be an account manager.",
  },
];

export default function InsightsPage() {
  return (
    <PageShell active="/insights">
      <div className="flinza-pagehead">
        <p className="flinza-pagehead-overline">
          <i />
          Insights
        </p>
        <h1>
          Notes from inside <em>live accounts</em>
        </h1>
        <p>
          What we learn running paid media, creative and creator programmes for ecommerce brands —
          written for operators rather than search engines.
        </p>
      </div>

      <div className="flinza-grid flinza-grid-2">
        {NOTES.map((note) => (
          <article key={note.title} className="flinza-tile">
            <span className="flinza-tile-num">
              {note.kind} · {note.minutes} min read
            </span>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(20px, 2.2vw, 26px)", letterSpacing: "-0.02em", lineHeight: 1.18 }}>
              {note.title}
            </h3>
            <p>{note.excerpt}</p>
          </article>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "clamp(46px, 7vw, 90px)" }}>
        <p style={{ margin: "0 auto 24px", maxWidth: "54ch", fontSize: 15.5, fontWeight: 300, lineHeight: 1.65, color: "#52525b" }}>
          Full essays publish as they are finished. If you want the next one, or the reasoning behind
          any of these in your own account, that is a conversation rather than a subscription.
        </p>
        <CamoCtaButton href="/contact">Ask us about your account</CamoCtaButton>
      </div>
    </PageShell>
  );
}
