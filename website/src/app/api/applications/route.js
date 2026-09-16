import { put } from '@vercel/blob';
import { sql } from '@vercel/postgres';

export const runtime = 'nodejs';

// 10 MB cap for CV uploads
const MAX_CV_BYTES = 10 * 1024 * 1024;

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

    // CV is optional — upload to Vercel Blob when provided
    let cvUrl = null;
    let cvName = null;
    if (cvFile) {
      const blob = await put(`careers/${Date.now()}-${cvFile.name.replace(/[^\w.\-]/g, '_')}`, cvFile, {
        access: 'public',
        addRandomSuffix: true,
      });
      cvUrl = blob.url;
      cvName = cvFile.name;
    }

    await sql`
      INSERT INTO job_applications (role_id, name, email, portfolio_link, cv_url, cv_filename)
      VALUES (${roleId || 'general'}, ${name}, ${email}, ${link || null}, ${cvUrl}, ${cvName})
    `;

    return Response.json({ ok: true });
  } catch (error) {
    console.error('POST /api/applications failed:', error);
    return Response.json({ error: 'Could not submit your application. Please try again.' }, { status: 500 });
  }
}
