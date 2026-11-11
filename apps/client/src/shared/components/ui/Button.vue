<script setup lang="ts">
const { variant = 'primary' } = defineProps<{
  variant?: 'primary' | 'secondary' | 'danger'
}>()
</script>

<template>
  <button :class="variant">
    <slot />
  </button>
</template>

<style lang="css" scoped>
button {
  padding: 0.65rem 1.25rem;
  font: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid transparent;
  border-radius: var(--border-radius);
  transition:
    opacity 0.15s ease,
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
}

button.primary {
  color: var(--color-white);
  background-color: var(--color-primary);
}

button.secondary {
  color: var(--color-white);
  background-color: transparent;
  border-color: var(--color-border);
}

button.secondary:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
}

button.danger {
  color: var(--color-white);
  background-color: var(--color-danger);
}

button.danger:hover:not(:disabled) {
  filter: brightness(1.08);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
