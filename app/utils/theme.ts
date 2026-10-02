/** Helles oder dunkles Theme: Wahl lesen, speichern und auf <html> anwenden (getrennt von der Oberfläche, damit sie testbar ist). */

export type Theme = 'dark' | 'light'

export const THEME_KEY = 'theme'

export const isTheme = (value: unknown): value is Theme => value === 'dark' || value === 'light'

/** Die Systemeinstellung des Geräts. */
export const systemTheme = (): Theme => (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')

/** Gespeicherte Wahl, sonst die Systemeinstellung. Speicher darf fehlen oder gesperrt sein. */
export function preferredTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(THEME_KEY)
    if (isTheme(stored)) return stored
  } catch {
    // Speicher gesperrt (z. B. privater Modus): dann gilt die Systemeinstellung
  }
  return systemTheme()
}

/** Setzt das Theme auf <html> (die Farben hängen an data-theme). */
export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
}

/** Merkt sich die Wahl im Browser; ohne Speicher gilt sie nur für diesen Besuch. */
export function storeTheme(theme: Theme) {
  try {
    window.localStorage.setItem(THEME_KEY, theme)
  } catch {
    // Speicher gesperrt: die Wahl gilt trotzdem bis zum Neuladen
  }
}

/**
 * Läuft inline im <head>, bevor die Seite gezeichnet wird, damit sie nicht im falschen Theme aufblitzt.
 * Dieselbe Logik wie preferredTheme + applyTheme, als Text, weil sie ohne Bundle auskommen muss.
 */
export const themeScript = `(function(){var t;try{t=localStorage.getItem('${THEME_KEY}')}catch(e){}if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t})()`
