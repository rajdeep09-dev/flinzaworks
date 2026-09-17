"use client";

/*
 * SectionLabel — the one typographic label above a section.
 *
 * One label per section: heavier weight, tighter tracking, a short brand rule. It replaced the
 * hand-drawn arrow threads, which read as doodles and were the last decorations overlapping
 * content anywhere on the page.
 *
 * It was declared inside `app/page.jsx`, which meant the same four lines would have had to be
 * copied the moment a second route wanted a section label. It is a component, so it lives here.
 */

export default function SectionLabel({ label }) {
  return (
    <p className="flinza-overline">
      <span aria-hidden="true" />
      {label}
    </p>
  );
}
