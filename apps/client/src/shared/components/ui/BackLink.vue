<script setup lang="ts">
defineProps<{
  to: string
  label: string
}>()
</script>

<template>
  <RouterLink class="back-link" :to="to">← {{ label }}</RouterLink>
</template>

<style lang="css" scoped>
.back-link {
  display: inline-flex;
  gap: var(--space-2);
  align-items: center;
  margin-bottom: var(--space-4);
  color: var(--color-muted);
  font-size: 0.875rem;
  transition: color 0.15s ease;
}

.back-link:hover {
  color: var(--color-primary);
}
</style>
