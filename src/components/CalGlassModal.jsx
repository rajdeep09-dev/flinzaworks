"use client";

/*
 * Booking, done directly.
 *
 * Previously the only path to Cal.com was: hover the contact button (which never fires on a
 * touch screen) → open a hover card → click the pill → a Framer overlay that renders the
 * scheduler inside a 862x459 popup. On a phone that popup overflowed the viewport, and on
 * desktop it depended on a hover chain surviving the pointer's journey to the button.
 *
 * This is a single, immediate route: one glass modal, the scheduler embedded at a size that
 * fits real screens, opened by a click (or Enter/Space), dismissible with Escape or the
 * backdrop, with body scroll locked while it is open.
 */

import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

const CAL_LINK = "flinza-works/discovery";

export function CalModal({ open, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="flinza-cal-backdrop" role="dialog" aria-modal="true" aria-label="Book a call">
      <button type="button" className="flinza-cal-scrim" aria-label="Close booking" onClick={onClose} />
      <div className="flinza-cal-panel">
        <div className="flinza-cal-head">
          <span>
            <em>Discovery call</em>
            <strong>Pick a time that suits you</strong>
          </span>
          <button type="button" ref={closeRef} className="flinza-cal-close" onClick={onClose}>
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            Close
          </button>
        </div>
        <div className="flinza-cal-body">
          <iframe
            title="Cal.com booking"
            src={`https://cal.com/${CAL_LINK}?embed=true&theme=dark`}
            loading="lazy"
            style={{ width: "100%", height: "100%", border: 0, display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function BookCallButton({ label = "Book a call", className = "" }) {
  const [open, setOpen] = useState(false);
  const onClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <button type="button" className={`flinza-book-call ${className}`.trim()} onClick={() => setOpen(true)}>
        {label}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7 17L17 7M10 7h7v7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <CalModal open={open} onClose={onClose} />
    </>
  );
}
