// Webflow `w-nav` mobile menu behaviour (data-animation="default",
// data-collapse="medium", 400ms slide), attached to the already-built
// Navbar.jsx markup via DOM — Navbar.jsx itself is untouched.
//
// webflow.css already defines the collapse breakpoint (.w-nav-menu goes
// display:none under [data-collapse="medium"] at <=991px) and the
// `[data-nav-menu-open]` attribute selector that makes the menu visible as
// an absolutely-positioned dropdown. This module toggles that attribute and
// animates its height over 400ms (data-duration="400", data-easing="ease"),
// exactly like Webflow's own nav script, plus the close triggers Webflow
// wires up: clicking a link, clicking outside, and Escape.

export function initMobileNav(root = document) {
  const nav = root.querySelector('.navbar.w-nav[data-collapse]')
  if (!nav) return () => {}

  const button = nav.querySelector('.w-nav-button')
  const menu = nav.querySelector('.w-nav-menu')
  if (!button || !menu) return () => {}

  const duration = Number(nav.getAttribute('data-duration')) || 400
  const easing = nav.getAttribute('data-easing') || 'ease'

  button.setAttribute('role', 'button')
  button.setAttribute('tabindex', '0')
  button.setAttribute('aria-label', button.getAttribute('aria-label') || 'menu')
  button.setAttribute('aria-haspopup', 'menu')
  button.setAttribute('aria-expanded', 'false')

  let open = false
  let animating = false

  function setHeightNow(px) {
    menu.style.height = px
  }

  function openMenu() {
    if (open || animating) return
    open = true
    animating = true
    menu.setAttribute('data-nav-menu-open', '')
    menu.style.overflow = 'hidden'
    menu.style.height = '0px'
    menu.style.transition = `height ${duration}ms ${easing}`
    button.classList.add('w--open')
    button.setAttribute('aria-expanded', 'true')
    const target = menu.scrollHeight
    // Force layout so the transition from 0 actually runs.
    // eslint-disable-next-line no-unused-expressions
    menu.offsetHeight
    requestAnimationFrame(() => setHeightNow(`${target}px`))
    window.setTimeout(() => {
      menu.style.height = 'auto'
      animating = false
    }, duration)
  }

  function closeMenu() {
    if (!open || animating) return
    animating = true
    const current = menu.scrollHeight
    menu.style.height = `${current}px`
    // eslint-disable-next-line no-unused-expressions
    menu.offsetHeight
    menu.style.transition = `height ${duration}ms ${easing}`
    requestAnimationFrame(() => setHeightNow('0px'))
    button.classList.remove('w--open')
    button.setAttribute('aria-expanded', 'false')
    window.setTimeout(() => {
      menu.removeAttribute('data-nav-menu-open')
      menu.style.height = ''
      menu.style.overflow = ''
      menu.style.transition = ''
      open = false
      animating = false
    }, duration)
  }

  function toggle() {
    if (open) closeMenu()
    else openMenu()
  }

  function onButtonClick(e) {
    e.preventDefault()
    toggle()
  }

  function onButtonKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    } else if (e.key === 'Escape') {
      closeMenu()
    }
  }

  function onLinkClick(e) {
    if (e.target.closest('.w-nav-link')) closeMenu()
  }

  function onDocumentClick(e) {
    if (!open) return
    if (nav.contains(e.target)) return
    closeMenu()
  }

  function onDocumentKeydown(e) {
    if (e.key === 'Escape' && open) closeMenu()
  }

  function onResize() {
    // Webflow's nav auto-closes on a breakpoint change back to desktop.
    if (open && window.innerWidth > 991) closeMenu()
  }

  button.addEventListener('click', onButtonClick)
  button.addEventListener('keydown', onButtonKeydown)
  menu.addEventListener('click', onLinkClick)
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onDocumentKeydown)
  window.addEventListener('resize', onResize)

  return () => {
    button.removeEventListener('click', onButtonClick)
    button.removeEventListener('keydown', onButtonKeydown)
    menu.removeEventListener('click', onLinkClick)
    document.removeEventListener('click', onDocumentClick)
    document.removeEventListener('keydown', onDocumentKeydown)
    window.removeEventListener('resize', onResize)
    menu.removeAttribute('data-nav-menu-open')
    menu.style.height = ''
    menu.style.overflow = ''
    menu.style.transition = ''
    button.classList.remove('w--open')
    button.setAttribute('aria-expanded', 'false')
  }
}
