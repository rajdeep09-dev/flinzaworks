import { createPool } from '@vercel/postgres';

export const runtime = 'nodejs';

// Vercel storage integrations inject POSTGRES_URL; some setups only set DATABASE_URL.
const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL || '';
let pool = null;
function getDb() {
  if (!connectionString) return null;
  if (!pool) pool = createPool({ connectionString });
  return pool;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const name = (body.name || '').trim().slice(0, 200);
    const email = (body.email || '').trim().slice(0, 320);
    const message = (body.message || '').trim().slice(0, 5000);

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
      return Response.json({ error: 'name, valid email and message are required' }, { status: 400 });
    }

    const db = getDb();
    if (!db) {
      return Response.json(
        { error: 'Messages are not connected yet. Add a database to this Vercel project and redeploy.' },
        { status: 503 }
      );
    }

    await db.sql`
      INSERT INTO contact_messages (name, email, message)
      VALUES (${name}, ${email}, ${message})
    `;

    return Response.json({ ok: true });
  } catch (error) {
    console.error('POST /api/messages failed:', error);
    return Response.json({ error: 'Could not save your message. Please try again.' }, { status: 500 });
  }
}
