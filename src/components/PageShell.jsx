"use client";

/*
 * PageShell — the frame every inner page shares.
 *
 * The existing inner routes each invented their own header, ground and footer, so they read as
 * separate websites. This gives the new pages one shape: the same noisy gradient ground, the
 * same logo and navigation, the same editorial display type, and the same footer.
 *
 * The header here is deliberately not the homepage's floating liquid-metal logo — that one is
 * tied to the hero's scroll state. This is a quiet, static bar that works on any page, and it
 * carries the safe-area inset so nothing sits under the notch on an iPhone.
 */

import * as React from "react";
import Link from "next/link";
import SiteGround from "./SiteGround";
import SocialGlassRow from "./SocialGlassRow";

const NAV = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Creators", href: "/influencer-marketing" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
];

export default function PageShell({ children, active = null }) {
  // The desktop nav is hidden below 820px, so phones get a real menu instead of no navigation.
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
    <div className="flinza-shell">
      <SiteGround />

      <header className="flinza-shell-head">
        <Link href="/" className="flinza-shell-brand" aria-label="Flinza Works home">
          <img src="/images/flinza_logo_hd.png" alt="" width={34} height={34} />
          <span>Flinza Works</span>
        </Link>

        <nav className="flinza-shell-nav" aria-label="Primary">
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

        <div className="flinza-shell-head-actions">
          <Link href="/contact" className="flinza-shell-cta">
            Book a call
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

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

      {/* Phone menu: a plain stacked list on the same ground, so it stays legible and cheap */}
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
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </nav>
      </div>

      <main className="flinza-shell-main">{children}</main>

      <footer className="flinza-shell-foot">
        <div className="flinza-shell-foot-top">
          <div className="flinza-shell-foot-brand">
            <Link href="/" aria-label="Flinza Works home">
              <img src="/images/flinza_logo_hd.png" alt="" width={38} height={38} />
              <span>Flinza Works</span>
            </Link>
            <p>We test. We scale. We grow. Repeat.</p>
            <SocialGlassRow />
          </div>

          <nav className="flinza-shell-foot-nav" aria-label="Footer">
            <div>
              <h4>Services</h4>
              {["Revenue audit", "Creative production", "AI UGC", "Influencer marketing", "Paid media"].map((s) => (
                <Link key={s} href="/services">{s}</Link>
              ))}
            </div>
            <div>
              <h4>Company</h4>
              <Link href="/about">About</Link>
              <Link href="/work">Case studies</Link>
              <Link href="/insights">Insights</Link>
              <Link href="/careers">Careers</Link>
            </div>
            <div>
              <h4>Start</h4>
              <Link href="/contact">Book a call</Link>
              <a href="mailto:hello@flinzaworks.com">hello@flinzaworks.com</a>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </div>
          </nav>
        </div>

        <div className="flinza-shell-foot-base flinza-safe-bottom">
          <span>© {new Date().getFullYear()} Flinza Works · Ecommerce growth agency</span>
          <span>Built for profit, not vanity metrics.</span>
        </div>
      </footer>
    </div>
  );
}
