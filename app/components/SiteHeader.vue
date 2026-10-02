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
.site-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem 1.5rem;
  padding: 0.5rem var(--gutter);
  background: var(--bg);
  border-bottom: 1px solid var(--line);

  @media (min-width: 1000px) {
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

  // Sehr schmale Bildschirme (320 px): Logo und Schalter sollen in eine Zeile passen
  @media (max-width: 380px) {
    &__brand {
      gap: 0.5rem;
      font-size: 1.15rem;
    }

    &__logo {
      width: 28px;
      height: 28px;
    }
  }

  &__nav {
    order: 3;
    width: 100%;

    @media (min-width: 1000px) {
      order: 0;
      width: auto;
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap; // auf schmalen Bildschirmen umbrechen statt seitlich zu scrollen, so sind alle Links sofort erreichbar
    gap: 0 0.25rem;

    @media (min-width: 1000px) {
      gap: 0.5rem;
    }
  }

  &__link {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    padding: 0 0.6rem;
    color: var(--muted);
    font-weight: 500;
    text-decoration: none;
    white-space: nowrap;
    transition: color 0.2s ease; // nur Farbwechsel zu Weiß, kein Unterstrich

    @media (min-width: 1000px) {
      padding: 0 0.75rem;
    }

    &:hover {
      color: var(--text);
    }

    &:focus-visible {
      outline-offset: -3px; // Rahmen innen, damit er nie abgeschnitten wird
    }
  }
}
</style>
