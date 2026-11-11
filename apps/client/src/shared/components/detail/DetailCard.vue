<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <article class="detail-card">
    <h3>{{ title }}</h3>
    <slot />
  </article>
</template>

<style lang="css" scoped>
.detail-card {
  padding: var(--space-4);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
}

.detail-card + .detail-card {
  margin-top: var(--space-3);
}

h3 {
  margin-bottom: var(--space-3);
  font-size: 0.9375rem;
}
</style>
