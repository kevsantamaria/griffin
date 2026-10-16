<script setup lang="ts">
import type { SingleSiteRes } from '@griffin/schemas'

const props = defineProps<SingleSiteRes>()
</script>

<template>
  <article>
    <h1>{{ props.name }}</h1>
    <p>Technology: {{ props.technology }}</p>
    <p>URL: {{ props.url }}</p>
    <p>Internal: {{ props.isInternal }}</p>
    <p>Notes: {{ props.notes }}</p>
    <p>Slug: {{ props.slug }}</p>
    <p>Created at: {{ props.createdAt }}</p>
    <p>Updated at: {{ props.updatedAt }}</p>

    <section>
      <h2>Tags</h2>
      <ul>
        <li v-for="tag in props.tags" :key="tag.id">{{ tag.name }}</li>
      </ul>
    </section>

    <section>
      <h2>Credentials</h2>
      <article v-for="(group, groupIndex) in props.credentials" :key="groupIndex">
        <h3>{{ group.header }}</h3>
        <ul>
          <li v-for="(field, fieldIndex) in group.fields" :key="fieldIndex">
            <span>{{ field.label }}</span>
            <span>{{ field.content }}</span>
          </li>
        </ul>
      </article>
    </section>
  </article>
</template>

<style lang="css" scoped>
article {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

p {
  color: var(--color-muted);
  font-size: 0.875rem;
  overflow-wrap: anywhere;
}

section {
  margin-top: var(--space-6);
}

section > ul {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

section > ul > li {
  padding: 0.125rem 0.5rem;
  color: var(--color-muted);
  font-size: 0.75rem;
  background-color: var(--color-black);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
}

article > article {
  padding: var(--space-4);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
}

article > article + article {
  margin-top: var(--space-3);
}

article > article > ul {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-top: var(--space-3);
}

article > article > ul > li {
  display: flex;
  gap: var(--space-3);
  font-size: 0.875rem;
}

article > article > ul > li > span:first-child {
  min-width: 8rem;
  color: var(--color-muted);
}

article > article > ul > li > span:last-child {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  overflow-wrap: anywhere;
}
</style>
