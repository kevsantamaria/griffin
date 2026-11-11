<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <section class="detail-section">
    <h2>{{ title }}</h2>
    <slot />
  </section>
</template>

<style lang="css" scoped>
.detail-section {
  margin-top: var(--space-8);
}

h2 {
  margin-bottom: var(--space-3);
  color: var(--color-muted);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
