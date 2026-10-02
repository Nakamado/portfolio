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
.pager {
  position: fixed;
  bottom: calc(1.25rem + var(--pager-lift, 0px)); // rückt über den Footer, wenn dieser ins Bild kommt
  left: var(--gutter);
  z-index: 9;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: var(--blue);
  box-shadow: 0 4px 14px rgb(0 0 0 / 0.4);
  color: #fff;
  opacity: 0;
  visibility: hidden; // nimmt den Button im Hero auch aus Tab-Reihenfolge und Screenreader
  transform: translateY(1rem);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease,
    visibility 0.3s,
    background-color 0.2s;

  &--visible {
    opacity: 1;
    visibility: visible;
    transform: none;
  }

  &:hover {
    background: var(--blue-dark);
  }

  &__icon {
    transition: transform 0.6s cubic-bezier(0.3, 1.4, 0.5, 1);
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
