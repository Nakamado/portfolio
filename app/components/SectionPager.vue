<script setup lang="ts">
import { PAGER_SECTION_IDS, currentSectionIndex, pagerLift, pagerTarget } from '~/utils/pager'

const { t } = useLang()
const index = ref(0)
const lift = ref(0) // Abstand nach oben, damit der Button über dem Footer bleibt

const target = computed(() => pagerTarget(index.value))
const visible = computed(() => index.value >= 1) // erscheint ab "Über mich"
const label = computed(() => {
  if (target.value.up) return t.value.ui.backToTop
  const name = t.value.nav.find((item) => item.id === target.value.id)!.label // jede Ziel-ID außer "top" steht in der Navigation
  return t.value.ui.nextSection.replace('{section}', name)
})

let frame = 0
function update() {
  frame = 0
  // Auf Seiten ohne Abschnitte (Impressum) bleibt der Button verborgen.
  const footer = document.querySelector('.site-footer')
  lift.value = footer ? pagerLift(footer.getBoundingClientRect().top, window.innerHeight) : 0
  if (!document.getElementById('top')) {
    index.value = 0
    return
  }
  const tops = PAGER_SECTION_IDS.map((id) => document.getElementById(id)?.getBoundingClientRect().top ?? Infinity)
  const page = document.documentElement
  const scrollable = page.scrollHeight > window.innerHeight + 4
  const atBottom = scrollable && window.innerHeight + window.scrollY >= page.scrollHeight - 4
  index.value = currentSectionIndex(tops, window.innerHeight * 0.4, atBottom)
}
function schedule() {
  if (!frame) frame = requestAnimationFrame(update)
}

const route = useRoute()
watch(() => route.path, () => nextTick(update))

onMounted(() => {
  update()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <a
    class="pager"
    :class="{ 'pager--visible': visible, 'pager--up': target.up }"
    :style="{ '--pager-lift': `${lift}px` }"
    :href="`#${target.id}`"
    :aria-label="label"
    @click="focusSection"
  >
    <svg class="pager__icon" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false">
      <path d="M5 9l7 7 7-7" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </a>
</template>

<style lang="scss" scoped>
$pager-shadow: 0 0.25rem 0.875rem $shadow-strong;
$pager-size: 3.5rem;
$pager-offset: 1rem; // Versatz im ausgeblendeten Zustand
$pager-bottom: 1.25rem;
.pager {
  position: fixed;
  bottom: calc($pager-bottom + var(--pager-lift, 0rem)); // rückt über den Footer, wenn dieser ins Bild kommt
  left: var(--gutter);
  z-index: $z-pager;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: $pager-size;
  height: $pager-size;
  border-radius: 50%;
  background: var(--blue);
  box-shadow: $pager-shadow;
  color: var(--on-blue);
  opacity: 0;
  visibility: hidden; // nimmt den Button im Hero auch aus Tab-Reihenfolge und Screenreader
  transform: translateY($pager-offset);
  transition:
    opacity $transition-base,
    transform $transition-base,
    visibility $duration-base,
    background-color $duration-fast;

  &--visible {
    opacity: 1;
    visibility: visible;
    transform: none;
  }

  &:hover {
    background: var(--blue-dark);
  }

  &__icon {
    transition: transform $duration-spring-long $ease-spring-soft;
  }

  &--up &__icon {
    transform: rotate(180deg); // im letzten Abschnitt dreht sich der Pfeil nach oben
  }

  @media (prefers-reduced-motion: reduce) {
    &,
    &__icon {
      transition: none;
    }
  }
}
</style>
