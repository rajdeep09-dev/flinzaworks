import { put } from '@vercel/blob';
import { createPool } from '@vercel/postgres';

export const runtime = 'nodejs';

// 10 MB cap for CV uploads
const MAX_CV_BYTES = 10 * 1024 * 1024;

// Vercel storage integrations inject POSTGRES_URL; some setups only set DATABASE_URL.
// Resolving both means the deploy works either way instead of failing at request time.
const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL || '';
let pool = null;
function getDb() {
  if (!connectionString) return null;
  if (!pool) pool = createPool({ connectionString });
  return pool;
}
const blobConfigured = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type') || '';

    let name, email, link, roleId, cvFile;

    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      name = (form.get('name') || '').toString().trim().slice(0, 200);
      email = (form.get('email') || '').toString().trim().slice(0, 320);
      link = (form.get('link') || '').toString().trim().slice(0, 500);
      roleId = (form.get('roleId') || '').toString().trim().slice(0, 100);
      const picked = form.get('cv');
      if (picked && typeof picked === 'object' && 'arrayBuffer' in picked && picked.size > 0) {
        if (picked.size > MAX_CV_BYTES) {
          return Response.json({ error: 'CV must be under 10MB.' }, { status: 400 });
        }
        const okTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const ext = (picked.name || '').toLowerCase().match(/\.(pdf|docx?|)$/);
        if (picked.type && !okTypes.includes(picked.type) && !ext) {
          return Response.json({ error: 'CV must be a PDF or DOC file.' }, { status: 400 });
        }
        cvFile = picked;
      }
    } else {
      const body = await request.json();
      name = (body.name || '').trim().slice(0, 200);
      email = (body.email || '').trim().slice(0, 320);
      link = (body.link || '').trim().slice(0, 500);
      roleId = (body.roleId || '').trim().slice(0, 100);
    }

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Name and a valid email are required.' }, { status: 400 });
    }

    const db = getDb();
    if (!db) {
      return Response.json(
        { error: 'Applications are not connected yet. Add a database to this Vercel project and redeploy.' },
        { status: 503 }
      );
    }

    // CV is optional — upload to Vercel Blob when provided. If blob storage is not
    // configured, keep the application and tell the client the file was skipped rather
    // than losing the submission.
    let cvUrl = null;
    let cvName = null;
    let cvSkipped = false;
    if (cvFile) {
      if (!blobConfigured()) {
        cvSkipped = true;
      } else {
        const blob = await put(`careers/${Date.now()}-${cvFile.name.replace(/[^\w.\-]/g, '_')}`, cvFile, {
          access: 'public',
          addRandomSuffix: true,
        });
        cvUrl = blob.url;
        cvName = cvFile.name;
      }
    }

    await db.sql`
      INSERT INTO job_applications (role_id, name, email, portfolio_link, cv_url, cv_filename)
      VALUES (${roleId || 'general'}, ${name}, ${email}, ${link || null}, ${cvUrl}, ${cvName})
    `;

    return Response.json({ ok: true, cvSkipped });
  } catch (error) {
    console.error('POST /api/applications failed:', error);
    return Response.json({ error: 'Could not submit your application. Please try again.' }, { status: 500 });
  }
}
