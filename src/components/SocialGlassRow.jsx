"use client";

/*
 * Footer socials on the vendored Glassy button (item 6).
 *
 * The reference component ships its own shell gradient, press/hover variants and a soft inner
 * shading; it stays exactly as authored. This wrapper only supplies real glyphs (inline SVG,
 * never emoji) and the brand palette — the shell is restyled to glass in globals.css under
 * `.flinza-social-glass`, because the component's stock finish is a light silver that fights
 * a dark footer.
 */

import * as React from "react";
import GlassyButton from "./GlassyButton";

function Icon({ children }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      {children}
    </svg>
  );
}

const IconInstagram = () => (
  <Icon>
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
  </Icon>
);

const IconFacebook = () => (
  <Icon>
    <path
      d="M13.5 21v-7.2h2.6l.4-3h-3V8.9c0-.9.3-1.5 1.6-1.5h1.6V4.7c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.1H7.7v3h2.6V21h3.2z"
      fill="currentColor"
    />
  </Icon>
);

const IconX = () => (
  <Icon>
    <path
      d="M17.5 3h3.1l-6.8 7.8L21.9 21h-5.5l-4.3-5.6L7 21H3.9l7.1-8.1L3.4 3h5.6l4 5.3L17.5 3zm-1.1 16.1h1.7L7.7 4.8H5.9l10.5 14.3z"
      fill="currentColor"
    />
  </Icon>
);

const IconLinkedIn = () => (
  <Icon>
    <path
      d="M6.9 8.4H3.8V20h3.1V8.4zM5.35 3.2a1.8 1.8 0 100 3.6 1.8 1.8 0 000-3.6zM20.2 20h-3.1v-6c0-1.5-.5-2.5-1.8-2.5-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1 1V20h-3.1s.1-9.4 0-11.6h3.1v1.6c.4-.7 1.2-1.7 2.9-1.7 2.1 0 3.9 1.4 3.9 4.4V20z"
      fill="currentColor"
    />
  </Icon>
);

const IconMail = () => (
  <Icon>
    <rect x="2.8" y="4.8" width="18.4" height="14.4" rx="3" stroke="currentColor" strokeWidth="1.7" />
    <path d="M3.6 7.4l7.2 5.3a2 2 0 002.4 0l7.2-5.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </Icon>
);

const SOCIALS = [
  { label: "Flinza Works on Instagram", href: "https://instagram.com/flinzaworks", icon: IconInstagram },
  { label: "Flinza Works on Facebook", href: "https://facebook.com/flinzaworks", icon: IconFacebook },
  { label: "Flinza Works on X", href: "https://x.com/flinzaworks", icon: IconX },
  { label: "Flinza Works on LinkedIn", href: "https://linkedin.com/company/flinzaworks", icon: IconLinkedIn },
  { label: "Email Flinza Works", href: "mailto:hello@flinzaworks.com", icon: IconMail },
];

export default function SocialGlassRow() {
  return (
    <div className="flinza-social-glass" role="list">
      {SOCIALS.map((social) => (
        <a
          key={social.label}
          role="listitem"
          className="flinza-social-glass-link"
          href={social.href}
          aria-label={social.label}
          target={social.href.startsWith("mailto:") ? undefined : "_blank"}
          rel={social.href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
        >
          <GlassyButton icon={social.icon} color="rgb(244,247,249)" strokeWidth={1.5} style={{ width: 48, height: 48 }} />
        </a>
      ))}
    </div>
  );
}
