export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxt/test-utils/module'],
  css: ['~/assets/scss/main.scss'],
  typescript: { strict: true },
  // Das globale Stylesheet (Tokens, Reset, Schriften) wird als Datei eingebunden. Das automatische Einbetten ließ es im statischen Build weg.
  features: { inlineStyles: false },
  vite: {
    css: {
      // SCSS-Variablen und Mixins (Breakpoints, Mindestgrößen, Übergänge) stehen in jeder SCSS-Datei und jedem <style lang="scss"> bereit
      preprocessorOptions: { scss: { additionalData: '@use "~/assets/scss/variables" as *;\n' } }
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'de' },
      meta: [{ name: 'theme-color', content: '#1a1d26' }],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        // Beide Schriften vorladen, sonst beginnt der Download erst, wenn das Stylesheet ausgewertet ist (Layout-Sprung, späterer LCP)
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/space-grotesk-latin.woff2', crossorigin: 'anonymous' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/roboto-slab-latin.woff2', crossorigin: 'anonymous' }
      ]
    }
  },
  nitro: {
    prerender: { routes: ['/', '/en', '/impressum', '/en/legal-notice', '/datenschutz', '/en/privacy', '/pattern-library', '/en/pattern-library', '/404.html', '/robots.txt', '/sitemap.xml'] }
  },
  // Per .env überschreibbar: NUXT_PUBLIC_CONTACT_EMAIL, NUXT_PUBLIC_LINKEDIN_URL, NUXT_PUBLIC_GITHUB_URL, NUXT_PUBLIC_SITE_URL
  runtimeConfig: {
    public: {
      siteUrl: '', // z. B. https://dein-name.de (für Canonical, hreflang, Open Graph, Sitemap)
      contactEmail: 'dustin.clever@googlemail.com',
      linkedinUrl: 'https://www.linkedin.com/in/dustin-clever/',
      githubUrl: 'https://github.com/Nakamado',
      // Impressum: bitte ergänzen (oder per .env: NUXT_PUBLIC_IMPRINT_STREET, NUXT_PUBLIC_IMPRINT_CITY, NUXT_PUBLIC_IMPRINT_PHONE).
      // Texte in eckigen Klammern werden auf der Seite als Platzhalter markiert.
      imprintStreet: 'Rotdornweg 1',
      imprintCity: '51519 Odenthal',
      imprintPhone: '' // optional, leer lassen = nicht anzeigen
    }
  }
})
