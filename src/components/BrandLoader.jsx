"use client";

/*
 * Brand loader.
 *
 * What it replaced: a white full-screen Framer preloader with dark type and a very large
 * counter that was positioned for a wider viewport, so on real screens the numerals were cut
 * off at the right edge and the progress rule floated off-centre. It also fought the site's
 * palette — a bright white flash before a dark hero.
 *
 * This version is built to be un-breakable: everything is centred with flex and sized in
 * clamp(), the only animated properties are transform and opacity (so it stays on the
 * compositor), and it can never outstay its welcome — the progress rule runs for a fixed
 * budget and onComplete fires from a timer, not from an animation callback that might not
 * arrive. Under prefers-reduced-motion it resolves immediately.
 */

import * as React from "react";
import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1150;

export default function BrandLoader({ brandName = "FLINZA", onStartExit, onComplete, note = "Growth systems for ecommerce" }) {
  const [progress, setProgress] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setProgress(1);
      doneRef.current = true;
      onComplete?.();
      return undefined;
    }

    const start = performance.now();
    let frame = 0;
    let exitTimer = 0;
    let completeTimer = 0;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      // easeOutCubic — fast start, soft landing, so it never looks stalled
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      if (t < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }
      doneRef.current = true;
      onStartExit?.();
      exitTimer = window.setTimeout(() => onComplete?.(), 760);
    };

    frame = requestAnimationFrame(tick);
    // Hard backstop: even if rAF is throttled in a background tab, the site must not stay
    // behind the loader.
    completeTimer = window.setTimeout(() => {
      if (doneRef.current) return;
      doneRef.current = true;
      setProgress(1);
      onStartExit?.();
      onComplete?.();
    }, DURATION_MS + 1600);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const percent = Math.round(progress * 100);

  return (
    <div className="flinza-loader" role="status" aria-live="polite" aria-label="Loading Flinza Works">
      <div className="flinza-loader-inner">
        <div className="flinza-loader-mark">
          <img src="/images/flinza_logo_hd.png" alt="" width={64} height={64} decoding="async" />
          <span className="flinza-loader-name">{brandName}</span>
        </div>

        <span className="flinza-loader-note">{note}</span>

        <div className="flinza-loader-track" aria-hidden="true">
          <span className="flinza-loader-fill" style={{ transform: `scaleX(${progress})` }} />
        </div>

        <span className="flinza-loader-count" aria-hidden="true">{String(percent).padStart(3, "0")}</span>
      </div>
    </div>
  );
}
