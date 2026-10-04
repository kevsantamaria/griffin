<script setup lang="ts">
const { variant = 'primary' } = defineProps<{
  variant?: 'primary' | 'secondary'
}>()
</script>

<template>
  <button :class="variant">
    <slot />
  </button>
</template>

<style lang="css" scoped>
button {
  display: inline-block;
  font-weight: 700;
  font-size: 0.9em;
  border-radius: var(--border-radius);
  padding: 0.5em 1em;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  transition: opacity 0.2s ease;
}

button.primary {
  background-color: var(--color-orange);
  color: var(--color-white);
}

button.secondary {
  background-color: var(--color-white);
  color: var(--color-orange);
}

button:hover {
  opacity: 0.95;
}

button:focus {
  outline: 2px solid var(--color-black);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
