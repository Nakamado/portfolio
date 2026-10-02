import { afterEach, describe, expect, it, vi } from 'vitest'
import routerOptions from '../app/router.options'

type Scroll = (to: { hash: string }, from: unknown, saved: unknown) => unknown
const scroll = (routerOptions as unknown as { scrollBehavior: Scroll }).scrollBehavior

function setup({ sticky = false, reduced = false, height = 80 } = {}) {
  document.body.innerHTML = '<header class="site-header"></header><section id="about"></section>'
  const header = document.querySelector<HTMLElement>('.site-header')!
  header.style.position = sticky ? 'sticky' : 'static'
  Object.defineProperty(header, 'offsetHeight', { value: height, configurable: true })
  vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: reduced } as MediaQueryList)
}

describe('scrollBehavior', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    document.body.innerHTML = ''
  })

  it('stellt die gemerkte Position wieder her', () => {
    const saved = { left: 0, top: 120 }
    expect(scroll({ hash: '' }, null, saved)).toBe(saved)
  })

  it('scrollt ohne Anker nach oben', () => {
    expect(scroll({ hash: '' }, null, null)).toEqual({ top: 0 })
  })

  it('scrollt bei unbekanntem oder ungültigem Anker nach oben', () => {
    setup()
    expect(scroll({ hash: '#kontakt' }, null, null)).toEqual({ top: 0 })
    expect(scroll({ hash: '#[' }, null, null)).toEqual({ top: 0 })
  })

  it('berücksichtigt den fixierten Header und scrollt weich', () => {
    setup({ sticky: true })
    expect(scroll({ hash: '#about' }, null, null)).toEqual({ el: '#about', top: 80, behavior: 'smooth' })
  })

  it('ignoriert einen nicht fixierten Header und respektiert reduzierte Bewegung', () => {
    setup({ sticky: false, reduced: true })
    expect(scroll({ hash: '#about' }, null, null)).toEqual({ el: '#about', top: 0, behavior: 'auto' })
  })

  it('funktioniert auch ohne Header', () => {
    setup({ reduced: false })
    document.querySelector('.site-header')!.remove()
    expect(scroll({ hash: '#about' }, null, null)).toEqual({ el: '#about', top: 0, behavior: 'smooth' })
  })
})
