/*
 * The social share card, generated rather than checked in.
 *
 * Every route previously had NO og:image at all, so a shared link, a Slack unfurl and a WhatsApp
 * forward all rendered as a bare grey box. There was no 1200×630 asset in the repository and no
 * tooling here to draw one, and a hand-made PNG is a file that silently rots the moment the
 * positioning changes — so the card is drawn from the same data the site renders.
 *
 * `ImageResponse` runs on the edge and Next wires the result up across every route through the
 * file convention: it becomes og:image, og:image:width/height and twitter:image with no metadata
 * entry needed anywhere. It is generated once and cached by the CDN, so it costs nothing per
 * visitor.
 *
 * Palette and type are the site's own (the aqua ground and the Nohemi stack). Nothing here is
 * dynamic, so the card cannot fail on a cold cache.
 */

import { ImageResponse } from 'next/og';
import { STATS } from '@/data/stats';

export const runtime = 'edge';
export const alt = 'Flinza Works — ecommerce growth agency, built for profit not vanity metrics';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '74px 80px',
          background:
            'linear-gradient(142deg, #f4fbfd 0%, #e4f4f8 42%, #bfe6ee 74%, #8fd3e0 100%)',
          fontFamily: 'sans-serif',
          color: '#0a3e4c',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: '#17849B',
              display: 'flex',
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: '#0f6f86',
              display: 'flex',
            }}
          >
            Flinza Works
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div
            style={{
              fontSize: 104,
              fontWeight: 700,
              letterSpacing: '-0.05em',
              lineHeight: 1,
              display: 'flex',
            }}
          >
            Ecommerce growth,
          </div>
          <div
            style={{
              fontSize: 104,
              fontWeight: 700,
              letterSpacing: '-0.05em',
              lineHeight: 1,
              color: '#17849B',
              display: 'flex',
            }}
          >
            engineered for profit.
          </div>
          <div
            style={{
              fontSize: 27,
              color: 'rgba(10,62,76,0.78)',
              lineHeight: 1.4,
              maxWidth: 900,
              display: 'flex',
            }}
          >
            Meta ads · 48-hour creative testing · creator &amp; founder content · launch clipping
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 54 }}>
            {STATS.map((stat) => (
              <div key={stat.key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontSize: 40, fontWeight: 700, display: 'flex' }}>{stat.value}</div>
                <div
                  style={{
                    fontSize: 17,
                    color: 'rgba(10,62,76,0.66)',
                    letterSpacing: '0.02em',
                    display: 'flex',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: '#0f6f86',
              display: 'flex',
            }}
          >
            flinzaworks.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
