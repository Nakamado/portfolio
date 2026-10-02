<script setup lang="ts">
import { createGrid, pushAway, type GridPoint } from '~/utils/dotGrid'
import { buildMask, signCells } from '~/utils/dotMatrix'
import { hexToRgb, isHex } from '~/utils/color'

// Punktraster hinter dem Hero. Die Punkte weichen dem Mauszeiger aus und färben sich blau.
// Mit `sign` (zum Beispiel "404") bilden Punkte eine Schrift, die aufleuchtet, sobald `lit` true ist. Sie sitzt mittig, oder (mit `signAt`,
// einem Selektor) auf der Höhe eines Platzhalter-Elements im selben Abschnitt. Ist der Platzhalter ausgeblendet, bleibt die Schrift weg.
// Rein dekorativ: aria-hidden, keine Interaktion per Tastatur nötig, bei "reduzierter Bewegung" nur ein ruhiges Raster.
const props = defineProps<{ sign?: string; signAt?: string; lit?: boolean }>()
const { theme } = useTheme()
const GAP = 30
const RADIUS = 130
const STRENGTH = 22
const REST_ALPHA = 0.13 // wie kräftig die ruhigen Punkte sind
const SIGN_PULSE = 1.6 // so viel größer (px) werden die Punkte der Schrift beim Aufleuchten
const PULSE_FRAMES = 70 // so lange dauert das Aufleuchten
const SIGN_LEVEL = 0.7 // so stark leuchten die Punkte der Schrift (1 wäre so kräftig wie nahe am Zeiger)

const canvas = ref<HTMLCanvasElement | null>(null)

interface Dot extends GridPoint {
  ox: number
  oy: number
}

let dots: Dot[] = []
let signDots = new Set<number>() // Nummern der Punkte, die zur Schrift gehören
type Rgb = [number, number, number]
let restRgb: Rgb = [255, 255, 255] // ruhige Punkte: Textfarbe (--text)
let accentRgb: Rgb = [79, 140, 255] // aktive Punkte: Akzentfarbe (--blue-light)
let reveal = 0 // 0 bis 1: wie weit die Schrift aufgeleuchtet ist
let glow = 1 // 0 bis 1: Fortschritt des kurzen Aufblitzens, 1 heißt: vorbei
let cols = 0
let ctx: CanvasRenderingContext2D | null = null
let width = 0
let height = 0
let frame = 0
let reduced = false
let pointer: GridPoint | null = null
let observer: ResizeObserver | null = null
let host: HTMLElement | null = null

/** Die Farben kommen aus den CSS-Variablen des aktuellen Themes, denn der Canvas kennt kein var(). */
function readColors() {
  const style = getComputedStyle(document.documentElement)
  const read = (name: string, fallback: Rgb): Rgb => {
    const value = style.getPropertyValue(name).trim()
    return isHex(value) ? hexToRgb(value) : fallback
  }
  restRgb = read('--text', [255, 255, 255])
  accentRgb = read('--blue-light', [79, 140, 255])
}

function draw(): boolean {
  const c = ctx // der Verweis bleibt auch in der Schleife gesetzt
  if (!c) return false
  c.clearRect(0, 0, width, height)
  const target = Number(props.lit)
  reveal = reduced ? target : reveal + (target - reveal) * 0.08
  glow = Math.min(1, glow + 1 / PULSE_FRAMES)
  let moving = Math.abs(target - reveal) > 0.01 || glow < 1
  dots.forEach((dot, index) => {
    let intensity = 0
    let targetX = 0
    let targetY = 0
    if (pointer) {
      const push = pushAway(dot.x, dot.y, pointer.x, pointer.y, RADIUS, STRENGTH)
      targetX = push.x
      targetY = push.y
      intensity = push.intensity
    }
    dot.ox += (targetX - dot.ox) * 0.14
    dot.oy += (targetY - dot.oy) * 0.14
    if (Math.abs(targetX - dot.ox) > 0.05 || Math.abs(targetY - dot.oy) > 0.05) moving = true

    // Nähe zum Zeiger: größer und blau, sonst ein ruhiger heller Punkt
    // Die Schrift blitzt von links nach rechts kurz größer auf, dann bleibt sie so, wie sie ist
    const bump = signDots.has(index) ? Math.sin(Math.PI * Math.min(1, Math.max(0, glow * 1.5 - ((index % cols) / cols) * 0.5))) : 0
    const signLevel = signDots.has(index) ? reveal * SIGN_LEVEL + bump * (1 - SIGN_LEVEL) : 0
    const near = Math.max(Math.min(1, Math.hypot(dot.ox, dot.oy) / (STRENGTH * 0.6)), signLevel)
    c.beginPath()
    c.arc(dot.x + dot.ox, dot.y + dot.oy, 1.3 + near * 1.8 + bump * SIGN_PULSE, 0, Math.PI * 2)
    c.fillStyle = near > 0.02 || intensity > 0.02 ? `rgb(${accentRgb.join(' ')} / ${0.25 + near * 0.75})` : `rgb(${restRgb.join(' ')} / ${REST_ALPHA})`
    c.fill()
  })
  return moving || pointer !== null
}

