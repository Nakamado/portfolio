// Erzeugt die Social-Preview-Bilder (1200×630) aus scripts/og-image.html: npm run og-image
import { chromium } from '@playwright/test'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const template = pathToFileURL(resolve('scripts/og-image.html')).href
const targets = [
  ['', 'public/images/og-image.jpg'],
  ['?lang=en', 'public/images/og-image-en.jpg']
]

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
for (const [query, file] of targets) {
  await page.goto(template + query)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: file, type: 'jpeg', quality: 90 })
  console.log('geschrieben:', file)
}
await browser.close()
