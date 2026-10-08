# ForeShift Marketing Site: Design Specification

Status: reflects the code as built (React 19 + Vite, static prerender). Source of truth for tokens is
`src/styles/site.css` (`:root`) plus `src/styles/globals.css` (accessibility overrides and additions).
Copy is governed by the client doc "Marketing Page Design Review & Feedback". Where this file and
that doc disagree on punctuation, see section 12.

---

## 1. Brand and product positioning

- **Product:** ForeShift, restaurant demand intelligence. It forecasts expected demand for a restaurant concept in a defined city trade area ("zone"), by day and service period, and explains the weather and event signals behind it.
- **Category label (hero):** "Demand intelligence for restaurants".
- **Core differentiator:** "No POS connection required."
- **Market:** Detroit, Michigan only today. Never imply nationwide availability.
- **Voice:** plain, calm, operator-focused. Short declarative sentences. Hedged where the product is an estimate ("may influence", "expected", "illustrative"). No hype, no unsupported numbers, no promises of automatic learning, inventory or purchasing recommendations.
- **Do not use:** em dashes (project rule), "Try Now", "Try Yourself", "Sign Up", "Get Started" (capital S), "Dead / Slow / Steady / Busy / Slammed" (not the app's category names), invented ratings, cover counts, satisfaction or uplift figures.

## 2. Design principles

1. **Readable product first.** Show real, legible product examples (close-up screenshot, text-based sample outlook), never decorative mockups that hide the product.
2. **Honest illustration.** Every staged image or data block carries a caption ("Illustrative example." or "Sample outlook: illustrative data.").
3. **One action, one label.** Every signup CTA says "Get started" and goes to the production sign-up URL.
4. **Content visible by default.** No content hidden behind scroll-triggered reveals; animation is decoration only.
5. **Calm density.** Generous but not excessive whitespace (desktop section padding trimmed to 72px).
6. **AA contrast.** Small text uses the accessible blue and gray tokens, not the raw brand tokens.

## 3. Design tokens

### 3.1 Colors

| Token | Value | Use |
|---|---|---|
| `--heading-color` / `--color-dark` | `#1a202c` | Headings, strong text, hover text |
| `--text-color` / `--color-secondary` | `#718096` | Legacy body gray (4.02:1 on white, large text only) |
| `--nav-link-accessible` | `#636f86` | Accessible gray for small body text, nav links, captions (AA on white and pale bands) |
| `--shift-light` | `#027ffc` | Brand blue, accent words in headings, hero accent spans |
| `--shift-light-accessible` | `#0270df` | Button fills, eyebrow text, links, step badges (4.79:1 with white text) |
| `--color-primary` / `--subtitle` | `#0084ff` | Icons, chart bars, large decorative blue (3.66:1 on white, never small text) |
| `--fore-dark` | `#011342` | Deep navy, link hover |
| `--color-background-light` | `#eef4ff` | Eyebrow pill fill |
| `--color-background-section` | `#f8faff` | Alternating section band, cards-on-band, driver rows |
| `--color-white` / `--white` | `#fff` | Cards, base page, CTA button |
| `--color-border` | `#e5e7eb` | Card and input borders |
| `--color-success` | `#16a34a` | Reserved |
| `--color-warning` | `#f59e0b` | Reserved |
| Hero background | `#f2faff` + `hero-illustration-2.avif` | Hero wrapper |
| Challenge section bg | `#f8fafb` | Problem section |
| Info body gray | `#616975` | `.info-lead`, `.info-body` (18px copy) |
| Navbar bg | `#fffc` (white 80%) + 5px blur, 1px `#e2e8f0` bottom border | Sticky nav |
| Card outline (problem cards) | `2px #1a73e8` | `.f-testimonial-card` |
| Eyebrow border | `#cfe0ff` | Hero category pill |
| Body text default | `#333` | Fallback only; components set their own |

Contrast notes: raw `#027ffc` with white text is 3.86:1 and fails AA at button size, so button fills use `--shift-light-accessible`. Raw `#718096` on `#f8faff` is 3.84:1, so nav text uses `--nav-link-accessible`.

### 3.2 Typography

- **Primary family:** Plus Jakarta Sans (self-hosted woff2, `/public/fonts`, preloaded), fallback `sans-serif`. Weights shipped: 400, 500, 600, 700. Montserrat 600 is also shipped.
- **Body default:** 14px / 20px, weight 500.
- **`--font-heading` token is Georgia (serif) but is not used by any page heading.** All headings render in Plus Jakarta Sans. Do not introduce serif headings.
- **Token scale:** `--font-size-small` 14px, `--font-size-body` 16px, `--font-size-h4` 20px, `--font-size-h3` 28px, `--font-size-h2` 40px, `--font-size-h1` 64px.
- **Case rule:** copy is rendered exactly as written in the doc. No `text-transform` on user-facing text (the hero eyebrow and POS note had `uppercase` removed). Do not re-add `uppercase` or `capitalize` to nav links or labels.

| Role | Class | Desktop | ≥1440 | ≤991 | ≤479 | Weight | Notes |
|---|---|---|---|---|---|---|---|
| Hero title (h1) | `.hero-title` | 72/78 | 74px | 48/60 | 30/40 | inherits | Centered, `--heading-color`, 80px side padding (0 at ≤991). Accent words `demand` and `open.` in `--shift-light` |
| Hero subtitle | `.hero-subtitle` | 20/28 | 22px (25px at ≥1920) | same | 16px | 500 | `--text-color`, 220px side padding (200 at ≥1280, 230 at ≥1440, 0 at ≤991) |
| Section heading | `.chatbot-heading` | 42/56 | 50px | 36/46 | 24/37 | 600 | Centered, Challenge heading |
| Feature title | `.featured-card-title` | 44/52, .5px tracking | 48px | 36/46 | 26/36 | 600 | Width 80% (100% at ≤991) |
| CTA title | `.cta-title` | 56/70, .5px tracking | n/a | 36/46 | n/a | 600 | White on image |
| CTA body | `.cta-text` | 20/28 | n/a | n/a | n/a | 500 | `#fffefe` |
| Info heading | `.info-heading` | 40 / 1.2 | n/a | n/a | n/a | 600 | Blue accent word via `.text-span-19` |
| Info lead / body | `.info-lead`, `.info-body` | 18/28, 18/30 | n/a | n/a | n/a | 500 | `#616975` |
| Info card title | `.info-card-title` | 22 / 1.3 | n/a | n/a | n/a | 600 | |
| Info card text | `.info-card-text` | 16 / 1.6 | n/a | n/a | n/a | 500 | `--nav-link-accessible` |
| Eyebrow pill | `.hero-eyebrow` | 14px, .02em | n/a | n/a | n/a | 500 | Sentence case |
| POS note | `.hero-pos-note` | 16px | n/a | n/a | n/a | 600 | `--shift-light-accessible` |
| Caption | `.illustration-caption` | 13 / 1.4 | n/a | n/a | n/a | 500 | Centered, `--nav-link-accessible` |
| Legal h2 | `.legal-body-container h2` | 20 / 1.4 | n/a | n/a | n/a | 600 | |
| Legal body | `.legal-body-container` | 16 / 1.6 | n/a | n/a | n/a | 500 | |
| Pricing price | `.pricing-card-price-amount` | 40px | n/a | n/a | n/a | 700 | |
| Pricing name | `.pricing-card-name` | 22px | n/a | n/a | n/a | 600 | |

Heading accent pattern: one meaningful word or phrase per heading wrapped in a span colored `--shift-light` (hero: `demand`, `open.`; Challenge: `busy`, `quiet`; Features: `local demand.`, `concept and location.`; Integrations: `decisions`; CTA: `demand ahead.`). Accent never carries meaning alone.

### 3.3 Spacing

`--spacing-small` 16px, `--spacing-medium` 24px, `--spacing-large` 40px, `--spacing-section` 80px.
Section vertical rhythm (desktop ≥992px): `.featured-wrapper`, `.integration-wrapper`, `.customer-engagement-wrapper`, `.call-to-action-wrapper` use 72px top and bottom; Challenge bottom 40px; `.info-section` 72px top/bottom, 64px sides; pricing and legal sections use 80px (`--spacing-section`) top/bottom, 64px sides, 48px/20px at ≤479px. Hero: 100px top, 0 bottom (60px at ≤991, 40px at ≤479), 20px sides. Feature card row gap 72px.

### 3.4 Radius, borders, shadows

- Radius: `--border-radius-default` 12px (buttons, cards, driver rows), `--border-radius-large` 16px (pricing, info and sample-outlook cards), `--border-radius-pill` 999px (step badges), nav button 130px, nav hover pill 100px.
- Card border: 1px `--color-border`. Problem cards: 2px `#1a73e8`.
- Shadows: sample outlook and alt-band info cards `0 1px 24px 5px #0055ff14`; problem cards `23px 23px 64px -16px #393b6a1c`; nav pill hover `0 .5px 5px #7180961a, 0 7.44px 9.46px #0000001a, inset 0 1.35px .68px #fff3, 0 1.35px 1.35px #0000001a`.

### 3.5 Breakpoints

Desktop-first. `≥1920`, `≥1440`, `≥1280` scale type up; `≤991` (tablet: single column grids, nav collapses), `≤767`, `≤479` (mobile: 20px page gutters). Parity was verified at 1440 / 991 / 767 / 479. Mobile page gutter is at least 16px; no horizontal page scroll.

## 4. Layout system

- **Containers:** `.w-layout-blockcontainer` max 940px centered; `.info-container` 1100px (`--wide` 1200px, `--narrow` 800px, `--center` text-align center); pricing grid max 1200px; legal body max 900px; sample outlook max 960px; hero content max 1440px.
- **Grids:** problem examples 3 columns (1 at ≤991), pricing 3 columns (1 at ≤991, max 500px), steps 3 columns, `.info-grid--two` 2 columns, `.info-grid--one` single 480px column, sample outlook `3fr 2fr` (1 column at ≤991). Grid gap `--spacing-medium` (24px) unless noted.
- **Banding:** sections alternate white and `--color-background-section` (`.info-section` / `.info-section--alt`) to separate content without heavy dividers.
- **Anchors:** `#Sample-Outlook, #Product-Section, #How-it-Works-Section, #Coverage-Section, #Pricing-Section, #FAQ-Section, #Features-Section` use `scroll-margin-top: 100px` to clear the sticky navbar. Section id `Challenge-Section` (singular) is correct; the old `#Challenges-Section` link was a bug.

## 5. Components

### 5.1 Navbar
- Sticky, full width, `#fffc` with 5px backdrop blur, 1px `#e2e8f0` bottom border, padding 15px 40px (20px at ≤991, 0 at ≤767).
- Items in order: logo (links home), **Product · How it works · Coverage · FAQ · Sign in · Get started** (Contact us is in the footer only).
- Product and FAQ jump to home-page sections; How it works and Coverage open their own pages; Sign in goes to `https://app.foreshift.ai/sign-in`; Get started to `https://app.foreshift.ai/sign-up`.
- `.nav-link`: padding 10px 15px, text `--nav-link-accessible`. Hover and current (`w--current`, `aria-current="page"`) show a pill: `#fbfbfb` fill, 1px `#e2e8f0` border, 100px radius, text `--heading-color`.
- "Get started" in the nav is `.rt-main-button-2`: fill `--shift-light-accessible`, white text, 130px radius, 15px 30px padding, 14px/600; hover inverts to transparent with theme-blue border and text.
- Mobile: hamburger (`.menu-button`), collapses at ≤991 (`data-collapse="medium"`).

### 5.2 Buttons
| Variant | Class | Spec |
|---|---|---|
| Primary | `.get-started` | Fill `--shift-light-accessible`, white text, 1px `#007bff` border, 12px radius, padding 16px, 17px/600; hover fill `#195ea8`, border `#61a5ee`, scale 1.02 over .2s |
| Secondary | `.contact-us` | White fill, 1px `#e2e8f0` border, `--heading-color` text, 12px radius, 16px/600; hover scale 1.02 |
| On dark CTA | `.cta-button` | White fill, `--heading-color` text, .5px tracking, 12px radius, padding 12px 16px, 17px/600, line-height 26px; hover scale 1.02 |
| Nav | `.rt-main-button-2` | See 5.1 |

Rules: the single signup label is `CTA_LABEL = 'Get started'` (in `config/site.js`). External links open in a new tab with `rel="noopener"`. Hero button gap 24px, 60px above. Transforms are disabled under reduced motion.

### 5.3 Hero
Order: eyebrow pill → h1 → subtitle → "No POS connection required." → button pair → screenshot → caption.
- Eyebrow `.hero-eyebrow`: inline-block pill, `--color-background-light` fill, 1px `#cfe0ff` border, 12px radius, 12px 22px padding, accent-blue text.
- Image: close-up Daily Outlook screenshot (`hero-outlook-screenshot.webp`, 1586x992, responsive `srcSet` 500/800/1080/1586), width 85% (100% at ≤991), `loading="eager"` + `fetchPriority="high"` (LCP). Alt text describes demand by daypart, chart and drivers. Caption: "Sample outlook: illustrative data." (12px above, 40px below).
- Background: `#f2faff` with `hero-illustration-2.avif`.

### 5.4 Challenge (problem) section
- Background `#f8fafb`, 100px vertical padding (bottom 40px on desktop), decorative circle clusters left and right (`.spark-hold-circles-2`, static in the final state).
- Heading "Plan for the busy shifts." / "Prepare for the quiet ones." (two lines, `busy` and `quiet` accented) and description.
- **Three static example cards** (`ProblemExamples`): unexpected event activity, excess prep, quieter service. Each: 60px icon, h3 (22px), one sentence. Card: white, 2px `#1a73e8` border, 12px radius, 40px 24px padding. No slider, no arrows.

### 5.5 Feature blocks (`Features`)
Three alternating text/image rows in `.featured-card-wrapper`: "See what is shaping local demand." → "Built around your concept and location." → "Run every Shift with fewer surprises." Left/right text container with `.featured-card-title` and `.featured-card-text`; image in `.featured-card-right-container` with `.illustration-caption` "Illustrative example.". Images are AVIF with 500/800/1080 variants, lazy loaded.

### 5.6 Integrations / sample outlook
- Heading "Demand insights for the decisions ahead." + body, then **`SampleOutlook`**: a real-text card replacing the old moving ribbons.
  - Container: white, 1px border, 16px radius, 24px padding, soft blue shadow, max 960px.
  - Label (`.sample-outlook-label`, sentence case): "Sample outlook: illustrative data".
  - Left: seven day bars (Mon-Sun) in `--color-primary`, five relative levels (20/40/60/80/100% height with graduated opacity .35 → 1), 180px tall, 12px gap (6px at ≤479), day names 14px. Right: driver list rows (`--color-background-section` fill, 12px radius) with bold driver name and gray detail.
  - Levels are relative, unlabeled by the retired category names, and show no numbers.
- Then the "Get started" button.

### 5.6b Interactive sample outlook (iframe)
Between the feature rows and "Demand insights for the decisions ahead." (`SampleOutlookFrame`). A browser-style window (16px radius, 1px border, soft blue shadow, max 1320px) with a decorative top bar (three dots and the URL `app.foreshift.ai/sample-outlook`) around an iframe of the live app sample (`EXTERNAL.sampleOutlook`). Iframe height 760px desktop, 760px tablet, 680px phone, lazy loaded, sandboxed (`allow-scripts allow-same-origin allow-forms allow-popups`). Caption: "Sample outlook: illustrative data." plus an "open it in a new tab" link. The app page opens with a "Sample" banner containing a Sign in button; the iframe is pulled up inside a clipping `.sample-frame-viewport` (crop 109/153/209/229/249px by frame width, measured against the live page) so the banner is out of view. Re-measure the crops if the app's header changes. All screens: the iframe starts behind a transparent "Click to explore the sample" ("Tap" on touch) gate so touch swipes and the mouse wheel scroll the page instead of being trapped by the frame; once activated the bar shows a "Done" button that restores the gate. Visible frame height is `min(760px, 80svh)` (75svh tablet, 72svh phone). Depends on the app page staying framable (no `X-Frame-Options` / `frame-ancestors` block). Replaces the earlier static screenshot.

### 5.7 Product overview (`ProductOverview`)
Heading with accent words, then cards: See what's Coming · Understand Why · Plan with better context · Compare it with Reality ("Record how busy service felt and note unusual conditions."). Each has an illustration and "Illustrative example." caption. The AI card reads "AI explains the demand outlook in plain language, helping you understand what may drive a busy or quiet period for your restaurant."

### 5.8 Steps (home) and detail steps (page)
- Home: `.steps-grid` 3 columns of `.info-card.step-card`; `.step-number` is a 44px circle, `--shift-light-accessible` fill, white 20px/700 numeral, `aria-hidden`. Titles: **Add your location and concept** · **Set your operating hours** · **Explore your demand outlook**.
- Page (`/how-it-works`): `.detail-steps` vertical list, number badge left, "what you provide" lines per step.
- Links beneath: "See the full walkthrough", "Insights without a POS connection" (`.info-link`).

### 5.9 Coverage
- Home teaser: "Available in Detroit, Michigan." Dedicated page: supported markets (single 480px card, status "Available now"), supported concepts as a check list (Breakfast / Brunch Cafe, Casual Dining, Cocktail Lounge, Coffee Shop, Fast Casual, Fine Dining, Neighborhood / Casual Bar, Sports Bar, Upscale Casual, and any others in `COVERAGE.concepts`), "How your address is matched", and "If your address is outside a supported market" (no outlook is produced; buying a plan does not extend coverage; invite to email hello@foreshift.ai).
- Check icon: `CheckIcon`, `.pricing-check-icon`, `--color-primary`.

### 5.10 Pricing
Three equal cards (Event Intelligence $99, Dynamic Scheduling $199, Sales Forecasting $299, USD per month, each tier includes the one below). Card: white, 1px border, 16px radius, 40px 24px padding. Name 22/600, tagline 14/500 accessible blue, price 40/700 + "/month" in accessible gray, check list at 14px. Home shows a compact version (name, tagline, price, link); `/pricing` shows full features and a "Get started" button per plan. Section background `--color-background-section`.

### 5.11 FAQ
Six questions, answered directly, in this order: Do I need a POS connection? · What does ForeShift forecast? · How do weather and events affect the outlook? · How does AI help? · Where is ForeShift available? · What does it cost? Rendered by `FaqList` (accessible disclosure list). Text is mirrored word for word in the FAQPage JSON-LD.

### 5.12 Final CTA
`.call-to-action-wrapper`: `cta-background.avif` cover, white text, 72px vertical padding (100px base). Heading "See the demand ahead." (`demand ahead.` accented), body "Explore your restaurant's outlook and the local signals behind it.", button "Get started" (white `.cta-button`).

### 5.13 Footer
Background `footer-background.avif` (cover), padding 60px 40px 20px, columns (30% each) for logo, nav links (Product, How it works, Demand insights without a POS, Coverage, Pricing, FAQ), legal links (Terms & Conditions, Privacy Policy, Refunds & Cancellations, Eligibility & Restrictions) and contact (phone, support@, hello@). The phone number is a placeholder and must be replaced before launch.

### 5.14 Legal pages
`PageHero` (reuses Challenge visuals) + `.legal-body` (max 900px, 80px/64px padding). h2 20px/600 with 48px top margin; links `--color-primary`, underlined; strong text `--heading-color`.

## 6. Pages and routing

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | All sections in order below |
| `/how-it-works` | How it works | Step-by-step detail, what you provide at each step |
| `/demand-insights-without-pos` | No POS | Explains demand-by-area forecast, optional CSV upload, no live POS link |
| `/coverage` | Coverage | Markets, concepts, unsupported-address behavior |
| `/pricing` | Pricing | Full plan detail |
| `/contact` | Contact us | Validated form that emails support@ and hello@ via Resend (`/api/contact`) |
| `/terms-and-conditions`, `/privacy-policy`, `/refunds-cancellation`, `/eligibility-restrictions` | Legal | Stripe checklist and trust |

Home section order: Hero → Challenge → Problem examples → Features → Integrations (sample outlook) → Product overview → Steps → Coverage teaser → Pricing → FAQ → Final CTA. Dedicated pages must not duplicate home text; home sections summarize and link out.

## 7. Imagery and iconography

- Formats: AVIF for illustrations (with `-p-500/800/1080` variants), WebP for the hero screenshot, PNG for small problem-card icons (60px).
- All staged imagery has an "Illustrative example." caption; the hero uses "Sample outlook: illustrative data."
- Decorative images use empty `alt=""`; informative images have descriptive alt text.
- Illustrations that still contain retired category names ("Dead, Slow, Steady, Busy, Slammed") or unsupported figures must be re-exported to match the app's approved names. This is an open asset task (cannot be fixed in code).

## 8. Motion and interaction

- Lenis smooth scroll and GSAP-style interactions live in `src/animations`. They are decorative: every section renders in its final state without waiting for scroll. Webflow initial-state inline styles are intentionally not used.
- Hover: buttons scale 1.02 (.2s); nav links get the pill treatment; nav button inverts (.4s).
- **Reduced motion:** `prefers-reduced-motion: reduce` disables smooth scroll, animations and transitions (durations 0.01ms), and Lenis is not started.
- No autoplaying carousels or marquees.

## 9. Accessibility

- Landmarks: `banner` navbar, `main`, `contentinfo` footer outside `main`.
- Contrast: AA verified for small text using `--nav-link-accessible` and `--shift-light-accessible`. Do not set small text in `--color-primary`, `--shift-light` or `--text-color` on white.
- Focus: native focus rings retained; nav current page uses `aria-current="page"`.
- Targets: buttons are at least 44px tall; form-free page, so no input labels needed.
- Decorative numerals and circles are `aria-hidden`.
- Content never depends on color alone (accent words are decorative; meaning is in the text).

## 10. SEO, AEO and technical

- **Title:** "ForeShift | Restaurant Demand Intelligence"
- **Meta description:** "Understand expected restaurant demand with insights tailored to your concept and location, informed by weather and nearby events. No POS connection required."
- Each route is statically prerendered with its own title, description, canonical (`https://foreshift.ai` + route) and og tags (`scripts/prerender.mjs`; the full CSS is inlined, two font files preloaded).
- Production builds write `sitemap.xml` and an allow-all `robots.txt`. Non-production (Vercel preview, or `SITE_ENV=staging`) builds add `noindex, nofollow`, disallow all, and write no sitemap.
- JSON-LD on `/`: Organization (with support email), SoftwareApplication (three offers, USD monthly), FAQPage mirroring the visible FAQ. No ratings or reviews; no `sameAs`.
- Not yet configured (needs accounts or IDs): Google Search Console, Bing Webmaster Tools, conversion tracking through signup and first outlook (the latter fires in the app at `app.foreshift.ai`).
- Build: `npm run build` runs `vite build` then `node scripts/prerender.mjs`.

## 11. Content rules checklist (use for every change)

- [ ] Copy matches the client doc exactly, including capitalization (sentence case; no title-casing).
- [ ] No em dashes anywhere (use commas, colons or periods).
- [ ] CTA label is "Get started" and links to `EXTERNAL.signUp`.
- [ ] No "Try Now", "Try Yourself", "Sign Up", "Get Started".
- [ ] No unsupported numbers, ratings or capability claims; staged visuals are captioned.
- [ ] No promise of automatic learning, inventory or purchasing recommendations.
- [ ] Only Detroit is claimed as available.
- [ ] Nav text is not forced to uppercase or capitalize via CSS.
- [ ] Every link goes to a real destination.

## 12. Known gaps and open decisions

1. **Em dash vs. doc wording.** The doc contains em dashes in the hero description and in "Sample outlook — illustrative data." The project rule is no em dashes, so commas and a colon are used. Restore the doc's punctuation only if the client overrides the rule.
2. **Mixed-case accent words** not covered by the doc remain ("Run every Shift…", "Compare it with Reality", "See what's Coming", "Understand Why", "One Forecast. The Context behind it. The Next Move."). Lowercase them if exact sentence case is required everywhere.
3. **Demand category names** are not shown in code; confirm the app's approved names, then update copy, screenshots and illustrations together.
4. **"Estimated covers per daypart"** appears as a Dynamic Scheduling feature while the policy pages say the forecast does not predict a venue's own covers. Reconcile the wording.
5. **Sample outlook URL** (`https://app.foreshift.ai/sample-outlook`) must exist, or point the secondary button to the on-page `#Sample-Outlook`.
6. **Placeholder phone number** in the footer.
7. **Webmaster tools and conversion tracking** not yet set up.
8. **Retired-category imagery** needs re-export by the asset owner.
