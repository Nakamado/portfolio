import { describe, expect, it } from 'vitest'
import { createGrid, pushAway } from '~/utils/dotGrid'

describe('createGrid', () => {
  it('füllt die Fläche mit gleichmäßigem Abstand', () => {
    const grid = createGrid(300, 120, 30)
    expect(grid).toHaveLength(10 * 4)
    expect(grid[1]!.x - grid[0]!.x).toBe(30)
    expect(grid[10]!.y - grid[0]!.y).toBe(30)
  })

  it('liefert bei leerer Fläche keine Punkte', () => {
    expect(createGrid(0, 100, 30)).toEqual([])
    expect(createGrid(100, 100, 0)).toEqual([])
  })
})

describe('pushAway', () => {
  it('lässt Punkte außerhalb des Radius in Ruhe', () => {
    expect(pushAway(200, 0, 0, 0, 100, 20)).toEqual({ x: 0, y: 0, intensity: 0 })
  })

  it('schiebt Punkte vom Zeiger weg, nah stärker als fern', () => {
    const near = pushAway(20, 0, 0, 0, 100, 20)
    const far = pushAway(80, 0, 0, 0, 100, 20)
    expect(near.x).toBeGreaterThan(far.x)
    expect(far.x).toBeGreaterThan(0)
    expect(near.y).toBeCloseTo(0)
    expect(pushAway(0, -30, 0, 0, 100, 20).y).toBeLessThan(0)
  })

  it('bleibt bei exakt gleicher Position stabil', () => {
    expect(pushAway(5, 5, 5, 5, 100, 20)).toEqual({ x: 0, y: 0, intensity: 0 })
  })
})
