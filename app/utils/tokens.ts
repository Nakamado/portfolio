export interface Token {
  name: string
  value: string
  /** Kommentar hinter dem Wert in der SCSS-Datei, falls vorhanden. */
  comment?: string
}

/** Selektor des hellen Themes in der main.scss. */
export const LIGHT_SELECTOR = ":root[data-theme='light']"

/** Liest den ersten Block mit diesem Selektor (bis zur passenden schließenden Klammer) aus dem SCSS-Quelltext, standardmäßig :root. */
export function extractRootBlock(scss: string, selector = ':root'): string {
  const start = scss.indexOf(selector)
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
export function parseTokens(scss: string, selector = ':root'): Token[] {
  const block = extractRootBlock(scss, selector)
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

/** Legt die Werte eines Themes über die Grundwerte. Ein Kommentar des Themes ersetzt den Grundkommentar, sonst bleibt der alte. */
export function mergeTokens(base: Token[], overrides: Token[]): Token[] {
  const byName = new Map(overrides.map((token) => [token.name, token]))
  return base.map((token) => {
    const over = byName.get(token.name)
    return over ? { ...token, value: over.value, comment: over.comment ?? token.comment } : token
  })
}
