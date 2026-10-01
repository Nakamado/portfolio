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
      <a class="hero__scroll" href="#about" :aria-label="t.ui.scrollDown" @click="focusSection">
        <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false">
          <path d="M5 9l7 7 7-7" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </a>
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
.hero {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    'main'
    'aside'
    'portrait';
  gap: 2rem;
  min-height: var(--section-height);
  padding: 2.5rem var(--gutter) 0;
  background: var(--bg);

  @media (min-width: 700px) and (max-width: 1099px) {
    padding-top: 3.5rem;
  }

  // Desktop: Text links, Infoblöcke rechts, das Porträt liegt als Hintergrund dazwischen.
  // Der Abschnitt ist genau so hoch wie das Fenster unter dem Header.
  @media (min-width: 1100px) {
    grid-template-columns: minmax(0, clamp(22rem, 38vw, 32rem)) minmax(0, 1fr) minmax(0, 13rem); // breite Textspalte links, rechts die Infoblöcke
    grid-template-areas: 'main . aside';
    column-gap: 2rem;
    height: var(--section-height);
    min-height: 30rem;
    padding-top: 0;
  }

  &__main,
  &__aside {
    position: relative;
    z-index: 1;
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
    text-shadow: 0 0 18px rgb(26 29 38 / 0.85); // Lesbarkeit, falls Text über das Porträt reicht
  }

  &__title {
    margin-bottom: 1.25rem;
    font-size: clamp(2.25rem, 8vw, 3.5rem);
    text-wrap: balance;

    @media (min-width: 1100px) {
      font-size: clamp(2.25rem, min(3.6vw, 7svh), 4.25rem);
    }
  }

  &__lead {
    color: var(--muted);
    font-size: 1.15rem;
  }

  &__status {
    margin-bottom: 1.5rem;
    font-weight: 500;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem 1.5rem;
  }

  &__scroll {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    margin-top: 2rem;
    border-radius: 50%;
    background: var(--blue);
    color: #fff;

    &:hover {
      background: var(--blue-dark);
    }

    @media (max-width: 1099px), (max-height: 720px) {
      display: none; // spart Platz; Menü und Button "Kontakt" genügen
    }
  }

  &__portrait {
    position: relative; // über dem Punktraster
    z-index: 0;
    grid-area: portrait;
    align-self: end;
    // Mobil und Tablet: volle Breite am unteren Rand, die Bildkanten liegen am Bildschirmrand
    width: calc(100% + 2 * var(--gutter));
    margin-inline: calc(-1 * var(--gutter));

    @media (min-width: 1100px) {
      // Porträt sitzt rechts von der Mitte: links bleibt Platz für den Text, das Gesicht liegt zwischen Text und Infoblöcken
      position: absolute;
      inset: auto auto 0 33%;
      z-index: 0;
      grid-area: auto;
      display: block;
      width: min(52vw, 60rem);
      margin-inline: 0;
      pointer-events: none;
    }
  }

  &__image {
    width: 100%;
    height: auto;
    max-height: 36rem;
    object-fit: contain;
    object-position: 50% 100%;

    @media (min-width: 1100px) {
      width: 100%;
      height: auto;
      max-height: calc(var(--section-height) * 0.98);
    }
  }

  &__aside {
    @media (min-width: 1100px) {
      justify-self: end; // ganz an den rechten Rand
    }

    @media (min-width: 700px) and (max-width: 1099px) {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
  }

  &__block {
    padding: 1rem 0;
    border-top: 1px solid var(--line);

    &:first-child {
      border-top: 0;
    }

    @media (min-width: 700px) and (max-width: 1099px) {
      padding: 0;
      border-top: 0;
    }
  }

  &__label {
    margin-bottom: 0.4rem;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  &__text {
    margin-bottom: 0.4rem;
    color: var(--muted);
    font-size: 0.95rem;
    line-height: 1.5;
  }

  &__more {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  &__social {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 1.25rem;
  }
}
</style>
