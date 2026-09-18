/*
 * /about — a server component.
 *
 * Nothing on this page is interactive, so it does not need to be a client component at all: it was
 * one only because every route in the app was, and that is the single reason none of them could
 * declare their own metadata. Removing the directive is the whole change — the App Router treats a
 * module without `'use client'` as a server component, and `export const metadata` becomes legal.
 * The interactive pieces it renders (the header's metal mark, the ground, the footer's social row)
 * are client components in their own right, so the boundary is exactly where it should be.
 */

import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/PageShell";
import CamoCtaButton from "@/components/CamoCtaButton";
import { ABOUT_NUMBERS, POSITIONING, TAGLINE, MARKETS } from "@/data/stats";
import { breadcrumbSchema, SITE_URL } from "@/data/seo";

export const metadata = {
  title: "About — A Growth Team, Not an Order-Taker",
  description:
    "Flinza Works is a senior performance team for ecommerce brands: profit-first media buying, 48-hour creative testing and creator partnerships. Meet the team behind your account.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Flinza Works — a growth team, not an order-taker",
    description:
      "Four operating principles, the people who touch your account, and the numbers we are willing to be held to.",
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Flinza Works — a growth team, not an order-taker",
    description:
      "Profit is the metric, testing runs on 48-hour cycles, the brief gets challenged, and you own everything.",
  },
};

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

/* The four figures in the stat band, from `@/data/stats` — the same file the hero, the social card
 * and the Organization schema read. Two of them were previously only on this page, which is how a
 * site ends up quoting a number in one place and contradicting it in another. */
const NUMBERS = ABOUT_NUMBERS;

export default function AboutPage() {
  return (
    <PageShell active="/about">
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "About", path: "/about" }]),
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About Flinza Works',
            url: `${SITE_URL}/about`,
            description: POSITIONING,
            mainEntity: { '@id': `${SITE_URL}/#organization` },
            about: {
              '@type': 'Organization',
              name: 'Flinza Works',
              foundingDate: '2019',
              slogan: TAGLINE,
              areaServed: MARKETS.map((name) => ({ '@type': 'Place', name })),
            },
          },
        ]}
      />
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

      {/* ── The scale behind the account ──
          An agency site that lists four people reads as a four-person agency, and a brand spending
          $80K a month wants to know who is actually behind the work. This band sits directly under
          the four faces and answers that: the four are the people who touch your account, and they
          are the front of a much larger team. */}
      <div className="flinza-scaleband">
        <div>
          <strong>27+</strong>
          <span>More specialists behind your account</span>
        </div>
        <p>
          The four people above are the ones who touch your account — the strategist who owns your
          numbers, creative, analytics and creator partnerships. Behind them sit 27 more
          specialists, and a network of 75+ clippers, editors and creators producing content at
          volume: media buyers, editors, designers and analysts whose work reaches your account every
          week.
        </p>
      </div>

      {/* Who made this website. One quiet line under the team, on the page where "the people
          behind the work" is the subject — not small print repeated on every route. The link
          carries `rel="me"`, the microformat that ties this page to the profile it belongs to,
          and it points at the same Instagram URL as the Person node in the JSON-LD and the
          /colophon page, so the three statements agree rather than compete. */}
      <p className="flinza-creditband">
        <span>This website was designed &amp; built by</span>
        <Link href="/colophon">Rajdeep Debnath</Link>
        <span aria-hidden="true">·</span>
        <a
          href="https://instagram.com/rajdeep.0.21"
          rel="me noopener noreferrer"
          target="_blank"
        >
          @rajdeep.0.21
        </a>
      </p>

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
