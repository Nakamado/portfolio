import { describe, expect, it } from 'vitest'
import { easterEggComment } from '../app/data/easterEgg'

describe('Easteregg im <head>', () => {
  const comment = easterEggComment('test@example.com', 'https://www.linkedin.com/in/test/')

  it('ist ein gültiger HTML-Kommentar ohne doppelte Bindestriche im Inhalt', () => {
    expect(comment.startsWith('<!--')).toBe(true)
    expect(comment.endsWith('-->')).toBe(true)
    expect(comment.slice(4, -3)).not.toContain('--')
  })

  it('nennt die Jobsuche, E-Mail und LinkedIn', () => {
    expect(comment).toContain('Looking for a new opportunity')
    expect(comment).toContain('Say hi: test@example.com')
    expect(comment).toContain('LinkedIn: https://www.linkedin.com/in/test/')
  })

  it('lässt die LinkedIn-Zeile weg, wenn keine URL gesetzt ist', () => {
    expect(easterEggComment('test@example.com')).not.toContain('LinkedIn')
  })
})

describe('Easteregg-Kontaktzeilen', () => {
  it('enthält E-Mail und optional LinkedIn', async () => {
    const { easterEggContacts } = await import('../app/data/easterEgg')
    expect(easterEggContacts('a@b.de')).toEqual(['Say hi: a@b.de'])
    expect(easterEggContacts('a@b.de', 'https://li')).toEqual(['Say hi: a@b.de', 'LinkedIn: https://li'])
  })
})
