<script setup lang="ts">
const { t } = useLang()
</script>

<template>
  <BaseSection id="projects" :title="t.work.title">
    <p class="section__intro">{{ t.work.intro }}</p>
    <ul class="projects">
      <li v-for="project in t.work.projects" :key="project.title" class="projects__item">
        <p class="projects__type">{{ project.type }}</p>
        <h3 class="projects__title">{{ project.title }}</h3>
        <p v-for="paragraph in project.text" :key="paragraph" class="projects__text">{{ paragraph }}</p>
        <ul v-if="project.stack?.length" class="chips">
          <DragChip v-for="tech in project.stack" :key="tech">{{ tech }}</DragChip>
        </ul>
      </li>
    </ul>
  </BaseSection>
</template>

<style lang="scss" scoped>
$card-min-width: 17rem;
$card-accent-width: 0.1875rem;
$projects-type-margin-bottom: 0.4rem;
$projects-title-margin-bottom: 0.6rem;
$projects-title-font-size: 1.3rem;
.projects {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax($card-min-width, 1fr));
  gap: $space-8;

  &__item {
    padding-top: $space-4;
    border-top: $card-accent-width solid var(--blue);
  }

  &__type {
    margin-bottom: $projects-type-margin-bottom;
    color: var(--muted);
    font-size: $font-sm;
  }

  &__title {
    margin-bottom: $projects-title-margin-bottom;
    font-size: $projects-title-font-size;
  }

  &__text + &__text {
    margin-top: $space-3;
  }
}
</style>
