'use client';

import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import SiteGround from '@/components/SiteGround';

const CamoLiquidButton = dynamic(
  () => import('@/components/CamoLiquidButton'),
  { ssr: false }
);

const roles = [
  {
    id: 'paid-media',
    team: 'Paid Media',
    type: 'Full-Time',
    title: 'Paid Media Strategist',
    blurb: 'Own Meta & TikTok budgets for 4–6 DTC brands spending $50K+ a month. You build the test plan, read the data honestly, and scale what converts — with a strategist pod and our testing engine behind you.',
    location: 'Remote · EU/US overlap',
    salary: '$60,000–$85,000/yr + performance bonus',
    do: [
      'Run full-funnel Meta & TikTok campaigns for 4–6 brands',
      'Ship weekly test plans: angles, audiences, budgets',
      'Move accounts from ROAS reporting to profit contribution',
    ],
    need: [
      '2+ years managing $50K+/mo paid social spend',
      'Fluent in CAC, MER, contribution margin — not vanity metrics',
      'Comfortable killing your own darlings when data says so',
    ],
  },
  {
    id: 'creative-strategist',
    team: 'Creative',
    type: 'Full-Time',
    title: 'Creative Strategist',
    blurb: 'Turn performance data into ad angles, hooks, and scripts. You brief and iterate UGC and AI UGC that stops the scroll, and you think in hook rate, CTR, and thumb-stop ratio.',
    location: 'Remote · Any timezone',
    salary: '$55,000–$75,000/yr + creative win bonuses',
    do: [
      'Mine analytics and comments for winning angles',
      'Brief, script, and iterate 10+ concepts per week',
      'Pair with editors and AI UGC producers to ship fast',
    ],
    need: [
      'Portfolio of direct-response creative that scaled',
      'Obsession with hooks and the first 1.5 seconds',
      'Ability to write like a human, not a brand deck',
    ],
  },
  {
    id: 'ai-ugc',
    team: 'Creative',
    type: 'Full-Time',
    title: 'AI UGC Producer',
    blurb: 'Produce unlimited creator-style video with AI avatars, voice, and editing pipelines. You multiply our creative output 10x without creator bottlenecks or missed deadlines.',
    location: 'Remote · Any timezone',
    salary: '$45,000–$65,000/yr + output bonuses',
    do: [
      'Build and maintain AI avatar + voice pipelines',
      'Edit and version ads at volume on 48-hour cycles',
      'Keep quality bar high while output goes vertical',
    ],
    need: [
      'Hands-on with AI video/voice tooling (HeyGen, ElevenLabs, etc.)',
      'Strong editing instincts (CapCut / Premiere / Resolve)',
      'Systems thinking: templates, presets, repeatability',
    ],
  },
  {
    id: 'growth-analyst',
    team: 'Growth',
    type: 'Full-Time',
    title: 'Growth Analyst',
    blurb: 'Own attribution, dashboards, and reporting. You turn messy multi-touch data into decisions the team can act on this week — not decks nobody reads.',
    location: 'Remote · EU overlap',
    salary: '$50,000–$70,000/yr + profit share',
    do: [
      'Build and maintain real-time client dashboards',
      'Model profit contribution per channel and creative',
      'Surface the 3–5 leaks bleeding each account',
    ],
    need: [
      'SQL + Looker Studio / Tableau fluency',
      'Experience with MMPs, pixels, server-side tracking',
      'Allergic to vanity metrics; allergic to slow answers',
    ],
  },
  {
    id: 'cro-designer',
    team: 'Conversion',
    type: 'Full-Time',
    title: 'CRO / Landing Page Designer',
    blurb: 'Design and ship conversion-focused landing pages and funnels. You obsess over the audit-to-first-dollar journey and ship tests on 48-hour cycles.',
    location: 'Remote · Any timezone',
    salary: '$50,000–$72,000/yr + lift bonuses',
    do: [
      'Design LPs, PDPs, and funnel flows that convert',
      'Run structured A/B programs with the analyst pod',
      'Translate brand kits into performance-first layouts',
    ],
    need: [
      'Portfolio of LPs with proven conversion lifts',
      'Figma mastery + working knowledge of Webflow/Next.js',
      'Instinct for hierarchy, speed, and friction removal',
    ],
  },
  {
    id: 'account-lead',
    team: 'Client Growth',
    type: 'Full-Time',
    title: 'Account Lead (Client Growth)',
    blurb: 'Be the trusted voice for our brands. Run weekly optimization calls, keep Slack buzzing, and turn results into long-term partnerships and expansions.',
    location: 'Hybrid · Remote + quarterly onsites',
    salary: '$55,000–$80,000/yr + retention commission',
    do: [
      'Own communication for 4–6 brand relationships',
      'Run weekly calls that clients actually look forward to',
      'Spot expansion opportunities before clients ask',
    ],
    need: [
      '2+ years in agency account or growth management',
      'Writes crisp updates; presents with confidence',
      'Commercial instinct: retention and expansion are the game',
    ],
  },
];

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s-7-5.1-7-11a7 7 0 1 1 14 0c0 5.9-7 11-7 11Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function CashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="6" width="19" height="12" rx="2.4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function CvDropzone({ file, setFile }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const accept = (incoming) => {
    const picked = incoming && incoming[0];
    if (picked) setFile({ name: picked.name, size: picked.size, raw: picked });
  };

  return (
    <div>
      <div
        onDragEnter={(e) => { e.preventDefault(); setDragging(true); }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setDragging(false); }}
        onDrop={(e) => { e.preventDefault(); setDragging(false); accept(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
        aria-label="Upload your CV or resume"
        style={{
          borderRadius: 18,
          padding: '22px 20px',
          border: `1.5px dashed ${dragging ? 'rgb(23,132,155)' : 'rgba(9,9,11,0.18)'}`,
          background: dragging ? 'rgba(224,242,246,0.55)' : 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          transition: 'border-color 0.2s ease, background 0.2s ease',
        }}
      >
        <span
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #56C1D3, #17849B)',
            color: '#fff',
            fontSize: 18,
            fontWeight: 700,
            boxShadow: '0 8px 18px -6px rgba(23,132,155,0.5)',
          }}
        >
          ↑
        </span>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#09090b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {file ? file.name : 'Drop your CV here, or click to browse'}
          </div>
          <div style={{ fontSize: 12, color: '#71717a', marginTop: 2 }}>
            {file ? `${(file.size / 1024).toFixed(0)} KB · attached` : 'PDF or DOC · up to 10MB'}
          </div>
        </div>
        {file && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setFile(null); if (inputRef.current) inputRef.current.value = ''; }}
            style={{
              marginLeft: 'auto',
              border: 'none',
              background: 'rgba(9,9,11,0.06)',
              borderRadius: 999,
              padding: '6px 12px',
              fontSize: 12,
              fontWeight: 600,
              color: '#52525b',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            Remove
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword"
          style={{ display: 'none' }}
          onChange={(e) => accept(e.target.files)}
        />
      </div>
    </div>
  );
}

