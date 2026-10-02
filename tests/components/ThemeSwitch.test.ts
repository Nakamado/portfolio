import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ThemeSwitch from '~/components/ThemeSwitch.vue'
import { THEME_KEY } from '~/utils/theme'

describe('ThemeSwitch', () => {
  beforeEach(() => {
    window.localStorage.clear()
    delete document.documentElement.dataset.theme
    clearNuxtState('theme')
  })
  afterEach(() => {
    delete document.documentElement.dataset.theme
    clearNuxtState('theme')
  })

  const mount = () => mountSuspended(ThemeSwitch, { props: { label: 'Helles Design' } })

  it('ist ein Button mit Beschriftung, Zustand und beiden Symbolen', async () => {
    const wrapper = await mount()
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.attributes('aria-label')).toBe('Helles Design')
    expect(wrapper.attributes('aria-pressed')).toBe('false')
    expect(wrapper.findAll('svg[aria-hidden="true"]')).toHaveLength(2)
    expect(wrapper.find('.theme-switch__icon--moon').exists()).toBe(true)
    expect(wrapper.find('.theme-switch__icon--sun').exists()).toBe(true)
  })

  it('übernimmt nach dem Einhängen das Theme, das das Skript im Head gesetzt hat', async () => {
    document.documentElement.dataset.theme = 'light'
    const wrapper = await mount()
    expect(wrapper.attributes('aria-pressed')).toBe('true')
  })

  it('wechselt bei jedem Klick, setzt data-theme und merkt sich die Wahl', async () => {
    const wrapper = await mount()
    await wrapper.trigger('click')
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(window.localStorage.getItem(THEME_KEY)).toBe('light')
    expect(wrapper.attributes('aria-pressed')).toBe('true')

    await wrapper.trigger('click')
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(window.localStorage.getItem(THEME_KEY)).toBe('dark')
    expect(wrapper.attributes('aria-pressed')).toBe('false')
  })
})
