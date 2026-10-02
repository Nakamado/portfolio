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
.pattern {
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 0;
  }

  &__title {
    margin-bottom: 0.75rem;
  }

  &__text {
    color: var(--muted);
  }

  &__preview {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem 2rem;
    min-height: 7rem;
    margin: 1.5rem 0;
    padding: 2rem;
    border: 1px solid var(--line);
    background: var(--bg-alt);
  }

  &__heading {
    margin: 1.5rem 0 0.5rem;
  }

  &__api-row {
    display: grid;
    gap: 0.25rem 1.5rem;
    padding: 0.75rem 0;
    border-top: 1px solid var(--line);

    @media (min-width: 700px) {
      grid-template-columns: minmax(10rem, 14rem) 1fr;
    }

    dd {
      margin: 0;
      color: var(--muted);
    }
  }

  &__list {
    display: grid;
    gap: 0.5rem;
    padding-left: 1.25rem;
    list-style: square;
    color: var(--muted);
  }

  &__usage {
    margin: 1.5rem 0 0.5rem;
    font-weight: 500;
  }

  .code + .code {
    margin-top: 0.75rem;
  }
}

code {
  color: var(--text);
  font: 500 0.9em ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;
}
</style>
