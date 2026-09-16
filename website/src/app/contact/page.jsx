'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import ContactOrbit from '@/components/ContactOrbit';
import SiteGround from '@/components/SiteGround';
import BookCallButton from '@/components/CalGlassModal';
import { contactTestimonials } from '@/data/testimonials';

const ContactButton = dynamic(
  () => import('@/components/ContactButton'),
  { ssr: false }
);

const LiquidChromeButton = dynamic(
  () => import('@/components/LiquidChromeButton'),
  { ssr: false, loading: () => null }
);

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
    border: '1px solid rgba(9,9,11,0.12)',
    background: 'rgba(255,255,255,0.58)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    fontSize: 14.5,
    color: 'var(--ink)',
    fontFamily: 'var(--font-ui)',
    outline: 'none',
    transition: 'border-color 0.2s ease, background 0.2s ease',
  };

  return (
    <main className="flinza-contact-page">
      {/* The site's shared noisy gradient, so this route reads as the same website as the rest. */}
      <SiteGround />
      <div aria-hidden="true" className="flinza-contact-veil" />

      {/* Header */}
      <header className="flinza-contact-head">
        <p>
          <span />
          Contact
        </p>
        <h1 className="flinza-display">
          Let&apos;s build something <em>profitable.</em>
        </h1>
        <span className="flinza-contact-sub">
          Tell us where growth stalled. We&apos;ll come back with the numbers.
        </span>
      </header>

      {/* Circular testimonial carousel with the contact button at its centre (item 9) */}
      <section className="flinza-contact-stage">
        <ContactOrbit testimonials={contactTestimonials}>
          <div className="flinza-orbit-contact">
            <ContactButton
              buttonTextDefault="Get In Touch"
              buttonHoverTextHover="Let's Build"
              cardName="Flinza Works"
              cardTitleText="Ecommerce Growth Agency"
              cardEmail="hello@flinzaworks.com"
              cardEmailSize={26}
              cardNameColor="rgb(247,251,252)"
              cardTitleColor="rgba(244,247,249,0.62)"
              cardEmailColor="rgb(244,247,249)"
              cardEmailLabelColor="rgba(244,247,249,0.45)"
              cardBGColor="rgba(255,255,255,0.12)"
              cardBGBlurDefault={26}
              cardBorder={{ borderColor: 'rgba(244,247,249,0.18)', borderStyle: 'solid', borderWidth: 1 }}
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
        </ContactOrbit>

        <div className="flinza-contact-actions">
          <BookCallButton label="Book a call" />
          <div className="flinza-contact-chrome" title="Book a discovery call">
            <LiquidChromeButton
              icon="Lightning"
              size={58}
              borderWidth={5}
              animationSpeed={0.7}
              glassOpacity={0.12}
              link="https://cal.com/flinza-works/discovery"
            />
          </div>
        </div>
      </section>

      {/* Quick message — lands straight in the database, no email client needed */}
      <section className="flinza-contact-form">
        {msgState === 'sent' ? (
          <div style={{ textAlign: 'center', padding: '26px 0' }}>
            <div style={{ width: 52, height: 52, margin: '0 auto 16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #56C1D3, #17849B)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.2 4.2L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, margin: '0 0 8px', color: 'var(--ink)' }}>Message received</h3>
            <p style={{ fontSize: 14, color: 'var(--ink-dim)', margin: 0, lineHeight: 1.6 }}>We read everything ourselves — expect a reply within one business day.</p>
          </div>
        ) : (
          <form onSubmit={submitMessage} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              <input style={fieldStyle} placeholder="Your name" value={msg.name} onChange={(e) => setMsg({ ...msg, name: e.target.value })} onFocus={(e) => e.target.style.borderColor = 'rgba(127,209,222,0.6)'} onBlur={(e) => e.target.style.borderColor = 'rgba(244,247,249,0.16)'} />
              <input style={fieldStyle} type="email" placeholder="Email" value={msg.email} onChange={(e) => setMsg({ ...msg, email: e.target.value })} onFocus={(e) => e.target.style.borderColor = 'rgba(127,209,222,0.6)'} onBlur={(e) => e.target.style.borderColor = 'rgba(244,247,249,0.16)'} />
            </div>
            <textarea
              style={{ ...fieldStyle, minHeight: 96, resize: 'vertical' }}
              placeholder="What are you trying to scale?"
              value={msg.message}
              onChange={(e) => setMsg({ ...msg, message: e.target.value })}
              onFocus={(e) => e.target.style.borderColor = 'rgba(127,209,222,0.6)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(244,247,249,0.16)'}
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

      <a href="/" className="flinza-contact-back">← Back to home</a>
    </main>
  );
}
