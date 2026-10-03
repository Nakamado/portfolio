<script setup lang="ts">
const { lang, t, paths, legal, isNotFound, noindex, isPatterns, isHome } = useLang()
const pageTitle = computed(() =>
  legal.value ? t.value[legal.value].metaTitle : isPatterns.value ? t.value.patterns.metaTitle : isNotFound.value ? t.value.notFound.metaTitle : t.value.meta.title
)
const { siteUrl, linkedinUrl, githubUrl, contactEmail } = useRuntimeConfig().public
const base = normalizeBase(siteUrl)
const social = computed(() => socialImage(base, lang.value))

useHead({
  htmlAttrs: { lang: computed(() => lang.value) },
  title: pageTitle,
  link: computed(() => headLinks(isNotFound.value ? '' : base, lang.value, paths.value)), // die Fehlerseite hat keine Canonical-Adresse
  script: computed(() => [
    { innerHTML: themeScript }, // setzt das Theme, bevor die Seite gezeichnet wird
    // Strukturierte Daten nur auf der Startseite, denn sie beschreiben die Person und die Website, nicht die Unterseiten
    ...(isHome.value
      ? [
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify(
              structuredData({ base, lang: lang.value, homePath: paths.value[lang.value], role: t.value.hero.role, email: contactEmail, linkedinUrl, githubUrl })
            )
          }
        ]
      : [])
  ])
})

useSeoMeta({
  description: () => t.value.meta.description,
  robots: () => robotsContent(noindex.value),
  ogTitle: () => pageTitle.value,
  ogDescription: () => t.value.meta.description,
  ogType: 'website',
  ogLocale: () => (lang.value === 'en' ? 'en_US' : 'de_DE'),
  ogLocaleAlternate: () => (lang.value === 'en' ? 'de_DE' : 'en_US'),
  ogUrl: () => pageUrl(base, paths.value[lang.value]),
  ogImage: () => social.value.image,
  ogImageWidth: () => social.value.width,
  ogImageHeight: () => social.value.height,
  ogImageAlt: () => t.value.hero.imageAlt,
  twitterCard: () => social.value.card,
  twitterImage: () => social.value.image
})
</script>

<template>
  <a class="skip-link" href="#main">{{ t.ui.skip }}</a>
  <SiteHeader />
  <main id="main" class="main" tabindex="-1">
    <NuxtPage />
  </main>
  <SiteFooter />
  <SectionPager />
</template>
