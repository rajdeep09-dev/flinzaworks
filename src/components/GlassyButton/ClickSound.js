"use client";
/*
 * The original Framer asset shipped a click-sound player whose audio lived on
 * framerusercontent.com. A production build must not depend on a third-party
 * host at runtime, and an unprompted click sound is bad UX on a marketing site,
 * so this is a silent stand-in with the same module shape.
 */
import * as React from "react";

export default function ClickSound() {
  return null;
}

ClickSound.displayName = "ClickSound";
