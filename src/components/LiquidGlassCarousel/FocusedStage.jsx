"use client";

/*
 * Focused case-study stage.
 *
 * The previous version set this copy on a near-white scrim (rgba(255,255,255,0.96)). On a
 * dark site that reads as exactly the white card the design is not allowed to have — a panel
 * pasted over the artwork, with a visible edge and a halo. The stage is now the brand
 * gradient itself: full-bleed, no radius, no border, no interior edge, with the focused panel
 * glowing through on the right. Copy sits directly on it, and the client quote shares the
 * same stage rather than living in a box of its own.
 *
 * ── Two layouts, because one layout cannot serve both ──
 *
 * DESKTOP is a two-column editorial row: the work on the left, the client on the right, both on
 * the scrim, with the focused panel unoccluded on the right half.
 *
 * That row was also what a phone got, and a phone cannot carry it. The stage is only as wide as
 * the screen, so the two columns were squeezed side by side over the panel — the media showed
 * through the middle of the copy, the metrics grid collided with itself, and the client quote,
 * which is the reason the stage exists, ended up below the fold inside a body that had no touch
 * events and therefore could not be scrolled to. What the packed row produced on a phone was
 * overlapping type, not a case study.
 *
 * So phones get their own column: the project's poster at the top of the screen as a real image
 * on an opaque sheet (no scrim algebra, no panel showing through the text), then the overline,
 * the title, the lede, the deliverables, the metrics, the stack line and finally the quote and
 * the client — all full width, all at phone type sizes, in ONE scrollable column under a pinned
 * Close control. Nothing overlaps because nothing is beside anything.
 */

