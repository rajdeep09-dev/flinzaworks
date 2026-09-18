"use client";

/*
 * SectionReveal — one motion language for the seam between sections, on every route.
 *
 * ── Why this is one component and not six hooks per page ──
 *
 * The home page already had a reveal system: six `useReveal()` instances, six pieces of state, six
 * refs and six `className={revealed ? 'reveal-in' : 'reveal-init'}` ternaries. It worked, and it
 * covered exactly one page. Every other route — /services, /work, /about, /insights, the five
 * landing pages, the legal pages — had nothing at all, so their bands arrived with a hard cut
 * between them and the site felt like two different products depending on which URL you were on.
 *
 * This replaces that with one component, mounted once in the root layout. It walks the top-level
 * bands of `<main>` and gives each one the same entrance. Nothing per page, nothing to remember
 * when a route is added, one IntersectionObserver for the entire document instead of six, and the
 * home page keeps only the `useInView` gates it actually needs for lazy mounting.
 *
 * ── The rules it plays by ──
 *
 * 1. NOTHING ON THE FIRST SCREEN IS TOUCHED, on the initial load. A band whose top is already
 *    within 92% of the viewport height at mount is left completely alone — no classes, no
 *    transition — so the hero and the first band paint in the first frame and the largest
 *    contentful paint is never behind an animation. The reveal is for what you have not seen yet.
 *
 *    On a client-side NAVIGATION the opposite is true, and deliberately: the bands in view are
 *    allowed to rise, because the route transition plate is still covering the screen while they
 *    do. The page arrives already moving instead of arriving inert and then starting.
 *
 * 2. IT IS ONE-SHOT, AND IT CLEANS UP AFTER ITSELF. Each band is unobserved the moment it has
 *    been revealed, so scrolling back up never re-hides anything and the observer cost falls to
 *    zero as the page is read. Then, once the transition is over, the classes and the inline
 *    delay are removed entirely — which matters for more than tidiness: a `transform` on an
 *    ancestor makes it the containing block for any `position: fixed` descendant, so a band that
 *    kept its reveal classes would quietly break any fixed chrome inside it. The transform exists
 *    for the length of the animation and then it is gone.
 *
 * 3. FIXED ELEMENTS ARE SKIPPED. The home page puts its ethereal background, its pinned header and
 *    its table of contents directly inside `<main>` as fixed chrome. Those are not sections and
 *    must never be transformed, so they are filtered out by computed position.
 *
 * 4. THE MOTION IS CHEAP AND IT KNOWS IT IS ON A PHONE. Only opacity and transform are animated, so
 *    the work is on the compositor and cannot cause layout. The blur is applied ONLY to bands
 *    shorter than 320px — headings, labels, stat rows — and only on a fine pointer, because a
 *    `filter` on a full-height band is a repaint of that entire band on every frame of the
 *    transition. On a phone the rise is shorter and the duration is quicker, so a long scroll
 *    never feels like it is waiting on an animation.
 *
 * 5. `prefers-reduced-motion` IS A FULL BYPASS. The effect returns before it adds a single class,
 *    so nothing is ever hidden and nothing transitions. The CSS carries the same guard as a second
 *    line of defence.
 *
 * ── Opting out ──
 *
 * `data-no-reveal` on any band leaves it entirely alone. `[data-reveal]` on a nested element gives
 * that element its own entrance on the same observer, for the cases where a band is too tall to
 * read as a single object. See the note about nested elements in the scan below.
 */

import * as React from "react";
import { usePathname } from "next/navigation";

/* Bands that cross the reveal line in the same frame are staggered rather than all arriving at
 * once. Four steps and 70ms each, so the longest wait is 280ms — long enough to read as a sequence
 * and short enough that the last band in a group is never visibly late. */
const BATCH_STAGGER_MS = 70;
const MAX_STAGGER_STEPS = 4;
/* The band's own durations are 0.95s (rise) and 0.8s (fade). This is that, plus the largest
 * possible stagger, plus a frame of slack — after which the classes come off. */
