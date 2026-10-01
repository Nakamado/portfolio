import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ContactSection from '~/components/ContactSection.vue'

describe('ContactSection', () => {
  it('zeigt die E-Mail-Adresse als mailto-Link', async () => {
    const wrapper = await mountSuspended(ContactSection)
    const mail = wrapper.find('.contact__mail')
    expect(mail.text()).toBe('dustin.clever@googlemail.com')
    expect(mail.attributes('href')).toBe('mailto:dustin.clever@googlemail.com')
  })

  it('verlinkt beide Lebenslauf-PDFs', async () => {
    const wrapper = await mountSuspended(ContactSection)
    const hrefs = wrapper.findAll('a').map((a) => a.attributes('href'))
    expect(hrefs).toContain('/cv/Lebenslauf-Dustin-Clever.pdf')
    expect(hrefs).toContain('/cv/CV-Dustin-Clever.pdf')
  })
})
