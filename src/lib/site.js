/*
 * Site configuration — one place for the two values that every page needs.
 *
 * Both used to be typed out per file. The booking link was hard-coded as
 * `https://cal.com/flinza-works/discovery` in three separate components, and that path answers
 * HTTP 404: the modal opened correctly and cal.com served its not-found page inside the iframe, so
 * the control looked broken and no amount of styling could fix it. The email was hard-coded in a
 * fourth place, the footer, the contact card and the modal all repeating the same string.
 *
 * Values that appear in more than one file drift. This module is the fix: change it here and the
 * whole site follows.
 *
 * The booking handle comes from `NEXT_PUBLIC_CAL_LINK` so the real Cal.com handle can be set per
 * environment (Vercel → Project → Settings → Environment Variables) with no code change. It
 * accepts either a bare handle (`your-name/discovery`) or a pasted URL, because the value gets
 * pasted from a browser address bar more often than it gets typed.
 *
 * When no handle is configured there is deliberately NO booking URL. Rather than pointing at a
 * Cal.com path that 404s, booking falls back to email — a control that opens an email composer is
 * worth more than a control that opens a not-found page.
 */

function normaliseCalHandle(raw) {
  if (!raw) return "";
  return String(raw)
    .trim()
    .replace(/^https?:\/\/(www\.)?cal\.com\//i, "")
    .replace(/[?#].*$/, "")
    .replace(/^\/+|\/+$/g, "");
}

export const CONTACT_EMAIL = "hello@flinzaworks.com";
export const MAILTO = `mailto:${CONTACT_EMAIL}`;
export const MAILTO_DISCOVERY = `${MAILTO}?subject=Discovery%20call`;

export const CAL_HANDLE = normaliseCalHandle(process.env.NEXT_PUBLIC_CAL_LINK);
export const CAL_CONFIGURED = CAL_HANDLE.length > 0;
export const CAL_URL = CAL_CONFIGURED ? `https://cal.com/${CAL_HANDLE}` : "";

/* The one link every booking control on the site should use. */
export const BOOKING_URL = CAL_CONFIGURED ? CAL_URL : MAILTO_DISCOVERY;
