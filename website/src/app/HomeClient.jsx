'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import FluidText from '@/components/FluidText';
import { withCaseStudyTestimonial } from '@/data/testimonials';
import { faqItems } from '@/data/faqs';
/* The hero's numbers and the positioning line, from the one file that also feeds the About page
   and the Organization JSON-LD — so the same figure is stated the same way everywhere. */
import { STATS, POSITIONING } from '@/data/stats';
import { carouselProjects } from '@/data/projects';
import { founderStories } from '@/data/stories';
import { row1Cards, row2Cards } from '@/data/serviceCards';
import SectionLabel from '@/components/SectionLabel';
import FaqList from '@/components/FaqList';
import CamoCtaButton from '@/components/CamoCtaButton';
/* The one footer. /about, /services, /work, /insights, /careers, /contact and the legal pages all
   already end with this; the home page carries it too, so the last thing anyone sees is the same
   on every route. */
import SiteFooter from '@/components/SiteFooter';

const EtherealShadow = dynamic(
  () => import('@/components/EtherealShadow'),
  {
    ssr: false,
    loading: () => null,
  }
);

const LiquidGlassCarousel = dynamic(
  () => import('@/components/LiquidGlassCarousel'),
  {
    ssr: false,
    loading: () => null,
  }
);

const LiquidMetal = dynamic(
  () => import('@/components/LiquidMetal'),
  {
    ssr: false,
    loading: () => null,
  }
);


const TableOfContent = dynamic(
  () => import('@/components/TableOfContent'),
  {
    ssr: false,
    loading: () => null,
  }
);


const TheaterVideoPlayer = dynamic(
  () => import('@/components/TheaterVideoPlayer'),
  {
    ssr: false,
    loading: () => null,
  }
);

const WhatsApAudioPlayer = dynamic(
  () => import('@/components/WhatsappAudioPlayer'),
  {
    ssr: false,
    loading: () => null,
  }
);

const FramerStory = dynamic(
  () => import('@/components/FramerStory'),
  {
    ssr: false,
    loading: () => null,
  }
);



const ServicesShowcase = dynamic(
  () => import('@/components/ServicesShowcase'),
  {
    ssr: false,
    loading: () => null,
  }
);

const DiaFooter = dynamic(
  () => import('@/components/DiaFooter'),
  {
    ssr: false,
    loading: () => null,
  }
);



const ContactButton = dynamic(
  () => import('@/components/ContactButton'),
  {
    ssr: false,
    loading: () => null,
  }
);

// ── Smoothness hooks (shell-only; no visual code changes) ──
//
// `useReveal` used to live here — six instances of it, six pieces of state, six refs and six
// `revealed ? 'reveal-in' : 'reveal-init'` ternaries, all of it covering this page and nothing
// else. The seam between sections is now owned by <SectionReveal /> in the root layout, which
// covers EVERY route with one observer and leaves this file with only the gates it actually needs:
// mounting a heavy child shortly before it is scrolled to. See src/components/SectionReveal.jsx.

// One-way in-view gate: mounts children just before they scroll into view
// (rootMargin buffer), then stays mounted forever — nothing ever replays.
function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '500px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

