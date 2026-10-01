import type { RouterConfig } from '@nuxt/schema'

// Scrollen zu Ankern: berücksichtigt den fixierten Header, respektiert "reduzierte Bewegung"
// und ignoriert unbekannte Anker (z. B. alte Links wie #kontakt) ohne Konsolen-Warnung.
export default <RouterConfig>{
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (!to.hash) return { top: 0 }

    let target: Element | null = null
    try {
      target = document.querySelector(to.hash)
    } catch {
      target = null
    }
    if (!target) return { top: 0 }

    const header = document.querySelector<HTMLElement>('.site-header')
    const sticky = header ? getComputedStyle(header).position === 'sticky' : false
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return { el: to.hash, top: sticky && header ? header.offsetHeight : 0, behavior: reduced ? 'auto' : 'smooth' }
  }
}
