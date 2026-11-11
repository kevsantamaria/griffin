<script setup lang="ts">
import type { AllSitesRes } from '@griffin/schemas'
import IconGlobe from '~icons/andrsrxn/globe'
import IconGlobeOff from '~icons/andrsrxn/globe-off'

const props = defineProps<AllSitesRes>()
</script>

<template>
  <RouterLink class="card" :to="{ name: '/sites/[slug]', params: { slug: props.slug } }">
    <article>
      <header class="card-header">
        <h3>{{ props.name }}</h3>
        <IconGlobeOff
          v-if="props.isInternal"
          class="scope-icon"
          role="img"
          aria-label="Internal site"
        />
        <IconGlobe v-else class="scope-icon" role="img" aria-label="External site" />
      </header>
      <span>{{ props.technology }}</span>

      <p>{{ props.url }}</p>
      <ul>
        <li v-for="tag in props.tags" :key="tag.id">{{ tag.name }}</li>
      </ul>

      <RouterLink :to="{ name: '/sites/[slug]', params: { slug: props.slug } }"
        >Detalles -></RouterLink
      >
    </article>
  </RouterLink>
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
  border-color: var(--color-primary);
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
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
}

a {
  margin-top: auto;
  color: var(--color-primary);
  font-size: 0.8125rem;
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-2);
}

.scope-icon {
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
  color: var(--color-muted);
}
</style>
