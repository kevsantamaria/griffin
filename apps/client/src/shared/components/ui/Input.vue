<script setup lang="ts">
const model = defineModel<string>()
</script>

<template>
  <input v-model="model" />
</template>

<style lang="css" scoped>
input {
  border: 1px solid var(--color-black);
  padding: 4px 9px;
  border-radius: var(--border-radius);
  color: var(--color-black);
}

input:focus {
  outline: 2px solid var(--color-black);
}

input::selection {
  background-color: var(--color-orange);
  color: var(--color-white);
}
</style>
