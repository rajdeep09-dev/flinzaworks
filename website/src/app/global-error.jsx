"use client";

/*
 * global-error.tsx — the last line of defence.
 *
 * error.tsx covers a failure inside a route. This covers a failure in the ROOT LAYOUT itself,
 * which error.tsx cannot catch, and it is the only boundary allowed to replace <html> and
 * <body> — which is why it renders its own document rather than reusing PageShell.
 *
 * Kept deliberately small and dependency-free. It is the one component that must work when
 * something else has already failed, so it imports nothing from the site beyond the design
 * tokens declared inline in globals.css, and it is the one place a bare "back to the homepage"
 * link matters more than brand.
 */

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fbfcfd",
          color: "#09090b",
          fontFamily:
            "Nohemi, system-ui, -apple-system, 'Segoe UI', sans-serif",
          textAlign: "center",
          padding: "48px 24px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: "52ch" }}>
          <h1
            style={{
              margin: "0 0 14px",
              fontFamily: "'Instrument Serif', 'Iowan Old Style', Georgia, serif",
              fontSize: "clamp(26px, 5vw, 40px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
            }}
          >
            The page failed to start
          </h1>
          <p
            style={{
              margin: "0 0 26px",
              fontSize: 15.5,
              lineHeight: 1.65,
              color: "rgba(9, 9, 11, 0.62)",
            }}
          >
            This is not a problem with your browser. Try again, and if it keeps happening,
            let us know.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={() => reset()}
              style={{
                padding: "12px 22px",
                borderRadius: 999,
                border: "1px solid #09090b",
                background: "#09090b",
                color: "#fbfcfd",
                fontSize: 13.5,
                fontWeight: 600,
                fontFamily: "inherit",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                padding: "12px 22px",
                borderRadius: 999,
                border: "1px solid rgba(9, 9, 11, 0.12)",
                color: "#09090b",
                fontSize: 13.5,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Back to the homepage
            </a>
          </div>
          {error?.digest ? (
            <p
              style={{
                margin: "24px 0 0",
                fontSize: 11.5,
                letterSpacing: "0.06em",
                color: "rgba(9, 9, 11, 0.45)",
              }}
            >
              Reference {error.digest}
            </p>
          ) : null}
        </div>
      </body>
    </html>
  );
}
