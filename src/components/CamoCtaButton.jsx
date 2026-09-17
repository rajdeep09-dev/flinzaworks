"use client";

/*
 * CamoCtaButton — the site's one call-to-action.
 *
 * The old CTAs were flat brand-gradient pills, which read as generic "AI agency" buttons.
 * This drives the vendored CamoLiquid shader (the same shader behind the hero's Explore
 * Stories button) as the pill's own background, so a CTA looks like a piece of the brand
 * rather than a coloured rectangle.
 *
 * The camo is painted permanently rather than on hover — the vendored CamoLiquidButton only
 * reveals its camo on hover, which means the button looks plain until someone mouses over it.
 * Here the shader is always on, and the hover state is a permanent-feeling lift plus sheen.
 *
 * The shader runs one WebGL context per button. Only ever place one of these per view.
 */

import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

/* The camo surface is a static, pre-mixed version of the shader's palette, and it is rendered
 * ALWAYS — not just as a loading fallback.
 *
 * This is the difference between a pill that looks finished and a pill that looks broken. As a
 * fallback it only covers the chunk download, so there was still a window — after the chunk
 * resolved but before the shader had compiled and drawn its first frame — where the canvas was
 * transparent and the pill had no surface at all. Casting the static layer permanently underneath
 * means the pill is camo on the very first painted frame, and the shader simply paints over it
 * when it is ready. Nothing swaps, nothing flashes, nothing is ever empty. */
const CamoLiquid = dynamic(() => import("./CamoLiquidButton/CamoLiquid"), {
  ssr: false,
  loading: () => null,
});

/* Start the shader chunk download as soon as this module is evaluated on the client, in parallel
 * with hydration, instead of waiting for React to mount the button. The chunk is ~16-28 KB, so
 * fetching it early is nearly free, and it means the shader is usually already resolved by the
 * time the button mounts. Fired at module scope on the client only, and guarded so an assessment
 * about the failure never leaves an unhandled rejection behind. */
if (typeof window !== "undefined") {
  import("./CamoLiquidButton/CamoLiquid").catch(() => {});
}

const CAMO_DARK = "rgb(9, 58, 72)";
const CAMO_MID = "rgb(23, 132, 155)";
const CAMO_LIGHT = "rgb(74, 178, 199)";

export default function CamoCtaButton({
  href = "/contact",
  children,
  icon = null,
  className = "",
  size = "md",
  tone = "brand",
  as = "link",
  onClick,
  type = "button",
  disabled = false,
}) {
  const wrapperClass = `flinza-camo-cta flinza-camo-cta--${size} flinza-camo-cta--${tone} ${className}`.trim();

  const body = (
    <>
      <span className="flinza-camo-cta__static" aria-hidden="true" />
      <span className="flinza-camo-cta__shader" aria-hidden="true">
        {/* The shader's blotches are scaled up and the repeat count pulled to one, because at the
            pill's size the previous settings put roughly ten diagonal bands across a 130px button
            and the result read as cross-hatching rather than as camo. Larger, fewer, softer
            shapes are what camo looks like when it is only 40px tall. */}
        <CamoLiquid
          rounding="999px"
          depth={0.5}
          roughness={0.58}
          rgbSplit={0.1}
          scale={2.4}
          stretch={0.34}
          angle={32}
          repeats={1}
          offset={0.1}
          phase={0.2}
          evolution={0.1}
          paletteA={CAMO_DARK}
          paletteB={CAMO_MID}
          paletteC={CAMO_LIGHT}
          paletteOrder="1,2,3,1,2,3,1"
        />
      </span>
      <span className="flinza-camo-cta__sheen" aria-hidden="true" />
      <span className="flinza-camo-cta__label">
        {children}
        {icon}
      </span>
    </>
  );

  // A button variant so the camo treatment can also drive actions (opening the Cal modal)
  // rather than only navigation.
  if (as === "button") {
    return (
      <button type={type} className={wrapperClass} onClick={onClick} disabled={disabled}>
        {body}
      </button>
    );
  }

  if (typeof href === "string" && href.startsWith("#")) {
    return (
      <a href={href} className={wrapperClass}>
        {body}
      </a>
    );
  }

  return (
    <Link href={href} className={wrapperClass}>
      {body}
    </Link>
  );
}
