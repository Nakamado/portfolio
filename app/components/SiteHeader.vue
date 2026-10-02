<script setup lang="ts">
const { lang, t, paths, isHome, homePath } = useLang()
// Auf allen Unterseiten (Impressum, Datenschutz, Pattern-Library) führen Menü und Logo zur Startseite (inkl. Anker), sonst springen sie innerhalb der Seite.
const onNavigate = focusSection // Fokus auf den Zielabschnitt setzen (siehe utils/focusSection.ts)
const anchor = (id: string) => (isHome.value ? `#${id}` : `${homePath.value}#${id}`)
</script>

<template>
  <header class="site-header">
    <NuxtLink class="site-header__brand" :to="anchor('top')" @click="onNavigate">
      <svg class="site-header__logo" viewBox="0 0 24 24" width="34" height="34" aria-hidden="true" focusable="false">
        <path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      Dustin Clever
    </NuxtLink>
    <nav class="site-header__nav" :aria-label="t.ui.nav">
      <ul class="site-header__list">
        <li v-for="item in t.nav" :key="item.id" class="site-header__item">
          <NuxtLink class="site-header__link" :to="anchor(item.id)" @click="onNavigate">{{ item.label }}</NuxtLink>
        </li>
      </ul>
    </nav>
    <LangSwitch :lang="lang" :paths="paths" :label="t.ui.langLabel" />
  </header>
</template>

<style lang="scss" scoped>
$logo-size-compact: 1.75rem;
$focus-inset: -0.1875rem;
$site-header-brand-gap: 0.7rem;
$site-header-brand-font-size: 1.45rem;
$site-header-link-padding: 0.6rem;
.site-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: $space-1 $space-6;
  padding: $space-2 var(--gutter);
  background: var(--bg);
  border-bottom: $border-line;

  @include up($bp-nav) {
    position: sticky;
    top: 0;
    z-index: $z-header;
    flex-wrap: nowrap;
    min-height: var(--header-height);
  }

  &__brand {
    display: inline-flex;
    align-items: center;
    gap: $site-header-brand-gap;
    min-height: $tap-target;
    margin-right: auto;
    font-family: var(--font-display);
    font-size: $site-header-brand-font-size;
    font-weight: $weight-bold;
    text-decoration: none;
    white-space: nowrap;
  }

  &__logo {
    color: var(--blue);
  }

  // Sehr schmale Bildschirme (320 px): Logo und Schalter sollen in eine Zeile passen
  @include down($bp-compact) {
    &__brand {
      gap: $space-2;
      font-size: $font-lg;
    }

    &__logo {
      width: $logo-size-compact;
      height: $logo-size-compact;
    }
  }

  &__nav {
    order: 3;
    width: 100%;

    @include up($bp-nav) {
      order: 0;
      width: auto;
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap; // auf schmalen Bildschirmen umbrechen statt seitlich zu scrollen, so sind alle Links sofort erreichbar
    gap: 0 $space-1;

    @include up($bp-nav) {
      gap: $space-2;
    }
  }

  &__link {
    display: inline-flex;
    align-items: center;
    min-height: $tap-target;
    padding: 0 $site-header-link-padding;
    color: var(--muted);
    font-weight: $weight-medium;
    text-decoration: none;
    white-space: nowrap;
    transition: color $transition-fast; // nur Farbwechsel zu Weiß, kein Unterstrich

    @include up($bp-nav) {
      padding: 0 $space-3;
    }

    &:hover {
      color: var(--text);
    }

    &:focus-visible {
      outline-offset: $focus-inset; // Rahmen innen, damit er nie abgeschnitten wird
    }
  }
}
</style>
