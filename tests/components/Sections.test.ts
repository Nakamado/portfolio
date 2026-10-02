import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { content } from '~/data/profile'
import BaseSection from '~/components/BaseSection.vue'
import AboutSection from '~/components/AboutSection.vue'
import SkillsSection from '~/components/SkillsSection.vue'
import WorkSection from '~/components/WorkSection.vue'
import SiteFooter from '~/components/SiteFooter.vue'

describe('BaseSection', () => {
  it('rendert Überschrift, Slot und Hintergrundvariante', async () => {
    const wrapper = await mountSuspended(BaseSection, {
      props: { id: 'demo', title: 'Titel', alt: true },
      slots: { default: '<p class="inhalt">Text</p>' }
    })
    expect(wrapper.attributes('id')).toBe('demo')
    expect(wrapper.attributes('aria-labelledby')).toBe('demo-title')
    expect(wrapper.classes()).toContain('section--alt')
    expect(wrapper.get('h2').text()).toContain('Titel')
    expect(wrapper.find('.inhalt').exists()).toBe(true)
  })

  it('hat ohne alt keine Hintergrundvariante', async () => {
    const wrapper = await mountSuspended(BaseSection, { props: { id: 'x', title: 'T' } })
    expect(wrapper.classes()).not.toContain('section--alt')
  })
})

describe.each([
  ['/', 'de'],
  ['/en', 'en']
] as const)('Inhaltsabschnitte (%s)', (route, lang) => {
  const t = content[lang]

  it('AboutSection zeigt Absätze, Stärken und Fakten', async () => {
    const wrapper = await mountSuspended(AboutSection, { route })
    expect(wrapper.findAll('.about__paragraph')).toHaveLength(t.about.paragraphs.length)
    expect(wrapper.findAll('dl')[0]!.findAll('dt')).toHaveLength(t.about.strengths.length)
    expect(wrapper.findAll('dl')[1]!.findAll('dt')).toHaveLength(t.about.facts.length)
  })

  it('SkillsSection zeigt alle Gruppen mit ihren Einträgen', async () => {
    const wrapper = await mountSuspended(SkillsSection, { route })
    expect(wrapper.findAll('.skills__group')).toHaveLength(t.skills.groups.length)
    expect(wrapper.findAll('.skills__item')).toHaveLength(t.skills.groups.reduce((n, g) => n + g.items.length, 0))
  })

  it('WorkSection zeigt Einleitung und alle Projekte', async () => {
    const wrapper = await mountSuspended(WorkSection, { route })
    expect(wrapper.get('.section__intro').text()).toBe(t.work.intro)
    expect(wrapper.findAll('.projects__item')).toHaveLength(t.work.projects.length)
  })

  it('SiteFooter verlinkt Impressum, Datenschutz und Pattern-Library in der aktuellen Sprache', async () => {
    const wrapper = await mountSuspended(SiteFooter, { route })
    const hrefs = wrapper.findAll('.site-footer__link').map((a) => a.attributes('href'))
    expect(hrefs).toEqual(lang === 'de' ? ['/impressum', '/datenschutz', '/pattern-library'] : ['/en/legal-notice', '/en/privacy', '/en/pattern-library'])
    expect(wrapper.text()).toContain(String(new Date().getFullYear()))
  })
})
