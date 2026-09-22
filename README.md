# ForeShift v1 Landing Page

React (Vite + React 19) rebuild of the ForeShift Webflow export (`index.html` — a single-page
site; see `PORTING_RULES.md` for why the other files in the Webflow export folder aren't part of
this site). Pixel-parity and animation-parity tooling lives in `scripts/`; the original export is
kept read-only under `reference/original/` for comparison.

## Develop
```
npm install
npm run dev
```

## Verify parity against the Webflow export
```
npm run serve:original   # serves reference/original on :5500
npm run dev               # :5173
REACT_BASE=http://localhost:5173 npm run parity
```

## Production build + Lighthouse
```
npm run build
npm run preview           # :4173
npm run lighthouse
```
