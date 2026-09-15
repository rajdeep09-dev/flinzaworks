import './globals.css';

export const metadata = {
  title: 'Flinza Works | We Test. We Scale. We Grow.',
  description:
    'Flinza Works is a data-driven ecommerce growth agency. For brands spending $50K+ monthly: 48hr creative testing, AI UGC, and profit-first performance media.',
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
      'Ecommerce growth agency: creative testing, AI UGC, and performance media built for profit.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ width: '100%', minHeight: '100%' }}>
      <body style={{ width: '100%', minHeight: '100%', margin: 0, padding: 0, background: '#ffffff', overflowX: 'hidden' }}>
        {children}
      </body>
    </html>
  );
}
