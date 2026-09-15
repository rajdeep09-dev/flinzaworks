'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const EtherealShadow = dynamic(
  () => import('@/components/EtherealShadow'),
  { ssr: false, loading: () => null }
);

const ContactButton = dynamic(
  () => import('@/components/ContactButton'),
  { ssr: false, loading: () => null }
);

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#fbfcfd',
        color: '#09090b',
        position: 'relative',
        overflowX: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* ── Noise paper texture (same as main site) ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.045'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          opacity: 0.7,
          mixBlendMode: 'multiply',
        }}
      />

      {/* ── EtherealShadow background ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <EtherealShadow
          color1="rgba(240, 243, 250, 0.95)"
          color2="#7C3AED"
          color3="#06B6D4"
          shadowOpacity={0.32}
          animation={{ preview: false, scale: 0, speed: 0, duration: 8 }}
          noise={{ opacity: 0.38, scale: 0.85 }}
        />
      </div>

      {/* ── Back link ── */}
      <div style={{ position: 'fixed', top: 28, left: 36, zIndex: 100 }}>
        <a
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 14,
            fontWeight: 600,
            color: '#09090b',
            textDecoration: 'none',
            padding: '8px 16px',
            borderRadius: 12,
            background: 'rgba(255,255,255,0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </a>
      </div>

      {/* ── Hero content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '60px 24px',
          boxSizing: 'border-box',
          textAlign: 'center',
        }}
      >
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 560,
            height: 560,
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.07) 50%, transparent 72%)',
            filter: 'blur(48px)',
            pointerEvents: 'none',
            animation: 'glowPulse 7s ease-in-out infinite',
          }}
        />

        <style>{`
          @keyframes glowPulse {
            0%,100% { opacity: 0.65; transform: translate(-50%,-50%) scale(1); }
            50% { opacity: 1; transform: translate(-50%,-50%) scale(1.1); }
          }
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* Section badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 18px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.72)',
            border: '1px solid rgba(124,58,237,0.22)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            boxShadow: '0 4px 20px rgba(124,58,237,0.08)',
            marginBottom: 28,
            animation: 'fadeSlideUp 0.65s ease both',
            animationDelay: '0.1s',
            opacity: 0,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              backgroundColor: '#7C3AED',
              boxShadow: '0 0 8px #7C3AED',
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#7C3AED',
            }}
          >
            Contact · Get In Touch
          </span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: 'clamp(44px, 7.5vw, 96px)',
            fontWeight: 900,
            letterSpacing: '-0.055em',
            lineHeight: 1.0,
            color: '#09090b',
            margin: '0 0 20px',
            animation: 'fadeSlideUp 0.7s ease both',
            animationDelay: '0.2s',
            opacity: 0,
          }}
        >
          Let&apos;s build something{' '}
          <span
            style={{
              display: 'block',
              background: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            extraordinary.
          </span>
        </h1>

        {/* Subheading */}
        <p
          style={{
            fontSize: 'clamp(17px, 2.2vw, 22px)',
            color: '#52525b',
            lineHeight: 1.6,
            maxWidth: 560,
            margin: '0 auto 52px',
            animation: 'fadeSlideUp 0.7s ease both',
            animationDelay: '0.32s',
            opacity: 0,
          }}
        >
          Hover the button to find us. A founder responds within 24 hours —
          not a sales rep, not a bot.
        </p>

        {/* ── ContactButton — the hero element ── */}
        <div
          style={{
            animation: 'fadeSlideUp 0.7s ease both',
            animationDelay: '0.46s',
            opacity: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <ContactButton
            buttonTextDefault="Contact"
            buttonHoverTextHover="Let's Talk"
            cardName="Flinza Studio"
            cardTitleText="AI & Interface Studio"
            cardEmail="hello@flinza.studio"
            cardEmailSize={28}
            cardNameColor="rgb(9,9,11)"
            cardTitleColor="rgb(113,113,122)"
            cardEmailColor="rgb(9,9,11)"
            cardBGColor="rgb(255,255,255)"
            cardBGBlurDefault={10}
            buttonBGColorDefault="rgb(255,255,255)"
            buttonColorDefault="rgb(9,9,11)"
            buttonHoverBGColorHover="rgb(9,9,11)"
            buttonHoverColorHover="rgb(255,255,255)"
          />
        </div>

        {/* ── Supporting links row ── */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 52,
            animation: 'fadeSlideUp 0.7s ease both',
            animationDelay: '0.58s',
            opacity: 0,
          }}
        >
          {[
            { label: '✉ hello@flinza.studio', href: 'mailto:hello@flinza.studio' },
            { label: '↗ LinkedIn', href: '#' },
            { label: '↗ Twitter / X', href: '#' },
            { label: '↗ GitHub', href: '#' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                padding: '10px 22px',
                borderRadius: 14,
                background: 'rgba(255,255,255,0.68)',
                border: '1px solid rgba(0,0,0,0.09)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                fontSize: 14,
                fontWeight: 600,
                color: '#09090b',
                textDecoration: 'none',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.92)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.68)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
              }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Bottom tagline */}
        <p
          style={{
            marginTop: 60,
            fontSize: 13,
            color: '#a1a1aa',
            letterSpacing: '0.08em',
            animation: 'fadeSlideUp 0.7s ease both',
            animationDelay: '0.7s',
            opacity: 0,
          }}
        >
          Usually responds in &lt; 4 hours during business days
        </p>
      </div>
    </main>
  );
}
