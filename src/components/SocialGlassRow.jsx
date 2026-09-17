"use client";

/*
 * Footer socials on the vendored Glassy button.
 *
 * This is the component the row was always meant to wear. It is a real glass shell — a graduated
 * silver rim, a pressed state that visibly sinks, a hover state that lifts and brightens — and it
 * carries its own motion, so the row reads as five pieces of the brand rather than five decorated
 * circles. globals.css only scales it down from its authored 149x146; none of its states are
 * overridden, so the hover and press animations are the component's own.
 *
 * The glyphs are passed in as `WSwWMRCno` (the component's icon slot). The slot takes a COMPONENT,
 * not a file, so the five `/icons/social/*.svg` drawings are inlined as tiny React components
 * below and read their stroke from `--18mrqx2`, which is the custom property the button sets from
 * its own `color` prop. That is the same contract the component's own icon uses, so the glyphs
 * follow the button's colour and stroke weight instead of being pinned to one of them.
 */

import * as React from "react";
import GlassyButton from "./GlassyButton";
import { MAILTO } from "@/lib/site";

/* The button's icon slot renders whatever it is given and hands it `style`, `className` and its
   own Framer animation props. Anything that is not an SVG attribute is swallowed here so none of
   them reach the DOM as invalid attributes. */
const ICON_BOX = { display: "block", width: "100%", height: "100%" };

function makeIcon(draw) {
  function Icon({ style, className }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        role="presentation"
        focusable="false"
        className={className}
        style={{ ...ICON_BOX, ...style }}
      >
        {draw()}
      </svg>
    );
  }
  Icon.displayName = "SocialIcon";
  return Icon;
}

/* `currentColor`, not the button's own `--18mrqx2` variable: the footer paints these icons with its
   own rules (brand ink at rest, white over the gradient on hover), and those rules set `color` on
   the icon slot. Reading `currentColor` lets the glyphs follow that transition instead of being
   pinned to one colour for good. */
const STROKE = "currentColor";
const STROKE_WIDTH = "1.75";

const InstagramIcon = makeIcon(() => (
  <>
    <rect x="3" y="3" width="18" height="18" rx="5.2" fill="none" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
    <circle cx="12" cy="12" r="4.1" fill="none" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
    <circle cx="17.3" cy="6.7" r="1.15" fill={STROKE} />
  </>
));

const FacebookIcon = makeIcon(() => (
  <path
    fill={STROKE}
    d="M13.5 21v-7.2h2.6l.4-3h-3V8.9c0-.9.3-1.5 1.6-1.5h1.6V4.7c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.1H7.7v3h2.6V21h3.2z"
  />
));

const XIcon = makeIcon(() => (
  <path
    fill={STROKE}
    d="M17.5 3h3.1l-6.8 7.8L21.9 21h-5.5l-4.3-5.6L7 21H3.9l7.1-8.1L3.4 3h5.6l4 5.3L17.5 3zm-1.1 16.1h1.7L7.7 4.8H5.9l10.5 14.3z"
  />
));

const LinkedInIcon = makeIcon(() => (
  <path
    fill={STROKE}
    d="M6.9 8.4H3.8V20h3.1V8.4zM5.35 3.2a1.8 1.8 0 100 3.6 1.8 1.8 0 000-3.6zM20.2 20h-3.1v-6c0-1.5-.5-2.5-1.8-2.5-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1 1V20h-3.1s.1-9.4 0-11.6h3.1v1.6c.4-.7 1.2-1.7 2.9-1.7 2.1 0 3.9 1.4 3.9 4.4V20z"
  />
));

const MailIcon = makeIcon(() => (
  <>
    <rect x="2.8" y="4.8" width="18.4" height="14.4" rx="3.2" fill="none" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
    <path d="M3.7 7.5l7.1 5.2a2 2 0 002.4 0l7.1-5.2" fill="none" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
  </>
));

const SOCIALS = [
  { label: "Flinza Works on Instagram", href: "https://instagram.com/flinzaworks", icon: InstagramIcon, external: true },
  { label: "Flinza Works on Facebook", href: "https://facebook.com/flinzaworks", icon: FacebookIcon, external: true },
  { label: "Flinza Works on X", href: "https://x.com/flinzaworks", icon: XIcon, external: true },
  { label: "Flinza Works on LinkedIn", href: "https://linkedin.com/company/flinzaworks", icon: LinkedInIcon, external: true },
  { label: "Email Flinza Works", href: MAILTO, icon: MailIcon, external: false },
];

export default function SocialGlassRow() {
  return (
    <div className="flinza-social-glass">
      {SOCIALS.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.label}
            className="flinza-social-glass-link"
            href={social.href}
            aria-label={social.label}
            title={social.label}
            {...(social.external ? { target: "_blank", rel: "noreferrer" } : null)}
          >
            <GlassyButton WSwWMRCno={Icon} Z8oK2DnIK={1.75} />
          </a>
        );
      })}
    </div>
  );
}
