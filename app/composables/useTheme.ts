/** Aktuelles Theme als gemeinsamer Zustand. Der Server kennt die Wahl nicht und rendert dunkel, der Client gleicht nach dem Einhängen ab. */
export function useTheme() {
  const theme = useState<Theme>('theme', () => 'dark')

  /** Liest den Stand, den das Skript im <head> auf <html> gesetzt hat. */
  function sync() {
    theme.value = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
  }

  function toggle() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    applyTheme(theme.value)
    storeTheme(theme.value)
  }

  return { theme, isLight: computed(() => theme.value === 'light'), sync, toggle }
}
