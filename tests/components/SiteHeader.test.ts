import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SiteHeader from '~/components/SiteHeader.vue'

describe('SiteHeader', () => {
  it('zeigt auf "/" die deutsche Navigation und markiert DE als aktiv', async () => {
    const wrapper = await mountSuspended(SiteHeader, { route: '/' })
    expect(wrapper.text()).toContain('Über mich')
    expect(wrapper.find('.lang-switch__link[aria-current="page"]').text()).toBe('DE')
  })

  it('zeigt auf "/en" die englische Navigation und markiert EN als aktiv', async () => {
    const wrapper = await mountSuspended(SiteHeader, { route: '/en' })
    expect(wrapper.text()).toContain('Experience')
    expect(wrapper.find('.lang-switch__link[aria-current="page"]').text()).toBe('EN')
  })

  it('verlinkt die Sprachversionen mit lang und hreflang', async () => {
    const wrapper = await mountSuspended(SiteHeader, { route: '/' })
    const links = wrapper.findAll('.lang-switch__link')
    expect(links.map((l) => l.attributes('href'))).toEqual(['/', '/en'])
    expect(links.map((l) => l.attributes('hreflang'))).toEqual(['de', 'en'])
  })

  it('stellt den Sprachschalter je nach Route auf DE oder EN', async () => {
    const de = await mountSuspended(SiteHeader, { route: '/' })
    expect(de.find('.lang-switch').classes()).toContain('lang-switch--de')
    const en = await mountSuspended(SiteHeader, { route: '/en' })
    expect(en.find('.lang-switch').classes()).toContain('lang-switch--en')
  })
})
