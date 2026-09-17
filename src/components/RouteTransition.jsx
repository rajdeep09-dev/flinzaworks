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

/* Below roughly this, a loader reads as a glitch rather than a transition. It was 420, which was
 * shorter than the plate's own 420ms furniture fade — so on a cold load the plate began lifting
 * while the wordmark, the hairline and the counter were still arriving, and the whole thing read
 * as an incomplete flash instead of an opening. Long enough to be a deliberate beat, short enough
 * that nobody waits for it. */
const MIN_VISIBLE_MS = 820;
const MAX_VISIBLE_MS = 5000; // a hard stop so a failed navigation can never trap the screen
/* Belt braces on MAX_VISIBLE_MS: an effect keyed on the phase re-arms this on every phase change,
 * so a plate that is on screen ALWAYS has one timer that will take it off again — even if every
 * timer registered through `later` was swept by a remount. */
const WATCHDOG_MS = 7000;
/* A click that lands in the slop right after a plate has finished is a replayed touch, not an
 * intent to navigate (see the note in `start`). Navigations inside this window run plate-less. */
const GHOST_CLICK_MS = 420;
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

/*── The cold-load plate runs ONCE per document, and this flag is what guarantees it. ──
 *
 * It is module scope rather than a ref because the failure mode is a remount: a development Fast
 * Refresh, or any re-creation of this component, re-runs mount effects, and a mount effect that
 * starts the plate will start it a second time — the first plate lifts away, the page is briefly
 * visible, and a second one arrives to cover it. That is exactly the "the loader comes up twice"
 * fault, and no amount of state inside the component can see it, because the new instance starts
 * with clean state. A module-level flag survives the remount.
 *
 * Client-side navigations are unaffected: they go through `start()` from the click handler, not
 * through the cold-load effect, so every route change still gets its own plate. Only the open of
 * the document is one-shot. */
let coldLoadPlateShown = false;

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

  /* The plate's current phase, readable from inside `start` without being one of its dependencies.
     `start` is what a document-level click listener calls, and a listener that is torn down and
     re-created on every phase change is a listener that can be a phase out of date while it is
     attached. A ref cannot be stale. */
  const phaseRef = React.useRef("idle");
  phaseRef.current = phase;

  /* When the last plate finished. See the ghost-click guard in `start`. `-Infinity` rather than 0,
     because `performance.now()` is measured from navigation start: a 0 would make the first 420ms
     of the document's life look like it came hot on the heels of a plate. */
  const lastPlateEndedAt = React.useRef(-Infinity);

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

    /* The one-shot guard. Everything below this line may run only for the first mount of the
       document — see the note on `coldLoadPlateShown`. */
    if (coldLoadPlateShown) return undefined;
    coldLoadPlateShown = true;

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
      lastPlateEndedAt.current = performance.now();
    }, SETTLE_MS + UNMOUNT_MS);
  }, [later]);

  /* ── The watchdog ──
   *
   * Every exit from a plate is a timer, and a timer can be lost: a remount clears all of them and
   * leaves the surface on screen with nothing left to take it off. This one is registered by an
   * effect keyed on the phase rather than pushed into `timers`, so it cannot be swept — while a
   * plate is up, the timeout that ends it is always armed, and the page can never be left covered. */
  React.useEffect(() => {
    if (phase === "idle") return undefined;
    const id = window.setTimeout(() => {
      cancelAnimationFrame(rafRef.current);
      landing.current = false;
      inflight.current = false;
      setPct(0);
      setPhase("idle");
      lastPlateEndedAt.current = performance.now();
    }, WATCHDOG_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  const start = React.useCallback(
    (to) => {
      /* A second click on the same destination (or a duplicate click event) must not restart the
         overlay. Restarting looks harmless and is not: `clearTimers()` below would cancel the
         landing sequence that the first click already scheduled, and the overlay would be left
         sitting at 100% on screen. Once a navigation to a path is in flight, it is in flight. */
      if (inflight.current && targetPath.current === to) return;

      /* Once the plate's sequence has begun it is never re-entered — this is the fix for the
         loader appearing to spawn twice.

         `start()` is reachable from a click, and a click can land while the plate is still
         counting or already lifting: a tap on a slow phone, a double-tap, or the browser
         replaying a click after a cancelled touch. The old body restarted the whole sequence —
         `clearTimers()` swept the landing timers that were in the middle of lifting the plate
         away, `setPhase('running')` handed the surface back to its covered state, and the plate
         animated back down over the page before lifting again. Two arrivals for one navigation,
         which is exactly what "it spawns twice like a glitch" is.

         Retargeting instead keeps the one plate: it carries on counting, and `finish` — which is
         idempotent — lands it when the router commits whichever path is now the destination. */
      if (phaseRef.current !== "idle") {
        targetPath.current = to;
        inflight.current = true;
        return;
      }

      /* A click that arrives in the slop just after a plate finished is almost always the browser
         replaying a touch as a click: the plate the finger actually landed on is gone, so the event
         is delivered to whatever is under that point now — which can be a link, and a link is a
         navigation, and a navigation is a second plate right behind the first. The one the user
         reads as "the loader showed up twice".

         Only the plate is skipped; the navigation itself still happens, and a plate-less route
         change on an already-cached page is not something anyone notices. */
      if (performance.now() - lastPlateEndedAt.current < GHOST_CLICK_MS) return;

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

    /* The plate may already have run to completion — the failsafe cap can land it before a slow
       router commits, and a click during the exit retargets rather than restarting. Re-entering
       `finish` there would put the surface back on screen for a navigation that is already over. */
    if (phaseRef.current === "idle") return undefined;

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
