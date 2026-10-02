import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { THEME_KEY, applyTheme, isTheme, preferredTheme, storeTheme, systemTheme, themeScript } from '../app/utils/theme'

function system(light: boolean) {
  vi.spyOn(window, 'matchMedia').mockImplementation(((query: string) => ({ matches: light && query.includes('light') })) as never)
}

describe('Theme', () => {
  beforeEach(() => {
    window.localStorage.clear()
    delete document.documentElement.dataset.theme
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('erkennt gültige Themes', () => {
    expect(isTheme('dark')).toBe(true)
    expect(isTheme('light')).toBe(true)
    expect(isTheme('blau')).toBe(false)
    expect(isTheme(null)).toBe(false)
  })

  it('folgt ohne Wahl der Systemeinstellung', () => {
    system(true)
    expect(systemTheme()).toBe('light')
    expect(preferredTheme()).toBe('light')
    system(false)
    expect(systemTheme()).toBe('dark')
    expect(preferredTheme()).toBe('dark')
  })

  it('bevorzugt die gespeicherte Wahl und ignoriert ungültige Einträge', () => {
    system(true)
    window.localStorage.setItem(THEME_KEY, 'dark')
    expect(preferredTheme()).toBe('dark')
    window.localStorage.setItem(THEME_KEY, 'quatsch')
    expect(preferredTheme()).toBe('light')
  })

  it('kommt mit gesperrtem Speicher klar', () => {
    system(false)
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('gesperrt')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('gesperrt')
    })
    expect(preferredTheme()).toBe('dark')
    expect(() => storeTheme('light')).not.toThrow()
  })

  it('setzt das Theme auf <html> und merkt sich die Wahl', () => {
    applyTheme('light')
    expect(document.documentElement.dataset.theme).toBe('light')
    storeTheme('light')
    expect(window.localStorage.getItem(THEME_KEY)).toBe('light')
  })

  describe('Skript im Head', () => {
    const run = () => new Function(themeScript)()

    it('setzt die gespeicherte Wahl', () => {
      system(false)
      window.localStorage.setItem(THEME_KEY, 'light')
      run()
      expect(document.documentElement.dataset.theme).toBe('light')
    })

    it('nimmt ohne Wahl die Systemeinstellung', () => {
      system(true)
      run()
      expect(document.documentElement.dataset.theme).toBe('light')
      system(false)
      run()
      expect(document.documentElement.dataset.theme).toBe('dark')
    })

    it('kommt mit gesperrtem Speicher klar', () => {
      system(true)
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('gesperrt')
      })
      run()
      expect(document.documentElement.dataset.theme).toBe('light')
    })
  })
})
