'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { componentsMeta } from '@/data/componentsMeta';
import { ComponentRegistry } from '@/components/ComponentRegistry';
import { Sparkles, Code2, Layers, Cpu, RotateCcw, Monitor, Smartphone } from 'lucide-react';
import Link from 'next/link';

export default function ComponentDetail({ slug }) {
  const meta = componentsMeta.find((c) => c.slug === slug);
  const [bgMode, setBgMode] = useState('dark');
  const [key, setKey] = useState(0);
  const [viewMode, setViewMode] = useState('full'); // 'full' or 'mobile'

  if (!meta) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: '#ef4444' }}>
        Component not found.
      </div>
    );
  }

  const TargetComponent = ComponentRegistry[slug];

  const bgColors = {
    dark: '#090a0f',
    midnight: '#0d1117',
    slate: '#1a1f2c',
    light: '#ffffff',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar Navigation */}
      <Navigation currentSlug={slug} />

      {/* Main Content Area */}
      <main style={{
        flex: 1,
        maxWidth: 1400,
        width: '100%',
        margin: '0 auto',
        padding: '32px 24px 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: 28
      }}>
        {/* Component Header Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(23, 27, 39, 0.8) 0%, rgba(14, 17, 24, 0.8) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 20,
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span className="badge">
                <Sparkles size={12} />
                {meta.category}
              </span>
              <span className="badge badge-purple">
                <Cpu size={12} />
                {meta.type}
              </span>
              <span style={{
                fontSize: 12,
                color: '#94a3b8',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '4px 10px',
                borderRadius: 9999,
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                Component #{meta.id} of 18
              </span>
            </div>

            {/* Sub-script mapping tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#38bdf8' }}>
              <Layers size={14} />
              <span>
                {meta.subScripts.length > 0
                  ? `${meta.subScripts.length} Sub-Script${meta.subScripts.length > 1 ? 's' : ''} Mapped Locally`
                  : 'Self-Contained Module'}
              </span>
            </div>
          </div>

          <div>
            <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff', marginBottom: 8 }}>
              {meta.title}
            </h1>
            <p style={{ fontSize: 15, color: '#94a3b8', maxWidth: 850, lineHeight: 1.6 }}>
              {meta.description}
            </p>
          </div>

          {/* Sub scripts chips */}
          {meta.subScripts.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', paddingTop: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>Mapped Modules:</span>
              {meta.subScripts.map((sub) => (
                <span key={sub} style={{
                  fontSize: 12,
                  fontFamily: 'JetBrains Mono, monospace',
                  background: 'rgba(56, 189, 248, 0.1)',
                  color: '#7dd3fc',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  padding: '3px 8px',
                  borderRadius: 6,
                }}>
                  {sub}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Stage Toolbar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          padding: '0 4px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
              Stage Canvas:
            </span>
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 2, border: '1px solid rgba(255,255,255,0.08)' }}>
              {['dark', 'midnight', 'slate', 'light'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setBgMode(mode)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    border: 'none',
                    cursor: 'pointer',
                    background: bgMode === mode ? 'rgba(0, 242, 254, 0.2)' : 'transparent',
                    color: bgMode === mode ? '#00f2fe' : '#94a3b8',
                    transition: 'background-color 0.2s ease, color 0.2s ease',
                  }}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Viewport size toggle */}
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 2, border: '1px solid rgba(255,255,255,0.08)' }}>
              <button
                onClick={() => setViewMode('full')}
                style={{
                  padding: '5px 10px',
                  borderRadius: 6,
                  fontSize: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  border: 'none',
                  cursor: 'pointer',
                  background: viewMode === 'full' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  color: viewMode === 'full' ? '#fff' : '#94a3b8',
                  transition: 'background-color 0.2s ease, color 0.2s ease',
                }}
              >
                <Monitor size={14} />
                <span>Full</span>
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                style={{
                  padding: '5px 10px',
                  borderRadius: 6,
                  fontSize: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  border: 'none',
                  cursor: 'pointer',
                  background: viewMode === 'mobile' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  color: viewMode === 'mobile' ? '#fff' : '#94a3b8',
                  transition: 'background-color 0.2s ease, color 0.2s ease',
                }}
              >
                <Smartphone size={14} />
                <span>Mobile (390px)</span>
              </button>
            </div>

            {/* Restart animation button */}
            <button
              onClick={() => setKey((k) => k + 1)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                borderRadius: 8,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#e2e8f0',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
              }}
            >
              <RotateCcw size={13} />
              <span>Replay</span>
            </button>
          </div>
        </div>

        {/* Component Stage Container */}
        <div style={{
          position: 'relative',
          width: '100%',
          minHeight: meta.canvasHeight || 450,
          background: bgColors[bgMode],
          borderRadius: 24,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 0 40px rgba(0, 0, 0, 0.4)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          transition: 'background-color 0.3s ease',
        }}>
          <div
            key={key}
            style={{
              width: viewMode === 'mobile' ? 390 : '100%',
              maxWidth: viewMode === 'mobile' ? 390 : '100%',
              minHeight: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {TargetComponent ? (
              <TargetComponent {...meta.props} />
            ) : (
              <div style={{ color: '#ef4444' }}>Component not found in registry.</div>
            )}
          </div>
        </div>

        {/* Integration snippet */}
        <div style={{
          background: 'rgba(18, 21, 31, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 16,
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>
            <Code2 size={15} color="#00f2fe" />
            <span>Usage In Your Next.js App:</span>
          </div>
          <pre style={{
            background: 'rgba(0, 0, 0, 0.5)',
            padding: '14px 18px',
            borderRadius: 10,
            fontSize: 13,
            fontFamily: 'JetBrains Mono, monospace',
            color: '#a5f3fc',
            overflowX: 'auto',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}>
            {`import { ${meta.name} } from "@/components";\n\nexport default function Page() {\n  return <${meta.name} />;\n}`}
          </pre>
        </div>

        {/* Bottom Navigation Ribbon */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 16,
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              fontWeight: 600,
              color: '#94a3b8',
            }}
          >
            ← Back to Gallery
          </Link>

          <span style={{ fontSize: 13, color: '#64748b' }}>
            Flinza • 100% Native Next.js Framer Architecture
          </span>
        </div>
      </main>
    </div>
  );
}
