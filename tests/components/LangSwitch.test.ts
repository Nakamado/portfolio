import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import LangSwitch from '~/components/LangSwitch.vue'

const paths = { de: '/a', en: '/en/a' }

describe('LangSwitch', () => {
  it.each([
    ['de', 'de'],
    ['en', 'en']
  ] as const)('markiert bei lang="%s" nur "%s" als aktiv und setzt den Zustand als Klasse', async (lang, active) => {
    const wrapper = await mountSuspended(LangSwitch, { props: { lang, paths, label: 'Sprache' } })
    expect(wrapper.get('nav').attributes('aria-label')).toBe('Sprache')
    expect(wrapper.get('nav').classes()).toContain(`lang-switch--${lang}`)
    const current = wrapper.findAll('[aria-current="page"]')
    expect(current).toHaveLength(1)
    expect(current[0]!.text()).toBe(active)
  })

  it('verlinkt beide Sprachen mit den übergebenen Pfaden, lang, hreflang und ausgeschriebenem Namen', async () => {
    const wrapper = await mountSuspended(LangSwitch, { props: { lang: 'de', paths, label: 'Sprache' } })
    const links = wrapper.findAll('a.lang-switch__link')
    expect(links.map((l) => l.attributes('href'))).toEqual(['/a', '/en/a'])
    expect(links.map((l) => l.attributes('lang'))).toEqual(['de', 'en'])
    expect(links.map((l) => l.attributes('hreflang'))).toEqual(['de', 'en'])
    expect(links.map((l) => l.attributes('aria-label'))).toEqual(['Deutsch (DE)', 'English (EN)'])
  })
})
