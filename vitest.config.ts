import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    include: ['tests/**/*.test.ts'],
    // Vitest ersetzt Stylesheets sonst durch einen leeren String, die Pattern-Library liest die SCSS-Dateien aber als Text (?raw).
    css: { include: [/\.scss\?raw$/] },
    coverage: {
      provider: 'v8',
      // Server-Routen und Plugins sind dünne Verbindungsstücke; ihre Logik liegt in shared/ und app/data und ist dort getestet.
      include: ['app/**/*.{ts,vue}', 'shared/**/*.ts'],
      reporter: ['text', 'html', 'lcov'],
      thresholds: { statements: 100, branches: 100, functions: 100, lines: 100 }
    }
  }
})
