"use client";

/*
 * SiteHeader — the header every route shares.
 *
 * The homepage pins the liquid-metal logo dead centre at the top. Every other page invented
 * its own bar (or had none at all), so the brand mark moved around the site. This is that same
 * centred metal mark, on the same ground, with the nav to its left and the camo CTA to its
 * right — so /about, /contact, /careers and the 404 all open like the home page does.
 *
 * The mark is absolutely centred rather than flex-centred so the nav and CTA can differ in
 * width without dragging the logo off the true midpoint.
 */

import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import CamoCtaButton from "./CamoCtaButton";
import PageRail from "./PageRail";

const LiquidMetal = dynamic(() => import("./LiquidMetal"), {
  ssr: false,
  /* The shader is decoration on top of a mark that is already on screen, so the async chunk
   * needs no fallback of its own — see the still image below it in the markup. */
  loading: () => null,
});

/* Fetch the shader chunk as soon as this module is evaluated on the client rather than waiting for
 * hydration to reach the header. It is ~16 KB, and starting it early is the difference between the
 * metal arriving with the first paint and the metal arriving visibly late on a slow connection. */
if (typeof window !== "undefined") {
  import("./LiquidMetal").catch(() => {});
}

/* The still mark. It is always rendered, never swapped out, and never gated on a chunk: the
 * header paints the logo on the very first frame on every route. The metal shader is layered
 * over it and takes over as it draws, so there is no `` logo-arriving-late '' slot and no
 * spinner — the vendored shader's own black "processing" veil is hidden in globals.css. */
const MARK_SRC = "/images/flinza_logo_hd.png";

const NAV = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Creators", href: "/influencer-marketing" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
];

export default function SiteHeader({ active = null, cta = "Book a call" }) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      {/* Page routes live in the left margin now, above the in-page section rail, so the header
          row is only the mark and the CTA. See PageRail. */}
      <PageRail />

      <header className="flinza-site-head flinza-safe-top">
        <nav className="flinza-shell-nav flinza-site-head-nav" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={active === item.href ? "is-active" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="flinza-site-head-mark flinza-mark-stack"
          aria-label="Flinza Works home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="flinza-mark-still"
            src={MARK_SRC}
            alt=""
            width={60}
            height={60}
            fetchPriority="high"
            decoding="sync"
          />
          <LiquidMetal
            speed={0.15}
            dispersion={0.015}
            edge={0.4}
            liquify={0.07}
            patternScale={2}
            imageSource={MARK_SRC}
          />
        </Link>

        <div className="flinza-site-head-actions">
          <CamoCtaButton href="/contact" size="sm">
            {cta}
          </CamoCtaButton>

          <button
            type="button"
            className="flinza-shell-menu-btn"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className={menuOpen ? "is-open" : undefined} />
          </button>
        </div>
      </header>

      <div className={`flinza-shell-menu${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={active === item.href ? "is-active" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
        </nav>
      </div>
    </>
  );
}
