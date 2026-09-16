"use client";

/*
 * Contact page circular carousel (item 9).
 *
 * Eight client avatars orbit a ring with the contact button held in the middle. Clicking an
 * avatar reveals that client's testimonial in a transparent glass widget — the same quote /
 * avatar / name / role structure as the case-study stage, so the site has one testimonial
 * shape in two places rather than two drifting designs.
 *
 * Performance notes: the orbit is driven by a single animated custom property (--orbit-angle)
 * read through CSS `transform`, so it never touches layout and never needs JavaScript per
 * frame. Each avatar counter-rotates by the same angle, which keeps faces upright while the
 * ring turns. The whole rotation stops on hover, focus, an open widget, and under
 * prefers-reduced-motion, so it can never fight a user trying to click something.
 */

import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function ContactOrbit({ testimonials = [], children }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const stageRef = useRef(null);
  const count = Math.max(testimonials.length, 1);
  const active = activeIndex === null ? null : testimonials[activeIndex];

  const close = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    if (activeIndex === null) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close]);

  return (
    <div className="flinza-orbit-wrap">
      <div
        ref={stageRef}
        className="flinza-orbit"
        data-paused={activeIndex === null ? "false" : "true"}
      >
        <div className="flinza-orbit-ring">
          {testimonials.map((person, index) => (
            <button
              key={`${person.name}-${index}`}
              type="button"
              className="flinza-orbit-item"
              style={{ "--slot": `${(360 / count) * index}deg` }}
              aria-label={`Read the testimonial from ${person.name}, ${person.role}`}
              aria-pressed={activeIndex === index}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <span className="flinza-orbit-avatar">
                <img src={person.avatar} alt="" width={72} height={72} loading="lazy" decoding="async" />
              </span>
            </button>
          ))}
        </div>

        {/* The contact button holds the centre of the ring */}
        <div className="flinza-orbit-center">{children}</div>
      </div>

      {/* The testimonial, in a transparent glass widget */}
      <div
        className="flinza-quote-widget"
        data-open={active ? "true" : "false"}
        role="dialog"
        aria-modal="false"
        aria-label={active ? `Testimonial from ${active.name}` : undefined}
        aria-hidden={active ? undefined : "true"}
      >
        {active ? (
          <>
            <button
              type="button"
              className="flinza-quote-widget-close"
              onClick={close}
              aria-label="Close testimonial"
            >
              <svg width="9" height="9" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </button>
            <blockquote className="flinza-quote">&ldquo;{active.quote}&rdquo;</blockquote>
            <figcaption>
              <img src={active.avatar} alt="" width={40} height={40} loading="lazy" decoding="async" />
              <span>
                <strong>{active.name}</strong>
                <em>{active.role}</em>
              </span>
            </figcaption>
          </>
        ) : null}
      </div>
    </div>
  );
}
