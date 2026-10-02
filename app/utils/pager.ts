/** Reihenfolge der Abschnitte für den mitlaufenden "Weiter"-Button. */
export const PAGER_SECTION_IDS = ['top', 'about', 'experience', 'skills', 'projects', 'contact'] as const

/**
 * Ermittelt den aktuellen Abschnitt: der letzte, dessen Oberkante die Messlinie erreicht hat.
 * Am Seitenende zählt immer der letzte Abschnitt.
 */
export function currentSectionIndex(tops: number[], line: number, atBottom: boolean): number {
  if (atBottom) return tops.length - 1
  let index = 0
  tops.forEach((top, i) => {
    if (top <= line) index = i
  })
  return index
}

/** Ziel des Buttons: nächster Abschnitt, im letzten Abschnitt zurück an den Anfang (Pfeil zeigt dann nach oben). */
export function pagerTarget(index: number, ids: readonly string[] = PAGER_SECTION_IDS): { id: string; up: boolean } {
  const last = index >= ids.length - 1
  return { id: last ? ids[0]! : ids[index + 1]!, up: last }
}

/**
 * Wie weit der Button nach oben rücken muss, damit er nie über dem Footer liegt.
 * `footerTop` ist die Oberkante des Footers im Fenster, `viewportHeight` die Fensterhöhe.
 */
export function pagerLift(footerTop: number, viewportHeight: number): number {
  return Math.max(0, Math.round(viewportHeight - footerTop))
}
