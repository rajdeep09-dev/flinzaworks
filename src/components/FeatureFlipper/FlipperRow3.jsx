'use client';

import React, { useState } from 'react';

/*
 * Service cards ("What we do") — purpose-built.
 *
 * The previous implementation delegated to a vendored Framer flip component whose variant set
 * was authored for a different layout. On desktop it forced the wrong geometry and on phones
 * its closed face rendered with a pale wash, an unreadable chip and a title clipped by the
 * card edge. This version keeps the same premium look (full-bleed image, deep scrim, liquid
 * chip) but owns its own responsive behaviour:
 *
 *  - desktop: three equal cards; hover lifts the card, deepens the scrim and slides the arrow
 *  - phone: cards stack and tapping one expands its description (grid-rows transition, so no
 *    layout thrash outside the card)
 *  - keyboard: each card is focusable and toggles with Enter / Space
 *
 * Everything animates with transform / opacity, plus a contained grid-template-rows expand.
 */

const THUMB_PARAM = 'scale-down-to=1200';

function thumbUrl(src) {
  if (!src || typeof src !== 'string') return src;
  if (!src.includes('framerusercontent.com')) return src;
  return src.includes('?') ? `${src}&${THUMB_PARAM}` : `${src}?${THUMB_PARAM}`;
}

const defaultCards = [
  {
    tag: '01 • AUDIT',
    title: 'Find Your Revenue Leaks',
    description: 'We audit your funnel, creative, and attribution to find the 3–5 bottlenecks bleeding cash.',
    image: { src: 'https://framerusercontent.com/images/hIyXekP7SHBtRkcBBA8LoqjrdY.png' },
  },
  {
    tag: '02 • CREATIVE',
    title: 'Launch Videos That Convert',
    description: 'Product videos engineered for scroll-stopping impact, shot, edited and tested in 48 hours.',
    image: { src: 'https://framerusercontent.com/images/xWq5qlnMo4nwNQlhbzFUKWqikwQ.jpg' },
  },
  {
    tag: '03 • AI UGC',
    title: 'AI UGC Without Creators',
    description: 'Custom AI avatars produce unlimited user-generated content, so you can test 10x more angles.',
    image: { src: 'https://framerusercontent.com/images/N6nWcGmKkdYDhvYS1RN1VoX05k.jpg' },
  },
];

export default function FlipperRow3({ cards, id, className = '', style }) {
  const items = cards && cards.length ? cards : defaultCards;
  const [active, setActive] = useState(null);

  return (
    <div id={id} className={`svc-row ${className}`} style={style}>
      {items.map((card, index) => {
        const isOpen = active === index;
        return (
          <article
            key={`${card.title || 'service'}-${index}`}
            className={`svc-card${isOpen ? ' is-open' : ''}`}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            aria-label={`${card.title}. ${card.description || ''}`}
            onMouseEnter={() => {
              if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                setActive(index);
              }
            }}
            onMouseLeave={() => {
              if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                setActive(null);
              }
            }}
            onClick={() => setActive(isOpen ? null : index)}
            onFocus={() => setActive(index)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setActive(isOpen ? null : index);
              }
            }}
          >
            <img className="svc-img" src={thumbUrl(card.image?.src)} alt="" loading="lazy" decoding="async" />
            <span className="svc-scrim" aria-hidden="true" />

            <div className="svc-top">
              <span className="svc-tag">{card.tag}</span>
              <span className="svc-arrow" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>

            <div className="svc-body">
              <h3 className="svc-title">{card.title}</h3>
              <div className="svc-desc-wrap">
                <div className="svc-desc-inner">
                  <p className="svc-desc">{card.description}</p>
                </div>
              </div>
            </div>
          </article>
        );
      })}

      <style jsx>{`
        .svc-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          box-sizing: border-box;
        }

        .svc-card {
          position: relative;
          overflow: hidden;
          border-radius: 28px;
          min-height: 440px;
          cursor: pointer;
          background: #0c1116;
          box-shadow: 0 22px 50px -28px rgba(10, 62, 76, 0.45);
          transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.55s cubic-bezier(0.16, 1, 0.3, 1);
          outline: none;
          -webkit-tap-highlight-color: transparent;
        }

        .svc-card:hover,
        .svc-card:focus-visible {
          transform: translateY(-8px);
          box-shadow: 0 34px 70px -30px rgba(10, 62, 76, 0.55);
        }

        .svc-card:focus-visible {
          box-shadow: 0 0 0 2px rgba(23, 132, 155, 0.75), 0 34px 70px -30px rgba(10, 62, 76, 0.55);
        }

        .svc-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.02);
          transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease;
          filter: saturate(1.02) brightness(0.94);
        }

        .svc-card:hover .svc-img,
        .svc-card.is-open .svc-img {
          transform: scale(1.07);
          filter: saturate(1.06) brightness(0.86);
        }

        .svc-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(6, 10, 14, 0.34) 0%, rgba(6, 10, 14, 0.08) 32%, rgba(6, 10, 14, 0.62) 72%, rgba(6, 10, 14, 0.88) 100%);
          transition: opacity 0.6s ease;
        }

        .svc-card:hover .svc-scrim,
        .svc-card.is-open .svc-scrim {
          opacity: 0.94;
        }

        .svc-top {
          position: absolute;
          top: 16px;
          left: 16px;
          right: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          z-index: 2;
        }

        .svc-tag {
          display: inline-flex;
          align-items: center;
          padding: 7px 13px;
          border-radius: 999px;
          /* Dark glass: a white chip over a bright image left white text barely readable */
          background: rgba(8, 12, 16, 0.46);
          border: 1px solid rgba(255, 255, 255, 0.26);
          -webkit-backdrop-filter: blur(12px) saturate(160%);
          backdrop-filter: blur(12px) saturate(160%);
          color: #ffffff;
          font-family: 'Nohemi', sans-serif;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .svc-arrow {
          width: 38px;
          height: 38px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          background: rgba(255, 255, 255, 0.92);
          color: #0A3E4C;
          flex: none;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s ease, color 0.4s ease;
        }

        .svc-card:hover .svc-arrow,
        .svc-card.is-open .svc-arrow {
          background: linear-gradient(120deg, #0E7C93, #3FB9CE);
          color: #ffffff;
          transform: translate(2px, -2px) rotate(45deg);
        }

        .svc-body {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 22px 22px 24px;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .svc-title {
          margin: 0;
          color: #ffffff;
          font-family: 'Nohemi', sans-serif;
          font-size: clamp(20px, 2vw, 25px);
          font-weight: 600;
          line-height: 1.14;
          letter-spacing: -0.028em;
          text-shadow: 0 2px 18px rgba(0, 0, 0, 0.45);
        }

        .svc-desc-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
          opacity: 0;
        }

        .svc-card:hover .svc-desc-wrap,
        .svc-card.is-open .svc-desc-wrap {
          grid-template-rows: 1fr;
          opacity: 1;
        }

        .svc-desc-inner {
          overflow: hidden;
        }

        .svc-desc {
          margin: 0;
          padding-top: 2px;
          color: rgba(255, 255, 255, 0.82);
          font-family: 'Nohemi', sans-serif;
          font-size: 13.5px;
          line-height: 1.62;
          font-weight: 400;
        }

        @media (max-width: 900px) {
          .svc-row {
            grid-template-columns: minmax(0, 1fr);
            gap: 14px;
          }

          .svc-card {
            min-height: 320px;
            border-radius: 24px;
          }

          /* Touch devices keep the hover lift out of the way */
          .svc-card:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
