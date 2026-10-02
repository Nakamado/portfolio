<script setup lang="ts">
// Wechselt zwischen hellem und dunklem Theme. Beide Symbole stehen im HTML, welches zu sehen ist, entscheidet das CSS über
// data-theme auf <html>. So gibt es kein Aufblitzen und keinen Unterschied zwischen Server und Browser.
defineProps<{ label: string }>()
const { isLight, sync, toggle } = useTheme()

onMounted(sync)
</script>

<template>
  <button class="theme-switch" type="button" :aria-label="label" :aria-pressed="isLight" @click="toggle">
    <svg class="theme-switch__icon theme-switch__icon--moon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" fill="currentColor" />
    </svg>
    <svg class="theme-switch__icon theme-switch__icon--sun" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="4.5" fill="currentColor" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  </button>
</template>

<style lang="scss" scoped>
$switch-border: 0.125rem;
$switch-focus-inset: -0.25rem;

.theme-switch {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: $tap-target;
  height: $tap-target;
  padding: 0;
  border: $switch-border solid var(--text);
  background: var(--bg);
  color: var(--text);
  cursor: pointer;
  transition:
    background-color $transition-base,
    border-color $transition-base,
    color $transition-base;

  &:hover {
    border-color: var(--blue-light);
    color: var(--blue-light);
  }

  &:focus-visible {
    outline-offset: $switch-focus-inset;
  }

  // Dunkel: das Mond-Symbol steht für den aktuellen Stand, ein Klick führt zur Sonne. Hell andersherum.
  &__icon--sun {
    display: none;
  }

  :root[data-theme='light'] & &__icon--moon {
    display: none;
  }

  :root[data-theme='light'] & &__icon--sun {
    display: block;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}
</style>
