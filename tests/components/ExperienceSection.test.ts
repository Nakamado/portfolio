import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ExperienceSection from '~/components/ExperienceSection.vue'

describe('ExperienceSection', () => {
  it('zeigt Kaufland-Station und Ausbildung', async () => {
    const wrapper = await mountSuspended(ExperienceSection)
    expect(wrapper.text()).toContain('real.digital / Kaufland e-commerce')
    expect(wrapper.text()).toContain('Gestaltungstechnischer Assistent')
    expect(wrapper.findAll('[data-testid="jobs"] > li')).toHaveLength(6)
    expect(wrapper.findAll('[data-testid="education"] > li')).toHaveLength(3)
  })
})
