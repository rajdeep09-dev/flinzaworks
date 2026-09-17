"use client";

/*
 * SiteGround — the site's noisy gradient, as one shared layer.
 *
 * The homepage had this background inline, and every other route was left to invent its own (the
 * contact page used a dark teal gradient over a photographic hill). That is why the pages felt
 * like different websites. Rendering the same ground on every route keeps them one site, and its
 * two textures are self-hosted WebP now instead of two PNGs fetched from framerusercontent.com on
 * each load.
 *
 * ── Why this file is written the way it is ──
 *
 * `EtherealShadow` is a vendored Framer component: it imports the Framer runtime and
 * framer-motion. Imported statically — which is how this file used to do it — that pulled the
 * entire Framer runtime (a 531 KB chunk) into the FIRST LOAD of every inner page, because
 * PageShell renders this ground. That alone was the difference between the home page's 111 kB of
 * JavaScript and the ~290 kB every inner route was shipping, in exchange for a background image.
 *
 * So the ground is now painted in two layers:
 *
 *   1. A CSS layer that is always present. It is a gradient stack plus the self-hosted grain
 *      tile, which paints before any JavaScript runs and cannot fail.
 *   2. The vendored component, loaded lazily, laid over it for the extra depth its SVG filter
 *      adds. If it never arrives — a blocked chunk, an old browser, a failed request — the ground
 *      is still a brand gradient with grain, not a blank page.
 *
 * `shadowOpacity` is lower than it used to be because the CSS layer now contributes some of the
 * haze itself; the two together land on the same density as the single heavier layer did.
 */

import * as React from "react";
import dynamic from "next/dynamic";

const EtherealShadow = dynamic(() => import("./EtherealShadow"), {
  ssr: false,
  loading: () => null,
});

export default function SiteGround({ opacity = 0.26 }) {
  return (
    <div className="flinza-ground" aria-hidden="true">
      {/* Layer 1: the CSS ground. Never absent, never waits on a chunk. */}
      <div className="flinza-ground-base" />
      <div className="flinza-ground-grain" />
      {/* Layer 2: the vendored haze, on top, when it lands. */}
      <div className="flinza-ground-shadow">
        <EtherealShadow
          color1="rgba(246, 251, 252, 0.95)"
          color2="#7FD1DE"
          color3="#2E93AC"
          shadowOpacity={opacity}
          animation={{ preview: false, scale: 0, speed: 0, duration: 8 }}
          noise={{ opacity: 0.24, scale: 0.85 }}
        />
      </div>
    </div>
  );
}
