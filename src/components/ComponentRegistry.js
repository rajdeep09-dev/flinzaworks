'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import all 18 components with SSR disabled for pure client animations
export const ComponentRegistry = {
  'animation-loader': dynamic(() => import('./AnimationLoader'), {
    ssr: false,
    loading: () => <ComponentLoader name="Animation Loader" />,
  }),
  'camo-liquid-button': dynamic(() => import('./CamoLiquidButton'), {
    ssr: false,
    loading: () => <ComponentLoader name="Camo Liquid Button" />,
  }),
  'circle-cards': dynamic(() => import('./CircleCards'), {
    ssr: false,
    loading: () => <ComponentLoader name="Circle Cards" />,
  }),
  'clothesline-gallery': dynamic(() => import('./ClotheslineGallery'), {
    ssr: false,
    loading: () => <ComponentLoader name="Clothesline Gallery" />,
  }),
  'disc-player': dynamic(() => import('./DiscPlayer'), {
    ssr: false,
    loading: () => <ComponentLoader name="Disc Player" />,
  }),
  'dithering-hover': dynamic(() => import('./DitheringHover'), {
    ssr: false,
    loading: () => <ComponentLoader name="Dithering Hover" />,
  }),
  'dynamic-nav': dynamic(() => import('./DynamicNav'), {
    ssr: false,
    loading: () => <ComponentLoader name="Dynamic Nav" />,
  }),
  'expand-on-hover-list': dynamic(() => import('./ExpandOnHoverList'), {
    ssr: false,
    loading: () => <ComponentLoader name="Expand On Hover List" />,
  }),
  'feature-flipper': dynamic(() => import('./FeatureFlipper'), {
    ssr: false,
    loading: () => <ComponentLoader name="Feature Flipper" />,
  }),
  'framer-story': dynamic(() => import('./FramerStory'), {
    ssr: false,
    loading: () => <ComponentLoader name="Framer Story" />,
  }),
  'infinity-text': dynamic(() => import('./InfinityText'), {
    ssr: false,
    loading: () => <ComponentLoader name="Infinity Text" />,
  }),
  'interactive-ticker-link': dynamic(() => import('./InteractiveTickerLink'), {
    ssr: false,
    loading: () => <ComponentLoader name="Interactive Ticker Link" />,
  }),
  'liquid-glass-carousel': dynamic(() => import('./LiquidGlassCarousel'), {
    ssr: false,
    loading: () => <ComponentLoader name="Liquid Glass Carousel" />,
  }),
  'liquid-image': dynamic(() => import('./LiquidImage'), {
    ssr: false,
    loading: () => <ComponentLoader name="Liquid Image" />,
  }),
  'liquid-logo': dynamic(() => import('./LiquidLogo'), {
    ssr: false,
    loading: () => <ComponentLoader name="Liquid Logo" />,
  }),
  'liquid-metal': dynamic(() => import('./LiquidMetal'), {
    ssr: false,
    loading: () => <ComponentLoader name="Liquid Metal" />,
  }),
  'newsletter-buttons': dynamic(() => import('./NewsletterButtons'), {
    ssr: false,
    loading: () => <ComponentLoader name="Newsletter Buttons" />,
  }),
  'whatsapp-audio-player': dynamic(() => import('./WhatsappAudioPlayer'), {
    ssr: false,
    loading: () => <ComponentLoader name="WhatsApp Audio Player" />,
  }),
};

function ComponentLoader({ name }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: 300,
      gap: 16,
      color: '#94a3b8',
      fontSize: 14
    }}>
      <div style={{
        width: 36,
        height: 36,
        border: '3px solid rgba(0, 242, 254, 0.2)',
        borderTopColor: '#00f2fe',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <p>Mounting {name}...</p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
