"use client";

/*
 * Services, rebuilt on the vendored Tabs-card (item 5).
 *
 * The reference component carries four tabs, and it stays exactly as authored — this file is
 * only the adapter that hands it Flinza's copy and keeps the two services that don't fit the
 * four-tab shape from disappearing. Those render as an editorial continuity row underneath:
 * number, title and description on hairlines, no boxes.
 */

import * as React from "react";
import TabsCard from "./TabsCard";

const IMAGE_PROP = (card) => (card?.image?.src ? { src: card.image.src, alt: card.title } : undefined);

export default function ServicesTabs({ cards = [] }) {
  const tabs = cards.slice(0, 4);
  const remaining = cards.slice(4);

  const props = {};
  for (let index = 0; index < 4; index += 1) {
    const card = tabs[index];
    const slot = index + 1;
    props[`title${slot}`] = card?.title ?? "";
    props[`description${slot}`] = card?.description ?? "";
    const image = IMAGE_PROP(card);
    if (image) props[`image${slot}`] = image;
  }

  return (
    <div className="flinza-services" style={{ width: "100%", display: "flex", flexDirection: "column", gap: 34 }}>
      <TabsCard {...props} style={{ width: "100%" }} />

      {remaining.length ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 0,
            width: "100%",
            borderTop: "1px solid rgba(9,9,11,0.12)",
          }}
        >
          {remaining.map((card, index) => (
            <div
              key={card.title ?? index}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                padding: "26px 26px 26px 0",
                borderRight: index === remaining.length - 1 ? "none" : "1px solid rgba(9,9,11,0.08)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 10.5,
                  fontWeight: 600,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--aqua-deep)",
                }}
              >
                {String(card.tag ?? "").replace(/^0*\d+\s*[•·]\s*/, "") || card.tag}
              </span>
              <h3
                className="flinza-display"
                style={{ margin: 0, fontSize: 24, color: "#09090b", letterSpacing: "-0.02em" }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-ui)",
                  fontSize: 14.5,
                  lineHeight: 1.66,
                  fontWeight: 300,
                  color: "#52525b",
                }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
