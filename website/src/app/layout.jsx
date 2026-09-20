import './globals.css';
import Script from 'next/script';
/* Deliberately second: it carries the handful of rules that must beat declarations already set in
   globals.css or as inline styles. See the file header for what is in it and why. */
import './overrides.css';
import './hero.css';
import RouteTransition from '@/components/RouteTransition';
import SectionReveal from '@/components/SectionReveal';
import JsonLd from '@/components/JsonLd';
import { rootSchema, SITE_URL, SITE_NAME, DEVELOPER } from '@/data/seo';
import { ONE_LINER } from '@/data/stats';

/*
 * ── Metadata architecture ──
 *
 * Nothing here should be route-specific. Each route's own server component declares its own title,
 * description, canonical and Open Graph card (see app/page.jsx for the pattern), and Next merges
 * per-route metadata over this object field by field.
 *
 * `metadataBase` is what makes every relative URL in a metadata object resolve to an absolute one —
 * canonicals, Open Graph URLs, the social image. Without it Next emits relative URLs, which link
 * previewers and several crawlers will not resolve, so it is the single most load-bearing line in
 * this file. It reads NEXT_PUBLIC_SITE_URL so the production domain is configuration rather than
 * a hard-coded string.
 *
 * `openGraph.images` is deliberately NOT set here: app/opengraph-image.jsx generates a 1200×630
 * branded card at /opengraph-image, and the file convention wires it up across every route
 * automatically, including twitter:image. Declaring an image here as well would duplicate it.
 */
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ecommerce Growth Agency for DTC Brands | Flinza Works',
    template: '%s | Flinza Works',
  },
  description:
    'Flinza Works is an ecommerce growth agency for DTC brands spending $50K+ a month: Meta ads, 48-hour creative testing, creator and founder content, launch clipping.',
  applicationName: SITE_NAME,
  /* Two authors, in the order the field means: the company the site belongs to, then the person who
     designed and built it. `<meta name="author">` is a weak ranking signal and a strong entity one
     — it is one of the few places a page can name a person outright, and the name here has to be
     the same string as the Person node in the JSON-LD, the credit line in the footer and the
     colophon page. */
  authors: [
    { name: SITE_NAME, url: SITE_URL },
    { name: DEVELOPER.name, url: DEVELOPER.instagram },
  ],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    'ecommerce growth agency',
    'DTC growth agency',
    'Shopify growth agency',
    'Meta ads agency for ecommerce',
    'creative testing agency',
    'creator-led content agency',
    'founder-led content',
    'video clipping service for launches',
    'performance marketing agency',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    url: '/',
    title: 'Ecommerce Growth Agency for DTC Brands | Flinza Works',
    description: ONE_LINER,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@flinzaworks',
    creator: '@flinzaworks',
    title: 'Ecommerce Growth Agency for DTC Brands | Flinza Works',
    description: ONE_LINER,
  },
  robots: {
    index: true,
    follow: true,
    /* Everything the AI crawlers need. These are allowed on purpose: the whole point of the GEO
       work is to be quotable inside ChatGPT, Perplexity and AI Overviews, and a brand that blocks
       the crawlers cannot be mentioned by them. */
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Marketing',
  formatDetection: { email: false, address: false, telephone: false },
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
      {/* No `overflow-x` here on purpose. A single-axis overflow declaration forces the other axis
          to a scrolling value, so an inline `overflowX: 'hidden'` on the body quietly turned the
          body into a second, unscrollable scroll container nested inside the viewport — and on a
          touch device that is a page that will not move under the finger. The horizontal clip is
          owned by `body { overflow-x: clip }` in overrides.css, which clips without creating a
          scroller. */}
      <body style={{ width: '100%', minHeight: '100%', margin: 0, padding: 0, background: '#fbfcfd' }}>
        {/* The metal mark is on every page and is the first thing anyone looks for. Preloading it
            means it is decoded before the header paints, so the logo is present in the very first
            frame instead of being swapped in afterwards. React hoists this into <head>. */}
        <link rel="preload" as="image" href="/images/flinza_logo_hd.png" fetchPriority="high" />
        {/* The service panels and case-study posters are hotlinked from framerusercontent.com.
            Opening the connection during the head rather than when the first image is requested
            removes a full round trip from the critical path on every route that shows media. */}
        <link rel="preconnect" href="https://framerusercontent.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://framerusercontent.com" />

        {/* The machine-readable identity of the company — name, URL, logo, one-liner, the profiles
            it is the same entity as, the markets it serves and the founding year. This is the block
            an answer engine reads to decide who Flinza Works is, so it is emitted once, here, from
            one source (src/data/seo.js) built on the same sentence the pages render. */}
        <JsonLd data={rootSchema()} />

        {children}
        {/* Every client-side navigation gets the same branded plate with a real percent counter,
            so a route change never exposes a bare white frame and the header shaders have
            something holding the screen while their chunks arrive. */}
        <RouteTransition />
        {/* The motion between one section and the next. Mounted ONCE, here, rather than per page:
            it scans the top-level bands of <main> and gives every route the same entrance, so a
            new route cannot forget to opt in and the whole document needs one observer instead of
            one per section. See the file for the rules it plays by. */}
        <SectionReveal />
        {/* Google "preferred sources" — the standard implementation from Search Central (two
            lines: this library + the button div in SiteFooter). After a reader picks Flinza
            Works, Google is more likely to surface the site in Top Stories, AI Mode, AI
            Overviews and Discover for that reader. `afterInteractive` loads it async after
            hydration, so it never competes with the first paint; the library itself scans the
            DOM for the button attribute and renders its localized, Google-styled button. */}
        <Script
          src="https://news.google.com/swg/js/v1/publisher.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
