# Flinza Works — Agent Handoff / Context

> Read this first. Everything below was learned by working on the repo, much of it the hard way.
> Site: **flinzaworks.com** · Repo: `rajdeep09-dev/flinzaworks` · Branch: `main`

---

## 1. What this repo is (TL;DR)

A **Next.js 14 App Router site for Flinza Works** (a marketing/influencer agency).
The repo is **monorepo-shaped but really two separate apps**:

| Location | What it is | Matters? |
|---|---|---|
| `website/` | **The real site.** App Router, 32 static pages, all content, all CSS, all data. | ✅ This is what users see |
| repo root (`src/`, `next.config.mjs`, …) | A **23-page Framer-components showcase app** (the original Framer export). Root `package.json` scripts just forward `dev`/`build`/`start` into `website/`. | ⚠️ Its `src/components/` are **imported by the site** (see §2), but its own pages are not deployed |

**The single most confusing thing about this repo:** shared components live at the ROOT `src/components/`, *not* `website/src/components/` (which does not exist). Wiring:

```jsonc
// website/jsconfig.json
"paths": {
  "@/components/*": ["../src/components/*"],   // ← root src/components
  "framer":        ["../src/lib/framer/index.js"], // vendored Framer runtime
  "@/*":           ["./src/*"]                    // website/src
}
```

So: site-local code → `website/src/…`, shared components + vendored Framer → repo-root `src/…`.
Data files live in **both**: `src/data/` (root, shared components) and `website/src/data/` (site pages).

**Stack:** Next `^14.2.23`, React 18.3.1, framer-motion, gsap, three ^0.170.0, lucide-react, @calcom/embed-react. **Everything is `.jsx` — there is no TypeScript and we deliberately keep it that way** (adding a `.tsx` once made Next auto-install TS and broke the build; it was reverted — see §7).

---

## 2. Hosting topology (critical — do not debug the wrong URL)

| URL | What it is |
|---|---|
| `flinzaworks.freebuff.app` | **Freebuff hosting.** Deploy with `freebuff-deploy start` (after `freebuff-deploy check`). Verified active, framework `nextjs`, mode `vercel_build`, ~41 s build. |
| `www.flinzaworks.com` / `flinzaworks.com` | The **user's real domain — served by VERCEL**, a separate project that builds from git push. Apex redirects → www. It serves the latest pushed code; verified all routes 200. |
| `fk36t-flinza.vercel.app` | **DEAD deployment** (`x-vercel-error: DEPLOYMENT_NOT_FOUND`). Seen in a user screenshot while debugging; nothing points there. **Do not debug against it.** There is no `.vercel/project.json` in the repo. |

Consequence: **every push to `main` also redeploys the live Vercel site.** Verify on `www.flinzaworks.com` (or the Freebuff preview), never on the `fk36t` URL.

`vercel.json` (root) holds the commands Vercel uses — they also document how a build works:

