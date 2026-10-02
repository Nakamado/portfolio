/** Hilfen für die Pattern-Library: Kontrast nach WCAG 2.x, berechnet aus den echten Design-Tokens. */

export const isHex = (value: string) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value.trim())

/** "#fff" oder "#1d63f0" zu [r, g, b] (0 bis 255). */
export function hexToRgb(hex: string): [number, number, number] {
  let h = hex.trim().replace('#', '')
  if (h.length === 3) h = [...h].map((c) => c + c).join('')
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number]
}

/** Relative Leuchtdichte (WCAG). */
export function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }) as [number, number, number]
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Kontrastverhältnis zweier Farben, von 1 bis 21. */
export function contrastRatio(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (light + 0.05) / (dark + 0.05)
}

export type ContrastLevel = 'AAA' | 'AA' | 'UI' | 'fail'

/** AAA ab 7:1, AA ab 4,5:1 (Text), UI ab 3:1 (Bedienelemente, große Schrift), sonst darunter. */
export function contrastLevel(ratio: number): ContrastLevel {
  if (ratio >= 7) return 'AAA'
  if (ratio >= 4.5) return 'AA'
  if (ratio >= 3) return 'UI'
  return 'fail'
}

export interface ContrastRow {
  fg: string
  bg: string
  use: string
  ratio: number
  level: ContrastLevel
}

/** Berechnet den Kontrast für Paare aus Token-Namen. Paare mit unbekannten oder nicht hexadezimalen Farben fallen weg. */
export function contrastRows(tokens: { name: string; value: string }[], pairs: { fg: string; bg: string; use: string }[]): ContrastRow[] {
  const values = new Map(tokens.map((token) => [token.name, token.value]))
  return pairs.flatMap((pair) => {
    const fg = values.get(pair.fg)
    const bg = values.get(pair.bg)
    if (!fg || !bg || !isHex(fg) || !isHex(bg)) return []
    const ratio = contrastRatio(fg, bg)
    return [{ ...pair, ratio, level: contrastLevel(ratio) }]
  })
}
