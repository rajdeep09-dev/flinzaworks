"use client";

/*
 * error.tsx — the route-level error boundary.
 *
 * ── Why this file exists ──
 *
 * The site had no error.tsx and no global-error.tsx, only not-found.jsx. That is a real gap, and
 * it is why a fault in ONE component could take down the whole page: with no boundary, Next.js
 * falls back to its own screen, and that screen replaces the entire document with
 * "Application error: a client-side exception has occurred". The header, the hero, the case
 * studies, everything the server rendered correctly — all discarded, because a single client
 * component threw.
 *
 * This matters more than usual on this site specifically. The home page mounts nine client-only
 * components through next/dynamic — WebGL logos, a Three.js carousel, audio players — and any of
 * them can throw in a browser where WebGL is unavailable, blocked, or software-rendered. The
 * server render of that page is perfect and always has been; the risk is entirely client-side, so
 * the page most needs a boundary that keeps the parts that worked.
 *
 * ── What it does ──
 *
 * Renders in place of the route, inside the root layout, so the site chrome survives. `reset()`
 * re-renders the segment without a full reload, which recovers cleanly from the common case: a
 * transient failure while loading a dynamic chunk. The digest is shown because it is the only
 * handle that ties what the user sees back to the server log in production.
 */

import { useEffect } from "react";

export default function RouteError({ error, reset }) {
  useEffect(() => {
    // In production the console is the only place this surfaces, so send it somewhere real
    // rather than nowhere. Swap for whatever error reporting the site ends up using.
    console.error("Route error on /:", error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "clamp(48px, 10vw, 120px) 24px",
        gap: "18px",
      }}
    >
      <p
        style={{
          margin: 0,
          display: "inline-block",
          padding: "5px 13px",
          borderRadius: 999,
          fontFamily: "var(--font-ui)",
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--aqua-deep)",
          background: "rgba(23, 132, 155, 0.1)",
          border: "1px solid rgba(23, 132, 155, 0.24)",
        }}
      >
        Something failed to load
      </p>

      <h1
        style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontSize: "clamp(26px, 4vw, 40px)",
          lineHeight: 1.1,
          letterSpacing: "-0.015em",
          color: "var(--ink)",
        }}
      >
        This part of the page didn&rsquo;t load
      </h1>

      <p
        style={{
          margin: 0,
          maxWidth: "52ch",
          fontSize: 15.5,
          lineHeight: 1.65,
          color: "var(--ink-dim)",
        }}
      >
        One of the interactive pieces failed in your browser — usually a graphics effect that
        cannot run here. Everything else on the page is fine. Try again, and if it keeps
        happening, tell us and we will fix it.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "12px 22px",
            borderRadius: 999,
            border: "1px solid var(--ink)",
            background: "var(--ink)",
            color: "#fbfcfd",
            fontFamily: "var(--font-ui)",
            fontSize: 13.5,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
        <a
          href="/contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "12px 22px",
            borderRadius: 999,
            border: "1px solid var(--ink-faint)",
            color: "var(--ink)",
            fontFamily: "var(--font-ui)",
            fontSize: 13.5,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Report it
        </a>
      </div>

      {error?.digest ? (
        <p
          style={{
            margin: "10px 0 0",
            fontFamily: "var(--font-ui)",
            fontSize: 11.5,
            letterSpacing: "0.06em",
            color: "var(--ink-dim)",
            opacity: 0.7,
          }}
        >
          Reference {error.digest}
        </p>
      ) : null}
    </main>
  );
}
