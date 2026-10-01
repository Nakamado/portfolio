/** Reine Rechenfunktionen für das Punktraster im Hero (getrennt vom Canvas, damit sie testbar sind). */

export interface GridPoint {
  x: number
  y: number
}

/** Regelmäßiges Raster, das die Fläche mit gleichmäßigem Rand füllt. */
export function createGrid(width: number, height: number, gap: number): GridPoint[] {
  if (width <= 0 || height <= 0 || gap <= 0) return []
  const cols = Math.floor(width / gap)
  const rows = Math.floor(height / gap)
  const offsetX = (width - (cols - 1) * gap) / 2
  const offsetY = (height - (rows - 1) * gap) / 2
  const points: GridPoint[] = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      points.push({ x: offsetX + col * gap, y: offsetY + row * gap })
    }
  }
  return points
}

/**
 * Verschiebung eines Punktes weg vom Mauszeiger. `intensity` (0 bis 1) wächst, je näher der Zeiger kommt.
 * Außerhalb des Radius passiert nichts.
 */
export function pushAway(
  pointX: number,
  pointY: number,
  pointerX: number,
  pointerY: number,
  radius: number,
  strength: number
): { x: number; y: number; intensity: number } {
  const dx = pointX - pointerX
  const dy = pointY - pointerY
  const distance = Math.hypot(dx, dy)
  if (distance >= radius || distance === 0) return { x: 0, y: 0, intensity: 0 }
  const intensity = (1 - distance / radius) ** 2
  return { x: (dx / distance) * intensity * strength, y: (dy / distance) * intensity * strength, intensity }
}
