/*
 * /terms — a server component, so the route carries its own metadata.
 *
 * This covers use of the website only; client engagements are governed by a signed agreement, and
 * the page says so in its first line rather than in clause 14. What it was missing is the set a
 * reader actually looks for — acceptable use, intellectual property and trademarks, indemnity,
 * termination, and what happens if a claim arises — so those are specified here.
 *
 * It deliberately still refuses to promise results. A marketing agency that guarantees ROAS in its
 * terms is either lying or about to be sued.
 */

import JsonLd from '@/components/JsonLd';
import PageShell from '@/components/PageShell';
import { breadcrumbSchema, SITE_EMAIL } from '@/data/seo';

export const metadata = {
  title: 'Terms of Service',
  description:
    'Terms of use for the Flinza Works website: acceptable use, intellectual property, submissions, liability limits and governing law. Client engagements are governed separately.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of use | Flinza Works',
    description:
      'Terms covering use of this website. Client engagements are governed by a separately signed agreement.',
    url: '/terms',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of use | Flinza Works',
    description: 'Terms covering use of this website.',
  },
};

export default function TermsPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([{ name: 'Terms of use', path: '/terms' }])} />

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
          short extracts with attribution. You may not republish it wholesale, present it as your own,
          or use it to train a model you then sell access to without permission.
        </p>

        <h2>No guarantee of results</h2>
        <p>
          Case study figures describe outcomes for specific brands under specific conditions. They are
          not a prediction for your account. Advertising performance depends on your product, margin,
          market and execution, and we do not promise a particular return. Any agency that does is
          either guessing or misleading you.
        </p>

        <h2>Submissions</h2>
        <p>
          Job applications and messages you send through this site must be accurate and your own. Do
          not submit another person&apos;s CV, confidential information belonging to a previous
          employer, or anything you do not have the right to share. We may delete submissions that are
          abusive, spam, misleading or contain malware, and we may keep a record of having done so.
        </p>
        <p>
          By submitting an application you confirm the information is yours to give and that we may
          contact you about it. Our handling of it is described in the{' '}
          <a href="/privacy">privacy policy</a>.
        </p>

        <h2>Intellectual property</h2>
        <p>
          The Flinza Works name, logo and site design belong to us. The text, layouts and code on this
          site are our copyright unless stated otherwise. Client work shown in case studies is
          displayed with permission and remains the property of the respective client; where a client
          is under an NDA the work is described by sector rather than by name.
        </p>
        <p>
          Nothing on this site grants you a licence to our trademarks, and we do not use anyone
          else&apos;s without permission.
        </p>

        <h2>Acceptable use</h2>
        <p>
          Do not attempt to gain unauthorised access to any part of this site, its database or its
          hosting; do not scrape it at a rate that degrades service for anyone else; do not submit
          automated applications or messages; and do not use the site to break any law that applies to
          you. We may block access where we reasonably believe any of that is happening.
        </p>

        <h2>Third-party services</h2>
        <p>
          Bookings are handled by Cal.com and some pages embed third-party components. Their terms and
          privacy policies apply to those parts of the experience, and we are not responsible for
          their availability or their content.
        </p>

        <h2>Availability and liability</h2>
        <p>
          We aim to keep the site available and correct, but we provide it &quot;as is&quot; and
          without warranties. To the extent permitted by law, we are not liable for indirect or
          consequential loss, or for loss of profit, revenue or data, arising from your use of this
          site. Nothing in these terms limits liability that cannot lawfully be limited, including for
          death or personal injury caused by negligence, or for fraud.
        </p>

        <h2>Indemnity</h2>
        <p>
          If you use this site in a way that breaks these terms and that causes a claim against us, you
          agree to indemnify us against the reasonable costs of dealing with it. This does not apply
          where the claim arises from something we did wrong.
        </p>

        <h2>Ending access</h2>
        <p>
          We may suspend or end access to this site, or remove a submission, at any time and without
          notice where we reasonably believe these terms have been broken. You can stop using the site
          whenever you like; the sections on intellectual property, liability and indemnity survive
          that.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws applicable at our place of business, and any dispute
          about use of this site will be handled by the courts there. If a provision is found
          unenforceable, the rest of these terms continue to apply.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms; the date below changes when we do. Continuing to use the site
          after a change means you accept the updated terms. Questions go to{' '}
          <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
        </p>

        <p style={{ marginTop: 28, fontSize: 13, color: 'rgba(9,9,11,0.45)' }}>
          Last updated: September 2026
        </p>
      </div>
    </PageShell>
  );
}
