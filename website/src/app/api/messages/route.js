import { sql } from '@vercel/postgres';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const body = await request.json();
    const name = (body.name || '').trim().slice(0, 200);
    const email = (body.email || '').trim().slice(0, 320);
    const message = (body.message || '').trim().slice(0, 5000);

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
      return Response.json({ error: 'name, valid email and message are required' }, { status: 400 });
    }

    await sql`
      INSERT INTO contact_messages (name, email, message)
      VALUES (${name}, ${email}, ${message})
    `;

    return Response.json({ ok: true });
  } catch (error) {
    console.error('POST /api/messages failed:', error);
    return Response.json({ error: 'Could not save your message. Please try again.' }, { status: 500 });
  }
}
