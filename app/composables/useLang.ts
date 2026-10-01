import { content, type Lang } from '~/data/profile'

/** Sprache ergibt sich aus der URL: "/" = Deutsch, "/en" = Englisch. Das Impressum liegt unter /impressum bzw. /en/legal-notice. */
export function useLang() {
  const route = useRoute()
  const lang = computed<Lang>(() => (/^\/en(\/|$)/.test(route.path) ? 'en' : 'de'))
  const t = computed(() => content[lang.value])
  const isImprint = computed(() => /^\/(en\/legal-notice|impressum)\/?$/.test(route.path))
  /** Gleiche Seite in der jeweils anderen Sprache (für Sprachschalter, canonical und hreflang). */
  const paths = computed<Record<Lang, string>>(() =>
    isImprint.value ? { de: '/impressum', en: '/en/legal-notice' } : { de: '/', en: '/en' }
  )
  const homePath = computed(() => (lang.value === 'en' ? '/en' : '/'))
  const imprintPath = computed(() => (lang.value === 'en' ? '/en/legal-notice' : '/impressum'))

  return { lang, t, paths, isImprint, homePath, imprintPath }
}
