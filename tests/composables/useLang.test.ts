import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'

const Probe = defineComponent({
  setup() {
    return useLang()
  },
  render: () => h('div')
})

const cases = [
  { route: '/', lang: 'de', legal: null, paths: { de: '/', en: '/en' }, home: '/', imprint: '/impressum', privacy: '/datenschutz' },
  { route: '/en', lang: 'en', legal: null, paths: { de: '/', en: '/en' }, home: '/en', imprint: '/en/legal-notice', privacy: '/en/privacy' },
  { route: '/impressum', lang: 'de', legal: 'imprint', paths: { de: '/impressum', en: '/en/legal-notice' }, home: '/', imprint: '/impressum', privacy: '/datenschutz' },
  { route: '/en/legal-notice', lang: 'en', legal: 'imprint', paths: { de: '/impressum', en: '/en/legal-notice' }, home: '/en', imprint: '/en/legal-notice', privacy: '/en/privacy' },
  { route: '/datenschutz', lang: 'de', legal: 'privacy', paths: { de: '/datenschutz', en: '/en/privacy' }, home: '/', imprint: '/impressum', privacy: '/datenschutz' },
  { route: '/en/privacy', lang: 'en', legal: 'privacy', paths: { de: '/datenschutz', en: '/en/privacy' }, home: '/en', imprint: '/en/legal-notice', privacy: '/en/privacy' }
] as const

describe.each(cases)('useLang auf $route', (c) => {
  it('leitet Sprache, Seite und Pfade aus der URL ab', async () => {
    const vm = (await mountSuspended(Probe, { route: c.route })).vm as unknown as ReturnType<typeof useLang> & Record<string, unknown>
    expect(vm.lang).toBe(c.lang)
    expect(vm.legal).toBe(c.legal)
    expect(vm.isLegal).toBe(c.legal !== null)
    expect(vm.isImprint).toBe(c.legal === 'imprint')
    expect(vm.paths).toEqual(c.paths)
    expect(vm.homePath).toBe(c.home)
    expect(vm.imprintPath).toBe(c.imprint)
    expect(vm.privacyPath).toBe(c.privacy)
    expect((vm.t as { ui: { skip: string } }).ui.skip).toBeTruthy()
  })
})
