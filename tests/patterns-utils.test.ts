import { describe, expect, it } from 'vitest'
import mainScss from '../app/assets/scss/main.scss?raw'
import { contrastLevel, contrastRatio, contrastRows, hexToRgb, isHex, luminance } from '../app/utils/color'
import { extractRootBlock, isColorValue, parseTokens } from '../app/utils/tokens'

describe('Farbhilfen', () => {
  it('erkennt Hexfarben', () => {
    expect(isHex('#fff')).toBe(true)
    expect(isHex(' #1D63F0 ')).toBe(true)
    expect(isHex('rgb(0 0 0)')).toBe(false)
    expect(isHex('#12')).toBe(false)
  })

  it('wandelt Hex in RGB um (3 und 6 Stellen)', () => {
    expect(hexToRgb('#fff')).toEqual([255, 255, 255])
    expect(hexToRgb('#1d63f0')).toEqual([29, 99, 240])
  })

  it('berechnet Leuchtdichte und Kontrast nach WCAG', () => {
    expect(luminance('#000')).toBe(0)
    expect(luminance('#fff')).toBeCloseTo(1, 5)
    expect(contrastRatio('#000', '#fff')).toBeCloseTo(21, 5)
    expect(contrastRatio('#fff', '#000')).toBeCloseTo(21, 5) // Reihenfolge egal
    expect(contrastRatio('#777', '#777')).toBe(1)
  })

  it('ordnet Kontraste den Stufen zu', () => {
    expect(contrastLevel(21)).toBe('AAA')
    expect(contrastLevel(7)).toBe('AAA')
    expect(contrastLevel(6.99)).toBe('AA')
    expect(contrastLevel(4.5)).toBe('AA')
    expect(contrastLevel(4.49)).toBe('UI')
    expect(contrastLevel(3)).toBe('UI')
    expect(contrastLevel(2.99)).toBe('fail')
  })

  it('liefert Kontraste für Paare und lässt unbrauchbare Paare weg', () => {
    const tokens = [
      { name: 'dark', value: '#000' },
      { name: 'light', value: '#fff' },
      { name: 'alpha', value: 'rgb(255 255 255 / 0.1)' }
    ]
    const rows = contrastRows(tokens, [
      { fg: 'light', bg: 'dark', use: 'ok' },
      { fg: 'missing', bg: 'dark', use: 'fg fehlt' },
      { fg: 'light', bg: 'missing', use: 'bg fehlt' },
      { fg: 'alpha', bg: 'dark', use: 'fg kein Hex' },
      { fg: 'light', bg: 'alpha', use: 'bg kein Hex' }
    ])
    expect(rows).toHaveLength(1)
    expect(rows[0]).toMatchObject({ fg: 'light', bg: 'dark', use: 'ok', level: 'AAA' })
    expect(rows[0]!.ratio).toBeCloseTo(21, 5)
  })
})

describe('Design-Tokens aus dem SCSS', () => {
  it('liest den :root-Block samt verschachtelter Media Query', () => {
    const block = extractRootBlock(':root {\n  --a: 1;\n  @media (x) {\n    --b: 2;\n  }\n}\n.rest { color: red; }')
    expect(block.startsWith(':root {')).toBe(true)
    expect(block.endsWith('}')).toBe(true)
    expect(block).toContain('--b: 2;')
    expect(block).not.toContain('.rest')
  })

  it('geht mit fehlendem oder offenem :root-Block um', () => {
    expect(extractRootBlock('.a { color: red; }')).toBe('')
    expect(extractRootBlock(':root')).toBe('')
    expect(extractRootBlock(':root { --a: 1;')).toBe(':root { --a: 1;')
  })

  it('liest Name, Wert und Kommentar und ignoriert doppelte Namen', () => {
    const tokens = parseTokens(':root {\n  --a: #fff; // hell\n  --b: 2rem;\n  --c: 3; //\n  @media (x) {\n    --b: 9rem;\n  }\n}')
    expect(tokens).toEqual([
      { name: 'a', value: '#fff', comment: 'hell' },
      { name: 'b', value: '2rem', comment: undefined },
      { name: 'c', value: '3', comment: undefined }
    ])
  })

  it('erkennt Farbwerte', () => {
    expect(isColorValue('#fff')).toBe(true)
    expect(isColorValue('rgb(255 255 255 / 0.14)')).toBe(true)
    expect(isColorValue("'Space Grotesk', Arial")).toBe(false)
    expect(isColorValue('clamp(1.25rem, 5vw, 4rem)')).toBe(false)
  })

  it('findet in der echten main.scss alle Farben, Schriften und Layout-Werte', () => {
    const names = parseTokens(mainScss).map((t) => t.name)
    expect(names).toEqual(expect.arrayContaining(['bg', 'bg-alt', 'text', 'muted', 'line', 'blue', 'blue-dark', 'blue-light', 'focus', 'font', 'font-display', 'gutter', 'header-height', 'section-height']))
    expect(new Set(names).size).toBe(names.length)
  })
})
