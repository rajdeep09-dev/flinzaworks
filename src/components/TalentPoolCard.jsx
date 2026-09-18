'use client';

/*
 * TalentPoolCard — the dark, centred careers capture card.
 *
 * ── Why this exists ──
 *
 * /careers had a role list and a light modal you could only reach by clicking a role. Someone who
 * liked the sound of the studio but did not match a listed role had one option: a small "apply
 * spontaneously" link at the bottom of the page, which opened the same light modal and asked for a
 * CV. That is a form that collects a file rather than a conversation.
 *
 * The client asked for the Atomik treatment — a dark, centred card that asks for the person — and
 * for the reason he gave: "when they give all, we'd have the info". So the card asks for all six
 * things and stores all six:
 *
 *   full name · email · role of interest · portfolio or profile link · a short note · CV
 *
 * The note is the part that matters. A name, an email and a CV is a file; a note is a lead somebody
 * can actually read and reply to, and it is the field that tells us where this person moves a
 * number before anyone books a call.
 *
 * It posts to the same /api/applications endpoint the role modal uses — one pipeline, one table,
 * one place to look — with `note` added to the payload.
 *
 * ── Accessibility ──
 *
 * A real <form> with a real <label> per field and a submit button, so Enter submits and assistive
 * tech announces every control. Errors are announced with role="alert", the success state replaces
 * the form rather than appearing beside it, and the CV input is a native file input: on a phone
 * that is the one control that opens the photo/files picker, and a hand-built dropzone is a
 * decoration on a device that cannot drag.
 */

import * as React from 'react';
import CamoCtaButton from './CamoCtaButton';

const FIELD = 'flinza-talent-field';

export default function TalentPoolCard({ roles = [], id = 'careers-talent' }) {
  const [form, setForm] = React.useState({ name: '', email: '', roleId: '', link: '', note: '' });
  const [cv, setCv] = React.useState(null);
  const [state, setState] = React.useState('idle'); // idle | sending | sent | error
  const [error, setError] = React.useState('');
  const fileRef = React.useRef(null);

  const set = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    if (state === 'sending') return;

    if (!form.name.trim()) {
      setError('Add your name so we know who we are replying to.');
      setState('error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError('That email does not look right — it is how we will reach you.');
      setState('error');
      return;
    }

    setError('');
    setState('sending');

    try {
      const body = new FormData();
      body.append('name', form.name.trim());
      body.append('email', form.email.trim());
      body.append('roleId', form.roleId || 'talent-pool');
      body.append('link', form.link.trim());
      body.append('note', form.note.trim());
      if (cv) body.append('cv', cv);

      const res = await fetch('/api/applications', { method: 'POST', body });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Submission failed');
      }
      setState('sent');
    } catch (err) {
      setError(err.message || 'Something went wrong — please try again.');
      setState('error');
    }
  };

  return (
    <section className="flinza-talent" id={id}>
      <div className="flinza-talent-card">
        <span className="flinza-talent-glow" aria-hidden="true" />

        <div className="flinza-talent-head">
          <span className="flinza-talent-kicker">
            <i aria-hidden="true" />
            Join the talent pool
          </span>
          <h2 className="flinza-talent-title">
            Show us a number <em>you moved</em>.
          </h2>
          <p className="flinza-talent-sub">
            One card, six fields, thirty seconds. We read every one ourselves — including the ones
            that do not match a role we have open today, because that is how the next role gets
            filled.
          </p>
        </div>

        {state === 'sent' ? (
          <div className="flinza-talent-done" role="status">
            <span className="flinza-talent-tick" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h3>You are in the pool</h3>
            <p>
              Thanks {form.name.trim().split(' ')[0]} — your details are with us. Expect a reply
              within three business days, even if the answer is that we have nothing open yet.
            </p>
            <p className="flinza-talent-done-meta">
              CV {cv ? 'attached ✓' : 'not attached — portfolio link only'}
            </p>
          </div>
        ) : (
          <form className="flinza-talent-form" onSubmit={submit} noValidate>
            <div className="flinza-talent-row">
              <label className="flinza-talent-label">
                <span>Full name</span>
                <input
                  className={FIELD}
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={set('name')}
                />
              </label>

              <label className="flinza-talent-label">
                <span>Email</span>
                <input
                  className={FIELD}
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={set('email')}
                />
              </label>
            </div>

            <label className="flinza-talent-label">
              <span>Role of interest</span>
              <select className={FIELD} name="roleId" value={form.roleId} onChange={set('roleId')}>
                <option value="">Spontaneous — or the role I want is not listed</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.title} · {role.team}
                  </option>
                ))}
              </select>
            </label>

            <label className="flinza-talent-label">
              <span>Portfolio, LinkedIn or website</span>
              <input
                className={FIELD}
                type="url"
                name="link"
                inputMode="url"
                placeholder="https://"
                value={form.link}
                onChange={set('link')}
              />
            </label>

            <label className="flinza-talent-label">
              <span>What have you moved?</span>
              <textarea
                className={`${FIELD} ${FIELD}--area`}
                name="note"
                rows={3}
                placeholder="A number, a channel, a campaign — whatever you are proudest of."
                value={form.note}
                onChange={set('note')}
              />
            </label>

            <label className="flinza-talent-label">
              <span>CV — optional, PDF or DOC up to 10MB</span>
              <span className="flinza-talent-file">
                <input
                  ref={fileRef}
                  type="file"
                  name="cv"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(event) => {
                    const picked = event.target.files && event.target.files[0];
                    setCv(picked || null);
                  }}
                />
                <span className="flinza-talent-file-btn">Choose file</span>
                <span className="flinza-talent-file-name">
                  {cv ? `${cv.name} · ${(cv.size / 1024).toFixed(0)} KB` : 'No file chosen'}
                </span>
              </span>
            </label>

            {error ? (
              <p className="flinza-talent-error" role="alert">
                {error}
              </p>
            ) : null}

            <div className="flinza-talent-actions">
              <CamoCtaButton as="button" type="submit" size="lg" disabled={state === 'sending'}>
                {state === 'sending' ? 'Sending…' : 'Join the talent pool'}
              </CamoCtaButton>
              <span className="flinza-talent-note">
                No account, no password, no newsletter. Just a reply from a person.
              </span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
