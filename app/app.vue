<script setup lang="ts">
const { lang, t, paths, legal, isNotFound, noindex, isPatterns } = useLang()
const pageTitle = computed(() =>
  legal.value ? t.value[legal.value].metaTitle : isPatterns.value ? t.value.patterns.metaTitle : isNotFound.value ? t.value.notFound.metaTitle : t.value.meta.title
)
const { siteUrl, linkedinUrl, contactEmail } = useRuntimeConfig().public
const base = normalizeBase(siteUrl)
const social = socialImage(base)

useHead({
  htmlAttrs: { lang: computed(() => lang.value) },
  title: pageTitle,
  link: computed(() => headLinks(isNotFound.value ? '' : base, lang.value, paths.value)), // die Fehlerseite hat keine Canonical-Adresse
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() =>
        JSON.stringify(personSchema({ base, lang: lang.value, paths: paths.value, role: t.value.hero.role, email: contactEmail, linkedinUrl }))
      )
    }
  ]
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
  ogImage: social.image,
  ogImageWidth: social.width,
  ogImageHeight: social.height,
  ogImageAlt: () => t.value.hero.imageAlt,
  twitterCard: social.card,
  twitterImage: social.image
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
