<script setup lang="ts">
const model = defineModel<string>()
</script>

<template>
  <input v-model="model" />
</template>

<style lang="css" scoped>
input {
  width: 100%;
  padding: 0.6rem 0.8rem;
  color: var(--color-white);
  font: inherit;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

input::placeholder {
  color: var(--color-muted);
}

input:hover {
  border-color: var(--color-muted);
}

input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(249, 87, 6, 0.18);
}
</style>
