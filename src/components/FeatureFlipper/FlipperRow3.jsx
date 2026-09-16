'use client';

import React, { useEffect, useState } from 'react';
import SideExpandableCard from './Se6AMZ2yk';
import OpenAiLogo from './U4VlAAgoV';
import ArrowsClockwise from './WiRMsH_Oi';

export default function FlipperRow3({ cards = [], id, className, style }) {
  const [activeIdx, setActiveIdx] = useState(null);
  // Mobile gets the component's own Mobile variants (correct geometry for narrow tiles);
  // desktop keeps the hover-driven Expanded/Shrinked/Closed variants and their animations.
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(max-width: 860px)');
    const update = () => setIsMobileViewport(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  const defaultCards = [
    {
      tag: '01 • INTELLIGENCE',
      title: 'Autonomous Multi-Agent Swarms',
      description: 'Self-coordinating neural agents that reason, plan, and execute mission-critical enterprise workflows with verifiable precision.',
      image: { src: 'https://framerusercontent.com/images/hIyXekP7SHBtRkcBBA8LoqjrdY.png' },
      tagIcon: OpenAiLogo,
    },
    {
      tag: '02 • ARCHITECTURE',
      title: 'Real-Time Edge & Shader Pipelines',
      description: 'Ultra-low latency reactive graphics and GPU-accelerated computing running directly on edge node clusters.',
      image: { src: 'https://framerusercontent.com/images/gO7oqH62CdjjxnyUBSU5GJTvFnk.jpg' },
      tagIcon: ArrowsClockwise,
    },
    {
      tag: '03 • INFRASTRUCTURE',
      title: 'Zero-Trust Resilient Mesh Systems',
      description: 'Self-healing global infrastructure with automated failover, millisecond routing, and immutable security guarantees.',
      image: { src: 'https://framerusercontent.com/images/K4sA5mbjMww6nIFRSGkWZeB2OI.jpg' },
      tagIcon: OpenAiLogo,
    },
  ];

  const items = cards.length >= 3 ? cards : defaultCards;

  return (
    <div
      id={id}
      className={`flipper3-row ${className || ''}`}
      onMouseLeave={() => setActiveIdx(null)}
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 16,
        width: '100%',
        maxWidth: 1200,
        height: 440,
        position: 'relative',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <style jsx global>{`
        .flipper3-item .framer-s9jRj.framer-1np3v7v {
          width: 100% !important;
          max-width: 100% !important;
          height: 100% !important;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        /* Readability: deeper bottom scrim + text shadow on expanded copy */
        .flipper3-item .framer-1nx3bq {
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(4, 8, 12, 0.78) 100%) !important;
        }
        .flipper3-item .framer-12m30f5,
        .flipper3-item .framer-82idcm {
          text-shadow: 0 2px 18px rgba(0, 0, 0, 0.55);
        }
        /* Hide the extra mini image blocks inside the expanded tile */
        .flipper3-item .framer-3442v3 {
          display: none !important;
        }
        @media (max-width: 860px) {
          .flipper3-row {
            flex-direction: column !important;
            height: auto !important;
          }
          .flipper3-item {
            width: 100% !important;
            height: 320px !important;
            flex: none !important;
          }
        }
      `}</style>

      {items.map((card, idx) => {
        const isExpanded = activeIdx === idx;
        const isShrinked = activeIdx !== null && activeIdx !== idx;
        const variant = isMobileViewport
          ? (isExpanded ? 'h7AFwZ1xA' : 'ldSmw_chP') // Expanded/Closed — Mobile
          : isExpanded
          ? 'zHCnJiAlH' // Expanded
          : isShrinked
          ? 'mPkGE7Wx2' // Shrinked
          : 'bKSOr7Cu9'; // Closed

        // Flex distribution:
        // Neutral: 1 : 1 : 1 (33.3% each)
        // One active: 2.1 : 0.85 : 0.85 (~55% vs ~22.5% each)
        const flexValue = isExpanded ? 2.15 : isShrinked ? 0.85 : 1;

        return (
          <div
            key={idx}
            className="flipper3-item"
            onMouseEnter={() => setActiveIdx(idx)}
            onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
            style={{
              flex: `${flexValue} 1 0%`,
              minWidth: 0,
              height: '100%',
              position: 'relative',
              transition: 'flex 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer',
              borderRadius: 36,
              overflow: 'hidden',
              boxShadow: isExpanded
                ? '0 20px 40px -12px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.08)'
                : '0 8px 24px -8px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)',
            }}
          >
            <SideExpandableCard
              variant={variant}
              tagText={card.tag}
              title={card.title}
              description={card.description}
              image={card.image}
              extraImage1={card.extraImage1}
              extraImage2={card.extraImage2}
              tagIcon={card.tagIcon || (idx % 2 === 0 ? OpenAiLogo : ArrowsClockwise)}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
