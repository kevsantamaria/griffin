<script setup lang="ts">
defineProps<{ tags: Array<{ id: number; name: string }> }>()
</script>

<template>
  <ul v-if="tags.length > 0" class="tag-list">
    <li v-for="tag in tags" :key="tag.id">{{ tag.name }}</li>
  </ul>
  <p v-else class="tag-list-empty">No tags</p>
</template>

<style lang="css" scoped>
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

li {
  padding: 0.125rem 0.5rem;
  color: var(--color-muted);
  font-size: 0.75rem;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
}

.tag-list-empty {
  color: var(--color-muted);
  font-size: 0.8125rem;
}
</style>
