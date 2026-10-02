<script setup lang="ts">
// Abschnitt der Pattern-Library: gleiche Konvention wie auf der Startseite (Abschnitt per Skript fokussierbar, Überschrift per Tab erreichbar).
defineProps<{ id: string; title: string; intro: string }>()
</script>

<template>
  <section :id="id" class="pattern-section" :aria-labelledby="`${id}-title`" tabindex="-1">
    <h2 :id="`${id}-title`" class="pattern-section__title" tabindex="0">{{ title }}</h2>
    <p class="pattern-section__intro">{{ intro }}</p>
    <slot />
  </section>
</template>

<style lang="scss" scoped>
.pattern-section {
  padding: 3rem 0;
  border-top: 1px solid var(--line);

  &__title {
    margin-bottom: 1rem;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
  }

  &__intro {
    margin-bottom: 2rem;
    color: var(--muted);
    font-size: 1.1rem;
  }
}
</style>
