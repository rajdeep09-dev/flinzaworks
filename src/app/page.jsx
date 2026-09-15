'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { componentsMeta } from '@/data/componentsMeta';
import { ComponentRegistry } from '@/components/ComponentRegistry';
import {
  Sparkles,
  Layers,
  ArrowRight,
  Cpu,
  ExternalLink,
  ShieldCheck,
  Zap,
  Code2,
  Box,
  MonitorPlay
} from 'lucide-react';

// Mounts children only when their card is near the viewport, and unmounts
// once it scrolls far past it — so the heavy WebGL/animation previews never
// all run at once. The stage keeps its fixed height, so no layout shift.
function ViewportGate({ children }) {
  const holderRef = useRef(null);
  const [inRange, setInRange] = useState(false);

  const updateInRange = useCallback((entry) => {
    const margin = 1000;
    const rect = entry.boundingClientRect;
    const near =
      entry.isIntersecting ||
      (rect.bottom > -margin && rect.top < window.innerHeight + margin);
    setInRange((prev) => (prev === near ? prev : near));
  }, []);

  useEffect(() => {
    const el = holderRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInRange(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(updateInRange),
      { rootMargin: '1000px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateInRange]);

  return (
    <div
      ref={holderRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {inRange ? children : null}
    </div>
  );
}

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Loaders & Progress',
    'Buttons & Interactions',
    'Cards & Galleries',
    'Media Players',
    'Nav & Tickers',
    'WebGL & Shaders'
  ];

  const filteredComponents = componentsMeta.filter((comp) => {
    const matchesCat = selectedCategory === 'All' || comp.category === selectedCategory;
    const matchesSearch = comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          comp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header / Navbar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(9, 10, 15, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 242, 254, 0.4)',
          }}>
            <Box size={20} color="#090a0f" strokeWidth={2.5} />
          </div>
          <div>
            <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>
              FLINZA
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#00f2fe', marginLeft: 8, letterSpacing: '0.05em' }}>
              NEXT.JS REPRODUCTION
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            fontSize: 12,
            fontFamily: 'JetBrains Mono, monospace',
            color: '#10b981',
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '4px 10px',
            borderRadius: 8,
            border: '1px solid rgba(16, 185, 129, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <ShieldCheck size={14} />
            18/18 Components Mapped
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        maxWidth: 1400,
        width: '100%',
        margin: '0 auto',
        padding: '56px 24px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}>
        <div style={{ maxWidth: 880 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span className="badge">
              <Zap size={13} />
              Original Framer Architecture
            </span>
            <span className="badge badge-purple">
              Sub-Scripts Mapped Locally
            </span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: 16,
            background: 'linear-gradient(135deg, #ffffff 30%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            18 Original Framer Components. <br />
            Zero Compromise in Next.js.
          </h1>
          <p style={{ fontSize: 17, color: '#94a3b8', lineHeight: 1.6, maxWidth: 720 }}>
            Every single main script, child module, and recursive sub-script scraped from Framer and mapped natively to local modules. Experience the exact physics, shaders, audio playback, and animations.
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          marginTop: 8
        }}>
          {[
            { label: 'Total Components', val: '18', sub: '100% verified & runnable' },
            { label: 'Sub-Scripts Mapped', val: '18 Modules', sub: 'Zero remote CDN imports' },
            { label: 'Framer Runtime', val: 'Native ESM', sub: 'Full variant & CSS engine' },
            { label: 'Page Architecture', val: '1 Page / Comp', sub: 'Dedicated isolated routes' },
          ].map((stat, i) => (
            <div key={i} className="glass-panel" style={{ padding: '20px 24px' }}>
              <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                {stat.label}
              </span>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: '4px 0 2px', letterSpacing: '-0.02em' }}>
                {stat.val}
              </div>
              <span style={{ fontSize: 13, color: '#00f2fe' }}>
                {stat.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Filter Bar & Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          paddingTop: 16,
        }}>
          {/* Category Pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: selectedCategory === cat ? 'rgba(0, 242, 254, 0.4)' : 'rgba(255, 255, 255, 0.08)',
                  background: selectedCategory === cat ? 'rgba(0, 242, 254, 0.12)' : 'rgba(23, 27, 39, 0.6)',
                  color: selectedCategory === cat ? '#00f2fe' : '#94a3b8',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '9px 16px',
              borderRadius: 10,
              background: 'rgba(23, 27, 39, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              fontSize: 13,
              outline: 'none',
              minWidth: 260,
            }}
          />
        </div>
      </section>

      {/* Components Grid */}
      <section style={{
        maxWidth: 1400,
        width: '100%',
        margin: '0 auto',
        padding: '16px 24px 96px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: 24,
        }}>
          {filteredComponents.map((comp, compIndex) => {
            const TargetComp = ComponentRegistry[comp.slug];

            return (
              <div
                key={comp.slug}
                className="glass-panel card-enter"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 20,
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease, border-color 0.2s ease',
                  animationDelay: `${Math.min(compIndex * 40, 400)}ms`,
                }}
              >
                {/* Mini Preview Stage */}
                <div style={{
                  height: 260,
                  background: '#0d1117',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: 16,
                }}>
                  {/* Watermark badge */}
                  <div style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(10px)',
                    padding: '4px 10px',
                    borderRadius: 6,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}>
                    <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: '#00f2fe' }}>
                      #{String(comp.id).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>
                      {comp.type}
                    </span>
                  </div>

                  {/* Open dedicated page link button */}
                  <Link
                    href={`/components/${comp.slug}`}
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      zIndex: 10,
                      background: 'rgba(0, 0, 0, 0.6)',
                      backdropFilter: 'blur(10px)',
                      padding: 6,
                      borderRadius: 6,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title="Open dedicated page"
                  >
                    <ExternalLink size={14} />
                  </Link>

                  {/* Render preview (mounted only near the viewport) */}
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'scale(0.85)',
                    transformOrigin: 'center center',
                    pointerEvents: 'auto',
                  }}>
                    {TargetComp && (
                      <ViewportGate>
                        <TargetComp {...comp.props} />
                      </ViewportGate>
                    )}
                  </div>
                </div>

                {/* Card Details */}
                <div style={{
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between',
                  gap: 16
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>
                        {comp.category}
                      </span>
                      <span style={{ fontSize: 11, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Layers size={12} />
                        {comp.subScripts.length > 0 ? `${comp.subScripts.length} sub-scripts` : 'self-contained'}
                      </span>
                    </div>

                    <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8, letterSpacing: '-0.02em' }}>
                      {comp.title}
                    </h2>

                    <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
                      {comp.description}
                    </p>
                  </div>

                  {/* Button to dedicated page */}
                  <Link
                    href={`/components/${comp.slug}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      width: '100%',
                      padding: '11px 16px',
                      borderRadius: 10,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      fontSize: 13,
                      fontWeight: 600,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <MonitorPlay size={15} color="#00f2fe" />
                    <span>View Dedicated Page</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
