'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import FluidText from '@/components/FluidText';
import { withCaseStudyTestimonial } from '@/data/testimonials';

const BrandLoader = dynamic(
  () => import('@/components/BrandLoader'),
  {
    ssr: false,
    loading: () => null,
  }
);

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

const CamoLiquidButton = dynamic(
  () => import('@/components/CamoLiquidButton'),
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

/* ── Section connector thread ──
   Replaces the old hand-drawn "doodle" overlays. Those were absolutely positioned at
   z-index 15 (so they could cross straight over video tiles), only rendered above 1280px,
   and animated on fixed time delays. A thread is a normal in-flow band: it reserves its own
   height so it can never overlap a video, keeps its stroke weight via non-scaling-stroke,
   scales with the viewport on every device, and draws itself only once it scrolls into view. */
const THREAD_CURVES = [
  { path: 'M 14 92 C 190 92, 300 26, 520 32 C 740 38, 860 96, 1180 68', tip: 'M 1150 50 L 1183 67 L 1148 86' },
  { path: 'M 14 34 C 220 34, 330 92, 560 84 C 800 76, 900 26, 1180 46', tip: 'M 1152 26 L 1183 45 L 1150 64' },
  { path: 'M 14 70 C 200 70, 320 20, 540 40 C 780 62, 900 104, 1180 58', tip: 'M 1150 46 L 1183 63 L 1148 82' },
];

function SectionThread({ label, variant = 0, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver !== 'function') {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const curve = THREAD_CURVES[variant % THREAD_CURVES.length];

  return (
    <div
      ref={ref}
      className={`flinza-thread${visible ? ' is-visible' : ''}`}
      style={{ '--draw-delay': `${delay}s` }}
      aria-hidden="true"
    >
      {label ? <span className="flinza-thread-label">{label}</span> : null}
      <svg viewBox="0 0 1200 120" preserveAspectRatio="xMidYMid meet" role="presentation">
        <path
          d={curve.path}
          stroke="#17849B"
          strokeOpacity="0.5"
          strokeWidth="1.6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={curve.tip}
          stroke="#17849B"
          strokeOpacity="0.5"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

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

// Founder stories shown above the voice notes (item 7). Each item can declare its own
// aspect, so a portrait story and a 16:9 clip can sit in the same strip.
const founderStories = [
  {
    id: 'sarah',
    title: 'Sarah M.',
    time: '2h',
    image: { src: '/images/avatar_sarah.jpg', alt: 'Sarah Mitchell' },
    items: [
      { kind: 'image', image: { src: '/images/story_portrait.jpg', alt: 'Founder portrait' }, durationMs: 4600, aspect: '9:16', caption: 'Day 40 in the account.' },
      { kind: 'video', videoFile: '/videos/story1.mp4', aspect: '16:9', caption: 'Creative we shipped this week.' },
    ],
  },
  {
    id: 'marcus',
    title: 'Marcus B.',
    time: '5h',
    image: { src: '/images/avatar_marcus.png', alt: 'Marcus Bell' },
    items: [
      { kind: 'image', image: { src: '/images/story_traffic.jpg', alt: 'Traffic dashboard' }, durationMs: 4600, aspect: '9:16' },
      { kind: 'video', videoFile: '/videos/story2.mp4', aspect: '16:9' },
    ],
    ctaLabel: 'See the audit',
    ctaLink: '/contact',
  },
  {
    id: 'charlie',
    title: 'Charlie N.',
    time: '1d',
    image: { src: '/images/avatar_charlie.png', alt: 'Charlie Nguyen' },
    items: [
      { kind: 'image', image: { src: '/images/story_action.jpg', alt: 'Production still' }, durationMs: 4600, aspect: '9:16' },
      { kind: 'video', videoFile: '/videos/story3.mp4', aspect: '16:9' },
    ],
  },
];

const StoryFlowDoodles = dynamic(
  () => import('@/components/StoryFlowDoodles'),
  {
    ssr: false,
    loading: () => null,
  }
);

const SocialGlassRow = dynamic(
  () => import('@/components/SocialGlassRow'),
  {
    ssr: false,
    loading: () => null,
  }
);

const ServicesTabs = dynamic(
  () => import('@/components/ServicesTabs'),
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


const ExpandOnHoverList = dynamic(
  () => import('@/components/ExpandOnHoverList'),
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

// One-time reveal: returns a ref + whether the element has entered the
// viewport. Fires exactly once — scrolling back up never re-hides content.
function useReveal() {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined' ||
        (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      setRevealed(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, revealed];
}

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

export default function Page() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loaderRemoved, setLoaderRemoved] = useState(false);
  const [loaderExited, setLoaderExited] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [camoDismissed, setCamoDismissed] = useState(false);
  // The fixed side rail must disappear over the FAQ/footer/contact region, where it collided with copy
  const [tocHidden, setTocHidden] = useState(false);
  const [focusedCaseStudy, setFocusedCaseStudy] = useState(false);

  // Section reveal + lazy-mount hooks
  const [storiesRef, storiesRevealed] = useReveal();
  const [servicesRef, servicesRevealed] = useReveal();
  const [testimonialsRef, testimonialsRevealed] = useReveal();
  const [faqRef, faqRevealed] = useReveal();
  const [contactRef, contactRevealed] = useReveal();
  const [footerRef, footerRevealed] = useReveal();

  const [storiesMountRef, storiesInView] = useInView();
  const [servicesMountRef, servicesInView] = useInView();
  const [testimonialsMountRef, testimonialsInView] = useInView();
  const [faqMountRef, faqInView] = useInView();
  const [footerMountRef, footerInView] = useInView();

  // Combine each section's reveal styling with its lazy-mount anchor.
  const sectionRef = (mountRef, revealRef) => (el) => {
    mountRef.current = el;
    revealRef.current = el;
  };

  const carouselProjects = [
    {
      brand: 'StillRing · Supplements',
      description: 'Revenue-leak audit → +$412K recovered',
      image: { src: 'https://framerusercontent.com/images/gO7oqH62CdjjxnyUBSU5GJTvFnk.jpg?scale-down-to=1200' },
      caseStudy: {
        tag: '01 // REVENUE AUDIT',
        title: 'Funnel & Attribution Audit',
        whatWeDid: 'Audited funnel, creative, and attribution for a DTC supplement brand plateaued at $4M with climbing CAC, surfacing the bottlenecks bleeding cash.',
        deliverables: ['Funnel conversion analysis', 'Creative performance audit', 'Attribution model review'],
        stack: ['GA4', 'Triple Whale', 'Meta Ads', 'Northbeam'],
        results: {
          primary: '+$412K', primaryLabel: 'Recovered Annual Revenue',
          metricA: '5', metricALabel: 'Leaks Found', metricB: '2.1x', metricBLabel: 'AOV Lift',
          efficiency: 88, sparkline: 'M0,45 C30,40 60,20 90,25 C120,30 150,10 180,14 C210,18 235,4 260,3',
        },
      },
    },
    {
      brand: 'Fashion Ecom · $12M/yr',
      description: '48hr concept-to-cut product video',
      image: { src: 'https://framerusercontent.com/images/K4sA5mbjMww6nIFRSGkWZeB2OI.jpg?scale-down-to=1200' },
      caseStudy: {
        tag: '02 // CREATIVE',
        title: 'Scroll-Stopping Product Video',
        whatWeDid: 'Shot, edited, and multi-angle tested product video for a fashion brand whose 6-week production cycles were killing agility.',
        deliverables: ['AI-enhanced product videos', 'Multi-angle testing', 'Optimized for Meta / TikTok'],
        stack: ['Premiere Pro', 'Runway', 'Meta Ads', 'TikTok'],
        results: {
          primary: '48hr', primaryLabel: 'Concept-to-Cut Turnaround',
          metricA: '30', metricALabel: 'Angles Tested', metricB: '3.4x', metricBLabel: 'CTR Lift',
          efficiency: 92, sparkline: 'M0,48 C25,42 55,25 85,28 C115,31 145,12 175,15 C205,18 235,5 260,2',
        },
      },
    },
    {
      brand: 'DTC Beauty',
      description: 'AI avatar UGC at $50 per video',
      image: { src: 'https://framerusercontent.com/images/NtPZeRtjx0XeN3bHzsMaygic3Hs.jpg?scale-down-to=1200' },
      caseStudy: {
        tag: '03 // AI UGC',
        title: 'AI Avatar UGC System',
        whatWeDid: 'Trained custom AI avatars to produce unlimited user-generated content, removing creator bottlenecks and $300-per-video fees.',
        deliverables: ['Custom AI avatar training', 'Unlimited variant production', 'Systematic angle testing'],
        stack: ['AI Avatars', 'UGC Pipeline', 'Meta Ads', 'TikTok'],
        results: {
          primary: '$50', primaryLabel: 'Cost Per Video vs $300+',
          metricA: '10x', metricALabel: 'More Angles Tested', metricB: '0', metricBLabel: 'Creator Bottlenecks',
          efficiency: 95, sparkline: 'M0,44 C35,44 65,30 95,32 C125,34 155,14 185,16 C215,18 235,6 260,3',
        },
      },
    },
    {
      brand: 'StillRing · Paid Media',
      description: 'ROAS 1.8x → 4.2x in two weeks',
      image: { src: 'https://framerusercontent.com/images/hIyXekP7SHBtRkcBBA8LoqjrdY.png?scale-down-to=1200' },
      caseStudy: {
        tag: '04 // PAID MEDIA',
        title: 'Profit-First Meta & TikTok',
        whatWeDid: 'Rebuilt Meta and TikTok campaigns around profit, not vanity metrics — testing 30 angles in two weeks to find the winner.',
        deliverables: ['Profit-first optimization', 'Weekly creative testing', 'Real-time Slack access'],
        stack: ['Meta Ads', 'TikTok Ads', 'Triple Whale', 'Slack'],
        results: {
          primary: '4.2x', primaryLabel: 'Blended ROAS (from 1.8x)',
          metricA: '+89%', metricALabel: 'Revenue in 12 Weeks', metricB: '-31%', metricBLabel: 'Lower CAC',
          efficiency: 90, sparkline: 'M0,42 C30,40 60,22 90,26 C120,30 150,10 180,14 C210,17 235,4 260,3',
        },
      },
    },
    {
      brand: 'Jewellery Brand',
      description: 'High ROAS, low profit → fixed',
      image: { src: 'https://framerusercontent.com/images/LOUHKfxecdzS4oSB9PSeYz21fk.png?scale-down-to=1200' },
      caseStudy: {
        tag: '05 // OPTIMIZATION',
        title: 'Profit Contribution Modeling',
        whatWeDid: 'Shifted a jewellery brand from ROAS optimization to profit-contribution modeling after discovering high ROAS was masking cash burn.',
        deliverables: ['Profit margin optimization', 'Contribution modeling', 'Wasted-spend elimination'],
        stack: ['Northbeam', 'GA4', 'Meta Ads', 'Sheets'],
        results: {
          primary: '+22pts', primaryLabel: 'Contribution Margin',
          metricA: '-38%', metricALabel: 'Wasted Spend Cut', metricB: '2.6x', metricBLabel: 'Profit Multiple',
          efficiency: 93, sparkline: 'M0,40 C30,35 60,15 90,20 C120,25 150,6 180,8 C210,12 235,2 260,1',
        },
      },
    },
    {
      brand: 'Flinza Testing Engine',
      description: '48-hour cycles, 34% avg ROAS lift',
      image: { src: 'https://framerusercontent.com/images/MClVeYvMtXA3CRA1iECQ1CPv5c.png?scale-down-to=1200' },
      caseStudy: {
        tag: '06 // ITERATION',
        title: '48-Hour Testing Engine',
        whatWeDid: 'Run systematic A/B testing on 48-hour cycles across every account, killing losers fast and scaling winners faster.',
        deliverables: ['Rapid iteration framework', 'Weekly optimization calls', 'Transparent dashboards'],
        stack: ['Meta Ads', 'TikTok Ads', 'A/B Framework', 'Looker'],
        results: {
          primary: '48hr', primaryLabel: 'Testing Cycles',
          metricA: '34%', metricALabel: 'Avg ROAS Lift', metricB: '120+', metricBLabel: 'Variants / Quarter',
          efficiency: 96, sparkline: 'M0,45 C30,40 60,20 90,25 C120,30 150,10 180,14 C210,18 235,4 260,3',
        },
      },
    },
    {
      brand: 'Embedded Growth Pod',
      description: 'Strategist in your Slack, weekly calls',
      image: { src: 'https://framerusercontent.com/images/yldP1mipOxNl4NvNqiDxzXJC4bc.png?scale-down-to=1200' },
      caseStudy: {
        tag: '07 // OPERATIONS',
        title: 'Embedded Growth Pod',
        whatWeDid: 'Embed a strategist directly in your Slack with weekly optimization calls — challenging assumptions instead of taking orders.',
        deliverables: ['Real-time Slack access', 'Weekly optimization calls', 'Assumption-challenging strategy'],
        stack: ['Slack', 'Notion', 'Loom', 'Looker'],
        results: {
          primary: '24/7', primaryLabel: 'Real-Time Slack Access',
          metricA: 'Weekly', metricALabel: 'Optimization Calls', metricB: '0', metricBLabel: 'Order-Taker Meetings',
          efficiency: 97, sparkline: 'M0,48 C25,42 55,25 85,28 C115,31 145,12 175,15 C205,18 235,5 260,2',
        },
      },
    },
    {
      brand: 'Flinza Works · Agency',
      description: '$500K+ monthly spend managed',
      image: { src: 'https://framerusercontent.com/images/KJSVx7BZQys31ERwSHo7766lQg.png?scale-down-to=1200' },
      caseStudy: {
        tag: '08 // SCALE',
        title: '$500K+ Spend Managed',
        whatWeDid: 'Manage over half a million dollars in monthly ad spend across ecommerce brands, optimized for profit margin at volume.',
        deliverables: ['Multi-brand account management', 'Profit-first budget allocation', 'Volume creative execution'],
        stack: ['Meta Ads', 'TikTok Ads', 'Google Ads', 'Triple Whale'],
        results: {
          primary: '$500K+', primaryLabel: 'Monthly Spend Managed',
          metricA: '9', metricALabel: 'Brands Scaled', metricB: '3.1x', metricBLabel: 'Avg Revenue Multiple',
          efficiency: 94, sparkline: 'M0,44 C35,44 65,30 95,32 C125,34 155,14 185,16 C215,18 235,6 260,3',
        },
      },
    },
  ];

  // Track scroll position for TOC visibility and quick button hide/restore
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const past = y > window.innerHeight * 0.35;
      setScrolledPastHero((prev) => (prev === past ? prev : past));
      const camo = y > 40;
      setCamoDismissed((prev) => (prev === camo ? prev : camo));
      const nearEnd = y + window.innerHeight > document.documentElement.scrollHeight - window.innerHeight * 1.15;
      setTocHidden((prev) => (prev === nearEnd ? prev : nearEnd));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Exactly 6 Services arranged in 3 by 2 layout (2 rows of 3 cards)
  const row1Cards = [
    {
      tag: '01 • AUDIT',
      title: 'Find Your Revenue Leaks',
      description: 'We audit your funnel, creative, and attribution to find the 3–5 bottlenecks bleeding cash. Most brands have fixable problems worth six figures sitting in plain sight.',
      image: { src: 'https://framerusercontent.com/images/hIyXekP7SHBtRkcBBA8LoqjrdY.png' },
    },
    {
      tag: '02 • CREATIVE',
      title: 'Launch Videos That Convert',
      description: 'Product videos engineered for scroll-stopping impact. We shoot, edit, and test multiple angles to find what makes browsers buy — 48-hour turnaround.',
      image: { src: 'https://framerusercontent.com/images/xWq5qlnMo4nwNQlhbzFUKWqikwQ.jpg' },
    },
    {
      tag: '03 • AI UGC',
      title: 'AI UGC Without Creators',
      description: 'Custom AI avatars produce unlimited user-generated content. Test 10x more angles without creator bottlenecks, missed deadlines, or $300-per-video fees.',
      image: { src: 'https://framerusercontent.com/images/N6nWcGmKkdYDhvYS1RN1VoX05k.jpg' },
    },
  ];

  const row2Cards = [
    {
      tag: '04 • PAID MEDIA',
      title: 'Ads Built to Scale Revenue',
      description: 'Meta and TikTok campaigns optimized for profit, not vanity metrics. Weekly testing, real-time dashboards, and a strategist embedded in your Slack.',
      image: { src: 'https://framerusercontent.com/images/gO7oqH62CdjjxnyUBSU5GJTvFnk.jpg' },
    },
    {
      tag: '05 • OPTIMIZATION',
      title: 'Profit-First Optimization',
      description: 'We shift from ROAS to profit-contribution modeling — killing losers fast and scaling winners faster so every ad dollar works harder.',
      image: { src: 'https://framerusercontent.com/images/yldP1mipOxNl4NvNqiDxzXJC4bc.png' },
    },
    {
      tag: '06 • ITERATION',
      title: 'Rapid Iteration at Volume',
      description: 'Systematic A/B testing on 48-hour cycles keeps your creative pipeline fresh and your account learning, never plateauing.',
      image: { src: 'https://framerusercontent.com/images/LOUHKfxecdzS4oSB9PSeYz21fk.png' },
    },
  ];

  // Preload carousel imagery so the hero never reveals blank panels.
  useEffect(() => {
    let cancelled = false;
    const urls = carouselProjects.map((p) => p.image?.src).filter(Boolean);
    let pending = urls.length;
    if (pending === 0) { setAssetsReady(true); return; }
    const done = () => { if (cancelled) return; pending -= 1; if (pending <= 0) setAssetsReady(true); };
    urls.forEach((src) => { const img = new Image(); img.onload = done; img.onerror = done; img.src = src; });
    const safety = setTimeout(() => { if (!cancelled) setAssetsReady(true); }, 3500);
    return () => { cancelled = true; clearTimeout(safety); };
  }, []);

  // Reveal the site only once the loader has exited AND carousel images are ready.
  useEffect(() => {
    if (loaderExited && assetsReady) setIsLoaded(true);
  }, [loaderExited, assetsReady]);

  return (
    <main style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#fbfcfd',
      color: '#09090b',
      position: 'relative',
      margin: 0,
      padding: 0,
      overflowX: 'hidden',
      fontFamily: "'Nohemi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }}>
      {/* Preloader Animation Overlay (smooth film dissolve transition into hero) */}
      {!loaderRemoved && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            pointerEvents: isLoaded ? 'none' : 'auto',
            opacity: isLoaded ? 0 : 1,
            transform: isLoaded ? 'scale(1.025)' : 'scale(1)',
            transition: 'opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'opacity, transform',
          }}
        >
          <BrandLoader
            brandName="FLINZA"
            note="Growth systems for ecommerce"
            onStartExit={() => setLoaderExited(true)}
            onComplete={() => setLoaderRemoved(true)}
          />
        </div>
      )}

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
        pointerEvents: (isLoaded && !scrolledPastHero) ? 'auto' : 'none',
        opacity: (isLoaded && !scrolledPastHero) ? 1 : 0,
        transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <a
          href="#hero"
          aria-label="Home"
          className="flinza-logo-btn"
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

      {/* Hero Section */}
      <section
        id="hero"
        className="flinza-hero"
        style={{
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'transparent',
          zIndex: 1,
        }}
      >
        {/* Pre-warmed WebGL carousel that starts animation the moment loader reaches 100% */}
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

        {/* Visually-hidden h1 for SEO (hero is intentionally text-free) */}
        <h1 style={{
          position: 'absolute',
          width: 1,
          height: 1,
          margin: -1,
          padding: 0,
          overflow: 'hidden',
          clip: 'rect(0 0 0 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}>
          Flinza Works — We Test. We Scale. We Grow.
        </h1>

        {/* Bottom CTA row — single brand-recolored CamoLiquidButton */}
        <div
          className="flinza-hero-cta"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 18,
            flexWrap: 'wrap',
            pointerEvents: 'none',
            opacity: (focusedCaseStudy || camoDismissed || scrolledPastHero || !isLoaded) ? 0 : 1,
            transition: 'opacity 0.35s ease',
          }}
        >
          <div
            style={{
              transform: 'scale(0.58)',
              transformOrigin: 'center center',
              filter: 'drop-shadow(0 14px 32px rgba(14, 124, 147, 0.3))',
              pointerEvents: (focusedCaseStudy || camoDismissed || scrolledPastHero || !isLoaded) ? 'none' : 'auto',
            }}
          >
            <CamoLiquidButton
              label="Explore Stories ↓"
              link="#stories"
              showDots={false}
              dotsAnimate={false}
              textColor="rgb(255,255,255)"
              camoDark="rgb(10,62,76)"
              camoMid="rgb(23,132,155)"
              camoLight="rgb(46,147,172)"
              borderGlowA="rgb(127,209,222)"
              borderGlowB="rgb(46,147,172)"
            />
          </div>
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
          link2="#stories"
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
        ref={sectionRef(storiesMountRef, storiesRef)}
        className={`${storiesRevealed ? 'reveal-in' : 'reveal-init'}`}
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
            Real campaigns across creative, UGC, and paid media — watch how we test, learn, and scale ecommerce brands.
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
                              {/* Curved-arrow doodles (item 4) — reserved band above the mosaic, so they can
              never sit on top of a video. */}
          <StoryFlowDoodles />

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
                thumbnail={{ src: '/images/story_portrait.jpg', alt: 'Founder Portrait' }}
                aspectRatio="fill"
                loop={true}
                mutedByDefault={true}
                autoplay={false}
                autoHideControls={true}
                borderRadius={20}
                padding={8}
                borderOpacity={0.25}
                backgroundColor="rgba(20, 22, 28, 0.55)"
                blurAmount={20}
                style={{ width: '100%', height: '100%' }}
              /> : null}</div>
            </div>

            {/* Tile 2: Square Video (Row 1, Column 2) */}
            <div style={{ gridColumn: '2 / 3', gridRow: '1 / 2', width: '100%', height: '100%' }}>
              <div className="flinza-mount-gate" style={{ width: '100%', height: '100%' }}>
              {storiesInView ? <TheaterVideoPlayer
                videoUrl="/videos/story2.mp4"
                thumbnail={{ src: '/images/story_traffic.jpg', alt: 'Urban Motion' }}
                aspectRatio="fill"
                loop={true}
                mutedByDefault={true}
                autoplay={false}
                autoHideControls={true}
                borderRadius={20}
                padding={8}
                borderOpacity={0.25}
                backgroundColor="rgba(20, 22, 28, 0.55)"
                blurAmount={20}
                style={{ width: '100%', height: '100%' }}
              /> : null}</div>
            </div>

            {/* Tile 3: Square/Action Video (Row 1, Column 3) */}
            <div style={{ gridColumn: '3 / 4', gridRow: '1 / 2', width: '100%', height: '100%' }}>
              <div className="flinza-mount-gate" style={{ width: '100%', height: '100%' }}>
              {storiesInView ? <TheaterVideoPlayer
                videoUrl="/videos/story3.mp4"
                thumbnail={{ src: '/images/story_action.jpg', alt: 'Dynamic Energy' }}
                aspectRatio="fill"
                loop={true}
                mutedByDefault={true}
                autoplay={false}
                autoHideControls={true}
                borderRadius={20}
                padding={8}
                borderOpacity={0.25}
                backgroundColor="rgba(20, 22, 28, 0.55)"
                blurAmount={20}
                style={{ width: '100%', height: '100%' }}
              /> : null}</div>
            </div>

            {/* Tile 4: Wide Panoramic Video (Row 2, Spans Columns 2 & 3) */}
            <div style={{ gridColumn: '2 / 4', gridRow: '2 / 3', width: '100%', height: '100%' }}>
              <div className="flinza-mount-gate" style={{ width: '100%', height: '100%' }}>
              {storiesInView ? <TheaterVideoPlayer
                videoUrl="/videos/story4.mp4"
                thumbnail={{ src: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop', alt: 'Speed Transit' }}
                aspectRatio="fill"
                loop={true}
                mutedByDefault={true}
                autoplay={false}
                autoHideControls={true}
                borderRadius={20}
                padding={8}
                borderOpacity={0.25}
                backgroundColor="rgba(20, 22, 28, 0.55)"
                blurAmount={20}
                style={{ width: '100%', height: '100%' }}
              /> : null}</div>
            </div>
          </div>
        </div>
      </section>

      <SectionThread label="What We Do" variant={0} />

      {/* Services Section: Exactly 6 Services in 3 by 2 Layout */}
      <section
        id="services"
        ref={sectionRef(servicesMountRef, servicesRef)}
        className={`${servicesRevealed ? 'reveal-in' : 'reveal-init'}`}
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
            Six ways we move ecommerce revenue — from revenue-leak audits and conversion video to AI UGC and profit-first paid media.
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
            {servicesInView ? <ServicesTabs cards={[...row1Cards, ...row2Cards]} /> : null}
          </div>
        </div>
      </section>

      <SectionThread label="The Results" variant={1} delay={0.1} />

      {/* ════════════════════════════════════════════════════════════
           TESTIMONIALS SECTION — WhatsApp Audio Voice Notes (Real Component)
      ════════════════════════════════════════════════════════════ */}
      <section
        id="testimonials"
        ref={sectionRef(testimonialsMountRef, testimonialsRef)}
        className={`${testimonialsRevealed ? 'reveal-in' : 'reveal-init'}`}
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
            backgroundColor: 'rgba(37, 211, 102, 0.08)',
            border: '1px solid rgba(37, 211, 102, 0.3)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 4px 20px rgba(37, 211, 102, 0.08)',
            marginBottom: 18,
          }}>
            <span style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#25D366',
              boxShadow: '0 0 10px #25D366',
            }} />
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#0d6832',
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
          {/* Card 1: Sarah Jenkins */}
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
                <img
                  src="/images/avatar_sarah.jpg"
                  alt="Sarah Mitchell"
                  style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 700, fontSize: 16, color: '#09090b' }}>
                      Sarah Mitchell
                    </span>
                    <span style={{ color: '#25D366', fontSize: 13 }} title="Verified Client">✓</span>
                  </div>
                  <span style={{ fontSize: 13, color: '#71717a', fontWeight: 500 }}>
                    CMO @ [NDA]
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
                userName="Sarah Mitchell"
                userImageFile="/images/avatar_sarah.jpg"
                timestamp="11:42 AM"
                isOwn={false}
                accentColor="#25D366"
              /> : null}</div>
            </div>

            {/* Transcript Snippet */}
            <p className="flinza-voices-quote" style={{
              fontSize: 14.5,
              lineHeight: 1.6,
              color: '#3f3f46',
              margin: '0 0 -8px',
              backgroundColor: 'rgba(37, 211, 102, 0.09)',
              padding: '14px 16px',
              borderRadius: '16px 16px 16px 4px',
              borderLeft: '2.5px solid rgba(37, 211, 102, 0.55)',
            }}>
              “Finally, an agency that moves fast. Weekly optimization calls, real-time Slack access, and they actually challenge our assumptions instead of just executing orders.”
            </p>

            {/* Metric Tag */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 0 }}>
              <span style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#0d6832',
                backgroundColor: 'rgba(37, 211, 102, 0.12)',
                padding: '4px 12px',
                borderRadius: 999,
              }}>
                ⚡ Weekly Optimization Calls
              </span>
              <span style={{ fontSize: 12, color: '#a1a1aa' }}>WhatsApp Voice Note <span style={{ color: '#53BDEB', fontWeight: 700 }}>✓✓</span></span>
            </div>
          </div>

          {/* Card 2: Marcus Brody */}
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
                <img
                  src="/images/avatar_marcus.png"
                  alt="Marcus Rodriguez"
                  style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 700, fontSize: 16, color: '#09090b' }}>
                      Marcus Rodriguez
                    </span>
                    <span style={{ color: '#25D366', fontSize: 13 }} title="Verified Client">✓</span>
                  </div>
                  <span style={{ fontSize: 13, color: '#71717a', fontWeight: 500 }}>
                    Growth Lead @ [NDA]
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
                userName="Marcus Rodriguez"
                userImageFile="/images/avatar_marcus.png"
                timestamp="4:18 PM"
                isOwn={false}
                accentColor="#25D366"
              /> : null}</div>
            </div>

            {/* Transcript Snippet */}
            <p className="flinza-voices-quote" style={{
              fontSize: 14.5,
              lineHeight: 1.6,
              color: '#3f3f46',
              margin: '0 0 -8px',
              backgroundColor: 'rgba(37, 211, 102, 0.09)',
              padding: '14px 16px',
              borderRadius: '16px 16px 16px 4px',
              borderLeft: '2.5px solid rgba(37, 211, 102, 0.55)',
            }}>
              “Not order takers. They pushed back on our creative direction, tested their hypothesis, and proved us wrong. Revenue up 89% in 12 weeks.”
            </p>

            {/* Metric Tag */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 0 }}>
              <span style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#0d6832',
                backgroundColor: 'rgba(37, 211, 102, 0.12)',
                padding: '4px 12px',
                borderRadius: 999,
              }}>
                📈 +89% Revenue in 12 Weeks
              </span>
              <span style={{ fontSize: 12, color: '#a1a1aa' }}>WhatsApp Voice Note <span style={{ color: '#53BDEB', fontWeight: 700 }}>✓✓</span></span>
            </div>
          </div>

          {/* Card 3: Elena Rostova */}
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
                <img
                  src="/images/avatar_charlie.png"
                  alt="Charlie Garwood"
                  style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontFamily: "'Nohemi', sans-serif", fontWeight: 700, fontSize: 16, color: '#09090b' }}>
                      Charlie Garwood
                    </span>
                    <span style={{ color: '#25D366', fontSize: 13 }} title="Verified Client">✓</span>
                  </div>
                  <span style={{ fontSize: 13, color: '#71717a', fontWeight: 500 }}>
                    Founder @ StillRing
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
                userName="Charlie Garwood"
                userImageFile="/images/avatar_charlie.png"
                timestamp="Yesterday"
                isOwn={false}
                accentColor="#25D366"
              /> : null}</div>
            </div>

            {/* Transcript Snippet */}
            <p className="flinza-voices-quote" style={{
              fontSize: 14.5,
              lineHeight: 1.6,
              color: '#3f3f46',
              margin: '0 0 -8px',
              backgroundColor: 'rgba(37, 211, 102, 0.09)',
              padding: '14px 16px',
              borderRadius: '16px 16px 16px 4px',
              borderLeft: '2.5px solid rgba(37, 211, 102, 0.55)',
            }}>
              “We burned $40K on pretty ads that didn't convert. These guys tested 30 angles in two weeks and found our winner. ROAS went from 1.8x to 4.2x.”
            </p>

            {/* Metric Tag */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 0 }}>
              <span style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#0d6832',
                backgroundColor: 'rgba(37, 211, 102, 0.12)',
                padding: '4px 12px',
                borderRadius: 999,
              }}>
                🚀 ROAS 1.8x → 4.2x
              </span>
              <span style={{ fontSize: 12, color: '#a1a1aa' }}>WhatsApp Voice Note <span style={{ color: '#53BDEB', fontWeight: 700 }}>✓✓</span></span>
            </div>
          </div>
        </div>
      </section>

      <SectionThread label="Good Questions" variant={2} delay={0.1} />

      {/* ════════════════════════════════════════════════════════════
           FAQ SECTION — ExpandOnHoverList × 4 (10 Questions)
      ════════════════════════════════════════════════════════════ */}
      <section
        id="faq"
        ref={sectionRef(faqMountRef, faqRef)}
        className={`${faqRevealed ? 'reveal-in' : 'reveal-init'}`}
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

          {/* FAQ Group 1: Questions 1–3 */}
          <div className="flinza-mount-gate" style={{ width: '100%' }}>
          {faqInView ? <ExpandOnHoverList
            sLNo01="01"
            title01="What does Flinza Works actually do?"
            text01="We're a data-driven ecommerce growth agency. We audit your funnel, test creative on 48-hour cycles, and scale what converts across Meta and TikTok — optimized for profit, not vanity metrics."
            sLNo02="02"
            title02="Who is this for?"
            text02="Ecommerce and DTC brands spending $50K+ per month on paid media who need growth, not just ads. If you're pre-revenue, we're probably not the right fit yet."
            sLNo03="03"
            title03="How fast will we see results?"
            text03="Testing starts in week one. Most brands see meaningful ROAS movement inside 30 days, with compounding gains as winning creative scales."
            openColor="rgb(14,14,14)"
            closeColor="rgb(172,172,172)"
            topBottomDividerColor="rgba(230,230,230,0.8)"
            style={{ width: '100%' }}
          /> : null}</div>

          {/* FAQ Group 2: Questions 4–6 */}
          <div className="flinza-mount-gate" style={{ width: '100%' }}>
          {faqInView ? <ExpandOnHoverList
            sLNo01="04"
            title01="What's your pricing model?"
            text01="Fixed-scope retainers or project engagements — no hourly billing. You always know what you're getting and when. Custom quotes are scoped within 48 hours of your first call."
            sLNo02="05"
            title02="What makes you different from other agencies?"
            text02="We're not order takers. We challenge assumptions, test hypotheses, and kill losers fast. Weekly optimization calls and real-time Slack access mean you're never guessing."
            sLNo03="06"
            title03="Do you use AI UGC?"
            text03="Yes — custom AI avatars produce unlimited user-generated content, so we test 10x more angles without creator bottlenecks, missed deadlines, or $300-per-video fees."
            openColor="rgb(14,14,14)"
            closeColor="rgb(172,172,172)"
            topBottomDividerColor="rgba(230,230,230,0.8)"
            style={{ width: '100%' }}
          /> : null}</div>

          {/* FAQ Group 3: Questions 7–9 */}
          <div className="flinza-mount-gate" style={{ width: '100%' }}>
          {faqInView ? <ExpandOnHoverList
            sLNo01="07"
            title01="Who owns the creative and ad accounts?"
            text01="You do — fully. All creative, assets, and ad accounts are 100% yours. We retain no rights, claim no licenses, and impose no usage restrictions."
            sLNo02="08"
            title02="Do you work with brands outside our country?"
            text02="Yes — we're globally distributed with clients across North America, Europe, and the Middle East. Async-first communication keeps cross-timezone work smooth."
            sLNo03="09"
            title03="How do we get started?"
            text03="Book a discovery call. We audit your funnel, creative, and attribution, find the 3–5 bottlenecks bleeding cash, and return a fixed quote within 48 hours."
            openColor="rgb(14,14,14)"
            closeColor="rgb(172,172,172)"
            topBottomDividerColor="rgba(230,230,230,0.8)"
            style={{ width: '100%' }}
          /> : null}</div>

          {/* FAQ Group 4: Questions 10–12 */}
          <div className="flinza-mount-gate" style={{ width: '100%' }}>
          {faqInView ? <ExpandOnHoverList
            sLNo01="10"
            title01="Do you guarantee results?"
            text01="No honest agency guarantees ROAS. What we guarantee is speed and rigor: 48-hour testing cycles, transparent dashboards, and profit-first decisions every single week."
            sLNo02="11"
            title02="What do you need from us to start?"
            text02="Ad-account access, product feed, and a Slack channel. We handle strategy, creative, testing, and reporting — you keep building your product."
            sLNo03="12"
            title03="Can we see past work before signing?"
            text03="Yes. On the discovery call we walk through anonymized case studies with real numbers — including the tests that failed, not just the winners."
            openColor="rgb(14,14,14)"
            closeColor="rgb(172,172,172)"
            topBottomDividerColor="rgba(230,230,230,0.8)"
            style={{ width: '100%' }}
          /> : null}</div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
           CONTACT BUTTON — Centered, floats above footer
      ════════════════════════════════════════════════════════════ */}
      <section
        ref={sectionRef(contactRef, contactRef)}
        className={`${contactRevealed ? 'reveal-in' : 'reveal-init'}`}
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
          cardNameColor="rgb(244,247,249)"
          cardTitleColor="rgba(244,247,249,0.62)"
          cardEmailColor="rgb(244,247,249)"
          cardEmailLabelColor="rgba(244,247,249,0.45)"
          cardBGColor="rgba(9,20,27,0.72)"
          cardBGBlurDefault={26}
          cardBorder={{ borderColor: 'rgba(244,247,249,0.18)', borderStyle: 'solid', borderWidth: 1 }}
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
           FOOTER — Transparent: slim content row over DiaFooter gradient glow
      ════════════════════════════════════════════════════════════ */}
      <footer
        id="contact"
        ref={sectionRef(footerMountRef, footerRef)}
        className={`${footerRevealed ? 'reveal-in' : 'reveal-init'}`}
        style={{
          width: '100%',
          position: 'relative',
          backgroundColor: 'transparent',
          zIndex: 2,
          marginTop: 10,
        }}
      >
        {/* Slim transparent content row */}
        <div
          style={{
            maxWidth: 1360,
            margin: '0 auto',
            padding: '26px 28px 0',
            borderTop: '1px solid rgba(9,9,11,0.10)',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px 48px',
            position: 'relative',
            zIndex: 3,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src="/images/flinza_logo_hd.png" alt="" width={40} height={40} style={{ display: 'block' }} />
              <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.03em', color: '#09090b', fontFamily: "'Nohemi', sans-serif" }}>
                Flinza Works
              </span>
            </div>
            <span style={{ fontSize: 13.5, color: '#71717a', fontFamily: "'Nohemi', sans-serif" }}>
              We test. We scale. We grow. Repeat.
            </span>

                        {/* Socials on the glass button component (item 6) */}
            <SocialGlassRow />
          </div>

          <nav aria-label="Footer navigation" style={{ display: 'flex', alignItems: 'center', gap: '12px 26px', flexWrap: 'wrap' }}>
            {[
              { label: 'Work', href: '#stories' },
              { label: 'Services', href: '#services' },
              { label: 'Voices', href: '#testimonials' },
              { label: 'FAQ', href: '#faq' },
              { label: 'Careers', href: '/careers' },
              { label: 'Contact', href: '/contact' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{ fontSize: 14, fontWeight: 600, color: '#52525b', textDecoration: 'none', letterSpacing: '-0.01em', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#0E7C93'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#52525b'; }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div style={{ fontSize: 12.5, color: '#a1a1aa', fontFamily: "'Nohemi', sans-serif" }}>
            © {new Date().getFullYear()} Flinza Works · hello@flinzaworks.com
          </div>
        </div>

        {/* DiaFooter — animated gradient glow rising from the bottom edge */}
        <div style={{ height: 320, position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
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
      </footer>
    </main>
  );
}
