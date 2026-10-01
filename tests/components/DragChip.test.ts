import { describe, expect, it } from 'vitest'
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
})
