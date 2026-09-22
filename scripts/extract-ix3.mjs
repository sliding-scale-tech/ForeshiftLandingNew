// Extracts the page-scoped IX3 interactions/timelines from reference/ix-data.js
// (the tail of webflow.js from Webflow.require("ix3") onward) into
// src/animations/data/ix3-page.json, filtered to page 6aa935b3aacd1b5b9fc5d716.
// Re-run this if reference/ix-data.js changes (re-exported Webflow site).
//
// ix-data.js isn't a standalone module (it references identifiers like `e`
// that only exist earlier in the real webflow.js bundle), so rather than
// eval-ing the whole file, this locates the two call sites it cares about —
// `t.register(interactions, timelines)` and `Webflow.require("ix2").init({...})`
// — by bracket-matching, and requires each argument as its own tiny CJS module.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const PAGE = '6aa935b3aacd1b5b9fc5d716'

const EASE = [
  'none', 'power1.in', 'power1.out', 'power1.inOut', 'power2.in', 'power2.out', 'power2.inOut',
  'power3.in', 'power3.out', 'power3.inOut', 'power4.in', 'power4.out', 'power4.inOut',
  'back.in', 'back.out', 'back.inOut', 'bounce.in', 'bounce.out', 'bounce.inOut',
  'circ.in', 'circ.out', 'circ.inOut', 'elastic.in', 'elastic.out', 'elastic.inOut',
  'expo.in', 'expo.out', 'expo.inOut', 'sine.in', 'sine.out', 'sine.inOut',
] // extracted verbatim from reference/original/js/webflow.js (`let p=["none",...]`)
const easeName = (code) => EASE[code ?? 0] ?? EASE[0]

function extractBalanced(str, startIdx, openCh, closeCh) {
  let depth = 0
  for (let i = startIdx; i < str.length; i++) {
    if (str[i] === openCh) depth++
    else if (str[i] === closeCh) {
      depth--
      if (depth === 0) return i + 1
    }
  }
  return -1
}

function requireLiteral(src, tmpName) {
  const tmpPath = path.join(ROOT, 'node_modules/.cache', tmpName)
  fs.mkdirSync(path.dirname(tmpPath), { recursive: true })
  fs.writeFileSync(tmpPath, `module.exports = ${src};`)
  const mod = require(tmpPath)
  return mod
}

const require = (await import('node:module')).createRequire(import.meta.url)

const raw = fs.readFileSync(path.join(ROOT, 'reference/ix-data.js'), 'utf8')

const regIdx = raw.indexOf('t.register(')
const arrStart = raw.indexOf('[', regIdx)
const arrEnd = extractBalanced(raw, arrStart, '[', ']')
const interactions = requireLiteral(raw.slice(arrStart, arrEnd), 'ix3-interactions.cjs')

const timelinesStart = arrEnd + 1
const timelinesEnd = extractBalanced(raw, timelinesStart, '[', ']')
const timelines = requireLiteral(raw.slice(timelinesStart, timelinesEnd), 'ix3-timelines.cjs')

function normTrigger(triggers) {
  const [type, cfg, targetSpec] = triggers[0]
  const out = { type }
  if (cfg.scrollTriggerConfig) out.scrollTriggerConfig = cfg.scrollTriggerConfig
  if (targetSpec) {
    const [ttype, tval, topts] = targetSpec
    out.watch = { ttype, tval, topts }
  }
  return out
}

function normStagger(s) {
  if (!s) return null
  const out = {}
  if (s.each != null) out.each = s.each
  if (s.amount != null) out.amount = s.amount
  if (s.axis) out.axis = s.axis
  if (s.grid) out.grid = s.grid
  if (s.from) out.from = s.from
  if (s.ease != null) out.ease = easeName(s.ease)
  return out
}

function normAction(a) {
  const [ttype, tval, topts] = a.targets[0]
  const props = (a.properties && a.properties['wf:transform']) || {}
  return {
    id: a.id,
    target: { type: ttype, value: tval, opts: topts },
    timing: {
      duration: a.timing.duration ?? 0,
      position: a.timing.position || 0,
      ease: easeName(a.timing.ease),
      stagger: normStagger(a.timing.stagger),
      repeat: a.timing.repeat,
      repeatDelay: a.timing.repeatDelay,
      yoyo: a.timing.yoyo,
    },
    tt: a.tt,
    properties: props,
  }
}

const tlById = new Map(timelines.map((t) => [t.id, t]))
// Page-scoped interactions apply only to this page. Component-scoped ones (Webflow Symbols) apply
// wherever the component is placed — we can't tell from ix-data.js alone which pages use which
// component, so include them all; their wf:class-targeted actions simply resolve to nothing at
// runtime on pages that don't render the component (see resolveTargets.js), so this is safe.
const pageInteractions = interactions.filter(
  (it) => (it.scope.type === 'pages' && it.scope.value.includes(PAGE)) || it.scope.type === 'component',
)

const out = pageInteractions.map((it) => {
  const tl = tlById.get(it.timelineIds[0])
  return {
    id: it.id,
    trigger: normTrigger(it.triggers),
    timelineId: tl.id,
    settings: tl.settings || {},
    actions: (tl.actions || []).map(normAction),
  }
})

const outPath = path.join(ROOT, 'src/animations/data/ix3-page.json')
fs.writeFileSync(outPath, JSON.stringify(out))
console.log(`Wrote ${out.length} page-scoped IX3 interactions to ${path.relative(ROOT, outPath)}`)
