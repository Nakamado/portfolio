export interface Token {
  name: string
  value: string
  /** Kommentar hinter dem Wert in der SCSS-Datei, falls vorhanden. */
  comment?: string
}

/** Liest den ersten :root-Block (bis zur passenden schließenden Klammer) aus dem SCSS-Quelltext. */
export function extractRootBlock(scss: string): string {
  const start = scss.indexOf(':root')
  if (start === -1) return ''
  const open = scss.indexOf('{', start)
  if (open === -1) return ''
  let depth = 0
  for (let i = open; i < scss.length; i++) {
    if (scss[i] === '{') depth++
    if (scss[i] === '}' && --depth === 0) return scss.slice(start, i + 1)
  }
  return scss.slice(start)
}

/** Liest die Design-Tokens (--name: wert;) aus dem :root-Block, damit die Pattern-Library nie vom echten Stand abweicht. */
export function parseTokens(scss: string): Token[] {
  const block = extractRootBlock(scss)
  const tokens: Token[] = []
  const seen = new Set<string>()
  for (const match of block.matchAll(/^\s*--([\w-]+):\s*([^;]+);(?:[ \t]*\/\/[ \t]*(.*))?$/gm)) {
    const name = match[1]!
    if (seen.has(name)) continue // zweite Angabe in einer Media Query (z. B. --header-height): der Grundwert zählt
    seen.add(name)
    tokens.push({ name, value: match[2]!.trim(), comment: match[3]?.trim() || undefined })
  }
  return tokens
}

/** Farbwerte (Hex oder rgb) bekommen in der Pattern-Library ein Farbfeld, alles andere nicht. */
export const isColorValue = (value: string) => /^(#|rgb)/i.test(value.trim())
