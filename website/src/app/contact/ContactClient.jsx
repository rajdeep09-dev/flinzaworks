'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import SiteGround from '@/components/SiteGround';
import SiteHeader from '@/components/SiteHeader';
import PageToc from '@/components/PageToc';
import BookCallButton from '@/components/CalGlassModal';
import ChromeBookButton from '@/components/ChromeBookButton';
import CamoCtaButton from '@/components/CamoCtaButton';
import SiteFooter from '@/components/SiteFooter';
import { CONTACT_EMAIL } from '@/lib/site';

const ContactButton = dynamic(
  () => import('@/components/ContactButton'),
  { ssr: false }
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

  return (
    <main className="flinza-contact-page">
      {/* The site's shared noisy gradient, so this route reads as the same website as the rest. */}
      <SiteGround />
      <SiteHeader active="/contact" />

      {/* This page is composition-led rather than heading-led, so its rail is declared rather
          than discovered — the ids below are its actual sections. */}
      <PageToc
        label="Contact"
        items={[
          { id: 'contact-intro', label: 'Overview' },
          { id: 'contact-cta', label: 'Get in touch' },
          { id: 'contact-form', label: 'Send a message' },
        ]}
      />

      {/* Header — the overline only. The headline moved down into the CTA, where the client asked
          for it: on top of the giant wordmark, rather than above an empty band. */}
      <header className="flinza-contact-head" id="contact-intro">
        <p>
          <span />
          Contact
        </p>
        <span className="flinza-contact-sub">
          A 30-minute call, an honest answer, and a scoped plan within 48 hours.
        </span>
      </header>

      {/* ════════════════════════════════════════════════════════════
           THE CTA — the ghosted wordmark, with the pill on top of it
      ════════════════════════════════════════════════════════════ */}
      {/* The rotating headshot ring is gone, on the client's instruction: "remove the pictures and
          add FLINZA WORKS on middle of get in touch, decrease the opacity to 22% exactly".

          Two reasons that instruction was right, not just a preference. The ring was eight client
          photographs, and the files behind it were the team's own four avatars recycled — the same
          faces that appeared on /about as staff and on /influencer-marketing as creators. And a
          wall of portraits on a contact page asks the visitor to look at us rather than to get in
          touch.

          In its place: the wordmark, huge, at exactly 22% opacity, with the headline, the lede and
          the existing Get In Touch pill sitting on top of it. Nothing here is client-only, so the
          composition — which is the whole page — arrives in the first paint. */}
      <section className="flinza-contact-stage" id="contact-cta">
        <span className="flinza-cta-mark" aria-hidden="true">
          FLINZA WORKS
        </span>

        <div className="flinza-cta-inner">
          <h1 className="flinza-cta-title flinza-display">
            Let&apos;s build something <em>profitable.</em>
          </h1>
          <span className="flinza-contact-sub">
            Tell us where growth stalled. We&apos;ll come back with the numbers.
          </span>

          <div className="flinza-orbit-contact">
            <ContactButton
              buttonTextDefault="Get In Touch"
              buttonHoverTextHover="Let's Build"
              cardName="Flinza Works"
              cardTitleText="Ecommerce Growth Agency"
              cardEmail={CONTACT_EMAIL}
              cardEmailSize={26}
              cardNameColor="rgb(9,9,11)"
              cardTitleColor="rgba(9,9,11,0.58)"
              cardEmailColor="rgb(9,9,11)"
              cardEmailLabelColor="rgba(9,9,11,0.45)"
              cardBGColor="rgba(255,255,255,0.5)"
              cardBGBlurDefault={26}
              cardBorder={{ borderColor: 'rgba(9,58,72,0.12)', borderStyle: 'solid', borderWidth: 1 }}
              /* The card used to open on a portrait photograph, which read as a stock headshot for
                 a company. It opens on the mark. */
              cardAvatar={{ src: '/images/flinza_logo_hd.png', alt: 'Flinza Works' }}
              buttonBGColorDefault="rgb(255,255,255)"
              buttonColorDefault="rgb(9,9,11)"
              buttonHoverBGColorHover="rgb(224,242,246)"
              buttonHoverColorHover="rgb(9,9,11)"
              iconDefaultIconColor="rgb(9,9,11)"
              iconHoverIconColor="rgb(14,124,147)"
              buttonHoverBorder={{ borderColor: 'rgb(23,132,155)', borderStyle: 'solid', borderWidth: 1 }}
            />
          </div>
        </div>

        <div className="flinza-contact-actions">
          <BookCallButton label="Book a call" />
          {/* The chrome orb used to link at BOOKING_URL, which is a mailto: when no Cal handle is
              configured — a control that lies about what it does, and one that does nothing at all
              on a machine with no mail handler. It now opens the same booking panel as the camo
              CTA beside it. */}
          <ChromeBookButton label="Open the booking panel" />
        </div>
      </section>

      {/* Quick message — lands straight in the database, no email client needed */}
      <section className="flinza-contact-form" id="contact-form">
        {msgState === 'sent' ? (
          <div className="flinza-form-done">
            <div
              style={{
                width: 52,
                height: 52,
                margin: '0 auto 16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #56C1D3, #17849B)',
                boxShadow: '0 16px 30px -16px rgba(10,62,76,0.8)',
                color: '#fff',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 24,
                fontWeight: 400,
                margin: '0 0 8px',
                color: 'var(--ink)',
              }}
            >
              Message received
            </h3>
            <p style={{ fontSize: 14.5, color: 'var(--ink-dim)', margin: 0, lineHeight: 1.62 }}>
              We read everything ourselves — expect a reply within one business day.
            </p>
          </div>
        ) : (
          <form onSubmit={submitMessage} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16 }}>
              <label className="flinza-field-wrap">
                <span className="flinza-field-label">Name</span>
                <input
                  className="flinza-field"
                  placeholder="Your name"
                  autoComplete="name"
                  value={msg.name}
                  onChange={(e) => setMsg({ ...msg, name: e.target.value })}
                />
              </label>
              <label className="flinza-field-wrap">
                <span className="flinza-field-label">Email</span>
                <input
                  className="flinza-field"
                  type="email"
                  placeholder="you@brand.com"
                  autoComplete="email"
                  value={msg.email}
                  onChange={(e) => setMsg({ ...msg, email: e.target.value })}
                />
              </label>
            </div>
            <label className="flinza-field-wrap">
              <span className="flinza-field-label">What are you trying to scale?</span>
              <textarea
                className="flinza-field flinza-field--area"
                placeholder="Revenue, current channels, what's stalling."
                value={msg.message}
                onChange={(e) => setMsg({ ...msg, message: e.target.value })}
              />
            </label>
            {msgState === 'error' && (
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#b4324a' }}>
                Add your name, a valid email, and a short message.
              </p>
            )}
            <div style={{ marginTop: 6, display: 'flex', justifyContent: 'center', opacity: msgState === 'sending' ? 0.7 : 1 }}>
              <CamoCtaButton
                as="button"
                type="submit"
                size="lg"
                disabled={msgState === 'sending'}
                className="flinza-form-submit"
              >
                {msgState === 'sending' ? 'Sending…' : 'Send Message'}
              </CamoCtaButton>
            </div>
          </form>
        )}
      </section>

      {/* This page renders its own frame rather than using PageShell, so it has to mount the
          footer itself — it had none at all, which meant a visitor arriving here from a search
          result found no way to reach the services, the socials or the legal pages. */}
      <SiteFooter />
    </main>
  );
}
