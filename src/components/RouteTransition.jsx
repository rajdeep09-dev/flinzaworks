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
 * ── The state machine, and the bug that used to live in it ──
 *
 * The fault it took three passes to find, written down so it does not come back.
 *
 * Every decision in here used to be made against `phase` — React state — read through a ref that
 * was refreshed during render (`phaseRef.current = phase`). That looks equivalent to reading the
 * state and it is not: a ref refreshed during *render* is a phase behind until React re-renders.
 *
 * Now put that next to Next's router. `start()` runs in a capture-phase click listener, before the
 * router's own handler. Next then pushes the route, and on a prefetched route the RSC payload is
 * already in memory, so `usePathname()` can be updated in the same batch — or before ours. The
 * pathname effect then ran while `phaseRef.current` still said `"idle"`, hit its own early return,
 * and never scheduled the landing sequence. Nothing else would have: the plate sat at ~92% until
 * the 5,000ms failsafe cap took it off, and a loader that hangs and then lurches away is exactly
 * the "it looks glitchy and it comes up twice" report.
 *
 * So the machine is now SYNCHRONOUS. `start()` and `finish()` write the phase into refs in the
 * same tick they are called, and every branch — the pathname effect, the click guard, the
 * watchdog — reads those refs and never the rendered state. `phase` survives only as the thing
 * that decides which markup to draw. A ref written inside an event handler cannot be a phase
 * behind, so the plate can no longer be left with no exit.
 *
 * ── One plate per document, and one plate per navigation ──
 *
 * The other half of "it spawns twice" is that a plate could be restarted while it was already on
 * screen: `clearTimers()` swept the timers that were mid-lift, `setPhase("running")` handed the
 * surface back to its covered state, and the plate animated back down over the page before lifting
 * again. `start()` now retargets instead of restarting whenever a plate is in flight, which is
 * checkable because the ref is trustworthy.
 *
 * The cold-load plate is one-shot per document via a module-level flag. It is module scope rather
 * than a ref because the failure mode is a remount, and a new instance starts with clean state; a
 * module-level flag survives it. Client-side navigations are unaffected — they go through `start()`
 * from the click handler, so every route change still gets its own plate. Only the open of the
 * document is one-shot.
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
/* A hard stop so a failed navigation can never trap the screen. This is a *failsafe*, not the
 * normal exit — the normal exit is `finish()` from the pathname effect. It was 5,000ms, which is
 * long enough that a stall caused by a missed exit reads as the loader coming back; 3,200 is
 * still far beyond any honest route change on this site. */
const MAX_VISIBLE_MS = 3200;
/* Belt and braces on the above: registered by an effect keyed on the phase, so a plate that is on
 * screen ALWAYS has one timer that will take it off again — even if every timer registered through
 * `later` was swept by a remount. */
const WATCHDOG_MS = 5000;
/* A click that lands in the slop right after a plate has finished is a replayed touch, not an
 * intent to navigate (see the note in `start`). Navigations inside this window run plate-less. */
const GHOST_CLICK_MS = 420;
const SETTLE_MS = 220; // beat between the route committing and the plate starting to lift
const LIFT_MS = 900; // the plate's lift (700) + the furniture fade (260), with slack
const EXIT_MS = SETTLE_MS + LIFT_MS;
/* One frame is not enough for a transition to be observed from its start value; two is. */
const ENTER_FRAME_MS = 24;
/* How often the cold load re-checks whether the document has finished arriving. A poll rather than
 * a `load` listener, because a listener registered in an effect can be removed by that effect's
 * own cleanup and then never fires — a plate with no exit. This cannot be lost. */
const BOOT_POLL_MS = 120;
const BOOT_CAP_MS = 2200;

/* See the note above: the cold-load plate runs once per document and this is what guarantees it. */
let coldLoadPlateShown = false;

