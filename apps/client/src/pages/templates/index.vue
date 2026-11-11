<script setup lang="ts">
import { computed } from 'vue'

import TemplateCard from '@/features/templates/components/TemplateCard.vue'
import { useTemplates } from '@/features/templates/composables/use-templates'
import { templateMatchesSearch } from '@/features/templates/utils'
import SearchBar from '@/shared/components/SearchBar.vue'
import LinkButton from '@/shared/components/ui/LinkButton.vue'
import { useSearchTerm } from '@/shared/composables/use-search-term'

const { getAll } = useTemplates()
const { data: templates, isPending, isError } = getAll

const term = useSearchTerm()
const matches = computed(() =>
  (templates.value ?? []).filter((template) => templateMatchesSearch(template, term.value))
)
</script>

<template>
  <div class="list-header">
    <h1>Templates</h1>
    <LinkButton to="/templates/new">New template</LinkButton>
  </div>

  <SearchBar
    v-model="term"
    id="templates-search"
    label="Search templates"
    placeholder="Name, technology or tag…"
  />

  <p v-if="isPending">Loading…</p>
  <p v-else-if="isError">Could not load templates</p>
  <p v-else-if="matches.length === 0" class="empty-state">
    {{ term ? `No templates match “${term}”.` : 'No templates yet.' }}
  </p>
  <section v-else>
    <TemplateCard v-for="template in matches" :key="template.id" v-bind="template" />
  </section>
</template>

<style lang="css" scoped>
section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: var(--space-4);
}

.list-header {
  display: flex;
  gap: var(--space-4);
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-6);
}

.empty-state {
  color: var(--color-muted);
  font-size: 0.8125rem;
}
</style>
