<script setup lang="ts">
// Zeigt echten Quelltext. Zugeklappt per <details>, damit die Seite übersichtlich bleibt; der Block ist per Tab erreichbar und scrollbar.
// Gefärbt wird erst beim ersten Aufklappen: zugeklappt bleibt der Block reiner Text und die Seite klein.
import { highlight, type CodeToken } from '~/utils/highlight'

const props = defineProps<{ code: string; file: string; summary: string; open?: boolean }>()
const colored = ref(props.open === true)
const tokens = computed<CodeToken[]>(() => (colored.value ? highlight(props.code) : [{ type: null, text: props.code }]))

function onToggle(event: Event) {
  if ((event.currentTarget as HTMLDetailsElement).hasAttribute('open')) colored.value = true
}
</script>

<template>
  <details class="code" :open="open" @toggle="onToggle">
    <summary class="code__summary">
      <span class="code__label">{{ summary }}</span>
      <code class="code__file">{{ file }}</code>
    </summary>
    <pre class="code__pre" tabindex="0"><code><template v-for="(token, i) in tokens" :key="i"><span v-if="token.type" :class="`code__token code__token--${token.type}`">{{ token.text }}</span><template v-else>{{ token.text }}</template></template></code></pre>
  </details>
</template>

<style lang="scss" scoped>
$code-line-height: 1.6;
.code {
  // Farben der Quelltext-Auszeichnung, jeweils mit mindestens 4,5:1 Kontrast auf --bg
  --code-comment: #8f98ab;
  --code-string: #8fd694;
  --code-keyword: #c3a6ff;
  --code-number: #ffb86b;
  --code-tag: #7db3ff;
  --code-name: #7fd6e0;
  --code-variable: #ff9bb0;

  border: $border-line;
  background: var(--bg);

  &__summary {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: $space-1 $space-3;
    min-height: $tap-target;
    padding: $space-2 $space-4;
    cursor: pointer;
    font-weight: $weight-medium;
  }

  &__label {
    color: var(--text);
  }

  &__file {
    color: var(--muted);
    font-size: $font-sm;
  }

  &__pre {
    margin: 0;
    padding: $space-4;
    overflow-x: auto;
    border-top: $border-line;
    color: var(--muted);
    font: 400 #{$font-sm}/#{$code-line-height} $font-mono; // Interpolation, sonst teilt Sass
    tab-size: 2;
  }

  &__token {
    &--comment {
      color: var(--code-comment);
      font-style: italic;
    }

    &--string {
      color: var(--code-string);
    }

    &--keyword {
      color: var(--code-keyword);
    }

    &--number {
      color: var(--code-number);
    }

    &--tag {
      color: var(--code-tag);
    }

    &--name {
      color: var(--code-name);
    }

    &--variable {
      color: var(--code-variable);
    }
  }
}

:root[data-theme='light'] .code {
  --code-comment: #5d6679;
  --code-string: #1a6e2a;
  --code-keyword: #6a3fbf;
  --code-number: #a14a07;
  --code-tag: #1650c8;
  --code-name: #0b6370;
  --code-variable: #b0223f;
}
</style>
