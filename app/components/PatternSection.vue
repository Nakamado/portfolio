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
$pattern-section-title-font-size: clamp(1.75rem, 4vw, 2.5rem);
$pattern-section-intro-font-size: 1.1rem;
.pattern-section {
  padding: $space-12 0;
  border-top: $border-line;

  &__title {
    margin-bottom: $space-4;
    font-size: $pattern-section-title-font-size;
  }

  &__intro {
    margin-bottom: $space-8;
    color: var(--muted);
    font-size: $pattern-section-intro-font-size;
  }
}
</style>
