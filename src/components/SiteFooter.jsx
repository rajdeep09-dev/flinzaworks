"use client";

/*
 * SiteFooter — the one footer, on every route.
 *
 * It lived inline in PageShell, which meant the two pages that do NOT use PageShell — /contact and
 * /careers, both of which are composition-led and render their own headers — had no footer at all.
 * A visitor who landed on /contact from a search result could scroll to the bottom of the page and
 * find nothing: no way to see the services, no way to reach the socials, no legal line. Extracting
 * it is what makes "every page has a footer" a fact rather than a thing to remember.
 *
 * Three things it is deliberately NOT:
 *
 *   · Not a white panel. It is continuous with the page and marked by a hairline, because an
 *     opaque footer box on a tinted ground is the card treatment this design does not use.
 *   · Not flat type. The headline is display serif at up to 74px, the column headings are
 *     letter-spaced uppercase, the links are 15px and the legal line is 12px and dim. Four sizes,
 *     four jobs — the previous footer set almost everything at 14px, so it read as a wall.
 *   · Not decoration at the bottom. The socials sit in a labelled row, because five 52px glass
 *     spheres trailing a paragraph read as ornament rather than as a way to reach the studio.
 */

import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import CamoCtaButton from "./CamoCtaButton";
import { MAILTO } from "@/lib/site";
import { SITE_URL } from "@/data/seo";

/* The socials are lazy, and that is a performance decision rather than a nicety.
 *
 * The row is built on the vendored Liquid Chrome Button, which drives its glass with a real WebGL
 * material and therefore imports `three`. Imported statically, `three` was pulled into the FIRST
 * LOAD of every inner page — /about, /services, /work and the legal pages all shipped roughly
 * 440 kB of JavaScript against the home page's 111 kB, purely to draw five 52px circles at the
 * very bottom of the page. That was the single biggest reason the inner routes felt heavy.
 *
 * The placeholder is drawn from CSS at the same 52px, so the real buttons replace like for like
 * and nothing shifts. */
const SocialFallback = () => (
  <div className="flinza-social-glass" aria-hidden="true">
    {[0, 1, 2, 3, 4].map((index) => (
      <span key={index} className="flinza-social-glass-link flinza-social-glass-placeholder" />
    ))}
  </div>
);

const SocialGlassRow = dynamic(() => import("./SocialGlassRow"), {
  ssr: false,
  loading: SocialFallback,
});

/* ── The footer's link columns ──
 *
 * Three columns, and every one of them is a page that exists. Three things were wrong with the
 * previous set and all three are the same kind of wrong — a link that does not take you where it
 * says it does:
 *
 *   · "AI UGC" pointed at /services and advertised a service the studio has stopped selling.
 *   · Five column links pointed at the same /services page with different labels.
 *   · There was no legal column at all, so /privacy and /terms were reachable only from the small
 *     print at the very bottom, which is exactly where a reader stops looking for them.
 *
 * Now each service links to its own page where one exists, and the Company and Legal columns are
 * the four and two links the client asked for. */
const COLUMNS = [
  {
    heading: "Services",
    links: [
      { label: "Meta ads", href: "/services/meta-ads" },
      { label: "Creative testing", href: "/services/creative-testing" },
      { label: "Creator partnerships", href: "/services/creator-partnerships" },
      { label: "Founder-led content", href: "/services/founder-led-content" },
      { label: "Launch clipping", href: "/services/launch-clipping" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Case Studies", href: "/work" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/insights" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

/* The left rails live at the same x as this footer's brand column, and they are `position: fixed`,
 * so they printed straight through the wordmark, the tagline and the social row. One observer here
 * covers every route — the home page and the inner pages, including the ones that render their own
 * frame — and flags the footer as on screen so the rails fade out. Doing it once, here, is also why
 * neither rail needs its own scroll listener for this. */
function useFooterInView(ref) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        document.body.classList.toggle(
          "flinza-foot-inview",
          entries.some((entry) => entry.isIntersecting)
        );
      },
      /* A little before the footer's top edge, so the rails are already gone by the time the copy
         reaches the band they occupy. */
      { rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      document.body.classList.remove("flinza-foot-inview");
    };
  }, [ref]);
}

