import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SectionPager from '~/components/SectionPager.vue'

describe('SectionPager', () => {
  it('ist im Hero ausgeblendet und zeigt auf "Über mich"', async () => {
    const wrapper = await mountSuspended(SectionPager, { route: '/' })
    expect(wrapper.classes()).not.toContain('pager--visible')
    expect(wrapper.attributes('href')).toBe('#about')
    expect(wrapper.attributes('aria-label')).toContain('Über mich')
  })
})
