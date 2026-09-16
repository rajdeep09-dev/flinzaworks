"use client";

/*
 * Curved-arrow doodles for the case-study videos (item 4).
 *
 * The brief: the curved arrows "repeat" with the four videos. The hard constraint, learned
 * from the last round, is that a decorative layer must never sit on top of a video — so the
 * doodles live in their own reserved band between the section heading and the mosaic rather
 * than floating over the tiles. Each arrow links to its tile by index, the strokes draw
 * themselves in when the band enters view, and everything collapses to a single hidden row
 * under reduced-motion or on narrow screens where the mosaic stacks anyway.
 *
 * The draw is a stroke-dashoffset animation — no layout, no per-frame JavaScript.
 */

import * as React from "react";
import { useEffect, useRef, useState } from "react";

const ARROWS = [
  { index: "01", label: "Audit", d: "M2 30 C 34 4, 68 4, 96 22", head: "M88 14 L 98 23 L 86 26" },
  { index: "02", label: "Creative", d: "M2 22 C 30 42, 66 46, 96 24", head: "M86 30 L 98 23 L 90 12" },
  { index: "03", label: "AI UGC", d: "M2 30 C 36 6, 64 6, 96 24", head: "M87 15 L 98 24 L 85 28" },
  { index: "04", label: "Scale", d: "M2 24 C 32 44, 64 44, 96 20", head: "M85 12 L 98 20 L 88 30" },
];

export default function StoryFlowDoodles() {
  const ref = useRef(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver !== "function") {
      setDrawn(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-60px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flinza-flow" aria-hidden="true" data-drawn={drawn ? "true" : "false"}>
      {ARROWS.map((arrow) => (
        <span key={arrow.index} className="flinza-flow-item">
          <svg viewBox="0 0 100 48" preserveAspectRatio="none" role="presentation">
            <path
              d={arrow.d}
              fill="none"
              stroke="url(#flinza-flow-stroke)"
              strokeWidth="1.4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="flinza-flow-path"
            />
            <path
              d={arrow.head}
              fill="none"
              stroke="url(#flinza-flow-stroke)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              className="flinza-flow-head"
            />
            <defs>
              <linearGradient id="flinza-flow-stroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(23,132,155,0)" />
                <stop offset="45%" stopColor="rgba(23,132,155,0.55)" />
                <stop offset="100%" stopColor="rgba(63,185,206,0.75)" />
              </linearGradient>
            </defs>
          </svg>
          <em>{arrow.index}</em>
          <b>{arrow.label}</b>
        </span>
      ))}
    </div>
  );
}
