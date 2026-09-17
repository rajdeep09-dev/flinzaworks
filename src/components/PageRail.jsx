"use client";

/*
 * PageRail — the site's page navigation, pinned top-left on desktop.
 *
 * Two navigations were being asked of one header. The top bar was carrying the page routes
 * (Work, Services, Creators, About, Insights, Careers) and the metal mark had to stay optically
 * centred between them and the CTA, so the links fought the logo for the same row. The in-page
 * table of contents lives down the left margin (see PageToc), so the page routes now sit in the
 * same margin — above it — and the header is left with just the mark and the CTA.
 *
 * That gives the left edge one job: the rail at the top lists the pages you can go to, the rail
 * below it lists the sections of the page you are on. Two levels of navigation, one column.
 *
 * It renders from `usePathname()` rather than an `active` prop so it cannot disagree with the URL
 * — the header was previously passed an `active` string on some routes and nothing at all on
 * others, which is how a nav item ends up highlighted on the wrong page.
 *
 * Below 1180px it does not render: on a phone the rail would either overlap content or eat a
 * swipe, so the header's menu button owns navigation there.
 */

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ROUTES = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Creators", href: "/influencer-marketing" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

function isActive(pathname, href) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function PageRail() {
  const pathname = usePathname();
  const [shown, setShown] = React.useState(false);

  /* One frame after mount, so the rail arrives on a transition rather than popping in with the
     first paint. */
  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <nav
      className={`flinza-pagerail${shown ? " is-revealed" : ""}`}
      aria-label="Pages"
      data-count={ROUTES.length}
    >
      <p className="flinza-pagerail__label">Pages</p>
      <ul>
        {ROUTES.map((route) => {
          const active = isActive(pathname, route.href);
          return (
            <li key={route.href}>
              <Link
                href={route.href}
                className={active ? "is-active" : undefined}
                aria-current={active ? "page" : undefined}
              >
                <i aria-hidden="true" />
                <span>{route.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
