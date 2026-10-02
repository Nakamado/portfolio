import { describe, expect, it } from 'vitest'
import { REST_SPEED, clampBody, isResting, settleBody, stepBody, type Body, type World } from '../app/utils/physics'

const world: World = { width: 200, height: 100, gravity: 1000, bounce: 0.5, friction: 0.9 }
const body = (over: Partial<Body> = {}): Body => ({ x: 50, y: 0, vx: 0, vy: 0, w: 20, h: 10, ...over })

describe('Physik', () => {
  it('beschleunigt einen Körper in der Luft nach unten', () => {
    const next = stepBody(body(), 0.1, world)
    expect(next.vy).toBeCloseTo(100)
    expect(next.y).toBeCloseTo(10)
    expect(next.x).toBe(50)
  })

  it('bewegt einen Körper seitlich mit seiner Geschwindigkeit', () => {
    expect(stepBody(body({ vx: 100 }), 0.1, world).x).toBeCloseTo(60)
  })

  it('prallt am Boden mit Verlust zurück', () => {
    const next = stepBody(body({ y: 85, vy: 400 }), 0.1, world)
    expect(next.y).toBe(90)
    expect(next.vy).toBeCloseTo(-250) // (400 + 100) * 0.5, nach oben
  })

  it('bleibt bei kleiner Geschwindigkeit am Boden liegen und bremst seitlich ab', () => {
    const next = stepBody(body({ y: 90, vx: 30 }), 1 / 60, world)
    expect(next.vy).toBe(0)
    expect(next.vx).toBe(0)
    expect(isResting(next, world)).toBe(true)
  })

  it('rutscht am Boden mit Reibung weiter, solange er schnell genug ist', () => {
    const next = stepBody(body({ y: 90, vx: 300 }), 1 / 60, world)
    expect(next.vx).toBeCloseTo(300 * 0.9)
    expect(isResting(next, world)).toBe(false)
  })

  it('prallt an beiden Wänden ab', () => {
    const left = stepBody(body({ x: 2, vx: -100 }), 0.1, world)
    expect(left.x).toBe(0)
    expect(left.vx).toBeCloseTo(50)
    const right = stepBody(body({ x: 178, vx: 100 }), 0.1, world)
    expect(right.x).toBe(180)
    expect(right.vx).toBeCloseTo(-50)
  })

  it('kommt auch in einer sehr kleinen Welt nicht ins Negative', () => {
    const tiny: World = { ...world, width: 5, height: 5 }
    const next = stepBody(body(), 0.1, tiny)
    expect(next.x).toBe(0)
    expect(next.y).toBe(0)
  })

  it('erkennt, ob ein Körper ruht', () => {
    expect(isResting(body({ y: 90 }), world)).toBe(true)
    expect(isResting(body({ y: 50 }), world)).toBe(false)
    expect(isResting(body({ y: 90, vx: 5 }), world)).toBe(false)
    expect(isResting(body({ y: 90, vy: 5 }), world)).toBe(false)
    expect(REST_SPEED).toBeGreaterThan(0)
  })

  it('hält Körper in der Welt und legt sie auf Wunsch auf den Boden', () => {
    expect(clampBody(body({ x: -10, y: 500 }), world)).toMatchObject({ x: 0, y: 90 })
    expect(clampBody(body({ x: 500, y: -4 }), world)).toMatchObject({ x: 180, y: 0 })
    expect(settleBody(body({ x: 500, y: 3, vx: 9, vy: 9 }), world)).toEqual({ x: 180, y: 90, vx: 0, vy: 0, w: 20, h: 10 })
  })
})
