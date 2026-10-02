<script setup lang="ts">
const { t } = useLang()
</script>

<template>
  <BaseSection id="skills" :title="t.skills.title" alt>
    <div class="skills">
      <div v-for="group in t.skills.groups" :key="group.title" class="skills__group">
        <h3 class="skills__title">{{ group.title }}</h3>
        <ul class="skills__list">
          <li v-for="item in group.items" :key="item" class="skills__item">{{ item }}</li>
        </ul>
      </div>
    </div>
  </BaseSection>
</template>

<style lang="scss" scoped>
$skill-min-width: 15rem;
.skills {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax($skill-min-width, 1fr));
  gap: $space-10;

  &__list {
    margin-top: $space-4;
  }

  &__item {
    padding: $space-2 0;
    border-top: $border-line;
  }
}
</style>
