"use client";

/*
 * ChromeBookButton — the liquid-chrome circle that sits beside `Book a call` on the contact page.
 *
 * It used to be a link to `BOOKING_URL`, which is a Cal.com URL when a handle is configured and a
 * `mailto:` when it is not. A chrome orb that silently opens the user's mail client is a control
 * that lies about what it does, and on a machine with no mail handler it does nothing at all.
 *
 * It now opens the same booking panel the camo CTA opens, so both controls on that row do the same
 * thing and neither can dead-end. The chrome button is purely the affordance; the modal owns the
 * behaviour.
 */

import * as React from "react";
import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { CalModal } from "./CalGlassModal";

const LiquidChromeButton = dynamic(() => import("./LiquidChromeButton"), {
  ssr: false,
  loading: () => <span className="flinza-chrome-orb-fallback" aria-hidden="true" />,
});

export default function ChromeBookButton({ label = "Open booking" }) {
  const [open, setOpen] = useState(false);
  const onClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        className="flinza-chrome-orb"
        onClick={() => setOpen(true)}
        aria-label={label}
        title={label}
      >
        <LiquidChromeButton
          icon="Lightning"
          size={58}
          borderWidth={5}
          animationSpeed={0.7}
          glassOpacity={0.12}
        />
      </button>
      <CalModal open={open} onClose={onClose} />
    </>
  );
}
