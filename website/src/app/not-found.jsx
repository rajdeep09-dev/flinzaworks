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
    <main className="flinza-404">
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
          <a className="flinza-404-primary" href="/">
            Back to home
          </a>
          <a href="/#stories">See the work</a>
          <a href="/contact">Book a call</a>
        </nav>

        <figure className="flinza-404-frame">
          <Ninja404 />
          <figcaption>
            <em>Space to jump, ↓ to duck.</em>
            <span>While you&apos;re here.</span>
          </figcaption>
        </figure>
      </div>
    </main>
  );
}
