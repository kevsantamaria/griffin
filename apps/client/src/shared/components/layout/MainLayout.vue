<script setup lang="ts">
import TheFooter from './TheFooter.vue'
import TheHeader from './TheHeader.vue'
</script>

<template>
  <TheHeader />
  <main>
    <slot></slot>
  </main>
  <TheFooter />
</template>

<style lang="css" scoped>
main {
  flex: 1;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
}

footer {
  padding: var(--space-6);
  color: var(--color-muted);
  font-size: 0.8125rem;
  text-align: center;
  border-top: 1px solid var(--color-border);
}
</style>
