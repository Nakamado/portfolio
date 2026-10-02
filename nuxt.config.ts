export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxt/fonts', '@nuxt/test-utils/module'],
  css: ['~/assets/scss/main.scss'],
  typescript: { strict: true },
  fonts: {
    // Explizit, damit alle genutzten Schriftschnitte geladen und selbst ausgeliefert werden.
    // Nur "latin" (deckt ä, ö, ü, ß ab) und vorab laden: so liegt die Schrift schon beim ersten Zeichnen bereit
    // und der Text springt nicht mehr, wenn sie nachträglich eintrifft (Layout Shift auf dem Handy).
    families: [
      { name: 'Space Grotesk', provider: 'google', weights: [400, 500, 700], styles: ['normal'], subsets: ['latin'], preload: true },
      { name: 'Roboto Slab', provider: 'google', weights: [500, 700], styles: ['normal'], subsets: ['latin'], preload: true }
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
    prerender: { routes: ['/', '/en', '/impressum', '/en/legal-notice', '/datenschutz', '/en/privacy', '/robots.txt', '/sitemap.xml'] }
  },
  // Per .env überschreibbar: NUXT_PUBLIC_CONTACT_EMAIL, NUXT_PUBLIC_LINKEDIN_URL, NUXT_PUBLIC_SITE_URL
  runtimeConfig: {
    public: {
      siteUrl: '', // z. B. https://dein-name.de (für Canonical, hreflang, Open Graph, Sitemap)
      contactEmail: 'dustin.clever@googlemail.com',
      linkedinUrl: 'https://www.linkedin.com/in/dustin-clever/',
      // Impressum: bitte ergänzen (oder per .env: NUXT_PUBLIC_IMPRINT_STREET, NUXT_PUBLIC_IMPRINT_CITY, NUXT_PUBLIC_IMPRINT_PHONE).
      // Texte in eckigen Klammern werden auf der Seite als Platzhalter markiert.
      imprintStreet: 'Rotdornweg 1',
      imprintCity: '51519 Odenthal',
      imprintPhone: '' // optional, leer lassen = nicht anzeigen
    }
  }
})
