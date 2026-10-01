import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import HomeContent from '~/components/HomeContent.vue'
import SiteHeader from '~/components/SiteHeader.vue'

describe.each(['/', '/en'])('HomeContent (%s): SEO und Barrierefreiheit', (route) => {
  it('hat genau eine h1 und überspringt keine Überschriftenebene', async () => {
    const wrapper = await mountSuspended(HomeContent, { route })
    const levels = wrapper.findAll('h1,h2,h3,h4,h5,h6').map((h) => Number(h.element.tagName[1]))
    expect(levels[0]).toBe(1)
    expect(levels.filter((l) => l === 1)).toHaveLength(1)
    levels.slice(1).forEach((level, i) => expect(level - levels[i]!).toBeLessThanOrEqual(1))
  })

  it('hat pro Hauptabschnitt genau eine h2', async () => {
    const wrapper = await mountSuspended(HomeContent, { route })
    const sections = wrapper.findAll('section[id]')
    expect(sections).toHaveLength(6)
    sections.slice(1).forEach((section) => expect(section.findAll('h2')).toHaveLength(1))
  })

  it('macht jeden Abschnitt per Skript fokussierbar (Anker-Navigation setzt den Fokus)', async () => {
    const wrapper = await mountSuspended(HomeContent, { route })
    for (const section of wrapper.findAll('section[id]')) expect(section.attributes('tabindex')).toBe('-1')
  })

  it('gibt jedem Bild einen Alt-Text mit Größenangaben', async () => {
    const wrapper = await mountSuspended(HomeContent, { route })
    for (const img of wrapper.findAll('img')) {
      expect(img.attributes('alt')).toBeTruthy()
      expect(img.attributes('width')).toBeTruthy()
      expect(img.attributes('height')).toBeTruthy()
    }
  })

  it('verwendet eindeutige IDs', async () => {
    const wrapper = await mountSuspended(HomeContent, { route })
    const ids = wrapper.findAll('[id]').map((el) => el.attributes('id'))
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('hat für jeden Navigationspunkt einen passenden Abschnitt', async () => {
    const header = await mountSuspended(SiteHeader, { route })
    const home = await mountSuspended(HomeContent, { route })
    const targets = header.findAll('.site-header__link').map((a) => a.attributes('href')!.slice(1))
    expect(targets).toHaveLength(5)
    for (const id of targets) expect(home.find(`#${id}`).exists()).toBe(true)
  })
})

describe('Überschriften-Navigation per Tab', () => {
  it('macht die h2 jedes Abschnitts per Tab erreichbar, ohne sie zu Link oder Button zu machen', async () => {
    const wrapper = await mountSuspended(HomeContent, { route: '/' })
    const headings = wrapper.findAll('section h2')
    expect(headings).toHaveLength(5)
    for (const h of headings) {
      expect(h.attributes('tabindex')).toBe('0')
      expect(h.attributes('role')).toBeUndefined()
    }
  })
})