export default function RouteTransition() {
  const pathname = usePathname();

  /* Display state ONLY. Nothing below this line is ever consulted to make a decision. */
  const [phase, setPhase] = React.useState("idle"); // idle | running | landing | leaving
  const [pct, setPct] = React.useState(0);
  const [entered, setEntered] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);

  /* The machine. Written synchronously inside `start` and `finish`; read everywhere else. */
  const phaseRef = React.useRef("idle");
  const targetRef = React.useRef(null);
  const startedAtRef = React.useRef(0);
  const inflightRef = React.useRef(false); // a navigation has been started and not yet finished
  const landingRef = React.useRef(false); // the landing sequence has been kicked off
  const endedAtRef = React.useRef(-Infinity); // when the last plate finished; see the ghost guard
  const firstPaint = React.useRef(true);
  const rafRef = React.useRef(0);
  /* The last integer handed to the counter. The progress is a float driven by requestAnimationFrame,
     and `setPct` on every frame would re-render the plate ~60 times a second to draw the same two
     digits. Forty-odd renders over the life of a plate instead of three and a half thousand: the
     counter is the only thing on screen that changes, and it cannot change more often than the
     number it is showing. */
  const shownRef = React.useRef(-1);
  /* Timers that belong to the landing chain. They are deliberately never cleared by `start` — a
     navigation must not be able to sweep the timers that are taking the plate off the screen. On
     unmount only. */
  const exitTimers = React.useRef([]);

  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setReduced(true);
    }
    const timers = exitTimers;
    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
      window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* Idempotent: reachable from the path effect, the failsafe, the boot poll and the watchdog.
     Whichever gets there first wins, and the others are no-ops. */
  const finish = React.useCallback(() => {
    if (landingRef.current) return;
    if (phaseRef.current === "idle") return;

    landingRef.current = true;
    inflightRef.current = false;
    window.cancelAnimationFrame(rafRef.current);

    phaseRef.current = "landing";
    shownRef.current = 100;
    setPct(100);
    setPhase("landing");

    exitTimers.current.push(
      window.setTimeout(() => {
        phaseRef.current = "leaving";
        setPhase("leaving");
      }, SETTLE_MS),
      window.setTimeout(() => {
        phaseRef.current = "idle";
        landingRef.current = false;
        endedAtRef.current = performance.now();
        setPct(0);
        setPhase("idle");
      }, EXIT_MS)
    );
  }, []);

  /* ── Watchdog ──
   * Every exit from a plate is a timer, and a timer can be lost. This one is registered by an
   * effect keyed on the phase rather than pushed into a sweepable list, so while a plate is up the
   * timeout that ends it is always armed and the page can never be left covered. */
  React.useEffect(() => {
    if (phase === "idle") return undefined;
    const id = window.setTimeout(() => {
      window.cancelAnimationFrame(rafRef.current);
      landingRef.current = false;
      inflightRef.current = false;
      phaseRef.current = "idle";
      endedAtRef.current = performance.now();
      setPct(0);
      setPhase("idle");
    }, WATCHDOG_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  /* ── The router committed a new path: hold the minimum, then land it ──
   *
   * This effect reads `inflightRef` and `phaseRef`, both written synchronously by `start()` — that
   * is the whole fix described in the file header. It must never branch on rendered state.
   *
   * This effect is declared BEFORE the boot effect on purpose. Effects run in declaration order,
   * so on the very first commit this one consumes `firstPaint` while the machine is still idle, and
   * the boot plate that `begin()` starts a moment later is not mistaken for a route change. */
  React.useEffect(() => {
    if (firstPaint.current) {
      firstPaint.current = false;
      return undefined;
    }
    if (!inflightRef.current) return undefined;
    if (phaseRef.current === "idle") return undefined;

    const wait = Math.max(0, MIN_VISIBLE_MS - (performance.now() - startedAtRef.current));
    /* Deliberately a bare timer, not one registered through `exitTimers`: this one must not be
       swept, or the overlay could be left up with no way to close. */
    const id = window.setTimeout(finish, wait);
    return () => window.clearTimeout(id);
  }, [pathname, finish]);

  const begin = React.useCallback(
    (to) => {
      /* Once a plate's sequence has begun it is never re-entered — this is half of the fix for the
         loader appearing to spawn twice.

         `begin()` is reachable from a click, and a click can land while the plate is still counting
         or already lifting: a tap on a slow phone, a double-tap, or the browser replaying a click
         after a cancelled touch. Restarting there would sweep the landing timers that were in the
         middle of lifting the plate away, hand the surface back to its covered state, and animate
         it back down over the page before lifting again. Two arrivals for one navigation.

         Retargeting instead keeps the one plate: it carries on counting, and `finish` — idempotent
         — lands it when the router commits whichever path is now the destination. And because
         `phaseRef` is written synchronously a few lines below, this check is never a phase behind,
         which is what it used to be. */
      if (phaseRef.current !== "idle") {
        targetRef.current = to;
        inflightRef.current = true;
        return;
      }

      /* A click that arrives in the slop just after a plate finished is almost always the browser
         replaying a touch as a click: the plate the finger actually landed on is gone, so the event
         is delivered to whatever is under that point now — which can be a link, and a link is a
         navigation, and a navigation is a second plate right behind the first. The one the user
         reads as "the loader showed up twice".

         Only the plate is skipped; the navigation itself still happens, and a plate-less route
         change on an already-cached page is not something anyone notices. */
      if (performance.now() - endedAtRef.current < GHOST_CLICK_MS) return;

      targetRef.current = to;
      startedAtRef.current = performance.now();
      window.cancelAnimationFrame(rafRef.current);
      landingRef.current = false;
      inflightRef.current = true;
      shownRef.current = -1;
      setPct(0);
      setEntered(false);

      /* Written before `setPhase` on purpose: React may take a frame or more to commit, and the
         router may not wait for it. From this line on, every decision in the component sees
         "running". */
      phaseRef.current = "running";
      setPhase("running");

      /* One frame later the plate arrives — a transition, not a keyframe, so the exit transform is
         never fighting an animation fill when the route lands. */
      exitTimers.current.push(
        window.setTimeout(() => setEntered(true), ENTER_FRAME_MS),
        /* Failsafe: if the route never commits, land it anyway so nothing is ever stuck. */
        window.setTimeout(finish, MAX_VISIBLE_MS)
      );

      const tick = (now) => {
        const t = (now - startedAtRef.current) / 1000;
        /* Ceiling of 92: the last eight points belong to the router actually committing. The curve
           is gentle so the counter spends most of its time in the range a reader can track, instead
           of snapping to 90 in the first fifth of a second and then sitting still. */
        const next = Math.round(92 * (1 - Math.exp(-t * 1.5)));
        if (next !== shownRef.current) {
          shownRef.current = next;
          setPct(next);
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [finish]
  );

  /* ── The cold load ──
   *
   * The overlay only ran on client-side navigations, so the transitions a visitor actually watched
   * were the ones AFTER they had already waited for the site once. The first load — the one where
   * the shader chunks, the fonts and the hero image are all still arriving — had no overlay at all,
   * which is why the home page in particular opened as a half-built page that assembled itself in
   * front of you.
   *
   * The percentage is honest here too: it holds while the document has not finished arriving and
   * finishes when it has, capped so a slow third-party request can never trap the screen.
   *
   * There is no cleanup, and that is the point. This used to be a `load` listener plus a timer,
   * both removed by the effect's cleanup — so anything that re-ran the effect before `load` fired
   * left the plate on screen with no exit. A poll chain and a hard cap own no teardown and cannot
   * be lost. */
  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    /* The one-shot guard — see the note on `coldLoadPlateShown`. */
    if (coldLoadPlateShown) return undefined;
    coldLoadPlateShown = true;

    const bootAt = performance.now();
    begin(window.location.pathname + window.location.search);

    let closed = false;
    const close = () => {
      if (closed) return;
      closed = true;
      window.setTimeout(finish, Math.max(0, MIN_VISIBLE_MS - (performance.now() - bootAt)));
    };

    const poll = () => {
      if (closed) return;
      if (document.readyState === "complete") close();
      else window.setTimeout(poll, BOOT_POLL_MS);
    };
    poll();
    window.setTimeout(close, BOOT_CAP_MS);

    return undefined;
  }, [begin, finish]);

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

      begin(next);
    };

    /* Capture phase, so this runs before the router's own handler. */
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [begin]);

  if (phase === "idle") return null;

  return (
    <LoaderPlate
      pct={pct}
      entered={entered}
      leaving={phase === "leaving"}
      reduced={reduced}
      label={`Loading ${targetRef.current || "page"}`}
    />
  );
}
