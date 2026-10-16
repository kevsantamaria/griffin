<script setup lang="ts">
import type { AllTemplatesRes } from '@griffin/schemas'

const props = defineProps<AllTemplatesRes>()
</script>

<template>
  <article>
    <h3>{{ props.name }}</h3>
    <span>{{ props.technology }}</span>

    <ul>
      <li v-for="tag in props.tags" :key="tag.id">{{ tag.name }}</li>
    </ul>
    <p>{{ props.slug }}</p>

    <RouterLink :to="{ name: '/templates/[slug]', params: { slug: props.slug } }"
      >Detalles -></RouterLink
    >
  </article>
</template>

<style lang="css" scoped>
article {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  transition: border-color 0.15s ease;
}

article:hover {
  border-color: var(--color-orange);
}

h3 {
  margin: 0;
}

span,
p {
  color: var(--color-muted);
  font-size: 0.8125rem;
  overflow-wrap: anywhere;
}

ul {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

li {
  padding: 0.125rem 0.5rem;
  color: var(--color-muted);
  font-size: 0.75rem;
  background-color: var(--color-black);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
}

a {
  margin-top: auto;
  color: var(--color-orange);
  font-size: 0.8125rem;
}
</style>
