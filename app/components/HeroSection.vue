<script setup lang="ts">
const { lang, t } = useLang()
const { contactEmail, linkedinUrl } = useRuntimeConfig().public
const cvHref = computed(() => (lang.value === 'de' ? '/cv/Lebenslauf-Dustin-Clever.pdf' : '/cv/CV-Dustin-Clever.pdf'))
</script>

<template>
  <section id="top" class="hero" aria-labelledby="hero-title" tabindex="-1">
    <HeroBackdrop />

    <div class="hero__main">
      <h1 id="hero-title" class="hero__title" tabindex="-1">{{ t.hero.title }}</h1>
      <p class="hero__lead">{{ t.hero.statement }}</p>
      <p class="hero__status">{{ t.hero.status }}</p>
      <div class="hero__actions">
        <a class="button" href="#contact" @click="focusSection">{{ t.hero.ctaContact }}</a>
        <a class="text-link" :href="cvHref" download>
          <span class="text-link__label">{{ t.hero.ctaCv }}</span>
        </a>
      </div>
      <div class="hero__scroll">
        <ScrollButton href="#about" :label="t.ui.scrollDown" />
      </div>
    </div>

    <!-- Porträt: freigestellt, am Desktop als Hintergrundebene hinter dem Text -->
    <figure class="hero__portrait">
      <img
        class="hero__image"
        src="/images/portrait.webp"
        width="555"
        height="450"
        :alt="t.hero.imageAlt"
        fetchpriority="high"
        decoding="async"
      />
    </figure>

    <div class="hero__aside">
      <div class="hero__block">
        <p class="hero__label">{{ t.hero.aside.aboutLabel }}</p>
        <p class="hero__text">{{ t.hero.aside.aboutText }}</p>
        <a class="hero__more text-link" href="#about" @click="focusSection">
          <span class="text-link__label">{{ t.hero.aside.aboutLink }}</span>
        </a>
      </div>
      <div class="hero__block">
        <p class="hero__label">{{ t.hero.aside.workLabel }}</p>
        <p class="hero__text">{{ t.hero.aside.workText }}</p>
        <a class="hero__more text-link" href="#projects" @click="focusSection">
          <span class="text-link__label">{{ t.hero.aside.workLink }}</span>
        </a>
      </div>
      <div class="hero__block">
        <p class="hero__label">{{ t.hero.aside.connectLabel }}</p>
        <ul class="hero__social">
          <li v-if="linkedinUrl" class="hero__social-item">
            <a class="text-link" :href="linkedinUrl" rel="me noopener" target="_blank">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
                <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span class="text-link__label">{{ t.contact.linkedin }}</span>
            </a>
          </li>
          <li class="hero__social-item">
            <a class="text-link" :href="`mailto:${contactEmail}`">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
                <path d="M3 5.5h18v13H3zM3 6.5l9 7 9-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
              </svg>
              <span class="text-link__label">{{ t.hero.aside.mail }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
$hero-aside-columns: repeat(3, 1fr); // Tablet: die drei Infoblöcke nebeneinander
$hero-portrait-height-ratio: 0.98;
$hero-portrait-left: 33%;
$hero-text-width: clamp(22rem, 38vw, 32rem);
$hero-aside-width: 13rem;
$hero-min-height: 30rem;
$hero-portrait-width: min(52vw, 60rem);
$hero-portrait-max-height: 36rem;
$hero-padding-top: 3.5rem;
$hero-title-font-size: clamp(2.25rem, 8vw, 3.5rem);
$hero-title-font-size-desktop: clamp(2.25rem, min(3.6vw, 7svh), 4.25rem);
$hero-more-font-size: 0.8rem;
$text-halo-color: rgb(26 29 38 / 0.85);
$text-halo: 0 0 1.125rem $text-halo-color; // dunkler Hof um den Text (bg), damit er über dem Porträt lesbar bleibt

.hero {
  position: relative;
  display: grid;
  grid-template-columns: $columns-1;
  grid-template-areas:
    'main'
    'aside'
    'portrait';
  gap: $space-8;
  min-height: var(--section-height);
  padding: $space-10 var(--gutter) 0;
  background: var(--bg);

  @include between($bp-tablet, $bp-hero) {
    padding-top: $hero-padding-top;
  }

  // Desktop: Text links, Infoblöcke rechts, das Porträt liegt als Hintergrund dazwischen.
  // Der Abschnitt ist genau so hoch wie das Fenster unter dem Header.
  @include up($bp-hero) {
    grid-template-columns: minmax(0, $hero-text-width) minmax(0, 1fr) minmax(0, $hero-aside-width); // breite Textspalte links, rechts die Infoblöcke
    grid-template-areas: 'main . aside';
    column-gap: $space-8;
    height: var(--section-height);
    min-height: $hero-min-height;
    padding-top: 0;
  }

  &__main,
  &__aside {
    position: relative;
    z-index: $z-above;
    align-self: center;
  }

  // Ohne feste Zuordnung würden die Blöcke automatisch in Spalte 1 und 2 landen
  &__main {
    grid-area: main;
  }

  &__aside {
    grid-area: aside;
  }

  &__title,
  &__lead,
  &__status,
  &__label,
  &__text {
    text-shadow: $text-halo; // Lesbarkeit, falls Text über das Porträt reicht
  }

  &__title {
    margin-bottom: $space-5;
    font-size: $hero-title-font-size;
    text-wrap: balance;

    @include up($bp-hero) {
      font-size: $hero-title-font-size-desktop;
    }
  }

  &__lead {
    color: var(--muted);
    font-size: $font-lg;
  }

  &__status {
    margin-bottom: $space-6;
    font-weight: $weight-medium;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: $space-2 $space-6;
  }

  &__scroll {
    margin-top: $space-8;

    @media (max-width: $bp-hero - $bp-step), (max-height: $vh-short) {
      display: none; // spart Platz; Menü und Button "Kontakt" genügen
    }
  }

  &__portrait {
    position: relative; // über dem Punktraster
    z-index: $z-behind;
    grid-area: portrait;
    align-self: end;
    // Mobil und Tablet: volle Breite am unteren Rand, die Bildkanten liegen am Bildschirmrand
    width: calc(100% + 2 * var(--gutter));
    margin-inline: calc(-1 * var(--gutter));

    @include up($bp-hero) {
      // Porträt sitzt rechts von der Mitte: links bleibt Platz für den Text, das Gesicht liegt zwischen Text und Infoblöcken
      position: absolute;
      inset: auto auto 0 $hero-portrait-left;
      z-index: $z-behind;
      grid-area: auto;
      display: block;
      width: $hero-portrait-width;
      margin-inline: 0;
      pointer-events: none;
    }
  }

  &__image {
    width: 100%;
    height: auto;
    max-height: $hero-portrait-max-height;
    object-fit: contain;
    object-position: 50% 100%;

    @include up($bp-hero) {
      width: 100%;
      height: auto;
      max-height: calc(var(--section-height) * $hero-portrait-height-ratio);
    }
  }

  &__aside {
    @include up($bp-hero) {
      justify-self: end; // ganz an den rechten Rand
    }

    @include between($bp-tablet, $bp-hero) {
      display: grid;
      grid-template-columns: $hero-aside-columns;
      gap: $space-8;
    }
  }

  &__block {
    padding: $space-4 0;
    border-top: $border-line;

    &:first-child {
      border-top: 0;
    }

    @include between($bp-tablet, $bp-hero) {
      padding: 0;
      border-top: 0;
    }
  }

  &__label {
    margin-bottom: 0.4rem;
    font-size: $font-sm;
    font-weight: $weight-bold;
    letter-spacing: $tracking-caps;
    text-transform: uppercase;
  }

  &__text {
    margin-bottom: 0.4rem;
    color: var(--muted);
    font-size: $font-sm;
    line-height: $leading-normal;
  }

  &__more {
    font-size: $hero-more-font-size;
    font-weight: $weight-bold;
    letter-spacing: $tracking-caps;
    text-transform: uppercase;
  }

  &__social {
    display: flex;
    flex-wrap: wrap;
    gap: $space-1 $space-5;
  }
}
</style>
