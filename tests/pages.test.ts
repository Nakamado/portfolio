import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Home from '~/pages/index.vue'
import HomeEn from '~/pages/en/index.vue'
import Imprint from '~/pages/impressum.vue'
import LegalNotice from '~/pages/en/legal-notice.vue'
import Privacy from '~/pages/datenschutz.vue'
import PrivacyEn from '~/pages/en/privacy.vue'

describe('Seiten', () => {
  it.each([
    ['Startseite (DE)', Home, '/', '#top'],
    ['Startseite (EN)', HomeEn, '/en', '#top'],
    ['Impressum', Imprint, '/impressum', '.imprint'],
    ['Legal notice', LegalNotice, '/en/legal-notice', '.imprint'],
    ['Datenschutz', Privacy, '/datenschutz', '.privacy'],
    ['Privacy', PrivacyEn, '/en/privacy', '.privacy']
  ])('%s rendert ihren Inhalt', async (_name, page, route, selector) => {
    const wrapper = await mountSuspended(page, { route })
    expect(wrapper.find(selector).exists()).toBe(true)
  })
})
