import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ImprintContent from '~/components/ImprintContent.vue'
import SiteHeader from '~/components/SiteHeader.vue'
import SiteFooter from '~/components/SiteFooter.vue'

describe('Impressum', () => {
  it('hat genau eine h1 und je Block eine h2 (deutsch)', async () => {
    const wrapper = await mountSuspended(ImprintContent, { route: '/impressum' })
    expect(wrapper.findAll('h1')).toHaveLength(1)
    expect(wrapper.find('h1').text()).toBe('Impressum')
    expect(wrapper.findAll('h2').length).toBeGreaterThanOrEqual(3)
    expect(wrapper.text()).toContain('Dustin Clever')
  })

  it('verlinkt die E-Mail-Adresse und markiert offene Angaben', async () => {
    const wrapper = await mountSuspended(ImprintContent, { route: '/impressum' })
    expect(wrapper.find('a[href^="mailto:"]').exists()).toBe(true)
    // Solange die Anschrift nicht eingetragen ist, wird sie als Platzhalter hervorgehoben
    expect(wrapper.findAll('.imprint__line--todo').length).toBeGreaterThan(0)
  })

  it('ist auch auf Englisch verfügbar', async () => {
    const wrapper = await mountSuspended(ImprintContent, { route: '/en/legal-notice' })
    expect(wrapper.find('h1').text()).toBe('Legal notice')
    expect(wrapper.find('.imprint__back').attributes('href')).toBe('/en')
  })

  it('der Sprachschalter führt auf die jeweils andere Impressum-Version', async () => {
    const wrapper = await mountSuspended(SiteHeader, { route: '/impressum' })
    expect(wrapper.findAll('.lang-switch__link').map((l) => l.attributes('href'))).toEqual(['/impressum', '/en/legal-notice'])
  })

  it('Menü und Logo führen vom Impressum zurück zu den Abschnitten der Startseite', async () => {
    const wrapper = await mountSuspended(SiteHeader, { route: '/impressum' })
    const hrefs = wrapper.findAll('.site-header__link').map((l) => l.attributes('href'))
    expect(hrefs[0]).toBe('/#about')
    expect(wrapper.find('.site-header__brand').attributes('href')).toBe('/#top')
  })

  it('der Footer verlinkt das Impressum je Sprache', async () => {
    const de = await mountSuspended(SiteFooter, { route: '/' })
    expect(de.find('.site-footer__link').attributes('href')).toBe('/impressum')
    const en = await mountSuspended(SiteFooter, { route: '/en' })
    expect(en.find('.site-footer__link').attributes('href')).toBe('/en/legal-notice')
  })
})
