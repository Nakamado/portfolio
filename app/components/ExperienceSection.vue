<script setup lang="ts">
const { t } = useLang()
</script>

<template>
  <BaseSection id="experience" :title="t.experience.title">
    <h3 class="experience__subtitle">{{ t.experience.workTitle }}</h3>
    <ol class="timeline" data-testid="jobs">
      <li v-for="job in t.experience.jobs" :key="job.period + job.org" class="timeline__item">
        <p class="timeline__period">{{ job.period }}</p>
        <div class="timeline__content">
          <h4 class="timeline__title">{{ job.title }}</h4>
          <p class="timeline__org">{{ job.org }}</p>
          <ul v-if="job.points.length" class="timeline__points">
            <li v-for="point in job.points" :key="point" class="timeline__point">{{ point }}</li>
          </ul>
          <ul v-if="job.stack?.length" class="chips">
            <DragChip v-for="tech in job.stack" :key="tech">{{ tech }}</DragChip>
          </ul>
        </div>
      </li>
    </ol>

    <h3 class="experience__subtitle experience__subtitle--spaced">{{ t.experience.educationTitle }}</h3>
    <ol class="timeline" data-testid="education">
      <li v-for="edu in t.experience.education" :key="edu.period" class="timeline__item">
        <p class="timeline__period">{{ edu.period }}</p>
        <div class="timeline__content">
          <h4 class="timeline__title">{{ edu.title }}</h4>
          <p class="timeline__org">{{ edu.org }}</p>
          <p v-if="edu.note" class="timeline__note">{{ edu.note }}</p>
        </div>
      </li>
    </ol>
  </BaseSection>
</template>

<style lang="scss" scoped>
.experience {
  &__subtitle {
    margin-bottom: 1rem;

    &--spaced {
      margin-top: 4.5rem;
    }
  }
}

.timeline {
  &__item {
    display: grid;
    grid-template-columns: 11rem 1fr;
    gap: 1.5rem;
    padding: 1.75rem 0;
    border-top: 1px solid var(--line);

    @media (max-width: 700px) {
      grid-template-columns: 1fr;
      gap: 0.25rem;
    }
  }

  &__period {
    margin: 0;
    color: var(--muted);
  }

  &__org {
    margin: 0.2rem 0 0;
    color: var(--muted);
  }

  &__points {
    margin: 1rem 0;
  }

  &__point {
    position: relative;
    max-width: 70ch;
    padding-left: 1.1rem;

    &::before {
      content: '';
      position: absolute;
      top: 0.78em;
      left: 0;
      width: 0.5rem;
      height: 2px;
      background: var(--blue);
    }
  }

  &__note {
    margin: 0.5rem 0 0;
    color: var(--muted);
  }
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.75rem;
}
</style>
