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
.code {
  border: 1px solid var(--line);
  background: var(--bg);

  &__summary {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.25rem 0.75rem;
    min-height: 2.75rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-weight: 500;
  }

  &__label {
    color: var(--text);
  }

  &__file {
    color: var(--muted);
    font-size: 0.85rem;
  }

  &__pre {
    margin: 0;
    padding: 1rem;
    overflow-x: auto;
    border-top: 1px solid var(--line);
    color: var(--muted);
    font: 400 0.85rem/1.6 ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;
    tab-size: 2;
  }
}
</style>
