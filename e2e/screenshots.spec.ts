import { expect, test, type Page } from '@playwright/test'

type Theme = 'dark' | 'light'

/** Breiten rund um die Umschaltpunkte des Layouts (siehe $bp-… in _variables.scss). */
const WIDTHS = { 320: 320, 375: 375, 768: 768, 1024: 1024, 1440: 1440 } as const
const HEIGHT = 900

/** Seite, Breiten und Themes, die als Bild gesichert werden. */
const SHOTS: { name: string; path: string; widths: (keyof typeof WIDTHS)[]; themes: Theme[]; fullPage?: boolean }[] = [
  { name: 'startseite', path: '/', widths: [320, 375, 768, 1024, 1440], themes: ['dark', 'light'] },
  { name: 'startseite-en', path: '/en', widths: [375, 1440], themes: ['dark'] },
  // Die Pattern-Library ist mit rund 12.000 px so lang, dass ihre Höhe zwischen zwei Aufnahmen um ein paar Pixel schwankt; deshalb nur der obere Bildschirmbereich
  { name: 'pattern-library', path: '/pattern-library', widths: [375, 1440], themes: ['dark', 'light'], fullPage: false },
  { name: 'datenschutz', path: '/datenschutz', widths: [375, 1440], themes: ['dark'] },
  { name: '404', path: '/404', widths: [375, 1440], themes: ['dark', 'light'] }
]

/** Öffnet die Seite mit gewähltem Theme und wartet, bis die Schriften da sind (sonst bliebe die Ersatzschrift stehen). */
async function open(page: Page, path: string, theme: Theme) {
  await page.addInitScript((value) => localStorage.setItem('theme', value), theme)
  await page.goto(path)
  for (let attempt = 0; attempt < 2; attempt++) {
    const loaded = await page.evaluate(async () => {
      await document.fonts.ready
      return document.fonts.check('1rem "Space Grotesk"') && document.fonts.check('1rem "Roboto Slab"')
    })
    if (loaded) break
    await page.reload() // font-display "optional": beim zweiten Aufruf liegt die Schrift im Cache
  }
  await page.evaluate(() => window.scrollTo(0, 0))
}

for (const shot of SHOTS) {
  for (const theme of shot.themes) {
    for (const width of shot.widths) {
      test(`${shot.name} ${theme} ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width: WIDTHS[width], height: HEIGHT })
        await open(page, shot.path, theme)
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
        await expect(page).toHaveScreenshot(`${shot.name}-${theme}-${width}.png`, {
          fullPage: shot.fullPage ?? true,
          mask: [page.locator('.pager')] // der mitlaufende Pfeil hängt von der Scrollposition ab
        })
      })
    }
  }
}
