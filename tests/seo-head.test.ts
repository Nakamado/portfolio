import { describe, expect, it } from 'vitest'
import { robotsContent, pageUrl, absoluteUrl, headLinks, normalizeBase, personSchema, socialImage } from '../app/utils/seo'

const paths = { de: '/impressum', en: '/en/legal-notice' }

describe('SEO-Helfer', () => {
  it('normalisiert die Domain', () => {
    expect(normalizeBase('https://example.com/')).toBe('https://example.com')
    expect(normalizeBase('')).toBe('')
    expect(absoluteUrl('https://example.com', '/en')).toBe('https://example.com/en')
    expect(pageUrl('https://example.com', '/en')).toBe('https://example.com/en')
    expect(pageUrl('', '/en')).toBeUndefined()
  })

  it('liefert Canonical und hreflang nur mit Domain', () => {
    expect(headLinks('', 'de', paths)).toEqual([])
    const links = headLinks('https://example.com', 'en', paths)
    expect(links[0]).toEqual({ rel: 'canonical', href: 'https://example.com/en/legal-notice' })
    expect(links.map((l) => l.hreflang)).toEqual([undefined, 'de', 'en', 'x-default'])
    expect(links[3]!.href).toBe('https://example.com/impressum')
  })

  it('baut die Strukturdaten mit und ohne Domain und LinkedIn', () => {
    const full = personSchema({ base: 'https://example.com', lang: 'de', paths, role: 'Frontend Developer', email: 'a@b.de', linkedinUrl: 'https://li' })
    expect(full.url).toBe('https://example.com/impressum')
    expect(full.image).toBe('https://example.com/images/og-image.jpg')
    expect(full.sameAs).toEqual(['https://li'])
    const minimal = personSchema({ base: '', lang: 'de', paths, role: 'Frontend Developer', email: 'a@b.de' })
    expect(minimal).not.toHaveProperty('url')
    expect(minimal).not.toHaveProperty('sameAs')
    expect(minimal.jobTitle).toBe('Frontend Developer')
  })

  it('setzt Rechtstexte auf noindex und alle anderen Seiten auf index', () => {
    expect(robotsContent(true)).toBe('noindex, follow')
    expect(robotsContent(false)).toBe('index, follow')
  })

  it('wählt das Vorschaubild passend zur Domain', () => {
    expect(socialImage('https://example.com')).toEqual({ image: 'https://example.com/images/og-image.jpg', width: 1200, height: 630, card: 'summary_large_image' })
    expect(socialImage('')).toEqual({ image: undefined, width: undefined, height: undefined, card: 'summary' })
  })
})
