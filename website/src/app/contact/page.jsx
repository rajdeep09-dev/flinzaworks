/*
 * /contact — server component, so the route can carry its own metadata and breadcrumb.
 *
 * The interactive page (the wordmark stage, the Get In Touch pill and the message form) is
 * unchanged and lives in `./ContactClient.jsx`.
 */

import JsonLd from '@/components/JsonLd';
import ContactClient from './ContactClient';
import { breadcrumbSchema, serviceSchema, socialMeta } from '@/data/seo';

export const metadata = {
  title: 'Contact — Book a Discovery Call',
  description:
    'Book a 30-minute discovery call with Flinza Works. We audit your funnel, creative and attribution, then return a fixed quote within 48 hours. No hourly billing.',
  alternates: { canonical: '/contact' },
  ...socialMeta({
    title: 'Contact Flinza Works — book a discovery call',
    description:
      'Tell us where growth stalled. A 30-minute call, an honest answer, and a scoped plan within 48 hours.',
    url: '/contact',
  }),
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Contact', path: '/contact' }]),
          serviceSchema({
            name: 'Ecommerce growth consulting',
            description:
              'Flinza Works works with ecommerce brands spending $50K+ a month on paid media: Meta ads, creative testing, creator-led and founder-led content, and launch clipping.',
            path: '/contact',
          }),
        ]}
      />
      <ContactClient />
    </>
  );
}