function ApplyBox({ role, onClose }) {
  const isGeneral = !role || role.general;
  const [selectedId, setSelectedId] = useState(isGeneral ? '' : role.id);
  const activeRole = isGeneral ? roles.find((r) => r.id === selectedId) || null : role;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [link, setLink] = useState('');
  const [cv, setCv] = useState(null);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    if (e) e.preventDefault();
    if (sending) return;
    if (!name.trim()) {
      setError('Tell us your name so we know who we’re replying to.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Add a valid email address — that’s how we’ll reach you.');
      return;
    }
    setError('');
    setSending(true);
    try {
      const form = new FormData();
      form.append('name', name.trim());
      form.append('email', email.trim());
      form.append('link', link.trim());
      form.append('roleId', activeRole ? activeRole.id : 'general');
      if (cv && cv.raw) form.append('cv', cv.raw);
      const res = await fetch('/api/applications', { method: 'POST', body: form });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Submission failed');
      }
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong — please try again.');
    } finally {
      setSending(false);
    }
  };

  const fieldStyle = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px 14px',
    borderRadius: 12,
    border: '1px solid rgba(9,9,11,0.12)',
    background: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    color: '#09090b',
    fontFamily: "'Nohemi', sans-serif",
    outline: 'none',
  };

  const selectStyle = {
    ...fieldStyle,
    appearance: 'none',
    WebkitAppearance: 'none',
    cursor: 'pointer',
    backgroundImage:
      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none'><path d='M6 9l6 6 6-6' stroke='%230E7C93' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 14px center',
    paddingRight: 40,
    fontWeight: 600,
  };

  return (
    <div
      className="flinza-apply-backdrop"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'rgba(9, 11, 16, 0.45)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        className="flinza-apply-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 620,
          maxHeight: '88vh',
          overflowY: 'auto',
          borderRadius: 28,
          padding: '36px 34px 32px',
          boxSizing: 'border-box',
          background: 'linear-gradient(155deg, rgba(255,255,255,0.92) 0%, rgba(240,250,252,0.88) 100%)',
          backdropFilter: 'blur(34px) saturate(190%)',
          WebkitBackdropFilter: 'blur(34px) saturate(190%)',
          border: '1px solid rgba(255,255,255,0.8)',
          boxShadow: '0 50px 120px -40px rgba(9,11,16,0.55), inset 0 1.5px 2px rgba(255,255,255,0.9)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
              {(activeRole ? [activeRole.team, activeRole.type] : ['Spontaneous', 'Remote']).map((chip) => (
                <span key={chip} style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#0E7C93', background: 'rgba(23,132,155,0.1)', border: '1px solid rgba(23,132,155,0.25)', borderRadius: 999, padding: '4px 12px' }}>
                  {chip}
                </span>
              ))}
            </div>
            <h3 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 6px', color: '#09090b', fontFamily: "'Nohemi', sans-serif" }}>
              {activeRole ? activeRole.title : 'General application'}
            </h3>
            {activeRole ? (
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13, color: '#52525b', fontWeight: 600 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><PinIcon />{activeRole.location}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#0E7C93' }}><CashIcon />{activeRole.salary}</span>
              </div>
            ) : (
              <p style={{ fontSize: 13.5, color: '#52525b', lineHeight: 1.55, margin: 0 }}>
                Pick the role that fits you best — or apply spontaneously and tell us where you move the needle.
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{ border: 'none', background: 'rgba(9,9,11,0.05)', borderRadius: 999, width: 34, height: 34, cursor: 'pointer', fontSize: 15, color: '#52525b', flexShrink: 0 }}
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div style={{ padding: '48px 12px', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, margin: '0 auto 18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #56C1D3, #0E7C93)', boxShadow: '0 18px 40px -14px rgba(14,124,147,0.6)' }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12.5l4.2 4.2L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h4 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 10px', color: '#09090b', fontFamily: "'Nohemi', sans-serif" }}>
              Application received
            </h4>
            <p style={{ fontSize: 14.5, color: '#52525b', lineHeight: 1.6, margin: 0 }}>
              Thanks {name.trim().split(' ')[0]} — we read every application ourselves. Expect a reply within 3 business days.
            </p>
            <p style={{ fontSize: 12.5, color: '#a1a1aa', margin: '10px 0 0' }}>
              CV {cv ? 'attached ✓' : 'skipped — portfolio link only'}
            </p>
          </div>
        ) : (
          <>
            {/* Role picker — general applications */}
            {isGeneral && (
              <div style={{ margin: '22px 0 4px' }}>
                <label htmlFor="apply-role" style={{ display: 'block', fontSize: 11, fontWeight: 750, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#71717a', marginBottom: 8 }}>
                  Which role are you applying for?
                </label>
                <select id="apply-role" style={selectStyle} value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
                  <option value="">Spontaneous / other</option>
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>{r.title} · {r.team}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Role detail */}
            {activeRole && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 22, margin: '22px 0 26px' }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 750, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#71717a', marginBottom: 10 }}>What you&apos;ll do</div>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {activeRole.do.map((item) => (
                      <li key={item} style={{ display: 'flex', gap: 8, fontSize: 13.5, lineHeight: 1.5, color: '#3f3f46' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(135deg, #56C1D3, #17849B)', marginTop: 6, flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 750, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#71717a', marginBottom: 10 }}>What we&apos;re looking for</div>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {activeRole.need.map((item) => (
                      <li key={item} style={{ display: 'flex', gap: 8, fontSize: 13.5, lineHeight: 1.5, color: '#3f3f46' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(135deg, #56C1D3, #17849B)', marginTop: 6, flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Application form */}
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: isGeneral && !activeRole ? 22 : 0 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                <input style={fieldStyle} placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
                <input style={fieldStyle} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <input style={fieldStyle} placeholder="Portfolio / LinkedIn / GitHub (optional)" value={link} onChange={(e) => setLink(e.target.value)} />
              <CvDropzone file={cv} setFile={setCv} />
              <p style={{ margin: '-4px 0 0', fontSize: 12, color: '#71717a', textAlign: 'center' }}>
                CV optional — a portfolio or LinkedIn link works too.
              </p>
              {error && (
                <p style={{ margin: 0, fontSize: 13, color: '#b91c1c', fontWeight: 600 }}>{error}</p>
              )}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}>
                <div style={{ transform: 'scale(0.62)', transformOrigin: 'center center' }}>
                  <div onClick={submit} style={{ opacity: sending ? 0.6 : 1, pointerEvents: sending ? 'none' : 'auto', transition: 'opacity 0.2s ease' }}>
                    <CamoLiquidButton
                      label={sending ? 'Sending…' : 'Submit Application'}
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
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function CareersPage() {
  const [openRole, setOpenRole] = useState(null);
  const [hovered, setHovered] = useState(null);

  return (
    <main
      style={{
        width: '100%',
        minHeight: '100vh',
        background: 'transparent',
        color: '#09090b',
        fontFamily: "'Nohemi', sans-serif",
      }}
    >
      <SiteGround />
      <style jsx global>{`
        .flinza-role-row .flinza-role-blurb {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.25s ease;
        }
        .flinza-role-row:hover .flinza-role-blurb {
          -webkit-line-clamp: unset;
          overflow: visible;
        }
        @keyframes flinzaBackdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes flinzaModalIn {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .flinza-apply-backdrop { animation: flinzaBackdropIn 0.3s ease both; }
        .flinza-apply-card { animation: flinzaModalIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both; }
      `}</style>

      {/* ── Header ── */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '120px 24px 56px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#0E7C93', margin: '0 0 16px' }}>
          Careers
        </p>
        <h1 style={{ fontSize: 'clamp(38px, 6vw, 68px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.03, margin: '0 0 20px', fontFamily: "'Nohemi', sans-serif" }}>
          Build the growth engine<br />behind brands that scale.
        </h1>
        <p style={{ fontSize: 'clamp(15px, 1.7vw, 19px)', lineHeight: 1.6, color: '#52525b', margin: '0 auto', maxWidth: 620 }}>
          We&apos;re a remote-first ecommerce growth agency. Fast testers, honest readers of data, allergic to vanity metrics. If that sounds like you — pick a role and apply in one click.
        </p>
      </section>

      {/* ── Open roles ── */}
      <section style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '0 24px 40px' }}>
        <div style={{ width: '100%', maxWidth: 1060 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#71717a', margin: '0 0 18px' }}>
            Open roles · {roles.length}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {roles.map((role, i) => (
              <div
                key={role.id}
                className="flinza-role-row"
                onMouseEnter={() => setHovered(role.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 28,
                  padding: '30px 26px',
                  borderRadius: 22,
                  borderTop: i === 0 ? '1px solid rgba(9,9,11,0.08)' : undefined,
                  borderBottom: '1px solid rgba(9,9,11,0.08)',
                  background: hovered === role.id ? 'linear-gradient(120deg, rgba(255,255,255,0.85), rgba(224,242,246,0.55))' : 'transparent',
                  backdropFilter: hovered === role.id ? 'blur(18px) saturate(170%)' : undefined,
                  WebkitBackdropFilter: hovered === role.id ? 'blur(18px) saturate(170%)' : undefined,
                  boxShadow: hovered === role.id ? '0 24px 60px -28px rgba(14,124,147,0.35)' : undefined,
                  transition: 'background 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                }}
                onClick={() => setOpenRole(role)}
              >
                {/* Left: chips, title, blurb */}
                <div style={{ flex: '1 1 460px', minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#3f3f46', background: 'rgba(9,9,11,0.05)', border: '1px solid rgba(9,9,11,0.08)', borderRadius: 999, padding: '5px 14px' }}>
                      {role.team}
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#3f3f46', background: 'rgba(9,9,11,0.05)', border: '1px solid rgba(9,9,11,0.08)', borderRadius: 999, padding: '5px 14px' }}>
                      {role.type}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.025em', margin: '0 0 10px', color: '#09090b', fontFamily: "'Nohemi', sans-serif" }}>
                    {role.title}
                  </h3>
                  <p className="flinza-role-blurb" style={{ fontSize: 14.5, lineHeight: 1.6, color: '#52525b', margin: 0 }}>
                    {role.blurb}
                  </p>
                </div>

                {/* Middle: location + salary */}
                <div style={{ flex: '0 1 300px', display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 34 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: '#52525b', fontWeight: 600 }}>
                    <PinIcon />{role.location}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: '#0E7C93', fontWeight: 700 }}>
                    <CashIcon />{role.salary}
                  </span>
                </div>

                {/* Right: view role pill */}
                <div style={{ flexShrink: 0, paddingTop: 34 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13.5, fontWeight: 700, color: '#09090b', background: hovered === role.id ? 'rgba(255,255,255,0.95)' : 'rgba(9,9,11,0.04)', border: '1px solid rgba(9,9,11,0.08)', borderRadius: 999, padding: '10px 18px', transition: 'background 0.25s ease' }}>
                    View role
                    <span aria-hidden="true" style={{ fontSize: 15, lineHeight: 1 }}>›</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Apply CTA ── */}
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, padding: '24px 24px 96px', textAlign: 'center' }}>
        <p style={{ fontSize: 14.5, color: '#71717a', margin: 0, maxWidth: 460, lineHeight: 1.6 }}>
          Don&apos;t see your role? Send us something that proves you can move a number — we read everything.
        </p>
        <div style={{ transform: 'scale(0.62)', transformOrigin: 'center center' }} onClick={() => setOpenRole({ general: true })}>
          <CamoLiquidButton
            label="Apply Now"
            link="#apply"
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
      </section>

      {/* ── Back link ── */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 72 }}>
        <a
          href="/"
          style={{ fontSize: 14, fontWeight: 600, color: '#71717a', textDecoration: 'none', transition: 'color 0.2s ease' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#09090b'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#71717a'; }}
        >
          ← Back to home
        </a>
      </div>

      {openRole && <ApplyBox role={openRole} onClose={() => setOpenRole(null)} />}
    </main>
  );
}
