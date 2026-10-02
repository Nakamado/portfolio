<script setup lang="ts">
import { clampBody, isResting, settleBody, stepBody, type Body, type World } from '~/utils/physics'

// Bühne mit Boden: Der Inhalt (Slot) steht erst ganz normal da, dazwischen eine Reihe Tags (DragChip). Nach kurzer Zeit
// fallen sie auf den Boden der Bühne, prallen ab und bleiben liegen. Man kann sie greifen, wegwerfen und wieder fallen lassen.
// Die Tags sind rein dekorativ (aria-hidden). Bei "reduzierter Bewegung" liegen sie sofort am Boden und bewegen sich nicht.
// Das Event `fall` meldet, dass die Tags fallen (oder, bei reduzierter Bewegung, schon liegen).
const props = defineProps<{ labels: string[] }>()
const emit = defineEmits<{ fall: [] }>()

const DELAY = 1400 // ms, bis der erste Tag fällt
const STAGGER = 140 // ms zwischen den einzelnen Tags
const MAX_SPEED = 1800 // px/s, damit ein Wurf nicht aus dem Bild schießt
const STALE = 80 // ms: war die letzte Bewegung länger her, wird nicht geworfen
const MAX_STEP = 0.032 // s, größter Zeitschritt pro Bild

const root = ref<HTMLElement | null>(null)
const dragging = ref(-1)
const still = ref(false)
const offsets = ref(props.labels.map(() => ({ x: 0, y: 0 })))

let bodies: Body[] = []
let homes: { x: number; y: number }[] = []
let sizes: { w: number; h: number }[] = []
let world: World = { width: 0, height: 0, gravity: 2400, bounce: 0.42, friction: 0.88 }
let fallAt: number[] = []
let frame = 0
let last = 0
let clock = 0
let timer: ReturnType<typeof setTimeout> | undefined
let observer: ResizeObserver | null = null
let started = false // hat das Fallen begonnen?
let grab = { px: 0, py: 0, bx: 0, by: 0, t: 0 }

const speed = (value: number) => Math.max(-MAX_SPEED, Math.min(MAX_SPEED, value))

/** Liest Größe der Bühne und Position der Tags (Layoutwerte, die vom Verschieben unberührt bleiben). */
function readLayout() {
  const el = root.value!
  const items = Array.from(el.querySelectorAll<HTMLElement>('.drag-chip'))
  world = { ...world, width: el.clientWidth, height: el.clientHeight }
  homes = items.map((item) => ({ x: item.offsetLeft, y: item.offsetTop }))
  sizes = items.map((item) => ({ w: item.offsetWidth, h: item.offsetHeight }))
}

function sync() {
  offsets.value = bodies.map((b, i) => ({ x: b.x - homes[i]!.x, y: b.y - homes[i]!.y }))
}

function loop(time: number) {
  frame = 0
  const dt = last ? Math.min(MAX_STEP, (time - last) / 1000) : 0
  last = time
  clock += dt * 1000
  bodies = bodies.map((b, i) => (i === dragging.value || clock < fallAt[i]! ? b : stepBody(b, dt, world)))
  sync()
  const busy = dragging.value >= 0 || bodies.some((b, i) => clock < fallAt[i]! || !isResting(b, world))
  if (busy) frame = requestAnimationFrame(loop)
  else last = 0
}
function start() {
  if (!frame) frame = requestAnimationFrame(loop)
}

function startFalling() {
  started = true
  emit('fall')
  start()
}

function onGrab(event: PointerEvent, index: number) {
  const body = bodies[index]!
  dragging.value = index
  grab = { px: event.clientX, py: event.clientY, bx: body.x, by: body.y, t: event.timeStamp }
}

function onDrag(event: PointerEvent) {
  const index = dragging.value
  const dt = Math.max(1, event.timeStamp - grab.t) / 1000
  grab.t = event.timeStamp
  const body = bodies[index]!
  const next = clampBody({ ...body, x: grab.bx + event.clientX - grab.px, y: grab.by + event.clientY - grab.py }, world)
  bodies[index] = { ...next, vx: speed((next.x - body.x) / dt), vy: speed((next.y - body.y) / dt) }
  sync()
}

function onRelease(event: PointerEvent) {
  const index = dragging.value
  dragging.value = -1
  if (event.timeStamp - grab.t > STALE) bodies[index] = { ...bodies[index]!, vx: 0, vy: 0 }
  start()
}

// Ändert sich die Größe der Bühne (Fenster, nachgeladene Schrift, Umbruch), werden die Maße neu gelesen, sonst liegen die Tags
// nicht auf dem Boden. Vor dem Fallen bleiben sie einfach an ihrem neuen Platz.
function onResize() {
  readLayout()
  bodies = bodies.map((b, i) => {
    const sized = { ...b, ...sizes[i]! }
    if (still.value) return settleBody(sized, world)
    return started ? clampBody(sized, world) : { ...sized, ...homes[i]! }
  })
  sync()
  if (started) start()
}

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  readLayout()
  bodies = homes.map((home, i) => ({ x: home.x, y: home.y, vx: 0, vy: 0, ...sizes[i]! }))
  fallAt = bodies.map((_, i) => i * STAGGER)
  window.addEventListener('resize', onResize)
  if (typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(onResize)
    observer.observe(root.value!)
  }
  if (reduced) {
    still.value = true
    bodies = bodies.map((b) => settleBody(b, world))
    sync()
    emit('fall')
  } else {
    timer = setTimeout(startFalling, DELAY)
  }
})

onBeforeUnmount(() => {
  clearTimeout(timer)
  if (frame) cancelAnimationFrame(frame)
  observer?.disconnect()
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <div ref="root" class="falling-stage">
    <slot name="before" />
    <ul class="falling-stage__list" aria-hidden="true">
      <DragChip
        v-for="(label, index) in labels"
        :key="label"
        :offset="offsets[index]!"
        :still="still"
        @grab="onGrab($event, index)"
        @drag="onDrag"
        @release="onRelease"
      >
        {{ label }}
      </DragChip>
    </ul>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.falling-stage {
  position: relative; // Bezugspunkt für die Maße (offsetLeft, clientHeight) und damit der Boden der Bühne
  isolation: isolate; // das Punktraster (z-index -1) bleibt innerhalb der Bühne

  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: center;
    gap: $space-2;
    margin: $space-2 0 $space-6;
    padding: 0;
    list-style: none;
  }
}
</style>
