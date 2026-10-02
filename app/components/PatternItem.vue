<script setup lang="ts">
import type { PatternComponent } from '~/data/patterns'

// Eine Komponente der Pattern-Library: Beschreibung, Vorschau (Slot), Schnittstelle, Barrierefreiheit und Quelltext.
defineProps<{ item: PatternComponent; file: string; code: string }>()
const { t } = useLang()
</script>

<template>
  <article class="pattern" :aria-labelledby="`pattern-${item.id}`">
    <h3 :id="`pattern-${item.id}`" class="pattern__title">{{ item.title }}</h3>
    <p class="pattern__text">{{ item.description }}</p>

    <div class="pattern__preview" role="group" :aria-label="t.patterns.ui.preview">
      <slot />
    </div>

    <h4 class="pattern__heading">{{ t.patterns.ui.api }}</h4>
    <dl class="pattern__api">
      <div v-for="row in item.api" :key="row.name" class="pattern__api-row">
        <dt><code>{{ row.name }}</code></dt>
        <dd>{{ row.description }}</dd>
      </div>
    </dl>

    <h4 class="pattern__heading">{{ t.patterns.ui.a11y }}</h4>
    <ul class="pattern__list">
      <li v-for="note in item.a11y" :key="note">{{ note }}</li>
    </ul>

    <p class="pattern__usage">{{ item.usageLabel }}</p>
    <CodeBlock :code="item.usage" file="HTML" :summary="t.patterns.ui.codeLabel" open />
    <CodeBlock :code="code" :file="file" :summary="t.patterns.ui.showCode" />
  </article>
</template>

<style lang="scss" scoped>
$preview-min-height: 7rem;
$api-name-min: 10rem; // Spalte mit dem Namen in der Schnittstellen-Liste
$api-name-max: 14rem;
.pattern {
  margin-bottom: $space-12;

  &:last-child {
    margin-bottom: 0;
  }

  &__title {
    margin-bottom: $space-3;
  }

  &__text {
    color: var(--muted);
  }

  &__preview {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: $space-4 $space-8;
    min-height: $preview-min-height;
    margin: $space-6 0;
    padding: $space-8;
    border: $border-line;
    background: var(--bg-alt);
  }

  &__heading {
    margin: $space-6 0 $space-2;
  }

  &__api-row {
    display: grid;
    gap: $space-1 $space-6;
    padding: $space-3 0;
    border-top: $border-line;

    @include up($bp-tablet) {
      grid-template-columns: minmax($api-name-min, $api-name-max) 1fr;
    }

    dd {
      margin: 0;
      color: var(--muted);
    }
  }

  &__list {
    display: grid;
    gap: $space-2;
    padding-left: $list-indent;
    list-style: square;
    color: var(--muted);
  }

  &__usage {
    margin: $space-6 0 $space-2;
    font-weight: $weight-medium;
  }

  .code + .code {
    margin-top: $space-3;
  }
}

code {
  color: var(--text);
  font: $weight-medium $font-mono-size $font-mono;
}
</style>
