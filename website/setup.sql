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
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_messages_created   ON contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_role  ON job_applications (role_id, created_at DESC);