function loop() {
  frame = 0
  if (draw()) frame = requestAnimationFrame(loop)
}
function start() {
  if (!frame) frame = requestAnimationFrame(loop)
}

/** Erste Zeile der Schrift, damit sie in der Höhe des Platzhalters sitzt (undefined: mittig, -1: keine Schrift). */
function anchorRow(rows: number, maskRows: number, canvasTop: number): number | undefined {
  if (!props.signAt) return undefined
  const anchor = canvas.value!.parentElement!.querySelector<HTMLElement>(props.signAt)?.getBoundingClientRect()
  if (!anchor || anchor.height === 0) return -1
  const offsetY = (height - (rows - 1) * GAP) / 2
  return Math.round((anchor.top + anchor.height / 2 - canvasTop - offsetY) / GAP - (maskRows - 1) / 2)
}

function resize() {
  const el = canvas.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  width = rect.width
  height = rect.height
  const ratio = window.devicePixelRatio || 1
  el.width = Math.round(width * ratio)
  el.height = Math.round(height * ratio)
  ctx = el.getContext('2d')
  ctx?.setTransform(ratio, 0, 0, ratio, 0, 0)
  dots = createGrid(width, height, GAP).map((p) => ({ ...p, ox: 0, oy: 0 }))
  cols = Math.floor(width / GAP)
  const rows = Math.floor(height / GAP)
  const mask = props.sign ? buildMask(props.sign) : []
  signDots = props.sign ? signCells(mask, cols, rows, anchorRow(rows, mask.length, rect.top)) : new Set()
  draw()
}

function onMove(event: PointerEvent) {
  if (event.pointerType === 'touch') return
  const rect = canvas.value!.getBoundingClientRect() // Listener hängen nur, solange die Komponente eingehängt ist
  pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top }
  start()
}
function onLeave() {
  pointer = null
  start() // Punkte gleiten zurück
}

watch(theme, () => {
  readColors()
  draw()
})

watch(
  () => props.lit,
  (lit) => {
    if (reduced) {
      draw()
    } else {
      if (lit) glow = 0 // Aufblitzen von vorn
      start()
    }
  }
)

onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  readColors()
  resize()
  if (typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(resize)
    observer.observe(canvas.value!)
  }
  host = canvas.value!.parentElement
  if (!reduced) {
    host!.addEventListener('pointermove', onMove)
    host!.addEventListener('pointerleave', onLeave)
  }
})

onBeforeUnmount(() => {
  if (frame) cancelAnimationFrame(frame)
  observer?.disconnect()
  host?.removeEventListener('pointermove', onMove)
  host?.removeEventListener('pointerleave', onLeave)
})
</script>

<template>
  <canvas ref="canvas" class="hero-backdrop" aria-hidden="true" />
</template>

<style lang="scss" scoped>
.hero-backdrop {
  position: absolute;
  inset: 0;
  z-index: $z-behind;
  width: 100%;
  height: 100%;
  pointer-events: none; // Ereignisse hört der Hero-Abschnitt ab
}
</style>
