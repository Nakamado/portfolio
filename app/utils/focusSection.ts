/**
 * Setzt nach einem Klick auf einen Anker-Link (#abschnitt) den Tastaturfokus auf die Überschrift des Zielabschnitts.
 * Der nächste Tab-Stopp liegt dann im Abschnitt und nicht wieder oben im Menü.
 */
export function focusSection(event: Event) {
  const link = event.currentTarget as HTMLAnchorElement | null
  const href = link?.getAttribute('href') ?? ''
  const id = href.includes('#') ? href.slice(href.indexOf('#') + 1) : ''
  if (!id) return
  const section = document.getElementById(id)
  const target = section?.querySelector<HTMLElement>('h1, h2') ?? section
  target?.focus({ preventScroll: true })
}
