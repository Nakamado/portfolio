<script setup lang="ts">
const { t, imprintPath } = useLang()
</script>

<template>
  <footer class="site-footer">
    <p class="site-footer__text">© {{ new Date().getFullYear() }} Dustin Clever</p>
    <NuxtLink class="site-footer__link text-link" :to="imprintPath">
      <span class="text-link__label">{{ t.footer.imprint }}</span>
    </NuxtLink>
    <p class="site-footer__text">{{ t.footer.built }}</p>
  </footer>
</template>

<style lang="scss" scoped>
.site-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem 1.5rem;
  padding: 1.25rem var(--gutter);
  background: var(--bg);
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.9rem;

  &__text {
    margin: 0;
  }

  &__link {
    color: var(--text);
  }
}
</style>
