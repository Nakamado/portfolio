<script setup lang="ts">
const { t, homePath } = useLang()
const { contactEmail, imprintStreet, imprintCity, imprintPhone } = useRuntimeConfig().public

// Angaben in eckigen Klammern sind noch offen und werden sichtbar markiert (siehe utils/placeholder.ts).
const streetOpen = isPlaceholder(imprintStreet)
const cityOpen = isPlaceholder(imprintCity)
const telHref = computed(() => `tel:${imprintPhone.replace(/[^+\d]/g, '')}`)
</script>

<template>
  <div class="imprint">
    <h1 id="imprint-title" class="imprint__title" tabindex="-1">{{ t.imprint.title }}</h1>

    <section class="imprint__block" aria-labelledby="imprint-provider">
      <h2 id="imprint-provider" class="imprint__heading">{{ t.imprint.providerTitle }}</h2>
      <address class="imprint__address">
        <span class="imprint__line">Dustin Clever</span>
        <span class="imprint__line" :class="{ 'imprint__line--todo': streetOpen }">{{ imprintStreet }}</span>
        <span class="imprint__line" :class="{ 'imprint__line--todo': cityOpen }">{{ imprintCity }}</span>
      </address>
    </section>

    <section class="imprint__block" aria-labelledby="imprint-contact">
      <h2 id="imprint-contact" class="imprint__heading">{{ t.imprint.contactTitle }}</h2>
      <p class="imprint__line">
        {{ t.imprint.emailLabel }}:
        <a class="text-link" :href="`mailto:${contactEmail}`"><span class="text-link__label">{{ contactEmail }}</span></a>
      </p>
      <p v-if="imprintPhone" class="imprint__line">
        {{ t.imprint.phoneLabel }}:
        <a class="text-link" :href="telHref"><span class="text-link__label">{{ imprintPhone }}</span></a>
      </p>
    </section>

    <section class="imprint__block" aria-labelledby="imprint-content">
      <h2 id="imprint-content" class="imprint__heading">{{ t.imprint.contentTitle }}</h2>
      <p>{{ t.imprint.contentText }}</p>
    </section>

    <section class="imprint__block" aria-labelledby="imprint-liability">
      <h2 id="imprint-liability" class="imprint__heading">{{ t.imprint.liabilityTitle }}</h2>
      <p>{{ t.imprint.liabilityText }}</p>
    </section>

    <NuxtLink class="imprint__back text-link" :to="homePath">
      <span class="text-link__label">{{ t.imprint.back }}</span>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.imprint {
  max-width: 48rem;
  min-height: calc(100svh - var(--header-height));
  margin: 0 auto;
  padding: clamp(3rem, 8vw, 5rem) var(--gutter);

  &__title {
    margin-bottom: 2.5rem;
    font-size: clamp(2rem, 5vw, 3.25rem);
  }

  &__block {
    margin-bottom: 2rem;
  }

  &__heading {
    margin-bottom: 0.75rem;
    font-size: 1.35rem;
  }

  &__address {
    font-style: normal;
  }

  &__line {
    display: block;
    margin: 0 0 0.25rem;

    // Offene Angabe, die noch ergänzt werden muss
    &--todo {
      width: fit-content;
      padding: 0 0.4rem;
      outline: 2px dashed #ffb84d;
      color: #ffb84d;
    }
  }

  &__back {
    margin-top: 1rem;
  }
}
</style>
