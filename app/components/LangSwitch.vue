<script setup lang="ts">
// Sprachwahl als Lichtschalter: der Knopf springt zur aktiven Sprache, die Spur leuchtet bei EN blau.
// Die Komponente kennt keine Routen: aktive Sprache, Zielpfade und Beschriftung kommen von außen.
type Lang = 'de' | 'en'
defineProps<{ lang: Lang; paths: Record<Lang, string>; label: string }>()

const languages = [
  { code: 'de', label: 'Deutsch (DE)' },
  { code: 'en', label: 'English (EN)' }
] as const
</script>

<template>
  <nav class="lang-switch" :class="`lang-switch--${lang}`" :aria-label="label">
    <span class="lang-switch__knob" aria-hidden="true" />
    <NuxtLink
      v-for="l in languages"
      :key="l.code"
      class="lang-switch__link"
      :to="paths[l.code]"
      :lang="l.code"
      :hreflang="l.code"
      :aria-label="l.label"
      :aria-current="l.code === lang ? 'page' : undefined"
    >
      {{ l.code }}
    </NuxtLink>
  </nav>
</template>

<style lang="scss" scoped>
$switch-border: 0.125rem;
$switch-link-height: 2.5rem;
$switch-focus-inset: -0.25rem;
$lang-switch-link-font-size: 0.875rem;
$knob-shadow-color: rgb(0 0 0 / 0.35);
$knob-shadow: 0 0.125rem 0.25rem $knob-shadow-color;
$switch-fade: 0.35s ease; // Spur wechselt die Farbe etwas langsamer als der Knopf springt

.lang-switch {
  position: relative;
  display: inline-grid;
  grid-template-columns: $columns-2;
  border: $switch-border solid var(--text);
  background: var(--bg);
  transition:
    background-color $switch-fade,
    border-color $switch-fade;

  &--en {
    border-color: var(--blue);
    background: var(--blue);
  }

  &__knob {
    position: absolute;
    top: $switch-border;
    bottom: $switch-border;
    left: $switch-border;
    width: calc(50% - $switch-border);
    background: var(--text);
    box-shadow: $knob-shadow;
    transition: transform $duration-slow $ease-spring; // leichtes Überschwingen wie ein Kippschalter
  }

  &--en &__knob {
    transform: translateX(100%);
  }

  &__link {
    position: relative;
    z-index: $z-above;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: $tap-target;
    min-height: $switch-link-height;
    color: var(--text);
    font-size: $lang-switch-link-font-size;
    font-weight: $weight-bold;
    text-decoration: none;
    text-transform: uppercase; // im HTML steht de/en, angezeigt wird DE/EN
    transition: color $transition-base;

    &:focus-visible {
      outline-offset: $switch-focus-inset;
    }

    &[aria-current='page'] {
      color: var(--bg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &,
    &__knob,
    &__link {
      transition: none;
    }
  }
}
</style>
