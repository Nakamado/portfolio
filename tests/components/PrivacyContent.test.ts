import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import PrivacyContent from '~/components/PrivacyContent.vue'
import SiteHeader from '~/components/SiteHeader.vue'
import SiteFooter from '~/components/SiteFooter.vue'
import { content } from '~/data/profile'

describe('Datenschutzerklärung', () => {
  it('hat genau eine h1 und eine h2 pro Abschnitt (deutsch)', async () => {
    const wrapper = await mountSuspended(PrivacyContent, { route: '/datenschutz' })
    expect(wrapper.findAll('h1')).toHaveLength(1)
    expect(wrapper.find('h1').text()).toBe('Datenschutzerklärung')
    // Verantwortlicher plus alle Abschnitte aus dem Inhalt
    expect(wrapper.findAll('h2')).toHaveLength(content.de.privacy.sections.length + 1)
    expect(wrapper.find('a[href^="mailto:"]').exists()).toBe(true)
  })

  it('ist auch auf Englisch verfügbar und führt zurück zur englischen Startseite', async () => {
    const wrapper = await mountSuspended(PrivacyContent, { route: '/en/privacy' })
    expect(wrapper.find('h1').text()).toBe('Privacy policy')
    expect(wrapper.find('.privacy__back').attributes('href')).toBe('/en')
  })

  it('der Sprachschalter führt auf die jeweils andere Version', async () => {
    const wrapper = await mountSuspended(SiteHeader, { route: '/datenschutz' })
    expect(wrapper.findAll('.lang-switch__link').map((l) => l.attributes('href'))).toEqual(['/datenschutz', '/en/privacy'])
  })

  it('der Footer verlinkt Impressum, Datenschutz und Pattern-Library je Sprache', async () => {
    const de = await mountSuspended(SiteFooter, { route: '/' })
    expect(de.findAll('.site-footer__link').map((l) => l.attributes('href'))).toEqual(['/impressum', '/datenschutz', '/pattern-library'])
    const en = await mountSuspended(SiteFooter, { route: '/en' })
    expect(en.findAll('.site-footer__link').map((l) => l.attributes('href'))).toEqual(['/en/legal-notice', '/en/privacy', '/en/pattern-library'])
  })

  it('hat in beiden Sprachen gleich viele Abschnitte', () => {
    expect(content.en.privacy.sections).toHaveLength(content.de.privacy.sections.length)
  })
})
