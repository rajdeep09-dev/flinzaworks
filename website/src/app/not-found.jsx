"use client";

/*
 * Custom 404 (item 12).
 *
 * The reference component is a little keyboard-driven runner game. It is kept as authored and
 * given a glass frame, because a dead end is the one page where a moment of play is more
 * useful than an apology. Everything else uses the site's own voice: display serif headline,
 * hairline overline, glass routes back into the site.
 */

import dynamic from "next/dynamic";
import SiteGround from "@/components/SiteGround";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CamoCtaButton from "@/components/CamoCtaButton";

const Ninja404 = dynamic(() => import("@/components/Ninja404"), {
  ssr: false,
  loading: () => (
    <div className="flinza-404-stage-loading">
      <span />
    </div>
  ),
});

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flinza-404 flinza-404--head">
        <SiteGround />
      <div className="flinza-404-inner">
        <p className="flinza-404-overline">
          <span />
          404 — Page not found
        </p>

        <h1 className="flinza-display">
          This one got <em>scaled away.</em>
        </h1>

        <p className="flinza-404-body">
          The link is broken or the page has moved. Nothing here is your fault — take the shortcut instead.
        </p>

        <nav className="flinza-404-routes" aria-label="Suggested pages">
          <CamoCtaButton href="/">Back to home</CamoCtaButton>
          <a href="/#stories">See the work</a>
          <a href="/contact">Book a call</a>
        </nav>

        {/* The runner ships `backgroundColor: #ffffff` and a mid-grey ground as its design
            defaults, so on this light ground it rendered as an opaque white box — the one thing
            the page is not allowed to have. Its palette is set explicitly here instead: a
            brand-tinted recess for the play field, ink sprites, and the teal accent for every
            obstacle and label. */}
        <figure className="flinza-404-frame">
          <Ninja404
            backgroundColor="#edf7fa"
            groundColor="rgba(9, 9, 11, 0.24)"
            dinoC1="#09090b"
            obstacleC1="#0f6f86"
            scoreColor="#0f6f86"
            startColor="rgba(9, 9, 11, 0.55)"
            gameOverColor="#09090b"
            restartColor="#0f6f86"
          />
          <figcaption>
            <em>Space to jump, ↓ to duck.</em>
            <span>While you&apos;re here.</span>
          </figcaption>
        </figure>
        </div>
      </main>

      {/* A 404 is the one page nobody arrives at on purpose, so it is the worst place to strand
          someone. Every other route ends in the shared footer — the page routes, the legal links
          and the credit — and without it this was the only page on the site with nowhere to go
          other than the three shortcuts above. */}
      <SiteFooter />
    </>
  );
}
