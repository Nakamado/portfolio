import { afterEach, describe, expect, it } from 'vitest'
import { isPlaceholder } from '../app/utils/placeholder'
import { focusSection } from '../app/utils/focusSection'

describe('isPlaceholder', () => {
  it('erkennt Angaben in eckigen Klammern', () => {
    expect(isPlaceholder('[Straße ergänzen]')).toBe(true)
    expect(isPlaceholder('Musterweg 1 [Nummer]')).toBe(true)
  })

  it('lässt normale Texte durch', () => {
    expect(isPlaceholder('Rotdornweg 1')).toBe(false)
    expect(isPlaceholder('')).toBe(false)
  })
})

describe('focusSection', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  function click(href: string | null) {
    const link = document.createElement('a')
    if (href !== null) link.setAttribute('href', href)
    document.body.append(link)
    focusSection({ currentTarget: link } as unknown as Event)
  }

  it('fokussiert die Überschrift des Zielabschnitts', () => {
    document.body.innerHTML = '<section id="about" tabindex="-1"><h2 tabindex="0">Titel</h2></section>'
    click('#about')
    expect(document.activeElement?.tagName).toBe('H2')
  })

  it('fokussiert den Abschnitt selbst, wenn er keine Überschrift hat', () => {
    document.body.innerHTML = '<section id="plain" tabindex="-1"></section>'
    click('/en#plain')
    expect(document.activeElement?.id).toBe('plain')
  })

  it('tut nichts bei Links ohne Anker, ohne Ziel oder ohne href', () => {
    document.body.innerHTML = '<button id="b">x</button>'
    document.getElementById('b')!.focus()
    click('/impressum')
    click('#gibt-es-nicht')
    click(null)
    focusSection({ currentTarget: null } as unknown as Event)
    expect(document.activeElement?.id).toBe('b')
  })
})
