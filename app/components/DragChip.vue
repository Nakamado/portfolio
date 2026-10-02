<script setup lang="ts">
// Kleine Spielerei: der Tag lässt sich mit der Maus (oder dem Finger) greifen und verschieben.
// Allein springt er beim Loslassen zurück. Mit `offset` bestimmt der Aufrufer die Position (zum Beispiel eine Physik) und
// bekommt dafür die Ereignisse grab, drag und release. Rein dekorativ, der Inhalt bleibt ein normales Listenelement.
const props = defineProps<{
  offset?: { x: number; y: number }
  still?: boolean
}>()
const emit = defineEmits<{ grab: [event: PointerEvent]; drag: [event: PointerEvent]; release: [event: PointerEvent] }>()

const own = ref({ x: 0, y: 0 })
const position = computed(() => props.offset ?? own.value)
const dragging = ref(false)

let startX = 0
let startY = 0
let reduced = false

onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

function onDown(event: PointerEvent) {
  if (props.still || (event.button !== undefined && event.button > 0)) return
  dragging.value = true
  startX = event.clientX - position.value.x
  startY = event.clientY - position.value.y
  emit('grab', event)
  try {
    ;(event.currentTarget as HTMLElement | null)?.setPointerCapture?.(event.pointerId)
  } catch {
    // Pointer Capture nicht verfügbar: der Tag folgt dann nur, solange die Maus über ihm bleibt
  }
}
function onMove(event: PointerEvent) {
  if (!dragging.value) return
  if (!props.offset) own.value = { x: event.clientX - startX, y: event.clientY - startY }
  emit('drag', event)
}
function onUp(event: PointerEvent) {
  if (!dragging.value) return
  dragging.value = false
  if (!props.offset) own.value = { x: 0, y: 0 }
  emit('release', event)
}
</script>

<template>
  <li
    class="drag-chip"
    :class="{
      'drag-chip--dragging': dragging,
      'drag-chip--instant': reduced,
      'drag-chip--controlled': offset,
      'drag-chip--still': still
    }"
    :style="{ '--x': `${position.x}px`, '--y': `${position.y}px` }"
    @pointerdown="onDown"
    @pointermove="onMove"
    @pointerup="onUp"
    @pointercancel="onUp"
    @lostpointercapture="onUp"
  >
    <slot />
  </li>
</template>

<style lang="scss" scoped>
$chip-lift-shadow: 0 0.375rem 0.875rem $shadow-strong;
$drag-chip-padding: 0.1rem 0.6rem;
$chip-border: rgb(255 255 255 / 0.4);

.drag-chip {
  position: relative;
  padding: $drag-chip-padding;
  border: $hairline solid $chip-border;
  background: var(--bg);
  font-size: $font-sm;
  cursor: grab;
  touch-action: none; // sonst scrollt der Finger statt den Tag zu ziehen
  user-select: none;
  transform: translate(var(--x, 0), var(--y, 0)); // die Position setzt das Skript als Variablen, hier steht nur, was daraus wird
  transition:
    transform $duration-spring $ease-spring-strong, // federt beim Zurückspringen leicht über
    border-color $transition-fast;

  &:hover {
    border-color: var(--blue-light);
  }

  &--dragging {
    z-index: $z-lifted;
    border-color: var(--blue-light);
    box-shadow: $chip-lift-shadow;
    cursor: grabbing;
    transition: border-color $transition-fast; // beim Ziehen folgt der Tag ohne Verzögerung
  }

  &--instant {
    transition: none;
  }

  // Die Position kommt vom Aufrufer (jedes Bild neu), also kein Federn
  &--controlled {
    transition: border-color $transition-fast;
  }

  // Bei "reduzierter Bewegung" bleibt alles liegen
  &--still {
    cursor: default;
    pointer-events: none;
  }
}
</style>
