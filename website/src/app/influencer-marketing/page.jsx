"use client";

import Link from "next/link";
import PageShell from "@/components/PageShell";
import FaqList from "@/components/FaqList";

/*
 * Influencer marketing — the seventh service, as its own page.
 *
 * Creator work fails on most agency sites because it is sold as reach. This page sells it the
 * way it is actually run here: a creator is a media buy with a face, so every partnership is
 * judged on cost per acquired customer and on how much usable ad creative it produced — not on
 * follower count. The roster below is deliberately niche and mid-tier, because that is where
 * the returns are.
 */

const ROSTER = [
  { name: "Camille Obeng", niche: "Skincare", platform: "TikTok", reach: "182K", er: "7.4%", avatar: "/images/avatar_elena.jpg" },
  { name: "Dev Anand", niche: "Men's Grooming", platform: "Instagram", reach: "94K", er: "5.9%", avatar: "/images/avatar_marcus.png" },
  { name: "Nora Lindqvist", niche: "Home & Interiors", platform: "Instagram", reach: "310K", er: "4.1%", avatar: "/images/avatar_sarah.jpg" },
  { name: "Theo Marchetti", niche: "Coffee & Kitchen", platform: "TikTok", reach: "76K", er: "9.2%", avatar: "/images/avatar_charlie.png" },
  { name: "Ada Whitfield", niche: "Activewear", platform: "YouTube", reach: "128K", er: "6.3%", avatar: "/images/avatar_elena.jpg" },
  { name: "Ruben Costa", niche: "Tech Accessories", platform: "YouTube", reach: "241K", er: "3.8%", avatar: "/images/avatar_marcus.png" },
  { name: "Ines Duarte", niche: "Jewellery", platform: "Instagram", reach: "58K", er: "11.4%", avatar: "/images/avatar_sarah.jpg" },
  { name: "Malik Osei", niche: "Fitness", platform: "TikTok", reach: "415K", er: "5.2%", avatar: "/images/avatar_charlie.png" },
];

const OFFERINGS = [
  {
    number: "01",
    title: "Seeding & gifting",
    copy: "We ship product to a vetted list of creators in your niche, then measure which of them actually posted, what it cost per post, and what it returned. Unpaid seeding is cheap media only when it is tracked.",
  },
  {
    number: "02",
    title: "Paid creator partnerships",
    copy: "Negotiated, contracted, and usage-rights-cleared. We handle briefs, rates, deadlines and follow-ups so your team never chases a creator for a deliverable again.",
  },
  {
    number: "03",
    title: "Whitelisting & creator ads",
    copy: "The highest-return part of the whole programme: creator posts that are licensed back into your paid account and tested as ad creative, with the creator's handle on the ad. It reliably outperforms studio content.",
  },
  {
    number: "04",
    title: "Affiliate & commission deals",
    copy: "For the creators who convert, we structure hybrid flat-fee-plus-commission deals so their upside scales with your margin instead of your vanity metrics.",
  },
];

const PROCESS = [
  { step: "Week 1", title: "Fit and offer", copy: "We define the offer creators will actually say yes to, the audience you need reached, and the CPM ceiling that makes it worth doing." },
  { step: "Week 1–2", title: "Sourcing and vetting", copy: "We build a list from engagement quality, audience geography and prior brand deals — then cut every account whose followers do not buy." },
  { step: "Week 2–4", title: "Production and launch", copy: "Briefs go out, content comes back, and everything ships with tracked links and codes so attribution is never a guess." },
  { step: "Ongoing", title: "Scale the winners", copy: "Double down on creators with real CPM payback, license their content into paid, and retire the rest. The roster compounds." },
];

const PLATFORMS = ["TikTok", "Instagram", "YouTube", "Pinterest", "Snapchat"];

const INFLUENCER_FAQ = [
  {
    number: "01",
    question: "How do you price influencer marketing?",
    answer:
      "Either as a monthly programme fee plus a creator budget you control, or as a retainer scoped to a set number of partnerships per month. You own every contract, every asset and every creator relationship.",
  },
  {
    number: "02",
    question: "Do you work with micro-creators?",
    answer:
      "Yes — and mostly. Mid-tier and micro creators (20K–300K) carry the best cost per acquisition on ecommerce. A 400K account looks better in a deck; a 60K account with an 11% engagement rate usually makes more money.",
  },
  {
    number: "03",
    question: "Who owns the content?",
    answer:
      "You do. Every partnership is negotiated with paid usage rights for a defined window, so creator content can run in your ads without a renegotiation later.",
  },
  {
    number: "04",
    question: "Can this run alongside our paid media?",
    answer:
      "It should. Almost all of the return comes from the combination: creator content tested as ad creative in the same account, measured against studio creative on cost per acquired customer.",
  },
];

