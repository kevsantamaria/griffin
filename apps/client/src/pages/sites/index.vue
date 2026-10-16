<script setup lang="ts">
import SiteCard from '@/features/sites/components/SiteCard.vue'
import { useSites } from '@/features/sites/composables/use-sites'

const { getAll } = useSites()
const { data: sites, isPending, isError } = getAll
</script>

<template>
  <h1>All sites</h1>
  <p v-if="isPending">Loading…</p>
  <p v-else-if="isError">Could not load sites</p>
  <section v-else-if="sites">
    <SiteCard v-for="site in sites" :key="site.id" v-bind="site" />
  </section>
</template>

<style lang="css" scoped>
section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: var(--space-4);
}
</style>
