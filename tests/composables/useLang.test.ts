import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'

const Probe = defineComponent({
  setup() {
    return useLang()
  },
  render: () => h('div')
})

const de = { imprintPath: '/impressum', privacyPath: '/datenschutz', patternsPath: '/pattern-library', homePath: '/', lang: 'de' }
const en = { imprintPath: '/en/legal-notice', privacyPath: '/en/privacy', patternsPath: '/en/pattern-library', homePath: '/en', lang: 'en' }
const home = { de: '/', en: '/en' }
const imprint = { de: '/impressum', en: '/en/legal-notice' }
const privacy = { de: '/datenschutz', en: '/en/privacy' }
const patterns = { de: '/pattern-library', en: '/en/pattern-library' }

const cases = [
  { route: '/', ...de, legal: null, isPatterns: false, paths: home, isHome: true, isNotFound: false },
  { route: '/en', ...en, legal: null, isPatterns: false, paths: home, isHome: true, isNotFound: false },
  { route: '/impressum', ...de, legal: 'imprint', isPatterns: false, paths: imprint, isHome: false, isNotFound: false },
  { route: '/en/legal-notice', ...en, legal: 'imprint', isPatterns: false, paths: imprint, isHome: false, isNotFound: false },
  { route: '/datenschutz', ...de, legal: 'privacy', isPatterns: false, paths: privacy, isHome: false, isNotFound: false },
  { route: '/en/privacy', ...en, legal: 'privacy', isPatterns: false, paths: privacy, isHome: false, isNotFound: false },
  { route: '/pattern-library', ...de, legal: null, isPatterns: true, paths: patterns, isHome: false, isNotFound: false },
  { route: '/en/pattern-library', ...en, legal: null, isPatterns: true, paths: patterns, isHome: false, isNotFound: false },
  { route: '/gibt-es-nicht', ...de, legal: null, isPatterns: false, paths: home, isHome: false, isNotFound: true },
  { route: '/en/does-not-exist', ...en, legal: null, isPatterns: false, paths: home, isHome: false, isNotFound: true }
] as const

describe.each(cases)('useLang auf $route', (c) => {
  it('leitet Sprache, Seite und Pfade aus der URL ab', async () => {
    const vm = (await mountSuspended(Probe, { route: c.route })).vm as unknown as ReturnType<typeof useLang> & Record<string, unknown>
    expect(vm.lang).toBe(c.lang)
    expect(vm.legal).toBe(c.legal)
    expect(vm.isLegal).toBe(c.legal !== null)
    expect(vm.isImprint).toBe(c.legal === 'imprint')
    expect(vm.isPatterns).toBe(c.isPatterns)
    expect(vm.isHome).toBe(c.isHome)
    expect(vm.isNotFound).toBe(c.isNotFound)
    expect(vm.noindex).toBe(c.legal !== null || c.isNotFound)
    expect(vm.paths).toEqual(c.paths)
    expect(vm.homePath).toBe(c.homePath)
    expect(vm.imprintPath).toBe(c.imprintPath)
    expect(vm.privacyPath).toBe(c.privacyPath)
    expect(vm.patternsPath).toBe(c.patternsPath)
    expect((vm.t as { ui: { skip: string } }).ui.skip).toBeTruthy()
  })
})
