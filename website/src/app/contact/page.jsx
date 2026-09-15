'use client';

import dynamic from 'next/dynamic';

const ContactButton = dynamic(
  () => import('@/components/ContactButton'),
  { ssr: false }
);

const LiquidImage = dynamic(
  () => import('@/components/LiquidImage'),
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
        gap: 44,
        padding: '120px 24px 160px',
        boxSizing: 'border-box',
        background: 'radial-gradient(120% 90% at 50% 8%, #0b1220 0%, #060a12 46%, #04070a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Liquid hill backdrop — water-ripple WebGL image pinned to the bottom */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          bottom: -40,
          transform: 'translateX(-50%)',
          width: 'min(1600px, 135vw)',
          height: '78%',
          zIndex: 0,
          opacity: 0.95,
          pointerEvents: 'auto',
        }}
      >
        <LiquidImage
          sourceType="image"
          image={{ src: '/images/hill_logo_2k.png', alt: '' }}
          fit="contain"
          colorReveal={false}
          strength={0.05}
          speed={0.1}
          borderRadius={0}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Readability veil over the backdrop */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, rgba(4,7,10,0.86) 0%, rgba(4,7,10,0.42) 34%, rgba(4,7,10,0.12) 62%, rgba(4,7,10,0.34) 100%)',
        }}
      />

      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: 760, position: 'relative', zIndex: 2 }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color: '#7FD1DE',
            margin: '0 0 22px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Contact
        </p>
        <h1
          style={{
            fontSize: 'clamp(44px, 7.4vw, 96px)',
            fontWeight: 800,
            letterSpacing: '-0.045em',
            lineHeight: 1.02,
            color: '#ffffff',
            margin: '0 0 24px',
            fontFamily: "'Nohemi', sans-serif",
          }}
        >
          Let&apos;s build something{' '}
          <span
            style={{
              background: 'linear-gradient(92deg, #ffffff 10%, #9adce8 55%, #56c1d3 95%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            profitable.
          </span>
        </h1>
        <p
          style={{
            fontSize: 'clamp(15px, 1.6vw, 18px)',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.66)',
            margin: '0 auto',
            maxWidth: 560,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Hover the button to open our card and grab a time on the calendar. We reply to every serious inquiry within one business day.
        </p>
      </div>

      {/* Marketplace Contact Button — interactive hover card + Cal.com booking */}
      <div style={{ position: 'relative', zIndex: 30 }}>
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
          buttonHoverBGColorHover="rgb(224,242,246)"
          buttonHoverColorHover="rgb(9,9,11)"
          iconDefaultIconColor="rgb(9,9,11)"
          iconHoverIconColor="rgb(14,124,147)"
          buttonHoverBorder={{ borderColor: 'rgb(23,132,155)', borderStyle: 'solid', borderWidth: 1 }}
        />
      </div>

      {/* Back link */}
      <a
        href="/"
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: 'rgba(255, 255, 255, 0.5)',
          textDecoration: 'none',
          letterSpacing: '-0.01em',
          transition: 'color 0.2s ease',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          position: 'relative',
          zIndex: 2,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)'; }}
      >
        ← Back to home
      </a>
    </main>
  );
}
