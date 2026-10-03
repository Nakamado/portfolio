// Kleiner Syntax-Highlighter für die Quelltext-Blöcke der Pattern-Library (SCSS, Vue, HTML, TypeScript).
// Keine Abhängigkeit: eine Reihe von Mustern, das früheste Vorkommen gewinnt, bei gleicher Stelle entscheidet die Reihenfolge.
// Die Tokens ergeben aneinandergehängt immer wieder den Originaltext.

export type TokenType = 'comment' | 'string' | 'tag' | 'name' | 'variable' | 'keyword' | 'number'
export interface Token {
  type: TokenType | null // null = einfacher Text
  text: string
}

const SCSS_AT_RULES = 'use|forward|include|mixin|function|return|media|if|else|each|extend|supports|font-face|keyframes|container|layer'
const KEYWORDS = 'const|let|import|from|export|default|return|if|else|function|interface|true|false|null|undefined|defineProps|defineEmits|computed|ref|onMounted|onBeforeUnmount|watch'
const UNITS = 'rem|em|px|%|vh|vw|svh|ms|s|deg|fr|ch'

const RULES: [TokenType, string][] = [
  ['comment', String.raw`\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->|(?<![:\w])\/\/[^\n]*`],
  ['string', String.raw`'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|` + '`(?:\\\\.|[^`\\\\])*`'],
  // Öffnende Tags, schließende Tags (auch direkt hinter Text) und die letzte Klammer; öffnende Tags und Klammer zählen nur außerhalb von Generics wie ref<number>
  ['tag', String.raw`(?<![\w$])<[A-Za-z][\w.-]*|<\/[A-Za-z][\w.-]*|\/>|(?<=(?:(?<![\w$])<|<\/)[A-Za-z][^<>]*)>`],
  ['variable', String.raw`\$[\w-]+|--[\w-]+`],
  ['keyword', String.raw`@(?:${SCSS_AT_RULES})\b|\b(?:${KEYWORDS})\b`],
  ['name', String.raw`(?<=\s)[:@#]?[A-Za-z][\w.:-]*(?==)|(?<=^[ \t]*)-?[a-z][\w-]*(?=:\s)`],
  ['number', String.raw`#[0-9a-fA-F]{3,8}\b|(?<![\w#$-])\d*\.?\d+(?:${UNITS})?(?![\w.])`]
]

const PATTERN = new RegExp(RULES.map(([, source]) => `(${source})`).join('|'), 'gm')

export function highlight(code: string): Token[] {
  const tokens: Token[] = []
  let last = 0
  for (const match of code.matchAll(PATTERN)) {
    const type = RULES[match.findIndex((group, i) => i > 0 && group !== undefined) - 1]![0]
    if (match.index > last) tokens.push({ type: null, text: code.slice(last, match.index) })
    tokens.push({ type, text: match[0] })
    last = match.index + match[0].length
  }
  if (last < code.length) tokens.push({ type: null, text: code.slice(last) })
  return tokens
}