export default function InfluencerMarketingPage() {
  return (
    <PageShell active="/influencer-marketing">
      <div className="flinza-pagehead">
        <p className="flinza-pagehead-overline">
          <i />
          Service · Creator partnerships
        </p>
        <h1>
          Influencer marketing that <em>pays for itself</em>
        </h1>
        <p>
          Most creator spend is a brand-awareness line item with no attribution. We run it as a media
          channel instead: vetted creators, tracked links, licensed content, and a hard number for
          cost per acquired customer — then we scale only the partnerships that clear it.
        </p>
        <div className="flinza-pagehead-actions">
          <Link href="/contact" className="flinza-btn flinza-btn-solid">
            Plan a creator programme
          </Link>
          <Link href="/services" className="flinza-btn flinza-btn-ghost">
            All services
          </Link>
        </div>
      </div>

      <div className="flinza-statband">
        {[
          ["8.4M", "Creator audience reached"],
          ["3.2×", "Return on creator spend"],
          ["−38%", "Cost per acquisition vs studio"],
          ["640+", "Partnerships negotiated"],
        ].map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="flinza-section-title">
        <h2>What the programme covers</h2>
        <p>
          Four layers, run together. Seeding finds the creators worth paying; paid partnerships lock
          the output; whitelisting turns their content into your ad creative; commission deals keep
          the best ones aligned long-term.
        </p>
      </div>

      <div className="flinza-grid flinza-grid-2">
        {OFFERINGS.map((item) => (
          <div key={item.number} className="flinza-tile">
            <span className="flinza-tile-num">{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </div>
        ))}
      </div>

      <div className="flinza-section-title">
        <h2>Creators we work with</h2>
        <p>
          A representative slice of the roster — niche, mid-tier, and chosen on engagement quality
          rather than follower count.
        </p>
      </div>

      <div className="flinza-grid flinza-grid-4">
        {ROSTER.map((creator) => (
          <div key={creator.name} className="flinza-tile" style={{ padding: "18px 18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <img
                src={creator.avatar}
                alt=""
                width={44}
                height={44}
                loading="lazy"
                style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", display: "block" }}
              />
              <div style={{ minWidth: 0 }}>
                <strong style={{ display: "block", fontSize: 14.5, fontWeight: 600, letterSpacing: "-0.015em" }}>
                  {creator.name}
                </strong>
                <span style={{ fontSize: 12, color: "#71717a" }}>{creator.niche}</span>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span className="flinza-tile-num" style={{ margin: 0 }}>{creator.platform}</span>
              <span style={{ fontSize: 13, color: "#52525b" }}>
                <strong style={{ fontSize: 15, fontWeight: 600 }}>{creator.reach}</strong> · {creator.er} ER
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flinza-section-title">
        <h2>How a programme runs</h2>
        <p>Four weeks to first content, then a compounding roster.</p>
      </div>

      <div className="flinza-grid flinza-grid-4">
        {PROCESS.map((item, index) => (
          <div key={item.title} className="flinza-tile">
            <span className="flinza-tile-num">
              {String(index + 1).padStart(2, "0")} · {item.step}
            </span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </div>
        ))}
      </div>

      <div className="flinza-section-title">
        <h2>Platforms we run on</h2>
        <p>Creator-led commerce lives on five platforms. We work on all of them and recommend based on your margin, not on trend.</p>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          maxWidth: 1180,
          margin: "0 auto",
        }}
      >
        {PLATFORMS.map((platform) => (
          <span
            key={platform}
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border: "1px solid rgba(23, 132, 155, 0.28)",
              background: "rgba(255, 255, 255, 0.45)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--aqua-deep)",
            }}
          >
            {platform}
          </span>
        ))}
      </div>

      <div className="flinza-section-title">
        <h2>Questions on creator work</h2>
      </div>
      <FaqList items={INFLUENCER_FAQ} />

      <div style={{ textAlign: "center", marginTop: "clamp(46px, 7vw, 90px)" }}>
        <h2
          className="flinza-display"
          style={{ margin: "0 0 14px", fontSize: "clamp(26px, 4vw, 46px)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
        >
          Tell us the product. We will tell you if creators are the right channel.
        </h2>
        <p style={{ margin: "0 auto 26px", maxWidth: "52ch", fontSize: 16, fontWeight: 300, lineHeight: 1.6, color: "#52525b" }}>
          A 30-minute call, an honest answer, and a scoped plan within 48 hours.
        </p>
        <Link href="/contact" className="flinza-btn flinza-btn-solid">
          Book a discovery call
        </Link>
      </div>
    </PageShell>
  );
}
