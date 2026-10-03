import { describe, expect, it } from 'vitest'
import { SITEMAP_PATHS, buildRobots, buildSitemap } from '../shared/seo'

describe('robots.txt', () => {
  it('erlaubt alles und nennt die Sitemap, wenn die Domain bekannt ist', () => {
    expect(buildRobots('https://example.com/')).toBe('User-agent: *\nAllow: /\nSitemap: https://example.com/sitemap.xml\n')
  })

  it('lässt die Sitemap ohne Domain weg', () => {
    expect(buildRobots('')).toBe('User-agent: *\nAllow: /\n')
  })
})

describe('sitemap.xml', () => {
  it('listet alle Seiten mit absoluter URL', () => {
    const xml = buildSitemap('https://example.com')
    for (const path of SITEMAP_PATHS) expect(xml).toContain(`<loc>https://example.com${path}</loc>`)
  })

  it('enthält die Pattern-Library in beiden Sprachen', () => {
    const xml = buildSitemap('https://example.com')
    expect(xml).toContain('<loc>https://example.com/pattern-library/</loc>')
    expect(xml).toContain('<loc>https://example.com/en/pattern-library/</loc>')
  })

  it('enthält die Rechtstexte nicht (sie sind auf noindex gesetzt)', () => {
    const xml = buildSitemap('https://example.com')
    expect(xml).not.toContain('/impressum')
    expect(xml).not.toContain('/datenschutz')
    expect(xml).not.toContain('/en/privacy')
    expect(xml).not.toContain('/en/legal-notice')
  })

  it('entfernt einen Schrägstrich am Ende der Domain', () => {
    expect(buildSitemap('https://example.com/')).not.toContain('com//')
  })

  it('bleibt ohne Domain leer, aber gültig', () => {
    const xml = buildSitemap('')
    expect(xml).not.toContain('<url>')
    expect(xml).toContain('<urlset')
  })
})
