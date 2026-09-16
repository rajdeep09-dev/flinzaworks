"use client";

import PageShell from "@/components/PageShell";

/*
 * Privacy policy. The site has real forms now — a careers application with a CV upload and a
 * contact message box — and both write to a database, so the policy needs to describe what is
 * collected, why, where it is stored and how to have it deleted.
 */

export default function PrivacyPage() {
  return (
    <PageShell>
      <div className="flinza-pagehead">
        <p className="flinza-pagehead-overline">
          <i />
          Legal
        </p>
        <h1>Privacy policy</h1>
        <p>
          What we collect when you use this site, why we collect it, and how to have it removed.
          Questions about any of it go to hello@flinzaworks.com.
        </p>
      </div>

      <div className="flinza-prose">
        <h2>What we collect</h2>
        <ul>
          <li><strong>Contact messages</strong> — the name, email address and message you submit through the contact form.</li>
          <li><strong>Job applications</strong> — the name, email address, optional portfolio link, optional note, and the CV file you attach, plus the role you applied for.</li>
          <li><strong>Booking details</strong> — if you book a call, Cal.com collects your name, email and chosen time under its own policy.</li>
          <li><strong>Basic analytics</strong> — aggregate page views. We do not run third-party advertising trackers on this site.</li>
        </ul>

        <h2>Why we collect it</h2>
        <p>
          To reply to you, to assess an application, and to run the business. We do not sell data, and
          we do not use your message for marketing you did not ask for.
        </p>

        <h2>Where it is stored</h2>
        <p>
          Form submissions are stored in a Postgres database and uploaded CVs in object storage, both
          hosted with our infrastructure provider and reachable only by the team that needs them.
          Access is limited to the people reviewing enquiries and applications.
        </p>

        <h2>How long we keep it</h2>
        <p>
          Applications are kept for twelve months so we can consider you for future roles, then
          deleted. Contact messages are kept while the conversation is live and for a reasonable
          period afterwards for our records.
        </p>

        <h2>Your rights</h2>
        <p>
          You can ask for a copy of what we hold about you, ask us to correct it, or ask us to delete
          it. Email hello@flinzaworks.com and we will action it within 30 days. If you applied for a
          role and want your application removed, say so and it goes.
        </p>

        <h2>Cookies</h2>
        <p>
          This site sets no advertising or tracking cookies. The booking widget on the contact page is
          embedded from Cal.com and may set its own when you use it.
        </p>

        <h2>Changes</h2>
        <p>
          If this policy changes materially we will update this page and the date below. Continued use
          of the site after a change means you accept the updated policy.
        </p>
        <p style={{ marginTop: 28, fontSize: 13, color: "rgba(9,9,11,0.45)" }}>
          Last updated: September 2026
        </p>
      </div>
    </PageShell>
  );
}
