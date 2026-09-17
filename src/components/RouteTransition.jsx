"use client";

/*
 * RouteTransition — the loading overlay that runs on EVERY route change, every time.
 *
 * Why this exists on top of app/loading.jsx.
 *
 * `app/loading.jsx` only covers a route segment that actually suspends. This site's inner pages
 * are static, so a client-side navigation resolves almost instantly and Next had nothing to render
 * in between — you got a flash of bare paper instead of a transition. Worse, the WebGL pieces that
 * sit on every page (the liquid-metal mark and the camo CTA) are dynamic chunks that arrive a beat
 * *after* the route, so the header visibly assembled itself after the page had "arrived".
 *
 * This starts the overlay on the click itself, before the router does anything, and ends it when
 * the router commits the new path. So there is never a bare frame, and the shader chunks have
 * something holding the screen while they arrive.
 *
 * The number is honest. It climbs on a decelerating curve while the route is in flight and snaps
 * to 100 only when `usePathname()` reports the new path — it never claims a finish the router has
 * not performed.
 *
 * On the state machine: "is a navigation in flight" is a REF, not state.
 *
 * It used to be state, read inside the effect that watches the path, and that was broken in a way
 * worth spelling out. The router can commit the new path in a render that still shows the old
 * `phase`, so the effect's closure saw "idle", returned early, and never scheduled the landing
 * sequence, and the overlay then sat on screen at 100% forever. A ref cannot be stale, so the
 * decision "was a navigation started?" is one; and `finish` is idempotent, so it can be reached
 * from the path change, from the failsafe, or from both, and still run exactly once.
 *
 * The overlay no longer hides the header's mark, and that is a simplification worth noting. An
 * earlier design flew the loader's mark up into the header's, which required the header's own
 * mark to be held invisible while the overlay was up — so any failure to close the overlay took
 * the logo off every page of the site. The loader is now a surface that lifts, the header keeps
 * its own mark throughout, and there is nothing left that can hide the brand.
 */

import * as React from "react";
import { usePathname } from "next/navigation";
import LoaderPlate from "./LoaderPlate";

const MIN_VISIBLE_MS = 420; // below this a loader reads as a glitch, not a transition
const MAX_VISIBLE_MS = 5000; // a hard stop so a failed navigation can never trap the screen
const SETTLE_MS = 220; // beat between the route committing and the plate starting to lift
const UNMOUNT_MS = 900; // the plate's lift (700) + the furniture fade (260), with slack

/* Stage words change with progress so the wait has narrative instead of a static "Loading". */
const STAGES = [
  [0, "Booting"],
  [16, "Mapping sections"],
  [38, "Warming shaders"],
  [58, "Fetching the work"],
  [78, "Laying out type"],
  [94, "Almost there"],
];

function stageFor(pct) {
  let label = STAGES[0][1];
  for (const [at, text] of STAGES) {
    if (pct >= at) label = text;
  }
  return label;
}

