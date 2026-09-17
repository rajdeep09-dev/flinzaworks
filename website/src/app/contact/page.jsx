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
import { contactTestimonials } from '@/data/testimonials';
import { CONTACT_EMAIL } from '@/lib/site';

const ContactButton = dynamic(
  () => import('@/components/ContactButton'),
  { ssr: false }
);

const CircleCards = dynamic(
  () => import('@/components/CircleCards'),
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
          { id: 'contact-ring', label: 'Who you talk to' },
          { id: 'contact-form', label: 'Send a message' },
        ]}
      />

      {/* Header */}
      <header className="flinza-contact-head" id="contact-intro">
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
      <section className="flinza-contact-stage" id="contact-ring">
        {/* The rotating headshot orbit is gone. This is the vendored CircleCards ring: real
            cards on the site's own ground, with the contact button held dead centre and the
            ring reacting to the pointer — the same composition the contact page is named for. */}
        <div className="flinza-contact-ring">
          <div className="flinza-contact-ring-cards" aria-hidden="true">
            <CircleCards
              cardCount={8}
              layout={{
                /* These numbers are geometry, not taste, and the previous values were wrong.
                 *
                 * The component derives the ring radius from the SHORTER side of its box, then
                 * clamps it so the cards stay inside. At 700x560 with ringScale 0.44 the radius
                 * came out at 123px around cards 90px tall, leaving a 169px hole for a contact
                 * button whose resting state is 134px across - so the button all but touched the
                 * cards. The box is bigger here and the ring scale is set high enough that the
                 * component's own clamp is what limits the radius, which is the intended lever.
                 *
                 * ringScaleMobile is above 1 deliberately: on a phone the box is only as wide as
                 * the viewport, so the width clamp binds long before the height clamp and the
                 * multiplier has to over-correct to reach it. */
                minHeight: 700,
                minHeightTablet: 0.94,
                minHeightMobile: 0.56,
                ringScale: 0.82,
                ringScaleTablet: 0.95,
                ringScaleMobile: 1.35,
                cardScale: 0.19,
                cardScaleTablet: 0.95,
                cardScaleMobile: 0.9,
                borderRadius: 16,
                ringOffsetY: 0,
              }}
              /* Opaque white is the component's default container fill. On a tinted page that is
                 a white rectangle in the middle of the gradient - the single most visible thing
                 about the old version. Its vignette is also turned off: the page already has the
                 site's own noisy gradient, and stacking a second vignette on top of it made the
                 middle of the ring muddy. */
              appearance={{ backgroundColor: 'transparent' }}
              visual={{ grainOpacity: 0, vignetteStrength: 0, glareIntensity: 0.55 }}
              accessibility={{
                ariaLabel: 'Flinza Works clients',
                cardAriaLabelPrefix: 'Client',
              }}
              media={contactTestimonials.slice(0, 8).map((t, index) => ({
                mediaType: 'image',
                image: {
                  src: t.avatar || '/images/story_portrait.jpg',
                  alt: t.name ? `${t.name}${t.role ? `, ${t.role}` : ''}` : `Flinza Works client ${index + 1}`,
                },
              }))}
            />
          </div>

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
