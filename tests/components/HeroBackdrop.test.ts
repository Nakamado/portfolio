import { defineComponent, h } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import HeroBackdrop from '~/components/HeroBackdrop.vue'
import { buildMask } from '~/utils/dotMatrix'
import { stubAnimationFrames } from '../helpers/raf'

function fakeContext() {
  const styles: string[] = []
  return {
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    setTransform: vi.fn(),
    styles,
    // jede Zuweisung merken, damit der Test alle Punkte sieht und nicht nur den zuletzt gezeichneten
    set fillStyle(value: string) {
      styles.push(value)
    }
  }
}

function pointer(type: string, init: { x?: number; y?: number; pointerType?: string } = {}) {
  const event = new Event(type) as Event & { clientX: number; clientY: number; pointerType: string }
  event.clientX = init.x ?? 0
  event.clientY = init.y ?? 0
  event.pointerType = init.pointerType ?? 'mouse'
  return event
}

describe('HeroBackdrop', () => {
  let ctx: ReturnType<typeof fakeContext>
  let frames: ReturnType<typeof stubAnimationFrames>
  let reduced: boolean

  beforeEach(() => {
    ctx = fakeContext()
    reduced = false
    frames = stubAnimationFrames()
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation((() => ctx) as never)
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 300, height: 200 } as DOMRect)
    vi.spyOn(window, 'matchMedia').mockImplementation((() => ({ matches: reduced })) as never)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  async function mount() {
    const wrapper = await mountSuspended(HeroBackdrop)
    return { wrapper, host: wrapper.element.parentElement! }
  }

  it('zeichnet beim Einhängen ein ruhiges Raster', async () => {
    const { wrapper } = await mount()
    expect(wrapper.attributes('aria-hidden')).toBe('true')
    expect(ctx.arc).toHaveBeenCalled()
    expect(ctx.styles.some((c) => c.includes('255 255 255'))).toBe(true)
  })

  it('weicht dem Mauszeiger aus, färbt blau und beruhigt sich wieder', async () => {
    const { host } = await mount()
    host.dispatchEvent(pointer('pointermove', { x: 150, y: 100 }))
    host.dispatchEvent(pointer('pointermove', { x: 151, y: 100 })) // zweiter Frame wird nicht doppelt angefordert
    expect(frames.pending()).toBe(1)
    for (let i = 0; i < 5; i++) frames.flush()
    expect(ctx.styles.some((c) => c.includes('79 140 255'))).toBe(true)
    host.dispatchEvent(pointer('pointerleave'))
    for (let i = 0; i < 200 && frames.pending(); i++) frames.flush()
    expect(frames.pending()).toBe(0)
  })

  it('ignoriert Touch-Eingaben', async () => {
    const { host } = await mount()
    host.dispatchEvent(pointer('pointermove', { pointerType: 'touch' }))
    expect(frames.pending()).toBe(0)
  })

  it('reagiert bei reduzierter Bewegung nicht auf den Zeiger', async () => {
    reduced = true
    const { host } = await mount()
    host.dispatchEvent(pointer('pointermove', { x: 10, y: 10 }))
    expect(frames.pending()).toBe(0)
  })

  it('zeichnet bei Größenänderung neu und räumt beim Entfernen auf', async () => {
    let onResize: () => void = () => {}
    const disconnect = vi.fn()
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(cb: () => void) {
          onResize = cb
        }
        observe() {}
        disconnect = disconnect
      }
    )
    const { wrapper, host } = await mount()
    const before = ctx.setTransform.mock.calls.length
    onResize()
    expect(ctx.setTransform.mock.calls.length).toBe(before + 1)

    host.dispatchEvent(pointer('pointermove', { x: 5, y: 5 }))
    expect(frames.pending()).toBe(1)
    wrapper.unmount()
    expect(disconnect).toHaveBeenCalled()
    expect(frames.cancelled).toHaveLength(1)
    onResize() // Canvas existiert nicht mehr: keine Fehlermeldung
  })

  it('funktioniert ohne ResizeObserver und ohne Zeichenfläche', async () => {
    vi.stubGlobal('ResizeObserver', undefined)
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
    const { wrapper, host } = await mount()
    host.dispatchEvent(pointer('pointermove', { x: 5, y: 5 }))
    frames.flush()
    expect(frames.pending()).toBe(0)
    wrapper.unmount()
  })

  it('verwendet ohne devicePixelRatio den Faktor 1', async () => {
    vi.spyOn(window, 'devicePixelRatio', 'get').mockReturnValue(0)
    const { wrapper } = await mount()
    expect(ctx.setTransform).toHaveBeenCalledWith(1, 0, 0, 1, 0, 0)
    expect((wrapper.element as HTMLCanvasElement).width).toBe(300)
  })

  describe('mit Schrift (sign)', () => {
    const letters = buildMask('404').flat().filter(Boolean).length
    const big = () => vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 600, height: 400 } as DOMRect)
    /** Farben der zuletzt gezeichneten Punkte (20 × 13 = 260 Stück). */
    const lastFrame = () => ctx.styles.slice(-260)
    const blue = (styles: string[]) => styles.filter((c) => c.includes('79 140 255')).length

    it('hält die Schrift zurück, bis lit gesetzt ist, und lässt sie dann aufleuchten', async () => {
      big()
      const wrapper = await mountSuspended(HeroBackdrop, { props: { sign: '404', lit: false } })
      expect(blue(lastFrame())).toBe(0)

      await wrapper.setProps({ lit: true })
      expect(frames.pending()).toBe(1)
      for (let i = 0; i < 200 && frames.pending(); i++) frames.flush()
      expect(frames.pending()).toBe(0)
      expect(blue(lastFrame())).toBe(letters)
    })

    it('lässt die Schrift beim Aufleuchten kurz größer werden und dann bei der ruhigen Größe bleiben', async () => {
      big()
      const wrapper = await mountSuspended(HeroBackdrop, { props: { sign: '404', lit: false } })
      const radii = () => ctx.arc.mock.calls.map((call) => call[2] as number)
      expect(Math.max(...radii())).toBeCloseTo(1.3)

      await wrapper.setProps({ lit: true })
      for (let i = 0; i < 200 && frames.pending(); i++) frames.flush()
      expect(Math.max(...radii())).toBeGreaterThan(3) // zwischendurch deutlich größer
      expect(Math.max(...radii().slice(-260))).toBeLessThan(2.6) // am Ende so groß wie ein aufgeleuchteter Punkt
      expect(Math.max(...radii().slice(-260))).toBeGreaterThan(2.4)
    })

    it('blendet die Schrift wieder aus', async () => {
      big()
      const wrapper = await mountSuspended(HeroBackdrop, { props: { sign: '404', lit: false } })
      await wrapper.setProps({ lit: true })
      for (let i = 0; i < 300 && frames.pending(); i++) frames.flush()
      expect(blue(lastFrame())).toBe(letters)
      await wrapper.setProps({ lit: false })
      for (let i = 0; i < 300 && frames.pending(); i++) frames.flush()
      expect(blue(lastFrame())).toBe(0)
    })

    it('zeigt die Schrift bei reduzierter Bewegung sofort, ohne Animation', async () => {
      reduced = true
      big()
      const wrapper = await mountSuspended(HeroBackdrop, { props: { sign: '404', lit: true } })
      expect(blue(lastFrame())).toBe(letters)
      await wrapper.setProps({ lit: false })
      expect(blue(lastFrame())).toBe(0)
      expect(frames.pending()).toBe(0)
      expect(Math.max(...ctx.arc.mock.calls.map((call) => call[2] as number))).toBeLessThan(2.6) // kein Aufblitzen
    })

    describe('auf der Höhe eines Platzhalters (signAt)', () => {
      const BOX = { left: 0, top: 0, width: 600, height: 400 }
      /** Das Raster (600 × 400) und ein Platzhalter daneben, dessen Maße der Test vorgibt. */
      async function mountWithAnchor(anchor: { top: number; height: number }, selector = '.anchor') {
        reduced = true
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
          return (this.classList.contains('anchor') ? { ...BOX, ...anchor } : BOX) as DOMRect
        })
        const Host = defineComponent({
          render: () => h('div', [h(HeroBackdrop, { sign: '404', signAt: selector, lit: true }), h('div', { class: 'anchor' })])
        })
        return mountSuspended(Host)
      }
      const firstBlue = () => lastFrame().findIndex((c) => c.includes('79 140 255'))

      it('setzt die Schrift in die Höhe des Platzhalters', async () => {
        await mountWithAnchor({ top: 100, height: 210 }) // Mitte bei 205 px: Zeile 3 (Raster beginnt bei 20 px, Abstand 30)
        expect(blue(lastFrame())).toBe(letters)
        expect(firstBlue()).toBe(3 * 20 + 1 + 3)
      })

      it('lässt die Schrift weg, wenn der Platzhalter fehlt', async () => {
        await mountWithAnchor({ top: 100, height: 210 }, '.gibt-es-nicht')
        expect(blue(lastFrame())).toBe(0)
      })

      it('lässt die Schrift weg, wenn der Platzhalter ausgeblendet ist', async () => {
        await mountWithAnchor({ top: 100, height: 0 })
        expect(blue(lastFrame())).toBe(0)
      })

      it('lässt die Schrift weg, wenn der Platzhalter außerhalb des Rasters liegt', async () => {
        await mountWithAnchor({ top: -500, height: 210 })
        expect(blue(lastFrame())).toBe(0)
      })
    })

    it('lässt die Schrift in einem zu kleinen Raster weg', async () => {
      const wrapper = await mountSuspended(HeroBackdrop, { props: { sign: '404', lit: true } }) // 300 × 200: nur 10 × 6 Punkte
      for (let i = 0; i < 200 && frames.pending(); i++) frames.flush()
      expect(blue(ctx.styles.slice(-60))).toBe(0)
      wrapper.unmount()
    })
  })
})
