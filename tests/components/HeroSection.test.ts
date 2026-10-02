import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import HeroSection from '~/components/HeroSection.vue'

describe('HeroSection', () => {
  // useRuntimeConfig braucht die Nuxt-Instanz und darf deshalb erst innerhalb der Tests laufen
  const config = () => useRuntimeConfig().public
  let original = { linkedin: '', github: '' }
  beforeEach(() => {
    original = { linkedin: config().linkedinUrl, github: config().githubUrl }
  })
  afterEach(() => {
    config().linkedinUrl = original.linkedin
    config().githubUrl = original.github
  })

  it('verlinkt den deutschen Lebenslauf, Kontakt und LinkedIn', async () => {
    config().linkedinUrl = 'https://www.linkedin.com/in/test/'
    const wrapper = await mountSuspended(HeroSection, { route: '/' })
    expect(wrapper.get('a[download]').attributes('href')).toBe('/cv/Lebenslauf-Dustin-Clever.pdf')
    expect(wrapper.find('a[href="https://www.linkedin.com/in/test/"]').exists()).toBe(true)
    expect(wrapper.find('a[href^="mailto:"]').exists()).toBe(true)
    expect(wrapper.get('h1').text()).toBeTruthy()
  })

  it('verlinkt GitHub, wenn eine URL gesetzt ist, und blendet es sonst aus', async () => {
    config().githubUrl = 'https://github.com/test'
    const wrapper = await mountSuspended(HeroSection, { route: '/' })
    expect(wrapper.get('a[href="https://github.com/test"]').text()).toBe('GitHub')

    config().githubUrl = ''
    const without = await mountSuspended(HeroSection, { route: '/' })
    expect(without.find('a[href*="github"]').exists()).toBe(false)
  })

  it('verlinkt den englischen Lebenslauf', async () => {
    const wrapper = await mountSuspended(HeroSection, { route: '/en' })
    expect(wrapper.get('a[download]').attributes('href')).toBe('/cv/CV-Dustin-Clever.pdf')
  })

  it('blendet LinkedIn aus, wenn keine URL gesetzt ist', async () => {
    config().linkedinUrl = ''
    const wrapper = await mountSuspended(HeroSection, { route: '/' })
    expect(wrapper.find('a[href*="linkedin"]').exists()).toBe(false)
    expect(wrapper.find('a[href^="mailto:"]').exists()).toBe(true)
  })

  it('setzt nach Klick auf einen Ankerlink den Fokus auf den Zielabschnitt', async () => {
    document.body.innerHTML = ['contact', 'about', 'projects'].map((id) => `<section id="${id}" tabindex="-1"></section>`).join('')
    const wrapper = await mountSuspended(HeroSection, { route: '/' })
    for (const [selector, id] of [
      ['a.button', 'contact'],
      ['a.scroll-button', 'about'],
      ['.hero__more[href="#about"]', 'about'],
      ['.hero__more[href="#projects"]', 'projects']
    ] as const) {
      ;(document.activeElement as HTMLElement | null)?.blur()
      await wrapper.get(selector).trigger('click')
      expect(document.activeElement?.id).toBe(id)
    }
    document.body.innerHTML = ''
  })
})
