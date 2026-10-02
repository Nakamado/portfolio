<script setup lang="ts">
const { t, homePath } = useLang()
const { contactEmail, imprintStreet, imprintCity } = useRuntimeConfig().public
</script>

<template>
  <div class="privacy">
    <h1 id="privacy-title" class="privacy__title" tabindex="-1">{{ t.privacy.title }}</h1>

    <section class="privacy__block" aria-labelledby="privacy-controller">
      <h2 id="privacy-controller" class="privacy__heading">{{ t.privacy.controllerTitle }}</h2>
      <address class="privacy__address">
        <span class="privacy__line">Dustin Clever</span>
        <span class="privacy__line">{{ imprintStreet }}</span>
        <span class="privacy__line">{{ imprintCity }}</span>
        <span class="privacy__line">
          {{ t.privacy.emailLabel }}:
          <a class="text-link" :href="`mailto:${contactEmail}`"><span class="text-link__label">{{ contactEmail }}</span></a>
        </span>
      </address>
    </section>

    <section
      v-for="(section, index) in t.privacy.sections"
      :key="section.title"
      class="privacy__block"
      :aria-labelledby="`privacy-section-${index}`"
    >
      <h2 :id="`privacy-section-${index}`" class="privacy__heading">{{ section.title }}</h2>
      <p v-for="paragraph in section.paragraphs" :key="paragraph" class="privacy__text">{{ paragraph }}</p>
    </section>

    <p class="privacy__updated">{{ t.privacy.updated }}</p>

    <NuxtLink class="privacy__back text-link" :to="homePath">
      <span class="text-link__label">{{ t.privacy.back }}</span>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.privacy {
  max-width: $measure-text;
  min-height: var(--section-height);
  margin: 0 auto;
  padding: $page-padding-y var(--gutter);

  &__title {
    margin-bottom: $space-10;
    font-size: $font-title;
  }

  &__block {
    margin-bottom: $space-8;
  }

  &__heading {
    margin-bottom: $space-3;
    font-size: $font-xl;
  }

  &__text {
    margin-bottom: $space-3;
  }

  &__address {
    font-style: normal;
  }

  &__line {
    display: block;
    margin-bottom: $space-1;
  }

  &__updated {
    margin-top: $space-10;
    color: var(--muted);
    font-size: $font-sm;
  }

  &__back {
    margin-top: $space-2;
  }
}
</style>
