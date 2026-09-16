'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const ContactButton = dynamic(
  () => import('@/components/ContactButton'),
  { ssr: false }
);

const LiquidImage = dynamic(
  () => import('@/components/LiquidImage'),
  { ssr: false }
);

// Your real Cal.com booking link (embedded inside the contact button's card).
const CAL_LINK = 'https://cal.com/flinza-works/discovery';

export default function ContactPage() {
  const [msg, setMsg] = useState({ name: '', email: '', message: '' });
  const [msgState, setMsgState] = useState('idle'); // idle | sending | sent | error

  const submitMessage = async (e) => {
    e.preventDefault();
    if (!msg.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(msg.email.trim()) || !msg.message.trim()) {
      setMsgState('error');
      return;
    }
    setMsgState('sending');
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg),
      });
      if (!res.ok) throw new Error('failed');
      setMsgState('sent');
    } catch {
      setMsgState('error');
    }
  };

  const fieldStyle = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '13px 16px',
    borderRadius: 14,
    border: '1px solid rgba(255,255,255,0.14)',
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    fontSize: 14.5,
    color: '#ffffff',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    outline: 'none',
    transition: 'border-color 0.2s ease, background 0.2s ease',
  };

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
        padding: '120px 24px 140px',
        boxSizing: 'border-box',
        background: 'radial-gradient(120% 90% at 50% 8%, #0b1220 0%, #060a12 46%, #04070a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Liquid hill backdrop — water-ripple WebGL image pinned to the bottom (non-interactive so it never blocks the page) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          bottom: -60,
          transform: 'translateX(-50%)',
          width: 'min(1400px, 165vw)',
          height: '58%',
          zIndex: 0,
          opacity: 0.9,
          pointerEvents: 'none',
        }}
      >
        <LiquidImage
          sourceType="image"
          image={{ src: '/images/hill_logo_2k.png', alt: '' }}
          fit="cover"
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

      {/* Header — no body copy, straight to the button */}
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
            margin: 0,
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
      </div>

      {/* Marketplace Contact Button — hover card + working Cal.com booking */}
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

      {/* Quick message — lands straight in the database, no email client needed */}
      <section
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 560,
          borderRadius: 24,
          padding: '26px 26px 24px',
          boxSizing: 'border-box',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(20px) saturate(150%)',
          WebkitBackdropFilter: 'blur(20px) saturate(150%)',
          boxShadow: '0 30px 80px -40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.12)',
        }}
      >
        {msgState === 'sent' ? (
          <div style={{ textAlign: 'center', padding: '26px 0' }}>
            <div style={{ width: 52, height: 52, margin: '0 auto 16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #56C1D3, #17849B)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.2 4.2L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h3 style={{ fontSize: 19, fontWeight: 800, margin: '0 0 8px', color: '#fff', fontFamily: "'Nohemi', sans-serif" }}>Message received</h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.6 }}>We read everything ourselves — expect a reply within one business day.</p>
          </div>
        ) : (
          <form onSubmit={submitMessage} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              <input style={fieldStyle} placeholder="Your name" value={msg.name} onChange={(e) => setMsg({ ...msg, name: e.target.value })} onFocus={(e) => e.target.style.borderColor = 'rgba(127,209,222,0.6)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.14)'} />
              <input style={fieldStyle} type="email" placeholder="Email" value={msg.email} onChange={(e) => setMsg({ ...msg, email: e.target.value })} onFocus={(e) => e.target.style.borderColor = 'rgba(127,209,222,0.6)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.14)'} />
            </div>
            <textarea
              style={{ ...fieldStyle, minHeight: 96, resize: 'vertical' }}
              placeholder="What are you trying to scale?"
              value={msg.message}
              onChange={(e) => setMsg({ ...msg, message: e.target.value })}
              onFocus={(e) => e.target.style.borderColor = 'rgba(127,209,222,0.6)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.14)'}
            />
            {msgState === 'error' && (
              <p style={{ margin: 0, fontSize: 13, color: '#fca5a5', fontWeight: 600 }}>Add your name, a valid email, and a short message.</p>
            )}
            <button
              type="submit"
              disabled={msgState === 'sending'}
              style={{
                marginTop: 4,
                alignSelf: 'center',
                border: 'none',
                cursor: msgState === 'sending' ? 'wait' : 'pointer',
                padding: '12px 34px',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.02em',
                color: '#ffffff',
                background: 'linear-gradient(120deg, #0A3E4C 0%, #17849B 55%, #3FB9CE 100%)',
                boxShadow: '0 14px 34px -12px rgba(23,132,155,0.55)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                opacity: msgState === 'sending' ? 0.7 : 1,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {msgState === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}
      </section>

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
