<script setup lang="ts">
import { createGrid, pushAway, type GridPoint } from '~/utils/dotGrid'

// Punktraster hinter dem Hero. Die Punkte weichen dem Mauszeiger aus und färben sich blau.
// Rein dekorativ: aria-hidden, keine Interaktion per Tastatur nötig, bei "reduzierter Bewegung" nur ein ruhiges Raster.
const GAP = 30
const RADIUS = 130
const STRENGTH = 22

const canvas = ref<HTMLCanvasElement | null>(null)

interface Dot extends GridPoint {
  ox: number
  oy: number
}

let dots: Dot[] = []
let ctx: CanvasRenderingContext2D | null = null
let width = 0
let height = 0
let frame = 0
let reduced = false
let pointer: GridPoint | null = null
let observer: ResizeObserver | null = null
let host: HTMLElement | null = null

function draw(): boolean {
  if (!ctx) return false
  ctx.clearRect(0, 0, width, height)
  let moving = false
  for (const dot of dots) {
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
    const near = Math.min(1, Math.hypot(dot.ox, dot.oy) / (STRENGTH * 0.6))
    ctx.beginPath()
    ctx.arc(dot.x + dot.ox, dot.y + dot.oy, 1.3 + near * 1.8, 0, Math.PI * 2)
    ctx.fillStyle = near > 0.02 || intensity > 0.02 ? `rgb(79 140 255 / ${0.25 + near * 0.75})` : 'rgb(255 255 255 / 0.13)'
    ctx.fill()
  }
  return moving || pointer !== null
}

function loop() {
  frame = 0
  if (draw()) frame = requestAnimationFrame(loop)
}
function start() {
  if (!frame) frame = requestAnimationFrame(loop)
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

onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
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
