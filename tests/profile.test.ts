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

  it('positioniert nicht als Senior, Lead oder Architekt', () => {
    expect(JSON.stringify(content)).not.toMatch(/senior|lead developer|architekt|architect/i)
  })

  it('zeigt keine Platzhalter-Projekte', () => {
    expect(JSON.stringify(content.de.work)).not.toMatch(/platzhalter|placeholder/i)
    expect(JSON.stringify(content.en.work)).not.toMatch(/platzhalter|placeholder/i)
  })
})
