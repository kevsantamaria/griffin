<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>

<template>
  <RouterLink class="link-button" :to="to">
    <slot />
  </RouterLink>
</template>

<style lang="css" scoped>
.link-button {
  display: inline-flex;
  gap: var(--space-2);
  align-items: center;
  padding: 0.65rem 1.25rem;
  color: var(--color-white);
  font-size: 0.875rem;
  font-weight: 600;
  background-color: var(--color-primary);
  border: 1px solid transparent;
  border-radius: var(--border-radius);
  transition: background-color 0.15s ease;
}

.link-button:hover {
  background-color: var(--color-primary-hover);
}
</style>
