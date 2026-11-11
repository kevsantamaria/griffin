<script setup lang="ts">
import { computed } from 'vue'

import SiteCard from '@/features/sites/components/SiteCard.vue'
import { useSites } from '@/features/sites/composables/use-sites'
import { siteMatchesSearch } from '@/features/sites/utils'
import SearchBar from '@/shared/components/SearchBar.vue'
import LinkButton from '@/shared/components/ui/LinkButton.vue'
import { useSearchTerm } from '@/shared/composables/use-search-term'

const { getAll } = useSites()
const { data: sites, isPending, isError } = getAll

const term = useSearchTerm()
const matches = computed(() =>
  (sites.value ?? []).filter((site) => siteMatchesSearch(site, term.value))
)
</script>

<template>
  <div class="list-header">
    <h1>All sites</h1>
    <LinkButton to="/sites/new">New site</LinkButton>
  </div>

  <SearchBar
    v-model="term"
    id="sites-search"
    label="Search sites"
    placeholder="Name, technology, URL or tag…"
  />

  <p v-if="isPending">Loading…</p>
  <p v-else-if="isError">Could not load sites</p>
  <p v-else-if="matches.length === 0" class="empty-state">
    {{ term ? `No sites match “${term}”.` : 'No sites yet.' }}
  </p>
  <section v-else>
    <SiteCard v-for="site in matches" :key="site.id" v-bind="site" />
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
