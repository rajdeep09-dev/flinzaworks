"use client";

/*
 * SiteGround — the site's noisy gradient, as one shared layer.
 *
 * The homepage had this background inline, and every other route was left to invent its own
 * (the contact page used a dark teal gradient over a photographic hill). That is why the
 * pages felt like different websites. Rendering the same ground on every route keeps them
 * one site, and its two textures are self-hosted WebP now instead of two PNGs fetched from
 * framerusercontent.com on each load.
 *
 * It is a fixed, non-interactive layer behind the content, and pure CSS gradients plus one
 * SVG filter — no canvas, no WebGL — so it costs a phone almost nothing.
 */

import * as React from "react";
import EtherealShadow from "./EtherealShadow";

export default function SiteGround({ opacity = 0.38 }) {
  return (
    <div className="flinza-ground" aria-hidden="true">
      <EtherealShadow
        color1="rgba(246, 251, 252, 0.95)"
        color2="#7FD1DE"
        color3="#2E93AC"
        shadowOpacity={opacity}
        animation={{ preview: false, scale: 0, speed: 0, duration: 8 }}
        noise={{ opacity: 0.38, scale: 0.85 }}
      />
    </div>
  );
}
