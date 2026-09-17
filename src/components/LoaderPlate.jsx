"use client";

/*
 * LoaderPlate — the loading overlay, rebuilt on the Framer `AnimationLoader` structure.
 *
 * The reference component (Animation loader, eHagKV) is a full-bleed plate with four beats:
 *
 *   1. The brand name arrives at the TOP-LEFT, character by character, each character coming up
 *      out of a 10px blur with a spring — not a fade, a focus pull.
 *   2. A single hairline DRAWS ITSELF across the plate from the left, tracking the counter.
 *   3. The percentage counts to 100 in the bottom-right at display scale, with the `%` set small
 *      beside it. This is the loudest thing on the plate and the reason it reads as a real loader
 *      rather than a spinner.
 *   4. On exit the plate's corner radius animates to 50% — the whole surface becomes a lens — and
 *      it lifts away, uncovering the page underneath.
 *
 * What is ours rather than the reference's:
 *
 *   · The plate is the site's noisy gradient, not a flat white fill. A white loader in front of a
 *     tinted site flashes the page's colour on every single navigation.
 *   · The liquid-metal mark sits dead centre. This is the site's identity, and centring it means
 *     the wait is spent looking at the brand instead of a progress bar.
 *   · The percentage is REAL. The reference counts on a fixed 3s timer regardless of whether
 *     anything is happening; this takes `pct` from RouteTransition, which only reaches 100 when
 *     the router has actually committed the new route.
 *
 * Everything animated here is transform, opacity, filter or border-radius — all compositor
 * properties — so the loader cannot be the thing that stutters the page it is covering.
 */

import * as React from "react";

const MARK_SRC = "/images/flinza_logo_hd.png";
const WORD = "FLINZA";

export default function LoaderPlate({
  pct = 0,
  entered = true,
  leaving = false,
  reduced = false,
  label = "Loading",
}) {
  const shown = Math.max(0, Math.min(100, Math.round(pct)));

  /* The reference's reveal: blur(10px), 10px below, spring to rest, per character, staggered.
     Under reduced-motion the characters are simply present — no stagger, no blur. */
  const charDelay = (index) => `${index * 34}ms`;

  if (reduced) {
    return (
      <div className="flinza-loader is-static" role="status" aria-live="polite" aria-label={label}>
        <div className="flinza-loader__mask">
          <div className="flinza-loader__ground" aria-hidden="true" />
          <div className="flinza-loader__content">
            <div className="flinza-loader__mark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={MARK_SRC} alt="" width={132} height={132} decoding="sync" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flinza-loader${entered ? "" : " is-entering"}${
        leaving ? " is-leaving" : ""
      }`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      {/* The plate. It is 120% wide so the corner radius can reach 50% without exposing the page
          at the edges while it rounds — the same 120% the reference uses. */}
      <div className="flinza-loader__mask">
        <div className="flinza-loader__ground" aria-hidden="true" />

        {/* The furniture's own coordinate system — and this frame is the whole point.

            The surface above is 120% wide and centred, so its left edge sits 10% of the viewport
            OUTSIDE the screen. Anything positioned against that surface is positioned against a
            box wider than the screen: on a 390px phone the wordmark's `left: 22px` resolved to
            -17px, which is the clipped "F" in the mobile screenshot, and the counter's
            `right: 20px` ran the last digit off the right edge. On desktop the same arithmetic
            put the wordmark 130px off-screen.

            This frame is exactly the plate's box (100/120 = 83.3333% of the surface, centred),
            so everything inside it is positioned against the real viewport again — and it is
            still a child of the surface, so the furniture is clipped by the surface's
            corner-radius on exit and the whole plate still lifts as one piece. */}
        <div className="flinza-loader__frame">
          {/* 1 — the brand word, top-left, per-character focus pull. */}
          <p className="flinza-loader__brand" aria-hidden="true">
            {WORD.split("").map((letter, index) => (
              <i key={`${letter}-${index}`} style={{ animationDelay: charDelay(index) }}>
                {letter}
              </i>
            ))}
            <em>WORKS</em>
          </p>

          {/* 2 — the hairline that draws itself, tracking the real percentage. */}
          <div className="flinza-loader__line" aria-hidden="true">
            <span style={{ transform: `scaleX(${Math.max(0.012, shown / 100)})` }} />
          </div>

          {/* The mark, centred. The one thing this plate does that the reference does not. */}
          <div className="flinza-loader__content" aria-hidden="true">
            <div className="flinza-loader__mark">
              {/* An ordinary <img>, so it paints with the plate's first frame rather than waiting
                  on the shader chunk. See SiteHeader for why the metal is layered over a still. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={MARK_SRC} alt="" width={132} height={132} decoding="sync" />
              <span className="flinza-loader__sheen" />
            </div>
          </div>

          {/* 3 — the counter, bottom-right, at display scale with a small `%`. */}
          <div className="flinza-loader__counter" aria-hidden="true">
            <span className="flinza-loader__num">{String(shown).padStart(2, "0")}</span>
            <span className="flinza-loader__pct">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
