import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import NotFoundContent from '~/components/NotFoundContent.vue'
import { content } from '~/data/profile'

describe.each([
  ['/gibt-es-nicht', 'de', '/', '/pattern-library'],
  ['/en/does-not-exist', 'en', '/en', '/en/pattern-library']
] as const)('404-Seite (%s)', (route, lang, home, patterns) => {
  const n = content[lang].notFound
  let mounted: { unmount: () => void }[] = []

  beforeEach(() => {
    mounted = []
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation((() => null) as never)
    vi.spyOn(window, 'matchMedia').mockImplementation((() => ({ matches: false })) as never)
  })

  afterEach(() => {
    mounted.forEach((wrapper) => wrapper.unmount())
    vi.restoreAllMocks()
  })

  async function mount() {
    const wrapper = await mountSuspended(NotFoundContent, { route })
    mounted.push(wrapper)
    return wrapper
  }

  it('hat genau eine h1 mit dem Titel und zeigt Fehlercode und Text', async () => {
    const wrapper = await mount()
    expect(wrapper.findAll('h1')).toHaveLength(1)
    expect(wrapper.get('h1').text()).toBe(n.title)
    expect(wrapper.get('.not-found__code').text()).toBe(n.code)
    expect(wrapper.get('.not-found__text').text()).toBe(`${n.textBefore}href=""${n.textAfter}`)
    expect(wrapper.get('.not-found__text code').text()).toBe('href=""')
  })

  it('führt zur Startseite und zur Pattern-Library der jeweiligen Sprache', async () => {
    const wrapper = await mount()
    expect(wrapper.get('a.button').attributes('href')).toBe(home)
    expect(wrapper.get('a.button').text()).toBe(n.home)
    expect(wrapper.get('a.text-link').attributes('href')).toBe(patterns)
    expect(wrapper.get('a.text-link').text()).toBe(n.patterns)
  })

  it('zeigt Punktraster und Tags, die Tags sind für Screenreader versteckt', async () => {
    const wrapper = await mount()
    expect(wrapper.find('canvas.hero-backdrop').exists()).toBe(true)
    expect(wrapper.get('.falling-stage__list').attributes('aria-hidden')).toBe('true')
    expect(wrapper.findAll('.drag-chip').map((c) => c.text())).toEqual(['404', 'href=""', 'undefined', '<NotFound />'])
  })
})

describe('404-Seite bei reduzierter Bewegung', () => {
  it('lässt alles sofort am Boden liegen', async () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation((() => null) as never)
    vi.spyOn(window, 'matchMedia').mockImplementation((() => ({ matches: true })) as never)
    const wrapper = await mountSuspended(NotFoundContent, { route: '/gibt-es-nicht' })
    expect(wrapper.findAll('.drag-chip--still')).toHaveLength(4)
    wrapper.unmount()
    vi.restoreAllMocks()
  })

  it('lässt „404“ im Raster aufleuchten, sobald die Tags liegen', async () => {
    const styles: string[] = []
    const ctx = { clearRect() {}, beginPath() {}, arc() {}, fill() {}, setTransform() {}, set fillStyle(value: string) { styles.push(value) } }
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation((() => ctx) as never)
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 600, height: 400 } as DOMRect)
    vi.spyOn(window, 'matchMedia').mockImplementation((() => ({ matches: true })) as never)
    const wrapper = await mountSuspended(NotFoundContent, { route: '/gibt-es-nicht' })
    await wrapper.vm.$nextTick()
    expect(styles.some((c) => c.includes('79 140 255'))).toBe(true)
    wrapper.unmount()
    vi.restoreAllMocks()
  })
})