export default function RouteTransition() {
  const pathname = usePathname();
  const [phase, setPhase] = React.useState("idle"); // idle | running | landing | leaving
  const [pct, setPct] = React.useState(0);
  const [entered, setEntered] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);

  const firstPaint = React.useRef(true);
  const inflight = React.useRef(false); // a navigation has been started and not yet finished
  const landing = React.useRef(false); // the landing sequence has been kicked off
  const startedAt = React.useRef(0);
  const targetPath = React.useRef(null);
  const rafRef = React.useRef(0);
  const timers = React.useRef([]);

  const clearTimers = React.useCallback(() => {
    timers.current.forEach((id) => clearTimeout(id));
    timers.current = [];
  }, []);

  const later = React.useCallback((fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  }, []);

  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setReduced(true);
    }
    const rootTimers = timers;
    return () => {
      rootTimers.current.forEach((id) => clearTimeout(id));
      rootTimers.current = [];
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── The cold load ──
   *
   * The overlay only ran on client-side navigations, so the transitions a visitor actually watched
   * were the ones AFTER they had already waited for the site once. The first load — the one where
   * the shader chunks, the fonts and the hero image are all still arriving — had no overlay at all,
   * which is why the home page in particular opened as a half-built page that assembled itself in
   * front of you.
   *
   * So the plate now runs on a cold load too, and the percentage is honest there as well: it holds
   * while `load` has not fired and finishes when the last blocking subresource is in, capped at
   * 2.6s so a slow third-party request can never trap the screen behind the plate.
   *
   * The minimum-visible floor is enforced with a bare timeout rather than through `later`, because
   * `later`'s timers are swept by `clearTimers` — and a click during the cold load must not be able
   * to cancel the one timer that closes this plate. */
  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const bootAt = performance.now();
    start(window.location.pathname + window.location.search);

    let closed = false;
    const close = () => {
      if (closed) return;
      closed = true;
      window.setTimeout(finish, Math.max(0, MIN_VISIBLE_MS - (performance.now() - bootAt)));
    };

    if (document.readyState === "complete") {
      close();
    } else {
      window.addEventListener("load", close, { once: true });
    }
    const cap = window.setTimeout(close, 2600);

    return () => {
      window.removeEventListener("load", close);
      window.clearTimeout(cap);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Idempotent: reachable from the path change, the failsafe, or both. The overlay always ends. */
  const finish = React.useCallback(() => {
    if (landing.current) return;
    landing.current = true;
    inflight.current = false;
    cancelAnimationFrame(rafRef.current);

    setPct(100);
    setPhase("landing");
    later(() => setPhase("leaving"), SETTLE_MS);
    later(() => {
      setPhase("idle");
      setPct(0);
      landing.current = false;
    }, SETTLE_MS + UNMOUNT_MS);
  }, [later]);

  const start = React.useCallback(
    (to) => {
      /* A second click on the same destination (or a duplicate click event) must not restart the
         overlay. Restarting looks harmless and is not: `clearTimers()` below would cancel the
         landing sequence that the first click already scheduled, and the overlay would be left
         sitting at 100% on screen. Once a navigation to a path is in flight, it is in flight. */
      if (inflight.current && targetPath.current === to) return;

      targetPath.current = to;
      startedAt.current = performance.now();
      cancelAnimationFrame(rafRef.current);
      clearTimers();
      landing.current = false;
      inflight.current = true;
      setPct(0);
      setEntered(false);
      setPhase("running");
      /* One frame later the plate arrives — a transition, not a keyframe, so the exit transform is
         never fighting an animation fill when the route lands. */
      later(() => setEntered(true), 24);

      const tick = (now) => {
        const t = (now - startedAt.current) / 1000;
        /* Ceiling of 92: the last eight points belong to the router actually committing.
           The curve is gentler than it was so the counter spends more of its time in the middle
           of the range where a reader can actually track it, instead of snapping to 90 in the
           first fifth of a second and then sitting still. */
        setPct(92 * (1 - Math.exp(-t * 1.5)));
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);

      /* Failsafe: if the route never commits, land it anyway so nothing is ever stuck. */
      later(finish, MAX_VISIBLE_MS);
    },
    [clearTimers, finish, later]
  );

  /* The click is the earliest possible signal that a navigation is coming. */
  React.useEffect(() => {
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = event.target && event.target.closest ? event.target.closest("a") : null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      /* Same-page anchors, external URLs, mail and tel are not route changes. */
      if (href.startsWith("#")) return;
      if (href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (/^https?:\/\//i.test(href)) {
        try {
          if (new URL(href).origin !== window.location.origin) return;
        } catch {
          return;
        }
      }

      const next = href.split("#")[0];
      if (!next) return;
      if (next === window.location.pathname) return;

      start(next);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [start]);

  /* The router committed a new path: hold the minimum, then land it. */
  React.useEffect(() => {
    if (firstPaint.current) {
      firstPaint.current = false;
      return undefined;
    }
    if (!inflight.current) return undefined;

    const elapsed = performance.now() - startedAt.current;
    const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
    /* Deliberately a bare timer, not one registered through `later`: this one must not be swept up
       by a later `clearTimers`, or the overlay could be left up with no way to close. */
    const id = window.setTimeout(finish, wait);
    return () => window.clearTimeout(id);
  }, [pathname, finish]);

  if (phase === "idle") return null;

  return (
    <LoaderPlate
      pct={pct}
      entered={entered}
      leaving={phase === "leaving"}
      reduced={reduced}
      stage={stageFor(pct)}
      label={`Loading ${targetPath.current || "page"}`}
    />
  );
}
