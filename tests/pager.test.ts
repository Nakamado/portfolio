import { describe, expect, it } from 'vitest'
import { currentSectionIndex, pagerTarget } from '../app/utils/pager'

describe('currentSectionIndex', () => {
  const line = 400

  it('liefert 0 im Hero', () => {
    expect(currentSectionIndex([-100, 800, 1600, 2400, 3200, 4000], line, false)).toBe(0)
  })

  it('wechselt, sobald die Oberkante die Messlinie erreicht', () => {
    expect(currentSectionIndex([-900, 400, 1200, 2000, 2800, 3600], line, false)).toBe(1)
    expect(currentSectionIndex([-3000, -2200, -1400, 350, 1100, 1900], line, false)).toBe(3)
  })

  it('zählt am Seitenende immer den letzten Abschnitt', () => {
    expect(currentSectionIndex([-5000, -4000, -3000, -2000, -900, 600], line, true)).toBe(5)
  })

  it('ignoriert fehlende Abschnitte (Infinity)', () => {
    expect(currentSectionIndex([-100, Infinity, Infinity], line, false)).toBe(0)
  })
})

describe('pagerTarget', () => {
  it('springt zum nächsten Abschnitt', () => {
    expect(pagerTarget(1)).toEqual({ id: 'experience', up: false })
    expect(pagerTarget(4)).toEqual({ id: 'contact', up: false })
  })

  it('führt im letzten Abschnitt zurück nach oben', () => {
    expect(pagerTarget(5)).toEqual({ id: 'top', up: true })
  })
})
