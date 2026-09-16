"use client";

/*
 * ServicesShowcase — the six services, laid out editorially instead of inside a card.
 *
 * Why this replaces the vendored tab card: that component baked a light panel and a fixed
 * interior width. On a phone it collapsed into a white block with the image squeezed to a
 * sliver, and it sat on the gradient like a foreign element. This renders the same six
 * services with no panel, no border and no filled box — index, title and copy sit directly on
 * the section gradient, and the only surfaces are the images themselves.
 *
 * Layout is one component, two compositions:
 *   • ≥1024px — a numbered index on the left, and a media plate on the right holding the
 *     active service's image. Hover or focus a row to move through them.
 *   • <1024px — a tap-to-open accordion. The open row reveals its copy, its metric and its
 *     own image inline, so a phone never loads or shows six large images at once.
 *
 * Motion is transform/opacity only (the accordion animates a grid-template-rows track, which
 * the browser can run on the compositor), and everything is disabled under
 * prefers-reduced-motion.
 */

import * as React from "react";

const normalize = (card, index) => {
  const study = card?.caseStudy ?? {};
  const rawTag = card?.tag ?? study.tag ?? "";
  return {
    key: `${card?.title ?? study.title ?? "service"}-${index}`,
    index: String(index + 1).padStart(2, "0"),
    label: String(rawTag).replace(/^0*\d+\s*[•·]\s*/, "") || "SERVICE",
    title: card?.title ?? study.title ?? "",
    description: card?.description ?? study.whatWeDid ?? "",
    image: card?.image?.src ?? null,
    metric: study.results?.primary ?? null,
    metricLabel: study.results?.primaryLabel ?? null,
    stack: Array.isArray(study.stack) ? study.stack.slice(0, 4) : [],
  };
};

export default function ServicesShowcase({ cards = [] }) {
  const services = React.useMemo(() => cards.map(normalize), [cards]);
  const [active, setActive] = React.useState(0);
  const [open, setOpen] = React.useState(0); // phone accordion: the first service opens by default

  if (!services.length) return null;

  const current = services[Math.min(active, services.length - 1)];

  return (
    <div className="flinza-svc">
      {/* ── Index (all widths; on phones each row expands in place) ── */}
      <ol className="flinza-svc-list">
        {services.map((service, index) => {
          const isActive = index === active;
          const isOpen = open === index;
          return (
            <li
              key={service.key}
              className={`flinza-svc-row${isActive ? " is-active" : ""}${isOpen ? " is-open" : ""}`}
              onMouseEnter={() => setActive(index)}
            >
              <button
                type="button"
                className="flinza-svc-head"
                aria-expanded={isOpen}
                aria-controls={`svc-panel-${index}`}
                onFocus={() => setActive(index)}
                onClick={() => {
                  setActive(index);
                  setOpen((prev) => (prev === index ? null : index));
                }}
              >
                <span className="flinza-svc-num">{service.index}</span>
                <span className="flinza-svc-label">{service.label}</span>
                <span className="flinza-svc-title flinza-display">{service.title}</span>
                <span className="flinza-svc-plus" aria-hidden="true" />
              </button>

              <div className="flinza-svc-panel" id={`svc-panel-${index}`}>
                <div className="flinza-svc-panel-inner">
                  <p className="flinza-svc-copy">{service.description}</p>

                  {service.metric ? (
                    <p className="flinza-svc-metric">
                      <strong>{service.metric}</strong>
                      <span>{service.metricLabel}</span>
                    </p>
                  ) : null}

                  {service.stack.length ? (
                    <p className="flinza-svc-stack">{service.stack.join("  ·  ")}</p>
                  ) : null}

                  {/* Phone-only: the image belongs to the open row, so six never load at once */}
                  {service.image ? (
                    <span className="flinza-svc-inline-media">
                      <img src={service.image} alt="" loading="lazy" decoding="async" />
                    </span>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* ── Media pile (desktop only) ──
          All six service images are held at once, fanned behind the active one, instead of a
          single plate that swapped on every hover. Each plate offsets by its distance from the
          active service, so nothing is hidden and the motion is pure transform — no layout,
          no reflow, no flicker between frames. */}
      <div className="flinza-svc-stage" aria-hidden="true">
        <div className="flinza-svc-pile">
          {services.map((service, index) => {
            const offset = index - active;
            const distance = Math.abs(offset);
            const style = {
              zIndex: 40 - distance,
              transform: `translate3d(${offset === 0 ? -10 : offset * 6}px, ${offset * 26}px, 0) scale(${1 - distance * 0.045})`,
              opacity: distance === 0 ? 1 : distance === 1 ? 0.72 : distance === 2 ? 0.45 : 0.24,
            };
            return (
              <figure
                key={service.key}
                className={`flinza-svc-plate${offset === 0 ? " is-active" : ""}`}
                style={style}
              >
                {service.image ? (
                  <img src={service.image} alt="" loading="lazy" decoding="async" />
                ) : null}
                <figcaption className="flinza-svc-plate-tag">
                  <span>{service.index}</span>
                  {service.label}
                </figcaption>
              </figure>
            );
          })}
        </div>
        <div className="flinza-svc-stage-meta">
          <span className="flinza-svc-stage-num flinza-display">{current.index}</span>
          <span className="flinza-svc-stage-label">{current.label}</span>
        </div>
      </div>
    </div>
  );
}
