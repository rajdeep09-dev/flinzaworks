"use client";

import PageShell from "@/components/PageShell";

/*
 * Terms of use for the site itself. Client engagements are governed by a signed agreement, so
 * this deliberately covers only use of the website and is explicit about that.
 */

export default function TermsPage() {
  return (
    <PageShell>
      <div className="flinza-pagehead">
        <p className="flinza-pagehead-overline">
          <i />
          Legal
        </p>
        <h1>Terms of use</h1>
        <p>
          These terms cover your use of this website. Client engagements are governed by a separate
          signed agreement, which takes precedence over anything here.
        </p>
      </div>

      <div className="flinza-prose">
        <h2>Using this site</h2>
        <p>
          The content here is provided for information. You may read it, share links to it, and quote
          short extracts with attribution. You may not republish it wholesale or present it as your
          own.
        </p>

        <h2>No guarantee of results</h2>
        <p>
          Case study figures describe outcomes for specific brands under specific conditions. They are
          not a prediction for your account. Advertising performance depends on your product, margin,
          market and execution, and we do not promise a particular return.
        </p>

        <h2>Submissions</h2>
        <p>
          Job applications and messages you send through this site must be accurate and your own. Do
          not submit other people's CVs or confidential information. We may delete submissions that
          are abusive, spam, or contain malware.
        </p>

        <h2>Intellectual property</h2>
        <p>
          The Flinza Works name, logo and site design belong to us. Client work shown in case studies
          is displayed with permission and remains the property of the respective client.
        </p>

        <h2>Third-party services</h2>
        <p>
          Bookings are handled by Cal.com and some pages embed third-party components. Their terms and
          privacy policies apply to those parts of the experience.
        </p>

        <h2>Availability and liability</h2>
        <p>
          We aim to keep the site available and correct but provide it "as is", without warranties. To
          the extent permitted by law, we are not liable for indirect or consequential loss arising
          from use of this site.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws applicable at our place of business. Any dispute about
          use of this site will be handled there.
        </p>
        <p style={{ marginTop: 28, fontSize: 13, color: "rgba(9,9,11,0.45)" }}>
          Last updated: September 2026
        </p>
      </div>
    </PageShell>
  );
}
