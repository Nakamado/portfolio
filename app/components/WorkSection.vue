<script setup lang="ts">
const { t } = useLang()
</script>

<template>
  <BaseSection id="projects" :title="t.work.title">
    <p class="section__intro">{{ t.work.intro }}</p>
    <ul class="projects">
      <li
        v-for="project in t.work.projects"
        :key="project.title"
        class="projects__item"
        :class="{ 'projects__item--placeholder': project.placeholder }"
      >
        <p class="projects__type">
          {{ project.type }}
          <span v-if="project.placeholder" class="projects__tag">{{ t.work.placeholderLabel }}</span>
        </p>
        <h3 class="projects__title">{{ project.title }}</h3>
        <p class="projects__text">{{ project.text }}</p>
      </li>
    </ul>
  </BaseSection>
</template>

<style lang="scss" scoped>
.projects {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
  gap: 2rem;

  &__item {
    padding-top: 1rem;
    border-top: 3px solid var(--blue);

    &--placeholder {
      border-top-style: dashed;
      border-top-color: var(--muted);
      color: var(--muted);
    }
  }

  &__type {
    margin-bottom: 0.4rem;
    color: var(--muted);
    font-size: 0.9rem;
  }

  &__tag {
    margin-left: 0.5rem;
    padding: 0 0.4rem;
    border: 1px solid currentcolor;
    font-size: 0.8rem;
  }

  &__title {
    margin-bottom: 0.6rem;
    font-size: 1.3rem;
  }
}
</style>
