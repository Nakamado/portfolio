import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SiteHeader from '~/components/SiteHeader.vue'

describe('SiteHeader', () => {
  it('zeigt auf "/" die deutsche Navigation und markiert DE als aktiv', async () => {
    const wrapper = await mountSuspended(SiteHeader, { route: '/' })
    expect(wrapper.text()).toContain('Über mich')
    expect(wrapper.find('.lang-switch__link[aria-current="page"]').text()).toBe('de')
  })

  it('zeigt auf "/en" die englische Navigation und markiert EN als aktiv', async () => {
    const wrapper = await mountSuspended(SiteHeader, { route: '/en' })
    expect(wrapper.text()).toContain('Experience')
    expect(wrapper.find('.lang-switch__link[aria-current="page"]').text()).toBe('en')
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

describe('SiteHeader: Fokus nach Klick', () => {
  it('setzt nach Klick auf Logo und Menüpunkt den Fokus auf den Zielabschnitt', async () => {
    document.body.innerHTML = '<section id="top" tabindex="-1"></section><section id="about" tabindex="-1"><h2 tabindex="0">x</h2></section>'
    const wrapper = await mountSuspended(SiteHeader, { route: '/' })
    await wrapper.get('.site-header__brand').trigger('click')
    expect(document.activeElement?.id).toBe('top')
    await wrapper.get('.site-header__link').trigger('click')
    expect(document.activeElement?.tagName).toBe('H2')
    document.body.innerHTML = ''
  })

  it('behält die Klick-Handler auch nach einem erneuten Rendern (Sprachwechsel)', async () => {
    document.body.innerHTML = '<section id="top" tabindex="-1"></section><section id="about" tabindex="-1"></section>'
    const wrapper = await mountSuspended(SiteHeader, { route: '/' })
    await navigateTo('/en')
    await nextTick()
    await nextTick()
    await wrapper.get('.site-header__brand').trigger('click')
    expect(document.activeElement?.id).toBe('top')
    await wrapper.get('.site-header__link').trigger('click')
    expect(document.activeElement?.id).toBe('about')
    document.body.innerHTML = ''
  })
})

describe('SiteHeader auf der Pattern-Library', () => {
  it.each([
    ['/pattern-library', '/#top', '/#about'],
    ['/en/pattern-library', '/en#top', '/en#about']
  ])('führt Logo und Menü auf %s zur Startseite und schaltet die Sprache auf die Schwesterseite', async (route, brand, firstLink) => {
    const wrapper = await mountSuspended(SiteHeader, { route })
    expect(wrapper.get('.site-header__brand').attributes('href')).toBe(brand)
    expect(wrapper.get('.site-header__link').attributes('href')).toBe(firstLink)
    expect(wrapper.findAll('.lang-switch__link').map((l) => l.attributes('href'))).toEqual(['/pattern-library', '/en/pattern-library'])
  })
})
