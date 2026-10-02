import { afterEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ScrollButton from '~/components/ScrollButton.vue'

describe('ScrollButton', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('ist ein Link mit Ziel und zugänglichem Namen, das Symbol ist ausgeblendet', async () => {
    const wrapper = await mountSuspended(ScrollButton, { props: { href: '#about', label: 'Nach unten scrollen' } })
    const link = wrapper.get('a.scroll-button')
    expect(link.attributes('href')).toBe('#about')
    expect(link.attributes('aria-label')).toBe('Nach unten scrollen')
    expect(link.get('svg').attributes('aria-hidden')).toBe('true')
  })

  it('setzt nach dem Klick den Fokus auf den Zielabschnitt', async () => {
    document.body.innerHTML = '<section id="about" tabindex="-1"></section>'
    const wrapper = await mountSuspended(ScrollButton, { props: { href: '#about', label: 'x' } })
    await wrapper.get('a').trigger('click')
    expect(document.activeElement?.id).toBe('about')
  })
})
