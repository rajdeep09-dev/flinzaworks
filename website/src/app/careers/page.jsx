/*
 * /careers — server component.
 *
 * The one reason this route needed splitting beyond metadata: JobPosting structured data. It is
 * what makes an open role eligible for Google Jobs, it has to be emitted by a server component, and
 * it has to be built from the same role list the page renders — which is why that list moved to
 * `@/data/roles`.
 *
 * Each posting is generated, so adding a role to the data file publishes it to the page and to the
 * structured data in the same commit. `jobPostingSchema()` returns null for an incomplete entry and
 * `JsonLd` drops nulls, so a half-written role cannot emit an invalid block that fails validation
 * across the whole page.
 */

import JsonLd from '@/components/JsonLd';
import CareersClient from './CareersClient';
import { roles } from '@/data/roles';
import { breadcrumbSchema, jobPostingSchema } from '@/data/seo';

export const metadata = {
  title: 'Careers — Join the Talent Pool',
  description:
    'Open roles at Flinza Works: paid media, creative strategy, creator partnerships, analytics and clipping. Remote-first, or join the talent pool in 30 seconds.',
  alternates: { canonical: '/careers' },
  openGraph: {
    title: 'Careers at Flinza Works — join the talent pool',
    description:
      'Paid media, creative strategy, creator partnerships and clipping. Remote-first, no account-manager relay, and a reply within three business days.',
    url: '/careers',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers at Flinza Works — join the talent pool',
    description:
      'Paid media, creative strategy, creator partnerships and clipping. Remote-first, and we read every application ourselves.',
  },
};

export default function CareersPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Careers', path: '/careers' }]),
          ...roles.map((role) => jobPostingSchema(role)),
        ]}
      />
      <CareersClient />
    </>
  );
}