function toPlainText(value) {
  if (value == null) return "";
  return String(value)
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

const INK = "#09090b";
const INK_DIM = "rgba(9,9,11,0.68)";
const INK_FAINT = "rgba(9,9,11,0.45)";
const HAIRLINE = "rgba(9,9,11,0.14)";
const HAIRLINE_SOFT = "rgba(9,9,11,0.08)";

export default function FocusedStage({ caseStudy, image, focused, compact, onClose }) {
  if (!caseStudy) return null;

  const results = caseStudy.results || {};
  const rawTag = toPlainText(caseStudy.tag);
  const overline = rawTag.split("//")[1]?.trim() || rawTag || "Case Study";
  const deliverables = (caseStudy.deliverables || []).filter(Boolean);
  const stackLine = (caseStudy.stack || []).filter(Boolean).join("   ·   ");
  const metrics = [
    ["metricA", "metricALabel"],
    ["metricB", "metricBLabel"],
  ];
  const testimonial = caseStudy.testimonial;
  const poster = image || caseStudy.image?.src || caseStudy.imageSrc || "";

  /* ── The work: overline, title, lede, deliverables, metrics, stack ──
     One block, rendered in both layouts. Everything that differs between the two is a `compact`
     ternary, so the desktop column is byte-for-byte what it was. */
  const workColumn = (
    <div
      className="flinza-stage-work"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: compact ? 12 : 16,
        width: compact ? "100%" : undefined,
        flex: compact ? "none" : undefined,
        marginBlock: compact ? undefined : "auto",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#0a3e4c",
        }}
      >
        {overline}
      </span>

      <h2
        className="flinza-display"
        style={{
          margin: 0,
          fontSize: compact ? "clamp(30px, 8.6vw, 40px)" : "clamp(38px, 4.1vw, 62px)",
          lineHeight: compact ? 1.06 : undefined,
          color: INK,
        }}
      >
        {toPlainText(caseStudy.title)}
      </h2>

      {/* The client quote on the right is set in the editorial serif and reads far better
          than the summary did, so the summary now shares that face. Sans body copy next to a
          serif quote made the two halves look like they came from different sites. */}
      <p
        className="flinza-stage-lede"
        style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontSize: compact ? 17 : 21,
          lineHeight: compact ? 1.52 : 1.52,
          letterSpacing: "-0.005em",
          color: "rgba(9,9,11,0.82)",
          fontWeight: 400,
          maxWidth: compact ? undefined : 540,
        }}
      >
        {toPlainText(caseStudy.whatWeDid)}
      </p>

      {deliverables.length ? (
        <ul
          style={{
            margin: compact ? "4px 0 0" : "8px 0 0",
            padding: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: compact ? 7 : 9,
          }}
        >
          {deliverables.map((item, index) => (
            <li
              key={item}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "baseline",
                borderTop: index === 0 ? "none" : `1px solid ${HAIRLINE_SOFT}`,
                paddingTop: index === 0 ? 0 : compact ? 7 : 9,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 11,
                  color: "#17849B",
                  fontVariantNumeric: "tabular-nums",
                  minWidth: 18,
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: compact ? 13.2 : 14,
                  fontWeight: 500,
                  letterSpacing: "0.015em",
                  color: "rgba(9,9,11,0.84)",
                  lineHeight: 1.5,
                }}
              >
                {toPlainText(item)}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {/* The metrics. Laid out by `.flinza-stage-metrics`, which is a grid — as a wrapping
          flex row the three figures regularly landed as 2 + 1 with the last one orphaned.
          See overrides.css for the phone arrangement. */}
      <div
        className="flinza-stage-metrics"
        style={{
          marginTop: compact ? 10 : 14,
          paddingTop: compact ? 16 : 20,
          borderTop: `1px solid ${HAIRLINE}`,
          alignItems: "baseline",
        }}
      >
        {results.primary ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 5, minWidth: 0 }}>
            <span
              className="flinza-display"
              style={{
                fontSize: compact ? 40 : 58,
                fontVariantNumeric: "tabular-nums",
                background: "linear-gradient(112deg, #0A3E4C 0%, #17849B 48%, #3FB9CE 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              {results.primary}
            </span>
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 10.5,
                fontWeight: 500,
                letterSpacing: "0.05em",
                color: INK_FAINT,
              }}
            >
              {results.primaryLabel}
            </span>
          </div>
        ) : null}

        {metrics.map(([valueKey, labelKey]) =>
          results[valueKey] ? (
            <div key={valueKey} style={{ display: "flex", flexDirection: "column", gap: 5, minWidth: 0 }}>
              <span
                className="flinza-display"
                style={{
                  fontSize: compact ? 22 : 26,
                  color: INK,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {results[valueKey]}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 9.5,
                  fontWeight: 600,
                  letterSpacing: "0.17em",
                  textTransform: "uppercase",
                  color: INK_FAINT,
                }}
              >
                {results[labelKey]}
              </span>
            </div>
          ) : null
        )}
      </div>

      {stackLine ? (
        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.19em",
            textTransform: "uppercase",
            color: "rgba(9,9,11,0.34)",
          }}
        >
          {stackLine}
        </span>
      ) : null}
    </div>
  );

  /* ── The client, on the same stage: quote, then avatar, name and role ── */
  const quoteFigure = testimonial ? (
    <figure
      className="flinza-stage-quote"
      style={{
        margin: 0,
        /* Width, the left rule and the padding all live in globals.css, because they
           have to change together at the phone breakpoint. Stacked, a left rule is a stray
           vertical line and the correct treatment is a top rule instead. */
        width: compact ? "100%" : undefined,
        flex: compact ? "none" : undefined,
        display: "flex",
        flexDirection: "column",
        gap: compact ? 18 : 22,
        paddingLeft: compact ? 0 : undefined,
        paddingTop: compact ? 20 : undefined,
        marginBlock: compact ? undefined : "auto",
        borderLeft: compact ? "none" : undefined,
        borderTop: compact ? `1px solid ${HAIRLINE}` : undefined,
      }}
    >
      <blockquote
        className="flinza-quote"
        style={{
          margin: 0,
          fontSize: compact ? 17 : "clamp(17px, 1.42vw, 21px)",
          color: "#27272a",
        }}
      >
        &ldquo;{toPlainText(testimonial.quote)}&rdquo;
      </blockquote>
      <figcaption style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt=""
            width={40}
            height={40}
            loading="lazy"
            decoding="async"
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              objectFit: "cover",
              flex: "none",
              boxShadow: "0 0 0 1px rgba(9,9,11,0.14), 0 8px 20px -12px rgba(9,9,11,0.45)",
            }}
          />
        ) : null}
        <span style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 13.5,
              fontWeight: 600,
              color: INK,
              letterSpacing: "-0.01em",
            }}
          >
            {testimonial.name}
          </span>
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 11.5,
              fontWeight: 400,
              color: INK_FAINT,
            }}
          >
            {testimonial.role}
          </span>
        </span>
      </figcaption>
    </figure>
  ) : null;

  return (
    <div
      aria-hidden={!focused}
      className="flinza-stage"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 120,
        opacity: focused ? 1 : 0,
        pointerEvents: "none",
        transition: "opacity .55s cubic-bezier(0.16, 1, 0.3, 1)",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* The stage ground.
          Desktop: a scrim, not a veil. It starts soft on the left, fades to fully transparent by
          56% of the width and stops before the media column, so the noise stays visible through it
          and the artwork behind the right half is completely unoccluded.

          Phone: the stage's own layout is now a real sheet rather than copy laid over the panel, so
          the ground is a near-opaque wash edge to edge. The panel is not doing typographic duty any
          more — the poster at the top of the column is — and text that sits on a translucent scrim
          over a photograph is exactly the unreadable thing this rewrite is removing. */}
      <div
        aria-hidden="true"
        className="flinza-stage-ground"
        style={{
          position: "absolute",
          inset: 0,
          background: compact
            ? "linear-gradient(180deg, rgba(243,250,252,0.97) 0%, rgba(238,247,250,0.985) 42%, rgba(235,246,249,0.995) 100%)"
            : "linear-gradient(96deg, rgba(245,251,253,0.86) 0%, rgba(244,251,253,0.6) 22%, rgba(244,251,253,0) 40%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 3,
          flex: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: compact ? "14px 16px 0" : "22px 30px 0",
        }}
      >
        <button
          type="button"
          aria-label="Close focused project"
          className="flinza-focus-close"
          onClick={onClose}
          style={{
            pointerEvents: focused ? "auto" : "none",
            opacity: focused ? 1 : 0,
            transform: focused ? "none" : "translateY(-6px)",
            transition: "opacity .4s ease, transform .4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <svg width="9" height="9" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          Close
        </button>
      </div>

      <div
        className="flinza-stage-body"
        style={{
          position: "relative",
          zIndex: 2,
          flex: "1 1 auto",
          minHeight: 0,
          /* Both modes scroll. The desktop column was `overflow: hidden` with the row centred,
             and a centred flex row that overflows clips at BOTH ends — which is what cut the
             overline and the first line of the title off on a short desktop viewport. Scrolling
             plus auto block margins on the columns (below) keeps them optically centred when
             there is room and safely top-aligned when there is not. */
          overflowY: "auto",
          overscrollBehavior: "contain",
          /* …and it has to be reachable by a finger.

             The stage root is deliberately `pointer-events: none` so a closed stage can never
             swallow a gesture, and only the Close button opted back in. That made
             `overflow-y: auto` here decorative on a phone: the body had no pointer events at all,
             so a touch fell straight through it to the canvas, the body never scrolled, and the
             foot of a long case study — the metrics, the stack line and the client quote — could
             not be reached. While the stage is focused the body takes pointer events back, which
             is what makes it scroll under the thumb. */
          pointerEvents: focused ? "auto" : "none",
          display: "flex",
          flexDirection: compact ? "column" : "row",
          alignItems: compact ? "stretch" : "flex-start",
          justifyContent: compact ? "flex-start" : "space-between",
          gap: compact ? 18 : 40,
          /* The last 34px used to be the whole bottom inset, which on a phone with a home
             indicator put the client's name under it. */
          padding: compact
            ? "16px 18px calc(38px + env(safe-area-inset-bottom, 0px))"
            : "40px clamp(30px, 4.2vw, 76px)",
          boxSizing: "border-box",
          /* Phone: one column, and a scroll container the browser is happy to pan. */
          touchAction: compact ? "pan-y" : undefined,
          WebkitOverflowScrolling: compact ? "touch" : undefined,
        }}
      >
        {/* Phone only: the project itself, as a real image at the top of the column. This is the
            one thing the packed row could never show properly — the panel image is drawn by the
            WebGL canvas as a rectangle the width of one column, so on a phone it appeared as a hard
            edged block behind the type. */}
        {compact && poster ? (
          <figure
            className="flinza-stage-poster"
            style={{
              margin: 0,
              flex: "none",
              width: "100%",
              borderRadius: 18,
              overflow: "hidden",
              boxShadow: "0 18px 40px -24px rgba(9,9,11,0.55), inset 0 0 0 1px rgba(9,9,11,0.06)",
              background: "rgba(9,9,11,0.06)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={poster}
              alt=""
              loading="eager"
              decoding="async"
              style={{
                display: "block",
                width: "100%",
                height: "clamp(180px, 34svh, 300px)",
                objectFit: "cover",
              }}
            />
          </figure>
        ) : null}

        {workColumn}

        {quoteFigure}
      </div>
    </div>
  );
}
