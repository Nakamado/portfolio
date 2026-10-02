import { describe, expect, it } from 'vitest'
import { content } from '../app/data/profile'

describe('profile content', () => {
  it('hat in DE und EN gleich viele Stationen, Projekte und Skillgruppen', () => {
    expect(content.en.experience.jobs).toHaveLength(content.de.experience.jobs.length)
    expect(content.en.experience.education).toHaveLength(content.de.experience.education.length)
    expect(content.en.work.projects).toHaveLength(content.de.work.projects.length)
    expect(content.en.skills.groups).toHaveLength(content.de.skills.groups.length)
  })

  it('gibt in beiden Sprachen dieselben Zeiträume an', () => {
    const periods = (l: 'de' | 'en') => content[l].experience.jobs.map((j) => j.period.replace(/heute|present/, 'x'))
    expect(periods('en')).toEqual(periods('de'))
  })

  it('hat die 404-Texte in DE und EN vollständig', () => {
    const keys = Object.keys(content.de.notFound)
    expect(Object.keys(content.en.notFound)).toEqual(keys)
    for (const lang of ['de', 'en'] as const) {
      for (const key of keys) expect(content[lang].notFound[key as keyof typeof content.de.notFound], `${lang}.${key}`).not.toBe('')
    }
  })

  it('positioniert nicht als Senior, Lead oder Architekt', () => {
    expect(JSON.stringify(content)).not.toMatch(/senior|lead developer|architekt|architect/i)
  })

  it('zeigt keine Platzhalter-Projekte', () => {
    expect(JSON.stringify(content.de.work)).not.toMatch(/platzhalter|placeholder/i)
    expect(JSON.stringify(content.en.work)).not.toMatch(/platzhalter|placeholder/i)
  })

  it('hat die Pattern-Library in DE und EN gleich aufgebaut', () => {
    const de = content.de.patterns
    const en = content.en.patterns
    expect(en.nav.map((n) => n.id)).toEqual(de.nav.map((n) => n.id))
    expect(en.components.items.map((i) => i.id)).toEqual(de.components.items.map((i) => i.id))
    expect(en.colors.pairs).toHaveLength(de.colors.pairs.length)
    expect(en.colors.pairs.map((p) => [p.fg, p.bg])).toEqual(de.colors.pairs.map((p) => [p.fg, p.bg]))
    expect(Object.keys(en.colors.notes)).toEqual(Object.keys(de.colors.notes))
    expect(en.typography.scale).toHaveLength(de.typography.scale.length)
    expect(en.layout.rules).toHaveLength(de.layout.rules.length)
    de.components.items.forEach((item, i) => {
      expect(en.components.items[i]!.api).toHaveLength(item.api.length)
      expect(en.components.items[i]!.a11y).toHaveLength(item.a11y.length)
    })
  })
})
