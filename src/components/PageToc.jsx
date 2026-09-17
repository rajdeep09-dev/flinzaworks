"use client";

/*
 * PageToc — the in-page section rail for every route that is not the home page.
 *
 * The home page has always had a table of contents pinned to the left margin, and no inner page
 * had one: /about, /services, /work, /insights, /careers and /contact were long scrolls with no
 * way to see their shape or jump between sections. This builds the same rail, but it discovers
 * its own entries.
 *
 * Discovery rather than a hardcoded list is the point. The inner pages each kept their own
 * section markup, and hand-maintaining a table of contents per page guarantees it drifts the
 * moment a section is added — which is exactly how the old navbar ended up with a dead "Case
 * studies" link. Here the rail is derived from the page's own headings at mount, ids are assigned
 * to headings that lack them, and the active entry is driven by an IntersectionObserver so the
 * highlight costs nothing on scroll.
 *
 * It is desktop-only on purpose. On a phone the rail would overlap content or steal a swipe
 * gesture, so below 1180px it does not render at all — the same call the home page makes.
 */

import * as React from "react";

function slugify(text, index) {
  const base = String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return `sec-${index + 1}-${base || "section"}`;
}

export default function PageToc({ label = "On this page", items: preset = null }) {
  const [items, setItems] = React.useState([]);
  const [active, setActive] = React.useState(null);
  const [revealed, setRevealed] = React.useState(false);

  React.useEffect(() => {
    const root =
      document.querySelector(".flinza-shell-main") ||
      document.querySelector("main") ||
      document.body;
    if (!root) return undefined;

    /* Two ways in.
     *
     * `preset` is for the pages whose sections are not heading-led (/contact and /careers are
     * composition-led — a ring, a role list, a form — and only one of them carries an h2 at
     * all). Those pages pass an explicit list of ids, so the rail describes the page it is on
     * without any heading being invented just to feed it.
     *
     * Otherwise the rail is derived from the page's own h2s. The page title is an h1 and is
     * skipped, so the rail never repeats the headline you are already looking at. */
    let next;

    if (preset && preset.length) {
      next = preset
        .map((entry) => ({ ...entry, el: document.getElementById(entry.id) }))
        .filter((entry) => entry.el);
    } else {
      const heads = Array.from(root.querySelectorAll("h2")).filter(
        (h) => (h.textContent || "").trim().length > 2
      );
      next = heads.map((h, i) => {
        if (!h.id) h.id = slugify(h.textContent, i);
        return {
          id: h.id,
          label: (h.textContent || "").trim().replace(/\s+/g, " ").slice(0, 26),
          el: h,
        };
      });
    }

    setItems(next.map(({ id, label: text }) => ({ id, label: text })));

    if (!next.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit && hit.target.id) setActive(hit.target.id);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: 0 }
    );
    next.forEach(({ el }) => observer.observe(el));

    const onScroll = () => {
      /* Hidden over the page head, so the rail appears once there is something to navigate. */
      const y = window.scrollY;
      setRevealed((prev) => {
        const value = y > 320;
        return prev === value ? prev : value;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = React.useCallback((event, id) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
    /* Keep the URL shareable without letting the router treat it as a navigation. */
    window.history.replaceState(null, "", `#${id}`);
  }, []);

  if (items.length < 2) return null;

  return (
    <nav
      className={`flinza-pagetoc${revealed ? " is-revealed" : ""}`}
      aria-label={label}
      data-count={items.length}
    >
      <p className="flinza-pagetoc__label">{label}</p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={active === item.id ? "is-active" : undefined}
              onClick={(event) => go(event, item.id)}
            >
              <i aria-hidden="true" />
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
