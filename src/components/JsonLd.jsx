/*
 * JsonLd — one <script type="application/ld+json"> for one schema object (or an array of them).
 *
 * Deliberately a plain component with no directive, so it can be rendered from a server component
 * and the structured data lands in the initial HTML rather than being injected after hydration.
 * Search engines do read client-injected JSON-LD, but every other consumer of it — the Rich
 * Results test, an AI crawler that does not run JavaScript, a link preview bot — reads the
 * response body only.
 *
 * `JSON.stringify` on the object is enough; the only thing that has to be escaped inside a script
 * tag is the sequence that would close it early, which is what the `replace` is for.
 */

export default function JsonLd({ data }) {
  if (!data) return null;
  const payload = Array.isArray(data) ? data.filter(Boolean) : data;
  if (Array.isArray(payload) && !payload.length) return null;

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, '\\u003c'),
      }}
    />
  );
}
