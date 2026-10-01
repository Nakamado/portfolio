export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxt/fonts', '@nuxt/test-utils/module'],
  css: ['~/assets/scss/main.scss'],
  typescript: { strict: true },
  fonts: {
    // Explizit, damit alle genutzten Schriftschnitte geladen und selbst ausgeliefert werden
    families: [
      { name: 'Space Grotesk', provider: 'google', weights: [400, 500, 700], styles: ['normal'] },
      { name: 'Roboto Slab', provider: 'google', weights: [500, 700], styles: ['normal'] }
    ]
  },
  app: {
    head: {
      htmlAttrs: { lang: 'de' },
      meta: [{ name: 'theme-color', content: '#1a1d26' }],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
    }
  },
  nitro: {
    prerender: { routes: ['/', '/en', '/impressum', '/en/legal-notice', '/robots.txt', '/sitemap.xml'] }
  },
  runtimeConfig: {
    public: {
      siteUrl: 'https://www.dustin-clever.de/',
      contactEmail: 'dustin.clever@googlemail.com',
      linkedinUrl: 'https://www.linkedin.com/in/dustin-clever/',
      imprintStreet: 'Rotdornweg 1',
      imprintCity: '51519 Odenthal',
      imprintPhone: '' // optional, leer lassen = nicht anzeigen
    }
  }
})
