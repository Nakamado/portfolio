import { describe, expect, it } from 'vitest'
import { highlight } from '../app/utils/highlight'
import mainScss from '../app/assets/scss/main.scss?raw'
import themeSwitch from '../app/components/ThemeSwitch.vue?raw'
import dragChip from '../app/components/DragChip.vue?raw'

const typed = (code: string) => highlight(code).filter((t) => t.type)
const of = (code: string, type: string) => typed(code).filter((t) => t.type === type).map((t) => t.text)

describe('highlight', () => {
  it('liefert für leeren Text keine Tokens', () => {
    expect(highlight('')).toEqual([])
  })

  it('lässt einfachen Text unverändert', () => {
    expect(highlight('Hallo Welt')).toEqual([{ type: null, text: 'Hallo Welt' }])
  })

  it('erkennt Kommentare in SCSS, TypeScript und HTML', () => {
    expect(of('/* a */ b // c\n<!-- d -->', 'comment')).toEqual(['/* a */', '// c', '<!-- d -->'])
  })

  it('hält // in Adressen für keinen Kommentar', () => {
    expect(of('href="https://example.org"', 'comment')).toEqual([])
    expect(of('url(https://example.org)', 'comment')).toEqual([])
  })

  it('erkennt Zeichenketten mit allen drei Anführungszeichen', () => {
    expect(of(`a 'x\\'y' "z" \`t \${u}\``, 'string')).toEqual([`'x\\'y'`, '"z"', '`t ${u}`'])
  })

  it('erkennt Tags, aber keine Generics oder Vergleiche', () => {
    expect(of('<ul class="a"><DragChip /></ul>', 'tag')).toEqual(['<ul', '>', '<DragChip', '/>', '</ul', '>'])
    expect(of('<h1>Titel</h1>', 'tag')).toEqual(['<h1', '>', '</h1', '>'])
    expect(of('<DragChip>Vue</DragChip>', 'tag')).toEqual(['<DragChip', '>', '</DragChip', '>'])
    expect(of('ref<number>(1) a < b > c, (x) => y', 'tag')).toEqual([])
  })

  it('erkennt Attribute und Direktiven', () => {
    expect(of('<a :href="x" @click="y" v-for="z" class="c">', 'name')).toEqual([':href', '@click', 'v-for', 'class'])
  })

  it('erkennt CSS-Eigenschaften am Zeilenanfang, aber keine Pseudoklassen', () => {
    expect(of('a:hover {\n  color: red;\n  --x: 1;\n}', 'name')).toEqual(['color'])
  })

  it('erkennt SCSS-Variablen und Custom Properties', () => {
    expect(of('$space-2: 1rem; color: var(--blue);', 'variable')).toEqual(['$space-2', '--blue'])
  })

  it('erkennt At-Regeln und Schlüsselwörter', () => {
    expect(of('@use "x"; @include up($bp); const a = true', 'keyword')).toEqual(['@use', '@include', 'const', 'true'])
    expect(of('@click="x"', 'keyword')).toEqual([])
  })

  it('erkennt Zahlen mit Einheit und Farbwerte, aber keine Ziffern in Namen', () => {
    expect(of('a: 1.5rem 0 #1d63f0 50% .5s; $space-3: h2', 'number')).toEqual(['1.5rem', '0', '#1d63f0', '50%', '.5s'])
  })

  it('ergibt aneinandergehängt immer den Originaltext', () => {
    for (const source of [mainScss, themeSwitch, dragChip]) {
      expect(highlight(source).map((t) => t.text).join('')).toBe(source)
    }
  })

  it('färbt echten Quelltext', () => {
    const types = new Set(highlight(themeSwitch).map((t) => t.type))
    for (const type of ['comment', 'string', 'tag', 'name', 'keyword'] as const) expect(types.has(type), type).toBe(true)
  })
})
