'use client';

import dynamic from 'next/dynamic';

const ContactButton = dynamic(
  () => import('@/components/ContactButton'),
  { ssr: false }
);

export default function ContactPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        padding: '96px 24px 140px',
        boxSizing: 'border-box',
        background: 'radial-gradient(120% 100% at 50% 0%, #ffffff 0%, #fbfcfd 55%, #f4f5f7 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: 640 }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#7C3AED',
            margin: '0 0 14px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Contact
        </p>
        <h1
          style={{
            fontSize: 'clamp(34px, 5vw, 58px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.04,
            color: '#09090b',
            margin: '0 0 18px',
            fontFamily: "'Nohemi', sans-serif",
          }}
        >
          Let&apos;s build something profitable.
        </h1>
        <p
          style={{
            fontSize: 'clamp(15px, 1.6vw, 18px)',
            lineHeight: 1.6,
            color: '#52525b',
            margin: 0,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Hover the button to open our card and grab a time on the calendar. We reply to every serious inquiry within one business day.
        </p>
      </div>

      {/* Marketplace Contact Button — interactive hover card + Cal.com booking */}
      <ContactButton
        buttonTextDefault="Get In Touch"
        buttonHoverTextHover="Let's Build"
        cardName="Flinza Works"
        cardTitleText="Ecommerce Growth Agency"
        cardEmail="hello@flinzaworks.com"
        cardEmailSize={28}
        cardAvatar={{ src: '/images/story_portrait.jpg', alt: 'Flinza Works' }}
        buttonBGColorDefault="rgb(255,255,255)"
        buttonColorDefault="rgb(9,9,11)"
        buttonHoverBGColorHover="rgb(9,9,11)"
        buttonHoverColorHover="rgb(255,255,255)"
      />

      {/* Back link */}
      <a
        href="/"
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: '#71717a',
          textDecoration: 'none',
          letterSpacing: '-0.01em',
          transition: 'color 0.2s ease',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = '#09090b'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = '#71717a'; }}
      >
        ← Back to home
      </a>
    </main>
  );
}
