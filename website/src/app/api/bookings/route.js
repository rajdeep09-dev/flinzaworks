import { createPool } from '@vercel/postgres';

export const runtime = 'nodejs';

/*
 * POST /api/bookings — the booking fallback that always works.
 *
 * Why this exists. Every `Book a call` control on the site pointed at Cal.com, and the handle
 * `cal.com/flinza-works/discovery` answers HTTP 404. The modal has always opened correctly; cal.com
 * served its not-found page INSIDE the iframe, so the widget looked like it did nothing at all and
 * no amount of styling could repair it. Pointing an iframe at a path known to 404 is worse than
 * having no scheduler, so when no handle is configured the modal now collects the request here.
 *
 * When NEXT_PUBLIC_CAL_LINK IS set, the modal embeds the real scheduler and this route goes unused.
 * Until then, a request that reaches a table is worth more than a request that reaches nothing.
 *
 * Same connection handling as /api/messages and /api/applications: Vercel's Postgres integration
 * injects POSTGRES_URL, some setups only set DATABASE_URL, and a missing database must answer with
 * a clear 503 rather than throwing at request time.
 */

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL || '';
let pool = null;

function getDb() {
  if (!connectionString) return null;
  if (!pool) pool = createPool({ connectionString });
  return pool;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const body = await request.json();

    const name = (body.name || '').trim().slice(0, 200);
    const email = (body.email || '').trim().slice(0, 320);
    const company = (body.company || '').trim().slice(0, 200);
    const spend = (body.spend || '').trim().slice(0, 60);
    const slot = (body.slot || '').trim().slice(0, 60);
    const notes = (body.notes || '').trim().slice(0, 4000);

    if (!name || !EMAIL_RE.test(email)) {
      return Response.json({ error: 'A name and a valid email are required.' }, { status: 400 });
    }

    const db = getDb();
    if (!db) {
      return Response.json(
        {
          error:
            'Booking requests are not connected yet. Add a Postgres database to this Vercel project and redeploy.',
        },
        { status: 503 }
      );
    }

    await db.sql`
      CREATE TABLE IF NOT EXISTS booking_requests (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT,
        spend TEXT,
        slot TEXT,
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await db.sql`
      INSERT INTO booking_requests (name, email, company, spend, slot, notes)
      VALUES (${name}, ${email}, ${company}, ${spend}, ${slot}, ${notes})
    `;

    return Response.json({ ok: true });
  } catch (error) {
    console.error('POST /api/bookings failed:', error);
    return Response.json({ error: 'Could not save your request. Please email us instead.' }, { status: 500 });
  }
}
