<script setup lang="ts">
const { t } = useLang()
</script>

<template>
  <BaseSection id="about" :title="t.about.title" alt>
    <div class="about">
      <div class="about__text">
        <p v-for="paragraph in t.about.paragraphs" :key="paragraph" class="about__paragraph">{{ paragraph }}</p>
      </div>
      <div class="about__aside">
        <h3 class="about__subtitle">{{ t.about.strengthsTitle }}</h3>
        <dl class="list">
          <div v-for="s in t.about.strengths" :key="s.title" class="list__item">
            <dt class="list__term">{{ s.title }}</dt>
            <dd class="list__text">{{ s.text }}</dd>
          </div>
        </dl>
        <h3 class="about__subtitle about__subtitle--spaced">{{ t.about.factsTitle }}</h3>
        <dl class="list">
          <div v-for="fact in t.about.facts" :key="fact.label" class="list__item">
            <dt class="list__term">{{ fact.label }}</dt>
            <dd class="list__text">{{ fact.value }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </BaseSection>
</template>

<style lang="scss" scoped>
$about-columns: 1.2fr 1fr; // Text etwas breiter als das Porträt
$about-gap: clamp(2rem, 6vw, 5rem);
$list-item-padding: 0.9rem;
$list-text-margin-top: 0.15rem;
.about {
  display: grid;
  grid-template-columns: $about-columns;
  gap: $about-gap;

  @include down($bp-about) {
    grid-template-columns: $columns-1;
  }

  &__paragraph {
    font-size: $font-lg;
  }

  &__subtitle {
    margin-bottom: $space-4;

    &--spaced {
      margin-top: $space-10;
    }
  }
}

.list {
  &__item {
    padding: $list-item-padding 0;
    border-top: $border-line;
  }

  &__term {
    font-weight: $weight-bold;
  }

  &__text {
    margin-top: $list-text-margin-top;
    color: var(--muted);
  }
}
</style>
