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
.lang-switch {
  position: relative;
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  border: 2px solid var(--text);
  background: var(--bg);
  transition:
    background-color 0.35s ease,
    border-color 0.35s ease;

  &--en {
    border-color: var(--blue);
    background: var(--blue);
  }

  &__knob {
    position: absolute;
    top: 2px;
    bottom: 2px;
    left: 2px;
    width: calc(50% - 2px);
    background: #fff;
    box-shadow: 0 2px 4px rgb(0 0 0 / 0.35);
    transition: transform 0.4s cubic-bezier(0.3, 1.5, 0.5, 1); // leichtes Überschwingen wie ein Kippschalter
  }

  &--en &__knob {
    transform: translateX(100%);
  }

  &__link {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2.75rem;
    min-height: 2.5rem;
    color: var(--text);
    font-size: 0.875rem;
    font-weight: 700;
    text-decoration: none;
    text-transform: uppercase; // im HTML steht de/en, angezeigt wird DE/EN
    transition: color 0.3s ease;

    &:focus-visible {
      outline-offset: -4px;
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
