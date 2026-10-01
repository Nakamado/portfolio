<script setup lang="ts">
defineProps<{ id: string; title: string; alt?: boolean }>()
</script>

<template>
  <section :id="id" class="section" :class="{ 'section--alt': alt }" :aria-labelledby="`${id}-title`" tabindex="-1">
    <!-- Überschrift ist per Tab erreichbar (Orientierung für Tastaturnutzer), aber kein Link und kein Button -->
    <h2 :id="`${id}-title`" class="section__title" tabindex="0">
      <span class="section__slash" aria-hidden="true">/</span>{{ title }}
    </h2>
    <slot />
  </section>
</template>
