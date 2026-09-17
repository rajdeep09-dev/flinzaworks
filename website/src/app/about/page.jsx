"use client";

import Link from "next/link";
import PageShell from "@/components/PageShell";
import CamoCtaButton from "@/components/CamoCtaButton";

/*
 * About — who runs this and how they work.
 * An agency site without one of these reads as a landing page rather than a company, so this
 * covers the operating principles, the numbers we are willing to be held to, and the team.
 */

const PRINCIPLES = [
  {
    number: "01",
    title: "Profit is the metric",
    copy: "ROAS can look healthy while cash burns. We optimise contribution margin — what is actually left after spend, fees and returns — and report on that first.",
  },
  {
    number: "02",
    title: "Test on 48-hour cycles",
    copy: "Creative is the variable that moves the most and costs the least to change. Week-long feedback loops are how accounts stall; we shorten them.",
  },
  {
    number: "03",
    title: "Challenge the brief",
    copy: "If the request is the wrong lever, we say so before taking the budget. Being agreeable is not a service — it is an expensive habit.",
  },
  {
    number: "04",
    title: "You own everything",
    copy: "Ad accounts, creative, creator contracts, data. No hostage clauses, no renegotiation leverage, no lock-in disguised as onboarding.",
  },
];

const TEAM = [
  { name: "Elena Marchetti", role: "Founder & Growth Lead", bio: "Ten years in ecommerce media. Ran paid for two eight-figure DTC brands before Flinza.", avatar: "/images/avatar_elena.jpg" },
  { name: "Marcus Bell", role: "Head of Creative", bio: "Built the 48-hour production system. Previously film and commercial editing.", avatar: "/images/avatar_marcus.png" },
  { name: "Sarah Whitfield", role: "Analyst & Attribution", bio: "Northbeam, GA4 and Triple Whale modelling. Finds the spend nobody can justify.", avatar: "/images/avatar_sarah.jpg" },
  { name: "Charlie Nguyen", role: "Creator Partnerships", bio: "Runs the influencer programme — sourcing, negotiation and creator ad licensing.", avatar: "/images/avatar_charlie.png" },
];

const NUMBERS = [
  ["$500K+", "Monthly ad spend managed"],
  ["34%", "Average ROAS lift"],
  ["48hr", "Creative testing cycle"],
  ["640+", "Creator partnerships"],
];

export default function AboutPage() {
  return (
    <PageShell active="/about">
      <div className="flinza-pagehead">
        <p className="flinza-pagehead-overline">
          <i />
          About Flinza Works
        </p>
        <h1>
          A growth team, not an <em>order-taker</em>
        </h1>
        <p>
          Flinza Works is a small, senior team that runs paid media, creative production and creator
          partnerships for ecommerce brands. We are hired when a brand has proven product-market fit
          and needs the machine around it to work.
        </p>
        <div className="flinza-pagehead-actions">
          <CamoCtaButton href="/contact">Book a discovery call</CamoCtaButton>
          <Link href="/work" className="flinza-btn flinza-btn-ghost">See the work</Link>
        </div>
      </div>

      <div className="flinza-statband">
        {NUMBERS.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="flinza-section-title">
        <h2>How we operate</h2>
        <p>Four principles that decide every recommendation we make.</p>
      </div>
      <div className="flinza-grid flinza-grid-2">
        {PRINCIPLES.map((item) => (
          <div key={item.number} className="flinza-tile">
            <span className="flinza-tile-num">{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </div>
        ))}
      </div>

      <div className="flinza-section-title">
        <h2>The team</h2>
        <p>Everyone who touches your account is listed here. No account-manager relay.</p>
      </div>
      <div className="flinza-grid flinza-grid-4">
        {TEAM.map((person) => (
          <div key={person.name} className="flinza-tile" style={{ padding: "20px" }}>
            <img
              src={person.avatar}
              alt=""
              width={56}
              height={56}
              loading="lazy"
              style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", display: "block", marginBottom: 16 }}
            />
            <h3 style={{ fontSize: 16.5 }}>{person.name}</h3>
            <span
              style={{
                display: "block",
                marginBottom: 10,
                fontSize: 10.5,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--aqua-deep)",
              }}
            >
              {person.role}
            </span>
            <p>{person.bio}</p>
          </div>
        ))}
      </div>

      <div className="flinza-section-title">
        <h2>Working with us</h2>
        <p>
          Fixed-scope retainers, weekly optimisation calls, and a shared Slack channel with the
          strategist who owns your numbers. No hourly billing and no surprise invoices.
        </p>
      </div>
      <div className="flinza-grid flinza-grid-3">
        {[
          ["Discovery", "A 30-minute call to understand the offer, the margin and the bottleneck. If we are not the right fit, we say so on the call."],
          ["Audit", "We audit funnel, creative and attribution, then return a written read of the three to five things actually costing you money."],
          ["Engagement", "A fixed quote within 48 hours. Work starts in week one with a creative testing cycle already running."],
        ].map(([title, copy], index) => (
          <div key={title} className="flinza-tile">
            <span className="flinza-tile-num">{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
