import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ContactSection from '~/components/ContactSection.vue'

describe('ContactSection', () => {
  it('zeigt die E-Mail-Adresse als mailto-Link', async () => {
    const wrapper = await mountSuspended(ContactSection)
    const mail = wrapper.find('.contact__mail')
    expect(mail.text()).toBe('dustin.clever@googlemail.com')
    expect(mail.attributes('href')).toBe('mailto:dustin.clever@googlemail.com')
  })

  it('nennt Region und Arbeitsmodelle in beiden Sprachen', async () => {
    const de = await mountSuspended(ContactSection, { route: '/' })
    expect(de.get('.contact__availability').text()).toBe('Köln & Umgebung · Hybrid / On-site · Remote deutschlandweit')
    const en = await mountSuspended(ContactSection, { route: '/en' })
    expect(en.get('.contact__availability').text()).toBe('Cologne area · Hybrid / on-site · Remote across Germany')
  })

  it('verlinkt beide Lebenslauf-PDFs', async () => {
    const wrapper = await mountSuspended(ContactSection)
    const hrefs = wrapper.findAll('a').map((a) => a.attributes('href'))
    expect(hrefs).toContain('/cv/Lebenslauf-Dustin-Clever.pdf')
    expect(hrefs).toContain('/cv/CV-Dustin-Clever.pdf')
  })

  describe('LinkedIn', () => {
    let original = ''
    beforeEach(() => {
      original = useRuntimeConfig().public.linkedinUrl
    })
    afterEach(() => {
      useRuntimeConfig().public.linkedinUrl = original
    })

    it('wird verlinkt, wenn eine URL gesetzt ist', async () => {
      useRuntimeConfig().public.linkedinUrl = 'https://www.linkedin.com/in/test/'
      const wrapper = await mountSuspended(ContactSection)
      expect(wrapper.find('a[href="https://www.linkedin.com/in/test/"]').exists()).toBe(true)
    })

    it('entfällt ohne URL', async () => {
      useRuntimeConfig().public.linkedinUrl = ''
      const wrapper = await mountSuspended(ContactSection)
      expect(wrapper.find('a[href*="linkedin"]').exists()).toBe(false)
    })
  })

  describe('GitHub', () => {
    let original = ''
    beforeEach(() => {
      original = useRuntimeConfig().public.githubUrl
    })
    afterEach(() => {
      useRuntimeConfig().public.githubUrl = original
    })

    it('wird verlinkt, wenn eine URL gesetzt ist', async () => {
      useRuntimeConfig().public.githubUrl = 'https://github.com/test'
      const wrapper = await mountSuspended(ContactSection)
      const link = wrapper.get('a[href="https://github.com/test"]')
      expect(link.text()).toBe('GitHub')
      expect(link.attributes('rel')).toBe('me noopener')
    })

    it('entfällt ohne URL', async () => {
      useRuntimeConfig().public.githubUrl = ''
      const wrapper = await mountSuspended(ContactSection)
      expect(wrapper.find('a[href*="github"]').exists()).toBe(false)
    })
  })
})
