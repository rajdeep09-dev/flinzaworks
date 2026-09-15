'use client';

import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';

const ExpandOnHoverList = dynamic(
  () => import('@/components/ExpandOnHoverList'),
  { ssr: false }
);

const BRAND_PURPLE = '#7C3AED';
const BRAND_PURPLE_DARK = '#2E1065';
const BRAND_CYAN = '#06B6D4';

/* ── Finder-style "drop your CV into the folder" upload UI ── */
function ResumeFolder() {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const accept = (incoming) => {
    const picked = incoming && incoming[0];
    if (!picked) return;
    setFile({ name: picked.name, size: picked.size });
    setSubmitted(false);
  };

  const open = dragging || !!file;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 22,
      }}
    >
      <div
        onDragEnter={(e) => { e.preventDefault(); setDragging(true); }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setDragging(false); }}
        onDrop={(e) => { e.preventDefault(); setDragging(false); accept(e.dataTransfer.files); }}
        onClick={() => !file && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !file) inputRef.current?.click(); }}
        aria-label="Upload your CV or resume"
        style={{
          position: 'relative',
          width: 340,
          height: 232,
          cursor: file ? 'default' : 'pointer',
          perspective: 900,
          filter: dragging ? 'drop-shadow(0 24px 40px rgba(124,58,237,0.35))' : 'drop-shadow(0 16px 30px rgba(15,15,20,0.18))',
          transition: 'filter 0.3s ease',
        }}
      >
        {/* Folder tab */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 18,
            width: 132,
            height: 34,
            background: `linear-gradient(135deg, ${BRAND_PURPLE_DARK}, ${BRAND_PURPLE})`,
            borderRadius: '12px 12px 0 0',
            zIndex: 1,
          }}
        />

        {/* Folder back panel */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(160deg, ${BRAND_PURPLE} 0%, ${BRAND_PURPLE_DARK} 100%)`,
            borderRadius: 18,
            zIndex: 1,
          }}
        />

        {/* Paper sheets inside */}
        <div
          style={{
            position: 'absolute',
            left: 26,
            right: 26,
            bottom: 26,
            height: 168,
            borderRadius: 12,
            background: 'linear-gradient(180deg, #ffffff 0%, #f3f4f6 100%)',
            boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
            zIndex: 2,
            transform: open ? 'translateY(-26px) scale(1.01)' : 'translateY(6px) scale(0.98)',
            opacity: open ? 1 : 0.55,
            transition: 'transform 0.42s cubic-bezier(0.2,0,0,1), opacity 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            gap: 9,
            padding: '22px 22px',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          {file ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 3px rgba(34,197,94,0.18)' }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#09090b', fontFamily: "'Plus Jakarta Sans', sans-serif", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 210 }}>
                  {file.name}
                </span>
              </div>
              <span style={{ fontSize: 11.5, color: '#71717a', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {(file.size / 1024).toFixed(0)} KB · filed in your application
              </span>
              {[70, 100, 88, 96, 60].map((w, i) => (
                <div key={i} style={{ height: 7, borderRadius: 4, width: `${w}%`, background: i === 0 ? 'rgba(124,58,237,0.5)' : 'rgba(9,9,11,0.1)' }} />
              ))}
            </>
          ) : (
            <>
              <div style={{ height: 9, width: '55%', borderRadius: 4, background: 'rgba(124,58,237,0.45)' }} />
              {[100, 92, 98, 74, 88, 60].map((w, i) => (
                <div key={i} style={{ height: 7, borderRadius: 4, width: `${w}%`, background: 'rgba(9,9,11,0.09)' }} />
              ))}
            </>
          )}
        </div>

        {/* Folder front flap */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 132,
            background: `linear-gradient(160deg, rgba(124,58,237,0.96) 0%, rgba(46,16,101,0.98) 100%)`,
            borderRadius: '16px 16px 18px 18px',
            zIndex: 3,
            transformOrigin: 'bottom center',
            transform: open ? 'rotateX(-24deg) translateY(10px)' : 'rotateX(0deg)',
            transition: 'transform 0.42s cubic-bezier(0.2,0,0,1)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.22)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: 13.5,
              fontWeight: 700,
              letterSpacing: '0.02em',
              color: 'rgba(255,255,255,0.94)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              textAlign: 'center',
              padding: '0 18px',
            }}
          >
            {file ? 'CV received ✓' : dragging ? 'Drop it here' : 'Drop your CV here'}
          </span>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword"
          style={{ display: 'none' }}
          onChange={(e) => accept(e.target.files)}
        />
      </div>

      {/* Actions / helper */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, minHeight: 76 }}>
        {!file ? (
          <p style={{ fontSize: 13.5, color: '#71717a', margin: 0, textAlign: 'center', maxWidth: 340, lineHeight: 1.55, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Drag your resume in, or click the folder to browse. PDF or DOC up to 10MB.
          </p>
        ) : !submitted ? (
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              style={{
                appearance: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '12px 26px',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 700,
                color: '#fff',
                background: `linear-gradient(135deg, ${BRAND_PURPLE}, ${BRAND_CYAN})`,
                boxShadow: '0 10px 26px -8px rgba(124,58,237,0.6)',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Submit application
            </button>
            <button
              type="button"
              onClick={() => { setFile(null); if (inputRef.current) inputRef.current.value = ''; }}
              style={{
                appearance: 'none',
                cursor: 'pointer',
                padding: '12px 20px',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
                color: '#52525b',
                background: 'rgba(9,9,11,0.04)',
                border: '1px solid rgba(9,9,11,0.08)',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Replace
            </button>
          </div>
        ) : (
          <p style={{ fontSize: 14, color: '#16a34a', fontWeight: 600, margin: 0, textAlign: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Application filed. We&apos;ll be in touch within 3 business days.
          </p>
        )}
      </div>
    </div>
  );
}

const roleGroups = [
  {
    items: [
      { no: '01', title: 'Paid Media Strategist', text: 'Own Meta & TikTok budgets for 4–6 DTC brands. Build test plans, read the data honestly, and scale what converts. 2+ years managing $50K+/mo spend.' },
      { no: '02', title: 'Creative Strategist', text: 'Turn performance data into ad angles and hooks. Brief, script, and iterate UGC that stops the scroll. You think in CTR, hook rate, and ROAS.' },
      { no: '03', title: 'AI UGC Producer', text: 'Produce unlimited creator-style video with AI avatars and editing. Ship 10x more creative angles without the creator bottleneck.' },
    ],
  },
  {
    items: [
      { no: '04', title: 'Growth Analyst', text: 'Own attribution, dashboards, and reporting. Turn messy multi-touch data into decisions the team can act on this week. SQL + Looker Studio.' },
      { no: '05', title: 'CRO / Landing Page Designer', text: 'Design and ship conversion-focused landing pages and funnels. Obsess over the audit-to-first-dollar journey.' },
      { no: '06', title: 'Account Lead (Client Growth)', text: 'Be the trusted voice for our brands. Run weekly optimization calls, keep Slack buzzing, and turn results into long-term partnerships.' },
    ],
  },
];

export default function CareersPage() {
  return (
    <main
      style={{
        width: '100%',
        minHeight: '100vh',
        background: 'radial-gradient(120% 90% at 50% 0%, #ffffff 0%, #fbfcfd 55%, #f4f5f7 100%)',
        color: '#09090b',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* ── Header ── */}
      <section
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '120px 24px 56px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: BRAND_PURPLE,
            margin: '0 0 16px',
          }}
        >
          Careers
        </p>
        <h1
          style={{
            fontSize: 'clamp(38px, 6vw, 68px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.03,
            margin: '0 0 20px',
            fontFamily: "'Nohemi', sans-serif",
          }}
        >
          Build the growth engine<br />behind brands that scale.
        </h1>
        <p
          style={{
            fontSize: 'clamp(15px, 1.7vw, 19px)',
            lineHeight: 1.6,
            color: '#52525b',
            margin: '0 auto',
            maxWidth: 620,
          }}
        >
          We&apos;re a remote-first ecommerce growth agency. Fast testers, honest readers of data, allergic to vanity metrics. If that sounds like you, pick a role and drop your CV in the folder.
        </p>
      </section>

      {/* ── Open roles ── */}
      <section
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: '0 24px 24px',
        }}
      >
        <div style={{ width: '100%', maxWidth: 900, display: 'flex', flexDirection: 'column', gap: 0 }}>
          <h2
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#71717a',
              margin: '0 0 18px',
            }}
          >
            Open roles
          </h2>
          {roleGroups.map((group, gi) => (
            <ExpandOnHoverList
              key={gi}
              sLNo01={group.items[0].no}
              title01={group.items[0].title}
              text01={group.items[0].text}
              sLNo02={group.items[1].no}
              title02={group.items[1].title}
              text02={group.items[1].text}
              sLNo03={group.items[2].no}
              title03={group.items[2].title}
              text03={group.items[2].text}
              openColor="rgb(14,14,14)"
              closeColor="rgb(172,172,172)"
              topBottomDividerColor="rgba(230,230,230,0.8)"
              style={{ width: '100%' }}
            />
          ))}
        </div>
      </section>

      {/* ── Apply: folder upload ── */}
      <section
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: '40px 24px 96px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 720,
            borderRadius: 32,
            padding: '56px 40px 48px',
            boxSizing: 'border-box',
            background: 'linear-gradient(158deg, rgba(255,255,255,0.9) 0%, rgba(248,249,251,0.86) 100%)',
            backdropFilter: 'blur(30px) saturate(180%)',
            WebkitBackdropFilter: 'blur(30px) saturate(180%)',
            border: '1px solid rgba(9,9,11,0.07)',
            boxShadow: '0 40px 90px -40px rgba(15,15,20,0.28), inset 0 1px 0 rgba(255,255,255,0.8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 28,
            textAlign: 'center',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 'clamp(24px, 3vw, 34px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                margin: '0 0 12px',
                fontFamily: "'Nohemi', sans-serif",
              }}
            >
              File your application
            </h2>
            <p style={{ fontSize: 15, color: '#52525b', margin: 0, lineHeight: 1.6, maxWidth: 460 }}>
              No cover letter required. Drop your CV into the folder below — tell us which role in the file name if you like.
            </p>
          </div>

          <ResumeFolder />
        </div>
      </section>

      {/* ── Back link ── */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 72 }}>
        <a
          href="/"
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#71717a',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#09090b'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#71717a'; }}
        >
          ← Back to home
        </a>
      </div>
    </main>
  );
}