export default function Page({ heroPhoto = null }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  // The fixed side rail must disappear over the FAQ/footer/contact region, where it collided with copy
  const [tocHidden, setTocHidden] = useState(false);
  const [focusedCaseStudy, setFocusedCaseStudy] = useState(false);

  // Lazy-mount anchors — the only refs this page still needs.
  const [storiesMountRef, storiesInView] = useInView();
  const [servicesMountRef, servicesInView] = useInView();
  const [testimonialsMountRef, testimonialsInView] = useInView();
  const [faqMountRef, faqInView] = useInView();
  const [footerMountRef, footerInView] = useInView();
  /* The fluid carousel is a WebGL surface, and it used to be the hero — so it mounted with the
     first paint and the hero waited on a shader to compile before the page looked finished. It is
     a Selected Work band below the fold now, so it is not mounted until the reader is nearly at
     it. That leaves the hero's own text as the largest contentful paint and keeps a WebGL context
     from ever being created on a phone that never scrolls that far — which is most of them. */
  const [workMountRef, workInView] = useInView();

  // Track scroll position for TOC visibility and quick button hide/restore
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const past = y > window.innerHeight * 0.35;
      setScrolledPastHero((prev) => (prev === past ? prev : past));
      const nearEnd = y + window.innerHeight > document.documentElement.scrollHeight - window.innerHeight * 1.15;
      setTocHidden((prev) => (prev === nearEnd ? prev : nearEnd));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // The eight service cards are data — see @/data/serviceCards (imported at the top of this file).

  /* Warm the case-study imagery so the Selected Work band never reveals blank panels — but only
   * once the reader is nearly at it.
   *
   * This used to fire on mount, because the carousel WAS the hero and its panels had to be decoded
   * before the page looked finished. Now that the hero is text and the carousel is a band below the
   * fold, fetching eight 1200px images during the first paint is eight requests competing with the
   * one thing that has to be fast — the hero. Gating the warm-up on the same in-view trigger that
   * mounts the carousel means the images still arrive with it, and the first screen pays nothing.
   */
  useEffect(() => {
    if (!workInView) return;
    carouselProjects
      .map((p) => p.image?.src)
      .filter(Boolean)
      .forEach((src) => {
        const img = new Image();
        img.src = src;
      });
  }, [workInView]);

  /* The site paints immediately.
   *
   * There used to be a full-screen preloader here that held the page for ~1.9s and only then
   * revealed the hero — which meant the first thing anyone saw was a loading animation instead of
   * the metal mark. Everything on this page is either preloaded, static, or a shader that fades
   * itself in, so the only thing the gate was doing was hiding the site. `isLoaded` now flips on
   * the first painted frame: it still drives the hero's entry animation and the header's fade,
   * but nothing is waiting on the network to start. */
  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsLoaded(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <main
      className="flinza-home-main"
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#fbfcfd',
        color: '#09090b',
        position: 'relative',
        margin: 0,
        padding: 0,
        fontFamily: "'Nohemi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Full-Website Ethereal Shadow Background (hardware-accelerated, zero-lag) */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <EtherealShadow
          color1="rgba(246, 251, 252, 0.95)"
          color2="#7FD1DE"
          color3="#2E93AC"
          shadowOpacity={0.38}
          animation={{ preview: false, scale: 0, speed: 0, duration: 8 }}
          noise={{ opacity: 0.38, scale: 0.85 }}
        />
      </div>

      {/* Pinned Minimal Header Nav Bar with Liquid Metal Logo — hero only, so it never collides with section content or the focused overlay */}
      <header style={{
        position: 'fixed',
        top: 24,
        left: '50%',
        transform: focusedCaseStudy ? 'translateX(-50%) scale(0.82)' : 'translateX(-50%) scale(1)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        /* The header belongs to the hero, so it also has to step out of the way of the focused case
           study. It is `position: fixed` at z-index 100 while the stage is absolutely positioned
           inside the hero's own stacking context, so the metal mark painted straight over the open
           case study — the one piece of chrome on the screen that has no business being there. */
        pointerEvents: (isLoaded && !scrolledPastHero && !focusedCaseStudy) ? 'auto' : 'none',
        opacity: (isLoaded && !scrolledPastHero && !focusedCaseStudy) ? 1 : 0,
        transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <a
          href="#hero"
          aria-label="Home"
          className="flinza-logo-btn flinza-mark-stack"
          style={{
            width: 68,
            height: 68,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            textDecoration: 'none',
            filter: 'drop-shadow(0 4px 14px rgba(0, 0, 0, 0.08))',
          }}
        >
          {/* The still mark paints on the very first frame; the metal shader is layered over it
              and simply takes over as it draws. There is no moment where the slot is empty. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="flinza-mark-still"
            src="/images/flinza_logo_hd.png"
            alt=""
            width={68}
            height={68}
            fetchPriority="high"
            decoding="sync"
          />
          <LiquidMetal
            speed={0.15}
            dispersion={0.015}
            edge={0.4}
            liquify={0.07}
            patternScale={2}
            imageSource="/images/flinza_logo_hd.png"
          />
        </a>
      </header>

      {/* ════════════════════════════════════════════════════════════
           HERO — a message, in the AIDA order
      ════════════════════════════════════════════════════════════ */}
      {/* The old hero was the fluid carousel with one line of copy under it: a very good-looking way
          of not saying what the company sells. The client's note was exact — "the hero sections must
          have a message, it looks kinda cool but you very much cannot tell tf we do" — so this one
          answers four questions in order:

            ATTENTION  a full-bleed visual — a figure standing in a white bloom — with the brand as
                       a quiet label in the corner rather than a giant wordmark across the middle;
            INTEREST   the claim, and who it is for, in one sentence;
            DESIRE     the four figures, worded exactly as they are on /about and in the schema;
            ACTION     one CTA into the booking flow, one secondary into the work.

          The composition is the one the client sent from flinzaworks.in, rebuilt on this site's own
          palette: he asked for that hero's shape and was explicit that the colour had to stay
          Flinza, so the bloom is the brand aqua and the brand blue, not the reference's purple. The
          visual itself is one self-hosted SVG (public/images/hero-glow.svg) with the blur baked in,
          which is why a full-screen blurred image costs nothing per frame.

          It is plain markup and one painted layer with no WebGL anywhere in it, which also makes it
          the fastest thing on the page — the carousel that used to sit here now mounts below the
          fold under its own heading, where it can be looked at on purpose. */}
      <section id="hero" className="flinza-hero-stage">
        {/* The visual. One self-hosted SVG — a white bloom over a cloudy aqua haze, with a blurred
            figure rising through it. 4 kB, sharp at every DPR, and the blur is baked into the file
            so the compositor rasterises it once instead of blurring a full-viewport layer every
            frame.

            `heroPhoto` is the optional real photograph, resolved on the server at build time (see
            app/page.jsx). It is layered ABOVE the vector and below the scrim, so supplying it needs
            no edit here and removing it falls back to the vector rather than to nothing. */}
        <div className="flinza-hero-visual" aria-hidden="true" />
        {heroPhoto ? (
          <div
            className="flinza-hero-photo"
            aria-hidden="true"
            style={{ backgroundImage: `url("${heroPhoto}")` }}
          />
        ) : null}
        <div className="flinza-hero-scrim" aria-hidden="true" />

        <div className="flinza-hero-inner">
          {/* The two ends of the top rule: who we are on the left, and the line the client wrote
              himself on the right. */}
          <div className="flinza-hero-top">
            <p className="flinza-hero-kicker">
              Flinza Works
              <span>Ecommerce growth agency</span>
            </p>
            <p className="flinza-hero-note">{POSITIONING}</p>
          </div>

          <div className="flinza-hero-bottom">
            <div className="flinza-hero-copy">
              {/* No giant wordmark on the first screen, on the client's instruction — and he was
                  right. The loudest element of a hero should be the claim, not the company's own
                  name, so the h1 is the claim and the brand is the quiet label above it. */}
              <h1 className="flinza-hero-claim">
                Ecommerce growth, <em>engineered for profit</em>.
              </h1>

              <p className="flinza-hero-interest">
                A data-driven growth agency for DTC brands spending $50K+ a month: Meta ads,
                creator-led and founder-led content, and launch clipping — tested on 48-hour cycles
                and measured on profit contribution, never on vanity metrics.
              </p>

              <div className="flinza-hero-actions">
                <CamoCtaButton href="/contact" size="lg">
                  Book a discovery call
                </CamoCtaButton>
                <a className="flinza-hero-secondary" href="#work">
                  See the work
                </a>
              </div>

              <a className="flinza-hero-scroll" href="#work">
                <span aria-hidden="true">↓</span> Scroll
              </a>
            </div>

            <ul className="flinza-hero-stats">
              {STATS.map((stat) => (
                <li key={stat.key}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
           SELECTED WORK — the fluid carousel, relocated under a heading
      ════════════════════════════════════════════════════════════ */}
      {/* This is the carousel that used to be the hero. It was never the problem — it was the wrong
          job for it. Under a heading that says what it is, it does exactly what it was built to do:
          eight case studies you can pick up and turn over. */}
      <section id="work" ref={workMountRef} className="flinza-work-band">
        <div className="flinza-work-head">
          <p className="flinza-overline">
            <span aria-hidden="true" />
            Selected work
          </p>
          <h2 className="flinza-work-title">
            Eight accounts, <em>eight levers</em>
          </h2>
          <p className="flinza-work-sub">
            Turn the ring and pick a case study: the situation, what we changed, and what it
            produced. Real numbers, and the ones that failed are written up on the work page too.
          </p>
        </div>

        <div className="flinza-work-stage">
          {workInView ? (
          <LiquidGlassCarousel
          projects={carouselProjects.map(withCaseStudyTestimonial)}
          panelHeight={480}
          gap={12}
          glide={0.075}
          wheelSensitivity={1}
          snap={true}
          snapDistance={60}
          snapDelay={120}
          speedShrink={60}
          lensShape="circle"
          lensRotation={65}
          lensWidth={0.565}
          lensHeight={1}
          lensX={0.5}
          lensY={0.5}
          dispersion={11}
          zoom={0}
          blur={0}
          glow={3.8}
          blueRing={5.2}
          blueColor="#3FB9CE"
          shimmer={true}
          rimWave={0.6}
          entryAnimation={true}
          startEntry={isLoaded}
          focusScale={1.18}
          background="transparent"
          foreground="#000000"
          showLabels={true}
          showCounter={false}
          showCursor={true}
          onFocusChange={setFocusedCaseStudy}
          font={{
            fontFamily: "'Nohemi', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: 16,
            fontWeight: 700,
            lineHeight: '1.25em',
          }}
          pixelRatio={1.35}
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent',
          }}
          />
          ) : null}
        </div>
      </section>

      {/* Table Of Contents Navigation - Sleek minimal dashes pinned to left margin (ONLY visible after scrolling past hero) */}
      <nav
        aria-label="Table of Contents"
        className={`flinza-toc-desktop${tocHidden ? ' flinza-toc-hidden' : ''}`}
        style={{
          position: 'fixed',
          left: 28,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 999,
          opacity: (scrolledPastHero && isLoaded && !tocHidden) ? 1 : 0,
          pointerEvents: (scrolledPastHero && isLoaded && !tocHidden) ? 'auto' : 'none',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <TableOfContent
          title1="HOME"
          link1="#hero"
          title2="WORK"
          link2="#work"
          title3="SERVICES"
          link3="#services"
          title4="VOICES"
          link4="#testimonials"
          title5="CONTACT"
          link5="#contact"
          lineColor="rgba(40, 45, 55, 0.75)"
          linkColor="#09090b"
          linkFontSize={13}
        />
      </nav>

      {/* Founder Stories Section: Seamless Rectangular Puzzle Mosaic of Videos */}
      <section
        id="stories"
        ref={storiesMountRef}
        style={{
          width: '100%',
          minHeight: '100vh',
          padding: '120px 24px 140px',
          boxSizing: 'border-box',
          backgroundColor: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          maxWidth: 860,
          marginBottom: 88,
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 999,
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            border: '1px solid rgba(23, 132, 155, 0.3)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 4px 20px rgba(23, 132, 155, 0.1)',
            marginBottom: 18,
          }}>
            <span style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: '#17849B',
              boxShadow: '0 0 8px #17849B',
            }} />
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#4b5563',
            }}>
              Case Studies • Theater Mode
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(34px, 5.2vw, 56px)',
            fontWeight: 700,
            letterSpacing: '-0.035em',
            lineHeight: 1.08,
            color: '#09090b',
            margin: '0 0 16px',
            fontFamily: "'Nohemi', sans-serif",
          }}>
            <FluidText text="Verified Results, Not Promises" />
          </h2>
          <p style={{
            fontSize: 'clamp(16px, 1.8vw, 19px)',
            color: '#52525b',
            lineHeight: 1.6,
            margin: 0,
            fontWeight: 400,
            maxWidth: 680,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Real campaigns across paid media, creative and content — see how we test, learn and scale ecommerce brands.
          </p>
        </div>

        {/* Flush Rectangular Puzzle Grid with Hand-Drawn Doodles */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 1480,
            margin: '0 auto',
          }}
        >
{/* Enlarged Flush Rectangular Puzzle Grid */}
          <div
            className="flinza-story-grid"
            style={{
              width: '100%',
              height: 740,
              display: 'grid',
              gridTemplateColumns: 'minmax(360px, 480px) 1fr 1fr',
              gridTemplateRows: '1fr 1fr',
              gap: 18,
              boxSizing: 'border-box',
            }}
          >
            {/* Tile 1: Tall Vertical Video (Spans Columns 1, Rows 1 & 2) */}
            <div style={{ gridColumn: '1 / 2', gridRow: '1 / 3', width: '100%', height: '100%' }}>
              <div className="flinza-mount-gate" style={{ width: '100%', height: '100%' }}>
              {storiesInView ? <TheaterVideoPlayer
                videoUrl="/videos/story1.mp4"
                thumbnail={{ src: '/images/poster_1.webp', alt: 'Founder story' }}
                aspectRatio="fill"
                loop={true}
                mutedByDefault={true}
                autoplay={false}
                autoHideControls={true}
                borderRadius={20}
                padding={0}
                borderOpacity={0}
                backgroundColor="transparent"
                blurAmount={0}
                style={{ width: '100%', height: '100%' }}
              /> : null}</div>
              <div className="flinza-story-cap">
                <p className="flinza-story-quote flinza-display">“Structured, clear and refreshingly straightforward — our ideas actually became the work.”</p>
                {/* Attributed by role and sector, with no face. The avatars these captions used
                    to carry were the team's own photographs, reused as four different clients. */}
                <div className="flinza-story-who">
                  <span className="flinza-story-name">Founder</span>
                  <span className="flinza-story-role">DTC home &amp; interiors brand</span>
                </div>
                <span className="flinza-story-stat">3.4× return in 90 days</span>
              </div>
            </div>

            {/* Tile 2: Square Video (Row 1, Column 2) */}
            <div style={{ gridColumn: '2 / 3', gridRow: '1 / 2', width: '100%', height: '100%' }}>
              <div className="flinza-mount-gate" style={{ width: '100%', height: '100%' }}>
              {storiesInView ? <TheaterVideoPlayer
                videoUrl="/videos/story2.mp4"
                thumbnail={{ src: '/images/poster_2.webp', alt: 'Campaign story' }}
                aspectRatio="fill"
                loop={true}
                mutedByDefault={true}
                autoplay={false}
                autoHideControls={true}
                borderRadius={20}
                padding={0}
                borderOpacity={0}
                backgroundColor="transparent"
                blurAmount={0}
                style={{ width: '100%', height: '100%' }}
              /> : null}</div>
              <div className="flinza-story-cap">
                <p className="flinza-story-quote flinza-display">“CAC dropped inside the first month and it held through two seasonal spikes.”</p>
                <div className="flinza-story-who">
                  <span className="flinza-story-name">Ecommerce Director</span>
                  <span className="flinza-story-role">DTC supplements brand · 8-figure</span>
                </div>
                <span className="flinza-story-stat">−31% cost per acquisition</span>
              </div>
            </div>

            {/* Tile 3: Square/Action Video (Row 1, Column 3) */}
            <div style={{ gridColumn: '3 / 4', gridRow: '1 / 2', width: '100%', height: '100%' }}>
              <div className="flinza-mount-gate" style={{ width: '100%', height: '100%' }}>
              {storiesInView ? <TheaterVideoPlayer
                videoUrl="/videos/story3.mp4"
                thumbnail={{ src: '/images/poster_3.webp', alt: 'Production story' }}
                aspectRatio="fill"
                loop={true}
                mutedByDefault={true}
                autoplay={false}
                autoHideControls={true}
                borderRadius={20}
                padding={0}
                borderOpacity={0}
                backgroundColor="transparent"
                blurAmount={0}
                style={{ width: '100%', height: '100%' }}
              /> : null}</div>
              <div className="flinza-story-cap">
                <p className="flinza-story-quote flinza-display">“Six weeks of production became forty-eight hours. We test more in a week than we shipped in a quarter.”</p>
                <div className="flinza-story-who">
                  <span className="flinza-story-name">Brand Director</span>
                  <span className="flinza-story-role">DTC fashion brand · $12M/yr</span>
                </div>
                <span className="flinza-story-stat">48-hour production cycles</span>
              </div>
            </div>

            {/* Tile 4: Wide Panoramic Video (Row 2, Spans Columns 2 & 3) */}
            <div style={{ gridColumn: '2 / 4', gridRow: '2 / 3', width: '100%', height: '100%' }}>
              <div className="flinza-mount-gate" style={{ width: '100%', height: '100%' }}>
              {storiesInView ? <TheaterVideoPlayer
                videoUrl="/videos/story4.mp4"
                thumbnail={{ src: '/images/poster_4.webp', alt: 'Scale story' }}
                aspectRatio="fill"
                loop={true}
                mutedByDefault={true}
                autoplay={false}
                autoHideControls={true}
                borderRadius={20}
                padding={0}
                borderOpacity={0}
                backgroundColor="transparent"
                blurAmount={0}
                style={{ width: '100%', height: '100%' }}
              /> : null}</div>
              <div className="flinza-story-cap">
                <p className="flinza-story-quote flinza-display">“We stopped paying per video and waiting on creators. The only bottleneck now is how fast we can test.”</p>
                <div className="flinza-story-who">
                  <span className="flinza-story-name">Head of Growth</span>
                  <span className="flinza-story-role">Multi-brand ecommerce portfolio</span>
                </div>
                <span className="flinza-story-stat">10× more angles tested</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionLabel label="What We Do" />

      {/* Services Section: Exactly 6 Services in 3 by 2 Layout */}
      <section
        id="services"
        ref={servicesMountRef}
        style={{
          width: '100%',
          minHeight: '100vh',
          padding: '140px 24px 180px',
          boxSizing: 'border-box',
          backgroundColor: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Section Header with Elevated Glassmorphic Badge */}
        <div style={{
          textAlign: 'center',
          maxWidth: 860,
          marginBottom: 64,
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 999,
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            border: '1px solid rgba(23, 132, 155, 0.25)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 4px 20px rgba(23, 132, 155, 0.08)',
            marginBottom: 20,
          }}>
            <span style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: '#17849B',
              boxShadow: '0 0 8px #17849B',
            }} />
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#4b5563',
            }}>
              Services • What We Do
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(34px, 5.2vw, 58px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.06,
            margin: '0 0 20px',
          }}>
            <FluidText
              segments={[
                { text: 'Growth,' },
                { text: 'Engineered', className: 'flinza-glass-text' },
                { text: 'for Profit' },
              ]}
            />
          </h2>
          <p style={{
            fontSize: 'clamp(16px, 1.8vw, 19px)',
            color: '#52525b',
            lineHeight: 1.6,
            margin: 0,
            fontWeight: 400,
            maxWidth: 680,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Eight ways we move ecommerce revenue — the revenue-leak audit, Meta ads built around the algorithm, creator-led and founder-led content, launch clipping, conversion video, profit-first optimisation and 48-hour iteration.
          </p>
        </div>

        {/* 3 by 2 Service Matrix (2 Rows of 3 Interactive Expandable Cards) */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
          width: '100%',
          maxWidth: 1200,
        }}>
          {/* The vendored Tabs-card carries the four flagship services; the remaining two
              continue underneath it so no service is dropped by the four-tab shape. */}
          <div id="service-row-1" style={{ width: '100%' }}>
            {servicesInView ? <ServicesShowcase cards={[...row1Cards, ...row2Cards]} /> : null}
          </div>
        </div>
      </section>

      <SectionLabel label="The Results" />

      {/* ════════════════════════════════════════════════════════════
           TESTIMONIALS SECTION — WhatsApp Audio Voice Notes (Real Component)
      ════════════════════════════════════════════════════════════ */}
      <section
        id="testimonials"
        ref={testimonialsMountRef}
        style={{
          width: '100%',
          padding: '120px 24px 110px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: 760, marginBottom: 64 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 999,
            backgroundColor: 'rgba(23, 132, 155, 0.1)',
            border: '1px solid rgba(23, 132, 155, 0.32)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 4px 20px rgba(23, 132, 155, 0.1)',
            marginBottom: 18,
          }}>
            <span style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#17849B',
              boxShadow: '0 0 10px #17849B',
            }} />
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#0F6F86',
            }}>
              Unfiltered Feedback • WhatsApp Voice Notes
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(32px, 4.8vw, 54px)',
            fontWeight: 700,
            letterSpacing: '-0.035em',
            lineHeight: 1.08,
            color: '#09090b',
            margin: '0 0 16px',
            fontFamily: "'Nohemi', sans-serif",
          }}>
            <FluidText text="Straight From WhatsApp. No Filters." />
          </h2>
          <p style={{
            fontSize: 'clamp(16px, 1.8vw, 19px)',
            color: '#52525b',
            lineHeight: 1.6,
            margin: 0,
            fontWeight: 400,
            maxWidth: 640,
            marginLeft: 'auto',
            marginRight: 'auto',
            fontFamily: "'Nohemi', sans-serif",
          }}>
            Real voice memos from founders and growth leads, sent right after we scaled their accounts. Hit play to hear what working with Flinza Works actually sounds like.
          </p>
        </div>

        {/* A second beat between the headline and the media: three hairline-separated facts
            about what the notes actually are. Deliberately no invented statistics — it labels
            the section instead of decorating it, which is what the layout was missing. */}
        <div className="flinza-voices-meta" role="list">
          {[
            ['Unedited', 'Sent as recorded, in one take'],
            ['Owners & growth leads', 'The people who signed off the work'],
            ['Post-result', 'Recorded after the numbers moved'],
          ].map(([title, sub]) => (
            <span key={title} role="listitem">
              <strong className="flinza-display">{title}</strong>
              <em>{sub}</em>
            </span>
          ))}
        </div>

        {/* Founder Stories — the story ring sits directly above the voice notes (item 7).
            The card frame follows each item's own aspect ratio, so 16:9 clips and portrait
            stories both render correctly. */}
        <div
          className="flinza-story-strip"
          style={{ width: '100%', maxWidth: 1360, marginBottom: 46, display: 'flex', justifyContent: 'center' }}
        >
          {testimonialsInView ? (
            <FramerStory
              stories={founderStories}
              aspect="9:16"
              background="transparent"
              nameSeenText="#52525b"
              nameUnseenText="#09090b"
              ringSeen="linear-gradient(135deg,#0A3E4C,#17849B)"
              ringUnseenA="#17849B"
              ringUnseenB="#3FB9CE"
              ringUnseenC="#7FD1DE"
              thumbSize={76}
              thumbGap={20}
              storyCardRadius={22}
              enableAutoplayVideo
              enableKeyboard
              zoomEnabled
              style={{ width: '100%' }}
            />
          ) : null}
        </div>

        {/* 3 WhatsApp Voice Note Cards Grid */}
        <div style={{
          width: '100%',
          maxWidth: 1360,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
          gap: 24,
          boxSizing: 'border-box',
        }}>
          {/* Voice note 1 — an anonymised client, monogram avatar. No invented name, no borrowed
              face, and no portrait that appears beside two different companies. */}
          <div className="flinza-glass-card flinza-voices-card" style={{
            background: 'linear-gradient(150deg, rgba(255,255,255,0.78) 0%, rgba(238,250,245,0.55) 45%, rgba(224,244,235,0.45) 100%)',
            backdropFilter: 'blur(14px) saturate(150%) brightness(1.04)',
            WebkitBackdropFilter: 'blur(14px) saturate(150%) brightness(1.04)',
            borderRadius: 26,
            border: '1px solid rgba(255, 255, 255, 0.6)',
            padding: '26px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            boxShadow: '0 18px 44px -18px rgba(14, 124, 147, 0.16), inset 0 1.5px 2px rgba(255,255,255,0.85)',
            boxSizing: 'border-box',
          }}>
            {/* Header: User Info + Stars */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="flinza-voice-monogram" aria-hidden="true">DH</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 700, fontSize: 16, color: '#09090b' }}>
                      Founder
                    </span>
                    <span style={{ color: '#17849B', fontSize: 13 }} title="Verified client">✓</span>
                  </div>
                  <span style={{ fontSize: 13, color: '#71717a', fontWeight: 500 }}>
                    DTC home &amp; interiors
                  </span>
                </div>
              </div>
              <span style={{ fontSize: 14, color: '#f59e0b', letterSpacing: '0.1em' }}>★★★★★</span>
            </div>

            {/* Real Framer WhatsApp Audio Player */}
            <div className="flinza-voices-player-row" style={{ width: '100%', padding: '12px 10px', borderRadius: 18, background: 'linear-gradient(152deg, rgba(255,255,255,0.74) 0%, rgba(240,250,252,0.44) 100%)', border: '1px solid rgba(255,255,255,0.62)', backdropFilter: 'blur(16px) saturate(155%)', WebkitBackdropFilter: 'blur(16px) saturate(155%)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 12px 30px -18px rgba(14,124,147,0.35)', boxSizing: 'border-box', display: 'flex', justifyContent: 'center' }}>
              <div className="flinza-mount-gate" style={{ width: '100%' }}>
              {testimonialsInView ? <WhatsApAudioPlayer
                audioFile="/audio/testimonial_sarah.wav"
                userName="Founder"
                userImageFile=""
                timestamp="11:42 AM"
                isOwn={false}
                accentColor="#17849B"
              /> : null}</div>
            </div>

            {/* Transcript Snippet */}
            <p className="flinza-voices-quote" style={{
              fontSize: 14.5,
              lineHeight: 1.6,
              color: '#3f3f46',
              margin: '0 0 -8px',
              backgroundColor: 'rgba(23, 132, 155, 0.1)',
              padding: '14px 16px',
              borderRadius: '16px 16px 16px 4px',
              borderLeft: '2.5px solid rgba(23, 132, 155, 0.5)',
            }}>
              “Finally, an agency that moves fast. Weekly optimization calls, real-time Slack access, and they actually challenge our assumptions instead of just executing orders.”
            </p>

            {/* Metric Tag */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 0 }}>
              <span style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#F7FBFC',
                backgroundImage: 'linear-gradient(120deg, #17849B 0%, #3FB9CE 100%)',
                padding: '4px 12px',
                borderRadius: 999,
              }}>
                ⚡ Weekly Optimization Calls
              </span>
              <span style={{ fontSize: 12, color: '#a1a1aa' }}>WhatsApp Voice Note <span style={{ color: '#17849B', fontWeight: 700 }}>✓✓</span></span>
            </div>
          </div>

          {/* Voice note 2 */}
          <div className="flinza-glass-card flinza-voices-card" style={{
            background: 'linear-gradient(150deg, rgba(255,255,255,0.78) 0%, rgba(238,250,245,0.55) 45%, rgba(224,244,235,0.45) 100%)',
            backdropFilter: 'blur(14px) saturate(150%) brightness(1.04)',
            WebkitBackdropFilter: 'blur(14px) saturate(150%) brightness(1.04)',
            borderRadius: 26,
            border: '1px solid rgba(255, 255, 255, 0.6)',
            padding: '26px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            boxShadow: '0 18px 44px -18px rgba(14, 124, 147, 0.16), inset 0 1.5px 2px rgba(255,255,255,0.85)',
            boxSizing: 'border-box',
          }}>
            {/* Header: User Info + Stars */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="flinza-voice-monogram" aria-hidden="true">DA</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 700, fontSize: 16, color: '#09090b' }}>
                      Growth Lead
                    </span>
                    <span style={{ color: '#17849B', fontSize: 13 }} title="Verified client">✓</span>
                  </div>
                  <span style={{ fontSize: 13, color: '#71717a', fontWeight: 500 }}>
                    DTC apparel brand
                  </span>
                </div>
              </div>
              <span style={{ fontSize: 14, color: '#f59e0b', letterSpacing: '0.1em' }}>★★★★★</span>
            </div>

            {/* Real Framer WhatsApp Audio Player */}
            <div className="flinza-voices-player-row" style={{ width: '100%', padding: '12px 10px', borderRadius: 18, background: 'linear-gradient(152deg, rgba(255,255,255,0.74) 0%, rgba(240,250,252,0.44) 100%)', border: '1px solid rgba(255,255,255,0.62)', backdropFilter: 'blur(16px) saturate(155%)', WebkitBackdropFilter: 'blur(16px) saturate(155%)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 12px 30px -18px rgba(14,124,147,0.35)', boxSizing: 'border-box', display: 'flex', justifyContent: 'center' }}>
              <div className="flinza-mount-gate" style={{ width: '100%' }}>
              {testimonialsInView ? <WhatsApAudioPlayer
                audioFile="/audio/testimonial_marcus.wav"
                userName="Growth Lead"
                userImageFile=""
                timestamp="4:18 PM"
                isOwn={false}
                accentColor="#17849B"
              /> : null}</div>
            </div>

            {/* Transcript Snippet */}
            <p className="flinza-voices-quote" style={{
              fontSize: 14.5,
              lineHeight: 1.6,
              color: '#3f3f46',
              margin: '0 0 -8px',
              backgroundColor: 'rgba(23, 132, 155, 0.1)',
              padding: '14px 16px',
              borderRadius: '16px 16px 16px 4px',
              borderLeft: '2.5px solid rgba(23, 132, 155, 0.5)',
            }}>
              “Not order takers. They pushed back on our creative direction, tested their hypothesis, and proved us wrong. Revenue up 89% in 12 weeks.”
            </p>

            {/* Metric Tag */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 0 }}>
              <span style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#F7FBFC',
                backgroundImage: 'linear-gradient(120deg, #17849B 0%, #3FB9CE 100%)',
                padding: '4px 12px',
                borderRadius: 999,
              }}>
                📈 +89% Revenue in 12 Weeks
              </span>
              <span style={{ fontSize: 12, color: '#a1a1aa' }}>WhatsApp Voice Note <span style={{ color: '#17849B', fontWeight: 700 }}>✓✓</span></span>
            </div>
          </div>

          {/* Voice note 3 — the one client we are allowed to name */}
          <div className="flinza-glass-card flinza-voices-card" style={{
            background: 'linear-gradient(150deg, rgba(255,255,255,0.78) 0%, rgba(238,250,245,0.55) 45%, rgba(224,244,235,0.45) 100%)',
            backdropFilter: 'blur(14px) saturate(150%) brightness(1.04)',
            WebkitBackdropFilter: 'blur(14px) saturate(150%) brightness(1.04)',
            borderRadius: 26,
            border: '1px solid rgba(255, 255, 255, 0.6)',
            padding: '26px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            boxShadow: '0 18px 44px -18px rgba(14, 124, 147, 0.16), inset 0 1.5px 2px rgba(255,255,255,0.85)',
            boxSizing: 'border-box',
          }}>
            {/* Header: User Info + Stars */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="flinza-voice-monogram" aria-hidden="true">SR</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 700, fontSize: 16, color: '#09090b' }}>
                      Founder
                    </span>
                    <span style={{ color: '#17849B', fontSize: 13 }} title="Verified client">✓</span>
                  </div>
                  <span style={{ fontSize: 13, color: '#71717a', fontWeight: 500 }}>
                    StillRing · Supplements
                  </span>
                </div>
              </div>
              <span style={{ fontSize: 14, color: '#f59e0b', letterSpacing: '0.1em' }}>★★★★★</span>
            </div>

            {/* Real Framer WhatsApp Audio Player */}
            <div className="flinza-voices-player-row" style={{ width: '100%', padding: '12px 10px', borderRadius: 18, background: 'linear-gradient(152deg, rgba(255,255,255,0.74) 0%, rgba(240,250,252,0.44) 100%)', border: '1px solid rgba(255,255,255,0.62)', backdropFilter: 'blur(16px) saturate(155%)', WebkitBackdropFilter: 'blur(16px) saturate(155%)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 12px 30px -18px rgba(14,124,147,0.35)', boxSizing: 'border-box', display: 'flex', justifyContent: 'center' }}>
              <div className="flinza-mount-gate" style={{ width: '100%' }}>
              {testimonialsInView ? <WhatsApAudioPlayer
                audioFile="/audio/testimonial_elena.wav"
                userName="StillRing"
                userImageFile=""
                timestamp="Yesterday"
                isOwn={false}
                accentColor="#17849B"
              /> : null}</div>
            </div>

            {/* Transcript Snippet */}
            <p className="flinza-voices-quote" style={{
              fontSize: 14.5,
              lineHeight: 1.6,
              color: '#3f3f46',
              margin: '0 0 -8px',
              backgroundColor: 'rgba(23, 132, 155, 0.1)',
              padding: '14px 16px',
              borderRadius: '16px 16px 16px 4px',
              borderLeft: '2.5px solid rgba(23, 132, 155, 0.5)',
            }}>
              “We burned $40K on pretty ads that didn't convert. These guys tested 30 angles in two weeks and found our winner. ROAS went from 1.8x to 4.2x.”
            </p>

            {/* Metric Tag */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 0 }}>
              <span style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#F7FBFC',
                backgroundImage: 'linear-gradient(120deg, #17849B 0%, #3FB9CE 100%)',
                padding: '4px 12px',
                borderRadius: 999,
              }}>
                🚀 ROAS 1.8x → 4.2x
              </span>
              <span style={{ fontSize: 12, color: '#a1a1aa' }}>WhatsApp Voice Note <span style={{ color: '#17849B', fontWeight: 700 }}>✓✓</span></span>
            </div>
          </div>
        </div>
      </section>

      <SectionLabel label="Good Questions" />

      {/* ════════════════════════════════════════════════════════════
           FAQ SECTION — ExpandOnHoverList × 4 (10 Questions)
      ════════════════════════════════════════════════════════════ */}
      <section
        id="faq"
        ref={faqMountRef}
        style={{
          width: '100%',
          padding: '120px 24px 100px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Section Badge + Header */}
        <div style={{ textAlign: 'center', maxWidth: 720, marginBottom: 64 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 18px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.72)',
            border: '1px solid rgba(23,132,155,0.22)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            boxShadow: '0 4px 20px rgba(23,132,155,0.08)',
            marginBottom: 20,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#17849B', boxShadow: '0 0 8px #17849B' }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4b5563' }}>
              FAQ • Everything You Need to Know
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 4.8vw, 54px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.08,
            color: '#09090b',
            margin: '0 0 18px',
          }}>
            <FluidText
              segments={[
                { text: 'Your Questions,' },
                { text: 'Answered', className: 'flinza-glass-text' },
              ]}
            />
          </h2>
          <p style={{ fontSize: 'clamp(16px,1.8vw,19px)', color: '#52525b', lineHeight: 1.6, margin: 0 }}>
            Everything you need to know about working with Flinza, our process, pricing, and what makes us different.
          </p>
        </div>

        {/* ExpandOnHoverList blocks — 3 items each, covering 10 questions */}
        <div className="flinza-faq" style={{ width: '100%', maxWidth: 900, display: 'flex', flexDirection: 'column', gap: 0 }}>

          {/* Rendered unconditionally. The section used to defer mounting until it scrolled into
              view, and when that gate failed to fire the entire FAQ rendered as an empty box —
              which is what "the FAQ is blank / loads slowly" was. Twelve rows of text cost
              nothing to mount, so there is no reason to gamble on a gate here. */}
          <FaqList items={faqItems} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
           CONTACT BUTTON — Centered, floats above footer
      ════════════════════════════════════════════════════════════ */}
      <section
        style={{
          width: '100%',
          padding: '60px 24px 80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 30,
        }}
      >
        <p style={{
          fontSize: 'clamp(13px,1.4vw,15px)',
          color: '#71717a',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontWeight: 600,
          marginBottom: 24,
        }}>
          <FluidText as="span" text="Ready to scale something profitable?" stagger={34} />
        </p>
        <ContactButton
          buttonTextDefault="Get In Touch"
          buttonHoverTextHover="Let's Build"
          cardName="Flinza Works"
          cardTitleText="Ecommerce Growth Agency"
          cardEmail="hello@flinzaworks.com"
          cardEmailSize={28}
          cardNameColor="rgb(9,9,11)"
          cardTitleColor="rgba(9,9,11,0.6)"
          cardEmailColor="rgb(9,9,11)"
          cardEmailLabelColor="rgba(9,9,11,0.42)"
          cardBGColor="rgba(255,255,255,0.16)"
          cardBGBlurDefault={26}
          cardBorder={{ borderColor: 'rgba(255,255,255,0.55)', borderStyle: 'solid', borderWidth: 1 }}
          buttonBGColorDefault="rgb(255,255,255)"
          buttonColorDefault="rgb(9,9,11)"
          buttonHoverBGColorHover="rgb(224,242,246)"
          buttonHoverColorHover="rgb(9,9,11)"
          iconDefaultIconColor="rgb(9,9,11)"
          iconHoverIconColor="rgb(14,124,147)"
          buttonHoverBorder={{ borderColor: 'rgb(23,132,155)', borderStyle: 'solid', borderWidth: 1 }}
        />
      </section>

      {/* ════════════════════════════════════════════════════════════
           FOOTER — the shared SiteFooter on every route, over the DiaFooter glow
      ════════════════════════════════════════════════════════════ */}
      {/* One footer, on every route.
          This is the same <SiteFooter /> that /about, /services, /work, /insights, /careers and the
          legal pages already end with. The home page used to carry a slimmer two-row footer of its
          own, which is exactly why the footer "looked different on different pages": the brand
          column, the service columns, the typographic close and the legal line are now the same
          wherever anyone lands.

          Two things it keeps from the old one:
            · the `id="contact"` anchor, which the page's own table of contents links to;
            · the DiaFooter glow, because the rise from the bottom edge is part of the home page's
              identity. It is a layer INSIDE the footer rather than a band after it, so the glow
              reads behind the footer instead of leaving a dead strip at the end of the page.

          SiteFooter also flags the footer as on screen (`body.flinza-foot-inview`), and that is
          what fades the fixed left rails out before they can print over the wordmark — the
          overlap this page's own footer never reported, because it had no observer at all. */}
      <div id="contact" ref={footerMountRef} className="flinza-home-foot">
        <div className="flinza-footer-glow" aria-hidden="true">
          <div className="flinza-mount-gate" style={{ width: '100%', height: '100%' }}>
            {footerInView ? <DiaFooter
              preset="Custom"
              mode="Bars"
              bars={11}
              overlap={26}
              peak={0.96}
              valley={0.42}
              blur={22}
              intensity={105}
              opacity={0.95}
              colors={['#EAF7F9', '#9ADCE8', '#56C1D3', '#2E93AC', '#17849B', '#0A3E4C']}
              reveal="scroll"
              ariaLabel="Flinza gradient glow"
              style={{ width: '100%', height: '100%' }}
            /> : null}
          </div>
        </div>

        <div className="flinza-home-foot-inner">
          <SiteFooter />
        </div>
      </div>
    </main>
  );
}
