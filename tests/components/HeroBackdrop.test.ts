import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import HeroBackdrop from '~/components/HeroBackdrop.vue'
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
})
