<script setup lang="ts">
const { lang, t, paths, legal } = useLang()
const pageTitle = computed(() => (legal.value ? t.value[legal.value].metaTitle : t.value.meta.title))
const { siteUrl, linkedinUrl, contactEmail } = useRuntimeConfig().public
const base = siteUrl.replace(/\/$/, '')
const abs = (path: string) => `${base}${path}`
const ogImage = base ? abs('/images/og-image.jpg') : undefined

useHead({
  htmlAttrs: { lang: computed(() => lang.value) },
  title: pageTitle,
  link: computed(() =>
    base
      ? [
          { rel: 'canonical', href: abs(paths.value[lang.value]) },
          { rel: 'alternate', hreflang: 'de', href: abs(paths.value.de) },
          { rel: 'alternate', hreflang: 'en', href: abs(paths.value.en) },
          { rel: 'alternate', hreflang: 'x-default', href: abs(paths.value.de) }
        ]
      : []
  ),
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Dustin Clever',
          jobTitle: t.value.hero.role,
          email: contactEmail,
          ...(base ? { url: abs(paths.value[lang.value]), image: abs('/images/og-image.jpg') } : {}),
          ...(linkedinUrl ? { sameAs: [linkedinUrl] } : {})
        })
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
  ogUrl: () => (base ? abs(paths.value[lang.value]) : undefined),
  ogImage,
  ogImageWidth: ogImage ? 1200 : undefined,
  ogImageHeight: ogImage ? 630 : undefined,
  ogImageAlt: () => t.value.hero.imageAlt,
  twitterCard: ogImage ? 'summary_large_image' : 'summary',
  twitterImage: ogImage
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
