import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ImprintContent from '~/components/ImprintContent.vue'
import SiteHeader from '~/components/SiteHeader.vue'
import SiteFooter from '~/components/SiteFooter.vue'
import { isPlaceholder } from '~/utils/placeholder'

describe('Impressum', () => {
  it('hat genau eine h1 und je Block eine h2 (deutsch)', async () => {
    const wrapper = await mountSuspended(ImprintContent, { route: '/impressum' })
    expect(wrapper.findAll('h1')).toHaveLength(1)
    expect(wrapper.find('h1').text()).toBe('Impressum')
    expect(wrapper.findAll('h2').length).toBeGreaterThanOrEqual(3)
    expect(wrapper.text()).toContain('Dustin Clever')
  })

  it('verlinkt die E-Mail-Adresse und zeigt Name, Straße und Ort', async () => {
    const wrapper = await mountSuspended(ImprintContent, { route: '/impressum' })
    expect(wrapper.find('a[href^="mailto:"]').exists()).toBe(true)
    expect(wrapper.findAll('.imprint__address .imprint__line')).toHaveLength(3)
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

describe('isPlaceholder', () => {
  it('erkennt offene Angaben in eckigen Klammern', () => {
    expect(isPlaceholder('[Straße und Hausnummer ergänzen]')).toBe(true)
    expect(isPlaceholder('[PLZ ergänzen] Odenthal')).toBe(true)
  })

  it('lässt ausgefüllte Angaben in Ruhe', () => {
    expect(isPlaceholder('Rotdornweg 1')).toBe(false)
    expect(isPlaceholder('51519 Odenthal')).toBe(false)
  })
})

describe('Impressum: Telefonnummer', () => {
  let original = ''
  beforeEach(() => {
    original = useRuntimeConfig().public.imprintPhone
  })
  afterEach(() => {
    useRuntimeConfig().public.imprintPhone = original
  })

  it('erscheint als tel-Link ohne Leerzeichen, wenn eine Nummer gesetzt ist', async () => {
    useRuntimeConfig().public.imprintPhone = '+49 123 456-789'
    const wrapper = await mountSuspended(ImprintContent, { route: '/impressum' })
    expect(wrapper.find('a[href="tel:+49123456789"]').exists()).toBe(true)
  })

  it('entfällt ohne Nummer', async () => {
    useRuntimeConfig().public.imprintPhone = ''
    const wrapper = await mountSuspended(ImprintContent, { route: '/impressum' })
    expect(wrapper.find('a[href^="tel:"]').exists()).toBe(false)
  })

  it('markiert offene Platzhalter in der Adresse', async () => {
    const config = useRuntimeConfig().public
    const { imprintStreet, imprintCity } = config
    config.imprintStreet = '[Straße ergänzen]'
    config.imprintCity = '[PLZ ergänzen]'
    try {
      const wrapper = await mountSuspended(ImprintContent, { route: '/impressum' })
      expect(wrapper.findAll('.imprint__line--todo')).toHaveLength(2)
    } finally {
      config.imprintStreet = imprintStreet
      config.imprintCity = imprintCity
    }
  })
})
