"use client";

/*
 * guarded — the one way a client-only component in the shared chrome gets its own error boundary.
 *
 * ── Why this exists ──
 *
 * The home page loads its nine client-only components through a single `dynamicClient` helper in
 * app/HomeClient.jsx, and each one is wrapped in its own ClientBoundary. The shared layout did
 * NOT have that. Five components — the metal header logo, the camo CTA shader, the chrome book
 * button, the footer's social glass row, and the page ground's ethereal shadow — were loaded with
 * a bare `dynamic()` and no boundary at all.
 *
 * That is the same fault as before, in the one place it could not be contained, because those five
 * render from the root layout. `error.jsx` is a ROUTE boundary: it catches throws from the page
 * segment, but the layout sits ABOVE it. A throw in any of those five therefore skipped every
 * boundary on the page and went to `global-error.jsx`, which replaces the entire document. That is
 * precisely the "bare error screen, no hero at all" symptom, and it is why wrapping only the home
 * page's components did not stop it.
 *
 * ── Why it wraps the loaded component rather than calling dynamic() itself ──
 *
 * `next/dynamic` requires its options to be an object LITERAL — the bundler reads them statically
 * to split the chunk, so it rejects a variable. Passing options in from the caller is therefore
 * not possible, and the literal has to stay at the call site. So this takes the already-created
 * dynamic component and wraps it, which also keeps each component's own `loading` fallback
 * exactly as it was.
 *
 * On failure the boundary renders nothing. Every one of these five is a decorative layer sitting
 * beside plain markup that already carries the same meaning — the metal shader over a still <img>
 * of the mark, the camo shader over a styled span, the shadow behind an opaque ground — so an empty
 * slot is the correct degradation and a visible error box is not.
 *
 * `label` is passed to the boundary purely so the console names the component; "something threw"
 * is not debuggable in a minified production build and "LiquidMetal threw" is.
 */

import * as React from "react";
import ClientBoundary from "./ClientBoundary";

export default function guarded(Loaded, label) {
  return function GuardedClientComponent(props) {
    return (
      <ClientBoundary label={label}>
        <Loaded {...props} />
      </ClientBoundary>
    );
  };
}
