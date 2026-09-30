# ForeShift v1 React Port — Team Rules (set by the lead designer; non-negotiable)

Goal: the React app must be **visually and behaviourally identical** to the Webflow export's
`index.html` — every section, every breakpoint (1440 / 991 / 767 / 479), every animation — and hit
Lighthouse Performance 100 and Accessibility 100.

## Scope (already decided by the lead — do not revisit)
This Webflow export folder contains many pages (`about-us.html`, `pricing.html`, `features.html`,
`contact-us.html`, `integrations.html`, `terms-conditions.html`, `changelog.html`, `licenses.html`,
`style-guide.html`, `404.html`, `401.html`, `detail_*.html`, `gsap-guide.html`). **Only `index.html`
is real** — it is a self-contained one-page site (its own nav only has in-page anchors, e.g.
`#Features-Section`). Every other file is unedited "HelloBot" chatbot-template placeholder content
never linked from the real page. **Do not port them.** The React app is a single page.

## Sources of truth
- `reference/original/index.html` — raw Webflow export.
- `reference/rendered/index.html` — the DOM after webflow.js + Lenis + GSAP ran once, for runtime reference.
- `reference/original/js/webflow.js` — IX2 + IX3 interaction definitions.
- `reference/ix-data.js` — the tail of webflow.js from `Webflow.require("ix3")` onward (IX3 registration + IX2 `init({events,...})`), for the interactions agent.
- `src/styles/site.css` — exported Webflow CSS, **includes design tokens in `:root`** (--shift-light, --fore-dark, --color-primary, etc.)

## Styling (STRICT)
1. All styling comes from GLOBAL stylesheets imported by `src/styles/index.css`. Reuse Webflow class names verbatim.
2. Do NOT edit `normalize.css`, `webflow.css`, `site.css`.
3. No inline `style={{}}` for design, no CSS modules, no Tailwind, no hardcoded colors/sizes in JSX.
4. Non-animation inline styles or embedded `<style>`/w-embed CSS → move into `src/styles/globals.css` as a class, using `:root` tokens where a token matches.
5. Webflow's animation initial-state inline styles (opacity/transform on `data-w-id` elements, the head `<style>` visibility-hidden block) must NOT be copied into JSX — the interactions engine (`src/animations`) owns those.

## Markup (STRICT)
- Port markup 1:1: same elements, nesting, classes, ids (incl. `w-node-…`), text, `srcset`/`sizes`/`loading`/`width`/`alt`.
- KEEP `data-w-id` and `data-wf-target` attributes exactly. In JSX, `data-wf-target` is a plain string of the decoded JSON.
- Image paths: `images/x.avif` → `/images/x.avif` (served from `public/`).
- Section ids used by nav/footer anchors — keep exactly: `Hero-Section`, `Challenge-Section`, `Features-Section`, `How-it-Works-Section`. The footer's own href originally said `#Challenges-Section` (with an s), which doesn't match `Challenge-Section` — a real typo present on the live Webflow site too. Fixed in `src/config/site.js`'s `FOOTER_LINKS` (2026-09-23, at Umar's request) rather than ported verbatim.
- Shared chrome (`Navbar.jsx`, `Footer.jsx`) is already built by the lead — don't edit it; report issues instead.
- Repeated blocks (marquee rows, testimonial slide items, feature/step cards) → small components/data arrays as long as output DOM matches exactly.
- Form: keep Webflow markup/classes; wire submit UX (success/fail toggling like Webflow's `w-form-done`/`w-form-fail`) without jQuery — this form has no backend, so simulate success like a static Webflow form would (no fetch call needed unless the lead says otherwise).

## Content correction (already applied by the lead — do not revert)
The page's `<script type="application/ld+json">` schema block in the original still says
"HelloBot" and includes fabricated 5-star reviews for a chatbot product — leftover template
data never customized. The lead already replaced it in `index.html` with accurate ForeShift
data and no fabricated reviews. Leave that alone; it's outside the porting scope (head-only, no
visible page content).

## Known idiosyncrasies to preserve exactly
- Two GSAP+ScrollTrigger loads exist in the export (Webflow's own from `cdn.prod.website-files.com`
  gsap 3.15.0, and a second manual one from `cdnjs` gsap 3.12.7 used only by the custom Lenis
  script). This is a real quirk of the source, not a mistake to "fix" — the interactions agent
  handles GSAP/Lenis; page-building agents should ignore it.
- The page uses **Lenis** (`unpkg.com/lenis@1.3.23`) for smooth scrolling, config
  `{ duration: 1.0, smoothWheel: true, smoothTouch: false }`, wired to GSAP ScrollTrigger's ticker.
  This changes scroll physics vs a plain page — owned entirely by the interactions agent.

## File ownership (avoid collisions — only touch your files)
| Agent | Owns |
|---|---|
| Section A (Hero, Challenge, Testimonial slider) | `src/components/sections/Hero.jsx`, `Challenge.jsx`, `ProblemExamples.jsx` (was `TestimonialSlider.jsx`, replaced by static cards per the client review), `src/styles/globals.css` §HeroChallengeSlider (clearly commented block) |
| Section B (Features, Integrations/marquee) | `src/components/sections/Features.jsx`, `Integrations.jsx`, data arrays under `src/components/sections/` as needed |
| Section C (How it Works, Form, Footer content) | `src/components/sections/HowItWorks.jsx`, `EarlyAccessForm.jsx` (Footer.jsx is shared, already built — don't touch) |
| Interactions | `src/animations/**`, `src/styles/interactions.css` |
| Performance (phase 2) | build config, `index.html` (perf-only attrs), image/font pipeline, `scripts/lighthouse.mjs`, `vercel.json` |
| Lead | shared config, `App.jsx`, `Navbar.jsx`, `Footer.jsx`, `main.jsx`, `index.css` |

If two agents would otherwise touch the same CSS file, each must add ONLY a clearly-commented
section for their own components, appended, never editing another agent's block.

## Servers (already running — do NOT start/stop them, do NOT run `vite build` during phase 1)
- Original export: http://localhost:5500 (index.html only matters)
- React dev server: http://localhost:5173
- Parity check: `REACT_BASE=http://localhost:5173 node scripts/parity.mjs [--widths=1440,991,767,479]`
  → writes `parity/<width>/{original,react,diff}.png`. Inspect the PNGs (Read tool) — heights must match, diff ~0.

## Definition of done (report back with evidence)
- Parity at all 4 widths: heights equal, diff pixels listed per width, remaining diffs explained.
- No console errors/warnings from your code in the dev server.
- `npx oxlint src/<your files>` clean.

## Update — client marketing review (2026-09-29)
Supersedes the 1:1 Webflow parity rules wherever they conflict. The client's "Marketing Page Design
Review & Feedback" asked for new copy, static content and SEO changes, so: the IX3 reveal/marquee
timelines and `src/styles/interactions.css` were removed (content is visible without scroll
animation; Lenis + circle parallax remain and are skipped under `prefers-reduced-motion`); the
testimonial slider became static cards (`ProblemExamples.jsx`); the slogan marquee became a real-text
sample outlook (`Integrations.jsx`). `scripts/prerender.mjs` now prerenders every route in
`PAGE_META` and writes sitemap/robots/JSON-LD for production only (non-production builds are
`noindex`). Add new pages to `ROUTES` + `PAGE_META` in `src/config/site.js`.
