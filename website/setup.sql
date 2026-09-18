-- Flinza Works database schema
-- Run in the Vercel Postgres query editor (Storage → your database → Query)
-- or locally: psql $DATABASE_URL -f setup.sql

CREATE TABLE IF NOT EXISTS contact_messages (
  id          SERIAL PRIMARY KEY,
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  message     TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS job_applications (
  id             SERIAL PRIMARY KEY,
  role_id        TEXT        NOT NULL DEFAULT 'general',
  name           TEXT        NOT NULL,
  email          TEXT        NOT NULL,
  portfolio_link TEXT,
  cv_url         TEXT,
  cv_filename    TEXT,
  -- The applicant's short note, and the reason the talent-pool card exists: a name, an email and a
  -- CV is a file, whereas a note is a lead the team can actually read and reply to.
  note           TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Databases created before `note` existed are upgraded in place. `IF NOT EXISTS` makes this a no-op
-- on a database that already has the column, so it is safe to re-run; the API route also applies it
-- defensively on first use, so a deploy against an older database heals itself.

CREATE INDEX IF NOT EXISTS idx_messages_created   ON contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_role  ON job_applications (role_id, created_at DESC);
