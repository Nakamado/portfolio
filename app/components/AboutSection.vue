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
.about {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: clamp(2rem, 6vw, 5rem);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }

  &__paragraph {
    font-size: 1.15rem;
  }

  &__subtitle {
    margin-bottom: 1rem;

    &--spaced {
      margin-top: 2.5rem;
    }
  }
}

.list {
  &__item {
    padding: 0.9rem 0;
    border-top: 1px solid var(--line);
  }

  &__term {
    font-weight: 700;
  }

  &__text {
    margin-top: 0.15rem;
    color: var(--muted);
  }
}
</style>
