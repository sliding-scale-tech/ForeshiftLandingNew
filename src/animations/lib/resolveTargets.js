// Resolves IX3 target descriptors {type, value, opts} to real DOM elements,
// exactly like webflow.js's own `resolveTargets` does at runtime:
//   - "wf:inst"  -> an element carrying data-w-id="<instanceId>", OR a
//                   data-wf-target attribute whose JSON payload contains the
//                   [pageId, instanceId] pair (page-building agents keep
//                   data-wf-target as a plain decoded-JSON string per
//                   PORTING_RULES.md, so a substring match is sufficient and
//                   is what Webflow's own runtime effectively relies on).
//   - "wf:class" -> every element carrying that class name.
//   - "wf:trigger-only" -> the element(s) that matched the interaction's own
//                   scroll/load watch target (passed in by the caller).

export function resolveByInst(pageId, instanceId, root = document) {
  const byWId = root.querySelectorAll(`[data-w-id="${instanceId}"]`)
  const pair = `"${pageId}","${instanceId}"`
  const all = root.querySelectorAll('[data-wf-target]')
  const byTarget = []
  for (const el of all) {
    const attr = el.getAttribute('data-wf-target') || ''
    if (attr.includes(pair)) byTarget.push(el)
  }
  const set = new Set([...byWId, ...byTarget])
  return [...set]
}

export function resolveByClass(className, root = document) {
  return [...root.querySelectorAll(`.${CSS.escape(className)}`)]
}

// Resolves a trigger/"watch" descriptor used both to find the ScrollTrigger
// element and to satisfy "wf:trigger-only" action targets.
export function resolveWatch(watch, root = document) {
  if (!watch) return []
  if (watch.ttype === 'wf:inst') return resolveByInst(watch.tval[0], watch.tval[1], root)
  if (watch.ttype === 'wf:class') return resolveByClass(watch.tval[0], root)
  return []
}

export function resolveActionTargets(target, triggerEl, root = document) {
  switch (target.type) {
    case 'wf:inst':
      return resolveByInst(target.value[0], target.value[1], root)
    case 'wf:class':
      return resolveByClass(target.value[0], root)
    case 'wf:trigger-only':
      return triggerEl ? [triggerEl] : []
    default:
      return []
  }
}
