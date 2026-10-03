import { describe, expect, it } from 'vitest'
import { robotsContent, pageUrl, absoluteUrl, headLinks, normalizeBase, pageAddress, socialImagePath, socialImage, structuredData } from '../app/utils/seo'

const paths = { de: '/impressum', en: '/en/legal-notice' }

describe('SEO-Helfer', () => {
  it('normalisiert die Domain', () => {
    expect(normalizeBase('https://example.com/')).toBe('https://example.com')
    expect(normalizeBase('')).toBe('')
    expect(absoluteUrl('https://example.com', '/en')).toBe('https://example.com/en')
    expect(pageUrl('https://example.com', '/en')).toBe('https://example.com/en/')
    expect(pageUrl('https://example.com', '/')).toBe('https://example.com/')
    expect(pageAddress('https://example.com', '/en/pattern-library/')).toBe('https://example.com/en/pattern-library/')
    expect(pageUrl('', '/en')).toBeUndefined()
  })

  it('liefert Canonical und hreflang nur mit Domain', () => {
    expect(headLinks('', 'de', paths)).toEqual([])
    const links = headLinks('https://example.com', 'en', paths)
    expect(links[0]).toEqual({ rel: 'canonical', href: 'https://example.com/en/legal-notice/' })
    expect(links.map((l) => l.hreflang)).toEqual([undefined, 'de', 'en', 'x-default'])
    expect(links[3]!.href).toBe('https://example.com/impressum/')
  })

  it('baut Person und Website als Graph mit Domain, LinkedIn und GitHub', () => {
    const full = structuredData({ base: 'https://example.com', lang: 'de', homePath: '/', role: 'Frontend-Entwickler', email: 'a@b.de', linkedinUrl: 'https://li', githubUrl: 'https://gh' })
    expect(full['@context']).toBe('https://schema.org')
    const [person, website] = full['@graph'] as Record<string, unknown>[]
    expect(person).toEqual({
      '@type': 'Person',
      '@id': 'https://example.com/#person',
      name: 'Dustin Clever',
      jobTitle: 'Frontend-Entwickler',
      email: 'a@b.de',
      url: 'https://example.com/',
      image: 'https://example.com/images/og-image.jpg',
      sameAs: ['https://li', 'https://gh']
    })
    expect(website).toEqual({ '@type': 'WebSite', name: 'Dustin Clever', url: 'https://example.com/', inLanguage: 'de', publisher: { '@id': 'https://example.com/#person' } })
  })

  it('nutzt auf der englischen Startseite das englische Bild und die englische Adresse', () => {
    const [person, website] = structuredData({ base: 'https://example.com', lang: 'en', homePath: '/en', role: 'Frontend Developer', email: 'a@b.de' })['@graph'] as Record<string, unknown>[]
    expect(person!.image).toBe('https://example.com/images/og-image-en.jpg')
    expect(person!.url).toBe('https://example.com/en/')
    expect(website!.inLanguage).toBe('en')
  })

  it('lässt ohne Domain URL, Bild, Website und leere Profile weg und behält nur sichtbare Angaben', () => {
    const graph = structuredData({ base: '', lang: 'de', homePath: '/', role: 'Frontend-Entwickler', email: 'a@b.de', githubUrl: 'https://gh' })['@graph'] as Record<string, unknown>[]
    expect(graph).toHaveLength(1)
    expect(graph[0]).toEqual({ '@type': 'Person', name: 'Dustin Clever', jobTitle: 'Frontend-Entwickler', email: 'a@b.de', sameAs: ['https://gh'] })
  })

  it('setzt Rechtstexte auf noindex und alle anderen Seiten auf index', () => {
    expect(robotsContent(true)).toBe('noindex, follow')
    expect(robotsContent(false)).toBe('index, follow')
  })

  it('wählt das Vorschaubild passend zu Domain und Sprache', () => {
    expect(socialImage('https://example.com')).toEqual({ image: 'https://example.com/images/og-image.jpg', width: 1200, height: 630, card: 'summary_large_image' })
    expect(socialImage('https://example.com', 'en').image).toBe('https://example.com/images/og-image-en.jpg')
    expect(socialImage('')).toEqual({ image: undefined, width: undefined, height: undefined, card: 'summary' })
    expect(socialImagePath('de')).toBe('/images/og-image.jpg')
  })
})
