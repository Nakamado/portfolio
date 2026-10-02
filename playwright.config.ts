import { defineConfig, devices } from '@playwright/test'

const PORT = 4173

/** Screenshot-Tests laufen gegen den fertig erzeugten Build (`nuxt generate` → `.output/public`). */
export default defineConfig({
  testDir: './e2e',
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFileName}/{arg}-{platform}{ext}',
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01, // kleine Unterschiede beim Kantenglätten der Schrift sind erlaubt
      animations: 'disabled'
    }
  },
  use: {
    baseURL: `http://localhost:${PORT}`,
    reducedMotion: 'reduce' // Punktraster und fallende Chips stehen dann still und die Bilder sind reproduzierbar
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `npx serve .output/public -l ${PORT} --no-clipboard`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true
  }
})
