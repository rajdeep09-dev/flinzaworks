'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Grid, ExternalLink, Sparkles } from 'lucide-react';
import { componentsMeta } from '@/data/componentsMeta';

export default function Navigation({ currentSlug }) {
  const router = useRouter();
  const currentIndex = componentsMeta.findIndex((c) => c.slug === currentSlug);
  const current = componentsMeta[currentIndex];
  const prev = currentIndex > 0 ? componentsMeta[currentIndex - 1] : componentsMeta[componentsMeta.length - 1];
  const next = currentIndex < componentsMeta.length - 1 ? componentsMeta[currentIndex + 1] : componentsMeta[0];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(9, 10, 15, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16
    }}>
      {/* Left: Brand & Back */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 14px',
            borderRadius: 10,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
            fontSize: 13,
            fontWeight: 600,
            transition: 'all 0.2s ease',
          }}
          className="hover-bright"
        >
          <Grid size={15} color="#00f2fe" />
          <span>All 18 Components</span>
        </Link>

        {current && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              fontSize: 12,
              fontFamily: 'JetBrains Mono, monospace',
              color: '#00f2fe',
              background: 'rgba(0, 242, 254, 0.1)',
              padding: '2px 8px',
              borderRadius: 6,
              border: '1px solid rgba(0, 242, 254, 0.25)'
            }}>
              #{String(current.id).padStart(2, '0')}
            </span>
            <h1 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' }}>
              {current.title}
            </h1>
          </div>
        )}
      </div>

      {/* Center: Component Quick Select Dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <select
          value={currentSlug}
          onChange={(e) => {
            if (e.target.value) {
              router.push(`/components/${e.target.value}`);
            }
          }}
          style={{
            background: 'rgba(23, 27, 39, 0.9)',
            color: '#e2e8f0',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 8,
            padding: '7px 12px',
            fontSize: 13,
            fontWeight: 500,
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          {componentsMeta.map((comp) => (
            <option key={comp.slug} value={comp.slug}>
              #{String(comp.id).padStart(2, '0')} — {comp.title} ({comp.type})
            </option>
          ))}
        </select>
      </div>

      {/* Right: Prev & Next Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {prev && (
          <Link
            href={`/components/${prev.slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '7px 12px',
              borderRadius: 8,
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#94a3b8',
              fontSize: 12,
              fontWeight: 500,
            }}
            title={prev.title}
          >
            <ArrowLeft size={14} />
            <span>Prev</span>
          </Link>
        )}

        {next && (
          <Link
            href={`/components/${next.slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '7px 12px',
              borderRadius: 8,
              background: 'rgba(0, 242, 254, 0.08)',
              border: '1px solid rgba(0, 242, 254, 0.2)',
              color: '#00f2fe',
              fontSize: 12,
              fontWeight: 600,
            }}
            title={next.title}
          >
            <span>Next</span>
            <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </header>
  );
}
