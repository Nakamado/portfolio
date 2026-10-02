export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxt/fonts', '@nuxt/test-utils/module'],
  css: ['~/assets/scss/main.scss'],
  typescript: { strict: true },
  vite: {
    css: {
      // SCSS-Variablen und Mixins (Breakpoints, Mindestgrößen, Übergänge) stehen in jeder SCSS-Datei und jedem <style lang="scss"> bereit
      preprocessorOptions: { scss: { additionalData: '@use "~/assets/scss/variables" as *;\n' } }
    }
  },
  fonts: {
    // Explizit, damit alle genutzten Schriftschnitte geladen und selbst ausgeliefert werden.
    // Die Fließtext-Schrift lädt vorab und mit font-display "optional": Kommt sie nicht rechtzeitig, bleibt die Ersatzschrift
    // für diesen Aufruf stehen, statt den Text später umzubrechen (Layout Shift auf dem Handy). Beim nächsten Besuch ist sie im Cache.
    families: [
      { name: 'Space Grotesk', provider: 'google', weights: [400, 500, 700], styles: ['normal'], subsets: ['latin'], preload: true, display: 'optional' },
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
    prerender: { routes: ['/', '/en', '/impressum', '/en/legal-notice', '/datenschutz', '/en/privacy', '/pattern-library', '/en/pattern-library', '/robots.txt', '/sitemap.xml'] }
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
