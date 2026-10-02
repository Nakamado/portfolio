/** Einfache Physik für die fallenden Tags auf der 404-Seite (getrennt von der Komponente, damit sie testbar ist). */

export interface Body {
  x: number
  y: number
  vx: number
  vy: number
  w: number
  h: number
}

export interface World {
  width: number
  height: number
  /** Beschleunigung nach unten in px/s² */
  gravity: number
  /** Anteil der Geschwindigkeit, der beim Aufprall erhalten bleibt (0 bis 1) */
  bounce: number
  /** Reibung am Boden pro Bild bei 60 Bildern pro Sekunde (0 bis 1) */
  friction: number
}

/** Unter dieser Geschwindigkeit (px/s) bleibt ein Körper am Boden liegen. */
export const REST_SPEED = 60

/** Hält einen Körper innerhalb der Welt. */
export function clampBody(body: Body, world: World): Body {
  const maxX = Math.max(0, world.width - body.w)
  const maxY = Math.max(0, world.height - body.h)
  return { ...body, x: Math.min(Math.max(body.x, 0), maxX), y: Math.min(Math.max(body.y, 0), maxY) }
}

/** Legt einen Körper ohne Bewegung auf den Boden (bei "reduzierter Bewegung"). */
export function settleBody(body: Body, world: World): Body {
  const placed = clampBody(body, world)
  return { ...placed, y: Math.max(0, world.height - body.h), vx: 0, vy: 0 }
}

/** Ein Zeitschritt `dt` (in Sekunden): Schwerkraft, Wände, Boden mit Aufprall und Reibung. */
export function stepBody(body: Body, dt: number, world: World): Body {
  let { x, y, vx, vy } = body
  vy += world.gravity * dt
  x += vx * dt
  y += vy * dt

  const maxX = Math.max(0, world.width - body.w)
  const floor = Math.max(0, world.height - body.h)
  if (x < 0) {
    x = 0
    vx = -vx * world.bounce
  }
  if (x > maxX) {
    x = maxX
    vx = -vx * world.bounce
  }
  if (y >= floor) {
    y = floor
    vy = Math.abs(vy) < REST_SPEED ? 0 : -vy * world.bounce
    vx = Math.abs(vx) < REST_SPEED ? 0 : vx * world.friction ** (dt * 60)
  }
  return { ...body, x, y, vx, vy }
}

/** Liegt ein Körper still auf dem Boden? */
export function isResting(body: Body, world: World): boolean {
  return body.y >= world.height - body.h && body.vx === 0 && body.vy === 0
}
