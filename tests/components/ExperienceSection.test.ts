import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ExperienceSection from '~/components/ExperienceSection.vue'
import { content } from '~/data/profile'

describe('ExperienceSection', () => {
  it('zeigt Kaufland-Station und Ausbildung', async () => {
    const wrapper = await mountSuspended(ExperienceSection)
    expect(wrapper.text()).toContain('real.digital / Kaufland e-commerce')
    expect(wrapper.text()).toContain('Gestaltungstechnischer Assistent')
    expect(wrapper.findAll('[data-testid="jobs"] > li')).toHaveLength(6)
    expect(wrapper.findAll('[data-testid="education"] > li')).toHaveLength(3)
  })
})

describe('ExperienceSection: Hinweise zur Ausbildung', () => {
  it('zeigt eine Notiz nur, wenn es eine gibt', async () => {
    const edu = content.de.experience.education
    const saved = edu.map((e) => e.note)
    edu[0]!.note = undefined
    try {
      const wrapper = await mountSuspended(ExperienceSection, { route: '/' })
      const items = wrapper.findAll('[data-testid="education"] > li')
      expect(items[0]!.find('.timeline__note').exists()).toBe(false)
      expect(items[1]!.find('.timeline__note').exists()).toBe(true)
    } finally {
      edu.forEach((e, i) => (e.note = saved[i]))
    }
  })
})