- install: `npm install && cd website && npm install`
- build: `cd website && npm run build && cd .. && mkdir -p public && cp -a website/public/. public/` (copies `website/public` up to root `public/` for Vercel's static handling)
- output: `website/.next`

**Freebuff preview config (already set):** install `npm install && npm install --prefix website`, dev `npm run dev` on port 30001, build `npm run build`.

---

## 3. Commands

```bash
# Install
npm install && npm install --prefix website

# Production build (run from repo root; forwards into website/)
npm run build                      # build emits 32 static pages

# Freebuff preview (managed — never start dev servers yourself)
freebuff-preview start | restart | status | logs

# Freebuff deploy (managed hosting on flinzaworks.freebuff.app)
freebuff-deploy check              # first, always — reports what hosting will run
freebuff-deploy start              # redeploy
freebuff-deploy status | logs

# Verification suite (python3, no deps; see §8)
python3 scripts/verify_hero_band.py
python3 scripts/verify_assets.py
python3 scripts/verify_client_guarding.py
python3 scripts/verify_all_chunks.py
```

### CLI rules (Freebuff)
- `freebuff-preview` / `freebuff-deploy` must be run as **their own command — never chained** after `cd … &&` or inside scripts.
- Terminal commands: 30 s default timeout, 180 s max. Builds were run as `timeout 175 npm run build`.
- The shell **sometimes wedges** with `[deadline_exceeded]` even on `echo alive` — retry; if it stays wedged, file tools (`read_files`, `write_file`, `str_replace`) keep working.
- Deploy source upload (~61 MB) **occasionally times out** with `[deadline_exceeded]` — just retry; it worked on the next attempt.

### Build gotcha: `website/.next` is shared
The preview dev server and production builds **share `website/.next`**. Running `npm run build` while the preview is running **wipes the dev chunks** → preview 404s its own JS and wedges. If you build while preview is up, finish with `freebuff-preview restart`.

---

## 4. Component & error-boundary architecture

**Background:** the site ships 14 client-only components loaded via `next/dynamic`, several with WebGL/Three.js shaders. The user hit a "client-side exception" screen on their phone. **No browser exists in the sandbox, so the exact throw was never reproduced** — SSR HTML was always fine; the fault is client-side. The fix was containment, not the root cause.

### The three layers (all shipped)

1. **`website/src/app/error.jsx` + `global-error.jsx`** — route + root boundaries ("Try again" resets, shows digest). They are `.jsx` on purpose (see §7 gotcha).
2. **`src/components/ClientBoundary.jsx`** — per-component boundary. Renders **nothing** on failure (layers are decorative) and logs
   `[ClientBoundary] "<label>" failed to render` — this is how you name the culprit in a minified build. Supports `resetKey`.
3. **Two wrapping helpers:**
   - `website/src/app/HomeClient.jsx` → `dynamicClient(path)` — wraps all **9 home-page client components** in a ClientBoundary at load time.
   - `src/components/guardedClient.jsx` → `guarded(Loaded, label)` — wraps an **already-created** dynamic component. Used at the **5 root-layout call sites**:
     - `src/components/SiteHeader.jsx` → `LiquidMetal` (metal logo; also does `import("./LiquidMetal").catch(()=>{})` prefetch)
     - `src/components/SiteGround.jsx` → `EtherealShadow`
     - `src/components/SiteFooter.jsx` → `SocialGlassRow` (loading: `SocialFallback`)
     - `src/components/CamoCtaButton.jsx` → `CamoLiquid` (also prefetches)
     - `src/components/ChromeBookButton.jsx` → `LiquidChromeButton` (contact page, opens CalModal)

   The root-layout five matter most: they sit **above** `error.jsx`, so an unguarded throw skipped every boundary and hit `global-error` → whole-document replacement. That is the entire crash saga.

### ⚠️ The `next/dynamic` gotcha
`next/dynamic` requires its **options to be an object literal**. A helper that called `dynamic(loader, options)` with a variable failed the build with *“next/dynamic options must be an object literal”*. Hence the two-helper split: create the dynamic component with a literal at the call site, then wrap it with `guarded()`.

### Verified eliminated as causes
missing `ServicesShowcase` (false lead) · framer exports all resolve · `LiquidGlassCarousel` already try/catches its WebGLRenderer · no render-phase browser reads (no hydration mismatches) · first-load JS+CSS 0.68 MB.

---

## 5. CSS architecture

Import order in `website/src/app/layout.jsx`:

```
globals.css → overrides.css → hero.css → polish.css
```

**polish.css (~5 KB) loads last and is the ONLY override surface.** Do not restructure the others.

### ⚠️ Edit-tool size limits
`hero.css` is 70.8 KB and `globals.css` is 179 KB — **they cannot be edited with the file tools** (`write_file` caps around ~62 KB; `str_replace` cannot reach past ~55 KB). Practical rules:

- New/changed styles → **append to `polish.css`**.
- `str_replace`: one file per call, short unique anchors.
- `read_files` takes plain string paths.

### Hero (current, locked-in design)
- Pre-wordmark composition: **light paper ground** (scrim `rgba(247,251,252,…)`), **dark ink type, no violet anywhere** — the user decided: *"Keep the current light paper ground, dark ink type."* Do not reintroduce the giant FLINZA wordmark or violet.
- Bottom band: paragraph left + "Scroll down" beneath it, 4 stats right.
  - ≥901 px: 4-across, `margin-left:auto` (from `hero.css:753`)
  - ≤760 px: 2×2
  - flex-row in short landscape
  - 761–900 px tablet gap covered by `polish.css`: `@media (min-width:761px){.flinza-hero-bottom .flinza-hero-stats{margin-left:auto}}`

### Tokens & typography
- Brand aqua: **`#17849B`** (`rgb(23,132,155)`). Camo palette in `src/components/CamoCtaButton.jsx`: `CAMO_DARK rgb(9,58,72)`, `CAMO_MID rgb(23,132,155)`, `CAMO_LIGHT rgb(74,178,199)`.
- **Colour is locked: do not change the main blue/aqua.**
- Fonts: `--font-ui: 'Nohemi'`, `--font-display: 'Instrument Serif'`.
- `↓` (U+2193) has **no glyph in these fonts → always use inline SVG arrows**.
- Desktop: `html{zoom:0.75}`. Shared edge token: `--flinza-rail`.

---

## 6. Assets policy (user decision: keep originals)

The user said: **keep the original files, no compression — “I want quality.”**

- 7 home-page visuals used to be fetched at runtime from `framerusercontent.com`. They were downloaded **uncompressed** and self-hosted:
  - `website/public/images/vendored/`: `ethereal-shadow.jpg`, `camo-icon.svg`, `story-1..4.jpg`
  - `website/public/videos/vendored/`: `story-reel.mp4` (1.7 MB)
  - **Mirrored to root `public/`** (keep both in sync).
  - Updated components: `src/components/CamoLiquidButton/index.jsx`, `src/components/EtherealShadow/index.jsx`, `src/components/FramerStory/index.jsx` (`defaultImages`/`defaultVideo` now point at `/images/vendored/…`, `/videos/vendored/…`).
- Remaining ~20 MB of unoptimized originals — **deliberate, do not compress**: `hill_logo_2k.png` (4.1 MB), `hero-silhouette.png` (1.7 MB), 3 avatars ~1.3 MB, 3 MP4s.
- `vibe_images/` (2.6 MB) is provably unreferenced duplicate — could be deleted, left alone so far.
- Hero photo resolution: `website/src/app/page.jsx` → `findHeroPhoto()` **prefers `hero-silhouette.webp` (28 KB) over the `.png` (1.7 MB)**; both exist and serve 200.

---

## 7. Build gotchas (cheat sheet)

1. **`.jsx` only.** No TypeScript. Once created `error.tsx` → Next auto-installed TS mid-build and broke it. Reverted to `.jsx`. Keep it that way.
2. **`next/dynamic` options must be an object literal** (see §4).
3. **`.next` sharing** — never build while preview runs without restarting the preview after (see §3).
4. **Shared components at root `src/components/`**, imported as `@/components/*` from website (see §1).
5. Pre-existing, harmless build warning: vendored Framer bundle → *"Critical dependency: the request of a dependency is an expression."*
6. Shell wedge / upload `deadline_exceeded` → retry (see §3).

---

## 8. Verification scripts (`scripts/`, committed, `python3`, no deps)

| Script | What it proves |
|---|---|
| `verify_hero_band.py` | Parses prerendered HTML + the 3 stylesheets, resolves the cascade (last-match-wins, handles min/max-height media queries) across **21 viewports (320–2560 px)**; includes a 12-case resolver self-test. **PASS** as of last run. |
| `verify_assets.py` | All **36 referenced assets** (HTML/CSS/bundles) return **200 on the live site**; handles absolute `framerusercontent.com` URLs correctly. (Earlier versions produced fake 404s by testing URL path-tails locally and a false all-clear from wrong path indexing — both fixed; don't reintroduce that logic.) |
| `verify_client_guarding.py` | Self-test + source scan proving every `dynamic()` in `src/components/*.jsx` is wrapped in `guarded()` and labels are present in the emitted bundle. Reported 5 unguarded at the previous commit, **0 now**. |
| `verify_all_chunks.py` | Chunk-integrity diagnostic for the build output. |

**Verification reality:** there is **no browser in the sandbox** and no screenshots possible. Verification = built HTML + resolved CSS cascade + live `curl` checks + these python checkers. Check live routes with curl on `www.flinzaworks.com`.

---

## 9. Site facts

### Routes (32 built pages)
`/`, `/about`, `/careers`, `/colophon`, `/contact`, `/influencer-marketing`, `/insights` (+5 slugs), `/questions`, `/privacy`, `/services` (+5 slugs), `/terms`, `/work`, `/llms.txt`, `/llms-full.txt`, `/sitemap.xml`, `/robots.txt`, `/_not-found`; dynamic `/api/{applications,bookings,messages}`; `/opengraph-image`.

- Sitemap: **22 URLs** (the 23rd built page is `/_not-found`, correctly excluded).
- Nav (header + footer): **Work, Services, Creators (`/influencer-marketing`), About, Insights, Questions, Careers**.

### Data files
- `website/src/data/questions.js` — **55 Q&As, 8 clusters, 8 comparison tables**; source of truth for the `/questions` hub **and** its FAQPage JSON-LD (verified byte-identical to the visible answers after HTML-entity unescape). Cluster pages cross-link to service pages.
- `src/data/` (root, used by shared components): `stats.js` (STATS + POSITIONING), `projects.js` (carouselProjects), `stories.js` (founderStories), `proofband.js` (PROOF_CAPABILITIES, PROOF_CARDS), `serviceCards.js` (row1Cards, row2Cards), `testimonials.js` (withCaseStudyTestimonial), `faqs.js` (faqItems), `team.js` (TEAM + FOUNDER), `seo.js` (Person/Organization schema).
- SEO routes: `/llms.txt` + `/llms-full.txt` (`website/src/app/llms.txt/route.js`, `llms-full.txt/route.js`); team schema in `src/data/seo.js`. Title/description audit across all 22 pages is clean.

### Key files when touching the hero
`website/src/app/HomeClient.jsx` (hero markup, `flinza-hero-*` classes, dynamicClient) · `website/src/app/page.jsx` (findHeroPhoto) · `hero.css` (read-only, sizes) · `polish.css` (your override surface).

---

## 10. Open items (things an agent should know are unresolved)

1. **The original client-side crash was never root-caused** — no browser in the sandbox. The boundaries contain it. The user was asked for the console line; the boundary log `[ClientBoundary] "<label>" failed to render` would name the culprit. If they ever provide it, fix the component and the containment can stay as belt-and-braces.
2. **`index.html` at repo root is untracked and uncommitted** — a standalone **Heritage Grove footer** one-file spec page (teal ink landscape video bg, Cormorant Garamond/Poppins; template compliance verified, both CloudFront media URLs live). It was an explicit standalone deliverable from a previous turn. **Next.js ignores it; it would NOT be served by the website app.** Do not stage it with unrelated commits unless the user asks.
3. **~20 MB of unoptimized originals** are in the repo on purpose (user wants quality). If the user ever asks about performance, the honest answer is "we kept the originals at your request; say the word and we'll compress."
4. **Deploy source upload can time out** (~61 MB) — retry; it has always worked on the second attempt.

---

## 11. Git / delivery conventions (this project)

- Freebuff injects a **short-lived GitHub App credential** per git/gh command. Never ask the user for PATs/SSH, never rewrite the remote. Just run git normally.
- Branch: `main`. **Always push after every fix.**
- Commit message style: say *what was wrong / what changed and why / how verified*, ending with:

  ```
  🤖 Generated with Codebuff
  Co-Authored-By: Codebuff <noreply@codebuff.com>
  ```
- **Stage only files for the current request.** Pre-existing untracked files (e.g. `index.html`, §10.2) stay out of unrelated commits.
- A push to `main` redeploys the user's Vercel domain (§2) — treat pushes as deploys.

---

## 12. History snapshot

Twelve commits on `main` at the time of writing; most recent:

```
f6c9789  Bound the five client components that render from the root layout
8167a0c  Self-host the seven assets the home page was fetching from a third party
a288f9a  Every client-only component gets its own boundary, so the hero cannot be taken down
7b319f2  Two error boundaries, so one failing component cannot take down the page
9e58f9d  A public answers hub: 55 questions, and the comparisons to go with them
f06ace7  Hero: the giant FLINZA is gone, and the figures reach the right edge
d4cd74c  The audit said the site is quotable and not findable
```

State verified live after `f6c9789`: all routes 200 on `www.flinzaworks.com`, hero elements present in served HTML (`flinza-mark-still` / `flinza-hero-photo` / `flinza-hero-claim`, once each), 36 assets 200, Freebuff deploy `active` (41 s build, `unresolvedBuildErrorCount: 0`).
