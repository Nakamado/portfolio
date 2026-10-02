import { describe, expect, it } from 'vitest'
import { GLYPHS, buildMask, signCells } from '../app/utils/dotMatrix'

const SIGN = buildMask('404')

describe('Punktmatrix', () => {
  it('baut die Matrix aus den Ziffern mit einer Leerspalte dazwischen', () => {
    expect(SIGN).toHaveLength(7)
    expect(SIGN.every((row) => row.length === 17)).toBe(true)
    expect(SIGN[0]!.map((on) => (on ? '#' : '.')).join('')).toBe('...#...###.....#.')
    expect(buildMask('0')[0]).toEqual([false, true, true, true, false])
  })

  it('kennt jede Ziffer in 5 × 7 Punkten', () => {
    for (const rows of Object.values(GLYPHS)) {
      expect(rows).toHaveLength(7)
      expect(rows.every((row) => row.length === 5)).toBe(true)
    }
  })

  it('setzt die Schrift mittig ins Raster', () => {
    const cols = 21
    const rows = 11
    const cells = signCells(SIGN, cols, rows)
    expect(cells.size).toBe(SIGN.flat().filter(Boolean).length)
    // 17 Spalten in 21: links 2 frei, 7 Zeilen in 11: oben 2 frei. Erste gesetzte Zelle: Zeile 0, Spalte 3
    expect(cells.has((2 + 0) * cols + 2 + 3)).toBe(true)
    expect(Math.min(...cells)).toBe(2 * cols + 2 + 3)
    expect([...cells].every((i) => i % cols >= 2 && i % cols < 2 + 17)).toBe(true)
  })

  it('setzt die Schrift ab der gewünschten Zeile', () => {
    const cells = signCells(SIGN, 20, 13, 4)
    expect(Math.min(...cells)).toBe(4 * 20 + 1 + 3)
    expect(Math.max(...cells)).toBeLessThan(11 * 20)
  })

  it('lässt die Schrift weg, wenn die gewünschte Zeile nicht passt', () => {
    expect(signCells(SIGN, 20, 13, -1).size).toBe(0)
    expect(signCells(SIGN, 20, 13, 7).size).toBe(0)
    expect(signCells(SIGN, 20, 13, 6).size).toBeGreaterThan(0)
  })

  it('lässt die Schrift weg, wenn sie nicht ins Raster passt', () => {
    expect(signCells(SIGN, 16, 20).size).toBe(0)
    expect(signCells(SIGN, 30, 6).size).toBe(0)
    expect(signCells(SIGN, 17, 7).size).toBeGreaterThan(0)
  })
})
