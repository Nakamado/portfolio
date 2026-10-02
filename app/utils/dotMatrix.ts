/** Ziffern als Punktmuster, das im Raster der 404-Seite aufleuchtet (getrennt vom Canvas, damit es testbar ist). */

/** Ziffern in 5 × 7 Punkten, "#" ist ein gesetzter Punkt. */
export const GLYPHS: Record<string, string[]> = {
  '0': ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  '4': ['...#.', '..##.', '.#.#.', '#..#.', '#####', '...#.', '...#.']
}

/** Baut die Matrix für einen Text aus den bekannten Ziffern, zwischen den Zeichen bleibt eine leere Spalte. */
export function buildMask(text: string): boolean[][] {
  const chars = text.split('')
  return GLYPHS['0']!.map((_, row) => [...chars.map((char) => GLYPHS[char]![row]!).join('.')].map((cell) => cell === '#'))
}

/**
 * Welche Punkte eines Rasters (zeilenweise nummeriert, `cols` × `rows`) zur Schrift gehören. Waagerecht sitzt sie mittig,
 * senkrecht ab Zeile `top` (ohne Angabe mittig). Passt die Schrift nicht ins Raster, gehört kein Punkt dazu.
 */
export function signCells(mask: boolean[][], cols: number, rows: number, top = Math.floor((rows - mask.length) / 2)): Set<number> {
  const cells = new Set<number>()
  const maskRows = mask.length
  const maskCols = mask[0]!.length
  if (cols < maskCols || top < 0 || top + maskRows > rows) return cells
  const left = Math.floor((cols - maskCols) / 2)
  mask.forEach((line, r) =>
    line.forEach((on, c) => {
      if (on) cells.add((top + r) * cols + left + c)
    })
  )
  return cells
}
