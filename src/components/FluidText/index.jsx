'use client';

/*
 * FluidText — editorial word-reveal for headings.
 *
 * Each word sits in its own clipped box and rises into place with a small skew and a
 * blur-to-sharp settle, staggered word by word. Only transform / opacity / filter animate,
 * so it stays on the compositor and never triggers layout. The reveal fires once, when the
 * heading actually scrolls into view, and is fully disabled under prefers-reduced-motion.
 *
 * `segments` lets a heading mix plain words with styled ones, so an accent span (for example
 * the liquid-glass word inside a title) can take part in the same reveal instead of needing
 * its own animation.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function FluidText({
  text,
  segments,
  as: Tag = 'span',
  style,
  className = '',
  delay = 0,
  stagger = 46,
  rootMargin = '0px 0px -10% 0px',
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver !== 'function') {
      setVisible(true);
      return undefined;
    }
    /* Revealed means the words leave their blurred, translated start state for good — so the
     * fallbacks below must only ever turn it ON, never off.
     *
     * Two fallbacks cover the ways the observer alone can strand a heading mid-blur:
     *
     *  1. Already on screen at mount (a restored scroll position, a slow hydration, a heading
     *     inside a band whose own reveal is still animating) — show it on the next frame instead
     *     of waiting for an intersection that already happened before we subscribed.
     *  2. A watchdog: if the observer still has not fired after 4s, show it anyway. A heading
     *     that is never announced by the observer (a clipped ancestor, an exotic embed) must
     *     degrade to plain visible text, never to a permanent blur — the exact "glitchy blurred
     *     heading" reported in the QA walkthrough. */
    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setVisible(true);
      observer.disconnect();
      window.clearTimeout(watchdog);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) reveal();
      },
      { rootMargin, threshold: 0.12 }
    );
    const frame = requestAnimationFrame(() => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) reveal();
    });
    const watchdog = window.setTimeout(reveal, 4000);
    observer.observe(node);
    return () => {
      done = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(watchdog);
    };
  }, [rootMargin]);

  const words = useMemo(() => {
    const source = segments && segments.length
      ? segments
      : [{ text: String(text ?? '') }];
    const out = [];
    source.forEach((segment) => {
      String(segment.text ?? '')
        .split(/\s+/)
        .filter(Boolean)
        .forEach((word) => {
          out.push({ word, wordClass: segment.className || '' });
        });
    });
    return out;
  }, [segments, text]);

  return (
    <Tag ref={ref} className={`flinza-fluid${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`} style={style}>
      {words.map((entry, index) => (
        <React.Fragment key={`${entry.word}-${index}`}>
          {index > 0 ? ' ' : null}
          <span className="flinza-fluid-word">
            <span
              className={`flinza-fluid-inner${entry.wordClass ? ` ${entry.wordClass}` : ''}`}
              style={{ '--fluid-delay': `${(delay * 1000 + index * stagger) / 1000}s` }}
            >
              {entry.word}
            </span>
          </span>
        </React.Fragment>
      ))}
    </Tag>
  );
}
