<script setup lang="ts">
// Runder Pfeil-Button, der zum nächsten Abschnitt springt (im Hero unter den Aktionen).
// Technisch ein Anker-Link; nach dem Klick landet der Fokus auf der Überschrift des Ziels.
defineProps<{ href: string; label: string }>()
const onNavigate = focusSection // siehe utils/focusSection.ts
</script>

<template>
  <a class="scroll-button" :href="href" :aria-label="label" @click="onNavigate">
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false">
      <path d="M5 9l7 7 7-7" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </a>
</template>

<style lang="scss" scoped>
$scroll-button-size: 4rem;
.scroll-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: $scroll-button-size;
  height: $scroll-button-size;
  border-radius: 50%;
  background: var(--blue);
  color: var(--on-blue);
  transition: background-color $transition-fast;

  &:hover {
    background: var(--blue-dark);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}
</style>
