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
$point-width: 70ch;
$timeline-dash-top: 0.78em; // Strich vor dem Stichpunkt auf Höhe der ersten Zeile
$timeline-dash-height: 0.125rem;
$timeline-date-width: 11rem;
$experience-subtitle-spaced-margin-top: 4.5rem;
$timeline-item-padding: 1.75rem;
$timeline-org-margin: 0.2rem;
$timeline-point-padding-left: 1.1rem;
$chips-gap: 0.4rem;
.experience {
  &__subtitle {
    margin-bottom: $space-4;

    &--spaced {
      margin-top: $experience-subtitle-spaced-margin-top;
    }
  }
}

.timeline {
  &__item {
    display: grid;
    grid-template-columns: $timeline-date-width 1fr;
    gap: $space-6;
    padding: $timeline-item-padding 0;
    border-top: $border-line;

    @include down($bp-tablet) {
      grid-template-columns: $columns-1;
      gap: $space-1;
    }
  }

  &__period {
    margin: 0;
    color: var(--muted);
  }

  &__org {
    margin: $timeline-org-margin 0 0;
    color: var(--muted);
  }

  &__points {
    margin: $space-4 0;
  }

  &__point {
    position: relative;
    max-width: $point-width;
    padding-left: $timeline-point-padding-left;

    &::before {
      content: '';
      position: absolute;
      top: $timeline-dash-top;
      left: 0;
      width: 0.5rem;
      height: $timeline-dash-height;
      background: var(--blue);
    }
  }

  &__note {
    margin: $space-2 0 0;
    color: var(--muted);
  }
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: $chips-gap;
  margin-top: $space-3;
}
</style>
