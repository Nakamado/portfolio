<script setup lang="ts">
const { lang, t, paths, isImprint, homePath } = useLang()
// Auf dem Impressum führen Menü und Logo zur Startseite (inkl. Anker), sonst springen sie innerhalb der Seite.
const anchor = (id: string) => (isImprint.value ? `${homePath.value}#${id}` : `#${id}`)

const languages = [
  { code: 'de', label: 'Deutsch (DE)' },
  { code: 'en', label: 'English (EN)' }
] as const
</script>

<template>
  <header class="site-header">
    <NuxtLink class="site-header__brand" :to="anchor('top')" @click="focusSection">
      <svg class="site-header__logo" viewBox="0 0 24 24" width="34" height="34" aria-hidden="true" focusable="false">
        <path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      Dustin Clever
    </NuxtLink>
    <nav class="site-header__nav" :aria-label="t.ui.nav">
      <ul class="site-header__list">
        <li v-for="item in t.nav" :key="item.id" class="site-header__item">
          <NuxtLink class="site-header__link" :to="anchor(item.id)" @click="focusSection">{{ item.label }}</NuxtLink>
        </li>
      </ul>
    </nav>
    <!-- Sprachwahl als Lichtschalter: der Knopf springt zur aktiven Sprache, die Spur leuchtet bei EN blau -->
    <nav class="lang-switch" :class="`lang-switch--${lang}`" :aria-label="t.ui.langLabel">
      <span class="lang-switch__knob" aria-hidden="true" />
      <NuxtLink
        v-for="l in languages"
        :key="l.code"
        class="lang-switch__link"
        :to="paths[l.code]"
        :lang="l.code"
        :hreflang="l.code"
        :aria-label="l.label"
      >
        {{ l.code.toUpperCase() }}
      </NuxtLink>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.site-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem 1.5rem;
  padding: 0.5rem var(--gutter);
  background: var(--bg);
  border-bottom: 1px solid var(--line);

  @media (min-width: 761px) {
    position: sticky;
    top: 0;
    z-index: 10;
    flex-wrap: nowrap;
    min-height: var(--header-height);
  }

  &__brand {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    min-height: 2.75rem;
    margin-right: auto;
    font-family: var(--font-display);
    font-size: 1.45rem;
    font-weight: 700;
    text-decoration: none;
    white-space: nowrap;
  }

  &__logo {
    color: var(--blue);
  }

  &__nav {
    order: 3;
    width: 100%;
    overflow-x: auto;

    @media (min-width: 761px) {
      order: 0;
      width: auto;
      overflow: visible; // sonst wird der Fokusrahmen abgeschnitten
    }
  }

  &__list {
    display: flex;
    gap: 0.5rem;
  }

  &__link {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    padding: 0 0.75rem;
    color: var(--muted);
    font-weight: 500;
    text-decoration: none;
    white-space: nowrap;
    transition: color 0.2s ease; // nur Farbwechsel zu Weiß, kein Unterstrich

    &:hover {
      color: var(--text);
    }

    &:focus-visible {
      outline-offset: -3px; // Rahmen innen, damit er nie abgeschnitten wird
    }
  }
}

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
