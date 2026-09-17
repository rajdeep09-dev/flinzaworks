"use client";

/*
 * PageShell — the frame every inner page shares.
 *
 * The existing inner routes each invented their own header, ground and footer, so they read as
 * separate websites. This gives the new pages one shape: the same noisy gradient ground, the
 * same centred liquid-metal mark and navigation as the home page, the same editorial display
 * type, and one footer.
 *
 * The header lives in SiteHeader and the footer in SiteFooter, so the two routes that render
 * their own frames — /contact and /careers — can wear the same chrome instead of going without.
 * /contact previously had no footer at all.
 */

import * as React from "react";
import SiteGround from "./SiteGround";
import SiteHeader from "./SiteHeader";
import PageToc from "./PageToc";
import SiteFooter from "./SiteFooter";

export default function PageShell({ children, active = null, toc = true }) {
  return (
    <div className="flinza-shell">
      <SiteGround />

      <SiteHeader active={active} />

      {/* The in-page rail, built from this page's own headings at mount. */}
      {toc ? <PageToc /> : null}

      <main className="flinza-shell-main">{children}</main>

      <SiteFooter />
    </div>
  );
}
