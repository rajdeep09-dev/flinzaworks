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
 * Layout is a flex column — header row (so Close stays reachable while the body scrolls on a
 * phone) over a body that is a two-column editorial grid on desktop and a single scrollable
 * column on mobile.
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

export default function FocusedStage({ caseStudy, focused, compact, onClose }) {
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
      {/* The stage ground: a gradient background, never a panel. */}
      <div
        aria-hidden="true"
        className="flinza-stage-ground"
        style={{
          position: "absolute",
          inset: 0,
          background: compact
            ? "radial-gradient(120% 80% at 50% 8%, rgba(255,255,255,0.86) 0%, rgba(238,245,248,0.94) 44%, rgba(223,234,238,0.97) 100%), linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(226,238,242,0.97) 62%, rgba(214,229,235,0.98) 100%)"
            : "linear-gradient(98deg, rgba(255,255,255,0.965) 0%, rgba(252,254,255,0.955) 34%, rgba(238,247,249,0.93) 58%, rgba(222,240,244,0.88) 80%, rgba(206,232,238,0.82) 100%), radial-gradient(90% 120% at 96% 50%, rgba(23,132,155,0.22) 0%, rgba(255,255,255,0) 62%)",
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
          overflowY: compact ? "auto" : "hidden",
          overscrollBehavior: "contain",
          display: "flex",
          flexDirection: compact ? "column" : "row",
          alignItems: compact ? "stretch" : "center",
          justifyContent: compact ? "flex-start" : "space-between",
          gap: compact ? 26 : 40,
          padding: compact ? "18px 20px 30px" : "0 clamp(30px, 4.2vw, 76px)",
          boxSizing: "border-box",
        }}
      >
        {/* ── The work ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: compact ? 12 : 16,
            width: compact ? "100%" : "min(566px, 48vw)",
            flex: compact ? "none" : "0 1 auto",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 10.5,
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#0E7C93",
            }}
          >
            {overline}
          </span>

          <h2
            className="flinza-display"
            style={{
              margin: 0,
              fontSize: compact ? "clamp(31px, 9.4vw, 38px)" : "clamp(38px, 4.1vw, 62px)",
              color: INK,
            }}
          >
            {toPlainText(caseStudy.title)}
          </h2>

          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-ui)",
              fontSize: compact ? 14.5 : 16.5,
              lineHeight: 1.72,
              color: INK_DIM,
              fontWeight: 300,
              maxWidth: compact ? undefined : 520,
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
                      fontSize: compact ? 12.8 : 13.5,
                      fontWeight: 400,
                      letterSpacing: "0.015em",
                      color: "rgba(9,9,11,0.78)",
                      lineHeight: 1.5,
                    }}
                  >
                    {toPlainText(item)}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          <div
            style={{
              marginTop: compact ? 8 : 14,
              paddingTop: compact ? 16 : 20,
              borderTop: `1px solid ${HAIRLINE}`,
              display: "flex",
              alignItems: "baseline",
              gap: compact ? 22 : 44,
              flexWrap: "wrap",
            }}
          >
            {results.primary ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <span
                  className="flinza-display"
                  style={{
                    fontSize: compact ? 42 : 58,
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
                <div key={valueKey} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
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

        {/* ── The client, on the same stage: quote, then avatar, name and role ── */}
        {testimonial ? (
          <figure
            className="flinza-stage-quote"
            style={{
              margin: 0,
              width: compact ? "100%" : "min(392px, 33vw)",
              flex: compact ? "none" : "0 1 auto",
              display: "flex",
              flexDirection: "column",
              gap: compact ? 18 : 22,
              paddingLeft: compact ? 18 : 30,
              borderLeft: `1px solid ${HAIRLINE}`,
            }}
          >
            <blockquote
              className="flinza-quote"
              style={{
                margin: 0,
                fontSize: compact ? 16.5 : "clamp(17px, 1.42vw, 21px)",
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
              <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
        ) : null}
      </div>
    </div>
  );
}
