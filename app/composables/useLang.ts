import { content, type Lang } from '~/data/profile'

export type LegalPage = 'imprint' | 'privacy'

/**
 * Sprache ergibt sich aus der URL: "/" = Deutsch, "/en" = Englisch.
 * Impressum: /impressum und /en/legal-notice, Datenschutz: /datenschutz und /en/privacy,
 * Pattern-Library: /pattern-library und /en/pattern-library.
 * Alles andere ist die 404-Seite, ihre Sprache folgt ebenfalls dem Präfix (/en/...).
 */
export function useLang() {
  const route = useRoute()
  const lang = computed<Lang>(() => (/^\/en(\/|$)/.test(route.path) ? 'en' : 'de'))
  const t = computed(() => content[lang.value])

  const legal = computed<LegalPage | null>(() => {
    if (/^\/(en\/legal-notice|impressum)\/?$/.test(route.path)) return 'imprint'
    if (/^\/(en\/privacy|datenschutz)\/?$/.test(route.path)) return 'privacy'
    return null
  })
  const isPatterns = computed(() => /^\/(en\/pattern-library|pattern-library)\/?$/.test(route.path))
  const isImprint = computed(() => legal.value === 'imprint')
  const isLegal = computed(() => legal.value !== null)
  /** Startseite: nur hier gibt es die Abschnitte, zu denen Menü und Logo scrollen. */
  const isHome = computed(() => /^\/(en)?\/?$/.test(route.path))
  /** Jede andere Adresse zeigt die 404-Seite (Catch-all in pages/[...slug].vue). */
  const isNotFound = computed(() => !isHome.value && !isLegal.value && !isPatterns.value)
  /** Seiten, die nicht in die Suchergebnisse sollen: Rechtstexte und die Fehlerseite. */
  const noindex = computed(() => isLegal.value || isNotFound.value)

  /** Gleiche Seite in der jeweils anderen Sprache (für Sprachschalter, canonical und hreflang). */
  const paths = computed<Record<Lang, string>>(() => {
    if (legal.value === 'imprint') return { de: '/impressum', en: '/en/legal-notice' }
    if (legal.value === 'privacy') return { de: '/datenschutz', en: '/en/privacy' }
    if (isPatterns.value) return { de: '/pattern-library', en: '/en/pattern-library' }
    return { de: '/', en: '/en' }
  })
  const homePath = computed(() => (lang.value === 'en' ? '/en' : '/'))
  const imprintPath = computed(() => (lang.value === 'en' ? '/en/legal-notice' : '/impressum'))
  const privacyPath = computed(() => (lang.value === 'en' ? '/en/privacy' : '/datenschutz'))
  const patternsPath = computed(() => (lang.value === 'en' ? '/en/pattern-library' : '/pattern-library'))

  return { lang, t, paths, legal, isImprint, isLegal, isPatterns, isHome, isNotFound, noindex, homePath, imprintPath, privacyPath, patternsPath }
}
