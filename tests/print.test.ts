import { describe, expect, it } from 'vitest'
import printScss from '../app/assets/scss/_print.scss?raw'
import mainScss from '../app/assets/scss/main.scss?raw'

describe('Druckansicht', () => {
  it('wird am Ende der main.scss geladen, damit sie die :root-Farben überschreibt', () => {
    expect(mainScss).toContain("@use 'sass:meta';")
    const load = mainScss.indexOf("meta.load-css('print')")
    expect(load).toBeGreaterThan(mainScss.indexOf(':root'))
    expect(mainScss.slice(load)).not.toMatch(/\n\.[a-z]/) // danach folgen keine weiteren Regeln
  })

  it('liegt in einem @media-print-Block und setzt den Seitenrand', () => {
    expect(printScss).toMatch(/@media print\s*{/)
    expect(printScss).toMatch(/@page\s*{/)
  })

  it('macht die Seite hell', () => {
    expect(printScss).toMatch(/--bg:\s*#\{\$print-paper\}/)
    expect(printScss).toContain('color-scheme: light')
  })

  it.each(['.site-header', '.pager', '.lang-switch', '.scroll-button', '.hero__portrait', '.hero-backdrop', '.hero__actions', '.skip-link', 'a[download]'])(
    'blendet %s aus',
    (selector) => {
      const hidden = printScss.slice(0, printScss.indexOf('display: none !important'))
      expect(hidden).toContain(selector)
    }
  )

  it('zeigt externe Adressen hinter dem Link', () => {
    expect(printScss).toContain("a[href^='http']::after")
    expect(printScss).toContain('attr(href)')
  })

  it('verwendet keine festen Farben oder Maße außerhalb der Variablen am Anfang', () => {
    const rules = printScss.slice(printScss.indexOf('@media print'))
    expect(rules).not.toMatch(/#[0-9a-f]{3,6}\b(?!\})/i)
  })
})
