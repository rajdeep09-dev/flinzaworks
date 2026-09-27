"use client";

/*
 * ClientBoundary — a per-component error boundary.
 *
 * ── Why this exists, and what went wrong without it ──
 *
 * The home page mounts nine client-only components through next/dynamic: a WebGL liquid-metal
 * logo, a Three.js carousel, audio players, scroll-driven reveals. A single throw inside any of
 * them used to take down the entire document — the header, the hero, the case studies, everything
 * the server had rendered perfectly — because the only boundary was the app-level one, which sits
 * ABOVE all of it and therefore replaces all of it.
 *
 * That is not a theoretical risk on this site. It was reported happening on a phone: the home
 * page came up as a bare error screen with no hero at all, on a device where the graphics stack is
 * the least reliable thing on the page.
 *
 * So the boundary goes HERE, around each risky component, rather than only at the top. A component
 * that cannot run on this device now disappears, and the composition around it — the hero, the
 * claim, the figures — renders exactly as intended.
 *
 * ── What it renders when a child throws ──
 *
 * Nothing, by default. These are decorative or redundant layers: a WebGL logo that sits beside a
 * plain <img> of the same mark, a carousel enhancement over markup that already reads. Rendering
 * a visible error box where a decoration should be would be worse than the decoration being
 * absent, so the default is a silent no-op. A `fallback` can be supplied where something visible
 * is genuinely required.
 *
 * The class name is passed through so the boundary can be identified in dev tools, and the label
 * is kept in the console message because "something threw" is not debuggable and "LiquidMetal
 * threw" is.
 */

import * as React from "react";

export default class ClientBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
    /* Changing `resetKey` remounts the subtree, which is how a caller offers a real retry —
       a remount re-runs the effect that threw, so it succeeds if the failure was transient. */
    this.state.resetKey = props.resetKey || 0;
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.resetKey !== state.resetKey) {
      return { failed: false, resetKey: props.resetKey };
    }
    return null;
  }

  componentDidCatch(error, info) {
    /* The whole point of the label: in production a component stack is minified to nothing, and
       without this line there is no way to tell which of the nine failed. */
    console.error(
      `[ClientBoundary] "${this.props.label || "component"}" failed to render and was skipped.`,
      error,
      info?.componentStack
    );
  }

  render() {
    if (this.state.failed) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
