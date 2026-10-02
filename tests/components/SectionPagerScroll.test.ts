import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SectionPager from '~/components/SectionPager.vue'
import { content } from '~/data/profile'
import { stubAnimationFrames } from '../helpers/raf'

const IDS = ['top', 'about', 'experience', 'skills', 'projects', 'contact']

describe('SectionPager beim Scrollen', () => {
  let frames: ReturnType<typeof stubAnimationFrames>
  let tops: Record<string, number>
  let footerTop: number
  let scrollY: number
  let mounted: { unmount: () => void }[] = []

  const Page = (withSections: boolean, withFooter: boolean) =>
    defineComponent({
      render: () =>
        h('div', [
          ...(withSections ? IDS.map((id) => h('section', { id })) : []),
          ...(withFooter ? [h('footer', { class: 'site-footer' })] : []),
          h(SectionPager)
        ])
    })

  beforeEach(() => {
    frames = stubAnimationFrames()
    tops = { top: 0, about: 700, experience: 1400, skills: 2100, projects: 2800, contact: 3500 }
    footerTop = 5000
    scrollY = 0
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })
    Object.defineProperty(window, 'scrollY', { get: () => scrollY, configurable: true })
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 4300, configurable: true })
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      const top = this.classList.contains('site-footer') ? footerTop : (tops[this.id] ?? 0)
      return { top } as DOMRect
    })
  })

  afterEach(() => {
    // Sonst bleiben die Scroll-Listener früherer Tests am Fenster hängen
    mounted.forEach((w) => w.unmount())
    mounted = []
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    document.body.innerHTML = ''
  })

  async function mount(sections = true, footer = true) {
    const wrapper = await mountSuspended(Page(sections, footer), { route: '/', attachTo: document.body })
    mounted.push(wrapper)
    const pager = () => wrapper.get('a.pager')
    const scrollTo = (offset: number) => {
      for (const id of IDS) tops[id] = (IDS.indexOf(id) * 700) - offset
      window.dispatchEvent(new Event('scroll'))
      window.dispatchEvent(new Event('scroll')) // zweiter Aufruf, solange der Frame wartet
      frames.flush()
      return wrapper.vm.$nextTick()
    }
    return { wrapper, pager, scrollTo }
  }

  it('zeigt ab "Über mich" den Button zum nächsten Abschnitt', async () => {
    const { pager, scrollTo } = await mount()
    expect(pager().classes()).not.toContain('pager--visible')
    await scrollTo(1500) // Abschnitt "Erfahrung" liegt an der Messlinie
    expect(pager().classes()).toContain('pager--visible')
    expect(pager().attributes('href')).toBe('#skills')
    expect(pager().attributes('aria-label')).toContain(content.de.nav.find((n) => n.id === 'skills')!.label)
  })

  it('zeigt am Seitenende "Nach oben"', async () => {
    const { pager, scrollTo } = await mount()
    scrollY = 3500 // 800 + 3500 >= 4300 - 4
    await scrollTo(3500)
    expect(pager().classes()).toContain('pager--up')
    expect(pager().attributes('href')).toBe('#top')
    expect(pager().attributes('aria-label')).toBe(content.de.ui.backToTop)
  })

  it('rückt über den Footer, wenn dieser ins Bild kommt', async () => {
    footerTop = 700
    const { pager } = await mount()
    expect(pager().attributes('style')).toContain('--pager-lift: 100px')
  })

  it('bleibt ohne Footer und ohne Abschnitte verborgen', async () => {
    const { pager } = await mount(false, false)
    expect(pager().classes()).not.toContain('pager--visible')
    expect(pager().attributes('style')).toContain('--pager-lift: 0px')
  })

  it('verwendet bei nicht scrollbarer Seite nie die Endlogik', async () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 400, configurable: true })
    const { pager, scrollTo } = await mount()
    await scrollTo(0)
    expect(pager().classes()).not.toContain('pager--up')
  })

  it('aktualisiert sich bei Größenänderung und Routenwechsel', async () => {
    const { pager } = await mount()
    for (const id of IDS) tops[id] = (IDS.indexOf(id) * 700) - 800
    window.dispatchEvent(new Event('resize'))
    frames.flush()
    await nextTick()
    expect(pager().attributes('href')).toBe('#experience')

    await navigateTo('/en')
    await nextTick()
    await nextTick()
    expect(pager().attributes('aria-label')).toContain(content.en.nav.find((n) => n.id === 'experience')!.label)
  })

  it('räumt beim Entfernen einen wartenden Frame ab', async () => {
    const { wrapper } = await mount()
    window.dispatchEvent(new Event('scroll'))
    const remove = vi.spyOn(window, 'removeEventListener')
    wrapper.unmount()
    mounted = []
    expect(frames.cancelled).toHaveLength(1)
    expect(remove.mock.calls.map((c) => c[0])).toEqual(expect.arrayContaining(['scroll', 'resize']))
  })

  it('kommt mit fehlenden Abschnitten klar (nur der Hero ist da)', async () => {
    const OnlyTop = defineComponent({ render: () => h('div', [h('section', { id: 'top' }), h(SectionPager)]) })
    const wrapper = await mountSuspended(OnlyTop, { route: '/', attachTo: document.body })
    mounted.push(wrapper)
    window.dispatchEvent(new Event('scroll'))
    frames.flush()
    await nextTick()
    expect(wrapper.get('a.pager').classes()).not.toContain('pager--visible')
  })
})
