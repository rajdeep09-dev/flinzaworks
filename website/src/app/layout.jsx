import './globals.css';

export const metadata = {
  title: 'Flinza Works | We Test. We Scale. We Grow.',
  description:
    'Flinza Works is a data-driven ecommerce growth agency. For brands spending $50K+ monthly: 48hr creative testing, AI UGC, influencer marketing, and profit-first performance media.',
  openGraph: {
    title: 'Flinza Works | We Test. We Scale. We Grow.',
    description:
      'Ecommerce growth agency for brands spending $50K+ monthly. 48hr testing cycles, 34% avg ROAS lift, $500k+ spend managed.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flinza Works | We Test. We Scale. We Grow.',
    description:
      'Ecommerce growth agency: creative testing, AI UGC, influencer marketing and performance media built for profit.',
  },
};

/*
 * An explicit viewport export, because iOS Safari needs more than Next's default.
 *
 * `viewportFit: 'cover'` is what lets the page use env(safe-area-inset-*) — without it iPhone
 * content is inset from the notch, and fixed elements sit under the status bar and the home
 * indicator. `maximumScale` is deliberately left open so pinch-zoom still works, and
 * `interactiveWidget: 'resizes-content'` keeps the layout honest when the keyboard opens on
 * the careers and contact forms instead of leaving the page scrolled behind it.
 */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#eef3f5',
  colorScheme: 'light',
  interactiveWidget: 'resizes-content',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ width: '100%', minHeight: '100%' }}>
      <body style={{ width: '100%', minHeight: '100%', margin: 0, padding: 0, background: '#fbfcfd', overflowX: 'hidden' }}>
        {children}
      </body>
    </html>
  );
}
