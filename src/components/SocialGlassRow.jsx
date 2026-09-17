"use client";

/*
 * Footer socials on the vendored Liquid Chrome Button.
 *
 * The row used to be built on the Glassy button, whose shell is a light silver gradient — it
 * never matched the contact page's liquid-glass control. Each social is now the same Liquid
 * Chrome Button the contact page uses, so the footer carries the identical piece of the brand:
 * a real glass sphere with the chrome ring, driven by its own WebGL material.
 *
 * Glyphs are passed as `customIcon` SVG files (the component masks them, so they inherit the
 * white icon treatment) — never emoji, and never a raster icon.
 */

import * as React from "react";
import LiquidChromeButton from "./LiquidChromeButton";
import { MAILTO } from "@/lib/site";

const SOCIALS = [
  { label: "Flinza Works on Instagram", href: "https://instagram.com/flinzaworks", icon: "/icons/social/instagram.svg" },
  { label: "Flinza Works on Facebook", href: "https://facebook.com/flinzaworks", icon: "/icons/social/facebook.svg" },
  { label: "Flinza Works on X", href: "https://x.com/flinzaworks", icon: "/icons/social/x.svg" },
  { label: "Flinza Works on LinkedIn", href: "https://linkedin.com/company/flinzaworks", icon: "/icons/social/linkedin.svg" },
  { label: "Email Flinza Works", href: MAILTO, icon: "/icons/social/mail.svg" },
];

export default function SocialGlassRow() {
  return (
    <div className="flinza-social-glass" role="list">
      {SOCIALS.map((social) => (
        <span key={social.label} role="listitem" className="flinza-social-glass-link" title={social.label}>
          <LiquidChromeButton
            customIcon={social.icon}
            size={52}
            borderWidth={4}
            animationSpeed={0.65}
            glassOpacity={0.14}
            link={social.href}
          />
        </span>
      ))}
    </div>
  );
}
