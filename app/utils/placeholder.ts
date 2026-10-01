/** Angaben in eckigen Klammern (z. B. "[Straße ergänzen]") gelten als noch offene Platzhalter. */
export function isPlaceholder(value: string): boolean {
  return /\[[^\]]*\]/.test(value)
}
