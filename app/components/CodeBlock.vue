<script setup lang="ts">
// Zeigt echten Quelltext. Zugeklappt per <details>, damit die Seite übersichtlich bleibt; der Block ist per Tab erreichbar und scrollbar.
defineProps<{ code: string; file: string; summary: string; open?: boolean }>()
</script>

<template>
  <details class="code" :open="open">
    <summary class="code__summary">
      <span class="code__label">{{ summary }}</span>
      <code class="code__file">{{ file }}</code>
    </summary>
    <pre class="code__pre" tabindex="0"><code>{{ code }}</code></pre>
  </details>
</template>

<style lang="scss" scoped>
$code-line-height: 1.6;
.code {
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
}
</style>
