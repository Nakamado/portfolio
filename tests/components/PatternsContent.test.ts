import { afterEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import mainScss from '../../app/assets/scss/main.scss?raw'
import PatternsContent from '~/components/PatternsContent.vue'
import PatternSection from '~/components/PatternSection.vue'
import PatternItem from '~/components/PatternItem.vue'
import CodeBlock from '~/components/CodeBlock.vue'
import { content } from '~/data/profile'
import { useTheme } from '~/composables/useTheme'
import { isColorValue, parseTokens } from '~/utils/tokens'

const colorTokens = parseTokens(mainScss).filter((t) => isColorValue(t.value))

describe.each([
  ['/pattern-library', 'de'],
  ['/en/pattern-library', 'en']
] as const)('Pattern-Library (%s)', (route, lang) => {
  const p = content[lang].patterns

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('hat genau eine h1, vier Abschnitte und überspringt keine Überschriftenebene', async () => {
    const wrapper = await mountSuspended(PatternsContent, { route })
    expect(wrapper.findAll('h1')).toHaveLength(1)
    expect(wrapper.get('h1').text()).toBe(p.title)
    expect(wrapper.findAll('section[id]').map((s) => s.attributes('id'))).toEqual(p.nav.map((n) => n.id))
    expect(wrapper.findAll('section > h2')).toHaveLength(4)
    const levels = wrapper.findAll('h1,h2,h3,h4').map((h) => Number(h.element.tagName[1]))
    levels.slice(1).forEach((level, i) => expect(level - levels[i]!).toBeLessThanOrEqual(1))
  })

  it('verwendet eindeutige IDs', async () => {
    const wrapper = await mountSuspended(PatternsContent, { route })
    const ids = wrapper.findAll('[id]').map((el) => el.attributes('id'))
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('listet jede Farbe aus der main.scss mit Wert und Erklärung', async () => {
    const wrapper = await mountSuspended(PatternsContent, { route })
    const items = wrapper.findAll('#colors .tokens .token')
    expect(items).toHaveLength(colorTokens.length)
    for (const token of colorTokens) {
      const item = items.find((el) => el.text().includes(`--${token.name} `))
      expect(item, token.name).toBeTruthy()
      expect(item!.text()).toContain(token.value)
      expect(item!.find('.token__note').text(), `Erklärung für ${token.name}`).not.toBe('')
    }
  })

  it('berechnet die Kontraste aus den Variablen', async () => {
    const wrapper = await mountSuspended(PatternsContent, { route })
    const pairs = wrapper.findAll('.pair')
    expect(pairs).toHaveLength(p.colors.pairs.length)
    const first = pairs[0]!.text()
    expect(first).toContain('--text / --bg')
    expect(first).toMatch(lang === 'de' ? /16,8:1/ : /16\.8:1/)
  })

  it('zeigt beide Schriften und die Layout-Variablen', async () => {
    const wrapper = await mountSuspended(PatternsContent, { route })
    expect(wrapper.findAll('.font')).toHaveLength(2)
    expect(wrapper.get('#typography').text()).toContain('Roboto Slab')
    expect(wrapper.get('#typography').text()).toContain('Space Grotesk')
    expect(wrapper.get('#layout pre').text()).toContain('$bp-hero: 64rem;')
    expect(wrapper.findAll('#layout .token').map((el) => el.text()).join(' ')).toContain('--gutter')
  })

  it('zeigt jede Komponente mit Vorschau, Schnittstelle, Hinweisen und echtem Quelltext', async () => {
    const wrapper = await mountSuspended(PatternsContent, { route })
    const articles = wrapper.findAll('article.pattern')
    expect(articles).toHaveLength(7)
    const code = (i: number) => articles[i]!.findAll('pre').map((pre) => pre.text())
    expect(articles[0]!.find('a.button').exists()).toBe(true)
    expect(code(0)[1]).toContain('.button {')
    expect(articles[1]!.find('a.text-link .text-link__label').exists()).toBe(true)
    expect(code(1)[1]).toContain('.text-link {')
    expect(articles[2]!.find('a.scroll-button').exists()).toBe(true)
    expect(code(2)[1]).toContain('.scroll-button {')
    expect(articles[3]!.findAll('nav.lang-switch')).toHaveLength(2)
    expect(articles[3]!.findAll('.lang-switch--de, .lang-switch--en').map((el) => el.classes())).toEqual([
      expect.arrayContaining(['lang-switch--de']),
      expect.arrayContaining(['lang-switch--en'])
    ])
    expect(code(3)[1]).toContain('.lang-switch {')
    expect(articles[4]!.find('button.theme-switch').exists()).toBe(true)
    expect(code(4)[1]).toContain('.theme-switch {')
    expect(articles[5]!.findAll('li.drag-chip')).toHaveLength(3)
    expect(code(5)[1]).toContain('<script setup')
    expect(code(5)[1]).toContain('.drag-chip {')
    expect(articles[6]!.get('a.text-link').attributes('href')).toBe(lang === 'de' ? '/404' : '/en/404')
    expect(articles[6]!.get('a.text-link').text()).toBe(p.ui.openNotFound)
    expect(code(6)[1]).toContain('defineProps<{ labels')
    expect(code(6)[1]).toContain('.falling-stage {')
    for (const article of articles) {
      expect(article.findAll('dl dt').length).toBeGreaterThan(0)
      expect(article.findAll('ul li').length).toBeGreaterThan(0)
    }
  })

  it('zeigt im Farbbereich den echten :root-Block', async () => {
    const wrapper = await mountSuspended(PatternsContent, { route })
    expect(wrapper.get('#colors pre').text()).toContain('--blue: #1d63f0;')
    expect(wrapper.get('#colors pre').text()).toContain("[data-theme='light']")
  })

  it('zeigt im hellen Theme die hellen Farbwerte und deren Kontraste', async () => {
    useTheme().theme.value = 'light'
    document.documentElement.dataset.theme = 'light' // der ThemeSwitch liest es beim Einhängen von dort
    try {
      const wrapper = await mountSuspended(PatternsContent, { route })
      const bg = wrapper.findAll('#colors .tokens .token').find((el) => el.text().includes('--bg '))
      expect(bg!.text()).toContain('#f7f8fb')
      expect(wrapper.findAll('.pair')[0]!.text()).toMatch(lang === 'de' ? /16,9:1/ : /16\.9:1/)
    } finally {
      useTheme().theme.value = 'dark'
      delete document.documentElement.dataset.theme
    }
  })

  it('lässt die Demo-Links auf der Seite, ohne zu navigieren', async () => {
    const wrapper = await mountSuspended(PatternsContent, { route })
    for (const selector of ['a.button', 'a.text-link[href="#components"]', 'a.scroll-button', 'a.lang-switch__link']) {
      const targets = wrapper.findAll(`article ${selector}`)
      expect(targets.length, selector).toBeGreaterThan(0)
      for (const target of targets) {
        const event = new MouseEvent('click', { bubbles: true, cancelable: true })
        target.element.dispatchEvent(event)
        expect(event.defaultPrevented, selector).toBe(true)
      }
    }
  })

  it('setzt nach Klick im Inhaltsverzeichnis den Fokus auf die Überschrift des Abschnitts', async () => {
    const wrapper = await mountSuspended(PatternsContent, { route, attachTo: document.body })
    const links = wrapper.findAll('.patterns__toc a')
    expect(links.map((a) => a.attributes('href'))).toEqual(p.nav.map((n) => `#${n.id}`))
    await links[1]!.trigger('click')
    expect(document.activeElement?.id).toBe('typography-title')
    wrapper.unmount()
  })

  it('verlinkt zurück zur Startseite', async () => {
    const wrapper = await mountSuspended(PatternsContent, { route })
    expect(wrapper.get('.patterns__back').attributes('href')).toBe(lang === 'de' ? '/' : '/en')
  })
})

describe('Bausteine der Pattern-Library', () => {
  it('CodeBlock zeigt Quelltext, Dateiname und ist standardmäßig zugeklappt', async () => {
    const wrapper = await mountSuspended(CodeBlock, { props: { code: '.a { color: red; }', file: 'a.scss', summary: 'Quelltext anzeigen' } })
    expect(wrapper.get('summary').text()).toContain('Quelltext anzeigen')
    expect(wrapper.get('summary').text()).toContain('a.scss')
    expect(wrapper.get('pre').text()).toBe('.a { color: red; }')
    expect(wrapper.get('pre').attributes('tabindex')).toBe('0')
    expect(wrapper.get('details').element.hasAttribute('open')).toBe(false)
  })

  it('CodeBlock lässt sich aufgeklappt zeigen', async () => {
    const wrapper = await mountSuspended(CodeBlock, { props: { code: 'x', file: 'f', summary: 's', open: true } })
    expect(wrapper.get('details').element.hasAttribute('open')).toBe(true)
  })

  it('PatternSection verbindet Überschrift und Abschnitt', async () => {
    const wrapper = await mountSuspended(PatternSection, { props: { id: 'demo', title: 'Titel', intro: 'Einleitung' }, slots: { default: '<p class="x">Inhalt</p>' } })
    expect(wrapper.attributes('aria-labelledby')).toBe('demo-title')
    expect(wrapper.get('h2').text()).toBe('Titel')
    expect(wrapper.get('.pattern-section__intro').text()).toBe('Einleitung')
    expect(wrapper.find('.x').exists()).toBe(true)
  })

  it('PatternItem zeigt den Slot als Vorschau', async () => {
    const item = content.de.patterns.components.items[0]!
    const wrapper = await mountSuspended(PatternItem, { route: '/pattern-library', props: { item, file: 'f.scss', code: '.b {}' }, slots: { default: '<span class="demo">Demo</span>' } })
    expect(wrapper.get('.pattern__preview .demo').text()).toBe('Demo')
    expect(wrapper.get('h3').text()).toBe(item.title)
  })
})
