import { describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import DragChip from '~/components/DragChip.vue'

describe('DragChip', () => {
  it('rendert den Inhalt als Listeneintrag', async () => {
    const wrapper = await mountSuspended(DragChip, { slots: { default: 'Vue' } })
    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.text()).toBe('Vue')
  })

  it('folgt der Maus beim Ziehen und springt beim Loslassen zurück', async () => {
    const wrapper = await mountSuspended(DragChip, { slots: { default: 'Nuxt' } })
    await wrapper.trigger('pointerdown', { clientX: 10, clientY: 10, button: 0 })
    expect(wrapper.classes()).toContain('drag-chip--dragging')

    await wrapper.trigger('pointermove', { clientX: 50, clientY: 30 })
    expect(wrapper.attributes('style')).toContain('translate(40px, 20px)')

    await wrapper.trigger('pointerup')
    expect(wrapper.classes()).not.toContain('drag-chip--dragging')
    expect(wrapper.attributes('style')).toContain('translate(0px, 0px)')
  })

  it('ignoriert Mausbewegung ohne gedrückte Taste', async () => {
    const wrapper = await mountSuspended(DragChip, { slots: { default: 'TS' } })
    await wrapper.trigger('pointermove', { clientX: 80, clientY: 80 })
    expect(wrapper.attributes('style')).toContain('translate(0px, 0px)')
  })

  it('ignoriert die rechte Maustaste', async () => {
    const wrapper = await mountSuspended(DragChip, { slots: { default: 'CSS' } })
    await wrapper.trigger('pointerdown', { clientX: 10, clientY: 10, button: 2 })
    expect(wrapper.classes()).not.toContain('drag-chip--dragging')
  })

  it('ignoriert Loslassen ohne vorheriges Greifen', async () => {
    const wrapper = await mountSuspended(DragChip, { slots: { default: 'HTML' } })
    await wrapper.trigger('pointerup')
    expect(wrapper.attributes('style')).toContain('translate(0px, 0px)')
  })

  it('nutzt Pointer Capture, wenn vorhanden, und kommt auch damit klar, wenn es fehlschlägt', async () => {
    const wrapper = await mountSuspended(DragChip, { slots: { default: 'SCSS' } })
    const el = wrapper.element as HTMLElement
    el.setPointerCapture = vi.fn()
    await wrapper.trigger('pointerdown', { clientX: 1, clientY: 1, button: 0 })
    expect(el.setPointerCapture).toHaveBeenCalled()
    await wrapper.trigger('pointerup')

    el.setPointerCapture = vi.fn(() => {
      throw new Error('nicht verfügbar')
    })
    await wrapper.trigger('pointerdown', { clientX: 1, clientY: 1, button: 0 })
    expect(wrapper.classes()).toContain('drag-chip--dragging')
  })

  it('startet auch ohne Tastenangabe (Touch)', async () => {
    const wrapper = await mountSuspended(DragChip, { slots: { default: 'Git' } })
    const event = new Event('pointerdown') as Event & { clientX: number; clientY: number }
    event.clientX = 1
    event.clientY = 1
    wrapper.element.dispatchEvent(event)
    await nextTick()
    expect(wrapper.classes()).toContain('drag-chip--dragging')
  })
})
