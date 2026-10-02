import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import App from '~/app.vue'

describe('App', () => {
  it.each(['/', '/en', '/impressum'])('baut auf %s das Grundgerüst mit Sprunglink, Header, Hauptbereich und Footer', async (route) => {
    const wrapper = await mountSuspended(App, { route })
    expect(wrapper.get('a.skip-link').attributes('href')).toBe('#main')
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('main#main').exists()).toBe(true)
    expect(wrapper.find('footer').exists()).toBe(true)
  })
})