const CLEANUP_MS = 1500;
/* Above this height a band is too big to blur: see rule 4. */
const BLUR_MAX_HEIGHT = 320;
/* A band shorter than this is a spacer or a hairline, not a section. */
const MIN_BAND_HEIGHT = 24;
/* How much of the viewport counts as "the first screen" — see rule 1. */
const FIRST_SCREEN = 0.92;

export default function SectionReveal() {
  const pathname = usePathname();
  /* Distinguishes the document's first paint from every navigation after it. A ref, not state:
     it is read inside the effect and never rendered, and it must not be a reason to re-run. */
  const coldLoad = React.useRef(true);

  React.useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      return undefined;
    }
    /* Rule 5 — a complete bypass, before anything is hidden. */
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const main = document.querySelector("main");
    if (!main) return undefined;

    const navigating = !coldLoad.current;
    coldLoad.current = false;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const firstScreenBottom = window.innerHeight * FIRST_SCREEN;

    /* ── The scan ──
     *
     * Top-level bands of `<main>`. Nested `[data-reveal]` elements are picked up as well, and they
     * are found at the same moment rather than by a MutationObserver watching the whole document:
     * every route on this site is statically rendered, so the section wrappers are in the DOM by
     * the time this runs. A lazily mounted carousel or video player appears INSIDE a band that is
     * already being tracked, which is the case that matters, and it is covered. */
    const seen = new Set();
    const bands = [];

    const consider = (el) => {
      if (!el || el.nodeType !== 1 || seen.has(el)) return;
      seen.add(el);
      if (el.hasAttribute("data-no-reveal")) return;
      const rect = el.getBoundingClientRect();
      if (rect.height < MIN_BAND_HEIGHT) return;
      /* Rule 3 — chrome, not a section. */
      if (window.getComputedStyle(el).position === "fixed") return;
      /* Already BEHIND the reader. A phone that restores its scroll position — a reload, a back
         navigation, a link with an anchor — can leave the top of the page above the viewport at the
         moment this runs, and hiding a band nobody is looking at buys nothing while risking a
         pop-in when they scroll back up. It stays visible instead. This check comes before the
         first-screen check because it applies on a navigation too. */
      if (rect.bottom <= 0) return;
      /* Rule 1 — already on screen at the first paint, so leave it alone. */
      if (!navigating && rect.top < firstScreenBottom) return;
      bands.push(el);
    };

    Array.from(main.children).forEach(consider);
    Array.from(main.querySelectorAll("[data-reveal]")).forEach(consider);

    if (!bands.length) return undefined;

    for (const band of bands) {
      band.classList.add("reveal-init");
      /* Rule 4 — the blur is earned by being small and being on a desktop. */
      if (finePointer && band.getBoundingClientRect().height < BLUR_MAX_HEIGHT) {
        band.classList.add("reveal-blur");
      }
    }

    const timers = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, index) => {
            const band = entry.target;
            observer.unobserve(band);

            const delay = Math.min(index, MAX_STAGGER_STEPS) * BATCH_STAGGER_MS;
            band.style.transitionDelay = delay ? `${delay}ms` : "";
            band.classList.remove("reveal-init");
            band.classList.add("reveal-in");

            timers.push(
              window.setTimeout(() => {
                band.classList.remove("reveal-in", "reveal-blur");
                band.style.transitionDelay = "";
              }, delay + CLEANUP_MS)
            );
          });
      },
      /* Fires a little after a band's top edge crosses the bottom of the screen, so the motion is
         already under way by the time the band is properly in view rather than completing before
         the reader's eye arrives. */
      { rootMargin: "0px 0px -8% 0px" }
    );

    for (const band of bands) observer.observe(band);

    /* Leaving the route mid-flight: drop the observer and put every band we touched back to its
       plain state, so a fast navigation cannot strand a class on a reused DOM node. */
    return () => {
      observer.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
      for (const band of bands) {
        band.classList.remove("reveal-init", "reveal-in", "reveal-blur");
        band.style.transitionDelay = "";
      }
    };
    /* Keyed on the path: the bands of a new route are scanned when the route commits. */
  }, [pathname]);

  return null;
}
