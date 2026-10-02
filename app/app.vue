<script setup lang="ts">
const { lang, t, paths, legal } = useLang()
const pageTitle = computed(() => (legal.value ? t.value[legal.value].metaTitle : t.value.meta.title))
const { siteUrl, linkedinUrl, contactEmail } = useRuntimeConfig().public
const base = normalizeBase(siteUrl)
const social = socialImage(base)

useHead({
  htmlAttrs: { lang: computed(() => lang.value) },
  title: pageTitle,
  link: computed(() => headLinks(base, lang.value, paths.value)),
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
