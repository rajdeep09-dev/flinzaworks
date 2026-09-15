import './globals.css';

export const metadata = {
  title: 'Flinza - 18 Framer Components Showcase',
  description: '18 original Framer components recreated natively with sub-script mapping in Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          {children}
        </div>
      </body>
    </html>
  );
}
