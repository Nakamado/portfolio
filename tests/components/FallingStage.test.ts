import { nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import FallingStage from '~/components/FallingStage.vue'
import { stubAnimationFrames } from '../helpers/raf'

const LABELS = ['404', 'href=""', 'undefined', '<NotFound />']

// jsdom kennt kein Layout: Bühne 400 x 200 px, Tags 50 x 20 px nebeneinander auf Höhe 100 (Boden bei y = 180)
const layout = { width: 400, height: 200 }
const isChip = (el: HTMLElement) => el.classList.contains('drag-chip')
const indexOf = (el: HTMLElement) => Array.from(el.parentElement!.children).indexOf(el)

// Die Testumgebung kennt kein Layout (und nicht jede Eigenschaft liegt am selben Prototyp): die Maße werden direkt gesetzt und danach zurückgesetzt
const originals = new Map<string, PropertyDescriptor | undefined>()
function define(name: string, get: (this: HTMLElement) => number) {
  if (!originals.has(name)) originals.set(name, Object.getOwnPropertyDescriptor(HTMLElement.prototype, name))
  Object.defineProperty(HTMLElement.prototype, name, { configurable: true, get })
}
function restoreLayout() {
  originals.forEach((descriptor, name) => {
    if (descriptor) Object.defineProperty(HTMLElement.prototype, name, descriptor)
    else delete (HTMLElement.prototype as unknown as Record<string, unknown>)[name]
  })
  originals.clear()
}

function pointer(type: string, x = 0, y = 0, time = 0, button?: number) {
  const event = new Event(type, { bubbles: true }) as Event & Record<string, unknown>
  Object.defineProperty(event, 'timeStamp', { value: time })
  event.clientX = x
  event.clientY = y
  event.pointerId = 1
  if (button !== undefined) event.button = button
  return event
}

describe('FallingStage', () => {
  let frames: ReturnType<typeof stubAnimationFrames>
  let reduced: boolean
  let timers: (() => void)[]
  let mounted: { unmount: () => void }[] = []
  let time: number

  async function mount() {
    const wrapper = await mountSuspended(FallingStage, { props: { labels: LABELS }, slots: { default: '<p class="inhalt">Text</p>' } })
    mounted.push(wrapper)
    return wrapper
  }
  const chip = (wrapper: Awaited<ReturnType<typeof mount>>, index: number) => wrapper.findAll('.drag-chip')[index]!
  const offset = (wrapper: Awaited<ReturnType<typeof mount>>, index: number, axis: 'x' | 'y') =>
    Number(new RegExp(`--${axis}: (-?[\\d.e-]+)px`).exec(chip(wrapper, index).attributes('style') ?? '')?.[1])
  /** Zeit läuft in 16-ms-Schritten, bis nichts mehr in Bewegung ist. Danach wartet der Test, bis Vue die Position ins DOM geschrieben hat. */
  async function settle() {
    for (let i = 0; i < 3000 && frames.pending(); i++) frames.flush((time += 16))
    await nextTick()
  }
  const fall = () => timers.forEach((run) => run())

  beforeEach(() => {
    reduced = false
    timers = []
    mounted = []
    time = 0
    layout.width = 400
    layout.height = 200
    frames = stubAnimationFrames()
    vi.spyOn(window, 'matchMedia').mockImplementation((() => ({ matches: reduced })) as never)
    define('clientWidth', () => layout.width)
    define('clientHeight', () => layout.height)
    define('offsetLeft', function (this: HTMLElement) {
      return isChip(this) ? indexOf(this) * 60 : 0
    })
    define('offsetTop', function (this: HTMLElement) {
      return isChip(this) ? 100 : 0
    })
    define('offsetWidth', function (this: HTMLElement) {
      return isChip(this) ? 50 : 0
    })
    define('offsetHeight', function (this: HTMLElement) {
      return isChip(this) ? 20 : 0
    })
    // Die Wartezeit bis zum Fallen führt der Test selbst aus
    const realSetTimeout = globalThis.setTimeout
    vi.spyOn(globalThis, 'setTimeout').mockImplementation(((fn: () => void, delay?: number, ...rest: unknown[]) => {
      if (delay === 1400) {
        timers.push(fn)
        return 999
      }
      return realSetTimeout(fn, delay, ...rest)
    }) as never)
  })

  afterEach(() => {
    mounted.forEach((wrapper) => wrapper.unmount()) // Listener am Fenster dürfen nicht in den nächsten Test wandern
    restoreLayout()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('zeigt den Inhalt und die Tags als dekorative Liste', async () => {
    const wrapper = await mount()
    expect(wrapper.find('.inhalt').exists()).toBe(true)
    expect(wrapper.find('.falling-stage__list').attributes('aria-hidden')).toBe('true')
    expect(wrapper.findAll('.drag-chip').map((c) => c.text())).toEqual(LABELS)
  })

  it('setzt den Inhalt aus dem Slot before über die Tags und den übrigen Inhalt darunter', async () => {
    const wrapper = await mountSuspended(FallingStage, { props: { labels: LABELS }, slots: { before: '<p class="vor">davor</p>', default: '<p class="inhalt">Text</p>' } })
    mounted.push(wrapper)
    const order = Array.from(wrapper.element.children).map((el) => el.className.split(' ')[0])
    expect(order).toEqual(['vor', 'falling-stage__list', 'inhalt'])
  })

  it('steht erst still und meldet erst nach der Wartezeit, dass es fällt', async () => {
    const wrapper = await mount()
    expect(wrapper.emitted('fall')).toBeUndefined()
    expect(frames.pending()).toBe(0)
    expect(timers).toHaveLength(1)
    expect(offset(wrapper, 0, 'y')).toBe(0)

    fall()
    expect(wrapper.emitted('fall')).toHaveLength(1)
    expect(frames.pending()).toBe(1)
  })

  it('lässt die Tags nacheinander fallen', async () => {
    const wrapper = await mount()
    fall()
    frames.flush((time += 16)) // erstes Bild: nur die Zeit merken
    frames.flush((time += 16))
    await nextTick()
    expect(offset(wrapper, 0, 'y')).toBeGreaterThan(0)
    expect(offset(wrapper, 1, 'y')).toBe(0)
  })

  it('lässt die Tags auf dem Boden liegen', async () => {
    const wrapper = await mount()
    fall()
    await settle()
    for (let i = 0; i < LABELS.length; i++) {
      expect(offset(wrapper, i, 'y')).toBe(80) // 200 - 20 - 100
      expect(offset(wrapper, i, 'x')).toBe(0)
    }
    expect(frames.pending()).toBe(0)
  })

  it('begrenzt den Zeitschritt, wenn ein Bild lange braucht', async () => {
    const wrapper = await mount()
    fall()
    frames.flush(16)
    frames.flush(5000) // Tab war im Hintergrund
    await nextTick()
    expect(offset(wrapper, 0, 'y')).toBeLessThan(5) // 0,032 s Schwerkraft statt 5 s
  })

  it('lässt sich greifen, ziehen und werfen', async () => {
    const wrapper = await mount()
    fall()
    await settle()
    const el = chip(wrapper, 0).element

    el.dispatchEvent(pointer('pointerdown', 100, 100, 1000, 0))
    await wrapper.vm.$nextTick()
    expect(chip(wrapper, 0).classes()).toContain('drag-chip--dragging')

    el.dispatchEvent(pointer('pointermove', 130, 40, 1010))
    await wrapper.vm.$nextTick()
    expect(offset(wrapper, 0, 'x')).toBe(30)
    expect(offset(wrapper, 0, 'y')).toBe(20)

    el.dispatchEvent(pointer('pointerup', 130, 40, 1020))
    await wrapper.vm.$nextTick()
    expect(chip(wrapper, 0).classes()).not.toContain('drag-chip--dragging')
    expect(frames.pending()).toBe(1)
    await settle()
    expect(offset(wrapper, 0, 'y')).toBe(80)
    expect(offset(wrapper, 0, 'x')).toBeGreaterThan(30) // der Wurf hat Schwung mitgegeben
  })

  it('hält den Tag beim Ziehen im Bild', async () => {
    const wrapper = await mount()
    fall()
    await settle()
    const el = chip(wrapper, 0).element
    el.dispatchEvent(pointer('pointerdown', 100, 100, 1000, 0))
    el.dispatchEvent(pointer('pointermove', -500, 5000, 1010))
    await wrapper.vm.$nextTick()
    expect(offset(wrapper, 0, 'x')).toBe(0)
    expect(offset(wrapper, 0, 'y')).toBe(80)
  })

  it('wirft nicht, wenn die Maus vor dem Loslassen stillstand', async () => {
    const wrapper = await mount()
    fall()
    await settle()
    const el = chip(wrapper, 0).element
    el.dispatchEvent(pointer('pointerdown', 100, 100, 1000, 0))
    el.dispatchEvent(pointer('pointermove', 130, 40, 1010))
    el.dispatchEvent(pointer('pointerup', 130, 40, 1500)) // 490 ms ohne Bewegung
    await settle()
    expect(offset(wrapper, 0, 'x')).toBe(30)
    expect(offset(wrapper, 0, 'y')).toBe(80)
  })

  it('ignoriert die rechte Maustaste, fremde Bewegung und Loslassen ohne Greifen', async () => {
    const wrapper = await mount()
    fall()
    await settle()
    const el = chip(wrapper, 0).element
    el.dispatchEvent(pointer('pointerdown', 100, 100, 1000, 2))
    expect(chip(wrapper, 0).classes()).not.toContain('drag-chip--dragging')

    el.dispatchEvent(pointer('pointermove', 130, 40, 1010)) // nichts gegriffen
    el.dispatchEvent(pointer('pointerup', 130, 40, 1020))
    await wrapper.vm.$nextTick()
    expect(offset(wrapper, 0, 'y')).toBe(80)

    // Ein anderer Tag bewegt den gegriffenen nicht
    el.dispatchEvent(pointer('pointerdown', 100, 100, 1000, 0))
    chip(wrapper, 1).element.dispatchEvent(pointer('pointermove', 300, 40, 1010))
    await wrapper.vm.$nextTick()
    expect(offset(wrapper, 0, 'x')).toBe(0)
    expect(offset(wrapper, 1, 'y')).toBe(80)
  })

  it('startet auch ohne Tastenangabe (Touch) und beendet das Greifen nur einmal', async () => {
    const wrapper = await mount()
    fall()
    await settle()
    const el = chip(wrapper, 0).element
    el.dispatchEvent(pointer('pointerdown', 100, 100, 1000))
    await wrapper.vm.$nextTick()
    expect(chip(wrapper, 0).classes()).toContain('drag-chip--dragging')

    el.dispatchEvent(pointer('pointerup', 100, 100, 1010))
    el.dispatchEvent(pointer('lostpointercapture', 100, 100, 1011)) // kommt hinterher noch einmal
    el.dispatchEvent(pointer('pointercancel', 100, 100, 1012))
    await wrapper.vm.$nextTick()
    expect(frames.pending()).toBe(1)
  })

  it('nutzt Pointer Capture, wenn vorhanden, und kommt auch damit klar, wenn es fehlschlägt', async () => {
    const wrapper = await mount()
    fall()
    await settle()
    const el = chip(wrapper, 0).element as HTMLElement
    el.setPointerCapture = vi.fn()
    el.dispatchEvent(pointer('pointerdown', 1, 1, 1000, 0))
    expect(el.setPointerCapture).toHaveBeenCalledWith(1)
    el.dispatchEvent(pointer('pointerup', 1, 1, 1010))

    el.setPointerCapture = vi.fn(() => {
      throw new Error('nicht verfügbar')
    })
    el.dispatchEvent(pointer('pointerdown', 1, 1, 1100, 0))
    await wrapper.vm.$nextTick()
    expect(chip(wrapper, 0).classes()).toContain('drag-chip--dragging')
  })

  it('fordert kein zweites Bild an, wenn schon eins wartet', async () => {
    await mount()
    fall()
    expect(frames.pending()).toBe(1)
    window.dispatchEvent(new Event('resize')) // mitten im Fall
    expect(frames.pending()).toBe(1)
  })

  describe('Größenbeobachtung', () => {
    function stubObserver() {
      let callback: () => void = () => {}
      const disconnect = vi.fn()
      vi.stubGlobal(
        'ResizeObserver',
        class {
          constructor(cb: () => void) {
            callback = cb
          }
          observe() {}
          disconnect = disconnect
        }
      )
      return { fire: () => callback(), disconnect }
    }

    it('liest die Maße neu, wenn sich die Bühne ändert, zum Beispiel weil eine Schrift nachlädt', async () => {
      const observer = stubObserver()
      const wrapper = await mount()
      fall()
      await settle()
      layout.height = 300
      observer.fire()
      await settle()
      expect(offset(wrapper, 0, 'y')).toBe(180)
    })

    it('lässt die Tags vor dem Fallen an ihrem Platz und fängt dadurch nicht früher an', async () => {
      const observer = stubObserver()
      const wrapper = await mount()
      layout.height = 300
      observer.fire()
      await nextTick()
      expect(frames.pending()).toBe(0)
      expect(offset(wrapper, 0, 'y')).toBe(0)
      fall()
      await settle()
      expect(offset(wrapper, 0, 'y')).toBe(180)
    })

    it('hört beim Entfernen auf zu beobachten', async () => {
      const observer = stubObserver()
      const wrapper = await mount()
      mounted = []
      wrapper.unmount()
      expect(observer.disconnect).toHaveBeenCalled()
    })

    it('funktioniert ohne ResizeObserver', async () => {
      vi.stubGlobal('ResizeObserver', undefined)
      const wrapper = await mount()
      expect(wrapper.findAll('.drag-chip')).toHaveLength(4)
    })
  })

  it('passt die Tags an, wenn sich die Fenstergröße ändert', async () => {
    const wrapper = await mount()
    fall()
    await settle()
    layout.height = 300
    window.dispatchEvent(new Event('resize'))
    await settle()
    expect(offset(wrapper, 0, 'y')).toBe(180) // 300 - 20 - 100

    layout.width = 40 // schmaler als ein Tag
    window.dispatchEvent(new Event('resize'))
    await settle()
    expect(offset(wrapper, 3, 'x')).toBeLessThanOrEqual(0)
  })

  describe('bei reduzierter Bewegung', () => {
    beforeEach(() => {
      reduced = true
    })

    it('liegen die Tags sofort am Boden, ohne Wartezeit und ohne Animation', async () => {
      const wrapper = await mount()
      expect(timers).toHaveLength(0)
      expect(frames.pending()).toBe(0)
      expect(wrapper.emitted('fall')).toHaveLength(1)
      expect(offset(wrapper, 0, 'y')).toBe(80)
      expect(chip(wrapper, 0).classes()).toContain('drag-chip--still')
    })

    it('lassen sich nicht greifen', async () => {
      const wrapper = await mount()
      chip(wrapper, 0).element.dispatchEvent(pointer('pointerdown', 10, 10, 1000, 0))
      await wrapper.vm.$nextTick()
      expect(chip(wrapper, 0).classes()).not.toContain('drag-chip--dragging')
    })

    it('bleiben beim Ändern der Fenstergröße am Boden liegen', async () => {
      const wrapper = await mount()
      layout.height = 300
      window.dispatchEvent(new Event('resize'))
      await nextTick()
      expect(offset(wrapper, 0, 'y')).toBe(180)
    })
  })

  describe('beim Entfernen', () => {
    it('wird die Wartezeit abgebrochen', async () => {
      const clear = vi.spyOn(globalThis, 'clearTimeout')
      const wrapper = await mount()
      mounted = []
      wrapper.unmount()
      expect(clear).toHaveBeenCalledWith(999)
    })

    it('wird ein laufendes Bild abgebrochen und der Resize-Listener entfernt', async () => {
      const wrapper = await mount()
      fall()
      expect(frames.pending()).toBe(1)
      mounted = []
      wrapper.unmount()
      expect(frames.cancelled).toHaveLength(1)
      expect(frames.pending()).toBe(0)
      window.dispatchEvent(new Event('resize')) // darf nichts mehr bewirken
      expect(frames.pending()).toBe(0)
    })

    it('gibt es nichts abzubrechen, wenn alles liegt', async () => {
      const wrapper = await mount()
      fall()
      await settle()
      mounted = []
      wrapper.unmount()
      expect(frames.cancelled).toHaveLength(0)
    })
  })
})
