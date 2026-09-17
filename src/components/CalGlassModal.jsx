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
import CamoCtaButton from "./CamoCtaButton";

/* The scheduler link is configuration, not a constant — see `@/lib/site`.
 *
 * The value that used to be hard-coded here, `cal.com/flinza-works/discovery`, answers HTTP 404.
 * That is why the widget looked like it "does not open": the modal itself has always opened, but
 * cal.com served its not-found page inside the iframe, so all you ever saw was a blank rectangle,
 * and nothing in the UI could recover from that.
 *
 * Two consequences, both handled below. The handle now comes from `NEXT_PUBLIC_CAL_LINK`, and when
 * no handle is configured the scheduler iframe is not rendered at all — pointing an iframe at a
 * path known to 404 is worse than not having one. The panel falls back to the email route, which
 * always works, so booking is never a dead end. */
import { CAL_CONFIGURED, CAL_URL, CONTACT_EMAIL, MAILTO_DISCOVERY } from "@/lib/site";

/*
 * BookingForm — the scheduler's stand-in, and the reason `Book a call` is never a dead control.
 *
 * The old fallback was a panel saying "Booking by email" with an address in it. That is honest but
 * it asks the visitor to leave the site and compose a message, which is a much bigger ask than
 * picking a slot, and in practice nobody did it — the button read as broken.
 *
 * This asks for the four things that actually qualify a call (who, where to reply, what they
 * spend, and when they are free) and writes them to the database. It works on the very first
 * deploy with no Cal.com account, and it is what runs until NEXT_PUBLIC_CAL_LINK is set — at which
 * point the real scheduler takes over and this stops rendering entirely.
 */

const SLOTS = ["Morning", "Midday", "Afternoon", "Evening"];

function BookingForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", spend: "", notes: "" });
  const [slot, setSlot] = useState("");
  const [state, setState] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  const field = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setState("error");
      setError("Your name and a valid email, please.");
      return;
    }
    setState("sending");
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, slot }),
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "failed");
      }
      setState("sent");
    } catch (thrown) {
      setState("error");
      setError(thrown.message || "Could not send that. Email us instead?");
    }
  };

  if (state === "sent") {
    return (
      <div className="flinza-book-done">
        <span className="flinza-book-done__tick" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12.5l4.2 4.2L19 7"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3>Request received</h3>
        <p>
          We read every one ourselves. You&apos;ll get a reply within one business day with two or
          three times that work.
        </p>
      </div>
    );
  }

  return (
    <form className="flinza-book-form" onSubmit={submit}>
      <div className="flinza-book-form__row">
        <label>
          <span>Name</span>
          <input value={form.name} onChange={field("name")} placeholder="Your name" autoComplete="name" />
        </label>
        <label>
          <span>Email</span>
          <input
            type="email"
            value={form.email}
            onChange={field("email")}
            placeholder="you@brand.com"
            autoComplete="email"
          />
        </label>
      </div>

      <div className="flinza-book-form__row">
        <label>
          <span>Brand</span>
          <input value={form.company} onChange={field("company")} placeholder="Brand name" autoComplete="organization" />
        </label>
        <label>
          <span>Monthly ad spend</span>
          <input value={form.spend} onChange={field("spend")} placeholder="e.g. $40k" inputMode="text" />
        </label>
      </div>

      <fieldset className="flinza-book-form__slots">
        <legend>Best time to talk</legend>
        <div>
          {SLOTS.map((option) => (
            <button
              key={option}
              type="button"
              className={slot === option ? "is-on" : undefined}
              aria-pressed={slot === option}
              onClick={() => setSlot(slot === option ? "" : option)}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <label>
        <span>What are you trying to scale?</span>
        <textarea
          rows={3}
          value={form.notes}
          onChange={field("notes")}
          placeholder="Revenue, current channels, what's stalling."
        />
      </label>

      {state === "error" ? <p className="flinza-book-form__error">{error}</p> : null}

      <div className="flinza-book-form__foot">
        <button type="submit" className="flinza-book-form__send" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Request a slot"}
        </button>
        <a href={MAILTO_DISCOVERY}>or email {CONTACT_EMAIL}</a>
      </div>
    </form>
  );
}

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
        {/* `theme=light` + the brand accent: the page around this modal is the light noisy ground,
            so a dark scheduler inside it read as a foreign panel — the same mismatch that made
            the contact page feel like a different site. */}
        <div className="flinza-cal-body">
          {CAL_CONFIGURED ? (
            <iframe
              title="Cal.com booking"
              src={`${CAL_URL}?embed=true&theme=light&brandColor=%2317849b`}
              loading="lazy"
              style={{ width: "100%", height: "100%", border: 0, display: "block" }}
            />
          ) : (
            <BookingForm />
          )}
        </div>

        {/* The escape hatch, always present: an iframe gives a visitor nothing to act on if the
            scheduler is slow, blocked or wrong, so the panel always offers a route that cannot
            fail — the address itself, and the booking page in its own tab when there is one. */}
        <p className="flinza-cal-fallback">
          Scheduler not loading? Email{" "}
          <a href={MAILTO_DISCOVERY}>{CONTACT_EMAIL}</a>
          {CAL_CONFIGURED ? (
            <>
              {" \u00b7 "}
              <a href={CAL_URL} target="_blank" rel="noreferrer noopener">
                open the booking page
              </a>
            </>
          ) : null}
        </p>
      </div>
    </div>
  );
}

export default function BookCallButton({ label = "Book a call", className = "" }) {
  const [open, setOpen] = useState(false);
  const onClose = useCallback(() => setOpen(false), []);

  return (
    <>
      {/* The trigger wears the same camo as every other CTA, so the booking path is one look
          across the site rather than a flat gradient pill. */}
      <CamoCtaButton
        as="button"
        size="lg"
        className={`flinza-book-call ${className}`.trim()}
        onClick={() => setOpen(true)}
        icon={
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 17L17 7M10 7h7v7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
      >
        {label}
      </CamoCtaButton>
      <CalModal open={open} onClose={onClose} />
    </>
  );
}
