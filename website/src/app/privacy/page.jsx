/*
 * /privacy — a server component, so the route carries its own metadata.
 *
 * The policy was already specific about the two forms, which is more than most agency sites manage.
 * What it was missing is the half a policy is actually read for: who the controller is, on what
 * lawful basis the data is processed, who the sub-processors are, how long a CV is kept, and how to
 * exercise a right under the GDPR and the CCPA. Those are added here.
 *
 * A named contact and a stated retention period are the two things a reader checks first, so both
 * are in the first section rather than at the bottom of a long page.
 */

import JsonLd from '@/components/JsonLd';
import PageShell from '@/components/PageShell';
import { breadcrumbSchema, SITE_EMAIL, socialMeta } from '@/data/seo';

export const metadata = {
  title: 'Privacy Policy',
  description:
    'What Flinza Works collects when you use this site, why we collect it, who processes it, how long we keep it, and how to have it deleted. Contact hello@flinzaworks.com.',
  alternates: { canonical: '/privacy' },
  ...socialMeta({
    title: 'Privacy policy | Flinza Works',
    description:
      'What we collect, why, who processes it and how to have it removed — in plain language.',
    url: '/privacy',
  }),
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([{ name: 'Privacy policy', path: '/privacy' }])} />

      <div className="flinza-pagehead">
        <p className="flinza-pagehead-overline">
          <i />
          Legal
        </p>
        <h1>Privacy policy</h1>
        <p>
          What we collect when you use this site, why we collect it, who else touches it, how long we
          keep it, and how to have it removed. Questions about any of it go to{' '}
          <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
        </p>
      </div>

      <div className="flinza-prose">
        <h2>Who is responsible for your data</h2>
        <p>
          Flinza Works is the data controller for the personal information described on this page.
          That means we decide what is collected and why, and we are the ones you ask if you want it
          changed or deleted. Write to <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a> and it
          reaches the people who can act on it, not a ticket queue.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Contact messages</strong> — the name, email address and message you submit
            through the contact form.
          </li>
          <li>
            <strong>Job applications</strong> — the name, email address, optional portfolio link,
            optional note, and any CV you attach, plus the role you applied for or the talent pool
            you joined.
          </li>
          <li>
            <strong>Booking details</strong> — if you book a call, Cal.com collects your name, email
            and chosen time under its own privacy policy.
          </li>
          <li>
            <strong>Basic technical data</strong> — aggregate page views and the standard request logs
            our host keeps for security and reliability. We do not run third-party advertising
            trackers on this site.
          </li>
        </ul>

        <h2>Why we are allowed to hold it</h2>
        <p>
          Where the GDPR applies, we rely on three lawful bases. Enquiries and applications are
          processed on the basis of your <strong>consent</strong> and our <strong>legitimate
          interests</strong> in responding to you and assessing candidates. Records we are required to
          keep are processed to comply with a <strong>legal obligation</strong>. You can withdraw
          consent at any time by asking us to delete what we hold.
        </p>

        <h2>What we do not do with it</h2>
        <p>
          We do not sell personal data, we do not rent it, we do not add you to a marketing list you
          did not ask for, and we do not use your CV to train anything. Your message or application is
          read by the people who need to read it and nobody else.
        </p>

        <h2>Who else processes it</h2>
        <p>
          We keep this short and specific, because a vague sub-processor list is not a useful one:
        </p>
        <ul>
          <li>
            <strong>Vercel</strong> — hosting, request logs and the serverless functions that receive
            form submissions.
          </li>
          <li>
            <strong>Vercel Postgres and Vercel Blob</strong> — the database that stores messages and
            applications, and the object storage that holds uploaded CVs.
          </li>
          <li>
            <strong>Cal.com</strong> — the booking widget embedded on the contact page, which
            processes booking details under its own policy.
          </li>
        </ul>
        <p>
          These providers process data on our instructions. Some of them operate infrastructure in the
          United States, so your information may be transferred outside your country; those transfers
          are covered by the providers&apos; standard contractual clauses.
        </p>

        <h2>How long we keep it</h2>
        <p>
          Applications and talent-pool submissions are kept for twelve months so we can consider you
          for future roles, then deleted. If you ask us to remove your application sooner, we do it
          within 30 days and it does not affect how we consider you. Contact messages are kept while
          the conversation is live and for a reasonable period afterwards for our own records.
          Uploaded CVs are deleted with the application they belong to.
        </p>

        <h2>How it is protected</h2>
        <p>
          Form submissions are transmitted over HTTPS, stored in a managed Postgres database and
          object storage that are not publicly readable, and reachable only by the team that needs
          them. We keep access limited rather than logging everything: the fewer copies of a CV that
          exist, the smaller the problem if anything ever goes wrong.
        </p>

        <h2>Your rights</h2>
        <p>
          Depending on where you live, you can ask for a copy of what we hold about you, ask us to
          correct it, ask us to delete it, object to how we are using it, or ask us to restrict what
          we do with it. If you are in California, you can ask what categories of information we
          collect and who we share it with, and you can ask us not to sell it — which we do not,
          because we do not sell it.
        </p>
        <p>
          Email <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a> and we will action your request
          within 30 days. We will not charge you for it, and asking will never count against an
          application.
        </p>

        <h2>Cookies</h2>
        <p>
          This site sets no advertising or analytics cookies and no tracking pixels. The booking
          widget on the contact page is embedded from Cal.com and may set its own cookies when you
          use it; that is the only third-party embed on the site that does.
        </p>

        <h2>Children</h2>
        <p>
          This site is aimed at businesses and is not intended for anyone under 16. We do not
          knowingly collect information from children, and if you believe we have, tell us and we will
          delete it.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If this policy changes in a way that matters, we will update this page and the date below.
          Continuing to use the site after a change means you accept the updated policy. Previous
          versions are available on request.
        </p>

        <p style={{ marginTop: 28, fontSize: 13, color: 'rgba(9,9,11,0.45)' }}>
          Last updated: September 2026
        </p>
      </div>
    </PageShell>
  );
}