export default function SiteFooter() {
  const footerRef = React.useRef(null);
  useFooterInView(footerRef);

  return (
    <footer className="flinza-foot" ref={footerRef}>
      {/* Zone 1 — the closing conversion. QA: the CTA block and the columns below it compressed
          into one visual mass; the hairline rule above the block separates "decide" from
          "navigate" so each gets its own read. */}
      <div className="flinza-foot-cta">
        <div>
          <p className="flinza-foot-kicker">Start</p>
          <h3>
            Let&apos;s find the <em>revenue</em> you&apos;re leaving on the table.
          </h3>
        </div>
        <CamoCtaButton href="/contact" size="lg">
          Book a call
        </CamoCtaButton>
      </div>

      {/* Zone 2 — identity and navigation, kept as one grid (unchanged). */}
      <div className="flinza-foot-grid">
        <div className="flinza-foot-brand">
          <Link href="/" aria-label="Flinza Works home">
            <img src="/images/flinza_logo_hd.png" alt="" width={38} height={38} loading="lazy" />
            <span className="flinza-foot-word">Flinza Works</span>
          </Link>
          <p className="flinza-foot-tag">
            We test. We scale. We grow. Repeat. A senior performance team for ecommerce brands that
            want profit, not vanity metrics.
          </p>
          <div className="flinza-foot-social">
            <p className="flinza-foot-social-label">Follow &amp; reach us</p>
            <SocialGlassRow />
          </div>

          {/* Preferred sources (Google Search) — the Search Central standard implementation: the
              library loaded in layout.jsx scans for the google-add-preferred-source-btn
              attribute below and renders its localized button in place. A reader who picks
              Flinza Works here is served the site with a "preferred" badge in Top Stories, AI
              Mode, AI Overviews and Discover. The deeplink is the docs' no-JS fallback, so the
              invitation survives even if the third-party script is blocked. */}
          <div className="flinza-foot-pref">
            <p className="flinza-foot-social-label">Preferred on Google</p>
            <p className="flinza-foot-pref-copy">
              Pick Flinza Works as a preferred source and Google surfaces our work first in Top
              Stories, AI Overviews and Discover.
            </p>
            <div google-add-preferred-source-btn="" data-theme="light" />
            <a
              className="flinza-foot-pref-link"
              href={`https://www.google.com/preferences/source?q=${new URL(SITE_URL).host}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              How to add us to Google Search ↗
            </a>
          </div>
        </div>

        <nav className="flinza-foot-cols" aria-label="Footer">
          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <h4>{column.heading}</h4>
              {column.links.map((link) => (
                <Link key={`${column.heading}-${link.label}`} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>

      {/* Zone 3 — the typographic close. QA: "too faint to feel intentional" — the wordmark's
          gradient was softened and given a cool tint at the top edge so it reads as a designed
          end, not leftover ink. Still decorative and hidden from assistive tech. */}
      <span className="flinza-foot-mark" aria-hidden="true">
        FLINZA WORKS
      </span>

      {/* The site credit moved out of the footer at the client's request — it lives on /about,
          under the team grid, where "who made this" reads as a fact about the studio rather than
          as small print on every route. The Person entity (/colophon + JSON-LD + llms.txt) still
          carries the same name, role and profile URL, so the structured answer is unchanged. */}

      <div className="flinza-foot-base">
        <span>
          © {new Date().getFullYear()} Flinza Works — ecommerce growth agency. Built for profit,
          not vanity metrics.
        </span>
        <nav aria-label="Legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href={MAILTO}>Email</a>
        </nav>
      </div>
    </footer>
  );
}
