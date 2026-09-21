"use client";

/*
 * FaqList — the twelve questions as one native accordion.
 *
 * This replaces four separate copies of a vendored hover-list component. That component had
 * already been patched repeatedly from the outside (its image container hidden, its fixed
 * heights overridden, its font sizes fought) because it was authored for a 900px canvas: on a
 * phone it produced 159px rows for a single line of question text, which is what made the
 * section read as broken while scrolled.
 *
 * Here the row is a real button at content height, the open state is a CSS grid-track
 * animation (0fr → 1fr, so no height is measured in JS and long answers can never be clipped),
 * and only transform/opacity/colour animate.
 *
 * The hover treatment is deliberately restrained — a chromatic offset on the row number and a
 * sweeping hairline — so it reads as engineered rather than gimmicky.
 */

import * as React from "react";

export default function FaqList({ items = [], defaultOpen = null }) {
  const [open, setOpen] = React.useState(defaultOpen);

  /*
   * This component is mounted three times on the home page (one per FAQ cluster), so a
   * plain `faq-answer-${index}` id repeats across the document and every
   * aria-controls reference becomes ambiguous. useId() gives each instance its own
   * namespace; the colon-stripping keeps the value valid as an HTML id.
   */
  const uid = React.useId();
  const idBase = `faq-${uid.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  if (!items.length) return null;

  return (
    <div className="flinza-faqlist">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div
            key={item.number ?? index}
            className={`flinza-faqrow${isOpen ? " is-open" : ""}`}
          >
            {/* The question is a real <h3> that wraps the button, not a span inside it.
             *
             * Two reasons, and only one of them is SEO. A heading a screen reader can jump
             * between is how a screen-reader user skims a FAQ at all — the span version gave them
             * twelve unlabelled buttons. And answer engines match a question to a page by its
             * heading, so the question has to BE a heading. Putting the heading *inside* the button
             * would be invalid HTML (a button may not contain a heading), which is why the wrapper
             * goes on the outside. */}
            <h3 className="flinza-faqrow-heading">
              <button
                type="button"
                className="flinza-faqrow-head"
                aria-expanded={isOpen}
                aria-controls={`${idBase}-answer-${index}`}
                onClick={() => setOpen((prev) => (prev === index ? null : index))}
              >
                <span className="flinza-faqrow-num" aria-hidden="true">
                  {item.number ?? String(index + 1).padStart(2, "0")}
                </span>
                <span className="flinza-faqrow-q">{item.question}</span>
                <span className="flinza-faqrow-sign" aria-hidden="true" />
              </button>
            </h3>

            <div className="flinza-faqrow-body" id={`${idBase}-answer-${index}`}>
              <div className="flinza-faqrow-body-inner">
                <p className="flinza-faqrow-a">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
